import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { facebookService } from '@/services/facebookService';
import { analysisService } from '@/services/analysisService';
import { lineNotifyService } from '@/services/lineNotifyService';
import { usePostCheckerStore } from '@/store/usePostCheckerStore';
import { Play, Pause, RefreshCw, Bell } from 'lucide-react';

export default function FBMonitoring() {
  const { toast } = useToast();
  const { addResult, results, stats } = usePostCheckerStore();

  const [pageId, setPageId] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [interval, setInterval] = useState(5); // minutes
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [nextCheck, setNextCheck] = useState<Date | null>(null);

  useEffect(() => {
    // Load saved page ID
    const saved = localStorage.getItem('fb_page_id');
    if (saved) setPageId(saved);
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;

    const checkPosts = async () => {
      try {
        setLastCheck(new Date());

        // Fetch latest posts from page
        const posts = await facebookService.getPagePosts(pageId, 10);

        // Analyze each post
        let riskyCount = 0;
        for (const post of posts) {
          const result = analysisService.analyzePost(
            post,
            post.permalink_url || `https://facebook.com/${post.id}`
          );

          // Save to store
          addResult(result);

          // Send notification if risky
          if (result.status === 'risky' || result.status === 'dangerous') {
            riskyCount++;
            try {
              await lineNotifyService.notifyAnalysisResult(result);
            } catch (e) {
              console.warn('LINE notification failed:', e);
            }
          }
        }

        toast({
          title: '✅ ตรวจสอบเสร็จสิ้น',
          description: `ตรวจสอบ ${posts.length} โพสต์ พบความเสี่ยง ${riskyCount} โพสต์`,
        });

        // Schedule next check
        setNextCheck(new Date(Date.now() + interval * 60 * 1000));
      } catch (err: any) {
        console.error('Monitoring error:', err);
        toast({
          title: '❌ เกิดข้อผิดพลาด',
          description: err.message,
          variant: 'destructive',
        });
      }
    };

    // Initial check
    checkPosts();

    // Set up interval
    const timer = setInterval(checkPosts, interval * 60 * 1000);

    return () => clearInterval(timer);
  }, [isMonitoring, pageId, interval]);

  const handleStart = () => {
    if (!pageId.trim()) {
      toast({
        title: '❌ กรุณาใส่ Page ID',
        description: 'กรุณาใส่ Facebook Page ID',
        variant: 'destructive',
      });
      return;
    }

    setIsMonitoring(true);
    toast({
      title: '▶️ เริ่มการตรวจสอบ',
      description: `ระบบจะตรวจสอบทุก ${interval} นาที`,
    });
  };

  const handleStop = () => {
    setIsMonitoring(false);
    setNextCheck(null);
    toast({
      title: '⏸️ หยุดการตรวจสอบ',
      description: 'หยุดการตรวจสอบอัตโนมัติแล้ว',
    });
  };

  const getTimeUntilNext = () => {
    if (!nextCheck) return '';
    const diff = nextCheck.getTime() - Date.now();
    if (diff < 0) return 'กำลังตรวจสอบ...';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          🔄 Real-time Monitoring
        </h1>
        <p className="text-lg text-muted-foreground">
          ตรวจสอบโพสต์จากเพจ Facebook อัตโนมัติแบบ Real-time
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className={isMonitoring ? 'bg-green-50 border-green-200' : 'bg-gray-50'}>
          <CardHeader className="pb-3">
            <CardDescription>สถานะ</CardDescription>
            <CardTitle className="text-2xl">
              {isMonitoring ? (
                <Badge className="bg-green-600">🟢 กำลังทำงาน</Badge>
              ) : (
                <Badge variant="secondary">⚫ หยุดทำงาน</Badge>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>ตรวจสอบครั้งล่าสุด</CardDescription>
            <CardTitle className="text-sm">
              {lastCheck ? lastCheck.toLocaleTimeString('th-TH') : '-'}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>ตรวจสอบครั้งถัดไป</CardDescription>
            <CardTitle className="text-sm">
              {isMonitoring ? getTimeUntilNext() : '-'}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardDescription>โพสต์ทั้งหมด</CardDescription>
            <CardTitle className="text-3xl text-purple-600">
              {stats.totalPosts}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ ตั้งค่าการตรวจสอบ</CardTitle>
          <CardDescription>
            กำหนดค่าสำหรับการตรวจสอบอัตโนมัติ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="page-id">Facebook Page ID</Label>
              <Input
                id="page-id"
                placeholder="123456789..."
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                disabled={isMonitoring}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval">ช่วงเวลาตรวจสอบ (นาที)</Label>
              <Input
                id="interval"
                type="number"
                min="1"
                max="60"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                disabled={isMonitoring}
              />
            </div>
          </div>

          <div className="flex gap-2">
            {!isMonitoring ? (
              <Button
                onClick={handleStart}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Play className="mr-2 h-4 w-4" />
                เริ่มการตรวจสอบ
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                variant="destructive"
                className="flex-1"
              >
                <Pause className="mr-2 h-4 w-4" />
                หยุดการตรวจสอบ
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">✅ ปลอดภัย</CardTitle>
            <div className="text-5xl font-bold text-green-600 mt-2">
              {stats.safePosts}
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-700">⚠️ มีความเสี่ยง</CardTitle>
            <div className="text-5xl font-bold text-yellow-600 mt-2">
              {stats.riskyPosts}
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">🚨 อันตราย</CardTitle>
            <div className="text-5xl font-bold text-red-600 mt-2">
              {stats.dangerousPosts}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            การแจ้งเตือนล่าสุด
          </CardTitle>
          <CardDescription>โพสต์ที่มีความเสี่ยง 5 รายการล่าสุด</CardDescription>
        </CardHeader>
        <CardContent>
          {results
            .filter((r) => r.status === 'risky' || r.status === 'dangerous')
            .slice(0, 5)
            .map((result) => (
              <Alert
                key={result.id}
                variant={result.status === 'dangerous' ? 'destructive' : 'default'}
                className="mb-3"
              >
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold mb-1">
                        {result.status === 'dangerous' ? '🚨 อันตราย' : '⚠️ มีความเสี่ยง'} - {result.riskScore}%
                      </div>
                      <div className="text-sm">
                        Post ID: {result.postId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(result.timestamp).toLocaleString('th-TH')}
                      </div>
                    </div>
                    <Badge variant={result.status === 'dangerous' ? 'destructive' : 'default'}>
                      {result.bannedKeywords.length} คำต้องห้าม
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}

          {results.filter((r) => r.status === 'risky' || r.status === 'dangerous').length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-2">✨</div>
              ไม่มีการแจ้งเตือน - ทุกอย่างปลอดภัย!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 วิธีใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. ใส่ Facebook Page ID ของเพจที่ต้องการตรวจสอบ</p>
          <p>2. กำหนดช่วงเวลาในการตรวจสอบ (แนะนำ 5-10 นาที)</p>
          <p>3. กดปุ่ม "เริ่มการตรวจสอบ"</p>
          <p>4. ระบบจะตรวจสอบโพสต์ใหม่อัตโนมัติทุกช่วงเวลาที่กำหนด</p>
          <p>5. หากพบโพสต์ที่มีความเสี่ยง ระบบจะแจ้งเตือนผ่าน LINE ทันที</p>
          <p className="text-yellow-600">⚠️ <strong>หมายเหตุ:</strong> ต้องตั้งค่า Facebook Token และ LINE Token ที่หน้า Settings ก่อน</p>
        </CardContent>
      </Card>
    </div>
  );
}
