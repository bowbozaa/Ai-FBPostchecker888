/**
 * Global Settings Service - จัดการการตั้งค่าส่วนกลางที่ใช้ร่วมกันทุก User
 * Admin เท่านั้นที่แก้ไขได้
 */

export interface GlobalConfig {
  // System Settings
  systemConfig: {
    appName: string
    version: string
    adminEmails: string[]
    maintenanceMode: boolean
  }
  
  // API Configuration  
  apiSettings: {
    openaiKey: string
    lineToken: string
    webhookUrl: string
    timeout: number
    retries: number
    /**
     * n8n Authorization header (เช่น "Bearer xxxxxx")
     * ใช้แนบกับ Webhook ของ n8n ที่ตั้งค่า Header Auth ไว้
     */
    n8nApiKey?: string
  }

  // Automation Settings
  dailyAutomation: {
    enabled: boolean
    reportTime: string
    lineNotification: boolean
    healthCheck: boolean
    dataCleanup: boolean
    webhookUrl: string
    lineToken: string
  }

  // Keywords & Analysis
  keywords: string[]
  
  // Notification Settings
  notifications: {
    email: boolean
    line: boolean
    webhook: boolean
    sound: boolean
  }

  // Analysis Configuration
  analysis: {
    sensitivity: 'low' | 'medium' | 'high'
    autoProcess: boolean
    maxRiskLevel: number
    language: 'th' | 'en' | 'both'
  }

  // Last Updated Info
  lastUpdated: string
  updatedBy: string
}

/**
 * Global Settings Manager Class
 */
class GlobalSettingsManager {
  private readonly STORAGE_KEY = 'fb-checker-global-settings'
  private readonly ADMIN_ROLES = ['Administrator', 'Admin']
  
  private defaultConfig: GlobalConfig = {
    systemConfig: {
      appName: 'FB Post Checker',
      version: '2.0.0',
      adminEmails: ['admin@fbchecker.com'],
      maintenanceMode: false
    },
    apiSettings: {
      openaiKey: 'sk-...',
      lineToken: 'HY8Url...',
      webhookUrl: 'https://mossad.app.n8n.cloud/webhook-test/fb-post-checker',
      timeout: 30,
      retries: 3,
      n8nApiKey: '' // ค่าเริ่มต้นค่าว่าง
    },
    dailyAutomation: {
      enabled: false,
      reportTime: '09:00',
      lineNotification: true,
      healthCheck: true,
      dataCleanup: true,
      webhookUrl: 'https://mossad.app.n8n.cloud/webhook-test/fb-post-checker',
      lineToken: ''
    },
    keywords: [
      'แทงบอล', 'เครดิตฟรี', 'คาสิโน', 'บาคาร่า', 'สล็อต',
      'เดิมพัน', 'ได้เงินง่าย', 'รวยเร็ว', 'ลงทุนน้อย', 'หุ้นปลอม'
    ],
    notifications: {
      email: true,
      line: true,
      webhook: false,
      sound: true
    },
    analysis: {
      sensitivity: 'medium',
      autoProcess: true,
      maxRiskLevel: 3,
      language: 'th'
    },
    lastUpdated: new Date().toISOString(),
    updatedBy: 'system'
  }

