import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Brain, 
  Network, 
  Database, 
  Zap, 
  Target, 
  Shield, 
  BarChart3, 
  Users, 
  MessageSquare,
  Settings,
  Volume2,
  VolumeX,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { path: "/", label: "COMMAND CENTER", icon: Brain, color: "text-cyan-400" },
  { path: "/neural-network", label: "NEURAL NET", icon: Network, color: "text-purple-400" },
  { path: "/ai-matrix", label: "AI MATRIX", icon: Database, color: "text-green-400" },
  { path: "/quantum-lab", label: "QUANTUM LAB", icon: Zap, color: "text-blue-400" },
  { path: "/performance-hub", label: "PERFORMANCE", icon: Target, color: "text-orange-400" },
  { path: "/security-center", label: "SECURITY", icon: Shield, color: "text-red-400" },
  { path: "/analytics-lab", label: "ANALYTICS", icon: BarChart3, color: "text-pink-400" },
  { path: "/agent-dashboard", label: "AGENTS", icon: Users, color: "text-yellow-400" },
  { path: "/chat", label: "AI CHAT", icon: MessageSquare, color: "text-indigo-400" },
];

export default function GlobalNavigation() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    uptime: "99.9%"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        network: Math.random() * 100,
        uptime: "99.9%"
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/90 border-b border-cyan-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
                    HANIS.AI
                  </div>
                  <div className="text-xs text-gray-400 font-mono">Neural Command Center v5.0</div>
                </div>
              </div>

              {/* System Status Indicators */}
              <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400">ONLINE</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="text-cyan-400">CPU: {systemStatus.cpu.toFixed(1)}%</div>
                <div className="text-purple-400">MEM: {systemStatus.memory.toFixed(1)}%</div>
                <div className="text-orange-400">NET: {systemStatus.network.toFixed(1)} MB/s</div>
                <div className="text-green-400">UP: {systemStatus.uptime}</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r from-cyan-500/20 to-purple-500/20 ${item.color} border border-cyan-500/30` 
                        : `text-gray-400 hover:${item.color} hover:bg-gray-800/50`
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Audio Toggle */}
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                  ${audioEnabled 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-800/50 text-gray-400 hover:text-green-400'
                  }
                `}
              >
                {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {/* Settings */}
              <button className="w-10 h-10 rounded-lg bg-gray-800/50 text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 rounded-lg bg-gray-800/50 text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Contact Links */}
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="https://wa.me/60179275907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center hover:scale-110 transition-transform"
                  title="WhatsApp: +60 17-927 5907"
                >
                  <span className="text-white text-sm">💬</span>
                </a>
                <a
                  href="mailto:wmh.dirc@gmail.com"
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                  title="Email: wmh.dirc@gmail.com"
                >
                  <span className="text-white text-sm">📧</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl">
          <div className="pt-24 px-6">
            <div className="grid grid-cols-1 gap-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center space-x-4 p-4 rounded-xl font-mono text-left transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r from-cyan-500/20 to-purple-500/20 ${item.color} border border-cyan-500/30` 
                        : `text-gray-400 hover:${item.color} hover:bg-gray-800/50`
                      }
                    `}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-lg">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile System Status */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-400 mb-3 font-mono">SYSTEM STATUS</h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="text-cyan-400">CPU: {systemStatus.cpu.toFixed(1)}%</div>
                <div className="text-purple-400">MEM: {systemStatus.memory.toFixed(1)}%</div>
                <div className="text-orange-400">NET: {systemStatus.network.toFixed(1)} MB/s</div>
                <div className="text-green-400">UPTIME: {systemStatus.uptime}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}