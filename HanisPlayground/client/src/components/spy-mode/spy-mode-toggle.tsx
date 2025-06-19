/**
 * Spy Mode Toggle - Decoupled UI Component
 * No circular dependencies, pure UI trigger
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Bolt } from 'lucide-react';
import { useSpyMode } from '@/state/global-state-manager';

interface SpyModeToggleProps {
  variant?: 'button' | 'icon' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function SpyModeToggle({ 
  variant = 'button',
  size = 'md',
  showLabel = true,
  className = ''
}: SpyModeToggleProps) {
  const { isActive, isTransitioning, toggle } = useSpyMode();

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const baseClasses = `
    relative rounded-lg border-2 transition-all duration-500 
    ${sizeClasses[size]} ${className}
    ${isActive
      ? 'bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-green-400 text-green-400'
      : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-gray-600 text-gray-400 hover:border-green-500'
    }
    ${isTransitioning ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const IconComponent = isActive ? EyeOff : Eye;

  const renderButton = () => (
    <motion.button
      onClick={toggle}
      disabled={isTransitioning}
      className={baseClasses}
      whileHover={{ scale: isTransitioning ? 1 : 1.05 }}
      whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
      title={isActive ? 'Deactivate Spy Mode' : 'Activate Spy Mode'}
    >
      {/* Background pulse effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-green-400/20 rounded-lg"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div className="relative flex items-center gap-2">
        <IconComponent size={iconSizes[size]} />
        {showLabel && (
          <span className="font-mono font-bold">
            {isActive ? 'SPY MODE ACTIVE' : 'ACTIVATE SPY MODE'}
          </span>
        )}
        
        {/* Status indicators */}
        <div className="flex items-center gap-1 ml-2">
          {isActive && (
            <>
              <Shield size={12} className="text-green-400 animate-pulse" />
              <Bolt size={12} className="text-yellow-400 animate-bounce" />
            </>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </motion.button>
  );

  const renderIcon = () => (
    <motion.div
      onClick={toggle}
      className={`${baseClasses} flex items-center justify-center cursor-pointer`}
      whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
      whileTap={{ scale: isTransitioning ? 1 : 0.9 }}
    >
      <IconComponent size={iconSizes[size]} />
    </motion.div>
  );

  const renderSwitch = () => (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-mono text-gray-400">
          Spy Mode
        </span>
      )}
      <motion.div
        onClick={toggle}
        className={`
          relative w-12 h-6 rounded-full border cursor-pointer transition-all duration-300
          ${isActive ? 'bg-green-900 border-green-400' : 'bg-gray-800 border-gray-600'}
          ${isTransitioning ? 'opacity-70 cursor-not-allowed' : ''}
        `}
        whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
      >
        <motion.div
          className={`
            absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300
            ${isActive ? 'right-0.5 bg-green-400' : 'left-0.5 bg-gray-400'}
          `}
          animate={{ x: isActive ? 0 : 0 }}
        />
      </motion.div>
    </div>
  );

  switch (variant) {
    case 'icon':
      return renderIcon();
    case 'switch':
      return renderSwitch();
    default:
      return renderButton();
  }
}

export default SpyModeToggle;