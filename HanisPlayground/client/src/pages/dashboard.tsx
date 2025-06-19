import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Search, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Target, 
  Radar, 
  Database,
  Globe,
  Shield,
  Zap,
  Activity,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
  Eye,
  Network,
  Bot
} from 'lucide-react';
import { Link } from 'wouter';
import GoBackButton from '@/components/ui/go-back-button';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  gradient: string;
  stats?: {
    label: string;
    value: string;
  };
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const dashboardSections: DashboardCard[] = [
    {
      id: 'reconnaissance',
      title: 'Deep Research Intelligence',
      description: 'Advanced OSINT platform with human-like analytical capabilities for comprehensive target assessment',
      icon: Radar,
      path: '/reconnaissance',
      gradient: 'from-blue-600 via-purple-600 to-indigo-800',
      stats: {
        label: 'Active Sources',
        value: '47+'
      }
    },
    {
      id: 'marketing',
      title: 'Business Intelligence Hub',
      description: '24/7 live marketing analytics with AI-powered insights, competitor analysis, and trend monitoring',
      icon: TrendingUp,
      path: '/business-hub',
      gradient: 'from-emerald-600 via-green-600 to-teal-800',
      stats: {
        label: 'Live Metrics',
        value: '156k'
      }
    },
    {
      id: 'ai-assistant',
      title: 'AI Command Center',
      description: 'Multi-model AI assistant with specialized agents for research, analysis, and strategic planning',
      icon: Brain,
      path: '/ai-center',
      gradient: 'from-orange-600 via-red-600 to-pink-800',
      stats: {
        label: 'AI Models',
        value: '12+'
      }
    }
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      label: 'Quick Chat',
      action: () => console.log('Quick chat'),
      color: 'bg-blue-500'
    },
    {
      icon: Search,
      label: 'Instant Search',
      action: () => console.log('Search'),
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      label: 'Live Analytics',
      action: () => console.log('Analytics'),
      color: 'bg-green-500'
    },
    {
      icon: Target,
      label: 'Target Analysis',
      action: () => console.log('Target'),
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-white/10 backdrop-blur-xl bg-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Intelligence Platform</h1>
                  <p className="text-gray-400 text-sm">Advanced Business & Security Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Systems Online</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Professional Intelligence Suite
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced reconnaissance, real-time business intelligence, and AI-powered analysis in a unified platform
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={action.action}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} p-6 rounded-2xl backdrop-blur-xl bg-opacity-20 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl hover:shadow-3xl`}
              >
                <action.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <p className="text-white font-medium">{action.label}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dashboardSections.map((section, index) => {
              const IconComponent = section.icon;
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  onHoverStart={() => setActiveSection(section.id)}
                  onHoverEnd={() => setActiveSection(null)}
                  className="group relative"
                >
                  <Link href={section.path}>
                    <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${section.gradient} transform transition-all duration-500 hover:scale-105 cursor-pointer shadow-2xl hover:shadow-3xl border border-white/10 hover:border-white/20 backdrop-blur-xl`}>
                      {/* Animated Background */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                        <p className="text-white/80 text-sm mb-6 leading-relaxed">{section.description}</p>
                        
                        {section.stats && (
                          <div className="flex items-center justify-between pt-4 border-t border-white/20">
                            <span className="text-white/60 text-sm">{section.stats.label}</span>
                            <span className="text-white font-bold text-lg">{section.stats.value}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effects */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-5 animate-ping"></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 p-8 bg-gray-900/30 backdrop-blur-xl rounded-3xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-green-400" />
              System Status
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'API Services', status: 'Online', value: '99.9%', color: 'green' },
                { label: 'Data Sources', status: 'Active', value: '47/47', color: 'blue' },
                { label: 'AI Models', status: 'Ready', value: '12/12', color: 'purple' },
                { label: 'Security', status: 'Secure', value: 'A+', color: 'orange' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className={`w-4 h-4 bg-${stat.color}-400 rounded-full mx-auto mb-2 animate-pulse`}></div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                  <div className={`text-${stat.color}-400 text-xs font-medium`}>{stat.status}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}