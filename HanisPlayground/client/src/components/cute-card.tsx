import { motion } from 'framer-motion';
import { useState } from 'react';

interface CuteCardProps {
  children: React.ReactNode;
  className?: string;
  character?: 'linny' | 'tuck' | 'mingming';
  glowColor?: string;
  onClick?: () => void;
}

const characterEffects = {
  linny: {
    emoji: '🐹',
    color: '#FFD700',
    trail: ['⭐', '✨', '🌟']
  },
  tuck: {
    emoji: '🐢',
    color: '#32CD32',
    trail: ['🍃', '🌱', '💚']
  },
  mingming: {
    emoji: '🐥',
    color: '#FF69B4',
    trail: ['💖', '🌸', '✨']
  }
};

export default function CuteCard({ 
  children, 
  className = '',
  character,
  glowColor = '#00ffff',
  onClick
}: CuteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const selectedCharacter = character ? characterEffects[character] : null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm
        border border-white/10 shadow-lg cursor-pointer
        ${className}
      `}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 25px 50px -12px ${glowColor}40`
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(45deg, ${glowColor}20, transparent, ${glowColor}20)`
        }}
        animate={{
          background: isHovered 
            ? `linear-gradient(45deg, ${glowColor}40, transparent, ${glowColor}40)`
            : `linear-gradient(45deg, ${glowColor}20, transparent, ${glowColor}20)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Mouse Follow Light */}
      {isHovered && (
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor}30 0%, transparent 70%)`,
            left: mousePos.x - 64,
            top: mousePos.y - 64
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Character Corner */}
      {selectedCharacter && (
        <motion.div
          className="absolute top-4 right-4 text-2xl z-10"
          animate={{
            rotate: isHovered ? [0, -10, 10, 0] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          {selectedCharacter.emoji}
        </motion.div>
      )}

      {/* Floating Particles */}
      {isHovered && selectedCharacter && (
        <>
          {selectedCharacter.trail.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute text-lg pointer-events-none"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
                x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              {particle}
            </motion.div>
          ))}
        </>
      )}

      {/* Ripple Effect on Hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}20 0%, transparent 50%)`
          }}
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Corner Sparkles */}
      {isHovered && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: i < 2 ? '10px' : 'calc(100% - 10px)',
                top: i % 2 === 0 ? '10px' : 'calc(100% - 10px)'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}