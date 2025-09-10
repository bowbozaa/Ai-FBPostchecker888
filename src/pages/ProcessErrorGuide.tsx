/**
 * ProcessErrorGuide - Comprehensive troubleshooting guide for "process is not defined" error
 * ปรับให้รองรับ Dark/Light ดีขึ้น และแก้ปุ่ม outline ให้โปร่งใสตามกฎ
 */

import { useState, useEffect } from 'react'
import { AlertTriangle, Code, Terminal, HelpCircle, ChevronUp, Copy, Check, ExternalLink, BookOpen, Zap, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ProcessErrorGuide() {
  const [activeSection, setActiveSection] = useState('overview')
  const [copiedCode, setCopiedCode] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  /**
   * Handle scroll events to show/hide scroll-to-top button and update active section
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)

      const sections = ['overview', 'causes', 'frontend', 'backend', 'faq']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Copy code to clipboard with visual feedback
   */
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  /**
   * Smooth scroll to section
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /**
   * Scroll to top
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      {/* Fixed Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-200 dark:border-red-500/30">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Process Error Guide</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Technical Troubleshooting Documentation</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'causes', label: 'Causes', icon: AlertTriangle },
                { id: 'frontend', label: 'Frontend', icon: Code },
                { id: 'backend', label: 'Backend', icon: Terminal },
                { id: 'faq', label: 'FAQ', icon: HelpCircle },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  variant={activeSection === id ? 'default' : 'ghost'}
                  size="sm"
                  className={`transition-all duration-200 ${
                    activeSection === id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Overview Section */}
          <section id="overview" className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-red-500/10 border border-red-200 dark:border-red-500/30">
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Process Error Troubleshooting</h2>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive guide to understanding and fixing the "Uncaught ReferenceError: process is not defined" error in JavaScript
                applications.
              </p>
            </div>

            {/* Error Display */}
            <Card className="mb-8 border-red-200 bg-red-50/50 dark:border-red-500/30 dark:bg-red-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <Code className="w-5 h-5" />
                  Error Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Console Error:</span>
                    <Button
                      onClick={() => copyToClipboard('Uncaught ReferenceError: process is not defined', 'error')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'error' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="text-red-400">
                    Uncaught ReferenceError: process is not defined<br />
                    <span className="text-gray-500">    at Object.&lt;anonymous&gt; (app.js:1:1)</span>
                    <br />
                    <span className="text-gray-500">    at Module._compile (internal/modules/cjs/loader.js:1063:30)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/10">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Most Common</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Browser environment trying to access Node.js globals</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-500/30 dark:bg-orange-500/10">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Easy Fix</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Usually resolved with proper environment configuration</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50/50 dark:border-green-500/30 dark:bg-green-500/10">
                <CardContent className="p-6 text-center">
                  <Terminal className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Prevention</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Proper tooling setup prevents most occurrences</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Common Causes Section */}
          <section id="causes" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              Common Causes
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200 dark:border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">Browser Environment Issues</CardTitle>
                  <CardDescription className="dark:text-gray-300">When browser tries to access Node.js globals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="destructive" className="mt-1">
                        1
                      </Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Node.js modules in browser</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Importing Node.js-specific packages client-side</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="destructive" className="mt-1">
                        2
                      </Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Missing polyfills</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Build tools not providing browser alternatives</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="destructive" className="mt-1">
                        3
                      </Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Incorrect bundler config</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Webpack/Vite not configured for browser target</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-300">Build Tool Configuration</CardTitle>
                  <CardDescription className="dark:text-gray-300">Improper setup of development tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">1</Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Missing define statements</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">No process.env definitions in build config</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">2</Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Server-side rendering</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Hydration issues with SSR frameworks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">3</Badge>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Package compatibility</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Using packages that require Node.js environment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Frontend Solutions Section */}
          <section id="frontend" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Frontend Solutions
            </h2>

            <div className="space-y-8">
              {/* React/Vite Solution */}
              <Card className="border-blue-200 dark:border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    React + Vite Configuration
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">Most common setup for modern React applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">1. Configure vite.config.js:</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
    }
  }
})`,
                            'vite-config'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'vite-config' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
    }
  }
})`}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">2. Install browser polyfills:</p>
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() => copyToClipboard('npm install --save-dev process', 'npm-process')}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'npm-process' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>npm install --save-dev process</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Webpack Solution */}
              <Card className="border-purple-200 dark:border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Webpack Configuration
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">For projects using Webpack bundler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">Configure webpack.config.js:</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `const webpack = require('webpack')

module.exports = {
  // ... other config
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  resolve: {
    fallback: {
      process: require.resolve('process/browser')
    }
  }
}`,
                            'webpack-config'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'webpack-config' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`const webpack = require('webpack')

module.exports = {
  // ... other config
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  resolve: {
    fallback: {
      process: require.resolve('process/browser')
    }
  }
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Fix Solution */}
              <Card className="border-green-200 dark:border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Code-Level Fixes
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">Direct code modifications when build config can't be changed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">1. Add process check:</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `// At the top of your main JS file
if (typeof process === 'undefined') {
  (window as any).process = { env: {} }
}

