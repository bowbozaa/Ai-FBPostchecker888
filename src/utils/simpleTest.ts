/**
 * ฟังก์ชันทดสอบการเชื่อมต่อแบบง่ายๆ
 */

export const simpleApiTest = async (webhookUrl: string) => {
  console.log('🧪 Simple API Test Started...')
  console.log('🔗 Testing URL:', webhookUrl)
  
  try {
    // Method 1: Simple GET
    console.log('📡 Method 1: GET Request')
    const getResponse = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('📊 GET Response:', getResponse.status, getResponse.statusText)
    
    // Method 2: POST with minimal data
    console.log('📡 Method 2: POST Request')
    const postResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test: true,
        message: 'Hello from FB Post Checker'
      })
    })
    console.log('📊 POST Response:', postResponse.status, postResponse.statusText)
    
    if (postResponse.ok) {
      const responseText = await postResponse.text()
      console.log('✅ POST Response Text:', responseText)
      return { success: true, method: 'POST', response: responseText }
    }
    
    if (getResponse.ok) {
      const responseText = await getResponse.text()
      console.log('✅ GET Response Text:', responseText)
      return { success: true, method: 'GET', response: responseText }
    }
    
    return { 
      success: false, 
      error: `GET: ${getResponse.status}, POST: ${postResponse.status}` 
    }
    
  } catch (error) {
    console.error('❌ Simple Test Error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ทดสอบ URL ที่เป็นไปได้
export const commonWebhookUrls = [
  'https://mossad.app.n8n.cloud/webhook-test/fb-post-checker',
  'https://mossad.app.n8n.cloud/webhook/fb-post-checker',
  'https://mossad.app.n8n.cloud/webhook-test/fbpostshield/input',
  'https://mossad.app.n8n.cloud/webhook/fbpostshield/input'
]
