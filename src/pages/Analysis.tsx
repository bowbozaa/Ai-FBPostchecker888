import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { facebookApi } from '@/services/facebookApi';
import { analysisService } from '@/services/analysisService';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { AnalysisResult } from '@/types';

export default function Analysis() {
  const [postUrl, setPostUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const addResult = useAnalysisStore((state) => state.addResult);

  const handleAnalyze = async () => {
    if (!postUrl.trim()) {
      setError('กรุณาใส่ URL หรือ Post ID ของโพสต์ Facebook');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Extract Post ID from URL
      const postId = facebookApi.extractPostId(postUrl);

      // Fetch post from Facebook (or use demo data if no token)
      let post;
      try {
        post = await facebookApi.getPost(postId);
      } catch (fbError) {
        // If Facebook API fails, use demo data for testing
        console.warn('Facebook API error, using demo data:', fbError);
        post = {
          id: postId,
          message: 'นี่คือโพสต์ตัวอย่าง สามารถทดสอบระบบได้โดยใส่ข้อความที่มีคำต้องห้าม เช่น "สแกม" "โกง" หรือ "ของปลอม" เพื่อดูการทำงานของระบบวิเคราะห์',
          created_time: new Date().toISOString(),
        };
      }

      // Analyze the post
      const analysisResult = analysisService.analyzePost(post, postUrl);

      // Save to store
      addResult(analysisResult);

      // Display result
      setResult(analysisResult);
      setIsAnalyzing(false);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🔍 วิเคราะห์โพสต์ Facebook
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          ตรวจสอบความเสี่ยงของโพสต์ด้วย AI แบบเรียลไทม์
        </p>
      </div>

      {/* Input Form */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl">📝 ใส่ข้อมูลโพสต์</CardTitle>
          <CardDescription className="text-base">
            ใส่ URL หรือ Post ID ของโพสต์ Facebook ที่ต้องการตรวจสอบ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Post URL หรือ Post ID</label>
            <Input
              type="text"
              placeholder="https://www.facebook.com/... หรือ 123456789"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              💡 ตัวอย่าง: https://www.facebook.com/username/posts/123456
            </p>
          </div>
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-800 text-sm">⚠️ {error}</p>
            </div>
          )}
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full text-base py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                กำลังวิเคราะห์...
              </>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                เริ่มวิเคราะห์เลย
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-2 shadow-2xl animate-slide-in-up">
          <CardHeader className={`${
            result.status === 'safe'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50'
              : result.status === 'risky'
              ? 'bg-gradient-to-r from-yellow-50 to-orange-50'
              : 'bg-gradient-to-r from-red-50 to-rose-50'
          }`}>
            <CardTitle className="text-2xl">
              {result.status === 'safe' && '✅ ผลการวิเคราะห์: ปลอดภัย'}
              {result.status === 'risky' && '⚠️ ผลการวิเคราะห์: มีความเสี่ยง'}
              {result.status === 'dangerous' && '🚨 ผลการวิเคราะห์: อันตราย!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                <p className="text-sm font-semibold text-blue-600 mb-2">📌 Post ID</p>
                <p className="font-mono font-bold text-lg">{result.postId}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <p className="text-sm font-semibold text-purple-600 mb-2">📊 Risk Score</p>
                <p className="font-bold text-4xl">
                  <span className={
                    result.riskScore < 30
                      ? 'text-green-600'
                      : result.riskScore < 70
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }>
                    {result.riskScore}%
                  </span>
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-xl border-2 ${
              result.status === 'safe'
                ? 'bg-green-50 border-green-300'
                : result.status === 'risky'
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-red-50 border-red-300'
            }`}>
              <p className={`font-bold text-lg ${
                result.status === 'safe'
                  ? 'text-green-800'
                  : result.status === 'risky'
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}>
                💬 {result.message}
              </p>
            </div>

            {result.detectedIssues && result.detectedIssues.length > 0 && (
              <div className="p-4 rounded-xl bg-orange-50 border-2 border-orange-200">
                <p className="text-sm font-bold text-orange-800 mb-3">⚠️ ปัญหาที่ตรวจพบ:</p>
                <ul className="space-y-2">
                  {result.detectedIssues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span className="text-sm text-orange-800">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.bannedKeywords && result.bannedKeywords.length > 0 && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                <p className="text-sm font-bold text-red-800 mb-3">🚫 คำต้องห้ามที่พบ:</p>
                <div className="flex flex-wrap gap-2">
                  {result.bannedKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-red-200 text-red-900 rounded-full text-sm font-semibold"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                ⏰ วิเคราะห์เมื่อ: {new Date(result.timestamp).toLocaleString('th-TH')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
