import { motion } from 'framer-motion';
import { useState } from 'react';

interface CuteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'wonder';
  size?: 'sm' | 'md' | 'lg';
  character?: 'linny' | 'tuck' | 'mingming';
  className?: string;
}

const characterEffects = {
  linny: {
    emoji: '🐹',
    color: '#FFD700',
    sound: 'squeak'
  },
  tuck: {
    emoji: '🐢',
    color: '#32CD32',
    sound: 'pop'
  },
  mingming: {
    emoji: '🐥',
    color: '#FF69B4',
    sound: 'chirp'
  }
};

export default function CuteButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  character,
  className = ''
}: CuteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setShowEffect(true);
    
    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setShowEffect(false), 800);
    
    if (onClick) onClick();
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400',
    wonder: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-300 hover:to-orange-400'
  };

  const selectedCharacter = character ? characterEffects[character] : null;

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-full font-bold shadow-lg
        transition-all duration-200 transform-gpu
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Button Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center space-x-2"
        animate={{
          y: isPressed ? 2 : 0
        }}
      >
        {selectedCharacter && (
          <motion.span
            className="text-lg"
            animate={{
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {selectedCharacter.emoji}
          </motion.span>
        )}
        {children}
      </motion.div>

      {/* Hover Sparkles */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </>
      )}

      {/* Click Effect */}
      {showEffect && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: selectedCharacter 
              ? `radial-gradient(circle, ${selectedCharacter.color}40 0%, transparent 70%)`
              : 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}

      {/* Character Trail Effect */}
      {showEffect && selectedCharacter && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-sm"
              style={{ 
                left: "50%", 
                top: "50%",
                color: selectedCharacter.color
              }}
              initial={{
                x: "-50%",
                y: "-50%",
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${-50 + (Math.random() - 0.5) * 200}%`,
                y: `${-50 - Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {selectedCharacter.emoji}
            </motion.div>
          ))}
        </>
      )}

      {/* Ripple Effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}