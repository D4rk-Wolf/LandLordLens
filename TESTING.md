# Testing Guide

This guide will help you test the LandlordLens application locally.

## Prerequisites

1. **PostgreSQL** must be installed and running
2. **Node.js 18+** and npm installed
3. Environment variables configured (see `.env.example`)

## Initial Setup

### 1. Database Setup

```bash
# Create the main database
createdb landlordlens_main

# Or using psql:
psql -U postgres -c "CREATE DATABASE landlordlens_main;"
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Usually `http://localhost:3000`

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Migration

```bash
# Generate Prisma clients
npm run generate

# Push main database schema
npm run db:push

# Seed compliance types (optional)
npm run db:seed
```

### 5. Create Admin Account

```bash
# Set admin credentials in .env or export them:
export ADMIN_EMAIL="Admin"
export ADMIN_PASSWORD="Lkjhgfdsaw1234"
export ADMIN_NAME="Admin"

# Create admin user
npm run create-admin
```

### 6. Start Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:3000`

## Testing Checklist

### Authentication

- [ ] **Sign Up**
  - Navigate to `/auth/signup`
  - Create a new account
  - Verify tenant database is created automatically
  - Verify redirect to dashboard after signup

- [ ] **Sign In**
  - Navigate to `/auth/signin`
  - Sign in with created account
  - Verify redirect to dashboard

- [ ] **Admin Sign In**
  - Sign in with admin credentials
  - Verify access to `/admin` dashboard
  - Verify non-admin users cannot access `/admin`

### Dashboard

- [ ] **Landlord Dashboard** (`/dashboard`)
  - View empty state (no properties)
  - Verify all stat cards show 0
  - Verify navigation works

- [ ] **Admin Dashboard** (`/admin`)
  - View user statistics
  - Verify totals are calculated correctly
  - Check recent users list

### Property Management

- [ ] **Create Property**
  - Navigate to `/properties/new`
  - Fill out property form
  - Submit and verify property is created
  - Verify redirect to properties list

- [ ] **View Properties**
  - Navigate to `/properties`
  - Verify created property appears
  - Check property details

- [ ] **Property Details**
  - Click on a property
  - Verify property information displays
  - Check tenancies section (empty initially)

### Admin Features

- [ ] **User Management** (`/admin/users`)
  - View all users
  - Verify user statistics (properties, tenancies)
  - Check user roles and plans

- [ ] **Payment Management** (`/admin/payments`)
  - View payment history
  - Verify revenue calculations
  - Check subscription counts

### Multi-Tenant Database

- [ ] **Database Isolation**
  - Create two test accounts
  - Add properties to each account
  - Verify each account only sees their own properties
  - Verify admin can see all properties across accounts

- [ ] **Tenant Database Creation**
  - Check PostgreSQL for tenant databases
  - Verify naming: `tenant_<userid>`
  - Verify compliance types are seeded

## Common Issues

### Database Connection Errors

**Problem**: Cannot connect to PostgreSQL

**Solution**:
- Verify PostgreSQL is running: `pg_isready`
- Check `DATABASE_URL` in `.env`
- Ensure database exists: `psql -l | grep landlordlens_main`

### Tenant Database Creation Fails

**Problem**: Signup succeeds but tenant DB not created

**Solution**:
- Check PostgreSQL user has CREATE DATABASE permission
- Verify `psql` command is available in PATH
- Check application logs for detailed error messages
- Ensure `DATABASE_URL` format is correct

### Prisma Client Errors

**Problem**: `Module not found: Can't resolve '../generated/tenant-client'`

**Solution**:
```bash
npm run generate
```

### Authentication Issues

**Problem**: Cannot sign in or session not persisting

**Solution**:
- Verify `NEXTAUTH_SECRET` is set in `.env`
- Check `NEXTAUTH_URL` matches your app URL
- Clear browser cookies and try again
- Check server logs for authentication errors

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Regenerate Prisma clients
npm run generate

# Check for linting errors
npm run lint

# Try rebuilding
npm run build
```

## Testing Admin Account

The admin account should be created with:
- **Email/Username**: `Admin`
- **Password**: `Lkjhgfdsaw1234`
- **Role**: `ADMIN`

To verify:
1. Sign in at `/auth/signin`
2. Navigate to `/admin`
3. Should see admin dashboard with user statistics

## Testing Multi-Tenancy

1. Create two test accounts (User A and User B)
2. Sign in as User A and add a property
3. Sign out and sign in as User B
4. Verify User B cannot see User A's property
5. Sign in as admin
6. Verify admin can see properties from both users

## Performance Testing

- Test with multiple users (10+)
- Verify tenant database creation doesn't block other signups
- Check dashboard load times with many properties
- Test admin dashboard with many users

## Security Testing

- [ ] Verify non-authenticated users cannot access protected routes
- [ ] Verify non-admin users cannot access `/admin` routes
- [ ] Test SQL injection protection (Prisma handles this)
- [ ] Verify password hashing (bcrypt)
- [ ] Check session expiration

## Next Steps

After basic testing passes:
1. Test property creation and editing
2. Test tenancy management
3. Test compliance tracking
4. Test maintenance tickets
5. Test payment integration (when implemented)

## Getting Help

If you encounter issues:
1. Check application logs in terminal
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure PostgreSQL is running and accessible
5. Review error messages carefully
