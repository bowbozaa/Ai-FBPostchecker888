# Frontend Dashboard Guide

## 📋 ภาพรวม

ระบบ Frontend Dashboard สำหรับ AI Facebook Post Checker ที่สร้างด้วย React + TypeScript + Tailwind CSS

## 🎨 ฟีเจอร์

### 1. **Dashboard หน้าหลัก**
- แสดงสถิติการตรวจสอบโพสต์ทั้งหมด
- แสดงจำนวนโพสต์แยกตามระดับความเสี่ยง (High, Medium, Low)
- แสดงการแจ้งเตือนล่าสุด
- รีเฟรชข้อมูลอัตโนมัติ

### 2. **Post Monitor**
- ดูโพสต์ที่ตรวจสอบแล้วทั้งหมด
- ค้นหาโพสต์ด้วยคำค้น
- กรองตามระดับความเสี่ยง
- แสดง keywords ที่ถูก flag
- ลิงก์ไปยังโพสต์ใน Facebook

### 3. **Settings**
- จัดการ Banned Keywords
- จัดการ High Risk Terms
- ตั้งค่า Facebook Page ID
- ตั้งค่า Check Interval

## 🚀 การติดตั้งและรัน

### ติดตั้ง Dependencies

```bash
pnpm install
```

### รัน Development Server

```bash
pnpm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:3000

### Build Production

```bash
pnpm run build
```

ไฟล์ output จะอยู่ที่ `main.js` และ `main.css`

## 🔧 Backend API

### รัน Flask API Server

```bash
# ติดตั้ง Python dependencies
pip install -r requirements.txt

# รัน server
python api/server.py
```

API จะรันที่ http://localhost:5000

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/stats` - ดูสถิติ
- `GET /api/posts` - ดูโพสต์ทั้งหมด
  - Query params: `risk`, `search`, `limit`
- `GET /api/posts/:id` - ดูโพสต์ตาม ID
- `POST /api/posts` - เพิ่มโพสต์ใหม่
- `GET /api/alerts/recent` - ดูการแจ้งเตือนล่าสุด
- `GET /api/config` - ดู configuration
- `PUT /api/config` - อัพเดต configuration
- `POST /api/check/trigger` - Trigger การตรวจสอบใหม่

## 📁 โครงสร้างโปรเจค

```
Ai-FBPostchecker888/
├── api/                          # Python Backend
│   ├── server.py                 # Flask REST API
│   ├── post_checker.py           # Facebook Post Checker
│   ├── policy_detector.py        # Policy & Risk Detection
│   └── ...                       # Other backend files
│
├── src/                          # React Frontend
│   ├── App.tsx                   # Main App Component
│   ├── main.tsx                  # Entry Point
│   ├── components/               # UI Components
│   │   └── ui/
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── pages/                    # Page Components
│   │   ├── Dashboard.tsx
│   │   ├── PostMonitor.tsx
│   │   └── Settings.tsx
│   ├── lib/                      # Utilities
│   │   ├── api.ts                # API Client
│   │   └── utils.ts              # Helper Functions
│   └── styles/
│       └── globals.css           # Global Styles
│
├── scripts/
│   └── build.mjs                 # Build Script
│
├── index.html                    # HTML Template
├── package.json                  # Node Dependencies
├── requirements.txt              # Python Dependencies
├── tailwind.config.js            # Tailwind Config
└── vercel.json                   # Deployment Config
```

## 🎯 การใช้งาน

### 1. เริ่มต้นระบบ

```bash
# Terminal 1: รัน Backend API
python api/server.py

# Terminal 2: รัน Frontend Dev Server
pnpm run dev
```

### 2. เข้าใช้งาน Dashboard

เปิดเบราว์เซอร์ที่ http://localhost:3000

### 3. ตั้งค่า Keywords

1. ไปที่หน้า Settings
2. เพิ่ม Banned Keywords ที่ต้องการตรวจจับ
3. เพิ่ม High Risk Terms สำหรับการจัดระดับความเสี่ยง
4. บันทึกการตั้งค่า

## 🔄 Integration กับ Facebook

ระบบ Backend (Python) จะ:
1. ดึงโพสต์จาก Facebook Page ผ่าน Graph API
2. วิเคราะห์เนื้อหาและตรวจจับ keywords
3. จัดระดับความเสี่ยง
4. ส่งข้อมูลไปยัง Frontend ผ่าน REST API
5. บันทึกลง Google Sheets (ถ้าตั้งค่า)
6. ส่งแจ้งเตือนผ่าน LINE (ถ้าตั้งค่า)

## 📊 Dashboard Features

### Stats Cards
- **Total Posts Checked**: จำนวนโพสต์ที่ตรวจสอบทั้งหมด
- **High Risk**: โพสต์ที่มีความเสี่ยงสูง
- **Medium Risk**: โพสต์ที่มีความเสี่ยงปานกลาง
- **Checked Today**: โพสต์ที่ตรวจสอบวันนี้

### Recent Alerts
แสดงการแจ้งเตือนล่าสุดสำหรับโพสต์ที่มีความเสี่ยงสูงและปานกลาง

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **esbuild** - Bundler
- **Lucide React** - Icons

### Backend
- **Python 3** - Programming Language
- **Flask** - Web Framework
- **Flask-CORS** - CORS Support

## 📝 Next Steps

1. **เพิ่ม Authentication** - เพิ่มระบบ login
2. **Real-time Updates** - ใช้ WebSocket สำหรับอัพเดท real-time
3. **Charts & Analytics** - เพิ่มกราฟวิเคราะห์ข้อมูล
4. **Export Reports** - ส่งออกรายงานเป็น PDF
5. **Notifications** - แจ้งเตือนผ่าน Push Notification
6. **Multi-language** - รองรับหลายภาษา

## 🐛 Troubleshooting

### ไม่สามารถโหลดข้อมูลได้
- ตรวจสอบว่า Backend API Server กำลังรันอยู่
- ตรวจสอบ Console เพื่อดู error messages
- ตรวจสอบว่า API URL ถูกต้อง (default: http://localhost:5000/api)

### Build Error
- ลบ `node_modules` และติดตั้งใหม่
- ตรวจสอบ Node.js version (แนะนำ v18 ขึ้นไป)

## 📄 License

MIT License - ดูรายละเอียดใน LICENSE file

---

สร้างด้วย ❤️ โดย Claude Code
