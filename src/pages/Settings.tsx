import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Save, Plus, X, AlertCircle } from 'lucide-react'

interface Config {
  bannedKeywords: string[]
  highRiskTerms: string[]
  pageId: string
  checkInterval: number
}

export function Settings() {
  const [config, setConfig] = useState<Config>({
    bannedKeywords: ['sale', 'limited', 'offer', 'urgent', 'free'],
    highRiskTerms: ['alert', 'warning', 'urgent', 'act now'],
    pageId: 'your-page-id',
    checkInterval: 30,
  })
  const [newKeyword, setNewKeyword] = useState('')
  const [newRiskTerm, setNewRiskTerm] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save to backend API
    console.log('Saving config:', config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !config.bannedKeywords.includes(newKeyword.trim().toLowerCase())) {
      setConfig({
        ...config,
        bannedKeywords: [...config.bannedKeywords, newKeyword.trim().toLowerCase()],
      })
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setConfig({
      ...config,
      bannedKeywords: config.bannedKeywords.filter((k) => k !== keyword),
    })
  }

  const addRiskTerm = () => {
    if (newRiskTerm.trim() && !config.highRiskTerms.includes(newRiskTerm.trim().toLowerCase())) {
      setConfig({
        ...config,
        highRiskTerms: [...config.highRiskTerms, newRiskTerm.trim().toLowerCase()],
      })
      setNewRiskTerm('')
    }
  }

  const removeRiskTerm = (term: string) => {
    setConfig({
      ...config,
      highRiskTerms: config.highRiskTerms.filter((t) => t !== term),
    })
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">
          Configure monitoring rules and banned keywords
        </p>
      </div>

      {/* Save Success Message */}
      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
          <AlertCircle className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      {/* Facebook Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Facebook Configuration</CardTitle>
          <CardDescription>
            Configure your Facebook page settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook Page ID
              </label>
              <input
                type="text"
                value={config.pageId}
                onChange={(e) => setConfig({ ...config, pageId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Facebook Page ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can find your Page ID in Facebook's Page Settings
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check Interval (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="1440"
                value={config.checkInterval}
                onChange={(e) => setConfig({ ...config, checkInterval: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                How often to check for new posts (5-1440 minutes)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banned Keywords */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Banned Keywords</CardTitle>
          <CardDescription>
            Posts containing these keywords will be flagged
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add new keyword */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                placeholder="Add new keyword..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addKeyword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Keywords list */}
            <div className="flex flex-wrap gap-2">
              {config.bannedKeywords.map((keyword) => (
                <div
                  key={keyword}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200"
                >
                  <span className="text-sm">{keyword}</span>
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="hover:bg-red-200 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Terms */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>High Risk Terms</CardTitle>
          <CardDescription>
            Posts with these terms will be classified as high risk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add new risk term */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newRiskTerm}
                onChange={(e) => setNewRiskTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRiskTerm()}
                placeholder="Add new high risk term..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addRiskTerm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Risk terms list */}
            <div className="flex flex-wrap gap-2">
              {config.highRiskTerms.map((term) => (
                <div
                  key={term}
                  className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200"
                >
                  <span className="text-sm">{term}</span>
                  <button
                    onClick={() => removeRiskTerm(term)}
                    className="hover:bg-yellow-200 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
