
# 🚂 Railway Deployment Guide

## ⚠️ IMPORTANT: If Build Failed
If you got a Prisma build error, I've fixed it! You need to:
1. **Update your GitHub repo** with the new `nixpacks.toml` file
2. **Redeploy** in Railway dashboard (click "Deploy" again)

## Step 1: Prepare Your GitHub Repo
1. Create a new GitHub repository
2. Upload the entire `/app` folder contents to the repo
3. Commit and push to GitHub

## Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with your GitHub account
3. Click "Deploy from GitHub repo"
4. Select your calculator repository
5. Railway will automatically detect it's a Next.js app

## Step 3: Add Database FIRST
⚠️ **IMPORTANT:** Add database BEFORE deploying!
1. In your Railway project dashboard
2. Click "Add Service" → "Database" → "PostgreSQL"
3. Railway will automatically create DATABASE_URL environment variable

## Step 4: Add Environment Variables
In Railway project settings, add these variables:
```
NEXTAUTH_URL=https://your-app-name.up.railway.app
NEXTAUTH_SECRET=your-random-secret-key-here
```

## Step 5: Deploy!
Railway will automatically:
- Install dependencies
- Generate Prisma client (fixed in install phase)
- Build the app
- Deploy to your Railway URL

## Step 6: Custom Domain (Optional)
1. In Railway dashboard, go to "Settings" → "Domains"
2. Add your custom domain (like calculator.yourdomain.com)
3. Update DNS with the provided CNAME record

## 🎯 That's It!
Your calculator will be live at: `https://your-app-name.up.railway.app`

## Troubleshooting
- If build fails, check the build logs in Railway dashboard
- Database connection issues: Make sure DATABASE_URL is set correctly
- Domain issues: Verify DNS propagation (takes 24-48 hours)

---
Need help? The app is ready to deploy - just follow these steps!
