#!/bin/bash

# LandlordLens Setup Script
# This script automates the setup process for LandlordLens
#
# Usage:
#   ./setup.sh              - Run setup normally
#   ./setup.sh --debug      - Run setup with debug output
#   DEBUG=1 ./setup.sh      - Run setup with debug output (alternative)

set -eo pipefail

# Debug mode - can be enabled via --debug flag or DEBUG environment variable
DEBUG_MODE=false
if [ "$1" = "--debug" ] || [ "$1" = "-d" ] || [ "${DEBUG:-}" = "1" ] || [ "${DEBUG:-}" = "true" ]; then
    DEBUG_MODE=true
    echo "🐛 Debug mode enabled"
    echo "   - All commands will be logged"
    echo "   - Detailed error messages will be shown"
    echo "   - Script execution will be verbose"
    echo ""
fi

# Debug logging function
debug_log() {
    if [ "$DEBUG_MODE" = true ]; then
        echo "[DEBUG] $*" >&2
    fi
}  # Exit on error, pipe failures (removed -u to allow optional vars)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# Spinner for long operations
spinner() {
    local pid=$1
    if [ -z "$pid" ] || [ "$pid" -le 0 ]; then
        return 0
    fi
    local delay=0.1
    local spinstr='|/-\'
    # Use kill -0 to check if process exists (more portable than ps)
    while kill -0 "$pid" 2>/dev/null; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr" 2>/dev/null || printf " [*]  "
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay 2>/dev/null || sleep 1
        printf "\b\b\b\b\b\b" 2>/dev/null || printf "\n"
    done
    printf "    \b\b\b\b" 2>/dev/null || printf "\n"
}

# Functions
print_success() {
    echo -e "${GREEN}${BOLD}✓${NC} ${GREEN}$1${NC}"
}

print_error() {
    echo -e "${RED}${BOLD}✗${NC} ${RED}$1${NC}" >&2
}

print_info() {
    echo -e "${BLUE}${BOLD}ℹ${NC} ${BLUE}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${BOLD}⚠${NC} ${YELLOW}$1${NC}"
}

print_step() {
    echo -e "\n${CYAN}${BOLD}→${NC} ${CYAN}$1${NC}"
}

print_substep() {
    echo -e "  ${DIM}•${NC} ${DIM}$1${NC}"
}

print_header() {
    echo -e "\n${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}${BOLD}  $1${NC}"
    echo -e "${BLUE}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_section() {
    echo -e "\n${MAGENTA}${BOLD}▸${NC} ${MAGENTA}${BOLD}$1${NC}"
    echo -e "${DIM}────────────────────────────────────────────────────────────${NC}"
}

print_hint() {
    echo -e "${DIM}💡 Hint: $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1 || return 1
}

# Detect package manager
detect_package_manager() {
    if command_exists apt-get; then
        echo "apt"
    elif command_exists yum; then
        echo "yum"
    elif command_exists dnf; then
        echo "dnf"
    elif command_exists pacman; then
        echo "pacman"
    elif command_exists brew; then
        echo "brew"
    else
        echo "unknown"
    fi
}

# Install package based on system
install_package() {
    local package="$1"
    local name="$2"
    
    PM=$(detect_package_manager)
    
    case $PM in
        apt)
            print_info "Installing $name using apt..."
            if [ "$EUID" -ne 0 ]; then
                print_warning "Need sudo privileges to install $name"
                if sudo apt-get update && sudo apt-get install -y "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    print_error "Failed to install $name. Please install manually: sudo apt-get install $package"
                    return 1
                fi
            else
                if apt-get update && apt-get install -y "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    return 1
                fi
            fi
            ;;
        yum|dnf)
            print_info "Installing $name using $PM..."
            if [ "$EUID" -ne 0 ]; then
                print_warning "Need sudo privileges to install $name"
                if sudo $PM install -y "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    print_error "Failed to install $name. Please install manually: sudo $PM install $package"
                    return 1
                fi
            else
                if $PM install -y "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    return 1
                fi
            fi
            ;;
        pacman)
            print_info "Installing $name using pacman..."
            if [ "$EUID" -ne 0 ]; then
                print_warning "Need sudo privileges to install $name"
                if sudo pacman -S --noconfirm "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    print_error "Failed to install $name. Please install manually: sudo pacman -S $package"
                    return 1
                fi
            else
                if pacman -S --noconfirm "$package"; then
                    print_success "$name installed"
                    return 0
                else
                    return 1
                fi
            fi
            ;;
        brew)
            print_info "Installing $name using Homebrew..."
            if brew install "$package"; then
                print_success "$name installed"
                return 0
            else
                print_error "Failed to install $name. Please install manually: brew install $package"
                return 1
            fi
            ;;
        *)
            print_warning "Unknown package manager. Cannot auto-install $name"
            print_info "Please install $name manually for your system"
            return 1
            ;;
    esac
}

# Check and install Node.js
check_install_nodejs() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        NODE_FULL_VERSION=$(node --version)
        if [ "$NODE_VERSION" -ge 18 ]; then
            print_success "Node.js $NODE_FULL_VERSION is installed (✓ meets requirement)"
            print_substep "Node.js version check passed"
            return 0
        else
            print_warning "Node.js 18+ is required. Found: $NODE_FULL_VERSION"
            print_hint "You'll need to upgrade Node.js to version 18 or higher"
        fi
    else
        print_warning "Node.js is not installed"
        print_hint "Node.js is required to run this application"
    fi
    
    # Try to install - use GUI dialog if available, otherwise CLI
    if command_exists zenity || command_exists kdialog || [[ "$OSTYPE" == "darwin"* ]]; then
        INSTALL_NODE=$(show_yesno_dialog "Install Node.js?" "Node.js 18+ is required but not found. Would you like to install it automatically?")
    else
        read -p "Node.js 18+ is required but not found. Install it automatically? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            INSTALL_NODE="Yes"
        else
            INSTALL_NODE="No"
        fi
    fi
    
    if [ "$INSTALL_NODE" = "Yes" ]; then
        PM=$(detect_package_manager)
        case $PM in
            apt)
                # Install Node.js 18+ from NodeSource
                print_info "Adding NodeSource repository..."
                if [ "$EUID" -ne 0 ]; then
                    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                    install_package "nodejs" "Node.js"
                else
                    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                    install_package "nodejs" "Node.js"
                fi
                ;;
            yum|dnf)
                print_info "Adding NodeSource repository..."
                if [ "$EUID" -ne 0 ]; then
                    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
                    install_package "nodejs" "Node.js"
                else
                    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
                    install_package "nodejs" "Node.js"
                fi
                ;;
            pacman)
                install_package "nodejs" "Node.js"
                ;;
            brew)
                install_package "nodejs" "Node.js"
                ;;
            *)
                print_error "Cannot auto-install Node.js. Please install from https://nodejs.org/"
                return 1
                ;;
        esac
        
        # Verify installation
        if command_exists node; then
            print_success "Node.js $(node --version) installed successfully"
            return 0
        else
            print_error "Node.js installation failed. Please install manually from https://nodejs.org/"
            return 1
        fi
    else
        print_error "Node.js is required. Please install from https://nodejs.org/"
        return 1
    fi
}

# Check if PostgreSQL server is installed (not just client)
check_postgresql_server_installed() {
    PM=$(detect_package_manager)
    
    case $PM in
        apt)
            if dpkg -l | grep -q "^ii.*postgresql-[0-9]" 2>/dev/null || \
               systemctl list-unit-files | grep -q postgresql 2>/dev/null; then
                return 0
            fi
            ;;
        yum|dnf)
            if rpm -qa | grep -q postgresql-server 2>/dev/null || \
               systemctl list-unit-files | grep -q postgresql 2>/dev/null; then
                return 0
            fi
            ;;
        pacman)
            if pacman -Q postgresql 2>/dev/null | grep -q postgresql; then
                return 0
            fi
            ;;
        brew)
            if brew list | grep -q postgresql 2>/dev/null; then
                return 0
            fi
            ;;
    esac
    
    # Also check for common PostgreSQL binaries
    if command_exists postgres || command_exists pg_ctl || [ -d "/usr/lib/postgresql" ] || [ -d "/var/lib/postgresql" ]; then
        return 0
    fi
    
    return 1
}

# Check if PostgreSQL server is running
check_postgresql_server() {
    if ! command_exists psql; then
        return 1
    fi
    
    # Try multiple connection methods
    if command_exists pg_isready; then
        if pg_isready -h localhost >/dev/null 2>&1 || \
           pg_isready >/dev/null 2>&1; then
            return 0
        fi
    fi
    
    # Try to connect as postgres user
    if psql -h localhost -U postgres -c '\q' 2>/dev/null; then
        return 0
    fi
    
    # Try to connect as current user
    if psql -c '\q' 2>/dev/null; then
        return 0
    fi
    
    # Try to connect to default database
    if psql -d postgres -c '\q' 2>/dev/null; then
        return 0
    fi
    
    return 1
}

# Install PostgreSQL server
install_postgresql_server() {
    PM=$(detect_package_manager)
    
    print_info "Installing PostgreSQL server..."
    
    case $PM in
        apt)
            install_package "postgresql" "PostgreSQL Server"
            install_package "postgresql-contrib" "PostgreSQL Contrib"
            ;;
        yum|dnf)
            install_package "postgresql-server" "PostgreSQL Server"
            install_package "postgresql-contrib" "PostgreSQL Contrib"
            # Initialize database cluster
            if [ "$EUID" -ne 0 ]; then
                if sudo postgresql-setup --initdb 2>/dev/null || sudo /usr/bin/postgresql-setup --initdb 2>/dev/null; then
                    print_success "PostgreSQL database cluster initialized"
                fi
            else
                if postgresql-setup --initdb 2>/dev/null || /usr/bin/postgresql-setup --initdb 2>/dev/null; then
                    print_success "PostgreSQL database cluster initialized"
                fi
            fi
            ;;
        pacman)
            install_package "postgresql" "PostgreSQL Server"
            # Initialize database cluster
            if [ "$EUID" -ne 0 ]; then
                if sudo -u postgres initdb -D /var/lib/postgres/data 2>/dev/null; then
                    print_success "PostgreSQL database cluster initialized"
                fi
            fi
            ;;
        brew)
            install_package "postgresql@14" "PostgreSQL Server" || install_package "postgresql" "PostgreSQL Server"
            # Initialize database cluster
            if brew services start postgresql@14 2>/dev/null || brew services start postgresql 2>/dev/null; then
                sleep 3
                print_success "PostgreSQL service started"
            fi
            ;;
        *)
            print_warning "Cannot auto-install PostgreSQL server. Please install manually."
            return 1
            ;;
    esac
    
    # Start the service
    if start_postgresql_service; then
        return 0
    fi
    
    return 1
}

# Start PostgreSQL service
start_postgresql_service() {
    PM=$(detect_package_manager)
    
    case $PM in
        apt|yum|dnf)
            if command_exists systemctl; then
                print_info "Attempting to start PostgreSQL service..."
                if [ "$EUID" -ne 0 ]; then
                    # Try different service names
                    if sudo systemctl start postgresql 2>/dev/null; then
                        sleep 3
                        if check_postgresql_server; then
                            print_success "PostgreSQL service started"
                            return 0
                        fi
                    fi
                    # Try versioned service names
                    for version in 16 15 14 13 12; do
                        if sudo systemctl start "postgresql@${version}-main" 2>/dev/null || \
                           sudo systemctl start "postgresql@${version}" 2>/dev/null; then
                            sleep 3
                            if check_postgresql_server; then
                                print_success "PostgreSQL service started"
                                return 0
                            fi
                        fi
                    done
                else
                    if systemctl start postgresql 2>/dev/null; then
                        sleep 3
                        if check_postgresql_server; then
                            print_success "PostgreSQL service started"
                            return 0
                        fi
                    fi
                fi
            fi
            ;;
        brew)
            print_info "Attempting to start PostgreSQL service..."
            # Try different versions
            for version in 14 15 16 ""; do
                if [ -n "$version" ]; then
                    if brew services start "postgresql@${version}" 2>/dev/null; then
                        sleep 3
                        if check_postgresql_server; then
                            print_success "PostgreSQL service started"
                            return 0
                        fi
                    fi
                else
                    if brew services start postgresql 2>/dev/null; then
                        sleep 3
                        if check_postgresql_server; then
                            print_success "PostgreSQL service started"
                            return 0
                        fi
                    fi
                fi
            done
            ;;
    esac
    
    return 1
}

