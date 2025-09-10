/**
 * N8nBuilder Page - สร้าง/ส่งออก n8n Workflow JSON และสร้าง Workflow บน n8n ผ่าน API
 * ปรับหัวข้อเป็นมาตรฐาน PageHeader
 */

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, Globe, Download, UploadCloud, Sparkles, Code, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'

/**
 * Interface สำหรับค่าตั้งต้นของการสร้าง Workflow
 */
interface BuilderConfig {
  workflowName: string
  webhookPath: string
  webhookMethod: 'POST' | 'GET'
  lineToken: string
  lineUserId: string
  riskThreshold: number
  instanceUrl: string
  apiKey: string
}

/**
 * สร้างโครง JSON ของ n8n Workflow ตามค่า config ที่ระบุ
 */
function buildN8nWorkflowJson(config: BuilderConfig) {
  const nodes = [
    {
      parameters: {
        httpMethod: config.webhookMethod.toLowerCase(),
        path: config.webhookPath,
        responseMode: 'onReceived',
        options: {
          responseCode: 200,
        },
      },
      id: 'Webhook_1',
      name: 'Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 1,
      position: [260, 260],
    },
    {
      parameters: {
        functionCode:
`// วิเคราะห์ความเสี่ยงแบบพื้นฐานจากคำต้องห้าม
// Input: items[0].json.post_content
// Output: { risk_level, keywords, status, category, checked_time }
const forbidden = [
  { word: 'แทงบอล', risk: 5, category: 'การพนัน' },
  { word: 'เครดิตฟรี', risk: 4, category: 'การพนัน' },
  { word: 'คาสิโน', risk: 5, category: 'การพนัน' },
  { word: 'บาคาร่า', risk: 5, category: 'การพนัน' },
  { word: 'สล็อต', risk: 4, category: 'การพนัน' },
  { word: 'เดิมพัน', risk: 4, category: 'การพนัน' },
  { word: 'รวยเร็ว', risk: 3, category: 'สุ่มเสี่ยง' },
  { word: 'ได้เงินง่าย', risk: 3, category: 'สุ่มเสี่ยง' },
  { word: 'โบนัส', risk: 2, category: 'โปรโมชั่น' },
  { word: 'ลงทุน', risk: 2, category: 'การเงิน' },
]

const content = (items[0].json.post_content || items[0].json.text || '').toString().toLowerCase()
const found = forbidden.filter(f => content.includes(f.word))
let risk = 1
let status = 'safe'
let category = 'ปกติ'
if (found.length) {
  risk = Math.max(...found.map(f => f.risk))
  if (risk >= 4) status = 'danger'
  else if (risk >= 3) status = 'warning'
  category = found[0].category
}

return [{
  json: {
    risk_level: risk,
    keywords: found.map(f => f.word),
    category,
    status,
    checked_time: new Date().toISOString(),
    method: 'n8n',
    original: items[0].json,
    threshold: ${config.riskThreshold}
  }
}]`
      },
      id: 'Function_1',
      name: 'Analyze Post',
      type: 'n8n-nodes-base.function',
      typeVersion: 2,
      position: [560, 260],
    },
    {
      parameters: {
        options: {},
        requestMethod: 'POST',
        url: 'https://api.line.me/v2/bot/message/push',
        jsonParameters: true,
        sendBody: true,
        headerParametersJson: `[{ "name": "Authorization", "value": "Bearer ${config.lineToken || '{{ $env.LINE_TOKEN }}'}" }, { "name": "Content-Type", "value": "application/json" }]`,
        bodyParametersJson:
`{
  "to": "${config.lineUserId || 'Cabc1234567890xyz'}",
  "messages": [
    {
      "type": "text",
      "text": "FB Checker Alert: risk_level {{$json.risk_level}} | status {{$json.status}} | keywords {{$json.keywords.join(', ')}}"
    }
  ]
}`
      },
      id: 'HTTPRequest_1',
      name: 'Notify LINE (optional)',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4,
      position: [560, 440],
      notesInFlow: true,
      notes: 'เชื่อม node นี้หลัง Analyze Post ตามเงื่อนไขที่ต้องการ หรือเปิดใช้ภายหลัง',
    },
    {
      parameters: {
        responseBody: '={{$json}}',
        responseCode: 200,
      },
      id: 'Respond_1',
      name: 'Respond to Webhook',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1,
      position: [860, 260],
    },
  ]

  const connections = {
    'Webhook_1': {
      main: [
        [
          { node: 'Analyze Post', type: 'main', index: 0 }
        ],
      ],
    },
    'Analyze Post': {
      main: [
        [
          { node: 'Respond to Webhook', type: 'main', index: 0 }
        ],
      ],
    },
  }

  return {
    name: config.workflowName || 'FB Post Checker (Generated)',
    nodes,
    connections,
    active: false,
    settings: {},
    staticData: null,
    meta: { templateCredsSetup: [] },
  }
}

