
# AI Product Launch Calculator

A NextJS application that helps operators calculate their hidden revenue opportunities with AI-powered digital products.

## 🚀 Railway Deployment (Zero Config)

This project is configured for **automatic Railway deployment** with zero configuration files needed.

### Environment Variables Required:
```bash
DATABASE_URL=postgresql://username:password@hostname:port/database
NEXTAUTH_URL=https://your-railway-app-url.up.railway.app  
NEXTAUTH_SECRET=ai-product-calculator-railway-secret-2024-deploy-key-xyz789
NODE_ENV=production
```

### Deployment Steps:
1. **Upload to GitHub** - Push this entire project
2. **Create Railway Project** - Add PostgreSQL database service
3. **Connect GitHub Repository** - Let Railway auto-detect
4. **Add Environment Variables** - Use the variables above
5. **Deploy** - Railway handles everything automatically!

## Features:
- 🎨 **Landing Page** - Conversion-optimized lead capture
- 🧮 **Calculator** - Interactive 7-step revenue calculator  
- 📊 **Results** - Personalized AI recommendations
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 📧 **Email Capture** - Lead storage and management

## Tech Stack:
- **Framework:** Next.js 14.2.28
- **Database:** PostgreSQL + Prisma
- **Styling:** Tailwind CSS + Shadcn/ui
- **Deployment:** Railway (auto-detected)

## Local Development:
```bash
npm install
npm run dev
```

Railway will automatically detect this as a Node.js project and handle:
- ✅ Dependency installation
- ✅ Prisma client generation  
- ✅ Production build
- ✅ App startup

**No configuration files needed - Railway does it all!** 🎉