# Setup PostgreSQL user and permissions
setup_postgresql_user() {
    local db_user="$1"
    local db_name="$2"
    local db_url="$3"
    
    if [ -z "$db_url" ]; then
        db_url=$(grep DATABASE_URL .env 2>/dev/null | sed 's/.*="\(.*\)"/\1/')
    fi
    
    print_info "Setting up PostgreSQL user and permissions..."
    
    DB_PASSWORD=$(echo "$db_url" | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
    
    # Try to connect as postgres superuser
    if psql -U postgres -c '\q' 2>/dev/null; then
        # User exists, check if we can create database
        if psql -U postgres -c "SELECT 1 FROM pg_user WHERE usename='$db_user';" 2>/dev/null | grep -q 1; then
            print_success "PostgreSQL user '$db_user' exists"
        else
            # Create user
            if psql -U postgres -c "CREATE USER $db_user WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null; then
                print_success "Created PostgreSQL user '$db_user'"
            fi
        fi
        
        # Grant permissions
        if psql -U postgres -c "ALTER USER $db_user CREATEDB;" 2>/dev/null; then
            print_success "Granted database creation permissions to '$db_user'"
        fi
        return 0
    fi
    
    # Try with sudo
    if [ "$EUID" -ne 0 ] && command_exists sudo; then
        if sudo -u postgres psql -c '\q' 2>/dev/null; then
            if sudo -u postgres psql -c "SELECT 1 FROM pg_user WHERE usename='$db_user';" 2>/dev/null | grep -q 1; then
                print_success "PostgreSQL user '$db_user' exists"
            else
                if sudo -u postgres psql -c "CREATE USER $db_user WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null; then
                    print_success "Created PostgreSQL user '$db_user'"
                fi
            fi
            
            if sudo -u postgres psql -c "ALTER USER $db_user CREATEDB;" 2>/dev/null; then
                print_success "Granted database creation permissions to '$db_user'"
            fi
            return 0
        fi
    fi
    
    print_warning "Could not set up PostgreSQL user automatically"
    print_info "You may need to run these commands manually:"
    echo "  ${GREEN}sudo -u postgres psql${NC}"
    echo "  ${GREEN}CREATE USER $db_user WITH PASSWORD '$DB_PASSWORD';${NC}"
    echo "  ${GREEN}ALTER USER $db_user CREATEDB;${NC}"
    echo "  ${GREEN}\\q${NC}"
    
    return 1
}

# Show PostgreSQL setup help
show_postgresql_setup_help() {
    PM=$(detect_package_manager)
    
    print_header "PostgreSQL Setup Guide"
    echo ""
    print_info "Complete PostgreSQL setup instructions:"
    echo ""
    
    case $PM in
        apt)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo apt update${NC}"
            echo "   ${GREEN}sudo apt install postgresql postgresql-contrib${NC}"
            echo ""
            echo "2. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "3. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            echo ""
            echo "4. Set password for postgres user (optional):"
            echo "   ${GREEN}sudo -u postgres psql${NC}"
            echo "   ${GREEN}ALTER USER postgres PASSWORD 'your_password';${NC}"
            echo "   ${GREEN}\\q${NC}"
            ;;
        yum|dnf)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo yum install postgresql-server postgresql-contrib${NC}"
            echo "   (or: ${GREEN}sudo dnf install postgresql-server postgresql-contrib${NC})"
            echo ""
            echo "2. Initialize database cluster:"
            echo "   ${GREEN}sudo postgresql-setup --initdb${NC}"
            echo ""
            echo "3. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "4. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            ;;
        pacman)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo pacman -S postgresql${NC}"
            echo ""
            echo "2. Initialize database cluster:"
            echo "   ${GREEN}sudo -u postgres initdb -D /var/lib/postgres/data${NC}"
            echo ""
            echo "3. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "4. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            ;;
        brew)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}brew install postgresql@14${NC}  (or postgresql for latest)"
            echo ""
            echo "2. Start PostgreSQL service:"
            echo "   ${GREEN}brew services start postgresql@14${NC}"
            echo ""
            echo "3. PostgreSQL will automatically start on boot with Homebrew services"
            ;;
    esac
    
    echo ""
    echo "5. Create a database user (if not using 'postgres' user):"
    echo "   ${GREEN}sudo -u postgres psql${NC}"
    echo "   ${GREEN}CREATE USER your_username WITH PASSWORD 'your_password';${NC}"
    echo "   ${GREEN}ALTER USER your_username CREATEDB;${NC}"
    echo "   ${GREEN}\\q${NC}"
    echo ""
    echo "6. Create the database:"
    echo "   ${GREEN}createdb -U your_username landlordlens${NC}"
    echo "   Or: ${GREEN}psql -U postgres -c \"CREATE DATABASE landlordlens OWNER your_username;\"${NC}"
    echo ""
    echo "7. Update DATABASE_URL in .env file:"
    echo "   ${GREEN}DATABASE_URL=\"postgresql://your_username:your_password@localhost:5432/landlordlens?schema=public\"${NC}"
    echo ""
}

# List existing PostgreSQL databases
list_postgresql_databases() {
    local db_user="$1"
    local db_url="$2"
    
    local DB_PASSWORD=""
    if [ -n "$db_url" ]; then
        DB_PASSWORD=$(echo "$db_url" | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
    fi
    
    local DATABASES=""
    local RAW_OUTPUT=""
    
    # Try multiple methods to list databases
    # Method 1: Using psql as postgres superuser
    RAW_OUTPUT=$(psql -U postgres -lqt 2>/dev/null || true)
    if [ -n "$RAW_OUTPUT" ]; then
        DATABASES=$(echo "$RAW_OUTPUT" | cut -d \| -f 1 | sed 's/^ *//;s/ *$//' | grep -v '^$' | grep -v '^template0$' | grep -v '^template1$' | grep -v '^postgres$' | sort -u)
    # Method 2: Using sudo -u postgres
    elif [ "$EUID" -ne 0 ] && command_exists sudo; then
        RAW_OUTPUT=$(sudo -u postgres psql -lqt 2>/dev/null || true)
        if [ -n "$RAW_OUTPUT" ]; then
            DATABASES=$(echo "$RAW_OUTPUT" | cut -d \| -f 1 | sed 's/^ *//;s/ *$//' | grep -v '^$' | grep -v '^template0$' | grep -v '^template1$' | grep -v '^postgres$' | sort -u)
        fi
    # Method 3: Using current user with password
    elif [ -n "$DB_PASSWORD" ] && [ -n "$db_user" ]; then
        RAW_OUTPUT=$(PGPASSWORD="$DB_PASSWORD" psql -h localhost -U "$db_user" -lqt 2>/dev/null || true)
        if [ -n "$RAW_OUTPUT" ]; then
            DATABASES=$(echo "$RAW_OUTPUT" | cut -d \| -f 1 | sed 's/^ *//;s/ *$//' | grep -v '^$' | grep -v '^template0$' | grep -v '^template1$' | grep -v '^postgres$' | sort -u)
        fi
    # Method 4: Using current user without password
    else
        RAW_OUTPUT=$(psql -lqt 2>/dev/null || true)
        if [ -n "$RAW_OUTPUT" ]; then
            DATABASES=$(echo "$RAW_OUTPUT" | cut -d \| -f 1 | sed 's/^ *//;s/ *$//' | grep -v '^$' | grep -v '^template0$' | grep -v '^template1$' | grep -v '^postgres$' | sort -u)
        fi
    fi
    
    # Return databases as newline-separated list (only non-empty)
    if [ -n "$DATABASES" ]; then
        echo "$DATABASES" | grep -v '^$'
        return 0
    fi
    
    return 1
}

# Show database selection dialog
show_database_selection() {
    local db_user="$1"
    local db_url="$2"
    local default_db="$3"
    
    print_info "Checking for existing databases..."
    
    local DATABASES
    if DATABASES=$(list_postgresql_databases "$db_user" "$db_url"); then
        local DB_COUNT=$(echo "$DATABASES" | wc -l | tr -d ' ')
        
        if [ "$DB_COUNT" -gt 0 ]; then
            print_success "Found $DB_COUNT existing database(s)"
            echo ""
            print_info "Existing databases:"
            echo "$DATABASES" | nl -w 2 -s '. '
            echo ""
            
            # Create numbered list for display
            local DB_LIST=""
            local COUNTER=1
            while IFS= read -r db; do
                if [ -n "$db" ]; then
                    DB_LIST="${DB_LIST}${COUNTER}. ${db}\n"
                    COUNTER=$((COUNTER + 1))
                fi
            done <<< "$DATABASES"
            
            if command_exists zenity; then
                # Use zenity list dialog
                local SELECTED_DB=$(echo "$DATABASES" | zenity --list --title "Select Database" --text "Choose an existing database or create a new one:" --column "Database" --extra-button "Create New" 2>/dev/null)
                if [ "$?" = "1" ]; then
                    # Check if "Create New" was clicked
                    if [ -z "$SELECTED_DB" ]; then
                        echo "new"
                        return 0
                    fi
                fi
                if [ -n "$SELECTED_DB" ]; then
                    echo "$SELECTED_DB"
                    return 0
                else
                    echo "new"
                    return 0
                fi
            elif command_exists kdialog; then
                # Use kdialog menu
                local MENU_ITEMS=""
                while IFS= read -r db; do
                    if [ -n "$db" ]; then
                        MENU_ITEMS="${MENU_ITEMS}${db}\n"
                    fi
                done <<< "$DATABASES"
                MENU_ITEMS="${MENU_ITEMS}---\nCreate New Database"
                local SELECTED_DB=$(echo -e "$MENU_ITEMS" | kdialog --title "Select Database" --menu "Choose an existing database or create a new one:" 2>/dev/null)
                if [ -n "$SELECTED_DB" ] && [ "$SELECTED_DB" != "Create New Database" ]; then
                    echo "$SELECTED_DB"
                    return 0
                else
                    echo "new"
                    return 0
                fi
            elif [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS - use osascript with list
                local DB_OPTIONS=""
                while IFS= read -r db; do
                    if [ -n "$db" ]; then
                        DB_OPTIONS="${DB_OPTIONS}\"${db}\", "
                    fi
                done <<< "$DATABASES"
                DB_OPTIONS="${DB_OPTIONS}\"Create New Database\""
                
                local SELECTED_DB=$(osascript <<EOF
tell application "System Events"
    activate
    set dbList to {$DB_OPTIONS}
    set selectedDB to choose from list dbList with title "Select Database" with prompt "Choose an existing database or create a new one:" default items {"Create New Database"}
    if selectedDB is false then
        return "new"
    else
        return item 1 of selectedDB
    end if
end tell
EOF
)
                if [ "$SELECTED_DB" = "Create New Database" ] || [ -z "$SELECTED_DB" ]; then
                    echo "new"
                else
                    echo "$SELECTED_DB"
                fi
                return 0
            else
                # CLI fallback
                echo ""
                print_info "Select an option:"
                echo "  Enter a number (1-$DB_COUNT) to use an existing database"
                echo "  Or type 'new' to create a new database"
                echo ""
                read -p "Your choice: " SELECTION
                
                # Check if selection is a number
                if [[ "$SELECTION" =~ ^[0-9]+$ ]] && [ "$SELECTION" -ge 1 ] && [ "$SELECTION" -le "$DB_COUNT" ]; then
                    local SELECTED_DB=$(echo "$DATABASES" | sed -n "${SELECTION}p" | sed 's/^ *//' | sed 's/ *$//')
                    echo "$SELECTED_DB"
                    return 0
                elif [ "$SELECTION" = "new" ] || [ -z "$SELECTION" ]; then
                    echo "new"
                    return 0
                else
                    print_warning "Invalid selection. Will create a new database."
                    echo "new"
                    return 0
                fi
            fi
        fi
    fi
    
    # No databases found or couldn't list them
    print_info "No existing databases found (or couldn't list them)"
    echo "new"
    return 0
}

# Create PostgreSQL database
create_postgresql_database() {
    local db_name="$1"
    local db_user="$2"
    local db_url="$3"
    
    print_info "Creating database '$db_name'..."
    
    # Extract password from URL
    DB_PASSWORD=$(echo "$db_url" | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
    
    # Try multiple methods to create database
    # Method 1: Using createdb command
    if command_exists createdb; then
        if PGPASSWORD="$DB_PASSWORD" createdb -U "$db_user" "$db_name" 2>/dev/null; then
            print_success "Database '$db_name' created using createdb"
            return 0
        fi
    fi
    
    # Method 2: Using psql as postgres superuser
    if psql -U postgres -c "CREATE DATABASE $db_name OWNER $db_user;" 2>/dev/null; then
        print_success "Database '$db_name' created"
        return 0
    fi
    
    # Method 3: Using sudo -u postgres
    if [ "$EUID" -ne 0 ] && command_exists sudo; then
        if sudo -u postgres psql -c "CREATE DATABASE $db_name OWNER $db_user;" 2>/dev/null; then
            print_success "Database '$db_name' created"
            return 0
        fi
    fi
    
    # Method 4: Direct connection with password
    if PGPASSWORD="$DB_PASSWORD" psql -h localhost -U "$db_user" -d postgres -c "CREATE DATABASE $db_name;" 2>/dev/null; then
        print_success "Database '$db_name' created"
        return 0
    fi
    
    print_error "Failed to create database automatically"
    print_info "Please create it manually using one of these methods:"
    echo "  1. ${GREEN}createdb -U $db_user $db_name${NC}"
    echo "  2. ${GREEN}psql -U postgres -c \"CREATE DATABASE $db_name OWNER $db_user;\"${NC}"
    echo "  3. ${GREEN}sudo -u postgres psql -c \"CREATE DATABASE $db_name OWNER $db_user;\"${NC}"
    
    return 1
}

# Show PostgreSQL setup help
show_postgresql_setup_help() {
    PM=$(detect_package_manager)
    
    print_header "PostgreSQL Setup Guide"
    echo ""
    print_info "Complete PostgreSQL setup instructions:"
    echo ""
    
    case $PM in
        apt)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo apt update${NC}"
            echo "   ${GREEN}sudo apt install postgresql postgresql-contrib${NC}"
            echo ""
            echo "2. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "3. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            echo ""
            echo "4. Set password for postgres user (optional):"
            echo "   ${GREEN}sudo -u postgres psql${NC}"
            echo "   ${GREEN}ALTER USER postgres PASSWORD 'your_password';${NC}"
            echo "   ${GREEN}\\q${NC}"
            ;;
        yum|dnf)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo yum install postgresql-server postgresql-contrib${NC}"
            echo "   (or: ${GREEN}sudo dnf install postgresql-server postgresql-contrib${NC})"
            echo ""
            echo "2. Initialize database cluster:"
            echo "   ${GREEN}sudo postgresql-setup --initdb${NC}"
            echo ""
            echo "3. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "4. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            ;;
        pacman)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}sudo pacman -S postgresql${NC}"
            echo ""
            echo "2. Initialize database cluster:"
            echo "   ${GREEN}sudo -u postgres initdb -D /var/lib/postgres/data${NC}"
            echo ""
            echo "3. Start PostgreSQL service:"
            echo "   ${GREEN}sudo systemctl start postgresql${NC}"
            echo ""
            echo "4. Enable PostgreSQL to start on boot:"
            echo "   ${GREEN}sudo systemctl enable postgresql${NC}"
            ;;
        brew)
            echo "1. Install PostgreSQL:"
            echo "   ${GREEN}brew install postgresql@14${NC}  (or postgresql for latest)"
            echo ""
            echo "2. Start PostgreSQL service:"
            echo "   ${GREEN}brew services start postgresql@14${NC}"
            echo ""
            echo "3. PostgreSQL will automatically start on boot with Homebrew services"
            ;;
    esac
    
    echo ""
    echo "5. Create a database user (if not using 'postgres' user):"
    echo "   ${GREEN}sudo -u postgres psql${NC}"
    echo "   ${GREEN}CREATE USER your_username WITH PASSWORD 'your_password';${NC}"
    echo "   ${GREEN}ALTER USER your_username CREATEDB;${NC}"
    echo "   ${GREEN}\\q${NC}"
    echo ""
    echo "6. Create the database:"
    echo "   ${GREEN}createdb -U your_username landlordlens${NC}"
    echo "   Or: ${GREEN}psql -U postgres -c \"CREATE DATABASE landlordlens OWNER your_username;\"${NC}"
    echo ""
    echo "7. Update DATABASE_URL in .env file:"
    echo "   ${GREEN}DATABASE_URL=\"postgresql://your_username:your_password@localhost:5432/landlordlens?schema=public\"${NC}"
    echo ""
}

