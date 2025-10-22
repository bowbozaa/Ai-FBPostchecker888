import axios from 'axios';
import { ChatMessage, ChatSettings } from '@/types/chat';

export class ChatService {
  private apiKey: string;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(settings?: Partial<ChatSettings>) {
    const savedApiKey = localStorage.getItem('ai_api_key') || '';
    const savedModel = localStorage.getItem('ai_model') || 'gpt-3.5-turbo';
    const savedTemp = localStorage.getItem('ai_temperature') || '0.7';
    const savedMaxTokens = localStorage.getItem('ai_max_tokens') || '2000';

    this.apiKey = settings?.apiKey || savedApiKey;
    this.model = settings?.model || savedModel;
    this.temperature = settings?.temperature || parseFloat(savedTemp);
    this.maxTokens = settings?.maxTokens || parseInt(savedMaxTokens);
  }

  /**
   * Send message to OpenAI API
   */
  async sendMessage(
    messages: ChatMessage[],
    systemPrompt?: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key ไม่ได้ตั้งค่า กรุณาไปที่หน้า Settings');
    }

    try {
      // Format messages for API
      const apiMessages = [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content,
        })),
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.model,
          messages: apiMessages,
          temperature: this.temperature,
          max_tokens: this.maxTokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new Error(
        `ไม่สามารถส่งข้อความได้: ${error.response?.data?.error?.message || error.message}`
      );
    }
  }

  /**
   * Send message with streaming (for future use)
   */
  async sendMessageStream(
    messages: ChatMessage[],
    systemPrompt?: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key ไม่ได้ตั้งค่า');
    }

    // This is a simplified version
    // For real streaming, you'd need to use fetch with ReadableStream
    const response = await this.sendMessage(messages, systemPrompt);
    if (onChunk) {
      onChunk(response);
    }
    return response;
  }

  /**
   * Alternative: Use Claude API
   */
  async sendMessageClaude(
    messages: ChatMessage[],
    systemPrompt?: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key ไม่ได้ตั้งค่า');
    }

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: this.model || 'claude-3-sonnet-20240229',
          max_tokens: this.maxTokens,
          messages: messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
          system: systemPrompt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
          },
        }
      );

      return response.data.content[0].text;
    } catch (error: any) {
      console.error('Claude API Error:', error.response?.data || error.message);
      throw new Error(
        `ไม่สามารถส่งข้อความได้: ${error.response?.data?.error?.message || error.message}`
      );
    }
  }

  /**
   * FREE Alternative: Use local LLM or mock response
   */
  async sendMessageLocal(messages: ChatMessage[]): Promise<string> {
    // Mock response for demo/testing
    const userMessage = messages[messages.length - 1]?.content || '';

    // Simple responses based on keywords
    if (userMessage.toLowerCase().includes('สวัสดี')) {
      return 'สวัสดีครับ! ผมเป็น AI Assistant ยินดีที่ได้ช่วยเหลือคุณ มีอะไรให้ช่วยไหมครับ?';
    }

    if (userMessage.toLowerCase().includes('facebook')) {
      return 'คุณต้องการตรวจสอบโพสต์ Facebook ใช่ไหมครับ? ผมสามารถช่วยวิเคราะห์ความปลอดภัยของโพสต์ได้ครับ ลองไปที่หน้า FB Post Checker ได้เลย!';
    }

    if (userMessage.toLowerCase().includes('ช่วย')) {
      return `ผมสามารถช่วยคุณในเรื่องต่างๆ เหล่านี้ได้ครับ:

1. วิเคราะห์โพสต์ Facebook
2. ตรวจสอบคำต้องห้าม
3. ให้คำแนะนำเกี่ยวกับความปลอดภัยออนไลน์
4. ตอบคำถามทั่วไป

บอกผมได้เลยว่าต้องการความช่วยเหลือในเรื่องใดครับ?`;
    }

    // Default response
    return `ขอบคุณสำหรับข้อความครับ!

สำหรับการใช้งาน AI Chat เต็มรูปแบบ คุณสามารถ:
1. ตั้งค่า OpenAI API Key ในหน้า Settings
2. หรือตั้งค่า Claude API Key

ถ้าคุณมีคำถามเกี่ยวกับระบบ FB Post Checker ผมยินดีช่วยเหลือครับ!`;
  }

  /**
   * Save settings
   */
  saveSettings(settings: Partial<ChatSettings>) {
    if (settings.apiKey) localStorage.setItem('ai_api_key', settings.apiKey);
    if (settings.model) localStorage.setItem('ai_model', settings.model);
    if (settings.temperature !== undefined)
      localStorage.setItem('ai_temperature', settings.temperature.toString());
    if (settings.maxTokens !== undefined)
      localStorage.setItem('ai_max_tokens', settings.maxTokens.toString());
    if (settings.systemPrompt)
      localStorage.setItem('ai_system_prompt', settings.systemPrompt);
  }

  /**
   * Get current settings
   */
  getSettings(): ChatSettings {
    return {
      apiKey: localStorage.getItem('ai_api_key') || '',
      model: localStorage.getItem('ai_model') || 'gpt-3.5-turbo',
      temperature: parseFloat(localStorage.getItem('ai_temperature') || '0.7'),
      maxTokens: parseInt(localStorage.getItem('ai_max_tokens') || '2000'),
      systemPrompt:
        localStorage.getItem('ai_system_prompt') ||
        'คุณเป็น AI Assistant ที่ช่วยเหลือเกี่ยวกับการตรวจสอบโพสต์ Facebook และความปลอดภัยออนไลน์',
    };
  }
}

export const chatService = new ChatService();
