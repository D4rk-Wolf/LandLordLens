# LandlordLens

A modern property management and compliance tracking system for UK landlords.

## 🚀 Quick Start

### For Non-Technical Users

Run the simple setup script:

```bash
./setup-simple.sh
```

This will guide you through the entire setup process step by step.

### For Technical Users

Run the full setup script with GUI support:

```bash
./setup.sh
```

Or with debug mode:

```bash
./setup.sh --debug
```

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- (Optional) GUI tools (zenity/kdialog) for better setup experience

## 🏗️ Architecture

This application uses a **multi-tenant database architecture** where each user gets their own dedicated PostgreSQL database. See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## 🎯 Features

- **Dashboard**: Overview of properties, compliance, and maintenance
- **Property Management**: Add and manage properties
- **Compliance Tracking**: Track UK compliance requirements (Gas Safety, EPC, etc.)
- **Maintenance Tickets**: Manage property maintenance requests
- **Admin Dashboard**: Manage users, payments, and deploy updates
- **Multi-Tenant**: Each user has their own isolated database

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # User dashboard
│   ├── properties/        # Property management
│   └── ...
├── components/            # React components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                   # Utilities and helpers
│   ├── db-manager.ts     # Database management (multi-tenant)
│   └── tenant-prisma.ts  # Tenant database client
├── prisma/                # Database schemas
│   ├── schema.prisma     # Main database schema
│   └── tenant-schema.prisma # Tenant database schema
└── setup-simple.sh       # Simple setup script
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and database design
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[TESTING.md](./TESTING.md)** - Testing guide

## 🔐 Admin Access

After setup, access the admin dashboard at `/admin` using your admin account credentials.

## 📝 License

Private - All rights reserved