// Or for specific checks
const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'`,
                            'code-fix'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'code-fix' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`// At the top of your main JS file
if (typeof process === 'undefined') {
  (window as any).process = { env: {} }
}

// Or for specific checks
const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'`}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">2. Environment variable access:</p>
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `// Safe environment variable access
const getEnvVar = (key, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue
  }
  return defaultValue
}

// Usage
const apiUrl = getEnvVar('REACT_APP_API_URL', 'http://localhost:3000')`,
                            'env-access'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'env-access' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`// Safe environment variable access
const getEnvVar = (key, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue
  }
  return defaultValue
}

// Usage
const apiUrl = getEnvVar('REACT_APP_API_URL', 'http://localhost:3000')`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Backend Solutions Section */}
          <section id="backend" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-green-600 dark:text-green-400" />
              Backend Solutions
            </h2>

            <div className="space-y-8">
              {/* Node.js Solution */}
              <Card className="border-green-200 dark:border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Node.js Environment Setup
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">Ensuring proper Node.js environment configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">1. Check Node.js version:</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `node --version
npm --version

# Ensure you're using a supported version
# Node.js 14+ is recommended`,
                            'node-version'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'node-version' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`node --version
npm --version

# Ensure you're using a supported version
# Node.js 14+ is recommended`}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">2. Package.json configuration:</p>
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `{
  "name": "your-app",
  "type": "module",
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "node --inspect index.js"
  }
}`,
                            'package-json'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'package-json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`{
  "name": "your-app",
  "type": "module",
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "node --inspect index.js"
  }
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SSR Solutions */}
              <Card className="border-indigo-200 dark:border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Server-Side Rendering (SSR)
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">Next.js, Nuxt.js, and other SSR frameworks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">Next.js configuration:</p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        process: false,
      }
    }
    return config
  }
}`,
                            'nextjs-config'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'nextjs-config' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        process: false,
      }
    }
    return config
  }
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 dark:text-white mb-2">Dynamic imports for client-side only:</p>
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `// Use dynamic imports for browser-only code
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('browser-only-library').then((module) => {
      // Use the library here
    })
  }
}, [])

// Or with Next.js dynamic imports
import dynamic from 'next/dynamic'

const BrowserOnlyComponent = dynamic(
  () => import('./BrowserOnlyComponent'),
  { ssr: false }
)`,
                            'dynamic-imports'
                          )
                        }
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'dynamic-imports' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <pre>{`// Use dynamic imports for browser-only code
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('browser-only-library').then((module) => {
      // Use the library here
    })
  }
}, [])

// Or with Next.js dynamic imports
import dynamic from 'next/dynamic'

const BrowserOnlyComponent = dynamic(
  () => import('./BrowserOnlyComponent'),
  { ssr: false }
)`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Why does this error only happen in the browser?',
                  a: "The 'process' object is a Node.js global that doesn't exist in browser environments. When JavaScript code designed for Node.js runs in a browser, it can't find this global object, causing the ReferenceError.",
                },
                {
                  q: 'Can I just define window.process = {} to fix it?',
                  a: "This is a quick workaround but not recommended for production. It's better to properly configure your build tools or use environment-specific code. However, for debugging, you can temporarily add this to your index.html.",
                },
                {
                  q: 'Which packages commonly cause this error?',
                  a: 'Common culprits include: crypto-js (older versions), node-fetch, fs-extra, path, os, and any package that uses Node.js built-in modules. Always check if there is a browser-compatible version or alternative.',
                },
                {
                  q: 'How do I know if a package is browser-compatible?',
                  a: "Check the package's documentation, look for 'browser' field in package.json, or see if it has separate builds for browser/node. Packages with '.browser.js' files usually support browsers.",
                },
                {
                  q: "What's the difference between process.env in Node.js vs browser?",
                  a: "In Node.js, process.env contains actual environment variables. In browsers, build tools like Webpack or Vite replace process.env.VARIABLE_NAME with the actual values at build time.",
                },
                {
                  q: 'Why do some tutorials work but not in my environment?',
                  a: 'Tutorials often use different build tools, Node.js versions, or framework configurations. The solution depends on your specific setup (Create React App, Vite, Next.js, etc.).',
                },
                {
                  q: 'How can I prevent this error in future projects?',
                  a: 'Use modern build tools with proper browser polyfills, separate client/server code clearly, use environment detection patterns, and choose browser-compatible packages when possible.',
                },
                {
                  q: 'Is this error related to CORS or security issues?',
                  a: "No, this is purely a JavaScript environment compatibility issue. It's not related to Cross-Origin Resource Sharing or browser security policies.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-start gap-2">
                      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 mt-1">{index + 1}</Badge>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-8">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Additional Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Additional Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow dark:border-blue-500/30">
                <CardContent className="p-6">
                  <ExternalLink className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Webpack Documentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Official guide on configuring polyfills and fallbacks</p>
                  <Button variant="outline" size="sm" className="bg-transparent text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-500/30">
                    Visit Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow dark:border-green-500/30">
                <CardContent className="p-6">
                  <ExternalLink className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Vite Configuration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Modern build tool configuration for browser compatibility</p>
                  <Button variant="outline" size="sm" className="bg-transparent text-green-600 dark:text-green-300 border-green-200 dark:border-green-500/30">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 hover:shadow-lg transition-shadow dark:border-purple-500/30">
                <CardContent className="p-6">
                  <ExternalLink className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Browser Polyfills</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Understanding and implementing browser polyfills</p>
                  <Button variant="outline" size="sm" className="bg-transparent text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
