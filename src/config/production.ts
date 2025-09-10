/**
 * Production Configuration
 */
export const productionConfig = {
  n8n: {
    webhookUrl: 'https://mossad.app.n8n.cloud/webhook-test/fb-post-checker',
    workflowId: 'uAacnMD8G3VHfTDj',
    instanceUrl: 'https://mossad.app.n8n.cloud'
  },
  
  // API Keys (ย้ายไปใส่ใน Environment Variables)
  openai: {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || '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'
  },
  
  line: {
    botToken: process.env.REACT_APP_LINE_BOT_TOKEN || 'HY8UrlnzZZMRkR6orVWqR3OZUUwYLVVfWshRukJOhLDYlQOd0lumacva9cFJNMeLkhXyxDwmwCZ6gW/4oGQsISy5ecGIyBKhZobo5eBqfKs9fPiIGkYF80yrVQBHd0SyviZmVgjvB7/+DYLhlJKMEwdB04t89/1O/w1cDnyilFU=',
    userId: process.env.REACT_APP_LINE_USER_ID || 'Cabc1234567890xyz'
  },
  
  gmail: {
    email: process.env.REACT_APP_GMAIL_EMAIL || 'banknakorn39@gmail.com'
  },
  
  // Security
  cors: {
    allowedOrigins: [
      'https://your-app.vercel.app',
      'https://your-app.netlify.app'
    ]
  }
}
