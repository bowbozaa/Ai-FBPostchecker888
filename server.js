process.on('uncaughtException', e => { console.error('UNCaught', e); process.exit(1); });
process.on('unhandledRejection', e => { console.error('UNhandled', e); process.exit(1); });

const express = require('express');
require('dotenv/config');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

// In CommonJS, __dirname is available by default.

const app = express();
const port = 3000; // Use port 3000 to match Cloud Shell preview

// Set Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    "script-src": ["'self'", "'unsafe-eval'"], // Allow 'unsafe-eval'
    "connect-src": ["'self'", "https://*.clerk.accounts.dev", "*"],
    "img-src": ["'self'", "data:", "https://img.clerk.com"],
  },
}));

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// --- Static File Serving ---
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// --- API Routes ---

// TODO: Install the actual DB library, e.g., `pnpm add pg` or `pnpm add mysql2`
// const { connect } = require('some-db-library'); 

app.get('/api/connect-db', async (req, res) => {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("FATAL: DATABASE_URL environment variable is not set.");
    return res.status(500).json({ error: "Server is not configured correctly." });
  }

  try {
    // const connection = await connect(dbUrl); // This would be the real connection
    console.log("Attempting to connect to DB...");
    // For now, we'll just simulate a successful connection
    res.status(200).json({ message: "Connected (Simulated)" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Failed to connect to the database." });
  }
});

// API endpoint for Gray Hat analysis
app.post('/api/analyze', (req, res) => {
  try {
    const { post_content } = req.body;
    console.log('Received content for analysis:', post_content);

    // For now, return a hardcoded sample response
    // This mimics the structure of GrayHatResult from the frontend
    const sampleAnalysis = {
      strategy_level: 'intermediate',
      gray_techniques: [
        'ใช้คำพ้องความหมาย',
        'แบ่งข้อความเป็นหลายโพสต์',
        'ใช้อีโมจิแทนคำเสี่ยง',
        'เขียนแบบนัยยะ'
      ],
      risk_assessment: 3,
      recommendations: [
        '🎯 ใช้คำ "โอกาส" แทน "เดิมพัน"',
        '🎯 เพิ่มเนื้อหาการศึกษา',
        '🎯 ใช้ Story แทน Post หลัก',
        '🎯 สร้าง Community ก่อน'
      ],
      timing_strategy: 'โพสต์ช่วง 20:00-22:00 น.',
      engagement_tips: [
        'สร้าง engagement ด้วยเนื้อหาทั่วไป',
        'ใช้กลุ่มเป้าหมายเฉพาะ',
        'เตรียม backup content',
        'ติดตาม Algorithm เปลี่ยนแปลง'
      ],
      stealth_score: 7.5
    };

    res.json(sampleAnalysis);
  } catch (e) {
    console.error("API Error in /api/analyze:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const NGROK_URL = "https://unavengingly-raspy-chantelle.ngrok-free.dev"; 
const REDIRECT_URI = `${NGROK_URL}/auth/facebook/callback`;

app.get('/auth/facebook', (req, res) => {
  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const scope = [
      'public_profile',
      'email',
      'pages_show_list', 
      'pages_read_engagement',
      'pages_manage_posts'
    ].join(',');

    const facebookLoginUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=code`;
    
    console.log(`Redirecting to Facebook for authentication: ${facebookLoginUrl}`);
    res.redirect(facebookLoginUrl);
  } catch (e) {
    console.error("API Error in /auth/facebook:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    console.error('API Server: No code received from Facebook.');
    return res.redirect('/?error=facebook_login_failed');
  }

  console.log('API Server: Received code. Exchanging for access token...');

  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;

    const tokenResponse = await axios.get('https://graph.facebook.com/v20.0/oauth/access_token', {
      params: {
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: REDIRECT_URI,
        code,
      }
    });

    const accessToken = tokenResponse.data.access_token;
    console.log('API Server: Successfully received access token.');

    // Redirect back to the main frontend URL
    res.redirect('/?facebook_login=success');

  } catch (error) {
    console.error('API Server Error:', error.response ? error.response.data.error : error.message);
    res.redirect('/?error=token_exchange_failed');
  }
});

// --- SPA Catch-all ---
// For any other request, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server (API + Static) listening at http://localhost:${port}`);
});