/**
 * ดาวน์โหลดไฟล์ JSON
 */
function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * เรียก n8n API เพื่อสร้าง workflow (ถ้าเปิด CORS)
 */
async function createWorkflowOnN8n(instanceUrl: string, apiKey: string, workflowJson: any) {
  const endpoint = `${instanceUrl.replace(/\/*$/, '')}/api/v1/workflows`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-N8N-API-KEY': apiKey,
    },
    body: JSON.stringify(workflowJson),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${res.statusText} ${text ? '- ' + text : ''}`)
  }
  return res.json()
}

/**
 * N8nBuilder Component - UI หลัก
 */
export default function N8nBuilder() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [config, setConfig] = useState<BuilderConfig>(() => {
    try {
      const saved = localStorage.getItem('n8n-builder-config')
      return saved
        ? JSON.parse(saved)
        : {
            workflowName: 'FB Post Checker (Generated)',
            webhookPath: 'fbpostshield/input',
            webhookMethod: 'POST',
            lineToken: '',
            lineUserId: 'Cabc1234567890xyz',
            riskThreshold: 3,
            instanceUrl: 'https://myn8n.yourdomain.com',
            apiKey: '',
          }
    } catch {
      return {
        workflowName: 'FB Post Checker (Generated)',
        webhookPath: 'fbpostshield/input',
        webhookMethod: 'POST',
        lineToken: '',
        lineUserId: 'Cabc1234567890xyz',
        riskThreshold: 3,
        instanceUrl: 'https://myn8n.yourdomain.com',
        apiKey: '',
      }
    }
  })
  const [jsonText, setJsonText] = useState<string>('')

  /** บันทึก config */
  useEffect(() => {
    localStorage.setItem('n8n-builder-config', JSON.stringify(config))
  }, [config])

  /** Generate JSON ทันทีเมื่อ config เปลี่ยนเพื่อ preview */
  const workflowJson = useMemo(() => buildN8nWorkflowJson(config), [config])

  useEffect(() => {
    setJsonText(JSON.stringify(workflowJson, null, 2))
  }, [workflowJson])

  /** สถานะการสร้างบน n8n */
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null)

  /** กดสร้าง workflow บน n8n */
  const handleCreateOnN8n = async () => {
    setMessage(null)
    if (!config.instanceUrl || !config.apiKey) {
      setMessage({ type: 'error', text: 'กรุณากรอก Instance URL และ API Key ของ n8n ก่อน' })
      return
    }
    setCreating(true)
    try {
      const data = await createWorkflowOnN8n(config.instanceUrl, config.apiKey, workflowJson)
      setMessage({ type: 'success', text: `สร้าง Workflow สำเร็จ (id: ${data.id || 'N/A'})` })
    } catch (err: any) {
      setMessage({ type: 'error', text: `สร้าง Workflow ไม่สำเร็จ: ${err?.message || 'Unknown error'} (อาจติด CORS)` })
    } finally {
      setCreating(false)
    }
  }

  /** ดาวน์โหลด JSON */
  const handleDownload = () => {
    downloadJson(`${config.workflowName.replace(/\s+/g, '-').toLowerCase()}.json`, jsonText)
  }

  const cardClass = isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div className="container mx-auto px-6 py-8">
        <PageHeader
          icon={<Bot className={isDark ? 'text-blue-400' : 'text-blue-600'} />}
          title="n8n Flow Builder"
          subtitle="สร้าง Workflow สำหรับ FB Post Checker พร้อม Export/Deploy"
          actions={<Badge variant="outline" className="bg-transparent">Webhook + Function + Respond</Badge>}
          isDark={isDark}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={`${cardClass} backdrop-blur-sm border shadow-lg`}>
            <CardHeader>
              <CardTitle className={textClass}>ตั้งค่า Workflow</CardTitle>
              <CardDescription className={textSecondary}>กำหนดข้อมูลพื้นฐานก่อนสร้าง JSON</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>Workflow Name</label>
                  <Input
                    value={config.workflowName}
                    onChange={(e) => setConfig({ ...config, workflowName: e.target.value })}
                    placeholder="FB Post Checker (Generated)"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>Webhook Method</label>
                  <select
                    value={config.webhookMethod}
                    onChange={(e) => setConfig({ ...config, webhookMethod: e.target.value as 'POST' | 'GET' })}
                    className={`w-full p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>Webhook Path</label>
                  <Input
                    value={config.webhookPath}
                    onChange={(e) => setConfig({ ...config, webhookPath: e.target.value })}
                    placeholder="fbpostshield/input"
                  />
                  <p className={`text-xs mt-1 ${textSecondary}`}>เช่น https://YOUR_N8N/webhook-test/{config.webhookPath}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>Risk Threshold</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={config.riskThreshold}
                    onChange={(e) => setConfig({ ...config, riskThreshold: Number(e.target.value || 3) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>LINE Token (optional)</label>
                  <Input
                    type="password"
                    value={config.lineToken}
                    onChange={(e) => setConfig({ ...config, lineToken: e.target.value })}
                    placeholder="ใส่ถ้าต้องการส่งแจ้งเตือน"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>LINE User ID</label>
                  <Input
                    value={config.lineUserId}
                    onChange={(e) => setConfig({ ...config, lineUserId: e.target.value })}
                    placeholder="Cabc1234567890xyz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>n8n Instance URL</label>
                  <Input
                    value={config.instanceUrl}
                    onChange={(e) => setConfig({ ...config, instanceUrl: e.target.value })}
                    placeholder="https://mossad.app.n8n.cloud"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-1`}>n8n API Key</label>
                  <Input
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="X-N8N-API-KEY"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
                <Button onClick={handleCreateOnN8n} disabled={creating} className="flex-1">
                  {creating ? (
                    <>
                      <UploadCloud className="w-4 h-4 mr-2 animate-spin" />
                      กำลังสร้างบน n8n...
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" />
                      Create on n8n
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setJsonText(JSON.stringify(workflowJson, null, 2))}>
                  <Code className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>

              {message && (
                <div
                  className={`mt-2 p-3 rounded-lg border ${
                    message.type === 'success'
                      ? isDark
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-green-50 border-green-200 text-green-700'
                      : message.type === 'error'
                      ? isDark
                        ? 'bg-red-500/10 border-red-500/30 text-red-300'
                        : 'bg-red-50 border-red-200 text-red-700'
                      : isDark
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : message.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    <span className="text-sm">{message.text}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* JSON Preview */}
          <Card className={`${cardClass} backdrop-blur-sm border shadow-lg`}>
            <CardHeader>
              <CardTitle className={textClass}>Preview JSON</CardTitle>
              <CardDescription className={textSecondary}>ตรวจสอบก่อน Export/Deploy</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={26} className={`${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-gray-200 text-gray-900'} font-mono text-sm`} />
              <p className={`text-xs mt-2 ${textSecondary}`}>หมายเหตุ: หากกด Create on n8n แล้วติดปัญหา CORS ให้ดาวน์โหลด JSON แล้ว Import ผ่าน UI ของ n8n แทน</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
