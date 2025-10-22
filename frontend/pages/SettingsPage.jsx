import React, { useState } from 'react';
import { ArrowLeft, Settings, Save, Key, Bell, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const [keywords, setKeywords] = useState('sale, urgent, alert, ban');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert('บันทึกการตั้งค่าสำเร็จ!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
            <Settings className="h-8 w-8 text-gray-600" />
            การตั้งค่า
          </h1>
          <p className="text-gray-600">
            จัดการการตั้งค่าระบบและการแจ้งเตือน
          </p>
        </div>

        <div className="max-w-3xl">
          {/* Keywords Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Key className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">คำต้องห้าม</h2>
                <p className="text-sm text-gray-600">กำหนดคำที่ต้องการตรวจจับ</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รายการคำต้องห้าม (คั่นด้วยเครื่องหมายจุลภาค)
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
                placeholder="sale, urgent, alert, ban"
              />
              <p className="text-xs text-gray-500 mt-2">
                ระบบจะตรวจจับคำเหล่านี้ในโพสต์ Facebook
              </p>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">การแจ้งเตือน</h2>
                <p className="text-sm text-gray-600">จัดการการแจ้งเตือนผ่าน LINE</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">เปิดการแจ้งเตือน LINE</p>
                  <p className="text-sm text-gray-500">รับการแจ้งเตือนเมื่อพบโพสต์ที่มีความเสี่ยง</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">การเชื่อมต่อ API</h2>
                <p className="text-sm text-gray-600">สถานะการเชื่อมต่อกับบริการต่างๆ</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Facebook API</span>
                </div>
                <span className="text-xs text-green-700 font-medium">เชื่อมต่อแล้ว</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">LINE Notify</span>
                </div>
                <span className="text-xs text-green-700 font-medium">เชื่อมต่อแล้ว</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Google Sheets</span>
                </div>
                <span className="text-xs text-green-700 font-medium">เชื่อมต่อแล้ว</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
            >
              ยกเลิก
            </Link>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Save className="h-5 w-5" />
              บันทึกการตั้งค่า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