# Check and install PostgreSQL (client and server)
check_install_postgresql() {
    local install_server=false
    local server_installed=false
    local server_running=false
    
    # Check if client is installed
    if command_exists psql; then
        print_success "PostgreSQL client is installed"
    else
        print_warning "PostgreSQL client (psql) not found"
        # Use GUI dialog if available, otherwise CLI
        if command_exists zenity || command_exists kdialog || [[ "$OSTYPE" == "darwin"* ]]; then
            INSTALL_PG=$(show_yesno_dialog "Install PostgreSQL?" "PostgreSQL is required for this application. Would you like to install it?")
        else
            read -p "PostgreSQL is required. Install it? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                INSTALL_PG="Yes"
            else
                INSTALL_PG="No"
            fi
        fi
        
        if [ "$INSTALL_PG" = "Yes" ]; then
            install_server=true
        else
            print_info "PostgreSQL not installed. You'll need to set up the database manually."
            return 1
        fi
    fi
    
    # Check if server is installed
    if check_postgresql_server_installed; then
        server_installed=true
        print_success "PostgreSQL server is installed"
    else
        if [ "$install_server" = true ]; then
            print_info "PostgreSQL server is not installed"
            if command_exists zenity || command_exists kdialog || [[ "$OSTYPE" == "darwin"* ]]; then
                INSTALL_SERVER=$(show_yesno_dialog "Install PostgreSQL Server?" "PostgreSQL server is required. Would you like to install it now?")
            else
                read -p "Install PostgreSQL server? (Y/n): " -n 1 -r
                echo
                if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                    INSTALL_SERVER="Yes"
                else
                    INSTALL_SERVER="No"
                fi
            fi
            
            if [ "$INSTALL_SERVER" = "Yes" ]; then
                if install_postgresql_server; then
                    server_installed=true
                else
                    print_error "Failed to install PostgreSQL server"
                    return 1
                fi
            else
                print_warning "PostgreSQL server not installed. Database setup will be limited."
                return 1
            fi
        else
            print_warning "PostgreSQL server is not installed"
            # Check if using remote database
            if [ -f ".env" ]; then
                DB_URL=$(grep DATABASE_URL .env 2>/dev/null | sed 's/.*="\(.*\)"/\1/')
                if [[ "$DB_URL" == *"@"* ]] && [[ "$DB_URL" != *"@localhost"* ]] && [[ "$DB_URL" != *"@127.0.0.1"* ]]; then
                    print_info "Using remote database - local server not required"
                    return 0
                fi
            fi
            return 1
        fi
    fi
    
    # Check if server is running
    if check_postgresql_server; then
        server_running=true
        print_success "PostgreSQL server is running"
        return 0
    else
        print_warning "PostgreSQL server is not running"
        
        # Try to start it
        if [ "$server_installed" = true ]; then
            if command_exists systemctl || command_exists brew; then
                if command_exists zenity || command_exists kdialog || [[ "$OSTYPE" == "darwin"* ]]; then
                    START_PG=$(show_yesno_dialog "Start PostgreSQL Server?" "PostgreSQL server is not running. Would you like to start it?")
                else
                    read -p "Start PostgreSQL server? (Y/n): " -n 1 -r
                    echo
                    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                        START_PG="Yes"
                    else
                        START_PG="No"
                    fi
                fi
                
                if [ "$START_PG" = "Yes" ]; then
                    if start_postgresql_service; then
                        server_running=true
                        return 0
                    else
                        print_warning "Could not start PostgreSQL service automatically"
                        print_info "Please start it manually:"
                        echo "  ${GREEN}sudo systemctl start postgresql${NC}  (Linux)"
                        echo "  ${GREEN}brew services start postgresql${NC}   (macOS)"
                        echo ""
                        print_info "Or enable it to start on boot:"
                        echo "  ${GREEN}sudo systemctl enable postgresql${NC}  (Linux)"
                        echo "  ${GREEN}brew services start postgresql${NC}   (macOS - auto-starts)"
                    fi
                fi
            else
                print_info "Please start PostgreSQL server manually"
            fi
        fi
        
        # Check if using remote database
        if [ -f ".env" ]; then
            DB_URL=$(grep DATABASE_URL .env 2>/dev/null | sed 's/.*="\(.*\)"/\1/')
            if [[ "$DB_URL" == *"@"* ]] && [[ "$DB_URL" != *"@localhost"* ]] && [[ "$DB_URL" != *"@127.0.0.1"* ]]; then
                print_info "Using remote database - local server not required"
                return 0
            fi
        fi
        
        return 1
    fi
}

# Check and install GUI dialog tools
check_install_gui_tools() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS has osascript built-in
        return 0
    elif command_exists zenity || command_exists kdialog; then
        return 0
    fi
    
    # Try to install zenity (most common on Linux)
    PM=$(detect_package_manager)
    case $PM in
        apt)
            if [ "$EUID" -ne 0 ]; then
                INSTALL_GUI=$(show_yesno_dialog "Install GUI Tools?" "GUI dialog tools (zenity) are recommended for better user experience. Install now?")
                if [ "$INSTALL_GUI" = "Yes" ]; then
                    install_package "zenity" "Zenity (GUI dialogs)"
                fi
            fi
            ;;
        yum|dnf)
            if [ "$EUID" -ne 0 ]; then
                INSTALL_GUI=$(show_yesno_dialog "Install GUI Tools?" "GUI dialog tools are recommended. Install now?")
                if [ "$INSTALL_GUI" = "Yes" ]; then
                    install_package "zenity" "Zenity (GUI dialogs)"
                fi
            fi
            ;;
        pacman)
            if [ "$EUID" -ne 0 ]; then
                INSTALL_GUI=$(show_yesno_dialog "Install GUI Tools?" "GUI dialog tools are recommended. Install now?")
                if [ "$INSTALL_GUI" = "Yes" ]; then
                    install_package "zenity" "Zenity (GUI dialogs)"
                fi
            fi
            ;;
    esac
}

# Generate random secret
generate_secret() {
    openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64
}

# GUI Detection
GUI_AVAILABLE=false
GUI_TYPE=""

detect_gui() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        GUI_AVAILABLE=true
        GUI_TYPE="osascript"
    elif command_exists zenity; then
        GUI_AVAILABLE=true
        GUI_TYPE="zenity"
    elif command_exists kdialog; then
        GUI_AVAILABLE=true
        GUI_TYPE="kdialog"
    else
        GUI_AVAILABLE=false
        GUI_TYPE=""
    fi
}

# GUI Progress functions
PROGRESS_PIPE=""
ZENITY_PID=""
KDIALOG_PID=""

