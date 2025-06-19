import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, ArrowRight, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

interface StoryScene {
  id: number;
  text: string;
  choices: Array<{
    text: string;
    nextScene: number;
    emotion: 'happy' | 'sad' | 'excited' | 'curious';
  }>;
  elephantEmotion: 'happy' | 'sad' | 'excited' | 'curious' | 'sleepy';
  background: string;
  soundEffect?: string;
}

export default function BabyElephantStoryGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [storyProgress, setStoryProgress] = useState<number[]>([1]);
  const [friendshipLevel, setFriendshipLevel] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playerName, setPlayerName] = useState('Friend');
  const [hasNameSet, setHasNameSet] = useState(false);

  const stories: Record<number, StoryScene> = {
    1: {
      id: 1,
      text: `Hello there! I'm Kavi, a baby elephant who loves adventures! What's your name, new friend?`,
      choices: [
        { text: "I'm a wonderful friend!", nextScene: 2, emotion: 'happy' },
        { text: "I'm here to play!", nextScene: 3, emotion: 'excited' },
        { text: "I'm curious about you!", nextScene: 4, emotion: 'curious' }
      ],
      elephantEmotion: 'happy',
      background: 'from-green-400 to-blue-500'
    },
    2: {
      id: 2,
      text: `Nice to meet you, ${playerName}! I found a beautiful waterfall today. Want to splash around with me?`,
      choices: [
        { text: "Yes! Let's splash!", nextScene: 5, emotion: 'excited' },
        { text: "Is it safe?", nextScene: 6, emotion: 'curious' },
        { text: "Maybe later...", nextScene: 7, emotion: 'sad' }
      ],
      elephantEmotion: 'excited',
      background: 'from-blue-400 to-cyan-500'
    },
    3: {
      id: 3,
      text: `Yay! I love playing! I know a secret place where we can find colorful butterflies. Follow me!`,
      choices: [
        { text: "Lead the way!", nextScene: 8, emotion: 'excited' },
        { text: "What kind of butterflies?", nextScene: 9, emotion: 'curious' },
        { text: "I'm scared of butterflies...", nextScene: 10, emotion: 'sad' }
      ],
      elephantEmotion: 'excited',
      background: 'from-purple-400 to-pink-500'
    },
    4: {
      id: 4,
      text: `I'm curious too! Did you know elephants can hear sounds from very far away? Listen... can you hear the wind in the trees?`,
      choices: [
        { text: "That's amazing!", nextScene: 11, emotion: 'excited' },
        { text: "Tell me more!", nextScene: 12, emotion: 'curious' },
        { text: "I want to learn!", nextScene: 13, emotion: 'happy' }
      ],
      elephantEmotion: 'curious',
      background: 'from-yellow-400 to-orange-500'
    },
    5: {
      id: 5,
      text: `SPLASH! Haha! The water is so refreshing! I love how you're not afraid to get wet. You're a true friend!`,
      choices: [
        { text: "This is the best!", nextScene: 14, emotion: 'happy' },
        { text: "Let's swim deeper!", nextScene: 15, emotion: 'excited' },
        { text: "Can you teach me to swim like an elephant?", nextScene: 16, emotion: 'curious' }
      ],
      elephantEmotion: 'happy',
      background: 'from-blue-300 to-teal-400'
    },
    6: {
      id: 6,
      text: `It's perfectly safe! My mama showed me this place. Elephants are good swimmers, and I'll keep you safe!`,
      choices: [
        { text: "Okay, I trust you!", nextScene: 5, emotion: 'happy' },
        { text: "You're very caring!", nextScene: 17, emotion: 'happy' },
        { text: "Let's be careful together!", nextScene: 18, emotion: 'curious' }
      ],
      elephantEmotion: 'happy',
      background: 'from-green-300 to-blue-400'
    },
    7: {
      id: 7,
      text: `Oh... okay. That's alright, ${playerName}. Maybe we can just sit by the water and talk? I understand if you're not ready.`,
      choices: [
        { text: "Actually, let's try it!", nextScene: 5, emotion: 'excited' },
        { text: "Thank you for understanding", nextScene: 19, emotion: 'happy' },
        { text: "Can we do something else?", nextScene: 20, emotion: 'curious' }
      ],
      elephantEmotion: 'sad',
      background: 'from-gray-400 to-blue-400'
    },
    // Continue with more scenes...
    14: {
      id: 14,
      text: `You're right! This is the best day ever! Having a friend like you makes everything more fun. Should we explore more of the jungle together?`,
      choices: [
        { text: "Yes! Let's explore!", nextScene: 21, emotion: 'excited' },
        { text: "You're the best friend ever!", nextScene: 22, emotion: 'happy' },
        { text: "I love our friendship!", nextScene: 23, emotion: 'happy' }
      ],
      elephantEmotion: 'excited',
      background: 'from-green-400 to-emerald-500'
    },
    21: {
      id: 21,
      text: `Amazing! Together we can discover so many wonderful things! Thank you for being such an incredible friend, ${playerName}. Our adventure is just beginning!`,
      choices: [
        { text: "Start a new adventure!", nextScene: 1, emotion: 'excited' },
        { text: "This was perfect!", nextScene: 24, emotion: 'happy' }
      ],
      elephantEmotion: 'happy',
      background: 'from-rainbow-400 to-rainbow-500'
    },
    24: {
      id: 24,
      text: `Thank you for sharing this wonderful story with me, ${playerName}! You made Kavi so happy! Come back anytime for more adventures!`,
      choices: [
        { text: "Play again!", nextScene: 1, emotion: 'excited' },
        { text: "That was beautiful!", nextScene: 24, emotion: 'happy' }
      ],
      elephantEmotion: 'sleepy',
      background: 'from-purple-600 to-pink-600'
    }
  };

  const getElephantEmoji = (emotion: string): string => {
    switch (emotion) {
      case 'happy': return '😊🐘';
      case 'sad': return '😢🐘';
      case 'excited': return '🤩🐘';
      case 'curious': return '🤔🐘';
      case 'sleepy': return '😴🐘';
      default: return '🐘';
    }
  };

  const handleChoice = (choice: any) => {
    const newProgress = [...storyProgress, choice.nextScene];
    setStoryProgress(newProgress);
    setCurrentScene(choice.nextScene);
    
    // Update friendship level based on choice emotion
    const friendshipChange = {
      'happy': 10,
      'excited': 15,
      'curious': 5,
      'sad': -5
    }[choice.emotion] || 0;
    
    setFriendshipLevel(prev => Math.max(0, Math.min(100, prev + friendshipChange)));
    
    // Play sound effect if enabled
    if (soundEnabled && choice.emotion === 'excited') {
      // Sound would be played here
    }
  };

  const goBack = () => {
    if (storyProgress.length > 1) {
      const newProgress = storyProgress.slice(0, -1);
      setStoryProgress(newProgress);
      setCurrentScene(newProgress[newProgress.length - 1]);
    }
  };

  const setName = () => {
    setHasNameSet(true);
    const scene = stories[currentScene];
    if (scene) {
      scene.text = scene.text.replace('Friend', playerName);
    }
  };

  const currentStory = stories[currentScene] || stories[1];

  return (
    <>
      {/* Baby Elephant Game Button - Fixed Bottom Right */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            🐘
          </motion.div>
          
          <div className="absolute -top-16 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Baby Elephant Story Game!
          </div>
        </button>
      </motion.div>

      {/* Story Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl bg-gradient-to-br ${currentStory.background} rounded-3xl shadow-2xl overflow-hidden`}
            >
              {/* Header */}
              <div className="bg-black/20 backdrop-blur-sm p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    {getElephantEmoji(currentStory.elephantEmotion)}
                  </motion.div>
                  <div>
                    <h2 className="text-white text-2xl font-bold">Kavi's Adventure</h2>
                    <div className="flex items-center space-x-4">
                      <div className="text-white/80 text-sm">Friendship: {friendshipLevel}%</div>
                      <div className="w-32 bg-white/20 rounded-full h-2">
                        <motion.div
                          animate={{ width: `${friendshipLevel}%` }}
                          className="bg-pink-400 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Name Input */}
              {!hasNameSet && (
                <div className="p-6 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value || 'Friend')}
                      placeholder="Enter your name..."
                      className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
                    />
                    <button
                      onClick={setName}
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Set Name
                    </button>
                  </div>
                </div>
              )}

              {/* Story Content */}
              <div className="p-8">
                <motion.div
                  key={currentScene}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <p className="text-white text-lg leading-relaxed">
                      {currentStory.text}
                    </p>
                  </div>
                  
                  {/* Choices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentStory.choices.map((choice, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChoice(choice)}
                        className={`
                          bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 
                          rounded-xl p-4 text-white transition-all duration-200
                          ${choice.emotion === 'excited' ? 'ring-2 ring-yellow-400/50' : ''}
                          ${choice.emotion === 'happy' ? 'ring-2 ring-green-400/50' : ''}
                          ${choice.emotion === 'curious' ? 'ring-2 ring-blue-400/50' : ''}
                          ${choice.emotion === 'sad' ? 'ring-2 ring-gray-400/50' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{choice.text}</span>
                          <ArrowRight size={16} className="ml-2" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={goBack}
                    disabled={storyProgress.length <= 1}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Go Back</span>
                  </button>
                  
                  <div className="text-white/60 text-sm">
                    Scene {currentScene} • Progress: {storyProgress.length} steps
                  </div>
                  
                  <button
                    onClick={() => setCurrentScene(1)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Restart Story
                  </button>
                </div>
              </div>

              {/* Hearts decoration */}
              <div className="absolute top-20 left-10 opacity-20">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="text-pink-300" size={24} />
                </motion.div>
              </div>
              
              <div className="absolute bottom-20 right-10 opacity-20">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Star className="text-yellow-300" size={20} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}