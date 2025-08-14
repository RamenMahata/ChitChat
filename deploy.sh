#!/bin/bash

# ChitChat Vercel Deployment Script
echo "🚀 Starting ChitChat deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📝 Don't forget to:"
echo "   1. Set up environment variables in Vercel dashboard"
echo "   2. Update CORS_ORIGIN with your frontend URL"
echo "   3. Test your application"
