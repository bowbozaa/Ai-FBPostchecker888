import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, TrendingUp, Shield, AlertTriangle, RefreshCw } from 'lucide-react';
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
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              Facebook Post Risk Monitor
            </h1>
            <p className="text-gray-600">
              ระบบตรวจจับและวิเคราะห์ความเสี่ยงของโพสต์ Facebook แบบเรียลไทม์
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">รีเฟรช</span>
          </button>
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
    </div>
  );
}
