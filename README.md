# AI FB Post Checker 888 🤖

ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI - ตรวจจับคำผิดนโยบาย แยกระดับความเสี่ยง พร้อมแจ้งเตือนผ่าน LINE และบันทึกลง Google Sheets โดยอัตโนมัติ

---

## ✨ ฟีเจอร์หลัก

- 🔍 **วิเคราะห์โพสต์ Facebook** - ตรวจสอบเนื้อหาโพสต์อัตโนมัติผ่าน Facebook Graph API
- ⚠️ **ตรวจจับคำผิดนโยบาย** - ระบุคำที่ละเมิดนโยบายและคำต้องห้าม
- 📊 **จัดระดับความเสี่ยง** - แบ่งโพสต์ตามระดับความเสี่ยง (ต่ำ/กลาง/สูง)
- 🔔 **แจ้งเตือนอัตโนมัติ** - ส่งการแจ้งเตือนผ่าน LINE Notify
- 📈 **บันทึกข้อมูล** - เก็บบันทึกใน Google Sheets อัตโนมัติ
- 📅 **รายงานประจำวัน** - สร้างรายงานสรุปแบบอัตโนมัติ
- 🎯 **Gray Hat Analysis** - วิเคราะห์ขั้นสูงด้วย AI Prompts
- ✍️ **เครื่องมือสร้างโพสต์** - UI สำหรับสร้างและกำหนดเวลาโพสต์
- 📉 **Dashboard สถิติ** - วิเคราะห์และแสดงสถิติการใช้งาน
- 👥 **จัดการผู้ใช้** - รองรับหลายผู้ใช้
- 🔗 **n8n Integration** - เชื่อมต่อกับ Workflow Automation

---

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18.3.1** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component Library
- **Zustand** - State Management
- **React Router 7.9.1** - Routing
- **React Hook Form + Zod** - Form Handling & Validation
- **Recharts** - Data Visualization

### Backend & Integration
- **Facebook Graph API** - ดึงข้อมูลโพสต์
- **LINE Notify API** - ส่งการแจ้งเตือน
- **Google Sheets API** - บันทึกข้อมูล
- **n8n** - Workflow Automation

### Utilities
- **jsPDF + jspdf-autotable** - สร้าง PDF
- **ExcelJS** - สร้างไฟล์ Excel
- **i18next** - Internationalization
- **date-fns** - จัดการวันที่

---

## 📦 การติดตั้ง

### ข้อกำหนดเบื้องต้น

