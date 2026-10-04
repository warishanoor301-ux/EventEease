# 🚀 EventEase — Smart Event Planner & Budget Analyzer

**EventEase** aik Rule-Based Smart Event Planning Web Application hai (bina kisi paid AI API ke). User apni basic preferences (**Event Type, City, Venue Style, Guests, Total Budget, Season**) deta hai aur EventEase ka algorithm foran tayyar karta hai:
1. **Feasibility Score & Per-Head Budget Analysis**
2. **Smart 6-Category Budget Breakdown**
3. **Top 3 Matching Venues (City, Capacity & Weather Safety ke mutabiq)**
4. **Tailored Food Menus + Raw Ration/KG Quantity Estimator (Meat, Rice, BBQ, Naan, Sweet Dish)**
5. **Theme, Stage Decor, Lighting & Cost-Saving Tips**
6. **Single Consolidated 22-Item Master Event Checklist** (with Checkboxes, Progress Bar & PDF Print)

---

## 📁 Project Files Inside `eventease`
- `index.html` — Main Frontend UI (Vercel Ready)
- `style.css` — Modern Responsive Stylesheet + Print-to-PDF Styles
- `script.js` — Frontend Controller + Built-in Algorithm Fallback
- `app.py` — Python Flask Backend API Server (Render Ready, CORS Enabled)
- `algorithm.py` — Pure Rule-Based Smart Event Planning Algorithm
- `schema.sql` — Neon PostgreSQL Tables & Seed Data (20 Venues, 5 Menus, 7 Decor Themes)
- `init_db.py` — One-click Database Setup Script
- `requirements.txt`, `Procfile`, `render.yaml` — Render Server Deployment Configs
- `vercel.json` — Vercel Frontend Deployment Config

---

## 🌐 Step-by-Step Live Deployment Guide (GitHub + Neon + Render + Vercel)

### Step 1: GitHub Par Code Push Karein
1. `eventease.zip` ko unzip karein.
2. [GitHub.com](https://github.com) par aik nayi repository banayein jiska naam **`eventease`** rakhein.
3. Terminal / Git Bash khol kar ye commands chalayein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for EventEase project"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/eventease.git
   git push -u origin main
   ```

### Step 2: Neon Par Database Banayein (PostgreSQL)
1. [Neon.tech](https://neon.tech) par free account banayein aur **"New Project"** (`eventease-db`) create karein.
2. Dashboard se apni **Connection String** copy karein:
   `postgresql://user:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`
3. *(Optional)* Aap Neon ke **SQL Editor** mein ja kar `schema.sql` paste kar ke Run bhi kar sakte hain, warna jab Render server chalega tou `app.py` khud tables aur data create kar dega!

### Step 3: Render Par Backend Server Deploy Karein
1. [Render.com](https://render.com) par GitHub se login karein.
2. **"New +"** ➡️ **"Web Service"** par click karein aur apni `eventease` GitHub repository select karein.
3. Settings ye rakhein:
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT`
4. **Environment Variables** section mein jayein:
   - Key: `DATABASE_URL`
   - Value: *(Apna Neon PostgreSQL wala link paste karein)*
5. **"Create Web Service"** dabayein. Jab deploy ho jaye tou aapko Render ka link milega (maslan: `https://eventease-backend.onrender.com`).

### Step 4: Vercel Par Frontend Live Karein
1. [Vercel.com](https://vercel.com) par GitHub se login karein.
2. **"Add New Project"** par click karein aur wahi `eventease` GitHub repository **Import** kar ke **Deploy** dabayein.
3. 30 seconds mein aapka Frontend (`https://eventease.vercel.app`) live ho jayega!
4. Website ke upar **`⚙️ Server Link`** button par click kar ke apna Render URL paste kar dein (ya `script.js` ki line 9 mein `DEFAULT_RENDER_API_URL` mein apna Render link likh kar GitHub par push kar dein).
