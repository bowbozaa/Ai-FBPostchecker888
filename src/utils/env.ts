/**
 * Environment variables helper สำหรับ browser compatibility
 */

/**
 * ดึงค่า environment variable แบบปลอดภัย
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    // ตรวจสอบ process object ก่อน
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || defaultValue
    }
    
    // Fallback สำหรับ browser environment
    if (typeof window !== 'undefined' && (window as any).ENV) {
      return (window as any).ENV[key] || defaultValue
    }
    
    return defaultValue
  } catch (error) {
    console.warn(`⚠️ Cannot access environment variable ${key}:`, error)
    return defaultValue
  }
}

/**
 * ตรวจสอบว่าอยู่ใน development mode หรือไม่
 */
export const isDevelopment = (): boolean => {
  try {
    return getEnvVar('NODE_ENV') === 'development'
  } catch (error) {
    return false
  }
}

/**
 * ตรวจสอบว่าอยู่ใน production mode หรือไม่
 */
export const isProduction = (): boolean => {
  try {
    return getEnvVar('NODE_ENV') === 'production'
  } catch (error) {
    return true // Default to production for safety
  }
}

/**
 * Configuration object สำหรับ app
 */
export const appConfig = {
  // API Configuration
  webhookUrl: getEnvVar('REACT_APP_WEBHOOK_URL', 'https://mossad.app.n8n.cloud/webhook/297f5471-0641-43d7-8b72-36f4e88eb5aa'),
  apiKey: getEnvVar('REACT_APP_API_KEY', ''),
  apiTimeout: parseInt(getEnvVar('REACT_APP_API_TIMEOUT', '31000')),
  
  // OpenAI Configuration
  openaiApiKey: getEnvVar('REACT_APP_OPENAI_API_KEY', ''),
  
  // LINE Bot Configuration
  lineBotToken: getEnvVar('REACT_APP_LINE_BOT_TOKEN', ''),
  lineUserId: getEnvVar('REACT_APP_LINE_USER_ID', 'Cabc1234567890xyz'),
  
  // Gmail Configuration
  gmailEmail: getEnvVar('REACT_APP_GMAIL_EMAIL', 'banknakorn39@gmail.com'),
  
  // App Configuration
  isDevelopment: isDevelopment(),
  isProduction: isProduction()
}

/**
 * แสดงข้อมูล config ใน console (สำหรับ debugging)
 */
export const logConfig = () => {
  if (!isProduction()) {
    console.log('🔧 App Configuration:', {
      webhookUrl: appConfig.webhookUrl,
      hasApiKey: !!appConfig.apiKey,
      apiTimeout: appConfig.apiTimeout,
      isDevelopment: appConfig.isDevelopment,
      isProduction: appConfig.isProduction
    })
  }
}
