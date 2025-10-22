import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const features = [
    {
      icon: '🔍',
      title: 'วิเคราะห์โพสต์',
      description: 'ตรวจสอบความเสี่ยงของโพสต์ Facebook ด้วย AI',
      href: '/analysis',
    },
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'ดูภาพรวมและสถิติการวิเคราะห์',
      href: '/dashboard',
    },
    {
      icon: '📈',
      title: 'รายงาน',
      description: 'ดูรายงานและส่งออกข้อมูล',
      href: '/reports',
    },
    {
      icon: '⚙️',
      title: 'ตั้งค่า',
      description: 'จัดการ API และการแจ้งเตือน',
      href: '/settings',
    },
  ];

  const stats = [
    { label: 'โพสต์ที่วิเคราะห์', value: '0', color: 'text-blue-600' },
    { label: 'พบความเสี่ยง', value: '0', color: 'text-red-600' },
    { label: 'ปลอดภัย', value: '0', color: 'text-green-600' },
    { label: 'รอตรวจสอบ', value: '0', color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 px-10 py-12 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            🤖 AI Facebook Post Checker 888
          </h1>
          <p className="text-xl opacity-95 mb-8 leading-relaxed max-w-3xl">
            ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI
            <br />
            ตรวจจับคำต้องห้าม สแกม และเนื้อหาไม่เหมาะสม
          </p>
          <Link to="/analysis">
            <Button size="lg" variant="secondary" className="shadow-xl hover:scale-105 transition-transform duration-200">
              🚀 เริ่มวิเคราะห์เลย
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2">
            <CardHeader className="pb-3">
              <CardDescription className="text-base font-medium">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-extrabold ${stat.color} drop-shadow-md`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          คุณสมบัติหลัก
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.href}>
              <Card className="h-full transition-all hover:shadow-2xl hover:scale-105 hover:border-purple-400 border-2 group">
                <CardHeader className="pb-6">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Start Guide */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl">📚 เริ่มต้นใช้งาน</CardTitle>
          <CardDescription className="text-base">
            ปฏิบัติตามขั้นตอนง่าย ๆ เพื่อเริ่มต้นใช้งานระบบ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-bold shadow-lg">
              1
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">⚙️ ตั้งค่า API Tokens</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ไปที่หน้า Settings เพื่อกำหนดค่า Facebook Access Token และ API อื่น ๆ
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-lg font-bold shadow-lg">
              2
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">🔍 เริ่มวิเคราะห์โพสต์</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ไปที่หน้า Analysis ใส่ URL หรือ Post ID เพื่อเริ่มตรวจสอบ
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold shadow-lg">
              3
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">📊 ดูผลลัพธ์และรายงาน</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ตรวจสอบผลการวิเคราะห์ที่ Dashboard และส่งออกรายงานได้ที่หน้า Reports
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
