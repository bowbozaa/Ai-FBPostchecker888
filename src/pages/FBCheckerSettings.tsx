import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { facebookService } from '@/services/facebookService';
import { lineNotifyService } from '@/services/lineNotifyService';
import { analysisService } from '@/services/analysisService';
import { chatService } from '@/services/chatService';
import { Save, CheckCircle2, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export default function FBCheckerSettings() {
  const { toast } = useToast();

  // Facebook Settings
  const [fbToken, setFbToken] = useState('');
  const [fbPageId, setFbPageId] = useState('');
  const [fbTokenValid, setFbTokenValid] = useState<boolean | null>(null);
  const [fbValidating, setFbValidating] = useState(false);
  const [showFbToken, setShowFbToken] = useState(false);

  // LINE Settings
  const [lineToken, setLineToken] = useState('');
  const [lineTokenValid, setLineTokenValid] = useState<boolean | null>(null);
  const [lineValidating, setLineValidating] = useState(false);
  const [showLineToken, setShowLineToken] = useState(false);

  // Keywords Settings
  const [keywords, setKeywords] = useState('');

  // AI Settings
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-3.5-turbo');
  const [showAiKey, setShowAiKey] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedFbToken = localStorage.getItem('fb_access_token') || '';
    const savedFbPageId = localStorage.getItem('fb_page_id') || '';
    const savedLineToken = localStorage.getItem('line_notify_token') || '';
    const savedKeywords = localStorage.getItem('banned_keywords') || '[]';

    setFbToken(savedFbToken);
    setFbPageId(savedFbPageId);
    setLineToken(savedLineToken);

    try {
      const parsed = JSON.parse(savedKeywords);
      setKeywords(parsed.join('\n'));
    } catch (e) {
      setKeywords('');
    }

    // Load AI settings
    const settings = chatService.getSettings();
    setAiApiKey(settings.apiKey);
    setAiModel(settings.model);
  }, []);

  const handleSaveFacebook = async () => {
    facebookService.setAccessToken(fbToken);
    localStorage.setItem('fb_page_id', fbPageId);

    toast({
      title: '✅ บันทึกสำเร็จ',
      description: 'บันทึกการตั้งค่า Facebook แล้ว',
    });

    // Validate token
    setFbValidating(true);
    const valid = await facebookService.validateToken();
    setFbTokenValid(valid);
    setFbValidating(false);

    if (valid) {
      toast({
        title: '✅ Token ถูกต้อง',
        description: 'Facebook Access Token สามารถใช้งานได้',
      });
    } else {
      toast({
        title: '❌ Token ไม่ถูกต้อง',
        description: 'กรุณาตรวจสอบ Facebook Access Token',
        variant: 'destructive',
      });
    }
  };

  const handleSaveLINE = async () => {
    lineNotifyService.setAccessToken(lineToken);

    toast({
      title: '✅ บันทึกสำเร็จ',
      description: 'บันทึกการตั้งค่า LINE Notify แล้ว',
    });

    // Validate token
    setLineValidating(true);
    const valid = await lineNotifyService.validateToken();
    setLineTokenValid(valid);
    setLineValidating(false);

    if (valid) {
      toast({
        title: '✅ Token ถูกต้อง',
        description: 'LINE Notify Token สามารถใช้งานได้',
      });
    } else {
      toast({
        title: '❌ Token ไม่ถูกต้อง',
        description: 'กรุณาตรวจสอบ LINE Notify Token',
        variant: 'destructive',
      });
    }
  };

  const handleSaveKeywords = () => {
    const keywordList = keywords
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    analysisService.setBannedKeywords(keywordList);

    toast({
      title: '✅ บันทึกสำเร็จ',
      description: `บันทึกคำต้องห้าม ${keywordList.length} คำแล้ว`,
    });
  };

  const handleTestLINE = async () => {
    try {
      await lineNotifyService.sendNotification('🧪 ทดสอบการแจ้งเตือนจาก FB Post Checker 888\n\nหากคุณเห็นข้อความนี้ แสดงว่าการตั้งค่าถูกต้อง! ✅');
      toast({
        title: '✅ ส่งการทดสอบสำเร็จ',
        description: 'กรุณาตรวจสอบการแจ้งเตือนใน LINE',
      });
    } catch (err: any) {
      toast({
        title: '❌ ส่งการทดสอบไม่สำเร็จ',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚙️ ตั้งค่า
        </h1>
        <p className="text-muted-foreground mt-2">
          จัดการการตั้งค่า API Tokens และคำต้องห้าม
        </p>
      </div>

      {/* Facebook Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>📘 Facebook Settings</span>
            {fbTokenValid !== null && (
              fbTokenValid ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  ใช้งานได้
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  ไม่ถูกต้อง
                </Badge>
              )
            )}
          </CardTitle>
          <CardDescription>
            ตั้งค่า Facebook Graph API Access Token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fb-token">Facebook Access Token</Label>
            <div className="flex gap-2">
              <Input
                id="fb-token"
                type={showFbToken ? 'text' : 'password'}
                placeholder="EAAxxxxxxxxx..."
                value={fbToken}
                onChange={(e) => setFbToken(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFbToken(!showFbToken)}
              >
                {showFbToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              รับ Access Token จาก{' '}
              <a
                href="https://developers.facebook.com/tools/explorer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook Graph API Explorer
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fb-page-id">Facebook Page ID (ถ้ามี)</Label>
            <Input
              id="fb-page-id"
              placeholder="123456789..."
              value={fbPageId}
              onChange={(e) => setFbPageId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              ใช้สำหรับดึงโพสต์จากเพจโดยอัตโนมัติ
            </p>
          </div>

          <Button
            onClick={handleSaveFacebook}
            disabled={!fbToken.trim() || fbValidating}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {fbValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังตรวจสอบ...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                บันทึกและตรวจสอบ
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* LINE Notify Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>💚 LINE Notify Settings</span>
            {lineTokenValid !== null && (
              lineTokenValid ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  ใช้งานได้
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  ไม่ถูกต้อง
                </Badge>
              )
            )}
          </CardTitle>
          <CardDescription>
            ตั้งค่า LINE Notify สำหรับรับการแจ้งเตือน
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="line-token">LINE Notify Token</Label>
            <div className="flex gap-2">
              <Input
                id="line-token"
                type={showLineToken ? 'text' : 'password'}
                placeholder="abcdefghijklmnopqrstuvwxyz..."
                value={lineToken}
                onChange={(e) => setLineToken(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowLineToken(!showLineToken)}
              >
                {showLineToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              รับ Token จาก{' '}
              <a
                href="https://notify-bot.line.me/my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LINE Notify
              </a>
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveLINE}
              disabled={!lineToken.trim() || lineValidating}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {lineValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังตรวจสอบ...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  บันทึกและตรวจสอบ
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleTestLINE}
              disabled={!lineToken.trim()}
            >
              ทดสอบส่งการแจ้งเตือน
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Banned Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>🚫 คำต้องห้าม</CardTitle>
          <CardDescription>
            กำหนดคำที่ต้องการตรวจจับ (แต่ละบรรทัด 1 คำ)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="สแกม&#10;โกง&#10;ของปลอม&#10;scam&#10;fake"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={10}
            className="font-mono text-sm"
          />
          <Alert>
            <AlertDescription className="text-sm">
              💡 <strong>คำแนะนำ:</strong> ระบบมีคำต้องห้ามเริ่มต้นอยู่แล้ว คำที่คุณเพิ่มที่นี่จะถูกใช้เพิ่มเติม
            </AlertDescription>
          </Alert>
          <Button onClick={handleSaveKeywords} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            บันทึกคำต้องห้าม
          </Button>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 คู่มือการตั้งค่า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">📘 Facebook Access Token:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>ไปที่ Facebook Graph API Explorer</li>
              <li>เลือก Permissions: pages_read_engagement, pages_manage_posts</li>
              <li>Generate Access Token</li>
              <li>คัดลอกและวางที่นี่</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-1">💚 LINE Notify Token:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>ไปที่ notify-bot.line.me/my/</li>
              <li>Generate token</li>
              <li>เลือกกลุ่มที่ต้องการรับการแจ้งเตือน</li>
              <li>คัดลอกและวางที่นี่</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