show_progress() {
    local title="$1"
    local message="$2"
    local percentage="${3:-0}"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            zenity)
                # Create a named pipe for progress updates
                PROGRESS_PIPE="/tmp/landlordlens_progress_$$"
                rm -f "$PROGRESS_PIPE" 2>/dev/null
                mkfifo "$PROGRESS_PIPE" 2>/dev/null || true
                
                # Start zenity progress dialog in background, reading from pipe
                (
                    echo "$percentage"
                    if [ -n "$message" ]; then
                        echo "# $message"
                    fi
                    cat "$PROGRESS_PIPE" 2>/dev/null || true
                ) | zenity --progress \
                    --title "$title" \
                    --text "$message" \
                    --percentage="$percentage" \
                    --auto-close \
                    --auto-kill \
                    --width=500 \
                    --no-cancel \
                    2>/dev/null &
                ZENITY_PID=$!
                ;;
            kdialog)
                # kdialog progress bar
                kdialog --progressbar "$message" 100 2>/dev/null &
                KDIALOG_PID=$!
                # Create a pipe for updates
                PROGRESS_PIPE="/tmp/landlordlens_progress_$$"
                rm -f "$PROGRESS_PIPE" 2>/dev/null
                mkfifo "$PROGRESS_PIPE" 2>/dev/null || true
                ;;
            osascript)
                # macOS - show initial progress message
                osascript <<EOF 2>/dev/null || true
tell application "System Events"
    display notification "$message" with title "$title"
end tell
EOF
                PROGRESS_PIPE="osascript"
                ;;
        esac
    fi
}

update_progress() {
    local percentage="$1"
    local message="${2:-}"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            zenity)
                if [ -n "$PROGRESS_PIPE" ] && [ -p "$PROGRESS_PIPE" ] && [ -n "$ZENITY_PID" ] && kill -0 "$ZENITY_PID" 2>/dev/null; then
                    echo "$percentage" > "$PROGRESS_PIPE" 2>/dev/null || true
                    if [ -n "$message" ]; then
                        echo "# $message" > "$PROGRESS_PIPE" 2>/dev/null || true
                    fi
                fi
                ;;
            kdialog)
                if [ -n "$KDIALOG_PID" ] && kill -0 "$KDIALOG_PID" 2>/dev/null; then
                    # kdialog progressbar can be updated via qdbus
                    if command_exists qdbus; then
                        qdbus org.kde.kdialog /ProgressDialog setProgress "$percentage" 2>/dev/null || true
                        if [ -n "$message" ]; then
                            qdbus org.kde.kdialog /ProgressDialog setLabelText "$message" 2>/dev/null || true
                        fi
                    fi
                fi
                ;;
            osascript)
                # For macOS, show notification for major progress updates
                if [ -n "$message" ] && [ "$((percentage % 10))" -eq 0 ]; then
                    osascript <<EOF 2>/dev/null || true
tell application "System Events"
    display notification "$message ($percentage%)" with title "Setup Progress"
end tell
EOF
                fi
                ;;
        esac
    fi
}

close_progress() {
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            zenity)
                if [ -n "$PROGRESS_PIPE" ] && [ -p "$PROGRESS_PIPE" ]; then
                    echo "100" > "$PROGRESS_PIPE" 2>/dev/null || true
                    sleep 0.5
                    rm -f "$PROGRESS_PIPE" 2>/dev/null || true
                    PROGRESS_PIPE=""
                fi
                if [ -n "$ZENITY_PID" ] && kill -0 "$ZENITY_PID" 2>/dev/null; then
                    kill "$ZENITY_PID" 2>/dev/null || true
                    ZENITY_PID=""
                fi
                ;;
            kdialog)
                if [ -n "$KDIALOG_PID" ] && kill -0 "$KDIALOG_PID" 2>/dev/null; then
                    if command_exists qdbus; then
                        qdbus org.kde.kdialog /ProgressDialog close 2>/dev/null || true
                    fi
                    kill "$KDIALOG_PID" 2>/dev/null || true
                    KDIALOG_PID=""
                fi
                if [ -n "$PROGRESS_PIPE" ] && [ -p "$PROGRESS_PIPE" ]; then
                    rm -f "$PROGRESS_PIPE" 2>/dev/null || true
                    PROGRESS_PIPE=""
                fi
                ;;
            osascript)
                PROGRESS_PIPE=""
                ;;
        esac
    fi
}

# GUI Input functions
show_input_dialog() {
    local title="$1"
    local message="$2"
    local default_value="${3:-}"
    
    debug_log "Showing input dialog: $title"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                local escaped_message=$(echo "$message" | sed "s/\"/\\\\\"/g" | sed "s/\$/'/g")
                local result=$(osascript <<EOF 2>/dev/null || echo ""
tell application "System Events"
    activate
    set theAnswer to text returned of (display dialog "$escaped_message" default answer "$default_value" with title "$title" buttons {"Cancel", "OK"} default button "OK")
    return theAnswer
end tell
EOF
)
                echo "$result"
                ;;
            zenity)
                zenity --entry \
                    --title "$title" \
                    --text "$message" \
                    --entry-text "$default_value" \
                    --width=500 \
                    2>/dev/null || debug_log "Failed to show zenity input dialog"
                ;;
            kdialog)
                kdialog --title "$title" \
                    --inputbox "$message" \
                    "$default_value" \
                    2>/dev/null || debug_log "Failed to show kdialog input"
                ;;
        esac
    else
        # Fallback to command line with better formatting
        if [ -n "$default_value" ]; then
            echo -e "${CYAN}${BOLD}${title}${NC}"
            echo -e "${CYAN}${message}${NC}"
            echo -e "${DIM}(Press Enter to use default: ${default_value})${NC}"
            read -p "${GREEN}>${NC} " answer
            if [ -z "$answer" ]; then
                echo "$default_value"
            else
                echo "$answer"
            fi
        else
            echo -e "${CYAN}${BOLD}${title}${NC}"
            echo -e "${CYAN}${message}${NC}"
            read -p "${GREEN}>${NC} " answer
            echo "$answer"
        fi
    fi
}

show_yesno_dialog() {
    local title="$1"
    local message="$2"
    local default="${3:-Yes}"
    
    debug_log "Showing yes/no dialog: $title (default: $default)"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                local escaped_message=$(echo "$message" | sed "s/\"/\\\\\"/g" | sed "s/\$/'/g")
                local result=$(osascript <<EOF 2>/dev/null || echo "No"
tell application "System Events"
    activate
    set theAnswer to button returned of (display dialog "$escaped_message" with title "$title" buttons {"No", "Yes"} default button "$default")
    return theAnswer
end tell
EOF
)
                if [ "$result" = "Yes" ]; then
                    echo "Yes"
                else
                    echo "No"
                fi
                ;;
            zenity)
                if zenity --question \
                    --title "$title" \
                    --text "$message" \
                    --width=500 \
                    --height=200 \
                    2>/dev/null; then
                    echo "Yes"
                else
                    echo "No"
                fi
                ;;
            kdialog)
                if kdialog --title "$title" \
                    --yesno "$message" \
                    2>/dev/null; then
                    echo "Yes"
                else
                    echo "No"
                fi
                ;;
        esac
    else
        # Fallback to command line with better formatting
        echo -e "${CYAN}${BOLD}${title}${NC}"
        echo -e "${CYAN}${message}${NC}"
        if [ "$default" = "Yes" ]; then
            echo -e "${DIM}(Y/n):${NC} "
        else
            echo -e "${DIM}(y/N):${NC} "
        fi
        read -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]] || ([ -z "$REPLY" ] && [ "$default" = "Yes" ]); then
            echo "Yes"
        else
            echo "No"
        fi
    fi
}

show_info_dialog() {
    local title="$1"
    local message="$2"
    
    debug_log "Showing info dialog: $title"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                # Escape special characters for AppleScript
                local escaped_message=$(echo "$message" | sed "s/\"/\\\\\"/g" | sed "s/\$/'/g")
                osascript <<EOF 2>/dev/null || debug_log "Failed to show osascript dialog"
tell application "System Events"
    activate
    display dialog "$escaped_message" with title "$title" buttons {"OK"} default button "OK" with icon note
end tell
EOF
                ;;
            zenity)
                zenity --info \
                    --title "$title" \
                    --text "$message" \
                    --width=600 \
                    --height=300 \
                    --icon-name=info \
                    2>/dev/null || debug_log "Failed to show zenity dialog"
                ;;
            kdialog)
                kdialog --title "$title" \
                    --msgbox "$message" \
                    --icon=info \
                    2>/dev/null || debug_log "Failed to show kdialog"
                ;;
        esac
    else
        echo -e "${BLUE}${BOLD}ℹ INFO:${NC} ${BLUE}${message}${NC}"
    fi
}

show_error_dialog() {
    local title="$1"
    local message="$2"
    
    debug_log "Showing error dialog: $title"
    if [ "$DEBUG_MODE" = true ]; then
        echo -e "${RED}${BOLD}[ERROR]${NC} ${RED}$title: $message${NC}" >&2
    fi
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                local escaped_message=$(echo "$message" | sed "s/\"/\\\\\"/g" | sed "s/\$/'/g")
                osascript <<EOF 2>/dev/null || debug_log "Failed to show osascript error dialog"
tell application "System Events"
    activate
    display dialog "$escaped_message" with title "$title" buttons {"OK"} default button "OK" with icon stop
end tell
EOF
                ;;
            zenity)
                zenity --error \
                    --title "$title" \
                    --text "$message" \
                    --width=600 \
                    --height=300 \
                    --icon-name=error \
                    2>/dev/null || debug_log "Failed to show zenity error dialog"
                ;;
            kdialog)
                kdialog --title "$title" \
                    --error "$message" \
                    --icon=error \
                    2>/dev/null || debug_log "Failed to show kdialog error"
                ;;
        esac
    else
        echo -e "${RED}${BOLD}✗ ERROR:${NC} ${RED}${message}${NC}" >&2
    fi
}

show_warning_dialog() {
    local title="$1"
    local message="$2"
    
    debug_log "Showing warning dialog: $title"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                local escaped_message=$(echo "$message" | sed "s/\"/\\\\\"/g" | sed "s/\$/'/g")
                osascript <<EOF 2>/dev/null || debug_log "Failed to show osascript warning dialog"
tell application "System Events"
    activate
    display dialog "$escaped_message" with title "$title" buttons {"OK"} default button "OK" with icon caution
end tell
EOF
                ;;
            zenity)
                zenity --warning \
                    --title "$title" \
                    --text "$message" \
                    --width=600 \
                    --height=300 \
                    --icon-name=warning \
                    2>/dev/null || debug_log "Failed to show zenity warning dialog"
                ;;
            kdialog)
                kdialog --title "$title" \
                    --sorry "$message" \
                    --icon=warning \
                    2>/dev/null || debug_log "Failed to show kdialog warning"
                ;;
        esac
    else
        echo -e "${YELLOW}${BOLD}⚠ WARNING:${NC} ${YELLOW}${message}${NC}" >&2
    fi
}

show_list_dialog() {
    local title="$1"
    local message="$2"
    local items="$3"
    
    if [ "$GUI_AVAILABLE" = true ]; then
        case $GUI_TYPE in
            osascript)
                # Convert items to AppleScript list format
                local osa_items=""
                while IFS= read -r item; do
                    if [ -n "$item" ]; then
                        # Escape quotes in item names
                        item_escaped=$(echo "$item" | sed "s/\"/\\\\\"/g")
                        osa_items="${osa_items}\"${item_escaped}\", "
                    fi
                done <<< "$items"
                osa_items="${osa_items%%, }"
                
                local result=$(osascript <<EOF 2>/dev/null
tell application "System Events"
    activate
    set itemList to {$osa_items}
    set selectedItem to choose from list itemList with title "$title" with prompt "$message" default items {item 1 of itemList}
    if selectedItem is false then
        return ""
    else
        return item 1 of selectedItem
    end if
end tell
EOF
)
                echo "$result"
                ;;
            zenity)
                local result=$(echo "$items" | zenity --list \
                    --title "$title" \
                    --text "$message" \
                    --column "Option" \
                    --height=350 \
                    --width=500 \
                    --hide-header \
                    2>/dev/null)
                echo "$result"
                ;;
            kdialog)
                # Convert items to menu format
                local menu_items=""
                local counter=1
                while IFS= read -r item; do
                    if [ -n "$item" ]; then
                        menu_items="${menu_items}${counter} \"${item}\" "
                        counter=$((counter + 1))
                    fi
                done <<< "$items"
                local result=$(kdialog --title "$title" --menu "$message" $menu_items 2>/dev/null)
                # Convert number back to item name
                if [ -n "$result" ] && [[ "$result" =~ ^[0-9]+$ ]]; then
                    echo "$items" | sed -n "${result}p"
                else
                    echo "$result"
                fi
                ;;
        esac
    else
        # Fallback - show numbered list with better formatting
        echo -e "${CYAN}${message}${NC}"
        echo ""
        local item_count=0
        while IFS= read -r item; do
            if [ -n "$item" ]; then
                item_count=$((item_count + 1))
                echo -e "  ${GREEN}${item_count}.${NC} ${item}"
            fi
        done <<< "$items"
        echo ""
        read -p "Enter number (1-${item_count}) [1]: " choice
        if [ -z "$choice" ]; then
            choice=1
        fi
        if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "$item_count" ]; then
            SELECTED=$(echo "$items" | sed -n "${choice}p")
            echo "$SELECTED"
        else
            # Return first item as default
            echo "$items" | head -1
        fi
    fi
}