  /**
   * โหลดการตั้งค่าส่วนกลาง
   */
  getGlobalConfig(): GlobalConfig {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge กับ default เพื่อให้แน่ใจว่ามีครบทุก field
        // รวมทั้งเติมค่า n8nApiKey ให้มี field เสมอ
        const merged: GlobalConfig = { ...this.defaultConfig, ...parsed }
        merged.apiSettings = { ...this.defaultConfig.apiSettings, ...parsed.apiSettings }
        if (typeof merged.apiSettings.n8nApiKey === 'undefined') {
          merged.apiSettings.n8nApiKey = ''
        }
        return merged
      }
    } catch (error) {
      console.warn('Error loading global settings:', error)
    }
    
    return this.defaultConfig
  }

  /**
   * บันทึกการตั้งค่าส่วนกลาง (เฉพาะ Admin)
   */
  updateGlobalConfig(
    updates: Partial<GlobalConfig>, 
    currentUser: { role: string; username: string }
  ): boolean {
    // ตรวจสอบสิทธิ์
    if (!this.ADMIN_ROLES.includes(currentUser.role)) {
      throw new Error('ไม่มีสิทธิ์แก้ไขการตั้งค่าส่วนกลาง - ต้องเป็น Admin ขึ้นไป')
    }

    try {
      const currentConfig = this.getGlobalConfig()
      const newConfig: GlobalConfig = {
        ...currentConfig,
        ...updates,
        lastUpdated: new Date().toISOString(),
        updatedBy: currentUser.username
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newConfig))
      
      // Log การเปลี่ยนแปลง
      console.log(`🔧 Global Settings updated by ${currentUser.username}:`, Object.keys(updates))
      
      return true
    } catch (error) {
      console.error('Error saving global settings:', error)
      return false
    }
  }

  /**
   * รีเซ็ตการตั้งค่าเป็นค่าเริ่มต้น (เฉพาะ Administrator)
   */
  resetToDefault(currentUser: { role: string; username: string }): boolean {
    if (currentUser.role !== 'Administrator') {
      throw new Error('ไม่มีสิทธิ์ Reset การตั้งค่า - ต้องเป็น Administrator เท่านั้น')
    }

    const resetConfig = {
      ...this.defaultConfig,
      lastUpdated: new Date().toISOString(),
      updatedBy: currentUser.username
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resetConfig))
    console.log(`🔄 Global Settings reset by ${currentUser.username}`)
    
    return true
  }

  /**
   * ตรวจสอบสิทธิ์ในการแก้ไขการตั้งค่า
   */
  canEditSettings(userRole: string): boolean {
    return this.ADMIN_ROLES.includes(userRole)
  }

  /**
   * ได้รับข้อมูลการอัพเดทล่าสุด
   */
  getLastUpdateInfo(): { lastUpdated: string; updatedBy: string } {
    const config = this.getGlobalConfig()
    return {
      lastUpdated: config.lastUpdated,
      updatedBy: config.updatedBy
    }
  }

  /**
   * Export การตั้งค่าเป็น JSON
   */
  exportSettings(): string {
    const config = this.getGlobalConfig()
    return JSON.stringify(config, null, 2)
  }

  /**
   * Import การตั้งค่าจาก JSON (เฉพาะ Administrator)
   */
  importSettings(
    jsonString: string, 
    currentUser: { role: string; username: string }
  ): boolean {
    if (currentUser.role !== 'Administrator') {
      throw new Error('ไม่มีสิทธิ์ Import การตั้งค่า - ต้องเป็น Administrator เท่านั้น')
    }

    try {
      const importedConfig = JSON.parse(jsonString)
      
      // Validate basic structure
      if (!importedConfig.systemConfig || !importedConfig.apiSettings) {
        throw new Error('รูปแบบไฟล์การตั้งค่าไม่ถูกต้อง')
      }

      const newConfig: GlobalConfig = {
        ...importedConfig,
        lastUpdated: new Date().toISOString(),
        updatedBy: `${currentUser.username} (imported)`
      }

      // ให้แน่ใจว่ามี field n8nApiKey
      newConfig.apiSettings = {
        ...this.defaultConfig.apiSettings,
        ...newConfig.apiSettings,
        n8nApiKey: newConfig.apiSettings.n8nApiKey ?? ''
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newConfig))
      console.log(`📥 Settings imported by ${currentUser.username}`)
      
      return true
    } catch (error) {
      console.error('Import error:', error)
      throw new Error(`การ Import ล้มเหลว: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}

// Export singleton instance
export const globalSettings = new GlobalSettingsManager()

// Backward compatibility functions
export const getGlobalConfig = () => globalSettings.getGlobalConfig()
export const updateGlobalConfig = (updates: Partial<GlobalConfig>, user: { role: string; username: string }) => 
  globalSettings.updateGlobalConfig(updates, user)
