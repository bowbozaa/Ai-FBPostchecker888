/**
 * ตัวอย่างการใช้งาน n8n Integration
 */

import { n8nService } from '../services/n8nIntegration'

// ตัวอย่าง 1: ส่งโพสต์ไปวิเคราะห์
export const analyzePostWithN8n = async (postContent: string) => {
  try {
    const result = await n8nService.sendToWorkflow({
      post_content: postContent,
      user_id: 'react-user',
      source: 'fb-post-checker-app'
    })
    
    console.log('📊 ผลการวิเคราะห์:', result)
    return result
  } catch (error) {
    console.error('❌ Error:', error)
    return null
  }
}

// ตัวอย่าง 2: ตรวจสอบสถานะ Workflow
export const checkN8nStatus = async () => {
  try {
    const status = await n8nService.getWorkflowStatus()
    console.log('📈 n8n Workflow Status:', status)
    return status
  } catch (error) {
    console.error('❌ Status Check Failed:', error)
    return null
  }
}

// ตัวอย่าง 3: ส่งข้อมูลแบบ Batch
export const sendBatchPosts = async (posts: string[]) => {
  const results = []
  
  for (const post of posts) {
    try {
      const result = await n8nService.sendToWorkflow({
        post_content: post,
        batch: true
      })
      results.push(result)
    } catch (error) {
      console.error(`❌ Error processing post: ${post}`, error)
      results.push({ error: error.message, post })
    }
  }
  
  return results
}