# GUI-aware print functions (only show in GUI if available, otherwise use terminal)
gui_print_info() {
    local message="$1"
    if [ "$GUI_AVAILABLE" = false ]; then
        print_info "$message"
    fi
}

gui_print_success() {
    local message="$1"
    if [ "$GUI_AVAILABLE" = false ]; then
        print_success "$message"
    fi
}

gui_print_warning() {
    local message="$1"
    if [ "$GUI_AVAILABLE" = false ]; then
        print_warning "$message"
    fi
}

gui_print_error() {
    local message="$1"
    if [ "$GUI_AVAILABLE" = false ]; then
        print_error "$message"
    fi
}

# Detect GUI availability
detect_gui
if [ "$DEBUG_MODE" = true ]; then
    echo "GUI Detection:"
    echo "  Available: $GUI_AVAILABLE"
    echo "  Type: $GUI_TYPE"
    echo ""
fi

# Ask user for setup mode
SETUP_MODE="simple"
if [ "$GUI_AVAILABLE" = true ]; then
    # Show welcome and setup mode selection
    show_info_dialog "Welcome to LandlordLens Setup" "Welcome! This setup wizard will help you get LandlordLens running.

We'll guide you through each step with simple questions.

This will take about 5-10 minutes. Let's get started! 🚀"
    
    # Ask for setup mode
    MODE_CHOICE=$(show_list_dialog "Setup Mode" "Choose your setup mode:

• Simple Setup: Quick setup with sensible defaults (recommended for most users)
• Advanced Setup: Full control over all configuration options

Which would you like?" "$(echo -e "Simple Setup\nAdvanced Setup")")
    
    # Handle the choice - check if it's empty or cancelled
    if [ -z "$MODE_CHOICE" ] || [ "$MODE_CHOICE" = "" ]; then
        # Default to simple if cancelled or empty
        SETUP_MODE="simple"
    elif [ "$MODE_CHOICE" = "Advanced Setup" ]; then
        SETUP_MODE="advanced"
    else
        # Default to simple for any other case
        SETUP_MODE="simple"
    fi
else
    print_header "LandlordLens Setup Script"
    echo ""
    print_info "Welcome! This setup wizard will help you get LandlordLens running."
    print_info "We'll guide you through each step - just follow the prompts."
    echo ""
    print_info "This will take about 5-10 minutes. Let's get started! 🚀"
    echo ""
    print_info "Setup Modes:"
    echo "  1. Simple Setup - Quick setup with sensible defaults (recommended)"
    echo "  2. Advanced Setup - Full control over all configuration options"
    echo ""
    read -p "Choose setup mode (1 for Simple, 2 for Advanced) [1]: " MODE_INPUT
    if [ "$MODE_INPUT" = "2" ]; then
        SETUP_MODE="advanced"
    else
        SETUP_MODE="simple"
    fi
    echo ""
fi

if [ "$SETUP_MODE" = "simple" ]; then
    if [ "$GUI_AVAILABLE" = true ]; then
        show_info_dialog "Simple Setup Mode" "You've chosen Simple Setup mode.

We'll use sensible defaults and only ask for essential information. This is the fastest way to get started!"
    else
        print_info "Using Simple Setup mode - we'll use sensible defaults."
        echo ""
    fi
else
    if [ "$GUI_AVAILABLE" = true ]; then
        show_info_dialog "Advanced Setup Mode" "You've chosen Advanced Setup mode.

You'll have full control over all configuration options, including:
• Custom database settings
• Payment processing configuration
• Email and SMS service setup
• And more..."
    else
        print_info "Using Advanced Setup mode - you'll configure all options."
        echo ""
    fi
fi 

# Step 1: Check Prerequisites
if [ "$GUI_AVAILABLE" = true ]; then
    show_progress "Setup Progress" "Step 1 of 5: Checking Prerequisites..." 10
else
    print_header "Step 1 of 5: Checking Prerequisites"
    print_info "We'll verify that all required software is installed and ready."
    print_hint "This step checks Node.js, npm, and PostgreSQL"
    echo ""
fi

# Check for GUI tools (but don't require them for basic checks)
# We'll try to install them if missing, but continue without if installation fails
if [[ "$OSTYPE" != "darwin"* ]] && ! command_exists zenity && ! command_exists kdialog; then
    # Try to install GUI tools silently (won't prompt if no sudo)
    PM=$(detect_package_manager)
    case $PM in
        apt|yum|dnf|pacman)
            # Will prompt later if needed
            ;;
    esac
fi

# Check and install Node.js
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 15 "Checking Node.js installation..."
fi

if ! check_install_nodejs; then
    debug_log "Node.js installation check failed"
    if [ "$GUI_AVAILABLE" = true ]; then
        show_error_dialog "Setup Error" "Node.js is required but could not be installed. Please install it manually from https://nodejs.org/"
        close_progress
    fi
    exit 1
fi

# Check npm (comes with Node.js)
if command_exists npm; then
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 20 "Node.js $(npm --version) is installed"
    else
        print_success "npm $(npm --version) is installed"
    fi
else
    if [ "$GUI_AVAILABLE" = true ]; then
        show_error_dialog "Setup Error" "npm is not installed (should come with Node.js). Please install Node.js from https://nodejs.org/"
        close_progress
    else
        print_error "npm is not installed (should come with Node.js)"
    fi
    exit 1
fi

# Check PostgreSQL client (optional but recommended)
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 25 "Checking PostgreSQL installation..."
fi

if check_install_postgresql; then
    PSQL_AVAILABLE=true
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 30 "PostgreSQL is ready"
    fi
else
    PSQL_AVAILABLE=false
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 30 "PostgreSQL setup incomplete"
        SHOW_HELP=$(show_yesno_dialog "PostgreSQL Setup" "PostgreSQL setup is incomplete. Would you like to see setup instructions?")
        if [ "$SHOW_HELP" = "Yes" ]; then
            # Show help in a dialog
            HELP_TEXT=$(show_postgresql_setup_help 2>&1)
            show_info_dialog "PostgreSQL Setup Guide" "$HELP_TEXT"
        fi
    else
        print_warning "PostgreSQL setup incomplete"
        SHOW_HELP=$(show_yesno_dialog "Show PostgreSQL Setup Guide?" "Would you like to see instructions for setting up PostgreSQL?")
        if [ "$SHOW_HELP" = "Yes" ]; then
            show_postgresql_setup_help
            echo ""
            read -p "Press Enter to continue..."
        fi
    fi
fi

# Step 2: Install Dependencies
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 35 "Step 2 of 5: Installing Dependencies..."
else
    print_header "Step 2 of 5: Installing Dependencies"
    print_info "Installing all required npm packages for LandlordLens..."
    print_hint "This includes Next.js, Prisma, and other dependencies"
    echo ""
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the correct directory?"
    exit 1
fi

install_npm_dependencies() {
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 40 "Installing dependencies (this may take 2-5 minutes)..."
    else
        print_step "Installing npm packages"
        print_substep "This may take 2-5 minutes depending on your internet connection"
        print_substep "Installing packages..."
    fi
    
    debug_log "Starting npm install..."
    
    # Show spinner in CLI mode, progress bar in GUI mode
    if [ "$GUI_AVAILABLE" = false ]; then
        if [ "$DEBUG_MODE" = true ]; then
            # In debug mode, show output directly
            npm install 2>&1 | tee /tmp/npm_install.log
            INSTALL_EXIT=${PIPESTATUS[0]}
        else
            npm install > /tmp/npm_install.log 2>&1 &
            INSTALL_PID=$!
            if [ -n "$INSTALL_PID" ] && [ "$INSTALL_PID" -gt 0 ] 2>/dev/null; then
                spinner $INSTALL_PID 2>/dev/null || true
            fi
            wait $INSTALL_PID 2>/dev/null
            INSTALL_EXIT=$?
            # Show last few lines of output
            tail -20 /tmp/npm_install.log 2>/dev/null || true
        fi
    else
        # In GUI mode, run npm install and update progress
        npm install > /tmp/npm_install.log 2>&1 &
        INSTALL_PID=$!
        
        # Update progress periodically while installing
        local progress=40
        while kill -0 "$INSTALL_PID" 2>/dev/null; do
            sleep 2
            progress=$((progress + 2))
            if [ "$progress" -gt 58 ]; then
                progress=58
            fi
            update_progress "$progress" "Installing packages... (this may take a few minutes)"
        done
        
        wait $INSTALL_PID 2>/dev/null
        INSTALL_EXIT=$?
        
        if [ "$DEBUG_MODE" = true ]; then
            debug_log "npm install output:"
            tail -50 /tmp/npm_install.log 2>/dev/null | while IFS= read -r line; do
                debug_log "  $line"
            done
        fi
    fi
    
    debug_log "npm install completed with exit code: $INSTALL_EXIT"
    
    if [ $INSTALL_EXIT -eq 0 ]; then
        if [ "$GUI_AVAILABLE" = true ]; then
            update_progress 60 "Dependencies installed successfully"
        else
            print_success "All dependencies installed successfully"
            print_substep "$(grep -c 'added\|changed\|removed' /tmp/npm_install.log 2>/dev/null || echo 'Packages') packages processed"
        fi
        return 0
    else
        if [ "$GUI_AVAILABLE" = true ]; then
            update_progress 45 "Standard installation failed, trying alternative method..."
        else
            print_warning "Standard installation encountered issues"
            print_substep "Trying alternative installation method (--legacy-peer-deps)..."
        fi
        
        if [ "$GUI_AVAILABLE" = false ]; then
            npm install --legacy-peer-deps > /tmp/npm_install.log 2>&1 &
            INSTALL_PID=$!
            if [ -n "$INSTALL_PID" ] && [ "$INSTALL_PID" -gt 0 ] 2>/dev/null; then
                spinner $INSTALL_PID 2>/dev/null || true
            fi
            wait $INSTALL_PID 2>/dev/null
            INSTALL_EXIT=$?
            # Show last few lines of output
            tail -20 /tmp/npm_install.log 2>/dev/null || true
        else
            # In GUI mode, run npm install and update progress
            npm install --legacy-peer-deps > /tmp/npm_install.log 2>&1 &
            INSTALL_PID=$!
            
            # Update progress periodically while installing
            local progress=45
            while kill -0 "$INSTALL_PID" 2>/dev/null; do
                sleep 2
                progress=$((progress + 2))
                if [ "$progress" -gt 58 ]; then
                    progress=58
                fi
                update_progress "$progress" "Installing packages with legacy peer deps..."
            done
            
            wait $INSTALL_PID 2>/dev/null
            INSTALL_EXIT=$?
        fi
        
        if [ $INSTALL_EXIT -eq 0 ]; then
            if [ "$GUI_AVAILABLE" = true ]; then
                update_progress 60 "Dependencies installed successfully"
            else
                print_success "Dependencies installed (using legacy peer deps mode)"
                print_hint "Some dependency conflicts were resolved automatically"
            fi
            return 0
        else
            if [ "$GUI_AVAILABLE" = true ]; then
                show_error_dialog "Installation Failed" "Failed to install dependencies. Please check the error messages and try again.

Common solutions:
• Check your internet connection
• Try: npm cache clean --force
• Check the error log at /tmp/npm_install.log"
                close_progress
            else
                print_error "Failed to install dependencies"
                echo ""
                print_info "Common solutions:"
                echo "  ${GREEN}1.${NC} Check your internet connection"
                echo "  ${GREEN}2.${NC} Clear npm cache: ${GREEN}npm cache clean --force${NC}"
                echo "  ${GREEN}3.${NC} Check error log: ${GREEN}cat /tmp/npm_install.log${NC}"
                echo "  ${GREEN}4.${NC} Try manual install: ${GREEN}npm install --legacy-peer-deps${NC}"
            fi
            return 1
        fi
    fi
}

