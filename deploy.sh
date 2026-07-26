#!/bin/bash
# ==============================================================================
# OurSky Automatic VPS Deployment & Update Script
# Domain: oursky.farrasazhary.my.id
# ==============================================================================

echo "🚀 Starting OurSky Production Deployment..."

# 1. Pull & Force Sync latest code from GitHub main branch
echo "📥 Force syncing latest changes from GitHub..."
git fetch origin main
git reset --hard origin/main

# 2. Build Backend Server
echo "⚙️ Building Backend Server..."
cd server
npm install --production=false
npx prisma generate
npm run build
npx prisma db push

# Restart or Start PM2 Process
echo "🔄 Restarting Backend Service via PM2..."
pm2 restart oursky-backend --update-env || pm2 start dist/server.js --name "oursky-backend"

# 3. Build Frontend Application
echo "🎨 Building Frontend React PWA Application..."
cd ../client
npm install
npm run build

# 4. Reload Nginx Web Server
echo "🌐 Reloading Nginx Proxy..."
sudo systemctl reload nginx

echo "✅ OurSky Deployment Complete! Live at https://oursky.farrasazhary.my.id"
