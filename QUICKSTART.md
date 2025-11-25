# Quickstart Guide

## Current Status

LandlordLens currently runs as a **frontend-only demo**. All pages work with mock data so you can explore the UI and flows locally. A full backend (authentication, database, tenant provisioning) is being built next.

## Prerequisites

- Node.js 18+
- npm (bundled with Node.js)

## Run Locally (Mock Data)

```bash
git clone <repo-url>
cd LandLordLens
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser and explore the application. All data is mocked, so creating accounts or saving changes will not persist yet.

## Optional: Setup Scripts

Two setup scripts exist for when the backend is ready:

- `./setup-simple.sh` – non-technical wizard (coming soon)
- `./setup.sh` – advanced/GUI setup with database automation (coming soon)

For now, they will prompt you for database details but the backend is not wired up yet.

## Next Steps

- Backend implementation (authentication, database, multi-tenant provisioning)
- Connect frontend forms to real API routes
- Update setup scripts to automate backend provisioning

Once the backend work is complete you will be able to:
1. Sign up as a landlord
2. Automatically receive your own tenant database
3. Test the entire flow locally before deploying to a server

Stay tuned! 🎉

