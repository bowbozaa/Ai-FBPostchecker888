# 🚀 คู่มือการ Deploy โปรเจกต์ Ai-FBPostchecker888

## ⚠️ สำคัญ! คุณต้องทำขั้นตอนนี้ด้วยตัวเอง

เนื่องจากโปรเจกต์อยู่ใน Dropbox folder ซึ่งมีปัญหา file permissions และ git operations

---

## 📝 ขั้นตอนที่ 1: Commit และ Push จาก Dropbox

### 1.1 ปิด Dropbox Sync ชั่วคราว
```
1. คลิกขวาที่ Dropbox icon ในระบบ (System Tray)
2. เลือก "Pause syncing" → "Pause for 30 minutes"
```

### 1.2 เปิด Git Bash หรือ Terminal

```bash
# ไปที่ Dropbox folder
cd "c:/Users/UFA-888/Sabibra Dropbox/EX PLORE/Ai-FBPostchecker888"

# ตรวจสอบ git status
git status

# Add ทุกอย่างเข้า git (ถ้ายังไม่ได้ add)
git add -A

# Commit (ถ้ายังไม่ได้ commit)
git commit -m "feat: Migrate from Python to React + Vite

- Replace esbuild with Vite for better DX
- Add modern React 18 + TypeScript setup
- Fix axios and @types/react versions
- Add configuration files (.env, vite.config.ts)
- Remove Python legacy code
- Complete README rewrite
- Update dependencies

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push ไป GitHub
git push origin master
```

---

## 📝 ขั้นตอนที่ 2: Clone ใหม่ที่ C:\Projects

```bash
# ลบ folder เก่าออก (ถ้ามี)
cd /c/Projects
rm -rf Ai-FBPostchecker888-local
rm -rf Ai-FBPostchecker888

# Clone จาก GitHub
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git

# เข้าไปใน folder
cd Ai-FBPostchecker888

# ตรวจสอบว่า code ครบหรือไม่
ls src/
ls src/components/
```

---

## 📝 ขั้นตอนที่ 3: ตั้งค่าและรันโปรเจกต์

### 3.1 ติดตั้ง Dependencies

```bash
# ใช้ npm
npm install --legacy-peer-deps

# หรือใช้ pnpm (แนะนำ - เร็วกว่า)
pnpm install
```

### 3.2 ตั้งค่า Environment Variables

```bash
# คัดลอก .env.example เป็น .env
cp .env.example .env

# แก้ไข .env ด้วย text editor
# ใส่ค่าจริงของ:
# - VITE_FACEBOOK_ACCESS_TOKEN
# - VITE_FACEBOOK_PAGE_ID
# - VITE_LINE_NOTIFY_TOKEN
# - VITE_GOOGLE_SHEETS_ID
```

### 3.3 ตั้งค่า Config File

```bash
# คัดลอก config example
cp config/config.example.json config/config.json

# แก้ไข config/config.json ด้วย text editor
# ใส่ค่าจริงของ API tokens
```

### 3.4 รัน Development Server

```bash
# รัน dev server
npm run dev

# หรือ
pnpm dev
```

เปิดเบราว์เซอร์ไปที่: **http://localhost:3000**

---

## 📝 ขั้นตอนที่ 4: Build สำหรับ Production

```bash
# Build
npm run build

# หรือ
pnpm build

# Preview production build
npm run preview
```

---

## 🎯 ขั้นตอนถัดไป (Optional)

### ลบโปรเจกต์ใน Dropbox (หลังจาก push สำเร็จ)

เนื่องจากโปรเจกต์อยู่ใน GitHub แล้ว คุณสามารถลบโปรเจกต์ใน Dropbox ออกได้:

```bash
# ⚠️ WARNING: ให้แน่ใจว่า push ไป GitHub สำเร็จก่อน!

# ตรวจสอบว่า push สำเร็จ
cd /c/Projects/Ai-FBPostchecker888
git log --oneline -5

# ถ้า push สำเร็จแล้ว สามารถลบ Dropbox folder ได้
# (ทำด้วย Windows Explorer จะปลอดภัยกว่า)
```

---

## ✅ Checklist

- [ ] ปิด Dropbox sync
- [ ] Commit changes ใน Dropbox folder
- [ ] Push ไป GitHub
- [ ] Clone ใหม่ที่ C:\Projects
- [ ] ติดตั้ง dependencies
- [ ] ตั้งค่า .env และ config.json
- [ ] ทดสอบรัน npm run dev
- [ ] ตรวจสอบแอปทำงานได้ในเบราว์เซอร์
- [ ] Build production (npm run build)

---

## 🐛 แก้ไขปัญหา

### ปัญหา: npm install ล้มเหลว

```bash
# ลบ node_modules และลองใหม่
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### ปัญหา: Vite ไม่ทำงาน

```bash
# ตรวจสอบว่าติดตั้ง Vite แล้ว
npm list vite

# ถ้ายังไม่มี
npm install -D vite @vitejs/plugin-react --legacy-peer-deps
```

### ปัญหา: TypeScript errors

```bash
# ติดตั้ง types ที่ขาดหายไป
npm install -D @types/node @types/react @types/react-dom --legacy-peer-deps
```

### ปัญหา: ไฟล์ src/App.tsx ไม่มี

```bash
# ตรวจสอบว่า clone ครบหรือไม่
ls -la src/

# ถ้าไม่มี ให้ clone ใหม่
cd /c/Projects
rm -rf Ai-FBPostchecker888
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
```

---

## 📞 ติดต่อ & Support

- GitHub Issues: https://github.com/bowbozaa/Ai-FBPostchecker888/issues
- README: [README.md](README.md)

---

**Good luck! 🚀**
