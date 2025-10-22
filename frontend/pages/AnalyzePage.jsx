import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnalyzePage() {
  const [postText, setPostText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzePost = async () => {
    if (!postText.trim()) {
      alert('กรุณาใส่ข้อความโพสต์');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock analysis result
      const hasKeywords = postText.toLowerCase().includes('sale') ||
                         postText.toLowerCase().includes('urgent') ||
                         postText.toLowerCase().includes('alert');

      const risk = hasKeywords
        ? postText.toLowerCase().includes('urgent') || postText.toLowerCase().includes('alert')
          ? 'high'
          : 'medium'
        : 'low';

      setResult({
        flagged: hasKeywords,
        risk: risk,
        keywords: hasKeywords ? ['sale', 'urgent'].filter(k => postText.toLowerCase().includes(k)) : [],
        message: postText,
      });
      setLoading(false);
    }, 1500);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskLabel = (risk) => {
    switch (risk) {
      case 'high': return 'ความเสี่ยงสูง';
      case 'medium': return 'ความเสี่ยงปานกลาง';
      case 'low': return 'ความเสี่ยงต่ำ';
      default: return 'ไม่ทราบ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            <FileSearch className="h-8 w-8 text-blue-600" />
            วิเคราะห์โพสต์ Facebook
          </h1>
          <p className="text-gray-600">
            ตรวจสอบความเสี่ยงและคำต้องห้ามในโพสต์ของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ข้อความโพสต์
              </label>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="วางข้อความโพสต์ที่ต้องการตรวจสอบที่นี่..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={analyzePost}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>กำลังวิเคราะห์...</span>
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  <span>วิเคราะห์โพสต์</span>
                </>
              )}
            </button>

            {/* Quick Examples */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">ตัวอย่างข้อความ:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPostText('Big sale today! Limited offer!')}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  ตัวอย่าง 1
                </button>
                <button
                  onClick={() => setPostText('Urgent alert: Act now!')}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  ตัวอย่าง 2
                </button>
                <button
                  onClick={() => setPostText('Hello everyone! Have a great day!')}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  ตัวอย่าง 3
                </button>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ผลการวิเคราะห์</h2>

            {!result ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <FileText className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-center">
                  กรุณาใส่ข้อความและกดปุ่ม "วิเคราะห์โพสต์"
                  <br />
                  เพื่อดูผลลัพธ์
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Risk Level */}
                <div className={`p-4 rounded-lg border-2 ${getRiskColor(result.risk)}`}>
                  <div className="flex items-center gap-3">
                    {result.risk === 'high' && <AlertTriangle className="h-6 w-6" />}
                    {result.risk === 'medium' && <AlertTriangle className="h-6 w-6" />}
                    {result.risk === 'low' && <CheckCircle className="h-6 w-6" />}
                    <div>
                      <p className="font-bold text-lg">{getRiskLabel(result.risk)}</p>
                      <p className="text-sm opacity-75">
                        {result.flagged ? 'ตรวจพบคำต้องห้าม' : 'ไม่พบคำต้องห้าม'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flagged Keywords */}
                {result.keywords.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      คำที่ตรวจพบ:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    คำแนะนำ:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {result.risk === 'high' && (
                      <>
                        <li>• ควรแก้ไขข้อความก่อนโพสต์</li>
                        <li>• หลีกเลี่ยงคำที่สร้างความเร่งด่วน</li>
                      </>
                    )}
                    {result.risk === 'medium' && (
                      <>
                        <li>• พิจารณาแก้ไขข้อความบางส่วน</li>
                        <li>• ตรวจสอบว่าเป็นไปตามนโยบาย</li>
                      </>
                    )}
                    {result.risk === 'low' && (
                      <>
                        <li>• ข้อความปลอดภัย สามารถโพสต์ได้</li>
                        <li>• ไม่พบปัญหาที่เป็นความเสี่ยง</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setResult(null);
                      setPostText('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ล้างข้อมูล
                  </button>
                  <button
                    onClick={analyzePost}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    วิเคราะห์อีกครั้ง
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
