import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Zap } from 'lucide-react';
import { useSpyMode } from './spy-mode-provider';

export default function SpyModeToggle() {
  const { isSpyMode, toggleSpyMode } = useSpyMode();

  return (
    <motion.button
      onClick={toggleSpyMode}
      className={`relative p-3 rounded-lg border-2 transition-all duration-500 ${
        isSpyMode
          ? 'bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-green-400 text-green-400'
          : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-gray-600 text-gray-400 hover:border-green-500'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isSpyMode ? 'Deactivate Spy Mode' : 'Activate Spy Mode'}
    >
      {/* Background pulse effect */}
      {isSpyMode && (
        <motion.div
          className="absolute inset-0 bg-green-400/20 rounded-lg"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Icon container */}
      <div className="relative flex items-center space-x-2">
        <motion.div
          animate={{
            rotate: isSpyMode ? 360 : 0,
            scale: isSpyMode ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          {isSpyMode ? (
            <Shield className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </motion.div>

        {/* Status indicator */}
        <div className="flex flex-col items-start">
          <motion.span
            className="text-xs font-bold"
            animate={{
              color: isSpyMode ? '#00ff00' : '#9ca3af'
            }}
          >
            SPY MODE
          </motion.span>
          <motion.span
            className="text-xs"
            animate={{
              color: isSpyMode ? '#00ff88' : '#6b7280'
            }}
          >
            {isSpyMode ? 'ACTIVE' : 'INACTIVE'}
          </motion.span>
        </div>

        {/* Active indicator */}
        {isSpyMode && (
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>

      {/* Scanning line effect when active */}
      {isSpyMode && (
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2
          }}
        />
      )}
    </motion.button>
  );
}