if [ -d "node_modules" ]; then
    if [ "$GUI_AVAILABLE" = false ]; then
        print_info "node_modules exists"
    fi
    REINSTALL=$(show_yesno_dialog "Reinstall Dependencies?" "Some packages are already installed. Do you want to reinstall them?

This is usually safe and ensures everything is up to date.")
    if [ "$REINSTALL" = "Yes" ]; then
        if [ "$GUI_AVAILABLE" = true ]; then
            update_progress 38 "Removing old packages..."
        else
            print_info "Removing old node_modules..."
        fi
        rm -rf node_modules package-lock.json
        if ! install_npm_dependencies; then
            if [ "$GUI_AVAILABLE" = true ]; then
                close_progress
            fi
            exit 1
        fi
    else
        # Check if critical packages are missing
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Checking for missing packages..."
        fi
        if [ ! -d "node_modules/next" ] || [ ! -d "node_modules/@prisma/client" ]; then
            if [ "$GUI_AVAILABLE" = true ]; then
                INSTALL_MISSING=$(show_yesno_dialog "Install Missing Packages?" "Some required packages appear to be missing. Would you like to install them now?")
            else
                print_warning "Some critical packages appear to be missing"
                INSTALL_MISSING=$(show_yesno_dialog "Install Missing Packages?" "Some packages appear to be missing. Install them now?")
            fi
            if [ "$INSTALL_MISSING" = "Yes" ]; then
                if ! install_npm_dependencies; then
                    if [ "$GUI_AVAILABLE" = true ]; then
                        show_warning_dialog "Installation Warning" "Failed to install some packages. You may need to fix dependency conflicts manually."
                    else
                        print_warning "Failed to install missing packages. You may need to fix dependency conflicts manually."
                    fi
                fi
            fi
        fi
    fi
else
    if ! install_npm_dependencies; then
        if [ "$GUI_AVAILABLE" = true ]; then
            show_error_dialog "Installation Failed" "Failed to install dependencies. Please check your internet connection and try again.

You can also try running manually:
npm install --legacy-peer-deps"
            close_progress
        else
            print_error "Failed to install dependencies. Check your internet connection and try again."
            print_info "You can try manually: ${GREEN}npm install --legacy-peer-deps${NC}"
        fi
        exit 1
    fi
fi

# Step 3: Environment Setup
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 65 "Step 3 of 5: Application Configuration..."
else
    print_header "Step 3 of 5: Application Configuration"
    print_info "Configuring your application environment and settings..."
    print_hint "We'll set up database connection, secrets, and optional services"
    echo ""
fi

if [ -f ".env" ]; then
    if [ "$GUI_AVAILABLE" = false ]; then
        print_warning ".env file already exists"
    fi
    OVERWRITE=$(show_yesno_dialog "Configuration File Exists" "A configuration file already exists. 

Would you like to overwrite it with new settings, or keep the existing one?

Click 'Yes' to overwrite, 'No' to keep existing settings." "No")
    if [ "$OVERWRITE" != "Yes" ]; then
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Keeping existing .env file"
        fi
        SKIP_ENV=true
    else
        SKIP_ENV=false
    fi
else
    SKIP_ENV=false
fi

if [ "$SKIP_ENV" = false ]; then
    # Copy .env.example if it exists
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success "Created .env from .env.example"
    else
        # Create basic .env file
        cat > .env << EOF
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/landlordlens?schema=public"

# Next-Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Email (Optional)
RESEND_API_KEY=""

# SMS (Optional)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""

# Cron
CRON_SECRET=""
EOF
        print_success "Created .env file"
    fi

    # Generate secrets
    NEXTAUTH_SECRET=$(generate_secret)
    CRON_SECRET=$(generate_secret)

    # Update .env with generated secrets
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|NEXTAUTH_SECRET=\"\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|" .env
        sed -i '' "s|CRON_SECRET=\"\"|CRON_SECRET=\"$CRON_SECRET\"|" .env
    else
        # Linux
        sed -i "s|NEXTAUTH_SECRET=\"\"|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|" .env
        sed -i "s|CRON_SECRET=\"\"|CRON_SECRET=\"$CRON_SECRET\"|" .env
    fi

    print_success "Generated NEXTAUTH_SECRET and CRON_SECRET"

    # Database Configuration - different based on setup mode
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 67 "Configuring database connection..."
        if [ "$SETUP_MODE" = "simple" ]; then
            show_info_dialog "Database Setup" "Now we'll set up your database connection.

We'll use sensible defaults and only ask for essential information!"
        else
            show_info_dialog "Database Setup" "Now we'll set up your database connection.

You'll configure all database settings including connection details, user credentials, and more."
        fi
    else
        print_header "Database Setup"
        echo ""
        if [ "$SETUP_MODE" = "simple" ]; then
            print_info "We'll help you set up your database with sensible defaults."
        else
            print_info "You'll configure all database settings."
        fi
        echo ""
    fi
    
    # Ask if using local or remote database
    if [ "$SETUP_MODE" = "simple" ]; then
        # Simple mode: Assume local database, just ask for confirmation
        USE_REMOTE=$(show_yesno_dialog "Database Location" "Is your database on this computer (local) or on a remote server?

• Click 'No' for local database (most common)
• Click 'Yes' for remote database

Most users should click 'No'." "No")
    else
        # Advanced mode: Full question
        USE_REMOTE=$(show_yesno_dialog "Database Location" "Where is your database located?

• Click 'Yes' if your database is on a remote server (another computer)
• Click 'No' if your database is on this computer (local)

Most users should click 'No' for a local database." "No")
    fi
    
    if [ "$USE_REMOTE" = "Yes" ]; then
        # Remote database - ask for connection details
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Setting up remote database connection..."
        fi
        
        if [ "$SETUP_MODE" = "simple" ]; then
            # Simple mode: Minimal questions with defaults
            DB_HOST=$(show_input_dialog "Database Server" "Enter your database server address:" "")
            DB_PORT=$(show_input_dialog "Database Port" "Enter the port (usually 5432):" "5432")
            DB_USER=$(show_input_dialog "Database Username" "Enter your username:" "postgres")
            DB_PASSWORD_INPUT=$(show_input_dialog "Database Password" "Enter your password:" "")
            DB_NAME=$(show_input_dialog "Database Name" "Enter database name:" "landlordlens")
        else
            # Advanced mode: Detailed questions with explanations
            DB_HOST=$(show_input_dialog "Database Server Address" "Enter your database server address:

Examples:
• db.example.com
• 192.168.1.100
• database.yourhost.com

Note: This can be a hostname or IP address." "")
            DB_PORT=$(show_input_dialog "Database Port" "Enter the database port number:

Default PostgreSQL port is 5432. Only change this if your database uses a different port." "5432")
            DB_USER=$(show_input_dialog "Database Username" "Enter your database username:

This is the PostgreSQL user that will connect to the database. The default superuser is usually 'postgres'." "postgres")
            DB_PASSWORD_INPUT=$(show_input_dialog "Database Password" "Enter your database password:

This is the password for the database user specified above. Leave empty if no password is required (not recommended for production)." "")
            DB_NAME=$(show_input_dialog "Database Name" "What would you like to name your database?

This will be the name of the PostgreSQL database that LandlordLens will use. We suggest 'landlordlens'." "landlordlens")
        fi
        
        if [ -z "$DB_NAME" ] || [ "$DB_NAME" = "" ]; then
            DB_NAME="landlordlens"
        fi
        
        DB_URL="postgresql://${DB_USER}:${DB_PASSWORD_INPUT}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
    else
        # Local database - different approach based on setup mode
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Setting up local database..."
        fi
        
        # Try to auto-detect PostgreSQL user
        DB_USER="postgres"
        if psql -U postgres -c '\q' 2>/dev/null; then
            if [ "$GUI_AVAILABLE" = false ]; then
                print_success "Found PostgreSQL user 'postgres'"
            fi
        elif [ "$EUID" -ne 0 ] && command_exists sudo && sudo -u postgres psql -c '\q' 2>/dev/null; then
            if [ "$GUI_AVAILABLE" = false ]; then
                print_success "Found PostgreSQL user 'postgres'"
            fi
        else
            if [ "$SETUP_MODE" = "simple" ]; then
                # Simple mode: Just ask with default
                DB_USER=$(show_input_dialog "Database Username" "Enter your PostgreSQL username:" "postgres")
            else
                # Advanced mode: Explain what this is
                DB_USER=$(show_input_dialog "Database Username" "Enter your PostgreSQL username:

This is the PostgreSQL user account that will own the database. The default superuser is usually 'postgres', but you can use any user with CREATEDB privileges." "postgres")
            fi
        fi
        
        # Ask for password
        if [ "$SETUP_MODE" = "simple" ]; then
            DB_PASSWORD_INPUT=$(show_input_dialog "Database Password" "Enter your PostgreSQL password (leave empty if not set):" "")
        else
            DB_PASSWORD_INPUT=$(show_input_dialog "Database Password" "Enter your PostgreSQL password for user '$DB_USER':

Security Note: If you haven't set a password yet, you can leave this empty and we'll try to connect without one. However, for production use, it's recommended to set a strong password." "")
        fi
        
        # Ask for database name
        if [ "$SETUP_MODE" = "simple" ]; then
            DB_NAME=$(show_input_dialog "Database Name" "Enter database name:" "landlordlens")
        else
            DB_NAME=$(show_input_dialog "Database Name" "What would you like to name your database?

This will be the name of the PostgreSQL database that LandlordLens will use. We suggest 'landlordlens', but you can use any name you prefer." "landlordlens")
        fi
        
        if [ -z "$DB_NAME" ] || [ "$DB_NAME" = "" ]; then
            DB_NAME="landlordlens"
        fi
        
        # Construct database URL
        if [ -n "$DB_PASSWORD_INPUT" ] && [ "$DB_PASSWORD_INPUT" != "" ]; then
            DB_URL="postgresql://${DB_USER}:${DB_PASSWORD_INPUT}@localhost:5432/${DB_NAME}?schema=public"
        else
            DB_URL="postgresql://${DB_USER}@localhost:5432/${DB_NAME}?schema=public"
        fi
    fi
    
    # Save to .env
    if [ -n "$DB_URL" ] && [ "$DB_URL" != "" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # Try with quotes first, fallback to without quotes
            sed -i '' "s|DATABASE_URL=\".*\"|DATABASE_URL=\"$DB_URL\"|" .env 2>/dev/null || \
            sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env
        else
            sed -i "s|DATABASE_URL=\".*\"|DATABASE_URL=\"$DB_URL\"|" .env 2>/dev/null || \
            sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env
        fi
        if [ "$GUI_AVAILABLE" = true ]; then
            show_info_dialog "Database Configuration" "Database settings have been saved successfully!"
        else
            print_success "Database configuration saved"
        fi
    else
        if [ "$GUI_AVAILABLE" = true ]; then
            show_warning_dialog "Configuration Warning" "Database URL was not provided. You'll need to update the .env file manually later."
        else
            print_warning "Database URL not provided. Please update .env manually."
        fi
    fi

    # Optional: Configure Stripe - different based on setup mode
    if [ "$SETUP_MODE" = "simple" ]; then
        # Simple mode: Skip Stripe setup by default
        CONFIGURE_STRIPE="No"
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Skipping payment setup (can be added later)"
        fi
    else
        # Advanced mode: Ask if they want to configure
        CONFIGURE_STRIPE=$(show_yesno_dialog "Payment Setup (Optional)" "Would you like to set up payment processing with Stripe now?

This is completely optional - you can add it later if needed.

Click 'Yes' to configure Stripe now, or 'No' to skip." "No")
    fi
    if [ "$CONFIGURE_STRIPE" = "Yes" ]; then
        if [ "$GUI_AVAILABLE" = true ]; then
            show_info_dialog "Stripe Setup" "You can find your Stripe keys in your Stripe dashboard at:

https://dashboard.stripe.com

Make sure you're logged in and have your API keys ready."
        else
            print_info "You can find your Stripe keys in your Stripe dashboard at https://dashboard.stripe.com"
            echo ""
        fi
        STRIPE_PUB=$(show_input_dialog "Stripe Publishable Key" "Enter your Stripe Publishable Key:

(It usually starts with 'pk_test_' for testing or 'pk_live_' for production)" "")
        if [ -n "$STRIPE_PUB" ] && [ "$STRIPE_PUB" != "" ]; then
            STRIPE_SECRET=$(show_input_dialog "Stripe Secret Key" "Enter your Stripe Secret Key:

(It usually starts with 'sk_test_' for testing or 'sk_live_' for production)" "")
            if [ -n "$STRIPE_SECRET" ] && [ "$STRIPE_SECRET" != "" ]; then
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    sed -i '' "s|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"\"|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"$STRIPE_PUB\"|" .env
                    sed -i '' "s|STRIPE_SECRET_KEY=\"\"|STRIPE_SECRET_KEY=\"$STRIPE_SECRET\"|" .env
                else
                    sed -i "s|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"\"|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"$STRIPE_PUB\"|" .env
                    sed -i "s|STRIPE_SECRET_KEY=\"\"|STRIPE_SECRET_KEY=\"$STRIPE_SECRET\"|" .env
                fi
                if [ "$GUI_AVAILABLE" = true ]; then
                    show_info_dialog "Payment Setup Complete" "Payment processing has been configured successfully!"
                else
                    print_success "Payment processing configured"
                fi
            fi
        fi
    else
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "Skipping payment setup. You can add it later in the .env file."
        fi
    fi
fi

# Step 4: Database Setup & Verification
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 70 "Step 4 of 5: Database Setup & Verification..."
else
    print_header "Step 4 of 5: Database Setup & Verification"
    print_info "Setting up and verifying your database connection..."
    print_hint "We'll create the database schema and seed initial data"
    echo ""
fi

# Check if database exists (if psql is available)
if [ "$PSQL_AVAILABLE" = true ]; then
    # Extract database name from DATABASE_URL
    DB_NAME=$(grep DATABASE_URL .env 2>/dev/null | sed 's/.*\/\([^?]*\).*/\1/')
    
    if [ -n "$DB_NAME" ] && [ "$DB_NAME" != "" ]; then
        if [ "$GUI_AVAILABLE" = true ]; then
            update_progress 72 "Checking database connection..."
        else
            print_info "Checking if database '$DB_NAME' exists..."
        fi
        
        # Extract connection details from DATABASE_URL
        DB_URL=$(grep DATABASE_URL .env 2>/dev/null | sed 's/.*="\(.*\)"/\1/')
        DB_USER=$(echo "$DB_URL" | sed 's/.*:\/\/\([^:]*\):.*/\1/')
        DB_HOST=$(echo "$DB_URL" | sed 's/.*@\([^:]*\):.*/\1/')
        
        # Check if it's a remote database
        IS_REMOTE=false
        if [[ "$DB_URL" == *"@"* ]] && [[ "$DB_URL" != *"@localhost"* ]] && [[ "$DB_URL" != *"@127.0.0.1"* ]]; then
            IS_REMOTE=true
            if [ "$GUI_AVAILABLE" = false ]; then
                print_info "Detected remote database connection"
            fi
        fi
        
        # Try to connect and check if database exists
        if [ "$IS_REMOTE" = true ]; then
            # For remote databases, try to connect directly
            DB_PASSWORD=$(echo "$DB_URL" | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
            if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -d postgres -c '\q' 2>/dev/null; then
                if [ "$GUI_AVAILABLE" = true ]; then
                    update_progress 75 "Connected to remote database"
                else
                    print_success "Successfully connected to remote database"
                fi
                # Check if database exists
                if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
                    if [ "$GUI_AVAILABLE" = true ]; then
                        update_progress 80 "Database '$DB_NAME' found"
                    else
                        print_success "Database '$DB_NAME' exists"
                    fi
                else
                    if [ "$GUI_AVAILABLE" = true ]; then
                        update_progress 73 "Database '$DB_NAME' not found on remote server"
                    else
                        print_warning "Database '$DB_NAME' does not exist on remote server"
                    fi
                    CREATE_DB=$(show_yesno_dialog "Create Database?" "Database '$DB_NAME' does not exist on the remote server. Would you like to create it now?")
                    if [ "$CREATE_DB" = "Yes" ]; then
                        if [ "$GUI_AVAILABLE" = true ]; then
                            update_progress 75 "Creating database..."
                        fi
                        if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null; then
                            if [ "$GUI_AVAILABLE" = true ]; then
                                update_progress 80 "Database '$DB_NAME' created successfully!"
                                show_info_dialog "Database Created" "Database '$DB_NAME' has been created successfully on the remote server!"
                                update_progress 80 "Database ready"
                            else
                                print_success "Database '$DB_NAME' created on remote server"
                            fi
                        else
                            if [ "$GUI_AVAILABLE" = true ]; then
                                update_progress 73 "Database creation failed"
                                show_error_dialog "Database Creation Failed" "Failed to create database. You may need to create it manually on the remote server."
                                update_progress 73 "Continuing setup..."
                            else
                                print_error "Failed to create database. You may need to create it manually on the remote server."
                            fi
                        fi
                    fi
                fi
            else
                if [ "$GUI_AVAILABLE" = true ]; then
                    update_progress 72 "Connection to remote database failed"
                    show_warning_dialog "Connection Failed" "Could not connect to remote database. Please verify your DATABASE_URL in the .env file."
                    update_progress 72 "Continuing setup..."
                else
                    print_warning "Could not connect to remote database. Please verify your DATABASE_URL in .env"
                fi
            fi
        else
            # For local databases, check if server is running first
            if ! check_postgresql_server; then
                if [ "$GUI_AVAILABLE" = true ]; then
                    update_progress 72 "PostgreSQL server is not running"
                else
                    print_warning "PostgreSQL server is not running"
                    echo ""
                    print_info "We need to start PostgreSQL. This usually requires administrator access."
                    echo ""
                fi
                
                # Try to start automatically
                if command_exists systemctl || command_exists brew; then
                    START_NOW=$(show_yesno_dialog "Start Database Server?" "The database server is not running. Would you like us to try starting it now?

You may be asked for your password." "Yes")
                    if [ "$START_NOW" = "Yes" ]; then
                        if start_postgresql_service; then
                            if [ "$GUI_AVAILABLE" = true ]; then
                                update_progress 75 "Database server started successfully!"
                                show_info_dialog "Database Server Started" "Database server has been started successfully!"
                                update_progress 75 "Continuing database setup..."
                            else
                                print_success "Database server started successfully!"
                            fi
                        else
                            if [ "$GUI_AVAILABLE" = true ]; then
                                update_progress 72 "Could not start database server"
                                show_error_dialog "Could Not Start Server" "Could not start the database server automatically.

Please start it manually:
• Linux: sudo systemctl start postgresql
• macOS: brew services start postgresql

Then run this setup script again."
                            else
                                print_error "Could not start the database server automatically"
                                echo ""
                                print_info "Please start it manually:"
                                echo "  ${GREEN}sudo systemctl start postgresql${NC}  (Linux)"
                                echo "  ${GREEN}brew services start postgresql${NC}   (macOS)"
                                echo ""
                                print_info "Then run this setup script again."
                                print_warning "Skipping database setup for now."
                            fi
                        fi
                    else
                        if [ "$GUI_AVAILABLE" = true ]; then
                            show_info_dialog "Setup Paused" "You can start PostgreSQL later and run this setup script again to complete the database setup."
                        else
                            print_info "You can start PostgreSQL later and run this setup again."
                            print_warning "Skipping database setup for now."
                        fi
                    fi
                else
                    if [ "$GUI_AVAILABLE" = true ]; then
                        show_warning_dialog "Manual Start Required" "Please start PostgreSQL server manually:

• Linux: sudo systemctl start postgresql
• macOS: brew services start postgresql

Then run this setup script again."
                    else
                        print_info "Please start PostgreSQL server manually:"
                        echo "  ${GREEN}sudo systemctl start postgresql${NC}  (Linux)"
                        echo "  ${GREEN}brew services start postgresql${NC}   (macOS)"
                        echo ""
                        print_info "Then run this setup script again."
                        print_warning "Skipping database setup for now."
                    fi
                fi
            else
                if [ "$GUI_AVAILABLE" = true ]; then
                    update_progress 75 "Database server is running"
                else
                    print_success "PostgreSQL server is running"
                fi
                
                # Setup PostgreSQL user if needed
                if [ -n "$DB_USER" ] && [ "$DB_USER" != "postgres" ]; then
                    if [ "$GUI_AVAILABLE" = false ]; then
                        setup_postgresql_user "$DB_USER" "$DB_NAME" "$DB_URL"
                    else
                        setup_postgresql_user "$DB_USER" "$DB_NAME" "$DB_URL" > /dev/null 2>&1
                    fi
                fi
                
                # Check if database exists
                DB_EXISTS=false
                if psql -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
                    DB_EXISTS=true
                    if [ "$GUI_AVAILABLE" = true ]; then
                        update_progress 80 "Database '$DB_NAME' found"
                    else
                        print_success "Database '$DB_NAME' exists"
                    fi
                else
                    if [ "$GUI_AVAILABLE" = true ]; then
                        update_progress 73 "Database '$DB_NAME' does not exist"
                    else
                        print_warning "Database '$DB_NAME' does not exist"
                    fi
                    
                    # Show existing databases and allow selection
                    if check_postgresql_server_installed && check_postgresql_server; then
                        SELECTED_DB=$(show_database_selection "$DB_USER" "$DB_URL" "$DB_NAME")
                        
                        if [ "$SELECTED_DB" != "new" ] && [ -n "$SELECTED_DB" ]; then
                            # User selected an existing database
                            # Clean up the selected database name (remove any extra whitespace)
                            SELECTED_DB=$(echo "$SELECTED_DB" | sed 's/^ *//;s/ *$//')
                            
                            if [ -n "$SELECTED_DB" ] && [ "$SELECTED_DB" != "new" ]; then
                                if [ "$GUI_AVAILABLE" = true ]; then
                                    update_progress 75 "Using existing database: '$SELECTED_DB'"
                                    show_info_dialog "Database Selected" "Using existing database: '$SELECTED_DB'"
                                    update_progress 75 "Database selected"
                                else
                                    print_success "Using existing database: '$SELECTED_DB'"
                                fi
                                DB_NAME="$SELECTED_DB"
                                DB_EXISTS=true
                                
                                # Update DATABASE_URL in .env with selected database
                                # Extract the base URL (everything before the database name)
                                DB_BASE_URL=$(echo "$DB_URL" | sed 's|/[^/]*?.*$||' | sed 's|/[^/]*$||')
                                DB_QUERY_STRING=$(echo "$DB_URL" | sed 's|.*?||')
                                
                                # Reconstruct the URL with the new database name
                                if [ -n "$DB_QUERY_STRING" ] && [ "$DB_QUERY_STRING" != "$DB_URL" ]; then
                                    NEW_DB_URL="${DB_BASE_URL}/${SELECTED_DB}?${DB_QUERY_STRING}"
                                else
                                    NEW_DB_URL="${DB_BASE_URL}/${SELECTED_DB}?schema=public"
                                fi
                                
                                # Escape special characters for sed
                                ESCAPED_NEW_URL=$(printf '%s\n' "$NEW_DB_URL" | sed 's/[[\.*^$()+?{|]/\\&/g')
                                
                                if [[ "$OSTYPE" == "darwin"* ]]; then
                                    # Use a delimiter that's unlikely to appear in URLs
                                    sed -i '' "s|DATABASE_URL=\".*\"|DATABASE_URL=\"${NEW_DB_URL//\//\\/}\"|" .env || \
                                    sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$NEW_DB_URL\"|" .env
                                else
                                    sed -i "s|DATABASE_URL=\".*\"|DATABASE_URL=\"${NEW_DB_URL//\//\\/}\"|" .env || \
                                    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$NEW_DB_URL\"|" .env
                                fi
                                DB_URL="$NEW_DB_URL"
                                if [ "$GUI_AVAILABLE" = false ]; then
                                    print_success "Updated DATABASE_URL in .env to use database '$SELECTED_DB'"
                                fi
                            fi
                        else
                            # User wants to create a new database
                            CREATE_DB=$(show_yesno_dialog "Create New Database?" "Would you like to create a new database called '$DB_NAME'?

Click 'Yes' to create it now, or 'No' to skip." "Yes")
                            
                            if [ "$CREATE_DB" = "Yes" ]; then
                                if [ "$GUI_AVAILABLE" = true ]; then
                                    update_progress 75 "Creating database '$DB_NAME'..."
                                else
                                    print_info "Creating database '$DB_NAME'..."
                                fi
                                if create_postgresql_database "$DB_NAME" "$DB_USER" "$DB_URL"; then
                                    DB_EXISTS=true
                                    if [ "$GUI_AVAILABLE" = true ]; then
                                        update_progress 80 "Database '$DB_NAME' created successfully!"
                                        show_info_dialog "Database Created" "Database '$DB_NAME' has been created and is ready to use!"
                                        update_progress 80 "Database ready"
                                    else
                                        print_success "Database '$DB_NAME' is ready!"
                                    fi
                                else
                                    if [ "$GUI_AVAILABLE" = true ]; then
                                        update_progress 73 "Could not create database automatically"
                                        show_warning_dialog "Database Creation" "Could not create database automatically. Don't worry - we'll try again later."
                                        update_progress 73 "Continuing setup..."
                                    else
                                        print_warning "Could not create database automatically. Don't worry - we'll try again later."
                                    fi
                                fi
                            else
                                if [ "$GUI_AVAILABLE" = true ]; then
                                    update_progress 73 "Skipping database creation"
                                fi
                            fi
                        fi
                    else
                        print_info "To create the database manually, run:"
                        echo "  ${GREEN}createdb -U $DB_USER $DB_NAME${NC}"
                        echo "  Or: ${GREEN}psql -U postgres -c \"CREATE DATABASE $DB_NAME OWNER $DB_USER;\"${NC}"
                    fi
                fi
                
                if [ "$DB_EXISTS" = true ]; then
                    # Verify we can connect to the database
                    if [ "$GUI_AVAILABLE" = true ]; then
                        update_progress 85 "Verifying database connection..."
                    fi
                    DB_PASSWORD=$(echo "$DB_URL" | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
                    if PGPASSWORD="$DB_PASSWORD" psql -h localhost -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null || \
                       psql -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; then
                        if [ "$GUI_AVAILABLE" = true ]; then
                            update_progress 90 "Successfully connected to database"
                        else
                            print_success "Successfully connected to database '$DB_NAME'"
                        fi
                    else
                        if [ "$GUI_AVAILABLE" = false ]; then
                            print_warning "Database exists but connection test failed. This may be normal if authentication is required."
                        fi
                    fi
                fi
            fi
        fi
    else
        if [ "$GUI_AVAILABLE" = true ]; then
            update_progress 72 "Could not extract database name from DATABASE_URL"
            show_warning_dialog "Configuration Error" "Could not extract database name from DATABASE_URL. Please ensure DATABASE_URL is set correctly in the .env file."
            update_progress 72 "Continuing setup..."
        else
            print_warning "Could not extract database name from DATABASE_URL"
            print_info "Please ensure DATABASE_URL is set correctly in .env"
        fi
    fi
else
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 70 "PostgreSQL tools not found"
    else
        print_warning "PostgreSQL tools not found"
        echo ""
        print_info "We need PostgreSQL to store your data. Would you like us to help you install it?"
    fi
    INSTALL_HELP=$(show_yesno_dialog "PostgreSQL Required" "PostgreSQL is required for this application to store your data.

Would you like us to help you install it now?" "Yes")
    if [ "$INSTALL_HELP" = "Yes" ]; then
        HELP_TEXT=$(show_postgresql_setup_help 2>&1)
        if [ "$GUI_AVAILABLE" = true ]; then
            show_info_dialog "PostgreSQL Setup Guide" "$HELP_TEXT"
            show_info_dialog "Next Steps" "After installing PostgreSQL, please run this setup script again to complete the setup."
        else
            show_postgresql_setup_help
            echo ""
            print_info "After installing PostgreSQL, please run this setup script again."
            read -p "Press Enter when you're ready to continue..."
        fi
    else
        if [ "$GUI_AVAILABLE" = false ]; then
            print_info "You can install PostgreSQL later and run this setup script again."
        fi
    fi
fi

# Generate Prisma Client
print_step "Generating Prisma Client"
print_substep "This creates the database client code from your schema"
if npm run db:generate > /dev/null 2>&1; then
    print_success "Prisma Client generated successfully"
else
    print_error "Failed to generate Prisma Client"
    print_hint "Make sure your Prisma schema is valid. Check prisma/schema.prisma"
    exit 1
fi

# Push schema to database
print_step "Creating database schema"
print_substep "This will create all tables and relationships in your database"
DB_PUSH_OUTPUT=$(npm run db:push 2>&1)
DB_PUSH_EXIT=$?

if [ $DB_PUSH_EXIT -eq 0 ]; then
    print_success "Database schema created successfully"
    print_substep "All tables and relationships are now in place"
    
    # Seed database
    print_step "Seeding initial data"
    print_substep "Adding UK compliance types to the database"
    if npm run db:seed > /dev/null 2>&1; then
        print_success "Database seeded with compliance types"
        print_substep "Initial data is ready for use"
    else
        print_warning "Failed to seed database automatically"
        print_hint "You can seed it manually later with: ${GREEN}npm run db:seed${NC}"
    fi
else
    print_error "Could not connect to the database"
    echo ""
    print_section "Troubleshooting Database Connection"
    print_info "Common causes:"
    echo "  ${YELLOW}•${NC} Database server isn't running"
    echo "  ${YELLOW}•${NC} Incorrect username or password in DATABASE_URL"
    echo "  ${YELLOW}•${NC} Database doesn't exist yet"
    echo "  ${YELLOW}•${NC} Network/firewall blocking connection"
    echo ""
    print_info "Quick fixes to try:"
    echo "  ${GREEN}1.${NC} Check PostgreSQL is running: ${GREEN}pg_isready${NC} or ${GREEN}sudo systemctl status postgresql${NC}"
    echo "  ${GREEN}2.${NC} Verify DATABASE_URL in .env file"
    echo "  ${GREEN}3.${NC} Test connection: ${GREEN}psql \$DATABASE_URL${NC}"
    echo "  ${GREEN}4.${NC} Create database manually if needed"
    echo ""
    print_warning "The app won't work until the database is connected"
    print_hint "You can fix this and run the setup script again, or continue and fix it later"
    
    # Show the actual error
    echo ""
    print_section "Error Details"
    ERROR_LINES=$(echo "$DB_PUSH_OUTPUT" | grep -i "error\|failed\|cannot\|connection" | head -5)
    if [ -n "$ERROR_LINES" ]; then
        echo "$ERROR_LINES" | while IFS= read -r line; do
            echo -e "  ${RED}${line}${NC}"
        done
    else
        echo "$DB_PUSH_OUTPUT" | tail -5 | while IFS= read -r line; do
            echo -e "  ${DIM}${line}${NC}"
        done
    fi
    echo ""
    
    # Use CLI prompt if GUI not available (since we might be in error state)
    if command_exists zenity || command_exists kdialog || [[ "$OSTYPE" == "darwin"* ]]; then
        CONTINUE=$(show_yesno_dialog "Continue Setup?" "Database setup failed. Would you like to continue with the rest of the setup? You can fix the database connection later.")
    else
        read -p "Continue setup anyway? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            CONTINUE="Yes"
        else
            CONTINUE="No"
        fi
    fi
    
    if [ "$CONTINUE" != "Yes" ]; then
        print_info "Setup paused. Fix the database connection and run the script again."
        print_info "Or continue manually by running:"
        echo "  ${GREEN}npm run db:push${NC}"
        echo "  ${GREEN}npm run db:seed${NC}"
        exit 1
    else
        print_warning "Skipping database seed (schema not pushed successfully)"
        print_info "After fixing database connection, run:"
        echo "  ${GREEN}npm run db:push${NC}"
        echo "  ${GREEN}npm run db:seed${NC}"
    fi
fi

# Step 5: Final Checks
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 95 "Step 5 of 5: Final Checks..."
else
    print_header "Step 5 of 5: Final Checks"
    print_info "Running final validation checks..."
    echo ""
fi

# Check for TypeScript errors
if [ "$GUI_AVAILABLE" = false ]; then
    print_step "Checking code quality"
    print_substep "Running ESLint to check for code issues"
fi
if npm run lint > /dev/null 2>&1; then
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 99 "Code quality check passed"
    fi
    if [ "$GUI_AVAILABLE" = false ]; then
        print_success "Code quality check passed"
        print_substep "No linting errors found"
    fi
else
    if [ "$GUI_AVAILABLE" = true ]; then
        update_progress 99 "Code check completed (some issues found)"
        show_warning_dialog "Code Check" "Some code issues were found, but this won't prevent the app from running.

You can check them later by running:
npm run lint"
        update_progress 99 "Finalizing setup..."
    else
        print_warning "Some linting issues found (non-critical)"
        print_hint "Run ${GREEN}npm run lint${NC} for details. These won't prevent the app from running."
    fi
fi

# Summary
if [ "$GUI_AVAILABLE" = true ]; then
    update_progress 100 "Setup complete! 🎉"
    sleep 1
    close_progress
    SUMMARY_MESSAGE="🎉 Setup Complete! 🎉

LandlordLens is ready to use!

To start using the application:
1. Open a terminal/command prompt
2. Navigate to this folder
3. Type: npm run dev
4. Open your browser and go to: http://localhost:3000
5. Create your account and start managing your properties!

Need help? Check the documentation files in this folder."

    show_info_dialog "Setup Complete!" "$SUMMARY_MESSAGE"
else
    print_header "Setup Complete! 🎉"
    
    SUMMARY_MESSAGE="🎉 Setup Complete! 🎉

LandlordLens is ready to use!

To start using the application:
1. Open a terminal/command prompt
2. Navigate to this folder
3. Type: npm run dev
4. Open your browser and go to: http://localhost:3000
5. Create your account and start managing your properties!

Need help? Check the documentation files in this folder."

    show_info_dialog "Setup Complete!" "$SUMMARY_MESSAGE"
    
    echo
    print_success "LandlordLens is ready to use!"
    echo
    print_section "Next Steps"
    echo "  ${GREEN}1.${NC} Review your .env file to ensure all settings are correct"
    echo "  ${GREEN}2.${NC} Start the development server:"
    echo "     ${BOLD}${GREEN}npm run dev${NC}"
    echo "  ${GREEN}3.${NC} Open ${CYAN}http://localhost:3000${NC} in your browser"
    echo "  ${GREEN}4.${NC} Create your account and complete onboarding"
    echo
    print_section "Useful Commands"
    echo "  ${GREEN}npm run dev${NC}        - Start development server"
    echo "  ${GREEN}npm run db:studio${NC}  - Open Prisma Studio (database GUI)"
    echo "  ${GREEN}npm run lint${NC}       - Check for code issues"
    echo "  ${GREEN}npm run db:push${NC}    - Update database schema"
    echo "  ${GREEN}npm run db:seed${NC}    - Re-seed database"
    echo
    print_section "Documentation"
    echo "  ${CYAN}•${NC} ${BOLD}QUICKSTART.md${NC} - Quick setup guide"
    echo "  ${CYAN}•${NC} ${BOLD}SETUP.md${NC} - Detailed setup instructions"
    echo "  ${CYAN}•${NC} ${BOLD}TESTING.md${NC} - Testing guide"
    echo "  ${CYAN}•${NC} ${BOLD}SIMPLE_SETUP.md${NC} - Non-technical user guide"
    echo
    print_hint "Need help? Check the documentation files or visit the project repository"
    echo
fi

