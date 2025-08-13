import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Search, 
  TrendingUp, 
  Shield, 
  Radar, 
  Database,
  Globe,
  Zap,
  Activity,
  Users,
  Target,
  Eye,
  Network,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Bell,
  Download,
  Share2,
  BookOpen,
  Briefcase,
  Lock,
  Award,
  Layers,
  Command,
  Terminal,
  Code,
  Cpu,
  HardDrive,
  Wifi,
  Server,
  MessageSquare,
  LogOut,
  User,
  HelpCircle
} from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import GoBackButton from '@/components/ui/go-back-button';
import TutorialOverlay from '@/components/ui/tutorial-overlay';

interface SystemMetric {
  label: string;
  value: string | number;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
}

interface PlatformModule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'standby' | 'maintenance';
  icon: React.ElementType;
  path: string;
  color: string;
  gradient: string;
  capabilities: string[];
  performance: number;
}

export default function PremiumDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<'online' | 'maintenance' | 'offline'>('online');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Platform modules
  const platformModules: PlatformModule[] = [
    {
      id: 'reconnaissance',
      name: 'Deep Research Intelligence',
      description: 'Advanced OSINT platform with AI-powered analysis and human-like intelligence gathering capabilities',
      status: 'active',
      icon: Radar,
      path: '/reconnaissance',
      color: 'blue',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      capabilities: ['Multi-Source OSINT', 'Pattern Recognition', 'Threat Assessment', 'Intelligence Synthesis'],
      performance: 98.7
    },
    {
      id: 'business',
      name: 'Business Intelligence Hub',
      description: 'IntelSphere unified platform with 14 specialized modules for comprehensive business intelligence',
      status: 'active',
      icon: TrendingUp,
      path: '/business-hub-unified',
      color: 'emerald',
      gradient: 'from-emerald-600 via-green-600 to-teal-700',
      capabilities: ['IntelSphere Dashboard', 'Live Market Data', '14 Intelligence Modules', 'Real-time Analytics'],
      performance: 96.3
    },
    {
      id: 'ai-center',
      name: 'AI Command Center',
      description: 'Multi-model AI orchestration with Claude, GPT-4, and Gemini integration for advanced reasoning',
      status: 'active',
      icon: Brain,
      path: '/ai-center',
      color: 'orange',
      gradient: 'from-orange-600 via-red-600 to-pink-700',
      capabilities: ['Multi-Model AI', 'Advanced Reasoning', 'Task Orchestration', 'Quality Synthesis'],
      performance: 99.1
    },
    {
      id: 'intelsphere',
      name: 'IntelSphere Unified Platform',
      description: 'Comprehensive intelligence command center with 15 specialized modules and real-time analytics',
      status: 'active',
      icon: Network,
      path: '/intelsphere',
      color: 'purple',
      gradient: 'from-purple-600 via-violet-600 to-indigo-700',
      capabilities: ['Unified Intelligence', '15 Specialized Modules', 'Real-time Analytics', 'Interactive Networks'],
      performance: 97.8
    },
    {
      id: 'ai-assistant',
      name: 'AI Intelligence Assistant',
      description: 'Advanced conversational AI with multi-model intelligence, voice capabilities, and human-like interactions',
      status: 'active',
      icon: MessageSquare,
      path: '/ai-assistant',
      color: 'cyan',
      gradient: 'from-cyan-600 via-blue-600 to-indigo-700',
      capabilities: ['Multi-Model AI', 'Voice Recognition', 'Natural Language', 'Expert Personalities'],
      performance: 98.5
    }
  ];

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  // Tutorial steps for dashboard
  const tutorialSteps = [
    {
      title: "Welcome to Elite Intelligence Operations",
      content: `
        <p>This is your main dashboard where you can access all intelligence modules.</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>System Metrics:</strong> Monitor platform performance</li>
          <li>• <strong>5 Core Modules:</strong> Access specialized intelligence tools</li>
          <li>• <strong>Real-time Status:</strong> View operational status</li>
        </ul>
      `
    },
    {
      title: "System Performance Monitoring",
      content: `
        <p>The system metrics section shows real-time performance data:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>CPU Performance:</strong> Processing power usage</li>
          <li>• <strong>Memory Usage:</strong> RAM consumption</li>
          <li>• <strong>Network Latency:</strong> Connection speed</li>
          <li>• <strong>Active Sessions:</strong> Current user activity</li>
        </ul>
      `
    },
    {
      title: "Intelligence Modules Overview",
      content: `
        <p>Five specialized modules for comprehensive intelligence:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>Deep Research Intelligence:</strong> Advanced OSINT platform</li>
          <li>• <strong>Business Intelligence Hub:</strong> Market analysis tools</li>
          <li>• <strong>AI Command Center:</strong> Multi-model AI orchestration</li>
          <li>• <strong>IntelSphere Platform:</strong> Unified intelligence center</li>
          <li>• <strong>AI Assistant:</strong> Conversational intelligence</li>
        </ul>
      `
    },
    {
      title: "Navigation and Features",
      content: `
        <p>Navigate efficiently through the platform:</p>
        <ul style="margin-top: 10px;">
          <li>• Click any module card to access detailed features</li>
          <li>• Use the help button for tutorials</li>
          <li>• Monitor system status in the header</li>
          <li>• Access user controls in the top-right corner</li>
        </ul>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
        
        {/* Dynamic Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#line-gradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <div className="absolute top-4 left-4 z-50">
          <GoBackButton showHomeButton={false} />
        </div>

        {/* Premium Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="border-b border-white/10 backdrop-blur-2xl bg-white/5 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </motion.div>
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Elite Intelligence Operations
                  </h1>
                  <p className="text-gray-400 text-sm font-medium">
                    5-Core Unified Intelligence Platform • Deep Research • Business Hub • AI Center • IntelSphere • AI Assistant
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {/* User Authentication Status */}
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">Welcome, {user.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
                
                {/* System Status */}
                <div className="flex items-center space-x-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-green-400 font-semibold text-sm">All Systems Operational</span>
                </div>
                
                {/* Current Time */}
                <div className="px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                  <span className="text-gray-300 font-mono text-sm">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour12: false,
                      timeZoneName: 'short'
                    })}
                  </span>
                </div>
                
                {/* Controls */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTutorial(true)}
                    className="p-3 bg-purple-800/50 border border-purple-700/50 rounded-xl backdrop-blur-sm hover:bg-purple-700/50 transition-all"
                  >
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:bg-gray-700/50 transition-all"
                  >
                    <Bell className="w-5 h-5 text-gray-400" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:bg-gray-700/50 transition-all"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                  </motion.button>
                  
                  {isAuthenticated && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className="p-3 bg-red-800/50 border border-red-700/50 rounded-xl backdrop-blur-sm hover:bg-red-700/50 transition-all"
                    >
                      <LogOut className="w-5 h-5 text-red-400" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          {/* Welcome Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Elite Intelligence Operations
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Advanced reconnaissance, real-time business intelligence, and AI-powered analysis unified in a military-grade platform designed for professionals who demand excellence.
            </p>
          </motion.section>



          {/* Platform Modules */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {platformModules.map((module, index) => {
                const IconComponent = module.icon;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                    onHoverStart={() => setSelectedModule(module.id)}
                    onHoverEnd={() => setSelectedModule(null)}
                    className="group relative"
                  >
                    <Link href={module.path}>
                      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${module.gradient} p-1 transition-all duration-500 hover:scale-105 cursor-pointer`}>
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 h-full border border-white/10">
                          {/* Status indicator */}
                          <div className="absolute top-6 right-6 flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              module.status === 'active' ? 'bg-green-400 animate-pulse' :
                              module.status === 'standby' ? 'bg-yellow-400' :
                              'bg-gray-400'
                            }`}></div>
                            <span className="text-xs text-gray-400 uppercase font-medium">
                              {module.status}
                            </span>
                          </div>
                          
                          {/* Icon */}
                          <div className="mb-6">
                            <div className="p-4 bg-white/10 rounded-2xl w-fit backdrop-blur-sm">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                            {module.name}
                          </h3>
                          
                          <p className="text-white/80 text-sm mb-6 leading-relaxed">
                            {module.description}
                          </p>
                          
                          {/* Capabilities */}
                          <div className="mb-6">
                            <div className="grid grid-cols-2 gap-2">
                              {module.capabilities.map((capability, capIndex) => (
                                <div
                                  key={capability}
                                  className="text-xs px-3 py-2 bg-white/10 rounded-lg text-white/90 backdrop-blur-sm"
                                >
                                  {capability}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Performance */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/60 text-sm">Performance</span>
                              <span className="text-white font-bold">{module.performance}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${module.performance}%` }}
                                transition={{ duration: 1, delay: 1 + index * 0.2 }}
                              />
                            </div>
                          </div>
                          
                          {/* Action */}
                          <div className="flex items-center justify-between">
                            <span className="text-white/80 text-sm font-medium">Access Module</span>
                            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                          
                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-5 animate-ping"></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Advanced Analytics */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-20"
          >
            <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">System Intelligence</h3>
                  <p className="text-gray-400">Real-time platform analytics and performance monitoring</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                  >
                    <Download className="w-4 h-4 mr-2 inline" />
                    Export Report
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-all"
                  >
                    <Share2 className="w-4 h-4 mr-2 inline" />
                    Share
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Active Operations', value: '847', icon: Activity, color: 'blue' },
                  { label: 'Data Processed', value: '12.7TB', icon: Database, color: 'green' },
                  { label: 'Intelligence Sources', value: '156', icon: Globe, color: 'purple' },
                  { label: 'Security Score', value: 'A+', icon: Shield, color: 'orange' }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.1 }}
                      className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all"
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 bg-${stat.color}-500/20 rounded-2xl flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 text-${stat.color}-400`} />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        </main>
      </div>

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="Elite Intelligence Operations Dashboard"
      />

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}