- Node.js >= 18.0.0
- pnpm (แนะนำ) หรือ npm

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
   cd Ai-FBPostchecker888
   ```

2. **ติดตั้ง dependencies**
   ```bash
   # ใช้ pnpm (แนะนำ)
   pnpm install

   # หรือใช้ npm
   npm install --legacy-peer-deps
   ```

3. **ตั้งค่า Environment Variables**
   ```bash
   # คัดลอกไฟล์ตัวอย่าง
   cp .env.example .env

   # แก้ไขไฟล์ .env และใส่ค่าจริง
   nano .env
   ```

4. **ตั้งค่า Configuration**
   ```bash
   # คัดลอกไฟล์ config ตัวอย่าง
   cp config/config.example.json config/config.json

   # แก้ไขไฟล์ config.json และใส่ค่าจริง
   nano config/config.json
   ```

5. **เริ่มใช้งาน Development Server**
   ```bash
   pnpm dev
   # หรือ
   npm run dev
   ```

6. **เปิดเบราว์เซอร์**
   ```
   http://localhost:3000
   ```

---

## 🔑 การตั้งค่า API Tokens

### 1. Facebook Access Token
1. ไปที่ [Facebook Developers](https://developers.facebook.com/)
2. สร้างแอปใหม่หรือเลือกแอปที่มีอยู่
3. ไปที่ Tools > Graph API Explorer
4. เลือก Page และ Permissions ที่ต้องการ
5. คัดลอก Access Token

### 2. LINE Notify Token
1. ไปที่ [LINE Notify](https://notify-bot.line.me/)
2. เข้าสู่ระบบด้วยบัญชี LINE
3. ไปที่ My Page > Generate Token
4. ตั้งชื่อ Token และเลือกกลุ่มที่ต้องการแจ้งเตือน
5. คัดลอก Token (จะแสดงเพียงครั้งเดียว)

### 3. Google Sheets API
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่
3. เปิดใช้งาน Google Sheets API
4. สร้าง Service Account
5. ดาวน์โหลด credentials.json
6. วางไฟล์ใน `config/credentials.json`
7. แชร์ Google Sheet ให้กับ Service Account Email

---

## 🚀 การใช้งาน

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Legacy Build (esbuild)
```bash
pnpm legacy:dev
pnpm legacy:build
```

---

## 📁 โครงสร้างโปรเจกต์

```
Ai-FBPostchecker888/
├── src/
│   ├── components/        # React components
│   │   ├── analyzer/     # Post analysis components
│   │   ├── dashboard/    # Dashboard widgets
│   │   ├── charts/       # Chart components
│   │   ├── settings/     # Settings panels
│   │   ├── postCreator/  # Post creation UI
│   │   └── ui/          # Shadcn UI components
│   ├── pages/            # Page components
│   ├── services/         # Business logic & API calls
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── config/           # Configuration
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
├── api/                  # Backend API routes
│   ├── events.js        # Event handlers
│   ├── log-error.js     # Error logging
│   └── cron/            # Scheduled tasks
├── config/               # Configuration files
│   ├── config.json      # Main config (gitignored)
│   ├── config.example.json
│   └── rules.config.json
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
└── index.html            # HTML entry point
```

---

## 🎨 หน้าจอต่างๆ

1. **Home** - Dashboard หลัก แสดงสถิติและการแจ้งเตือน
2. **Gray Hat** - วิเคราะห์ขั้นสูง
3. **Post Creator** - สร้างและกำหนดเวลาโพสต์
4. **Stats** - สถิติและการวิเคราะห์
5. **Settings** - ตั้งค่าระบบ
6. **Users** - จัดการผู้ใช้
7. **N8n Builder** - เชื่อมต่อ n8n workflow
8. **Process Error Guide** - คู่มือแก้ไขปัญหา

---

## 🔧 การแก้ไขปัญหา

### ปัญหา: Build ล้มเหลว
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ปัญหา: Permission Denied (Dropbox)
```bash
# ตรวจสอบว่า Dropbox sync เสร็จแล้ว
# รอ Dropbox sync เสร็จก่อนรัน build
```

### ปัญหา: Type Errors
```bash
# ตรวจสอบ TypeScript version
pnpm add -D typescript@latest
```

### ปัญหา: API ไม่ทำงาน
1. ตรวจสอบ `.env` ว่าใส่ค่าถูกต้อง
2. ตรวจสอบ `config/config.json`
3. ตรวจสอบ API tokens ยังใช้ได้
4. ดู logs ใน Developer Console

---

## 📝 Configuration Files

### `.env`
```env
VITE_FACEBOOK_ACCESS_TOKEN=your_token_here
VITE_FACEBOOK_PAGE_ID=your_page_id
VITE_LINE_NOTIFY_TOKEN=your_line_token
VITE_GOOGLE_SHEETS_ID=your_sheet_id
VITE_API_BASE_URL=http://localhost:3000/api
```

### `config/config.json`
```json
{
  "facebook": {
    "access_token": "YOUR_TOKEN",
    "page_id": "YOUR_PAGE_ID"
  },
  "line": {
    "token": "YOUR_LINE_TOKEN"
  },
  "google_sheets": {
    "credentials_file": "./config/credentials.json",
    "sheet_id": "YOUR_SHEET_ID"
  },
  "policy": {
    "banned_keywords": ["keyword1", "keyword2"]
  }
}
```

---

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**bowbozaa**
- GitHub: [@bowbozaa](https://github.com/bowbozaa)

---

## 🙏 Acknowledgments

- Shadcn/ui for the beautiful components
- Facebook Graph API
- LINE Notify API
- Google Sheets API
- All contributors to this project

---

## 📞 Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- เปิด Issue ใน GitHub
- ติดต่อผ่าน LINE Notify

---

**Made with ❤️ in Thailand**
