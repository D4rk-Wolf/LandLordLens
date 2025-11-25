# Quick Start Guide

Get LandlordLens running locally in minutes.

## Prerequisites

- PostgreSQL 14+ installed and running
- Node.js 18+ and npm
- Git (if cloning)

## Setup Steps

### 1. Environment Setup

Create a `.env` file:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/landlordlens_main"

# NextAuth (generate secret: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Account
ADMIN_EMAIL="Admin"
ADMIN_PASSWORD="Lkjhgfdsaw1234"
ADMIN_NAME="Admin"
```

### 2. Database Setup

```bash
# Create main database
createdb landlordlens_main

# Or using psql:
psql -U postgres -c "CREATE DATABASE landlordlens_main;"
```

### 3. Install & Setup

```bash
# Install dependencies
npm install

# Generate Prisma clients
npm run generate

# Push database schema
npm run db:push

# Create admin account
npm run create-admin
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## First Steps

1. **Sign Up**: Create a test account at `/auth/signup`
   - A tenant database will be created automatically
   - Compliance types will be seeded

2. **Sign In**: Use your new account or admin credentials
   - Admin: `Admin` / `Lkjhgfdsaw1234`
   - Your account: Email / Password you created

3. **Add Property**: Navigate to `/properties/new`
   - Fill out the form
   - Submit to create your first property

4. **View Dashboard**: Check `/dashboard` for overview
   - Stats will update as you add data

5. **Admin Dashboard**: Sign in as admin and visit `/admin`
   - View all users and their statistics
   - Monitor payments and subscriptions

## Key Features Ready for Testing

✅ **Authentication**
- Sign up / Sign in
- Session management
- Role-based access (Admin vs Landlord)

✅ **Multi-Tenant Database**
- Automatic tenant DB creation on signup
- Isolated data per user
- Admin can view all users

✅ **Property Management**
- Create properties
- View property list
- Property details page

✅ **Dashboard**
- Real-time statistics
- Property overview
- Compliance tracking (structure ready)

✅ **Admin Panel**
- User management
- Payment tracking
- System statistics

## Troubleshooting

**Database connection errors?**
- Verify PostgreSQL is running: `pg_isready`
- Check `DATABASE_URL` format
- Ensure database exists

**Tenant DB creation fails?**
- Check PostgreSQL user has `CREATE DATABASE` permission
- Verify `psql` is in PATH
- Check application logs

**Build errors?**
```bash
npm run generate  # Regenerate Prisma clients
npm run build     # Try building again
```

**Can't sign in?**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your app URL
- Clear browser cookies

## Next Steps

- Add more properties
- Create tenancies
- Set up compliance records
- Test maintenance tickets
- Explore admin features

## Documentation

- **[TESTING.md](./TESTING.md)** - Comprehensive testing guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions

## Support

For issues, check:
1. Application logs in terminal
2. Browser console for errors
3. Database connection status
4. Environment variables

Happy testing! 🚀

