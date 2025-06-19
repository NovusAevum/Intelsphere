import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Heart, Star } from 'lucide-react';

interface WonderPetsChorusProps {
  isActive: boolean;
  onComplete?: () => void;
}

const chorusLyrics = [
  {
    id: 1,
    text: "What's gonna work?",
    character: "all",
    duration: 2000,
    animation: "bounce"
  },
  {
    id: 2,
    text: "TEAMWORK!",
    character: "all",
    duration: 2000,
    animation: "explode"
  },
  {
    id: 3,
    text: "What's gonna work?",
    character: "linny",
    duration: 2000,
    animation: "spin"
  },
  {
    id: 4,
    text: "TEAMWORK!",
    character: "tuck",
    duration: 2000,
    animation: "float"
  },
  {
    id: 5,
    text: "We're not too big",
    character: "mingming",
    duration: 2000,
    animation: "fly"
  },
  {
    id: 6,
    text: "And we're not too tough",
    character: "all",
    duration: 2000,
    animation: "march"
  },
  {
    id: 7,
    text: "But when we work together",
    character: "linny",
    duration: 2500,
    animation: "unite"
  },
  {
    id: 8,
    text: "We've got the right stuff!",
    character: "all",
    duration: 3000,
    animation: "celebrate"
  }
];

export default function WonderPetsChorus({ isActive, onComplete }: WonderPetsChorusProps) {
  const [currentLyric, setCurrentLyric] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    if (isActive) {
      startChorus();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [isActive]);

  const startChorus = () => {
    setIsPlaying(true);
    setCurrentLyric(0);
    if (musicEnabled) playChorusMusic();
    performNextLyric(0);
  };

  const performNextLyric = (lyricIndex: number) => {
    if (lyricIndex >= chorusLyrics.length) {
      setShowFinale(true);
      setTimeout(() => {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }, 3000);
      return;
    }

    setCurrentLyric(lyricIndex);
    const lyric = chorusLyrics[lyricIndex];

    timeoutRef.current = setTimeout(() => {
      performNextLyric(lyricIndex + 1);
    }, lyric.duration);
  };

  const playChorusMusic = () => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;
      
      // Wonder Pets theme melody notes
      const melody = [
        { freq: 523.25, time: 0 },    // C
        { freq: 659.25, time: 0.5 },  // E
        { freq: 783.99, time: 1 },    // G
        { freq: 1046.50, time: 1.5 }, // C
        { freq: 783.99, time: 2 },    // G
        { freq: 659.25, time: 2.5 },  // E
        { freq: 523.25, time: 3 },    // C
      ];
      
      melody.forEach(({ freq, time }) => {
        setTimeout(() => {
          if (audioContextRef.current && musicEnabled) {
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.4);
            
            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.4);
          }
        }, time * 1000);
      });
    }
  };

  const getCharacterEmoji = (character: string) => {
    switch (character) {
      case 'linny': return '🐹';
      case 'tuck': return '🐢';
      case 'mingming': return '🐥';
      default: return ['🐹', '🐢', '🐥'];
    }
  };

  const getAnimationStyle = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return {
          y: [0, -50, 0, -30, 0],
          transition: { duration: 1, repeat: 2 }
        };
      case 'explode':
        return {
          scale: [1, 2, 1.5, 1],
          rotate: [0, 180, 360],
          transition: { duration: 1.5 }
        };
      case 'spin':
        return {
          rotate: [0, 360, 720],
          scale: [1, 1.2, 1],
          transition: { duration: 1.5 }
        };
      case 'float':
        return {
          y: [0, -20, -10, 0],
          x: [0, 10, -10, 0],
          transition: { duration: 2 }
        };
      case 'fly':
        return {
          y: [0, -30, -15, 0],
          x: [0, 30, -30, 0],
          rotate: [0, 15, -15, 0],
          transition: { duration: 2 }
        };
      case 'march':
        return {
          x: [0, 20, -20, 0],
          transition: { duration: 1.5, repeat: 1 }
        };
      case 'unite':
        return {
          scale: [1, 0.8, 1.2, 1],
          transition: { duration: 2 }
        };
      case 'celebrate':
        return {
          y: [0, -40, 0],
          rotate: [0, 360],
          scale: [1, 1.3, 1],
          transition: { duration: 2, repeat: 1 }
        };
      default:
        return {};
    }
  };

  const currentChorusLyric = chorusLyrics[currentLyric];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-800 to-teal-700 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        
        {/* Music Controls */}
        <div className="absolute top-8 right-8">
          <motion.button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {musicEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Chorus Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            WONDER PETS CHORUS
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <motion.span
              className="text-5xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐹
            </motion.span>
            <motion.span
              className="text-5xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            >
              🐢
            </motion.span>
            <motion.span
              className="text-5xl"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            >
              🐥
            </motion.span>
          </div>
        </motion.div>

        {/* Current Lyric Display */}
        <AnimatePresence mode="wait">
          {currentChorusLyric && (
            <motion.div
              key={currentLyric}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/15 backdrop-blur-sm rounded-3xl p-12 mb-8"
            >
              {/* Character Display */}
              <div className="mb-8">
                {Array.isArray(getCharacterEmoji(currentChorusLyric.character)) ? (
                  <div className="flex justify-center space-x-4">
                    {(getCharacterEmoji(currentChorusLyric.character) as string[]).map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-6xl"
                        animate={getAnimationStyle(currentChorusLyric.animation)}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <motion.span
                    className="text-6xl"
                    animate={getAnimationStyle(currentChorusLyric.animation)}
                  >
                    {getCharacterEmoji(currentChorusLyric.character)}
                  </motion.span>
                )}
              </div>
              
              {/* Lyric Text */}
              <motion.h2
                className="text-4xl font-bold text-white"
                animate={{
                  scale: currentChorusLyric.text.includes('TEAMWORK') ? [1, 1.2, 1] : 1,
                  color: currentChorusLyric.text.includes('TEAMWORK') ? ['#fff', '#ffd700', '#fff'] : '#fff'
                }}
                transition={{ duration: 0.5, repeat: currentChorusLyric.text.includes('TEAMWORK') ? 2 : 0 }}
              >
                {currentChorusLyric.text}
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="w-full bg-white/20 rounded-full h-4 mb-8">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 h-4 rounded-full"
            animate={{ width: `${(currentLyric / chorusLyrics.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {['🎵', '🎶', '⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>

        {/* Final Celebration */}
        {showFinale && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/30 to-pink-400/30 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                className="text-9xl mb-6"
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="text-5xl font-bold text-white mb-4">
                TEAMWORK MAKES THE DREAM WORK!
              </h2>
              <p className="text-2xl text-yellow-200">
                Wonder Pets save the day! 🐹🐢🐥
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}