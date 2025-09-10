/**
 * GrayHatAnalyzer - ระบบวิเคราะห์และแนะนำกลยุทธ์สายเทา
 */

import { useState } from 'react'
import { Brain, Target, Lightbulb, Clock, Users, Shield, Zap, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { apiService } from '../services/apiService'
import { useTheme } from '../hooks/useTheme'

/**
 * Interface สำหรับผลลัพธ์การวิเคราะห์สายเทา
 */
interface GrayHatResult {
  strategy_level: string
  gray_techniques: string[]
  risk_assessment: number
  recommendations: string[]
  timing_strategy: string
  engagement_tips: string[]
  alternative_content?: string
  stealth_score: number
}

export default function GrayHatAnalyzer() {
  const [content, setContent] = useState('')
  const [result, setResult] = useState<GrayHatResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedText, setCopiedText] = useState('')
  const { theme } = useTheme()

  /**
   * วิเคราะห์เนื้อหาแบบสายเทา
   */
  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    try {
      const analysis = await apiService.analyzeGrayHat({
        post_content: content,
        user_id: 'gray-hat-user'
      })

      setResult(analysis || {
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
      })
    } catch (error) {
      console.error('Gray Hat Analysis Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * คัดลอกข้อความ
   */
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(id)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  /**
   * ส่วนแสดง Strategy Level
   */
  const getStrategyBadge = (level: string) => {
    const levels = {
      'beginner': { color: 'bg-green-100 text-green-700', label: '🌱 Beginner' },
      'intermediate': { color: 'bg-yellow-100 text-yellow-700', label: '⚡ Intermediate' },
      'advanced': { color: 'bg-red-100 text-red-700', label: '🔥 Advanced' },
      'expert': { color: 'bg-purple-100 text-purple-700', label: '👑 Expert' }
    }
    
    const config = levels[level as keyof typeof levels] || levels.intermediate
    return <Badge className={config.color}>{config.label}</Badge>
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100'
    }`}>
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${
              theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <Brain className={`w-8 h-8 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              🎯 Gray Hat Strategy Analyzer
            </h1>
          </div>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            วิเคราะห์และแนะนำกลยุทธ์สายเทาแบบผู้เชี่ยวชาญ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <Card className={`${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white border-gray-200'
          } shadow-xl`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Target className="w-5 h-5 text-purple-500" />
                Strategic Content Analysis
              </CardTitle>
              <CardDescription>
                ใส่เนื้อหาที่ต้องการวิเคราะห์กลยุทธ์สายเทา
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="วางเนื้อหาที่ต้องการวิเคราะห์กลยุทธ์..."
                className={`w-full h-40 p-4 rounded-xl border resize-none ${
                  theme === 'dark'
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !content.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    กำลังวิเคราะห์...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    วิเคราะห์กลยุทธ์
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className={`${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white border-gray-200'
            } shadow-xl`}>
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Strategy Results
                  </div>
                  {getStrategyBadge(result.strategy_level)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Stealth Score */}
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">🥷 Stealth Score</span>
                    <span className="text-2xl font-bold text-green-500">
                      {result.stealth_score}/10
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${
                    theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                      style={{ width: `${(result.stealth_score / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Gray Techniques */}
                <div>
                  <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Shield className="w-4 h-4 text-blue-500" />
                    Gray Hat Techniques
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {result.gray_techniques.map((technique, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50'
                      }`}>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                        }`}>
                          💡 {technique}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Target className="w-4 h-4 text-green-500" />
                    Strategic Recommendations
                  </h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {rec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timing Strategy */}
                <div className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Optimal Timing</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    {result.timing_strategy}
                  </p>
                </div>

                {/* Engagement Tips */}
                <div>
                  <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Users className="w-4 h-4 text-purple-500" />
                    Engagement Tips
                  </h3>
                  <div className="space-y-2">
                    {result.engagement_tips.map((tip, index) => (
                      <div key={index} className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                      }`}>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                        }`}>
                          🔥 {tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternative Content */}
                {result.alternative_content && (
                  <div className={`p-4 rounded-xl border-2 border-dashed ${
                    theme === 'dark' ? 'border-green-500/30 bg-green-500/10' : 'border-green-300 bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-600">✨ Optimized Content</span>
                      <Button
                        onClick={() => copyToClipboard(result.alternative_content!, 'alt-content')}
                        variant="ghost"
                        size="sm"
                      >
                        {copiedText === 'alt-content' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-green-300' : 'text-green-700'
                    }`}>
                      {result.alternative_content}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
