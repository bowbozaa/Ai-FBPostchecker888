/**
 * Vercel Cron Job - Daily Report
 * รันทุกวันเวลา 09:00 น.
 */

export default async function handler(req, res) {
  // ตรวจสอบว่าเป็น Cron Request หรือไม่
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    console.log('🚀 Daily Report Cron Job เริ่มทำงาน...')

    // ข้อมูลรายงานจำลอง (ในการใช้งานจริงจะดึงจาก Database)
    const report = {
      date: new Date().toISOString().split('T')[0],
      totalPosts: Math.floor(Math.random() * 100) + 50,
      riskPosts: Math.floor(Math.random() * 20) + 5,
      safeRate: Math.round((Math.random() * 20 + 75) * 10) / 10,
      systemHealth: 'healthy'
    }

    report.safeRate = Math.round(((report.totalPosts - report.riskPosts) / report.totalPosts) * 100 * 10) / 10

    // ส่งรายงานไป n8n Webhook
    const webhookUrl = process.env.REACT_APP_WEBHOOK_URL || 'https://mossad.app.n8n.cloud/webhook/297f5471-0641-43d7-8b72-36f4e88eb5aa'
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'daily_report',
        report: report,
        timestamp: new Date().toISOString(),
        source: 'vercel_cron'
      })
    })

    console.log('📤 ส่งรายงานไป n8n:', webhookResponse.ok ? '✅' : '❌')

    // ส่ง LINE Notification
    if (process.env.REACT_APP_LINE_BOT_TOKEN) {
      const lineMessage = `📊 [FB Post Checker] รายงานประจำวัน
      
📅 วันที่: ${report.date}
📈 สถิติ:
  • โพสต์ทั้งหมด: ${report.totalPosts}
  • โพสต์เสี่ยง: ${report.riskPosts}  
  • อัตราปลอดภัย: ${report.safeRate}%

🟢 สถานะระบบ: ${report.systemHealth}

🤖 สร้างโดยระบบอัตโนมัติ Vercel Cron`

      const lineResponse = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_LINE_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: process.env.REACT_APP_LINE_USER_ID || 'Cabc1234567890xyz',
          messages: [{
            type: 'text',
            text: lineMessage
          }]
        })
      })

      console.log('📱 ส่ง LINE Notification:', lineResponse.ok ? '✅' : '❌')
    }

    return res.status(200).json({
      success: true,
      message: 'Daily report sent successfully',
      report: report,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Daily Report Cron Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    })
  }
}
