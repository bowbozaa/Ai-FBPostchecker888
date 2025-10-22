# Deployment Guide

คู่มือการ Deploy ระบบ FB Post Shield ไปยัง Production

---

## 📋 ภาพรวม

ระบบประกอบด้วย 2 ส่วนหลัก:
1. **Backend (Python Flask)** - REST API + Database
2. **Frontend (React)** - Dashboard UI

---

## 🚀 Option 1: Deploy Backend บน Railway

### ขั้นตอนการ Deploy

1. **สร้าง Account ที่ Railway**
   - ไปที่ https://railway.app
   - Sign up ด้วย GitHub

2. **สร้าง Project ใหม่**
   - คลิก "New Project"
   - เลือก "Deploy from GitHub repo"
   - เลือก repository `Ai-FBPostchecker888`

3. **เพิ่ม PostgreSQL Database**
   - ใน Project คลิก "+ New"
   - เลือก "Database" → "PostgreSQL"
   - Railway จะสร้าง database และ connection string ให้

4. **ตั้งค่า Environment Variables**
   ใน Settings → Variables เพิ่ม:
   ```
   SECRET_KEY=<random-secret-key>
   JWT_SECRET_KEY=<random-jwt-secret-key>
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   PYTHON_VERSION=3.11
   ```

5. **Deploy**
   - Railway จะ deploy อัตโนมัติ
   - ดู URL ที่ Settings → Domains
   - URL จะเป็นแบบ: `https://your-app.up.railway.app`

### สร้าง Admin User

หลัง deploy แล้ว admin user จะถูกสร้างอัตโนมัติ:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **แนะนำ**: เปลี่ยน password ทันทีหลัง login ครั้งแรก!

---

## 🚀 Option 2: Deploy Backend บน Render

### ขั้นตอนการ Deploy

1. **สร้าง Account ที่ Render**
   - ไปที่ https://render.com
   - Sign up ด้วย GitHub

2. **สร้าง Web Service**
   - คลิก "New +" → "Web Service"
   - Connect repository `Ai-FBPostchecker888`
   - ตั้งค่าดังนี้:
     - **Name**: `fbpostchecker-api`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python api/server.py`

3. **สร้าง PostgreSQL Database**
   - คลิก "New +" → "PostgreSQL"
   - ตั้งชื่อ: `fbpostchecker-db`

4. **ตั้งค่า Environment Variables**
   ใน Environment tab เพิ่ม:
   ```
   SECRET_KEY=<random-secret-key>
   JWT_SECRET_KEY=<random-jwt-secret-key>
   DATABASE_URL=<postgresql-connection-string-from-database>
   PYTHON_VERSION=3.11
   ```

5. **Deploy**
   - คลิก "Create Web Service"
   - Render จะ build และ deploy
   - URL จะเป็นแบบ: `https://fbpostchecker-api.onrender.com`

---

## 🌐 Deploy Frontend บน Vercel

### ขั้นตอนการ Deploy

1. **สร้าง Account ที่ Vercel**
   - ไปที่ https://vercel.com
   - Sign up ด้วย GitHub

2. **Import Project**
   - คลิก "Add New..." → "Project"
   - Import repository `Ai-FBPostchecker888`

3. **ตั้งค่า Build**
   - **Framework Preset**: Other
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.` (root)
   - **Install Command**: `pnpm install`

4. **ตั้งค่า Environment Variables**
   ใน Project Settings → Environment Variables เพิ่ม:
   ```
   VITE_API_URL=<backend-url-from-railway-or-render>/api
   ```

   ตัวอย่าง:
   ```
   VITE_API_URL=https://fbpostchecker-api.onrender.com/api
   ```

5. **Deploy**
   - คลิก "Deploy"
   - Vercel จะ build และ deploy
   - URL จะเป็นแบบ: `https://ai-fbpostchecker888.vercel.app`

---

## 🔧 การตั้งค่าหลัง Deploy

### 1. เชื่อมต่อ Frontend กับ Backend

แก้ไข `src/lib/api.ts` ให้ใช้ production URL:

