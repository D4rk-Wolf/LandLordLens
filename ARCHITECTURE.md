# LandlordLens Architecture

## Multi-Tenant Database Architecture

LandlordLens uses a **multi-tenant database architecture** where each user gets their own dedicated PostgreSQL database. This provides:

- **Data Isolation**: Each user's data is completely separate
- **Security**: No risk of data leakage between users
- **Scalability**: Easy to backup, restore, or migrate individual user databases
- **Performance**: Each database can be optimized independently

## Database Structure

### Main Database (`landlordlens_main`)

Stores:
- User accounts and authentication
- User-to-database mappings
- Subscription and payment information
- Admin system (updates, payments tracking)
- Application-wide configuration

**Schema**: `prisma/schema.prisma`

### Tenant Databases (`tenant_*`)

Each user gets their own database named `tenant_{userId}` that stores:
- Properties
- Tenancies
- Compliance records
- Maintenance tickets
- Transactions
- All user-specific data

**Schema**: `prisma/tenant-schema.prisma`

## Setup Process

### For Non-Technical Users

Run the simple setup script:

```bash
./setup-simple.sh
```

This script will:
1. Check prerequisites (Node.js, PostgreSQL)
2. Install dependencies
3. Create the main database
4. Set up database schemas
5. Create an admin account
6. Configure the application

### For Technical Users

Use the full setup script with GUI support:

```bash
./setup.sh
```

## User Onboarding Flow

1. **User Signs Up** → Account created in main database
2. **Database Creation** → Dedicated tenant database is automatically created
3. **Schema Migration** → Tenant database schema is deployed
4. **Data Seeding** → Initial compliance types are added
5. **User Ready** → User can start adding properties

## Admin Dashboard

Access at `/admin` (admin role required)

### Features:

1. **User Management** (`/admin/users`)
   - View all users
   - Manage user accounts
   - View user databases

2. **Payment Management** (`/admin/payments`)
   - Track all subscription payments
   - View revenue statistics
   - Export payment data

3. **Database Management** (`/admin/databases`)
   - Monitor all tenant databases
   - View database sizes and health
   - Backup management

4. **App Updates** (`/admin/updates`)
   - Deploy new application versions
   - Track update history
   - Manage changelogs

5. **Settings** (`/admin/settings`)
   - Application configuration
   - System settings

## Database Management Utilities

Located in `lib/db-manager.ts`:

- `createTenantDatabase()` - Creates a new tenant database
- `deleteTenantDatabase()` - Removes a tenant database
- `tenantDatabaseExists()` - Checks if database exists
- `generateTenantDatabaseName()` - Generates safe database name

## Tenant Prisma Client

Located in `lib/tenant-prisma.ts`:

- `getTenantPrismaClient()` - Get client for specific tenant database
- `getTenantClientForUser()` - Get client for a user by ID

## Security Considerations

1. **Database Isolation**: Each user's data is in a separate database
2. **Connection Strings**: Stored securely in main database, not exposed
3. **Admin Access**: Only users with `role: "ADMIN"` can access admin dashboard
4. **Authentication**: Uses NextAuth.js for secure authentication

## Backup Strategy

Each tenant database can be backed up independently:

```bash
pg_dump -h localhost -U postgres tenant_abc123 > backup_tenant_abc123.sql
```

## Scaling Considerations

- **Horizontal Scaling**: Each tenant database can be moved to different servers
- **Vertical Scaling**: Individual databases can be optimized based on usage
- **Load Balancing**: Main database handles authentication, tenant databases handle data

## Future Enhancements

- Automatic database backups
- Database health monitoring
- Automated migrations across all tenant databases
- Database sharding for very large tenants
- Read replicas for high-traffic tenants

