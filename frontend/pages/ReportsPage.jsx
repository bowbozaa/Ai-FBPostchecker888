import React from 'react';
import { ArrowLeft, BarChart3, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">ย้อนกลับ</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            รายงานและสถิติ
          </h1>
          <p className="text-gray-600">
            ดูรายงานสรุปและสถิติการตรวจสอบโพสต์
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="inline-flex p-4 bg-purple-100 rounded-full">
                <BarChart3 className="h-16 w-16 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ฟีเจอร์รายงานกำลังจะมาเร็วๆ นี้
            </h2>
            <p className="text-gray-600 mb-6">
              เรากำลังพัฒนาระบบรายงานที่ครบถ้วน รวมถึง:
            </p>
            <ul className="text-left text-gray-700 space-y-2 mb-8 max-w-sm mx-auto">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                รายงานรายวัน/รายสัปดาห์/รายเดือน
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                กราฟแสดงแนวโน้มการตรวจพบ
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                Export เป็น PDF/Excel
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                การวิเคราะห์เชิงลึก
              </li>
            </ul>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
