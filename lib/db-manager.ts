/**
 * Database Manager - Handles multi-tenant database creation and management
 * Each user gets their own dedicated PostgreSQL database
 */

import { exec } from "child_process";
import { promisify } from "util";
import { PrismaClient as TenantPrismaClient } from "../generated/tenant-client";

const execAsync = promisify(exec);

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  mainDatabase: string; // Main database name (e.g., 'landlordlens_main')
}

/**
 * Get database configuration from environment
 */
function getDatabaseConfig(): DatabaseConfig {
  const mainDbUrl = process.env.DATABASE_URL;
  if (!mainDbUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  // Parse DATABASE_URL: postgresql://user:password@host:port/database
  const url = new URL(mainDbUrl);
  
  return {
    host: url.hostname,
    port: parseInt(url.port || '5432'),
    user: url.username,
    password: url.password,
    mainDatabase: url.pathname.slice(1).split('?')[0], // Remove leading / and query params
  };
}

/**
 * Generate a safe database name for a tenant
 */
export function generateTenantDatabaseName(userId: string): string {
  // Use a prefix and sanitize the user ID
  const sanitized = userId.replace(/[^a-zA-Z0-9]/g, "_");
  return `tenant_${sanitized}`;
}

/**
 * Create a connection string for a tenant database
 */
export function createTenantDatabaseUrl(
  tenantDbName: string,
  config?: DatabaseConfig
): string {
  const dbConfig = config || getDatabaseConfig();
  
  return `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${tenantDbName}?schema=public`;
}

/**
 * Create a new tenant database
 */
export async function createTenantDatabase(
  tenantDbName: string,
  userId: string
): Promise<{ success: boolean; databaseUrl?: string; error?: string }> {
  try {
    const config = getDatabaseConfig();
    
    // Set PGPASSWORD for psql commands
    const env = {
      ...process.env,
      PGPASSWORD: config.password,
    };

    // Create the database using psql
    const createDbCommand = `psql -h ${config.host} -p ${config.port} -U ${config.user} -d ${config.mainDatabase} -c "CREATE DATABASE ${tenantDbName};"`;
    
    try {
      await execAsync(createDbCommand, { env });
    } catch (error: any) {
      // Database might already exist, which is okay
      if (!error.message.includes('already exists')) {
        throw error;
      }
    }

    // Create the database URL
    const databaseUrl = createTenantDatabaseUrl(tenantDbName, config);

    // Run Prisma migrations on the new database
    const schemaPath = process.cwd() + "/prisma/tenant-schema.prisma";
    const migrateCommand = `DATABASE_URL="${databaseUrl}" npx prisma migrate deploy --schema=${schemaPath}`;
    
    try {
      await execAsync(migrateCommand, { env });
    } catch (error) {
      console.error('Migration error:', error);
      // Try alternative: push schema
      const pushCommand = `DATABASE_URL="${databaseUrl}" npx prisma db push --schema=${schemaPath} --accept-data-loss`;
      await execAsync(pushCommand, { env });
    }

    // Seed compliance types
    await seedTenantDatabase(databaseUrl);

    return {
      success: true,
      databaseUrl,
    };
  } catch (error: any) {
    console.error('Error creating tenant database:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Seed tenant database with initial data (compliance types)
 */
async function seedTenantDatabase(databaseUrl: string): Promise<void> {
  const complianceTypes = [
    {
      name: 'Gas Safety Certificate',
      description: 'Annual gas safety check required by law',
      renewalFrequencyMonths: 12,
      isRequired: true,
    },
    {
      name: 'EPC Certificate',
      description: 'Energy Performance Certificate',
      renewalFrequencyMonths: 10 * 12, // 10 years
      isRequired: true,
    },
    {
      name: 'Electrical Safety Check',
      description: 'Electrical installation condition report',
      renewalFrequencyMonths: 5 * 12, // 5 years
      isRequired: true,
    },
    {
      name: 'Legionella Risk Assessment',
      description: 'Legionella risk assessment for water systems',
      renewalFrequencyMonths: 2 * 12, // 2 years
      isRequired: true,
    },
    {
      name: 'Fire Safety Assessment',
      description: 'Fire risk assessment',
      renewalFrequencyMonths: 12,
      isRequired: true,
    },
  ];

  const tenantClient = new TenantPrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
  });

  try {
    const existing = await tenantClient.complianceType.count();
    if (existing === 0) {
      await tenantClient.complianceType.createMany({
        data: complianceTypes,
        skipDuplicates: true,
      });
    }
  } finally {
    await tenantClient.$disconnect();
  }
}

/**
 * Delete a tenant database (for account deletion)
 */
export async function deleteTenantDatabase(
  tenantDbName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const config = getDatabaseConfig();
    
    const env = {
      ...process.env,
      PGPASSWORD: config.password,
    };

    // Terminate all connections to the database first
    const terminateConnections = `psql -h ${config.host} -p ${config.port} -U ${config.user} -d ${config.mainDatabase} -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${tenantDbName}' AND pid <> pg_backend_pid();"`;
    
    try {
      await execAsync(terminateConnections, { env });
    } catch (error) {
      // Ignore errors - database might not exist
    }

    // Drop the database
    const dropDbCommand = `psql -h ${config.host} -p ${config.port} -U ${config.user} -d ${config.mainDatabase} -c "DROP DATABASE IF EXISTS ${tenantDbName};"`;
    await execAsync(dropDbCommand, { env });

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting tenant database:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Check if a tenant database exists
 */
export async function tenantDatabaseExists(
  tenantDbName: string
): Promise<boolean> {
  try {
    const config = getDatabaseConfig();
    
    const env = {
      ...process.env,
      PGPASSWORD: config.password,
    };

    const checkCommand = `psql -h ${config.host} -p ${config.port} -U ${config.user} -d ${config.mainDatabase} -t -c "SELECT 1 FROM pg_database WHERE datname = '${tenantDbName}';"`;
    
    const { stdout } = await execAsync(checkCommand, { env });
    return stdout.trim() === '1';
  } catch (error) {
    return false;
  }
}

