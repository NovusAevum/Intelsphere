import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Zap, Coffee, Cloud, Sun, Moon, Star, 
  TrendingUp, TrendingDown, BarChart3, Activity,
  Smile, Frown, Meh, Angry, Eye, Brain
} from 'lucide-react';

interface MoodData {
  happiness: number;
  energy: number;
  curiosity: number;
  confidence: number;
  social: number;
  stress: number;
  timestamp: number;
}

interface CharacterMood {
  id: string;
  name: string;
  avatar: string;
  currentMood: MoodData;
  moodHistory: MoodData[];
  personalityTraits: {
    optimism: number;
    adventurous: number;
    leadership: number;
    empathy: number;
    intelligence: number;
  };
  emotionalTriggers: {
    positive: string[];
    negative: string[];
  };
  moodFactors: {
    timeOfDay: number;
    userInteraction: number;
    environmentalStimuli: number;
    socialContext: number;
  };
  lastInteraction: number;
  totalInteractions: number;
}

interface MoodEvent {
  type: 'interaction' | 'environmental' | 'social' | 'temporal';
  impact: 'positive' | 'negative' | 'neutral';
  intensity: number;
  description: string;
  timestamp: number;
  characterId: string;
}

export default function CharacterMoodTracker() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('linny');
  const [characters, setCharacters] = useState<Record<string, CharacterMood>>({});
  const [moodEvents, setMoodEvents] = useState<MoodEvent[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');
  const [weatherMood, setWeatherMood] = useState<'sunny' | 'cloudy' | 'rainy' | 'stormy'>('sunny');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodUpdateIntervalRef = useRef<NodeJS.Timeout>();
  const environmentalFactorsRef = useRef<NodeJS.Timeout>();

  // Initialize character mood data
  const initializeCharacters = () => {
    const initialCharacters: Record<string, CharacterMood> = {
      linny: {
        id: 'linny',
        name: 'Linny',
        avatar: '/attached_assets/linny.jpg',
        currentMood: {
          happiness: 85,
          energy: 90,
          curiosity: 95,
          confidence: 88,
          social: 92,
          stress: 15,
          timestamp: Date.now()
        },
        moodHistory: [],
        personalityTraits: {
          optimism: 90,
          adventurous: 85,
          leadership: 95,
          empathy: 88,
          intelligence: 92
        },
        emotionalTriggers: {
          positive: ['problem-solving', 'helping others', 'teamwork', 'new challenges'],
          negative: ['conflict', 'failure', 'isolation', 'uncertainty']
        },
        moodFactors: {
          timeOfDay: 0.8,
          userInteraction: 1.0,
          environmentalStimuli: 0.7,
          socialContext: 0.9
        },
        lastInteraction: Date.now(),
        totalInteractions: 0
      },
      tuck: {
        id: 'tuck',
        name: 'Tuck',
        avatar: '/attached_assets/tuck.jpeg',
        currentMood: {
          happiness: 80,
          energy: 75,
          curiosity: 88,
          confidence: 85,
          social: 85,
          stress: 20,
          timestamp: Date.now()
        },
        moodHistory: [],
        personalityTraits: {
          optimism: 85,
          adventurous: 90,
          leadership: 80,
          empathy: 95,
          intelligence: 88
        },
        emotionalTriggers: {
          positive: ['flying', 'adventure', 'music', 'friendship'],
          negative: ['being grounded', 'loud noises', 'rushing', 'pressure']
        },
        moodFactors: {
          timeOfDay: 0.9,
          userInteraction: 0.8,
          environmentalStimuli: 1.0,
          socialContext: 0.85
        },
        lastInteraction: Date.now(),
        totalInteractions: 0
      },
      mingming: {
        id: 'mingming',
        name: 'Ming-Ming',
        avatar: '/attached_assets/mingming.jpeg',
        currentMood: {
          happiness: 90,
          energy: 85,
          curiosity: 80,
          confidence: 92,
          social: 95,
          stress: 10,
          timestamp: Date.now()
        },
        moodHistory: [],
        personalityTraits: {
          optimism: 95,
          adventurous: 75,
          leadership: 85,
          empathy: 92,
          intelligence: 85
        },
        emotionalTriggers: {
          positive: ['praise', 'cute things', 'dancing', 'social interaction'],
          negative: ['criticism', 'being ignored', 'sad situations', 'loneliness']
        },
        moodFactors: {
          timeOfDay: 0.7,
          userInteraction: 1.2,
          environmentalStimuli: 0.6,
          socialContext: 1.1
        },
        lastInteraction: Date.now(),
        totalInteractions: 0
      }
    };

    setCharacters(initialCharacters);
  };

  // Analyze mood patterns using environmental and interaction data
  const analyzeMoodPattern = (character: CharacterMood): MoodData => {
    const currentTime = Date.now();
    const timeSinceLastInteraction = currentTime - character.lastInteraction;
    const hourOfDay = new Date().getHours();

    // Time-based mood adjustments
    let timeMultiplier = 1.0;
    if (hourOfDay >= 6 && hourOfDay < 12) timeMultiplier = 1.1; // Morning boost
    else if (hourOfDay >= 12 && hourOfDay < 18) timeMultiplier = 1.0; // Afternoon normal
    else if (hourOfDay >= 18 && hourOfDay < 22) timeMultiplier = 0.9; // Evening calm
    else timeMultiplier = 0.7; // Night sleepy

    // Interaction decay - mood decreases if no recent interactions
    const interactionDecay = Math.max(0.5, 1 - (timeSinceLastInteraction / (1000 * 60 * 10))); // 10 min decay

    // Environmental factors
    const weatherImpact = {
      sunny: 1.1,
      cloudy: 0.95,
      rainy: 0.85,
      stormy: 0.7
    }[weatherMood];

    // Calculate new mood values
    const baseMood = character.currentMood;
    const personalityInfluence = character.personalityTraits;

    const newMood: MoodData = {
      happiness: Math.max(0, Math.min(100, 
        baseMood.happiness * timeMultiplier * interactionDecay * weatherImpact * (personalityInfluence.optimism / 100)
      )),
      energy: Math.max(0, Math.min(100,
        baseMood.energy * timeMultiplier * interactionDecay * (personalityInfluence.adventurous / 100)
      )),
      curiosity: Math.max(0, Math.min(100,
        baseMood.curiosity * (1 + (personalityInfluence.intelligence - 50) / 100) * interactionDecay
      )),
      confidence: Math.max(0, Math.min(100,
        baseMood.confidence * (personalityInfluence.leadership / 100) * interactionDecay
      )),
      social: Math.max(0, Math.min(100,
        baseMood.social * (personalityInfluence.empathy / 100) * interactionDecay
      )),
      stress: Math.max(0, Math.min(100,
        baseMood.stress + (100 - interactionDecay * 100) * 0.1
      )),
      timestamp: currentTime
    };

    return newMood;
  };

  // Handle user interactions and mood updates
  const handleInteraction = (characterId: string, interactionType: string, intensity: number) => {
    setCharacters(prev => {
      const character = prev[characterId];
      if (!character) return prev;

      const isPositive = character.emotionalTriggers.positive.some(trigger => 
        interactionType.toLowerCase().includes(trigger.toLowerCase())
      );
      const isNegative = character.emotionalTriggers.negative.some(trigger => 
        interactionType.toLowerCase().includes(trigger.toLowerCase())
      );

      const moodChange = isPositive ? intensity : (isNegative ? -intensity : intensity * 0.3);

      const updatedMood: MoodData = {
        happiness: Math.max(0, Math.min(100, character.currentMood.happiness + moodChange)),
        energy: Math.max(0, Math.min(100, character.currentMood.energy + moodChange * 0.8)),
        curiosity: Math.max(0, Math.min(100, character.currentMood.curiosity + moodChange * 0.6)),
        confidence: Math.max(0, Math.min(100, character.currentMood.confidence + moodChange * 0.7)),
        social: Math.max(0, Math.min(100, character.currentMood.social + moodChange * 0.9)),
        stress: Math.max(0, Math.min(100, character.currentMood.stress - moodChange * 0.5)),
        timestamp: Date.now()
      };

      const newEvent: MoodEvent = {
        type: 'interaction',
        impact: isPositive ? 'positive' : (isNegative ? 'negative' : 'neutral'),
        intensity,
        description: `User ${interactionType} with ${character.name}`,
        timestamp: Date.now(),
        characterId
      };

      setMoodEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events

      return {
        ...prev,
        [characterId]: {
          ...character,
          currentMood: updatedMood,
          moodHistory: [...character.moodHistory, updatedMood].slice(-100), // Keep last 100 mood states
          lastInteraction: Date.now(),
          totalInteractions: character.totalInteractions + 1
        }
      };
    });
  };

  // Environmental mood updates
  useEffect(() => {
    const updateEnvironmentalFactors = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
      else if (hour >= 18 && hour < 22) setTimeOfDay('evening');
      else setTimeOfDay('night');

      // Simulate weather changes
      const weatherOptions: Array<'sunny' | 'cloudy' | 'rainy' | 'stormy'> = ['sunny', 'cloudy', 'rainy', 'stormy'];
      if (Math.random() < 0.1) { // 10% chance of weather change
        setWeatherMood(weatherOptions[Math.floor(Math.random() * weatherOptions.length)]);
      }
    };

    environmentalFactorsRef.current = setInterval(updateEnvironmentalFactors, 60000); // Update every minute
    updateEnvironmentalFactors(); // Initial update

    return () => {
      if (environmentalFactorsRef.current) {
        clearInterval(environmentalFactorsRef.current);
      }
    };
  }, []);

  // Periodic mood analysis
  useEffect(() => {
    moodUpdateIntervalRef.current = setInterval(() => {
      setIsAnalyzing(true);
      
      setCharacters(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(characterId => {
          const character = updated[characterId];
          const newMood = analyzeMoodPattern(character);
          updated[characterId] = {
            ...character,
            currentMood: newMood,
            moodHistory: [...character.moodHistory, newMood].slice(-100)
          };
        });
        return updated;
      });

      setTimeout(() => setIsAnalyzing(false), 500);
    }, 30000); // Update every 30 seconds

    return () => {
      if (moodUpdateIntervalRef.current) {
        clearInterval(moodUpdateIntervalRef.current);
      }
    };
  }, [weatherMood]);

  // Initialize on mount
  useEffect(() => {
    initializeCharacters();
  }, []);

  // Listen for global interactions
  useEffect(() => {
    const handleMouseMove = () => {
      if (Math.random() < 0.1) { // 10% chance to register as interaction
        const characterIds = Object.keys(characters);
        if (characterIds.length > 0) {
          const randomCharacter = characterIds[Math.floor(Math.random() * characterIds.length)];
          handleInteraction(randomCharacter, 'mouse movement', 2);
        }
      }
    };

    const handleClick = () => {
      const characterIds = Object.keys(characters);
      if (characterIds.length > 0) {
        const randomCharacter = characterIds[Math.floor(Math.random() * characterIds.length)];
        handleInteraction(randomCharacter, 'clicked', 5);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [characters]);

  const getMoodEmoji = (mood: MoodData): string => {
    const overall = (mood.happiness + mood.energy - mood.stress) / 3;
    if (overall >= 80) return '😊';
    if (overall >= 60) return '🙂';
    if (overall >= 40) return '😐';
    if (overall >= 20) return '😔';
    return '😢';
  };

  const getMoodColor = (value: number): string => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const selectedCharacterData = characters[selectedCharacter];

  return (
    <>
      {/* Mood Tracker Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Brain size={24} />
      </motion.button>

      {/* Mood Tracker Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-20 right-6 w-96 max-h-[80vh] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Character Mood Tracker</h3>
                {isAnalyzing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="text-cyan-400" size={20} />
                  </motion.div>
                )}
              </div>
              
              {/* Environmental Status */}
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  {timeOfDay === 'morning' && <Sun size={16} className="text-yellow-400" />}
                  {timeOfDay === 'afternoon' && <Sun size={16} className="text-orange-400" />}
                  {timeOfDay === 'evening' && <Star size={16} className="text-purple-400" />}
                  {timeOfDay === 'night' && <Moon size={16} className="text-blue-400" />}
                  <span>{timeOfDay}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {weatherMood === 'sunny' && <Sun size={16} className="text-yellow-400" />}
                  {weatherMood === 'cloudy' && <Cloud size={16} className="text-gray-400" />}
                  {weatherMood === 'rainy' && <Cloud size={16} className="text-blue-400" />}
                  {weatherMood === 'stormy' && <Zap size={16} className="text-purple-400" />}
                  <span>{weatherMood}</span>
                </div>
              </div>
            </div>

            {/* Character Selection */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex space-x-2">
                {Object.values(characters).map(character => (
                  <button
                    key={character.id}
                    onClick={() => setSelectedCharacter(character.id)}
                    className={`
                      flex-1 p-3 rounded-lg border transition-all
                      ${selectedCharacter === character.id 
                        ? 'bg-purple-600/30 border-purple-400' 
                        : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <img 
                        src={character.avatar} 
                        alt={character.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="text-white text-sm font-medium">{character.name}</div>
                        <div className="text-xl">{getMoodEmoji(character.currentMood)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Character Mood Details */}
            {selectedCharacterData && (
              <div className="p-4 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {/* Current Mood */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Current Mood</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Happiness</span>
                        <span className={`font-bold ${getMoodColor(selectedCharacterData.currentMood.happiness)}`}>
                          {Math.round(selectedCharacterData.currentMood.happiness)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Energy</span>
                        <span className={`font-bold ${getMoodColor(selectedCharacterData.currentMood.energy)}`}>
                          {Math.round(selectedCharacterData.currentMood.energy)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Curiosity</span>
                        <span className={`font-bold ${getMoodColor(selectedCharacterData.currentMood.curiosity)}`}>
                          {Math.round(selectedCharacterData.currentMood.curiosity)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Confidence</span>
                        <span className={`font-bold ${getMoodColor(selectedCharacterData.currentMood.confidence)}`}>
                          {Math.round(selectedCharacterData.currentMood.confidence)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Social</span>
                        <span className={`font-bold ${getMoodColor(selectedCharacterData.currentMood.social)}`}>
                          {Math.round(selectedCharacterData.currentMood.social)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Stress</span>
                        <span className={`font-bold ${selectedCharacterData.currentMood.stress > 50 ? 'text-red-400' : 'text-green-400'}`}>
                          {Math.round(selectedCharacterData.currentMood.stress)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interaction Stats */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Interaction Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-sm">Total Interactions</span>
                        <span className="text-cyan-400">{selectedCharacterData.totalInteractions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-sm">Last Interaction</span>
                        <span className="text-gray-400 text-sm">
                          {Math.round((Date.now() - selectedCharacterData.lastInteraction) / 1000)}s ago
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Mood Events */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Recent Events</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {moodEvents
                        .filter(event => event.characterId === selectedCharacter)
                        .slice(0, 5)
                        .map((event, index) => (
                          <div key={index} className="text-sm">
                            <div className={`
                              ${event.impact === 'positive' ? 'text-green-400' : 
                                event.impact === 'negative' ? 'text-red-400' : 'text-gray-400'}
                            `}>
                              {event.description}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {Math.round((Date.now() - event.timestamp) / 1000)}s ago
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}