```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend-url.com/api'
```

### 2. ตั้งค่า CORS

ใน `api/server.py` อัพเดต CORS settings:

```python
# Allow specific origins in production
origins = [
    "https://your-frontend-url.vercel.app",
    "http://localhost:3000"  # สำหรับ development
]

CORS(app, origins=origins)
```

### 3. เปลี่ยน Secret Keys

สร้าง random secret keys ด้วย:

```python
import secrets
print(secrets.token_urlsafe(32))
```

อัพเดตใน environment variables ทั้ง `SECRET_KEY` และ `JWT_SECRET_KEY`

### 4. ตั้งค่า Database Migrations

หลัง deploy database ครั้งแรก:

```bash
# Connect to your Railway/Render shell
python
>>> from api.database import db, init_db
>>> from api import server  # Import app
>>> with server.app.app_context():
...     db.create_all()
...     print("Database tables created!")
```

---

## 🔒 Security Checklist

- [ ] เปลี่ยน default admin password
- [ ] ตั้งค่า SECRET_KEY และ JWT_SECRET_KEY ที่แข็งแรง
- [ ] จำกัด CORS origins
- [ ] ใช้ HTTPS สำหรับทั้ง Frontend และ Backend
- [ ] ตั้งค่า rate limiting (optional)
- [ ] เปิด environment variables protection ใน Vercel
- [ ] ตั้งค่า database backups

---

## 📊 Monitoring & Logs

### Railway
- ดู logs ที่ Project → Deployments → View Logs
- ดู metrics ที่ Project → Metrics

### Render
- ดู logs ที่ Service → Logs
- ดู metrics ที่ Service → Metrics

### Vercel
- ดู deployment logs ที่ Project → Deployments
- ดู analytics ที่ Project → Analytics

---

## 🐛 Troubleshooting

### Backend ไม่ทำงาน

1. ตรวจสอบ logs
2. ตรวจสอบ environment variables
3. ตรวจสอบ database connection
4. ตรวจสอบว่า dependencies ติดตั้งครบ

### Frontend ไม่เชื่อมกับ Backend

1. ตรวจสอบ CORS settings
2. ตรวจสอบ API_URL ใน environment variables
3. ตรวจสอบว่า backend URL ถูกต้อง (มี /api)
4. ตรวจสอบใน browser console

### Database Connection Error

1. ตรวจสอบ DATABASE_URL format:
   - PostgreSQL: `postgresql://user:pass@host:5432/db`
   - SQLite: `sqlite:///path/to/db.db`
2. ตรวจสอบว่า database service ทำงานอยู่
3. ตรวจสอบ network access rules

---

## 💰 ราคา

### Railway
- Free: $5 credit/month
- Hobby: $5/month (500 hours)
- Pro: $20/month

### Render
- Free: ฟรี (limited)
- Starter: $7/month
- Standard: $25/month

### Vercel
- Hobby: ฟรี
- Pro: $20/month/user

**แนะนำสำหรับเริ่มต้น**: ใช้ Railway Free tier สำหรับ backend และ Vercel Free tier สำหรับ frontend

---

## 📝 Post-Deployment Tasks

1. ทดสอบ Login/Register
2. ทดสอบ Dashboard features
3. ทดสอบ Post Monitor
4. ทดสอบ Settings
5. เพิ่ม test data
6. ตั้งค่า monitoring alerts
7. สร้าง backup strategy

---

## 🔄 การอัพเดต

### Frontend
1. Push changes to GitHub
2. Vercel จะ deploy อัตโนมัติ

### Backend
1. Push changes to GitHub
2. Railway/Render จะ deploy อัตโนมัติ

---

## 📞 Support

หากมีปัญหาหรือต้องการความช่วยเหลือ:
- เปิด Issue ใน GitHub
- ดู Documentation ที่ FRONTEND_GUIDE.md
- ตรวจสอบ logs ใน deployment platform

---

**หมายเหตุ**: อย่าลืมเก็บ credentials และ secrets ไว้ในที่ปลอดภัย!
