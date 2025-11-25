/**
 * Tenant-specific Prisma Client
 * Creates a Prisma client connected to a user's dedicated database
 * 
 * Note: This requires generating Prisma client with tenant schema
 * Run: DATABASE_URL="..." npx prisma generate --schema=prisma/tenant-schema.prisma
 */

// Using any for now since tenant schema Prisma client needs to be generated separately
type TenantPrismaClient = any;

// Cache for tenant clients
const tenantClients = new Map<string, TenantPrismaClient>();

/**
 * Get or create a Prisma client for a specific tenant database
 */
export function getTenantPrismaClient(databaseUrl: string): TenantPrismaClient {
  // Use cached client if available
  if (tenantClients.has(databaseUrl)) {
    return tenantClients.get(databaseUrl)!;
  }

  // For now, we'll use a dynamic import approach
  // In production, you'd generate the tenant Prisma client separately
  // Create new client with dynamic Prisma import
  const { PrismaClient } = require('@prisma/client');
  
  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

  // Cache it
  tenantClients.set(databaseUrl, client);

  return client;
}

/**
 * Get tenant Prisma client for a user
 */
export async function getTenantClientForUser(userId: string) {
  const { prisma } = await import('./prisma');
  
  // Get user with all fields (since tenantDatabaseUrl might not be in select type yet)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User ${userId} not found`);
  }

  // Access tenantDatabaseUrl from user object (will be available after schema migration)
  const dbUrl = (user as any).tenantDatabaseUrl;
  if (!dbUrl) {
    throw new Error(`No tenant database found for user ${userId}. Database will be created during onboarding.`);
  }

  return getTenantPrismaClient(dbUrl);
}

/**
 * Disconnect all tenant clients (useful for cleanup)
 */
export async function disconnectAllTenantClients(): Promise<void> {
  const disconnectPromises = Array.from(tenantClients.values()).map(client =>
    client.$disconnect()
  );
  
  await Promise.all(disconnectPromises);
  tenantClients.clear();
}

