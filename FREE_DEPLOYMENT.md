# Free Deployment Guide - LandLordLens

This guide covers the best **free** options to deploy your LandLordLens application.

## 🎯 Recommended Free Deployment Strategy

### **Option 1: Render (BEST - All-in-One Free Tier)** ⭐ RECOMMENDED

**Why Render?**
- ✅ Free tier for both frontend (static site) and backend (web service)
- ✅ Automatic SSL certificates
- ✅ Easy environment variable management
- ✅ Free PostgreSQL (if you want to migrate later)
- ✅ Simple deployment from GitHub
- ✅ No credit card required for free tier

**Limitations:**
- Free services spin down after 15 minutes of inactivity (cold start ~30 seconds)
- 750 hours/month free (enough for 24/7 if you only use one service)

**Setup Steps:**

#### 1. Frontend Deployment (Static Site)

1. **Build your frontend:**
   ```bash
   npm run build
   ```

2. **Create `render.yaml` in your repo root:**
   ```yaml
   services:
     # Frontend Static Site
     - type: web
       name: landlordlens-frontend
       env: static
       buildCommand: npm install && npm run build
       staticPublishPath: ./dist
       headers:
         - path: /*
           name: X-Frame-Options
           value: DENY
         - path: /*
           name: X-Content-Type-Options
           value: nosniff
       routes:
         - type: rewrite
           source: /*
           destination: /index.html
   
     # Backend API
     - type: web
       name: landlordlens-backend
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 10000
         - key: MONGODB_URI
           sync: false  # Set manually in Render dashboard
         - key: JWT_SECRET
           sync: false  # Set manually in Render dashboard
         - key: STRIPE_SECRET_KEY
           sync: false  # Set manually in Render dashboard
         - key: STRIPE_WEBHOOK_SECRET
           sync: false  # Set manually in Render dashboard
         - key: STRIPE_PRICE_BASIC_MONTHLY
           sync: false
         - key: STRIPE_PRICE_BASIC_YEARLY
           sync: false
         - key: STRIPE_PRICE_PREMIUM_MONTHLY
           sync: false
         - key: STRIPE_PRICE_PREMIUM_YEARLY
           sync: false
         - key: FRONTEND_URL
           fromService:
             type: web
             name: landlordlens-frontend
             property: url
   ```

3. **Deploy on Render:**
   - Go to https://render.com
   - Sign up with GitHub
   - Connect your repository
   - Render will auto-detect `render.yaml` and create both services
   - Set environment variables in the dashboard for the backend service
   - Update `FRONTEND_URL` in backend env vars after frontend deploys

4. **Update Stripe Webhook URL:**
   - Go to Stripe Dashboard > Webhooks
   - Update webhook URL to: `https://your-backend-url.onrender.com/api/webhooks/stripe`

#### 2. Update Frontend API URL

After deployment, update your frontend to use the backend URL:

**Option A: Environment Variable (Recommended)**
- In Render dashboard, add environment variable to frontend:
  - `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`

**Option B: Update webpack.config.js**
- Modify the `REACT_APP_API_URL` in webpack config for production builds

---

### **Option 2: Railway (Good Alternative - $5 Monthly Credit)**

**Why Railway?**
- ✅ $5 free credit monthly (usually enough for small apps)
- ✅ No cold starts (always running)
- ✅ Easy deployment from GitHub
- ✅ Great developer experience

**Setup:**

1. **Create `railway.json`:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Deploy:**
   - Go to https://railway.app
   - Sign up with GitHub
   - Create new project
   - Add GitHub repo
   - Railway auto-detects Node.js
   - Set environment variables
   - Deploy!

3. **For Frontend:**
   - Create separate Railway service
   - Build command: `npm install && npm run build`
   - Start command: `npx serve -s dist -l 3000`
   - Add `serve` to dependencies: `npm install --save serve`

---

### **Option 3: Vercel (Frontend) + Render/Railway (Backend)**

**Why this combo?**
- ✅ Vercel has excellent free tier for static sites
- ✅ No cold starts for frontend
- ✅ Global CDN
- ✅ Backend on Render/Railway

**Setup:**

#### Frontend on Vercel:

