# LandlordLens

A modern property management and compliance tracking system for UK landlords, built with React Native Web.

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
- MongoDB 6.0+ (local or cloud instance)
- (Optional) GUI tools (zenity/kdialog) for better setup experience

## 🏗️ Architecture

This application uses a **multi-tenant database architecture** where each user gets their own dedicated PostgreSQL database. See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

The frontend is built with **React Native Web**, allowing the same codebase to run on web, iOS, and Android platforms.

## 🎯 Features

### Core Features
- **Dashboard**: Overview of properties, compliance, and maintenance
- **Property Management**: Add and manage properties with UK-specific compliance fields
- **Compliance Tracking**: Track UK compliance requirements (Gas Safety, EPC, HMO, etc.)
- **Maintenance Tickets**: Manage property maintenance requests
- **Admin Dashboard**: Manage users, payments, and deploy updates
- **Multi-Tenant**: Each user has their own isolated database

### New UK Landlord Compliance Features
- **Deposit Protection**: Track deposits in government-approved schemes (DPS, MyDeposits, TDS)
- **Right to Rent Checks**: Mandatory tenant verification for England
- **EPC Management**: Track Energy Performance Certificates with rating and expiry
- **Fire Safety**: Monitor smoke and carbon monoxide alarm installation/testing
- **HMO License Tracking**: Manage Houses in Multiple Occupation licenses
- **Legionella Risk Assessments**: Track water safety assessments
- **Inventory Management**: Comprehensive check-in/check-out inventories with photos
- **Tenant Background Checks**: Credit checks, employment verification, landlord references
- **Property Inspections**: Schedule and track routine and compliance inspections
- **Expense & Tax Tracking**: Categorize expenses for HMRC reporting with automatic tax year calculation
- **Rent Management**: Track rent increases, Section 13 notices, and rent reviews
- **Regional Compliance**: Support for England, Wales, Scotland, and Northern Ireland requirements

See [FEATURES_ADDED.md](./FEATURES_ADDED.md) for detailed information about all new features.

## 📁 Project Structure

```
├── src/                   # React Native source code
│   ├── screens/          # Screen components
│   ├── navigation/      # Navigation setup
│   ├── contexts/        # React contexts (Auth, etc.)
│   └── styles/          # Global styles
├── server/              # Express API server
│   ├── routes/         # API route handlers
│   └── index.js       # Server entry point
├── lib/                 # Utilities and helpers
│   ├── mongodb.js      # MongoDB connection
│   └── db.js          # Database models and helpers
├── models/              # Mongoose models
│   ├── User.js        # User model
│   ├── Payment.js     # Payment model
│   └── tenant/       # Tenant-specific models
│       ├── Property.js
│       ├── Tenancy.js
│       └── ...
└── setup-simple.sh     # Simple setup script
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server (web + API)
npm run dev

# Run web only
npm run web

# Run API server only
npm run server

# Build for production
npm run build
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and database design
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions

## 🔐 Admin Access

After setup, access the admin dashboard using your admin account credentials.

## 📝 License

Private - All rights reserved
