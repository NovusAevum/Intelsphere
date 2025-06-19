import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  currentPage: string;
}

const wonderPetsCharacters = {
  linny: {
    emoji: '🐹',
    color: '#FFD700',
    animation: 'bounce',
    phrase: 'What\'s gonna work? Teamwork!'
  },
  tuck: {
    emoji: '🐢',
    color: '#32CD32',
    animation: 'spin',
    phrase: 'This is sewious!'
  },
  mingming: {
    emoji: '🐥',
    color: '#FF69B4',
    animation: 'fly',
    phrase: 'Ming-Ming save the day!'
  }
};

export default function PageTransition({ children, currentPage }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState('linny');
  const [showPhrase, setShowPhrase] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    // Select random character for transition
    const characters = Object.keys(wonderPetsCharacters);
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    setCurrentCharacter(randomChar);
    
    // Show character phrase
    setTimeout(() => setShowPhrase(true), 300);
    
    // Hide transition after animation
    setTimeout(() => {
      setIsTransitioning(false);
      setShowPhrase(false);
    }, 1500);
  }, [currentPage]);

  const character = wonderPetsCharacters[currentCharacter as keyof typeof wonderPetsCharacters];

  const characterVariants = {
    bounce: {
      y: [0, -30, 0, -20, 0, -10, 0],
      transition: { duration: 1, ease: "easeInOut" }
    },
    spin: {
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 1, ease: "easeInOut" }
    },
    fly: {
      x: [-100, 0, 100, 0],
      y: [0, -20, 0, -10, 0],
      rotate: [0, 10, -10, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none"
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Character Animation */}
              <motion.div
                className="text-8xl"
                variants={characterVariants}
                animate={character.animation}
                style={{ filter: `drop-shadow(0 0 20px ${character.color})` }}
              >
                {character.emoji}
              </motion.div>

              {/* Loading Effect */}
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: character.color }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              {/* Character Phrase */}
              <AnimatePresence>
                {showPhrase && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg"
                  >
                    <p className="text-lg font-bold text-gray-800">
                      {character.phrase}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Page Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-white capitalize">
                  {currentPage.replace('-', ' ')}
                </h2>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}