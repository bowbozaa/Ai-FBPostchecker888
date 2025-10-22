import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RecentPosts from '../components/RecentPosts';
import RiskChart from '../components/RiskChart';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    flaggedPosts: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API or mock data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch real data from API
      const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';

      const [statsResponse, postsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/stats`),
        fetch(`${API_BASE_URL}/api/recent-posts`),
      ]);

      if (statsResponse.ok && postsResponse.ok) {
        const statsData = await statsResponse.json();
        const postsData = await postsResponse.json();

        setStats(statsData);
        setRecentPosts(postsData);
      } else {
        // Fallback to mock data if API fails
        console.warn('API request failed, using mock data');
        useMockData();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data on error
      useMockData();
      setLoading(false);
    }
  };

  const useMockData = () => {
    const mockStats = {
      totalPosts: 150,
      flaggedPosts: 12,
      highRisk: 3,
      mediumRisk: 5,
      lowRisk: 4,
    };

    const mockPosts = [
      {
        id: '1',
        message: 'Example post with banned keyword: sale',
        risk: 'high',
        flaggedKeywords: ['sale'],
        createdTime: new Date().toISOString(),
      },
      {
        id: '2',
        message: 'Another post content',
        risk: 'medium',
        flaggedKeywords: ['urgent'],
        createdTime: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '3',
        message: 'Low risk post',
        risk: 'low',
        flaggedKeywords: [],
        createdTime: new Date(Date.now() - 7200000).toISOString(),
      },
    ];

    setStats(mockStats);
    setRecentPosts(mockPosts);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          Facebook Post Risk Monitor
        </h1>
        <p className="text-gray-600 mt-2">
          ระบบตรวจจับและวิเคราะห์ความเสี่ยงของโพสต์ Facebook แบบเรียลไทม์
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="โพสต์ทั้งหมด"
          value={stats.totalPosts}
          icon={<Activity className="h-6 w-6" />}
          color="blue"
        />
        <StatsCard
          title="โพสต์ที่ถูกตรวจพบ"
          value={stats.flaggedPosts}
          icon={<AlertCircle className="h-6 w-6" />}
          color="yellow"
        />
        <StatsCard
          title="ความเสี่ยงสูง"
          value={stats.highRisk}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="red"
        />
        <StatsCard
          title="อัตราการตรวจพบ"
          value={`${((stats.flaggedPosts / stats.totalPosts) * 100).toFixed(1)}%`}
          icon={<TrendingUp className="h-6 w-6" />}
          color="green"
        />
      </div>

      {/* Charts and Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskChart stats={stats} />
        <RecentPosts posts={recentPosts} />
      </div>
    </div>
  );
}
