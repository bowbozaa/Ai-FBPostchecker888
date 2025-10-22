import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { chatService } from '@/services/chatService';
import { Save, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AISettings() {
  const { toast } = useToast();

  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const settings = chatService.getSettings();
    setApiKey(settings.apiKey);
    setModel(settings.model);
    setTemperature(settings.temperature);
    setMaxTokens(settings.maxTokens);
    setSystemPrompt(settings.systemPrompt);
  }, []);

  const handleSave = () => {
    chatService.saveSettings({
      apiKey,
      model,
      temperature,
      maxTokens,
      systemPrompt,
    });

    toast({
      title: '✅ บันทึกสำเร็จ',
      description: 'บันทึกการตั้งค่า AI แล้ว',
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🤖 AI Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          ตั้งค่า AI Chat และ API Tokens
        </p>
      </div>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            OpenAI / Claude API Settings
          </CardTitle>
          <CardDescription>
            ตั้งค่า API สำหรับใช้งาน AI Chat (ถ้าไม่ตั้งค่าจะใช้โหมดทดสอบ)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type={showApiKey ? 'text' : 'password'}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              รับ API Key จาก{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenAI
              </a>{' '}
              หรือ{' '}
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Claude
              </a>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4-turbo-preview">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <Label htmlFor="temperature">
              Temperature: {temperature.toFixed(1)}
            </Label>
            <input
              id="temperature"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              ต่ำ (0.0) = คำตอบที่แน่นอน, สูง (2.0) = คำตอบที่สร้างสรรค์
            </p>
          </div>

          {/* Max Tokens */}
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens: {maxTokens}</Label>
            <input
              id="maxTokens"
              type="range"
              min="100"
              max="4000"
              step="100"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              จำนวน tokens สูงสุดที่ AI จะตอบกลับ (100-4000)
            </p>
          </div>

          {/* System Prompt */}
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              placeholder="คุณเป็น AI Assistant ที่..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={5}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              คำสั่งเริ่มต้นสำหรับ AI (กำหนดบุคลิกและพฤติกรรม)
            </p>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
            <Save className="mr-2 h-4 w-4" />
            บันทึกการตั้งค่า
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">💡 ข้อมูลการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">🔑 การรับ API Key:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li><strong>OpenAI:</strong> ไปที่ platform.openai.com → API Keys → Create new key</li>
              <li><strong>Claude:</strong> ไปที่ console.anthropic.com → API Keys → Create key</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-1">🎯 แนะนำการตั้งค่า:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>GPT-3.5 Turbo:</strong> เร็ว ราคาถูก เหมาะสำหรับทั่วไป</li>
              <li><strong>GPT-4:</strong> ฉลาดกว่า แต่ช้าและแพงกว่า</li>
              <li><strong>Claude 3:</strong> ทางเลือกจาก Anthropic คุณภาพดี</li>
            </ul>
          </div>
          <Alert>
            <AlertDescription>
              <strong>⚠️ หมายเหตุ:</strong> ถ้าไม่ตั้งค่า API Key ระบบจะใช้โหมดทดสอบที่มีคำตอบจำกัด
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Cost Warning */}
      <Alert variant="destructive">
        <AlertDescription>
          <strong>⚡ ค่าใช้จ่าย:</strong> การใช้งาน OpenAI และ Claude API จะมีค่าใช้จ่ายตามการใช้งานจริง
          กรุณาตรวจสอบราคาที่ website ของผู้ให้บริการ
        </AlertDescription>
      </Alert>
    </div>
  );
}
