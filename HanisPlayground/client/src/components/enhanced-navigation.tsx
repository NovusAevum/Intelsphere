import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { 
  Home, TrendingUp, FileText, Brain, Zap, Grid3X3,
  MessageCircle, Mail, Volume2, VolumeX, Menu, X
} from 'lucide-react';
import SpyModeToggle from './spy-mode-toggle';
import { useSpyMode } from './spy-mode-provider';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function EnhancedNavigation({ currentSection, onSectionChange }: NavigationProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { isSpyMode } = useSpyMode();

  const navigationItems = [
    { id: 'home', label: 'HOME', icon: Home, path: '/' },
    { id: 'performance-marketing', label: 'PERFORMANCE MARKETING', icon: TrendingUp, path: '/performance-marketing' },
    { id: 'resume', label: 'RESUME', icon: FileText, path: '/resume' },
    { id: 'neural-net', label: 'NEURAL NET', icon: Brain, path: '/neural-net' },
    { id: 'quantum-lab', label: 'QUANTUM LAB', icon: Zap, path: '/quantum-lab' },
    { id: 'ai-matrix', label: 'AI MATRIX', icon: Grid3X3, path: '/ai-matrix' }
  ];

  const quickActions = [
    { id: 'chat', icon: MessageCircle, action: () => console.log('Open chat') },
    { id: 'email', icon: Mail, action: () => window.open('mailto:wmh2u@proton.me') },
    { id: 'sound', icon: soundEnabled ? Volume2 : VolumeX, action: () => setSoundEnabled(!soundEnabled) }
  ];

  return (
    <>
      {/* Main Navigation Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
          isSpyMode 
            ? 'bg-black/90 border-green-500/50 spy-mode-scanning' 
            : 'bg-black/80 border-cyan-500/30'
        }`}
      >
        <div className="container mx-auto px-6">
          {/* Top Row - H and Actions */}
          <div className="flex items-center justify-between py-4">
            {/* H Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                H
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg blur-lg"></div>
            </motion.div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action.action}
                  className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 hover:text-white transition-colors"
                >
                  <action.icon size={20} />
                </motion.button>
              ))}
              
              {/* Spy Mode Toggle */}
              <SpyModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Main Title */}
          <div className="text-center py-4 border-t border-cyan-500/20">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
              HANIS WONDER PETS
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-cyan-400"
            >
              Advanced Intelligence Center
            </motion.p>
          </div>

          {/* Navigation Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-cyan-500/20 py-4`}>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link href={item.path}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
                        ${location === item.path || currentSection === item.id
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                          : 'text-cyan-400 hover:text-white hover:bg-cyan-500/20'
                        }
                      `}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Quick Actions Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900 to-black border-l border-cyan-500/30 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Quick Actions</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-cyan-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      action.action();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 hover:text-white transition-colors"
                  >
                    <action.icon size={20} />
                    <span className="font-medium">
                      {action.id === 'chat' ? 'Open Chat' : 
                       action.id === 'email' ? 'Send Email' : 
                       action.id === 'sound' ? (soundEnabled ? 'Mute' : 'Unmute') : action.id}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}