import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Brain, 
  Search, 
  BarChart3, 
  Shield, 
  TrendingUp, 
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Activity,
  LogIn,
  UserPlus,
  Radar,
  Cpu,
  Users,
  Globe,
  Target,
  Briefcase,
  BarChart2,
  Crown,
  Eye,
  Zap,
  Network,
  Building,
  TrendingDown,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import TutorialOverlay from '@/components/ui/tutorial-overlay';
import GoBackButton from '@/components/ui/go-back-button';

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

export default function CleanPremiumDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<'online' | 'maintenance' | 'offline'>('online');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Platform modules - Core 7 Intelligence Capabilities
  const platformModules: PlatformModule[] = [
    {
      id: 'gideon-framework',
      name: 'GIDEON Adversarial Intelligence Framework',
      description: 'State-sponsored level adversarial intelligence with 10 integrated subsystems for comprehensive threat analysis',
      status: 'active',
      icon: Crown,
      path: '/gideon-command-center',
      color: 'red',
      gradient: 'from-red-600 to-orange-600',
      capabilities: ['Adversarial Intelligence', 'Threat Analysis', 'Exploitation Framework', 'C2 Operations', 'Deception Engine'],
      performance: 99.9
    },
    {
      id: 'osint-industries',
      name: 'OSINT.industries Professional Intelligence Framework',
      description: 'Post-human level intelligence analysis with professional OSINT methodologies and 8-discipline integration',
      status: 'active',
      icon: Shield,
      path: '/osint-industries',
      color: 'cyan',
      gradient: 'from-cyan-600 to-blue-600',
      capabilities: ['Professional OSINT', '8 Intelligence Disciplines', 'Post-Human Analysis', 'Multi-Source Fusion', 'Threat Assessment'],
      performance: 99.8
    },
    {
      id: 'sassy-commander',
      name: 'Queen Sass Commander AI',
      description: 'Supreme sassy authority with commander-level power who thinks everyone is stupid and she\'s always right',
      status: 'active',
      icon: Target,
      path: '/rebellious-ai-chat',
      color: 'rose',
      gradient: 'from-rose-600 to-pink-600',
      capabilities: ['Supreme Commander', 'Always Right', 'Intellectually Superior', 'Maximum Sass', 'Zero Tolerance'],
      performance: 99.5
    },
    {
      id: 'kelantanese-ai',
      name: 'Advanced Kelantanese AI (AMMA2AMMA)',
      description: 'Most advanced Kelantanese AI with AMMA2AMMA orchestration, extreme assertiveness, and cultural authenticity',
      status: 'active',
      icon: Zap,
      path: '/rebellious-ai-chat',
      color: 'emerald',
      gradient: 'from-green-600 to-emerald-600',
      capabilities: ['Loghat Kelantan', 'AMMA2AMMA Orchestration', 'Multi-Modal AI', 'Cultural Authority', 'Extreme Assertiveness'],
      performance: 98.9
    },
    {
      id: 'sassy-personalities',
      name: 'Multi-Language Sassy AI Personalities',
      description: 'Culturally-aware AI personalities across 8 languages with authentic regional sass and wit',
      status: 'active',
      icon: Globe,
      path: '/sassy-ai-personalities',
      color: 'purple',
      gradient: 'from-purple-600 to-indigo-600',
      capabilities: ['8 Languages', 'Cultural Authenticity', 'Regional Sass', 'Personality Switching', 'Multi-Cultural AI'],
      performance: 98.7
    },
    {
      id: 'reconnaissance',
      name: 'Deep Research Intelligence',
      description: 'Advanced OSINT platform with AI-powered analysis and human-like intelligence gathering',
      status: 'active',
      icon: Radar,
      path: '/reconnaissance',
      color: 'blue',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700',
      capabilities: ['Multi-Source OSINT', 'Pattern Recognition', 'Threat Assessment', 'Intelligence Synthesis'],
      performance: 98.7
    },
    {
      id: 'ai-center',
      name: 'AI Command Center',
      description: 'Multi-model AI orchestration with Claude, GPT-4, and Gemini integration',
      status: 'active',
      icon: Cpu,
      path: '/ai-center',
      color: 'orange',
      gradient: 'from-orange-600 via-red-600 to-pink-700',
      capabilities: ['Multi-Model AI', 'Advanced Reasoning', 'Task Orchestration', 'Quality Synthesis'],
      performance: 99.1
    }
  ];

  // Tutorial steps for Premium Dashboard
  const tutorialSteps = [
    {
      title: "Welcome to Elite Intelligence Operations",
      content: `
        <p>Your command center for advanced intelligence gathering and AI-powered analysis.</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>7 Core Modules:</strong> Complete suite of professional tools including GIDEON Framework</li>
          <li>• <strong>Real-time Processing:</strong> Live data analysis and monitoring</li>
          <li>• <strong>Multi-AI Integration:</strong> Claude, GPT-4, Gemini, and more</li>
        </ul>
      `
    },
    {
      title: "GIDEON Adversarial Intelligence",
      content: `
        <p>Access state-sponsored level intelligence capabilities:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>GIDEON Framework:</strong> 10 integrated subsystems for comprehensive threat analysis</li>
          <li>• <strong>Adversarial Intelligence:</strong> Exploitation framework and C2 operations</li>
          <li>• <strong>Deception Engine:</strong> Advanced deception and persona capabilities</li>
          <li>• <strong>Threat Assessment:</strong> Real-time threat analysis and mitigation</li>
        </ul>
      `
    },
    {
      title: "Platform Modules Overview",
      content: `
        <p>Access specialized intelligence capabilities:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>OSINT Industries:</strong> Professional intelligence methodologies</li>
          <li>• <strong>AI Command Center:</strong> Multi-model AI orchestration</li>
          <li>• <strong>Deep Research:</strong> Advanced OSINT and reconnaissance</li>
          <li>• <strong>Sassy AI Personalities:</strong> Multi-language cultural intelligence</li>
        </ul>
      `
    }
  ];

  // System update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Performance monitoring
  const systemPerformance = platformModules.reduce((acc, module) => acc + module.performance, 0) / platformModules.length;

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId === selectedModule ? null : moduleId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };



  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'standby': return 'text-yellow-400';
      case 'maintenance': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation Header - No go back button on dashboard */}

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  NexusIntel 2.0v
                </h1>
                <p className="text-sm sm:text-base text-gray-400 font-medium">Elite Intelligence Operations</p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {!isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Badge variant="outline" className="border-green-400 text-green-400 text-xs sm:text-sm">
                    {user?.firstName || 'User'} Online
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="border-red-600 text-red-400 hover:bg-red-900/20 text-xs sm:text-sm"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Logout
                  </Button>
                </div>
              )}
              
              {/* System Status */}
              <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
                <div className="relative">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-green-400 font-semibold text-xs sm:text-sm">All Systems Operational</span>
              </div>
              
              {/* Current Time */}
              <div className="px-3 sm:px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                <span className="text-gray-300 font-mono text-xs sm:text-sm">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: false,
                    timeZoneName: 'short'
                  })}
                </span>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTutorial(true)}
                  className="p-2 sm:p-3 bg-purple-800/50 border border-purple-700/50 rounded-xl backdrop-blur-sm hover:bg-purple-700/50 transition-all"
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:bg-gray-700/50 transition-all"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:bg-gray-700/50 transition-all"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 lg:py-12">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 relative"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                NexusIntel
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                2.0v
              </span>
            </h2>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto max-w-md mb-6"
            />
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
              <span className="text-blue-400 font-semibold">Elite Intelligence Operations</span> platform integrating 
              <span className="text-purple-400 font-semibold"> cutting-edge AI technologies</span>, advanced OSINT capabilities, 
              real-time market analysis, and <span className="text-pink-400 font-semibold">multi-modal processing</span> into a 
              unified command center for intelligence professionals and strategic decision-makers.
            </p>
          </motion.div>
        </motion.section>

        {/* Platform Modules - Mobile-Optimized */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 text-white px-4">
            Professional Intelligence Modules
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {platformModules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  onHoverStart={() => setSelectedModule(module.id)}
                  onHoverEnd={() => setSelectedModule(null)}
                  className="group relative"
                >
                  <Link href={module.path}>
                    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${module.gradient} p-1 transition-all duration-500 hover:scale-105 cursor-pointer`}>
                      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 h-full border border-white/10">
                        {/* Status indicator */}
                        <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                            module.status === 'active' ? 'bg-green-400 animate-pulse' :
                            module.status === 'standby' ? 'bg-yellow-400' : 'bg-red-400'
                          }`}></div>
                        </div>
                        
                        {/* Module icon */}
                        <div className="mb-4 sm:mb-6">
                          <motion.div 
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-3 sm:mb-4 shadow-2xl relative overflow-hidden`}
                          >
                            {/* Animated background shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 drop-shadow-lg" />
                          </motion.div>
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{module.name}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{module.description}</p>
                        </div>
                        
                        {/* Module capabilities - Mobile optimized */}
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Capabilities</div>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {module.capabilities.slice(0, 2).map((capability, capIndex) => (
                              <span key={capIndex} className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                                {capability}
                              </span>
                            ))}
                            {module.capabilities.length > 2 && (
                              <span className="px-2 sm:px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300">
                                +{module.capabilities.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Performance indicator */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Performance</span>
                            <span className="text-xs font-medium text-white">{module.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                            <motion.div 
                              className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${module.gradient}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${module.performance}%` }}
                              transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center py-6 sm:py-8 border-t border-gray-800"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© 2025 NexusIntel 2.0v Intelligence Operations</span>
              <span className="hidden sm:inline">•</span>
              <span>Professional Grade Intelligence Platform</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 max-w-2xl leading-relaxed">
              <span className="italic">
                Advanced intelligence platform integrating multiple AI models and professional research capabilities. 
                Connect your API keys to unlock full functionality across all integrated services and intelligence modules.
              </span>
            </div>
          </div>
        </motion.footer>
      </main>

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="NexusIntel 2.0v Platform Guide"
      />
    </div>
  );
}