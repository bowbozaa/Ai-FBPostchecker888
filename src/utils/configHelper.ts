/**
 * Helper สำหรับจัดการ Configuration
 */
import { appConfig } from './env'

export interface SystemConfig {
  n8n: {
    webhookUrl: string
    workflowId: string
    instanceUrl: string
  }
  openai: {
    apiKey: string
  }
  line: {
    botToken: string
    userId: string
  }
  gmail: {
    email: string
  }
}

/**
 * ข้อมูล Configuration จาก n8n และ config files
 */
export const systemConfig: SystemConfig = {
  n8n: {
    webhookUrl: appConfig.webhookUrl,
    workflowId: 'uAacnMD8G3VHfTDj',
    instanceUrl: 'https://mossad.app.n8n.cloud'
  },
  openai: {
    apiKey: appConfig.openaiApiKey
  },
  line: {
    botToken: appConfig.lineBotToken,
    userId: appConfig.lineUserId
  },
  gmail: {
    email: appConfig.gmailEmail
  }
}

/**
 * ฟังก์ชันสำหรับทดสอบการเชื่อมต่อ
 */
export const testConnections = async () => {
  const results = {
    n8n: false,
    openai: false,
    line: false
  }

  try {
    // ทดสอบ n8n Webhook
    console.log('🔄 ทดสอบ n8n Webhook...')
    const n8nResponse = await fetch(systemConfig.n8n.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test: true,
        post_content: 'ทดสอบการเชื่อมต่อ'
      })
    })
    results.n8n = n8nResponse.ok
    console.log(`✅ n8n: ${results.n8n ? 'เชื่อมต่อได้' : 'เชื่อมต่อไม่ได้'}`)

  } catch (error) {
    console.error('❌ n8n Connection Error:', error)
  }

  return results
}

/**
 * ส่งข้อมูลไป n8n แบบง่าย
 */
export const sendToN8n = async (postContent: string) => {
  try {
    console.log('🚀 ส่งโพสต์ไป n8n:', postContent)
    
    const response = await fetch(systemConfig.n8n.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_content: postContent,
        timestamp: new Date().toISOString(),
        source: 'react-app'
      })
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ n8n ตอบกลับ:', result)
      return result
    } else {
      console.error('❌ n8n Error:', response.status)
      return null
    }
  } catch (error) {
    console.error('❌ Send to n8n Error:', error)
    return null
  }
}
