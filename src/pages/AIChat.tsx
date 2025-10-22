import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (msg: string) => {
    setNotification(msg);
  };

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('สวัสดี') || msg.includes('hello') || msg.includes('hi')) {
      return 'สวัสดีครับ! ผมเป็น AI Assistant ยินดีที่ได้ช่วยเหลือคุณ 😊\n\nมีอะไรให้ช่วยไหมครับ?';
    }

    if (msg.includes('facebook') || msg.includes('โพสต์')) {
      return 'คุณต้องการตรวจสอบโพสต์ Facebook ใช่ไหมครับ? 🔍\n\nผมสามารถช่วยวิเคราะห์ความปลอดภัยของโพสต์ได้ครับ ลองไปที่หน้า FB Post Checker ได้เลย!\n\nเส้นทาง: /fb-post-checker';
    }

    if (msg.includes('ช่วย') || msg.includes('help') || msg.includes('ทำอะไรได้')) {
      return `ผมสามารถช่วยคุณในเรื่องต่างๆ เหล่านี้ได้ครับ:\n\n1. 🔍 วิเคราะห์โพสต์ Facebook\n2. 🚫 ตรวจสอบคำต้องห้าม\n3. 💡 ให้คำแนะนำเกี่ยวกับความปลอดภัยออนไลน์\n4. 💬 ตอบคำถามทั่วไป\n\nบอกผมได้เลยว่าต้องการความช่วยเหลือในเรื่องใดครับ?`;
    }

    if (msg.includes('ขอบคุณ') || msg.includes('thank')) {
      return 'ยินดีครับ! ถ้ามีอะไรอยากถามเพิ่มเติม บอกผมได้เสมอนะครับ 😊';
    }

    return `ขอบคุณสำหรับข้อความครับ! 📝\n\nสำหรับการใช้งาน AI Chat เต็มรูปแบบ คุณสามารถ:\n\n1. ตั้งค่า OpenAI API Key ในหน้า Settings\n2. หรือตั้งค่า Claude API Key\n\nถ้าคุณมีคำถามเกี่ยวกับระบบ FB Post Checker ผมยินดีช่วยเหลือครับ!\n\nลองพิมพ์:\n- "สวัสดี"\n- "ช่วยอะไรได้บ้าง"\n- "ตรวจสอบ Facebook"`;
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: getAIResponse(userMessage.content),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleClear = () => {
    setMessages([]);
    showNotification('ล้างแชทเรียบร้อยแล้ว');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    showNotification('คัดลอกข้อความแล้ว!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {notification}
        </div>
      )}

      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <Card className="p-4 mb-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🤖 AI Chat
              </h1>
              <p className="text-sm text-gray-600 mt-1">Mock Mode - ทดสอบฟรี!</p>
            </div>
            <Button onClick={handleClear} variant="outline">
              🗑️ ล้างแชท
            </Button>
          </div>
        </Card>

        {/* Messages */}
        <Card className="flex-1 p-4 mb-4 overflow-hidden shadow-lg">
          <div ref={scrollRef} className="h-full overflow-y-auto space-y-4">
            {/* Welcome */}
            {messages.length === 0 && (
              <div className="text-center py-16 space-y-4">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ยินดีต้อนรับสู่ AI Chat!
                </h2>
                <p className="text-gray-600">
                  ผมเป็น AI Assistant พร้อมช่วยเหลือคุณ
                  <br />
                  ถามอะไรผมก็ได้นะครับ!
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <Button variant="outline" onClick={() => setInput('สวัสดี')}>
                    สวัสดี
                  </Button>
                  <Button variant="outline" onClick={() => setInput('ช่วยวิเคราะห์โพสต์ Facebook')}>
                    วิเคราะห์โพสต์
                  </Button>
                  <Button variant="outline" onClick={() => setInput('คุณช่วยอะไรได้บ้าง')}>
                    ช่วยอะไรได้บ้าง?
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 ml-8'
                    : 'bg-white border border-gray-200 mr-8'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}
                >
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{msg.role === 'user' ? 'คุณ' : 'AI'}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString('th-TH')}
                      </span>
                      <button
                        onClick={() => copyMessage(msg.content)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        📋 คัดลอก
                      </button>
                    </div>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex gap-3 p-4 rounded-lg bg-white border border-gray-200 mr-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  🤖
                </div>
                <div className="flex-1">
                  <span className="font-semibold">AI</span>
                  <div className="text-sm text-gray-500 mt-2">กำลังคิด...</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Input */}
        <Card className="p-4 shadow-lg">
          <div className="flex gap-2">
            <Input
              placeholder="พิมพ์ข้อความของคุณ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isLoading ? '⏳' : '📤'} ส่ง
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            กด Enter เพื่อส่ง • Shift + Enter เพื่อขึ้นบรรทัดใหม่
          </p>
        </Card>
      </div>
    </div>
  );
}
