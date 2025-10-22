# 🌩️ Google Cloud Shell Development Guide

คู่มือการพัฒนาโปรเจค AI Facebook Post Checker 888 บน Google Cloud Shell

## 📋 สารบัญ

1. [เริ่มต้นใช้งาน](#เริ่มต้นใช้งาน)
2. [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
3. [การแก้ปัญหา](#การแก้ปัญหา)
4. [ข้อควรรู้](#ข้อควรรู้)

---

## 🚀 เริ่มต้นใช้งาน

### วิธีที่ 1: ใช้ Setup Script (แนะนำ)

1. เปิด [Google Cloud Shell](https://shell.cloud.google.com/)

2. Clone repository:
```bash
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
cd Ai-FBPostchecker888
```

3. รัน setup script:
```bash
chmod +x setup-cloudshell.sh
./setup-cloudshell.sh
```

4. เริ่มต้น dev server:
```bash
npm run dev
```

5. คลิก **"Web Preview"** (มุมขวาบน) → **"Preview on port 8080"**

---

### วิธีที่ 2: Setup Manual

```bash
# 1. Clone repository
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
cd Ai-FBPostchecker888

# 2. ติดตั้ง dependencies
npm install

# 3. แก้ไข vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
})
EOF

# 4. สร้าง .env (ถ้าต้องการ)
cp .env.example .env
nano .env

# 5. รัน dev server
npm run dev
```

---

## 🔧 คำสั่งที่ใช้บ่อย

### การพัฒนา (Development)

```bash
# เริ่มต้น dev server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview

# ติดตั้ง package ใหม่
npm install <package-name>
```

### Git Operations

```bash
# ดูสถานะ
git status

# Pull code ล่าสุด
git pull origin master

# Commit และ Push
git add .
git commit -m "Your message"
git push origin master

# สร้าง branch ใหม่
git checkout -b feature/new-feature

# Merge branch
git checkout master
git merge feature/new-feature
```

### การตรวจสอบระบบ

```bash
# ดู environment variables
env | grep PORT

# ตรวจสอบ port ที่เปิดอยู่
netstat -tuln | grep 8080

# ดู process ที่ทำงานอยู่
ps aux | grep node

# ดูการใช้ memory
free -h

# ดู disk space
df -h
```

### แก้ไขไฟล์

```bash
# แก้ไขด้วย nano (simple)
nano .env

# แก้ไขด้วย vi (advanced)
vi vite.config.ts

# ดูเนื้อหาไฟล์
cat package.json

# ค้นหาในไฟล์
grep "PORT" .env
```

---

## 🐛 การแก้ปัญหา

### ปัญหา: Port 8080 ถูกใช้งานแล้ว

```bash
# หา process ที่ใช้ port 8080
lsof -i :8080

# Kill process
kill -9 <PID>

# หรือเปลี่ยน port ใน vite.config.ts
```

### ปัญหา: Web Preview ไม่แสดงผล

1. ตรวจสอบว่า dev server ทำงานอยู่:
```bash
curl http://localhost:8080
```

2. ตรวจสอบ Vite config:
```bash
cat vite.config.ts
```

3. ตรวจสอบว่าใช้ host `0.0.0.0`:
```typescript
server: {
  host: '0.0.0.0',  // ต้องมี!
  port: 8080,
}
```

### ปัญหา: Session Timeout

Cloud Shell timeout หลัง 20 นาที ถ้าไม่ได้ใช้งาน:

```bash
# วิธีแก้: ใช้ tmux เพื่อรัน background session
tmux new -s dev
npm run dev

# Detach: กด Ctrl+B แล้ว D
# Attach กลับ:
tmux attach -t dev
```

### ปัญหา: npm install ช้า

```bash
# ใช้ pnpm แทน (เร็วกว่า)
npm install -g pnpm
pnpm install
```

### ปัญหา: File permissions

```bash
# ถ้า setup script ไม่ run ได้
chmod +x setup-cloudshell.sh

# ถ้ามีปัญหา write permission
sudo chown -R $USER:$USER .
```

---

## 📚 ข้อควรรู้

### ข้อจำกัดของ Cloud Shell

| Feature | Limit | Note |
|---------|-------|------|
| **Session Timeout** | 20 นาที (ไม่ active) | ใช้ tmux แก้ปัญหา |
| **Daily Quota** | 50 ชั่วโมง/สัปดาห์ | รีเซ็ตทุกอาทิตย์ |
| **Home Directory** | 5GB persistent | ข้อมูลไม่หาย |
| **RAM** | 8GB | พอสำหรับ dev |
| **CPU** | Shared | อาจช้าในบางช่วงเวลา |

### ไฟล์และโฟลเดอร์ที่เก็บไว้

✅ **Persistent** (ไม่หาย):
- `~/` (Home directory)
- ไฟล์ที่ commit ใน git

❌ **Ephemeral** (หายเมื่อ session จบ):
- `/tmp`
- `node_modules` (ถ้าไม่อยู่ใน home)

### Best Practices

1. **ใช้ Git อยู่เสมอ**
   ```bash
   git add .
   git commit -m "Save progress"
   git push
   ```

2. **ใช้ .env สำหรับ secrets**
   ```bash
   # เพิ่มใน .gitignore
   echo ".env" >> .gitignore
   ```

3. **ใช้ tmux สำหรับ long-running tasks**
   ```bash
   tmux new -s mywork
   # Your work here
   # Ctrl+B D to detach
   ```

4. **Backup ข้อมูลสำคัญ**
   ```bash
   # Export environment
   env > my-env-backup.txt

   # Backup database
   pg_dump mydb > backup.sql
   ```

---

## 🔗 ลิงก์ที่เป็นประโยชน์

- [Google Cloud Shell Docs](https://cloud.google.com/shell/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [GitHub Repository](https://github.com/bowbozaa/Ai-FBPostchecker888)

---

## 🆘 ต้องการความช่วยเหลือ?

- **Issues**: https://github.com/bowbozaa/Ai-FBPostchecker888/issues
- **Discord**: (ถ้ามี)
- **Email**: (ถ้ามี)

---

**สร้างโดย Claude Code** 🤖

Last updated: 2025-10-22
