import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { facebookService } from '@/services/facebookService';
import { analysisService } from '@/services/analysisService';
import { lineNotifyService } from '@/services/lineNotifyService';
import { exportService } from '@/services/exportService';
import { usePostCheckerStore } from '@/store/usePostCheckerStore';
import { AnalysisResult } from '@/types/facebook';
import { Loader2, Search, Download, Bell, Copy, Trash2, ArrowLeft } from 'lucide-react';

export default function FBPostChecker() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addResult } = usePostCheckerStore();

  const [postUrl, setPostUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!postUrl.trim()) {
      setError('กรุณาใส่ URL หรือ Post ID ของโพสต์ Facebook');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Extract Post ID
      const postId = facebookService.extractPostId(postUrl);

      // Fetch post from Facebook
      const post = await facebookService.getPost(postId);

      // Analyze the post
      const analysisResult = analysisService.analyzePost(post, postUrl);

      // Save to store
      addResult(analysisResult);

      // Display result
      setResult(analysisResult);

      // Send LINE notification if risky
      try {
        const sent = await lineNotifyService.notifyIfRisky(analysisResult);
        if (sent) {
          toast({
            title: '✅ ส่งการแจ้งเตือนผ่าน LINE แล้ว',
            description: 'โพสต์นี้มีความเสี่ยง ได้ส่งการแจ้งเตือนไปยัง LINE แล้ว',
          });
        }
      } catch (lineError) {
        // Ignore LINE errors (not critical)
        console.warn('LINE notification failed:', lineError);
      }

      toast({
        title: '✅ วิเคราะห์เสร็จสิ้น',
        description: `ตรวจสอบโพสต์สำเร็จ - ${analysisResult.message}`,
      });

    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์');
      toast({
        title: '❌ เกิดข้อผิดพลาด',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = async () => {
    if (!result) return;

    try {
      await exportService.exportSingleToExcel(result);
      toast({
        title: '✅ ส่งออกสำเร็จ',
        description: 'ไฟล์ Excel ถูกดาวน์โหลดแล้ว',
      });
    } catch (err: any) {
      toast({
        title: '❌ เกิดข้อผิดพลาด',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleCopyPostId = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.postId);
    toast({
      title: '✅ คัดลอกแล้ว',
      description: `Post ID: ${result.postId}`,
    });
  };

  const handleClearResult = () => {
    setResult(null);
    setPostUrl('');
    setError('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'risky':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dangerous':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          ย้อนกลับ
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 AI Facebook Post Checker 888
        </h1>
        <p className="text-lg text-muted-foreground">
          ตรวจสอบความปลอดภัยของโพสต์ Facebook ด้วย AI
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>วิเคราะห์โพสต์ Facebook</CardTitle>
          <CardDescription>
            ใส่ URL หรือ Post ID ของโพสต์ที่ต้องการตรวจสอบ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://facebook.com/... หรือ 1234567890"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              disabled={isAnalyzing}
              className="flex-1"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !postUrl.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังวิเคราะห์...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  วิเคราะห์
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Result Section */}
      {result && (
        <Card className={`shadow-xl border-2 ${getStatusColor(result.status)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">ผลการวิเคราะห์</CardTitle>
                <CardDescription className="text-sm">
                  {new Date(result.timestamp).toLocaleString('th-TH')}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyPostId}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearResult}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-4">
              <Badge className={`text-lg px-4 py-2 ${getStatusColor(result.status)}`}>
                {result.status === 'safe' && '✅ ปลอดภัย'}
                {result.status === 'risky' && '⚠️ มีความเสี่ยงปานกลาง'}
                {result.status === 'dangerous' && '🚨 อันตราย!'}
              </Badge>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getRiskScoreColor(result.riskScore)}`}>
                  {result.riskScore}%
                </div>
                <div className="text-sm text-muted-foreground">คะแนนความเสี่ยง</div>
              </div>
            </div>

            {/* Message */}
            <Alert className={getStatusColor(result.status)}>
              <AlertDescription className="text-base font-medium">
                {result.message}
              </AlertDescription>
            </Alert>

            {/* Post Info */}
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Post ID:</span>
                <code className="text-sm bg-background px-2 py-1 rounded">{result.postId}</code>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">URL:</span>
                <a
                  href={result.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate max-w-xs"
                >
                  {result.postUrl}
                </a>
              </div>
            </div>

            {/* Banned Keywords */}
            {result.bannedKeywords.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">🚫 คำต้องห้ามที่พบ:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.bannedKeywords.map((keyword, idx) => (
                    <Badge key={idx} variant="destructive">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Detected Issues */}
            {result.detectedIssues.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-yellow-600">⚠️ ปัญหาที่ตรวจพบ:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.detectedIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm">
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Post Data (if available) */}
            {result.postData && result.postData.message && (
              <div className="space-y-2">
                <h4 className="font-semibold">📝 เนื้อหาโพสต์:</h4>
                <div className="p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {result.postData.message}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Guide */}
      {!result && !isAnalyzing && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 วิธีใช้งาน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>1. คัดลอก URL ของโพสต์ Facebook ที่ต้องการตรวจสอบ</p>
            <p>2. วาง URL ลงในช่องด้านบน และกดปุ่ม "วิเคราะห์"</p>
            <p>3. ระบบจะวิเคราะห์เนื้อหาและให้คะแนนความเสี่ยง</p>
            <p>4. หากพบความเสี่ยง ระบบจะแจ้งเตือนผ่าน LINE อัตโนมัติ</p>
            <p>5. สามารถส่งออกรายงานเป็น Excel ได้</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
