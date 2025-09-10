sudo apt update
sudo apt install -y   wget   ca-certificates   fonts-liberation   libappindicator3-1   libasound2   libatk-bridge2.0-0   libatk1.0-0   libc6   libcairo2   libcups2   libdbus-1-3   libexpat1   libfontconfig1   libgbm1   libgcc1   libgdk-pixbuf2.0-0   libglib2.0-0   libgtk-3-0   libnspr4   libnss3   libpango-1.0-0   libx11-6   libx11-xcb1   libxcb1   libxcomposite1   libxcursor1   libxdamage1   libxext6   libxfixes3   libxi6   libxrandr2   libxrender1   libxss1   libxtst6   lsb-release   xdg-utils
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
npm install -g puppeteer
mkdir puppeteer-scraper && cd puppeteer-scraper
npm init -y
npm install puppeteer
nano puppeteer-scraper/run.js
nano puppeteer-scraper/scrape.js
cd puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
cd puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
nano run.js
cd puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
cd puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
cd puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
https://n8n.yourdomain.com/
/home/bankstartup2025/puppeteer-scraper
/home/bankstartup2025
cd ~/puppeteer-scraper
node run.js "https://www.facebook.com/100068383342209/posts/782842720875006"
nano puppeteer-scraper/run.js
nano run.js
ls
npm install puppeteer
node run.js "https://www.facebook.com/โพสต์จริง"
curl -X POST https://your-domain.com/webhook/fb-post-checker   -H "Content-Type: application/json"   -d '{
    "post_text": "สมัครสล็อตเว็บตรง รับเครดิตฟรีทันที 💸",
    "post_link": "https://facebook.com/post/123456",
    "image_url": "https://i.imgur.com/example.jpg",
    "video_url": "",
    "banned": true,
    "ban_reason": "ถูกแบนเพราะคำว่า สล็อตเว็บตรง"
  }'
firebase deploy --only hosting
firebase deploy --only hosting
git pull origin main
npm install -g n8n
:> agents_to_install.csv && echo '"projects/line-webhook-n8n-bigquery/zones/asia-southeast1-b/instances/n8n-prod","[{""type"":""ops-agent""}]"' >> agents_to_install.csv && curl -sSO https://dl.google.com/cloudagents/mass-provision-google-cloud-ops-agents.py && python3 mass-provision-google-cloud-ops-agents.py --file agents_to_install.csv# ตั้งค่าเป้าหมาย
VM=n8n-prod
ZONE=asia-southeast1-b
# 1) ปิด n8n ที่รันแบบ npx (ตัวที่จับพอร์ต 5678) บน VM
gcloud compute ssh "$VM" --zone "$ZONE" --command '
  sudo fuser -k 5678/tcp || true
  pkill -f "node.*n8n" || true
  ss -ltnp | grep 5678 || echo "port 5678 is free"
'
# 2) ให้ n8n (Docker) ทำงานต่อ และเช็คสถานะ
gcloud compute ssh "$VM" --zone "$ZONE" --command '
  cd ~/n8n && docker compose up -d
  docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
  sudo systemctl reload caddy || true
  ss -ltnp | grep -E ":80|:5678" || true
'
# ลบคีย์เดิม (ถ้ามี) แล้วสร้างใหม่แบบไม่ถามรหัสผ่าน
rm -f ~/.ssh/google_compute_engine ~/.ssh/google_compute_engine.pub
ssh-keygen -t rsa -b 2048 -f ~/.ssh/google_compute_engine -N "" -C "cloudshell"
gcloud compute ssh n8n-prod --zone asia-southeast1-b --command 'sudo fuser -k 5678/tcp || true; pkill -f "node.*n8n" || true; cd ~/n8n && docker compose up -d; docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"; sudo systemctl reload caddy; ss -ltnp | grep -E ":80|:5678" || true'
sudo systemctl status sshd      # RHEL/CentOS
sudo systemctl status ssh       # Debian/Ubuntu
ms-azuretools
ssh-keygen -t ed25519 -C "mossed@jarvis"
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your-vps-ip
{     "mcpServers": {;     "github": {;       "command": "npx",;       "args": [;         "-y",;         "@modelcontextprotocol/server-github";       ],;       "env": {;         "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_example_personal_access_token12345";       }
}
df52a1e4-8085-4cc1-80c1-6430bc5ce249
modprobe kvm
modprobe kvm_intel  # Intel processors
modprobe kvm_amd    # AMD processors
type $env:USERPROFILE\.ssh\id_rsa.pub
type $env:USERPROFILE\.ssh\id_rsa.pub
mkdir -p ~/.ssh && chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
ssh -i $env:USERPROFILE\.ssh\id_rsa ubuntu@<VPS_IP>
e05ccd88-7bbc-41a7-be1f-30cce6aee063
gcloud compute ssh YOUR_INSTANCE_NAME --zone=YOUR_ZONE
echo "Starting SSH connection..."
gcloud compute ssh jarvis-vps --zone=us-west1-b	
echo "SSH command executed."
gcloud projects list
gcloud config set project rock-data-461505-s4
ps aux | grep -E 'apt|dpkg' | grep -v grep
sudo lsof /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock
sudo kill -TERM 451381
# ถ้าไม่ยอมตาย รอสักครู่แล้วค่อยบังคับ
sudo kill -9 451381
sudo rm -f /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock
sudo dpkg --configure -a
sudo apt-get -f install
sudo apt update
sudo systemctl stop apt-daily.service
sudo systemctl stop apt-daily.timer
sudo systemctl stop apt-daily-upgrade.service
sudo systemctl stop apt-daily-upgrade.timer
sudo systemctl stop unattended-upgrades
ps aux | grep -E 'apt|dpkg'
sudo apt -y upgrade
# หรือคำสั่งติดตั้งที่ค้างไว้ก่อนหน้า
npx n8n
df -h
find ~ -name "node_modules" -type d -exec du -sh {} \; 2>/dev/null
find ~ -name "node_modules" -type d -exec rm -rf {} \; 2>/dev/null
npm cache clean --force
rm -rf ~/.npm/logs/*
rm -rf ~/.npm/_cacache
sudo rm -rf /tmp/*
rm -rf ~/tmp/*
du -h ~ | sort -hr | head -20
# 1. ตรวจสอบพื้นที่
df -h
# 2. หาและลบ node_modules
find ~ -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null
# 3. ลบ npm cache
npm cache clean --force
# 4. ลบ logs และ temp files
rm -rf ~/.npm/logs/*
rm -rf ~/.npm/_cacache
rm -rf /tmp/*
# 5. ตรวจสอบอีกครั้ง
df -h
echo "cache-max=100000000" >> ~/.npmrc  # จำกัด cache 100MB
echo "prefer-offline=true" >> ~/.npmrc
npm install --production --no-optional
npm ci --production
npm uninstall package-name
rm -rf node_modules
# ใน Cloud Shell terminal
cloudshell env remove-persistent-disk
steps:
df -h
npm install --production --no-optional --no-audit --no-fund
# ติดตั้งเฉพาะที่จำเป็น
npm install n8n --no-optional --no-audit
# 1. ลบ node_modules และ package files
rm -rf node_modules
rm -f package.json package-lock.json
# 2. ลบ npm cache และ logs
npm cache clean --force
rm -rf ~/.npm
# 3. ลบ n8n data และ config
rm -rf ~/.n8n
# 4. ลบไฟล์ temp ทั้งหมด
rm -rf /tmp/*
sudo apt autoclean
# 5. ตรวจสอบพื้นที่
df -h
gemini; exit
lsof -i :8000
netstat -tulnp | grep 8000
