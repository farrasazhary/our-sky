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

# Auto-inject Gemini API Key & VAPID Keys into server/.env if missing
if [ -f .env ]; then
  if ! grep -q "GEMINI_API_KEY" .env; then
    echo 'GEMINI_API_KEY="AIzaSyCzJkJ3JSwp9IvWxcRBLiC__4NB8GiCZM0"' >> .env
  else
    sed -i 's|GEMINI_API_KEY=.*|GEMINI_API_KEY="AIzaSyCzJkJ3JSwp9IvWxcRBLiC__4NB8GiCZM0"|g' .env
  fi
  if ! grep -q "VAPID_PUBLIC_KEY" .env; then
    echo 'VAPID_PUBLIC_KEY="BCtwDpMOybhnLrjpPd8rCIiRuh_qJ0bAxqUGgMdqUp543rGzSwCFvd1np0v74QjQfKH5T_gyNqZQCkYBMLdMeG4"' >> .env
    echo 'VAPID_PRIVATE_KEY="nYRjaEwxKMeuFEg24Zf385GqOfc9pkG4rEh-vQEo1bc"' >> .env
  fi
else
  echo 'PORT=5050' > .env
  echo 'NODE_ENV=production' >> .env
  echo 'DATABASE_URL="mysql://root:@localhost:3306/oursky_db"' >> .env
  echo 'JWT_SECRET="oursky_super_secret_jwt_key_2026"' >> .env
  echo 'JWT_EXPIRES_IN="30d"' >> .env
  echo 'STORAGE_PATH="./storage"' >> .env
  echo 'GEMINI_API_KEY="AIzaSyCzJkJ3JSwp9IvWxcRBLiC__4NB8GiCZM0"' >> .env
  echo 'VAPID_PUBLIC_KEY="BCtwDpMOybhnLrjpPd8rCIiRuh_qJ0bAxqUGgMdqUp543rGzSwCFvd1np0v74QjQfKH5T_gyNqZQCkYBMLdMeG4"' >> .env
  echo 'VAPID_PRIVATE_KEY="nYRjaEwxKMeuFEg24Zf385GqOfc9pkG4rEh-vQEo1bc"' >> .env
fi

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
