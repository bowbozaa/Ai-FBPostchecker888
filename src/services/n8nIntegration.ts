/**
 * n8n Integration Service
 * เชื่อมต่อระหว่าง React App กับ n8n Workflow
 */

export interface N8nWorkflowConfig {
  workflowId: string
  webhookUrl: string
  apiKey: string
  instanceUrl: string
}

/**
 * คลาสสำหรับจัดการการเชื่อมต่อกับ n8n
 */
export class N8nIntegration {
  private config: N8nWorkflowConfig

  constructor(config: N8nWorkflowConfig) {
    this.config = config
  }

  /**
   * ส่งข้อมูลไปยัง n8n Webhook สำหรับ Gray Hat Analysis
   */
  async sendGrayHatAnalysis(data: any): Promise<any> {
    try {
      console.log('🎯 ส่งข้อมูลสายเทาไป n8n:', this.config.webhookUrl)
      
      const grayHatPayload = {
        ...data,
        analysis_type: 'gray_hat_strategy',
        prompt_type: 'strategic_advisor',
        expert_mode: true,
        timestamp: new Date().toISOString(),
        source: 'gray-hat-analyzer'
      }

      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.apiKey
        },
        body: JSON.stringify(grayHatPayload)
      })

      if (!response.ok) {
        throw new Error(`n8n Error: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ n8n Gray Hat Analysis ตอบกลับ:', result)
      
      return result
    } catch (error) {
      console.error('❌ n8n Gray Hat Analysis Error:', error)
      throw error
    }
  }

  /**
   * ส่งข้อมูลไปยัง n8n Webhook
   */
  async sendToWorkflow(data: any): Promise<any> {
    try {
      console.log('🚀 ส่งข้อมูลไป n8n:', this.config.webhookUrl)
      
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.apiKey
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'react-app'
        })
      })

      if (!response.ok) {
        throw new Error(`n8n Error: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ n8n ตอบกลับ:', result)
      
      return result
    } catch (error) {
      console.error('❌ n8n Connection Error:', error)
      throw error
    }
  }

  /**
   * เรียก Workflow โดยตรง (ถ้ามี API Key)
   */
  async executeWorkflow(data: any): Promise<any> {
    try {
      const executeUrl = `${this.config.instanceUrl}/api/v1/workflows/${this.config.workflowId}/execute`
      
      const response = await fetch(executeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': this.config.apiKey
        },
        body: JSON.stringify({ data })
      })

      if (!response.ok) {
        throw new Error(`n8n API Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('❌ n8n Workflow Execution Error:', error)
      throw error
    }
  }

  /**
   * ดึงสถานะ Workflow
   */
  async getWorkflowStatus(): Promise<any> {
    try {
      const statusUrl = `${this.config.instanceUrl}/api/v1/workflows/${this.config.workflowId}`
      
      const response = await fetch(statusUrl, {
        headers: {
          'X-N8N-API-KEY': this.config.apiKey
        }
      })

      if (!response.ok) {
        throw new Error(`n8n Status Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('❌ n8n Status Check Error:', error)
      return null
    }
  }
}

/**
 * การตั้งค่าเริ่มต้น (จากไฟล์ JSON ที่ Upload)
 */
export const defaultN8nConfig: N8nWorkflowConfig = {
  workflowId: 'uAacnMD8G3VHfTDj', // จาก FBPostchecker888.json
  webhookUrl: 'https://mossad.app.n8n.cloud/webhook-test/fbpostshield/input',
  apiKey: 'Bearer YOUR_API_KEY_HERE', 
  instanceUrl: 'https://mossad.app.n8n.cloud'
}

// สร้าง Instance เดียวสำหรับทั้งแอป
export const n8nService = new N8nIntegration(defaultN8nConfig)
