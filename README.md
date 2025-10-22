# Ai-FBPostchecker888

ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI ตรวจจับคำผิดนโยบาย แยกระดับความเสี่ยง พร้อมแจ้งเตือนผ่าน LINE และบันทึกลง Google Sheets โดยอัตโนมัติ พร้อม Dashboard แสดงสถิติแบบเรียลไทม์

## Features

- **ตรวจจับโพสต์อัตโนมัติ**: วิเคราะห์โพสต์ Facebook ทุกประเภท (ข้อความ, รูปภาพ, วิดีโอ, ลิงก์)
- **การจับคีย์เวิร์ดแบบแม่นยำ**: ใช้ word boundary matching เพื่อหลีกเลี่ยง false positives
- **จำแนกระดับความเสี่ยง**: แบ่งเป็น 3 ระดับ (สูง/กลาง/ต่ำ)
- **แจ้งเตือนทันที**: ส่งการแจ้งเตือนผ่าน LINE Notify
- **บันทึกอัตโนมัติ**: เก็บข้อมูลลง Google Sheets
- **Dashboard**: แสดงสถิติและข้อมูลแบบเรียลไทม์
- **RESTful API**: API endpoint สำหรับเชื่อมต่อกับระบบอื่น
- **Test Automation**: ทดสอบอัตโนมัติด้วย pytest

## Quick Start

### 1. Python Backend Setup

```bash
# สร้าง virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# หรือ venv\Scripts\activate บน Windows

# ติดตั้ง dependencies
pip install -r requirements.txt
```

### 2. Frontend Setup

```bash
# ติดตั้ง pnpm (ถ้ายังไม่มี)
npm install -g pnpm

# ติดตั้ง dependencies
pnpm install
```

### 3. Configuration

```bash
# คัดลอก config template
cp config/config.example.json config/config.json

# แก้ไข config.json ด้วย editor ที่คุณชอบ
```

ใส่ข้อมูลต่อไปนี้ใน `config/config.json`:
- Facebook Access Token & Page ID
- LINE Notify Token
- Google Sheets Credentials & Sheet ID
- Banned Keywords

### 4. Running the System

#### รัน Backend API:
```bash
python src/api_server.py
```
API จะรันที่ `http://localhost:5000`

#### รัน Frontend Dashboard:
```bash
pnpm dev
```
Dashboard จะรันที่ `http://localhost:3000`

#### รันระบบตรวจสอบโพสต์:
```python
from src.config_loader import load_config
from src.post_checker import PostChecker

config = load_config("config/config.json")
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)
checker.run(limit=10)
```

## Testing

```bash
# รัน tests ทั้งหมด
pytest tests/ -v

# รัน tests พร้อม coverage report
pytest tests/ --cov=src --cov-report=html
```

## Project Structure

```
Ai-FBPostchecker888/
├── src/                      # Python backend
│   ├── api_server.py        # Flask API server
│   ├── post_checker.py      # Main post checking logic
│   ├── policy_detector.py   # Policy detection & risk classification
│   ├── facebook_client.py   # Facebook API client
│   ├── line_notifier.py     # LINE notification
│   └── google_sheets_logger.py  # Google Sheets logging
├── frontend/                 # React frontend
│   ├── components/          # React components
│   ├── pages/               # Page components
│   └── styles/              # CSS styles
├── tests/                    # Test files
│   ├── test_policy_detector.py
│   ├── test_api_server.py
│   └── test_integration.py
├── config/                   # Configuration files
├── scripts/                  # Build scripts
└── docs/                     # Documentation

```

## Documentation

- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - คู่มือการใช้งานฉบับสมบูรณ์
- [BUG_FIXES.md](./BUG_FIXES.md) - รายละเอียดการแก้ไข bugs

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/stats` - ดึงสถิติระบบ
- `GET /api/recent-posts` - ดึงโพสต์ล่าสุดที่ตรวจพบ

## Bug Fixes

โปรเจกต์นี้ได้แก้ไข bugs สำคัญ 5 จุด:
1. ตรวจจับโพสต์ทุกประเภท (ไม่ใช่แค่ข้อความ)
2. จับคีย์เวิร์ดแบบแม่นยำ (word boundary matching)
3. จัดการข้อมูลที่ขาดหายได้อย่างถูกต้อง
4. ปรับปรุงการจำแนกความเสี่ยง
5. รองรับข้อมูลว่างเปล่า

ดูรายละเอียดใน [BUG_FIXES.md](./BUG_FIXES.md)

## Deployment

### Vercel (Frontend)
```bash
pnpm build
# Deploy ไปยัง Vercel
```

### Heroku/Railway (Backend)
```bash
# Push ไปยัง remote repository
git push heroku main
```

## License

MIT License

## Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ กรุณาเปิด issue เพื่อหารือก่อน
