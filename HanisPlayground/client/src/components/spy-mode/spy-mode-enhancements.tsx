/**
 * Spy Mode Enhancements - Decoupled reactive UI effects
 * No circular dependencies, pure reactive enhancement component
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpyMode } from '@/state/global-state-manager';

interface SpyModeEnhancementsProps {
  children: React.ReactNode;
  className?: string;
  enhancementLevel?: 'subtle' | 'moderate' | 'full';
}

export function SpyModeEnhancements({ 
  children, 
  className = '',
  enhancementLevel = 'moderate'
}: SpyModeEnhancementsProps) {
  const { isActive, settings } = useSpyMode();

  const enhancementIntensity = {
    subtle: 0.3,
    moderate: 0.6,
    full: 1.0
  };

  const intensity = enhancementIntensity[enhancementLevel];

  if (!isActive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`${className} spy-mode-enhanced`}
      animate={settings.glitchEffect ? {
        textShadow: [
          `0 0 ${5 * intensity}px currentColor`,
          `0 0 ${15 * intensity}px currentColor`,
          `0 0 ${5 * intensity}px currentColor`
        ],
        filter: [
          'hue-rotate(0deg)',
          'hue-rotate(5deg)',
          'hue-rotate(0deg)'
        ]
      } : {}}
      transition={{ 
        duration: 2 / settings.dataStreamSpeed, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {children}
      
      {/* Scanlines overlay */}
      {settings.glitchEffect && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              transparent 50%, 
              rgba(0, 255, 0, ${settings.scanlineIntensity * intensity}) 50%
            )`,
            backgroundSize: '100% 4px',
            animation: `scanlines ${1 / settings.dataStreamSpeed}s linear infinite`,
            opacity: 0.3
          }}
        />
      )}
      
      {/* Data stream effect */}
      {settings.networkVisualization && (
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-green-400"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 0.5 / settings.dataStreamSpeed,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      )}
    </motion.div>
  );
}

export function SpyModeScanLine() {
  const { isActive, settings } = useSpyMode();

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      animate={{
        background: [
          'linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%)',
          'linear-gradient(90deg, transparent 100%, rgba(0, 255, 0, 0.1) 50%, transparent 0%)'
        ]
      }}
      transition={{
        duration: 3 / settings.dataStreamSpeed,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

export function SpyModeOverlay() {
  const { isActive, showMetrics, showConnections } = useSpyMode();

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Corner HUD elements */}
        {showMetrics && (
          <motion.div
            className="absolute top-4 right-4 bg-black/80 border border-green-400 p-2 text-green-400 font-mono text-xs"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>STATUS: ACTIVE</div>
            <div>MODE: STEALTH</div>
            <div>UPTIME: {new Date().toLocaleTimeString()}</div>
          </motion.div>
        )}

        {showConnections && (
          <motion.div
            className="absolute bottom-4 left-4 bg-black/80 border border-green-400 p-2 text-green-400 font-mono text-xs"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div>NETWORK: SECURE</div>
            <div>ENCRYPTION: AES-256</div>
            <div>CONNECTIONS: 3</div>
          </motion.div>
        )}

        {/* Matrix-style background effect */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-green-400"
              style={{
                left: `${Math.random() * 100}%`,
                height: '100%'
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SpyModeEnhancements;