1. **Create `vercel.json`:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": null,
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. **Deploy:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Import your repository
   - Vercel will auto-detect settings
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url/api`

#### Backend on Render/Railway:
- Follow Option 1 or 2 for backend deployment

---

### **Option 4: Fly.io (Backend Only)**

**Why Fly.io?**
- ✅ Free tier with generous limits
- ✅ Global edge deployment
- ✅ No cold starts

**Setup:**

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Create `fly.toml`:**
   ```toml
   app = "landlordlens-api"
   primary_region = "lhr"  # London

   [build]

   [env]
     PORT = "8080"
     NODE_ENV = "production"

   [[services]]
     internal_port = 8080
     protocol = "tcp"

     [[services.ports]]
       handlers = ["http"]
       port = 80
       force_https = true

     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443

     [services.concurrency]
       type = "connections"
       hard_limit = 25
       soft_limit = 20

   [[services.http_checks]]
     interval = "10s"
     timeout = "2s"
     grace_period = "5s"
     method = "GET"
     path = "/api/health"
   ```

3. **Deploy:**
   ```bash
   fly launch
   fly secrets set MONGODB_URI=your_mongodb_uri
   fly secrets set JWT_SECRET=your_jwt_secret
   # ... set other secrets
   fly deploy
   ```

---

## 🗄️ Database: MongoDB Atlas (Free Tier)

Your app already uses MongoDB Atlas. The free tier includes:
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Free forever (no credit card required for M0 tier)

**Current Setup:**
- You're already using MongoDB Atlas
- Connection string is in `lib/mongodb.js`
- Make sure to use environment variable in production!

---

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Remove hardcoded MongoDB URI from `lib/mongodb.js` (use env var only)
- [ ] Test `npm run build` locally
- [ ] Test `npm start` locally
- [ ] Verify all environment variables are documented
- [ ] Update CORS settings if needed

### Environment Variables Needed

**Backend:**
```env
NODE_ENV=production
PORT=5000 (or platform default)
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC_MONTHLY=price_...
STRIPE_PRICE_BASIC_YEARLY=price_...
STRIPE_PRICE_PREMIUM_MONTHLY=price_...
STRIPE_PRICE_PREMIUM_YEARLY=price_...
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Post-Deployment

- [ ] Test health endpoint: `GET /api/health`
- [ ] Test authentication flow
- [ ] Update Stripe webhook URL
- [ ] Test Stripe checkout flow
- [ ] Verify webhook events are received
- [ ] Test all major features
- [ ] Set up monitoring (optional)

---

## 🔧 Required Code Changes

### 1. Fix MongoDB Connection (Security)

Update `lib/mongodb.js` to only use environment variable:

```javascript
const mongoose = require('mongoose');

let cachedConnection = null;

async function connectToMongoDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    cachedConnection = connection;
    console.log('✅ Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
```

### 2. Update Server to Serve Frontend (Optional)

If deploying as a single service, update `server/index.js`:

```javascript
// Add after other middleware, before routes
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}
```

### 3. Update CORS for Production

Update CORS settings in `server/index.js`:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
```

---

## 🚀 Quick Start: Render Deployment

**Fastest way to get deployed:**

1. **Push code to GitHub** (if not already)

2. **Fix MongoDB connection:**
   - Remove hardcoded URI from `lib/mongodb.js`
   - Use environment variable only

3. **Create `render.yaml`** (see Option 1 above)

4. **Deploy on Render:**
   - Sign up at render.com
   - Connect GitHub repo
   - Render auto-detects `render.yaml`
   - Set environment variables
   - Deploy!

5. **Update Stripe webhook URL**

6. **Test your app!**

---

## 💡 Tips for Free Tier Success

1. **Monitor Usage:**
   - Render: Check dashboard for usage
   - Railway: Monitor $5 credit usage
   - MongoDB Atlas: Check storage usage

2. **Optimize for Cold Starts (Render):**
   - Add health check endpoint (you already have `/api/health`)
   - Consider using a ping service to keep it warm (UptimeRobot free tier)

3. **Database Optimization:**
   - Add indexes to frequently queried fields
   - Use connection pooling
   - Clean up old data periodically

4. **Build Optimization:**
   - Use `.dockerignore` if using Docker
   - Exclude `node_modules` from git
   - Use build cache when possible

---

## 🆓 Free Tier Limits Summary

| Platform | Free Tier Limits |
|----------|-----------------|
| **Render** | 750 hours/month, spins down after 15min inactivity |
| **Railway** | $5 credit/month, ~500 hours at $0.01/hour |
| **Vercel** | 100GB bandwidth/month, unlimited requests |
| **Fly.io** | 3 shared VMs, 160GB outbound data/month |
| **MongoDB Atlas** | 512MB storage, shared cluster |

---

## 🎯 Recommendation

**For your app, I recommend Option 1 (Render)** because:
- ✅ Simplest setup (one platform)
- ✅ Free tier covers both frontend and backend
- ✅ No credit card required
- ✅ Easy environment variable management
- ✅ Automatic SSL
- ✅ Good documentation

The cold start (30 seconds) is acceptable for a property management app that's not high-traffic.

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs
