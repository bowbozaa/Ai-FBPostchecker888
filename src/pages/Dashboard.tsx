import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export default function Dashboard() {
  const { stats, results } = useAnalysisStore();
  const recentResults = results.slice(0, 10);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📊 Dashboard
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          ภาพรวมการวิเคราะห์โพสต์ Facebook ทั้งหมด
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-200">
          <CardHeader className="pb-3 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardDescription className="text-base font-semibold text-blue-600">
              📝 โพสต์ทั้งหมด
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-blue-600 drop-shadow-md">
              {stats.totalPosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-red-200">
          <CardHeader className="pb-3 bg-gradient-to-br from-red-50 to-red-100">
            <CardDescription className="text-base font-semibold text-red-600">
              ⚠️ พบความเสี่ยง
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-red-600 drop-shadow-md">
              {stats.riskyPosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-green-200">
          <CardHeader className="pb-3 bg-gradient-to-br from-green-50 to-green-100">
            <CardDescription className="text-base font-semibold text-green-600">
              ✅ ปลอดภัย
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-green-600 drop-shadow-md">
              {stats.safePosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-yellow-200">
          <CardHeader className="pb-3 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardDescription className="text-base font-semibold text-yellow-600">
              ⏳ รอตรวจสอบ
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-yellow-600 drop-shadow-md">
              {stats.pendingPosts}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">🕐 กิจกรรมล่าสุด</CardTitle>
              <CardDescription className="text-base mt-1">
                โพสต์ที่ตรวจสอบล่าสุด 10 รายการ
              </CardDescription>
            </div>
            <Link to="/analysis">
              <Button variant="outline" className="bg-white">
                + วิเคราะห์ใหม่
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {recentResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl font-semibold text-muted-foreground mb-2">
                ยังไม่มีข้อมูลการวิเคราะห์
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                เริ่มต้นโดยการวิเคราะห์โพสต์ Facebook ของคุณ
              </p>
              <Link to="/analysis">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  🚀 เริ่มวิเคราะห์เลย
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div
                  key={result.postId + result.timestamp}
                  className="flex items-center justify-between p-5 border-2 rounded-xl hover:shadow-lg transition-all hover:scale-102"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {result.status === 'safe' && '✅'}
                        {result.status === 'risky' && '⚠️'}
                        {result.status === 'dangerous' && '🚨'}
                      </span>
                      <div>
                        <p className="font-bold text-lg">Post ID: {result.postId}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(result.timestamp).toLocaleString('th-TH')}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      {result.message}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        result.status === 'safe'
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'risky'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.riskScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
