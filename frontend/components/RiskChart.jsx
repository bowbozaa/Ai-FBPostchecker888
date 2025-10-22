import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart2 } from 'lucide-react';

const COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

export default function RiskChart({ stats }) {
  const data = [
    { name: 'ความเสี่ยงสูง', value: stats.highRisk, color: COLORS.high },
    { name: 'ความเสี่ยงปานกลาง', value: stats.mediumRisk, color: COLORS.medium },
    { name: 'ความเสี่ยงต่ำ', value: stats.lowRisk, color: COLORS.low },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart2 className="h-5 w-5" />
        การกระจายตามระดับความเสี่ยง
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
          <p className="text-xs text-gray-600">สูง</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-600">{stats.mediumRisk}</p>
          <p className="text-xs text-gray-600">ปานกลาง</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{stats.lowRisk}</p>
          <p className="text-xs text-gray-600">ต่ำ</p>
        </div>
      </div>
    </div>
  );
}
