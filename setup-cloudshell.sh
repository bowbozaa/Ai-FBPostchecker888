#!/bin/bash

# ==============================================================================
# Google Cloud Shell Setup Script
# AI Facebook Post Checker 888
# ==============================================================================

set -e  # Exit on error

echo "🚀 Starting Google Cloud Shell Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Check if we're in Cloud Shell
if [ -z "$CLOUD_SHELL" ]; then
    print_warning "This script is designed for Google Cloud Shell"
    print_info "But it can work on other environments too"
fi

# Step 1: Check Node.js version
print_info "Checking Node.js version..."
node --version || { print_error "Node.js not found!"; exit 1; }
npm --version || { print_error "npm not found!"; exit 1; }
print_success "Node.js and npm are installed"
echo ""

# Step 2: Install pnpm (optional but recommended)
print_info "Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    print_info "Installing pnpm..."
    npm install -g pnpm
    print_success "pnpm installed"
else
    print_success "pnpm already installed"
fi
echo ""

# Step 3: Install dependencies
print_info "Installing dependencies..."
if [ -f "pnpm-lock.yaml" ]; then
    pnpm install
elif [ -f "package-lock.json" ]; then
    npm install
else
    npm install
fi
print_success "Dependencies installed"
echo ""

# Step 4: Configure Vite for Cloud Shell
print_info "Configuring Vite for Cloud Shell..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 8080,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
EOF
print_success "Vite configured for Cloud Shell (port 8080)"
echo ""

# Step 5: Setup .env file if not exists
if [ ! -f ".env" ]; then
    print_info "Creating .env file from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_success ".env file created"
        print_warning "Remember to update .env with your actual API keys!"
    else
        print_warning ".env.example not found, skipping..."
    fi
else
    print_success ".env file already exists"
fi
echo ""

# Step 6: Display environment info
print_info "Environment Information:"
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"
echo "  pnpm: $(pnpm --version 2>/dev/null || echo 'not installed')"
echo "  Working Directory: $(pwd)"
echo "  Port: 8080"
echo ""

# Step 7: Final instructions
print_success "Setup completed! 🎉"
echo ""
print_info "Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Click 'Web Preview' button (top right)"
echo "  3. Select 'Preview on port 8080'"
echo ""
print_info "Useful commands:"
echo "  • Check port: netstat -tuln | grep 8080"
echo "  • View env: env | grep PORT"
echo "  • Pull updates: git pull origin master"
echo "  • Edit .env: nano .env"
echo ""
print_warning "Note: Cloud Shell sessions timeout after 20 minutes of inactivity"
print_info "Your home directory (~/) persists, but /tmp does not"
echo ""
