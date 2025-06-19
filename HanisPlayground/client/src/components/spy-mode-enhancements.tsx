import React from 'react';
import { motion } from 'framer-motion';
import { useSpyMode } from './spy-mode-provider';

interface SpyModeEnhancementsProps {
  children: React.ReactNode;
  className?: string;
}

export function SpyModeWrapper({ children, className = '' }: SpyModeEnhancementsProps) {
  const { isSpyMode } = useSpyMode();

  return (
    <motion.div
      className={`${className} ${isSpyMode ? 'spy-mode-enter spy-mode-data-stream' : ''}`}
      animate={isSpyMode ? {
        textShadow: [
          '0 0 5px currentColor',
          '0 0 15px currentColor',
          '0 0 5px currentColor'
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

export function SpyModeScanLine() {
  const { isSpyMode } = useSpyMode();

  if (!isSpyMode) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
        animate={{
          y: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2
        }}
      />
    </motion.div>
  );
}

export function SpyModeGlitchText({ children, className = '' }: SpyModeEnhancementsProps) {
  const { isSpyMode } = useSpyMode();

  return (
    <motion.div
      className={className}
      animate={isSpyMode ? {
        x: [0, -1, 1, 0],
        filter: [
          'hue-rotate(0deg)',
          'hue-rotate(90deg)',
          'hue-rotate(0deg)'
        ]
      } : {}}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 5
      }}
    >
      {children}
    </motion.div>
  );
}

export function SpyModeParticles() {
  const { isSpyMode } = useSpyMode();

  if (!isSpyMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}