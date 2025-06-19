import { useState, useEffect } from "react";
import { Brain, Zap, Target, Network, Shield, Database } from "lucide-react";

interface AdvancedNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  matrixMode: boolean;
  onMatrixToggle: (enabled: boolean) => void;
}

export default function AdvancedNavigation({ 
  currentSection, 
  onSectionChange, 
  matrixMode, 
  onMatrixToggle 
}: AdvancedNavigationProps) {
  const [systemStatus, setSystemStatus] = useState("OPERATIONAL");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setNetworkActivity(Math.random() * 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { id: "hero", label: "COMMAND CENTER", icon: Brain },
    { id: "neural", label: "NEURAL NET", icon: Network },
    { id: "matrix", label: "AI MATRIX", icon: Database },
    { id: "quantum", label: "QUANTUM LAB", icon: Zap },
    { id: "performance", label: "PERFORMANCE", icon: Target },
    { id: "security", label: "SECURITY", icon: Shield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
                  HANIS.AI
                </div>
                <div className="text-xs text-gray-400 font-mono">v4.2.1</div>
              </div>
            </div>

            {/* System Status */}
            <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400">{systemStatus}</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-cyan-400">CPU: {cpuUsage.toFixed(1)}%</div>
              <div className="text-purple-400">NET: {networkActivity.toFixed(1)} MB/s</div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
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
            {/* Matrix Mode Toggle */}
            <button
              onClick={() => onMatrixToggle(!matrixMode)}
              className={`
                px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300
                ${matrixMode 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
                }
              `}
            >
              {matrixMode ? "MATRIX ON" : "MATRIX OFF"}
            </button>

            {/* Contact Links */}
            <div className="flex items-center space-x-2">
              <a
                href="https://wa.me/60179275907"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center hover:scale-110 transition-transform"
                title="WhatsApp: +60 17-927 5907"
              >
                <span className="text-white text-sm">💬</span>
              </a>
              <a
                href="mailto:wmh.dirc@gmail.com"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                title="Email: wmh.dirc@gmail.com"
              >
                <span className="text-white text-sm">📧</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg font-mono text-xs transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}