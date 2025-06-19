import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Heart, Star } from 'lucide-react';
import WonderPetsChorus from './wonder-pets-chorus';
import ElephantRescueStory from './elephant-rescue-story';

export default function WonderPetsTrigger() {
  const [showChorus, setShowChorus] = useState(false);
  const [showRescueStory, setShowRescueStory] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const triggerChorus = () => {
    setShowChorus(true);
  };

  const triggerRescue = () => {
    setShowRescueStory(true);
  };

  const closeChorus = () => {
    setShowChorus(false);
  };

  const closeRescue = () => {
    setShowRescueStory(false);
    // After rescue story, play the celebration chorus
    setTimeout(() => setShowChorus(true), 500);
  };

  return (
    <>
      {/* Trigger Buttons */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="flex flex-col space-y-4">
          {/* Rescue Mission Button */}
          <motion.button
            onClick={triggerRescue}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 p-4 rounded-full shadow-2xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-orange-500 to-pink-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner content */}
            <div className="relative bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-full p-2">
              <div className="flex items-center justify-center space-x-1">
                <motion.span
                  className="text-lg"
                  animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  🐘
                </motion.span>
                <motion.span
                  className="text-lg"
                  animate={{ y: isHovered ? [0, -5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  🚨
                </motion.span>
              </div>
            </div>

            {/* Rescue Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-red-600/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.2 }}
            >
              🐘 Emergency Elephant Rescue! 🚨
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600/90" />
            </motion.div>
          </motion.button>

          {/* Chorus Button */}
          <motion.button
            onClick={triggerChorus}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-4 rounded-full shadow-2xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner content */}
            <div className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full p-2">
              {/* Wonder Pets Icons */}
              <div className="flex items-center justify-center space-x-1">
                <motion.span
                  className="text-lg"
                  animate={{
                    y: isHovered ? [0, -5, 0] : 0,
                    rotate: isHovered ? [0, 10, 0] : 0
                  }}
                  transition={{ duration: 0.5, delay: 0 }}
                >
                  🐹
                </motion.span>
                <motion.span
                  className="text-lg"
                  animate={{
                    y: isHovered ? [0, -8, 0] : 0,
                    rotate: isHovered ? [0, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  🐢
                </motion.span>
                <motion.span
                  className="text-lg"
                  animate={{
                    y: isHovered ? [0, -5, 0] : 0,
                    rotate: isHovered ? [0, 15, 0] : 0
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  🐥
                </motion.span>
              </div>
            </div>

            {/* Floating musical notes */}
            {isHovered && (
              <>
                {['🎵', '🎶', '♪', '♫', '🎼'].map((note, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl pointer-events-none"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -30, -60],
                      x: [(Math.random() - 0.5) * 40]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    {note}
                  </motion.div>
                ))}
              </>
            )}

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${20 + (i * 10)}%`
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

            {/* Chorus Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.2 }}
            >
              🎵 Wonder Pets Team Song! 🎵
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Elephant Rescue Story Modal */}
      {showRescueStory && (
        <ElephantRescueStory 
          isActive={true} 
          onComplete={closeRescue}
        />
      )}

      {/* Chorus Modal */}
      {showChorus && (
        <WonderPetsChorus 
          isActive={true} 
          onComplete={closeChorus}
        />
      )}
    </>
  );
}