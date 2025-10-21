import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Search, RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react'
import { formatDate, getRiskColor } from '../lib/utils'
import { api, Post } from '../lib/api'

export function PostMonitor() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [error, setError] = useState<string | null>(null)

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.getPosts({
        risk: filterRisk !== 'all' ? filterRisk : undefined,
        limit: 50
      })

      setPosts(response.posts)
    } catch (err) {
      setError('Failed to load posts. Make sure the API server is running.')
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [filterRisk])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post Monitor</h1>
        <p className="text-gray-500 mt-2">
          Real-time monitoring of Facebook posts and risk analysis
        </p>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Risk Filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Risks</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={loadPosts}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <AlertTriangle className="w-5 h-5 inline mr-2" />
          {error}
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">
                  No posts found matching your criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className={getRiskColor(post.risk)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          post.risk === 'high'
                            ? 'high'
                            : post.risk === 'medium'
                            ? 'medium'
                            : 'low'
                        }
                      >
                        {post.risk.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-gray-700">
                        {post.from}
                      </span>
                      <span className="text-xs text-gray-500">
                        {post.type}
                      </span>
                    </div>
                    <a
                      href={`https://facebook.com/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                    >
                      View on FB
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-gray-900 mb-4">{post.message}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {post.keywords.length > 0 && (
                        <>
                          <span className="text-gray-500 font-medium">
                            Flagged keywords:
                          </span>
                          <div className="flex gap-1">
                            {post.keywords.map((keyword, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <span className="text-gray-500">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Summary */}
      {!loading && filteredPosts.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredPosts.length} of {posts.length} posts
        </div>
      )}
    </div>
  )
}
