# 🛡️ FB Post Shield - AI Facebook Post Checker

ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI พร้อม Dashboard แบบ Real-time

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Python](https://img.shields.io/badge/python-3.9+-green)
![React](https://img.shields.io/badge/react-18.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Features
- ✅ ตรวจจับคำผิดนโยบายอัตโนมัติ
- ✅ แยกระดับความเสี่ยง (High/Medium/Low)
- ✅ แจ้งเตือนผ่าน LINE Notify
- ✅ บันทึกข้อมูลลง Google Sheets
- ✅ รองรับโพสต์หลายประเภท (Text, Photo, Video, Link)

### 🎨 Dashboard (NEW v2.0)
- ✅ **Real-time Dashboard** - แสดงสถิติและการแจ้งเตือน
- ✅ **Post Monitor** - ดูโพสต์ทั้งหมดพร้อมค้นหาและกรอง
- ✅ **Settings Manager** - จัดการ keywords และ configuration
- ✅ **User Authentication** - ระบบ Login/Register ด้วย JWT
- ✅ **REST API** - Flask API พร้อม database (SQLite/PostgreSQL)

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │◄───────►│   Flask REST API │◄───────►│   PostgreSQL    │
│   (Dashboard)   │         │  (Backend + JWT) │         │    Database     │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                      │
                                      ├─────► Facebook Graph API
                                      ├─────► LINE Notify API
                                      └─────► Google Sheets API
```

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
cd Ai-FBPostchecker888
```

### 2. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Run backend server
python api/server.py
```

Backend จะรันที่: `http://localhost:5000`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### 3. Frontend Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

Frontend จะรันที่: `http://localhost:3000`

### 4. Production Build

```bash
# Build frontend
pnpm run build

# Files will be generated: main.js, main.css
```

---

## 📁 Project Structure

```
Ai-FBPostchecker888/
├── api/                          # Backend (Python Flask)
│   ├── server.py                 # Main API server with auth
│   ├── database.py               # Database configuration
│   ├── models.py                 # SQLAlchemy models
│   ├── auth.py                   # Authentication utilities
│   ├── post_checker.py           # Facebook post checker
│   ├── policy_detector.py        # Policy & risk detection
│   └── ...
│
├── src/                          # Frontend (React)
│   ├── App.tsx                   # Main app with auth
│   ├── main.tsx                  # Entry point
│   ├── components/               # UI components
│   ├── pages/                    # Page components
│   │   ├── Dashboard.tsx
│   │   ├── PostMonitor.tsx
│   │   ├── Settings.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── lib/
│   │   ├── api.ts                # API client with JWT
│   │   └── utils.ts
│   └── styles/
│
├── config/                       # Configuration files
├── scripts/                      # Build scripts
├── .env.example                  # Environment template
├── requirements.txt              # Python dependencies
├── package.json                  # Node dependencies
├── FRONTEND_GUIDE.md             # Frontend documentation
├── DEPLOYMENT_GUIDE.md           # Deployment instructions
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

สร้างไฟล์ `.env`:

```env
# Flask Configuration
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Database (SQLite for development, PostgreSQL for production)
DATABASE_URL=sqlite:///fbpostchecker.db

# Facebook (Optional - for automatic checking)
FACEBOOK_ACCESS_TOKEN=your-fb-token
FACEBOOK_PAGE_ID=your-page-id

# LINE Notification (Optional)
LINE_NOTIFY_TOKEN=your-line-token

# Google Sheets (Optional)
GOOGLE_CREDENTIALS_FILE=path/to/credentials.json
GOOGLE_SHEET_ID=your-sheet-id
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | สมัครสมาชิกใหม่ |
| POST | `/api/auth/login` | เข้าสู่ระบบ |
| GET | `/api/auth/me` | ดูข้อมูลผู้ใช้ปัจจุบัน |

### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | ดูโพสต์ทั้งหมด | ✅ |
| GET | `/api/posts/:id` | ดูโพสต์ตาม ID | ✅ |
| POST | `/api/posts` | เพิ่มโพสต์ใหม่ | ✅ |
| GET | `/api/stats` | ดูสถิติ | ✅ |
| GET | `/api/alerts/recent` | ดูการแจ้งเตือนล่าสุด | ✅ |

### Config Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/config` | ดู configuration | ✅ |
| PUT | `/api/config` | อัพเดต configuration | ✅ (Admin) |

ดูรายละเอียดเพิ่มเติมที่ [API Documentation](FRONTEND_GUIDE.md#-backend-api)

---

## 🚢 Deployment

ระบบรองรับการ deploy บน:

- ✅ **Railway** - Backend (แนะนำ)
- ✅ **Render** - Backend
- ✅ **Vercel** - Frontend (configured)
- ✅ **Heroku** - Backend (via Procfile)

### Quick Deploy

**Backend (Railway):**
1. Push code to GitHub
2. Connect Railway to your repo
3. Add PostgreSQL database
4. Set environment variables
5. Deploy!

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy!

ดูคู่มือละเอียดที่ [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎯 Usage Examples

### Check Facebook Posts (Python)

```python
from api.post_checker import PostChecker
from api.config_loader import load_config

config = load_config("config/config.json")
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# Check last 10 posts
checker.run(limit=10)
```

### Use REST API (JavaScript)

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
})

const { access_token } = await response.json()

// Get stats
const stats = await fetch('http://localhost:5000/api/stats', {
  headers: { 'Authorization': `Bearer ${access_token}` }
})
```

---

## 🧪 Testing

```bash
# Test backend
python api/server.py

# Test frontend
pnpm run dev

# Access dashboard
open http://localhost:3000

# Login with admin/admin123
```

---

## 📖 Documentation

- [Frontend Guide](FRONTEND_GUIDE.md) - คู่มือการใช้งาน Dashboard
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - คู่มือการ Deploy
- [Bug Fixes](BUG_FIXES.md) - รายการ bug ที่แก้ไข

---

## 🔐 Security

- ✅ JWT Authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ⚠️ **แนะนำ**: เปลี่ยน default admin password ทันที!

---

## 🛠️ Technology Stack

### Backend
- **Python 3.9+** - Programming language
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-Bcrypt** - Password hashing
- **SQLite/PostgreSQL** - Database

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **esbuild** - Build tool
- **Lucide React** - Icons

---

## 📊 Features by Version

### v2.0.0 (Current)
- ✅ React Dashboard UI
- ✅ User Authentication (JWT)
- ✅ Database Integration (SQLite/PostgreSQL)
- ✅ REST API
- ✅ Real-time monitoring
- ✅ Settings management

### v1.0.0
- ✅ Facebook post checking
- ✅ Policy detection
- ✅ Risk classification
- ✅ LINE notifications
- ✅ Google Sheets logging

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- Facebook Graph API
- LINE Notify API
- Google Sheets API
- Railway/Render/Vercel for hosting

---

## 📞 Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:

- 📧 เปิด [Issue](https://github.com/bowbozaa/Ai-FBPostchecker888/issues)
- 📚 อ่าน [Documentation](FRONTEND_GUIDE.md)
- 🚀 ดู [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

**Made with ❤️ by Claude Code**
