#!/bin/bash

# LandlordLens Simple Setup Script
# Designed for non-technical users - guides through setup step by step

set -eo pipefail

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

clear
echo -e "${BLUE}${BOLD}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║          Welcome to LandlordLens Setup! 🏠              ║"
echo "║                                                           ║"
echo "║  This wizard will help you set up your application.      ║"
echo "║  Just follow the prompts - it's that simple!             ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}\n"

# Step 1: Check prerequisites
echo -e "${BLUE}${BOLD}Step 1: Checking Prerequisites${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed.${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/ and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node --version) is installed"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm $(npm --version) is installed"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} PostgreSQL client not found"
    echo -e "${YELLOW}You'll need PostgreSQL installed. Let's check if we can install it...${NC}\n"
    
    # Try to detect package manager
    if command -v apt-get &> /dev/null; then
        echo "We can install PostgreSQL for you. This requires administrator access."
        read -p "Install PostgreSQL now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            sudo apt-get update
            sudo apt-get install -y postgresql postgresql-contrib
        fi
    elif command -v brew &> /dev/null; then
        echo "We can install PostgreSQL for you using Homebrew."
        read -p "Install PostgreSQL now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            brew install postgresql@14
            brew services start postgresql@14
        fi
    else
        echo -e "${YELLOW}Please install PostgreSQL manually and run this script again.${NC}"
        echo "Visit: https://www.postgresql.org/download/"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} PostgreSQL is installed"
fi

echo -e "\n${GREEN}${BOLD}All prerequisites are ready!${NC}\n"

# Step 2: Install dependencies
echo -e "${BLUE}${BOLD}Step 2: Installing Dependencies${NC}\n"
echo "This may take a few minutes. Please wait..."
npm install
echo -e "${GREEN}✓${NC} Dependencies installed\n"

# Step 3: Database setup
echo -e "${BLUE}${BOLD}Step 3: Database Setup${NC}\n"
echo "We need to set up your main database. This will store user accounts and manage tenant databases."

# Get database connection details
read -p "PostgreSQL username [postgres]: " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "PostgreSQL password (leave empty if none): " DB_PASSWORD
echo

read -p "Database host [localhost]: " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Database port [5432]: " DB_PORT
DB_PORT=${DB_PORT:-5432}

read -p "Main database name [landlordlens_main]: " MAIN_DB
MAIN_DB=${MAIN_DB:-landlordlens_main}

# Create main database
echo -e "\nCreating main database..."
export PGPASSWORD="$DB_PASSWORD"
if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "CREATE DATABASE $MAIN_DB;" 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Main database created"
else
    echo -e "${YELLOW}⚠${NC} Database might already exist (that's okay)"
fi

# Create .env file
echo -e "\nCreating configuration file..."
cat > .env << EOF
# Main Database (stores user accounts and tenant mappings)
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${MAIN_DB}?schema=public"

# Application URLs
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Secrets (auto-generated)
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
CRON_SECRET="$(openssl rand -base64 32)"

# Stripe (Optional - add later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Email (Optional - add later)
RESEND_API_KEY=""

# SMS (Optional - add later)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""
EOF

echo -e "${GREEN}✓${NC} Configuration file created"

# Step 4: Run database migrations
echo -e "\n${BLUE}${BOLD}Step 4: Setting Up Database Schema${NC}\n"
echo "Creating database tables..."

# Generate Prisma client
npx prisma generate

# Push main schema
npx prisma db push

echo -e "${GREEN}✓${NC} Database schema created"

# Step 5: Seed initial data
echo -e "\n${BLUE}${BOLD}Step 5: Seeding Initial Data${NC}\n"
if [ -f "prisma/seed.ts" ]; then
    npm run db:seed || echo -e "${YELLOW}⚠${NC} Seeding skipped (optional)"
fi

# Step 6: Create admin user
echo -e "\n${BLUE}${BOLD}Step 6: Create Admin Account${NC}\n"
echo "Let's create your admin account so you can manage the application."

read -p "Admin email: " ADMIN_EMAIL
read -sp "Admin password: " ADMIN_PASSWORD
echo
read -p "Admin name: " ADMIN_NAME

# Hash password (using Node.js)
ADMIN_PASSWORD_HASH=$(node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('$ADMIN_PASSWORD', 10))")

# Create admin user in database
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$MAIN_DB" << EOF
INSERT INTO users (id, email, password, name, role, "onboardingCompleted", "createdAt", "updatedAt")
VALUES (
  'admin_' || substr(md5(random()::text), 0, 20),
  '$ADMIN_EMAIL',
  '$ADMIN_PASSWORD_HASH',
  '$ADMIN_NAME',
  'ADMIN',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;
EOF

echo -e "${GREEN}✓${NC} Admin account created"

# Final summary
echo -e "\n${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}${BOLD}  Setup Complete! 🎉${NC}"
echo -e "${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BOLD}What's Next:${NC}\n"
echo "1. Start the application:"
echo -e "   ${GREEN}npm run dev${NC}\n"
echo "2. Open your browser and go to:"
echo -e "   ${BLUE}http://localhost:3000${NC}\n"
echo "3. Sign in with your admin account:"
echo -e "   Email: ${BLUE}$ADMIN_EMAIL${NC}\n"
echo "4. Access the admin dashboard at:"
echo -e "   ${BLUE}http://localhost:3000/admin${NC}\n"

echo -e "${YELLOW}Note:${NC} Each new user will automatically get their own database when they sign up.\n"

echo -e "${BOLD}Need Help?${NC}"
echo "Check the README.md file for more information.\n"

