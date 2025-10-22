import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const riskColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const riskLabels = {
  high: 'สูง',
  medium: 'ปานกลาง',
  low: 'ต่ำ',
};

export default function RecentPosts({ posts }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    return `${diffDays} วันที่แล้ว`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        โพสต์ล่าสุดที่ตรวจพบ
      </h2>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">ไม่มีโพสต์ที่ตรวจพบ</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskColors[post.risk]}`}>
                  ความเสี่ยง: {riskLabels[post.risk]}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(post.createdTime)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                {post.message}
              </p>
              {post.flaggedKeywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.flaggedKeywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
