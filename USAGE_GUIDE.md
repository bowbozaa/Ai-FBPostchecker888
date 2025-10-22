# คู่มือการใช้งาน Facebook Post Risk Monitor

## สารบัญ
1. [การติดตั้ง](#การติดตั้ง)
2. [การตั้งค่า](#การตั้งค่า)
3. [การใช้งาน](#การใช้งาน)
4. [การรัน Dashboard](#การรัน-dashboard)
5. [การทดสอบ](#การทดสอบ)
6. [การ Deploy](#การ-deploy)

---

## การติดตั้ง

### 1. ติดตั้ง Python Dependencies

```bash
# สร้าง virtual environment
python -m venv venv

# เปิดใช้งาน virtual environment
# บน Linux/Mac:
source venv/bin/activate
# บน Windows:
venv\Scripts\activate

# ติดตั้ง packages
pip install -r requirements.txt
```

### 2. ติดตั้ง Node.js Dependencies

```bash
# ติดตั้ง pnpm (ถ้ายังไม่มี)
npm install -g pnpm

# ติดตั้ง dependencies
pnpm install
```

---

## การตั้งค่า

### 1. สร้างไฟล์ Config

คัดลอก `config/config.example.json` เป็น `config/config.json`:

```bash
cp config/config.example.json config/config.json
```

### 2. แก้ไขไฟล์ Config

เปิดไฟล์ `config/config.json` และใส่ข้อมูลดังนี้:

```json
{
  "facebook": {
    "access_token": "YOUR_FACEBOOK_ACCESS_TOKEN",
    "page_id": "YOUR_FACEBOOK_PAGE_ID"
  },
  "line": {
    "token": "YOUR_LINE_NOTIFY_TOKEN"
  },
  "google_sheets": {
    "credentials_file": "path/to/credentials.json",
    "sheet_id": "YOUR_SHEET_ID"
  },
  "policy": {
    "banned_keywords": ["sale", "urgent", "alert", "ban"]
  }
}
```

### 3. ตั้งค่า Facebook Access Token

1. ไปที่ [Facebook Developers](https://developers.facebook.com/)
2. สร้าง App ใหม่
3. เพิ่ม Facebook Login และ Pages
4. สร้าง Access Token จาก Graph API Explorer
5. ให้สิทธิ์: `pages_read_engagement`, `pages_manage_posts`

### 4. ตั้งค่า LINE Notify Token

1. ไปที่ [LINE Notify](https://notify-bot.line.me/)
2. เข้าสู่ระบบและสร้าง Token ใหม่
3. เลือกห้องที่ต้องการรับการแจ้งเตือน

### 5. ตั้งค่า Google Sheets

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้าง Project ใหม่
3. เปิดใช้งาน Google Sheets API
4. สร้าง Service Account และดาวน์โหลด credentials JSON
5. แชร์ Google Sheet กับ email ของ Service Account

---

## การใช้งาน

### 1. รันระบบตรวจสอบโพสต์

สร้างไฟล์ `main.py`:

```python
from src.config_loader import load_config
from src.post_checker import PostChecker

# โหลด config
config = load_config("config/config.json")

# สร้าง PostChecker instance
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# รันการตรวจสอบ (ตรวจสอบ 10 โพสต์ล่าสุด)
checker.run(limit=10)
```

รันด้วยคำสั่ง:

```bash
python main.py
```

### 2. รันเป็น Scheduled Task

สร้างไฟล์ `cron_job.py` เพื่อรันอัตโนมัติทุกๆ 1 ชั่วโมง:

```python
import schedule
import time
from main import checker

def job():
    print("Running Facebook post checker...")
    checker.run(limit=20)

# ตั้งเวลาให้รันทุกชั่วโมง
schedule.every(1).hours.do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
```

---

## การรัน Dashboard

### 1. รัน API Server

```bash
# เปิด terminal หรือ command prompt
cd /path/to/Ai-FBPostchecker888

# เปิดใช้งาน virtual environment
source venv/bin/activate  # Linux/Mac
# หรือ
venv\Scripts\activate  # Windows

# รัน Flask server
python src/api_server.py
```

API จะรันที่ `http://localhost:5000`

### 2. รัน Frontend (Development)

เปิด terminal ใหม่:

```bash
# Build และรัน dev server
pnpm dev
```

Frontend จะรันที่ `http://localhost:3000`

### 3. Build สำหรับ Production

```bash
# Build frontend
pnpm build

# ไฟล์ที่ build จะอยู่ใน folder dist/
```

### 4. เข้าใช้งาน Dashboard

เปิดเว็บเบราว์เซอร์และไปที่:
- Development: `http://localhost:3000`
- Production: ตาม URL ที่ deploy

Dashboard จะแสดง:
- จำนวนโพสต์ทั้งหมด
- จำนวนโพสต์ที่ถูกตรวจพบ
- การแจกแจงตามระดับความเสี่ยง (สูง/กลาง/ต่ำ)
- โพสต์ล่าสุดที่ตรวจพบ

---

## การทดสอบ

### รัน Tests ทั้งหมด

```bash
pytest tests/ -v
```

### รัน Tests แยกไฟล์

```bash
# Test PolicyDetector
pytest tests/test_policy_detector.py -v

# Test API Server
pytest tests/test_api_server.py -v

# Test Integration
pytest tests/test_integration.py -v
```

### ดู Test Coverage

```bash
pytest tests/ --cov=src --cov-report=html
```

รายงานจะถูกสร้างในโฟลเดอร์ `htmlcov/`

---

## การ Deploy

### Deploy บน Vercel (Frontend)

1. Push code ขึ้น GitHub
2. เชื่อมต่อ Vercel กับ GitHub repository
3. ตั้งค่า Build Command: `pnpm build`
4. ตั้งค่า Output Directory: `dist`
5. ตั้งค่า Environment Variables:
   - `API_URL`: URL ของ API server

### Deploy API Server

#### ตัวอย่าง: Deploy บน Heroku

1. สร้างไฟล์ `Procfile`:

```
web: python src/api_server.py
```

2. สร้างไฟล์ `runtime.txt`:

```
python-3.11.0
```

3. Deploy:

```bash
heroku create your-app-name
git push heroku main
```

#### ตัวอย่าง: Deploy บน Railway

1. เชื่อมต่อ Railway กับ GitHub
2. เลือก repository
3. Railway จะตรวจจับและ deploy อัตโนมัติ

---

## Troubleshooting

### ปัญหา: API ไม่สามารถเชื่อมต่อ Google Sheets

**วิธีแก้:**
- ตรวจสอบว่าไฟล์ credentials JSON ถูกต้อง
- ตรวจสอบว่า Service Account มีสิทธิ์เข้าถึง Sheet
- ตรวจสอบว่า Sheet ID ถูกต้อง

### ปัญหา: Facebook API Error

**วิธีแก้:**
- ตรวจสอบว่า Access Token ยังไม่หมดอายุ
- ตรวจสอบสิทธิ์ของ Token
- ตรวจสอบว่า Page ID ถูกต้อง

### ปัญหา: LINE Notify ไม่ส่งข้อความ

**วิธีแก้:**
- ตรวจสอบว่า Token ถูกต้อง
- ตรวจสอบว่าบอทยังอยู่ในห้องแชท

---

## คำแนะนำเพิ่มเติม

### การเพิ่ม Keyword ใหม่

แก้ไขไฟล์ `config/config.json`:

```json
{
  "policy": {
    "banned_keywords": [
      "sale",
      "urgent",
      "alert",
      "เพิ่มคำใหม่ที่นี่"
    ]
  }
}
```

### การปรับแต่ง Risk Level

แก้ไขไฟล์ `src/policy_detector.py`:

```python
class RiskClassifier:
    def __init__(self):
        self._high_risk_terms = ["urgent", "alert", "now", "เพิ่มคำที่นี่"]
        self._medium_risk_terms = ["sale", "offer", "limited", "เพิ่มคำที่นี่"]
```

---

## ติดต่อและสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- เปิด Issue บน GitHub
- ดูเอกสาร BUG_FIXES.md สำหรับปัญหาที่พบบ่อย

---

**สร้างโดย:** AI Facebook Post Checker Team
**เวอร์ชัน:** 1.0.0
**อัพเดทล่าสุด:** 2025
