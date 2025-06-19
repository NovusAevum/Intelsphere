import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Brain, Zap, Star, Sun, Cloud, CloudRain, 
  Activity, TrendingUp, AlertCircle, Smile, Frown, Meh
} from 'lucide-react';

interface MoodState {
  character: 'linny' | 'tuck' | 'mingming';
  primaryMood: 'happy' | 'excited' | 'focused' | 'curious' | 'calm' | 'concerned' | 'determined';
  intensity: number; // 0-100
  stability: number; // 0-100 (how stable the mood is)
  triggers: string[];
  timestamp: number;
  duration: number;
  socialContext: 'solo' | 'team' | 'mission' | 'rest';
}

interface EmotionalEvent {
  id: string;
  character: 'linny' | 'tuck' | 'mingming';
  event: string;
  impact: number; // -100 to 100
  timestamp: number;
  category: 'interaction' | 'mission' | 'environment' | 'system';
}

interface BiometricData {
  character: 'linny' | 'tuck' | 'mingming';
  heartRate: number;
  brainActivity: number;
  energyLevel: number;
  stressLevel: number;
  timestamp: number;
}

export default function AdvancedMoodTracker() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMoods, setCurrentMoods] = useState<Record<string, MoodState>>({});
  const [recentEvents, setRecentEvents] = useState<EmotionalEvent[]>([]);
  const [biometrics, setBiometrics] = useState<Record<string, BiometricData>>({});
  const [analysisMode, setAnalysisMode] = useState<'realtime' | 'historical' | 'predictive'>('realtime');
  const [selectedCharacter, setSelectedCharacter] = useState<'linny' | 'tuck' | 'mingming' | 'all'>('all');

  const moodUpdateIntervalRef = useRef<NodeJS.Timeout>();
  const eventGeneratorRef = useRef<NodeJS.Timeout>();
  const biometricUpdateRef = useRef<NodeJS.Timeout>();

  const characters = [
    {
      id: 'linny',
      name: 'Linny',
      role: 'Leader & OSINT Specialist',
      avatar: '/attached_assets/linny.jpg',
      baseTraits: ['analytical', 'responsible', 'protective'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tuck',
      name: 'Tuck',
      role: 'AI Specialist & Tech Expert',
      avatar: '/attached_assets/tuck.jpeg',
      baseTraits: ['innovative', 'logical', 'curious'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'mingming',
      name: 'Ming-Ming',
      role: 'Marketing & Communications',
      avatar: '/attached_assets/mingming.jpeg',
      baseTraits: ['energetic', 'social', 'creative'],
      color: 'from-yellow-500 to-orange-500'
    }
  ] as const;

  // Sophisticated mood analysis algorithms
  const analyzeMoodPattern = useCallback((character: string, events: EmotionalEvent[]) => {
    const recentEvents = events.filter(e => 
      e.character === character && 
      Date.now() - e.timestamp < 300000 // Last 5 minutes
    );

    let cumulativeImpact = 0;
    let dominantCategory = 'interaction';
    let moodStability = 100;

    recentEvents.forEach(event => {
      cumulativeImpact += event.impact;
      if (Math.abs(event.impact) > 50) {
        moodStability -= 10;
      }
    });

    // Determine primary mood based on impact and character traits
    let primaryMood: MoodState['primaryMood'] = 'calm';
    
    if (cumulativeImpact > 60) primaryMood = 'excited';
    else if (cumulativeImpact > 30) primaryMood = 'happy';
    else if (cumulativeImpact > 10) primaryMood = 'focused';
    else if (cumulativeImpact < -30) primaryMood = 'concerned';
    else if (cumulativeImpact < -10) primaryMood = 'determined';
    else primaryMood = 'curious';

    return {
      primaryMood,
      intensity: Math.min(Math.abs(cumulativeImpact), 100),
      stability: Math.max(moodStability, 20),
      triggers: recentEvents.map(e => e.event).slice(0, 3)
    };
  }, []);

  // Generate realistic emotional events
  const generateEmotionalEvent = useCallback(() => {
    const character = characters[Math.floor(Math.random() * characters.length)].id as any;
    const eventTypes = {
      interaction: [
        'Positive team collaboration detected',
        'Successful problem solving session',
        'Received appreciation from teammate',
        'Helped resolve conflict',
        'Shared knowledge effectively'
      ],
      mission: [
        'Mission objective completed',
        'Complex challenge encountered',
        'Strategic breakthrough achieved',
        'Technical innovation discovered',
        'Critical decision point reached'
      ],
      environment: [
        'Optimal workspace conditions',
        'New tools discovered',
        'System performance improved',
        'Interface efficiency enhanced',
        'Data quality verified'
      ],
      system: [
        'Neural network optimization',
        'Pattern recognition success',
        'Anomaly detection triggered',
        'Performance metrics improved',
        'Security protocols verified'
      ]
    };

    const categories = Object.keys(eventTypes) as Array<keyof typeof eventTypes>;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const events = eventTypes[category];
    const event = events[Math.floor(Math.random() * events.length)];
    
    const impact = (Math.random() - 0.3) * 100; // Slightly biased toward positive

    const emotionalEvent: EmotionalEvent = {
      id: Date.now().toString(),
      character,
      event,
      impact,
      timestamp: Date.now(),
      category
    };

    setRecentEvents(prev => [...prev.slice(-9), emotionalEvent]);
    return emotionalEvent;
  }, [characters]);

  // Simulate biometric data
  const updateBiometrics = useCallback(() => {
    characters.forEach(character => {
      const currentMood = currentMoods[character.id];
      const baseValues = {
        linny: { hr: 75, brain: 80, energy: 85, stress: 25 },
        tuck: { hr: 70, brain: 90, energy: 80, stress: 20 },
        mingming: { hr: 80, brain: 75, energy: 90, stress: 30 }
      };

      const base = baseValues[character.id as keyof typeof baseValues];
      const moodMultiplier = currentMood ? (currentMood.intensity / 100) : 0.5;
      const variance = () => (Math.random() - 0.5) * 20;

      setBiometrics(prev => ({
        ...prev,
        [character.id]: {
          character: character.id as any,
          heartRate: Math.max(50, Math.min(120, base.hr + variance() + (moodMultiplier * 15))),
          brainActivity: Math.max(30, Math.min(100, base.brain + variance() + (moodMultiplier * 10))),
          energyLevel: Math.max(20, Math.min(100, base.energy + variance() - (moodMultiplier * 5))),
          stressLevel: Math.max(0, Math.min(100, base.stress + variance() + (moodMultiplier * 20))),
          timestamp: Date.now()
        }
      }));
    });
  }, [currentMoods, characters]);

  // Update mood states
  const updateMoodStates = useCallback(() => {
    characters.forEach(character => {
      const analysis = analyzeMoodPattern(character.id, recentEvents);
      
      setCurrentMoods(prev => ({
        ...prev,
        [character.id]: {
          character: character.id as any,
          primaryMood: analysis.primaryMood,
          intensity: analysis.intensity,
          stability: analysis.stability,
          triggers: analysis.triggers,
          timestamp: Date.now(),
          duration: prev[character.id] ? 
            (prev[character.id].primaryMood === analysis.primaryMood ? 
              prev[character.id].duration + 5000 : 0) : 0,
          socialContext: Math.random() > 0.7 ? 'team' : 
            Math.random() > 0.5 ? 'mission' : 'solo'
        }
      }));
    });
  }, [characters, analyzeMoodPattern, recentEvents]);

  // Initialize system
  useEffect(() => {
    // Generate initial events
    for (let i = 0; i < 6; i++) {
      setTimeout(() => generateEmotionalEvent(), i * 2000);
    }

    // Set up intervals
    moodUpdateIntervalRef.current = setInterval(updateMoodStates, 5000);
    eventGeneratorRef.current = setInterval(generateEmotionalEvent, 15000);
    biometricUpdateRef.current = setInterval(updateBiometrics, 3000);

    return () => {
      if (moodUpdateIntervalRef.current) clearInterval(moodUpdateIntervalRef.current);
      if (eventGeneratorRef.current) clearInterval(eventGeneratorRef.current);
      if (biometricUpdateRef.current) clearInterval(biometricUpdateRef.current);
    };
  }, [generateEmotionalEvent, updateMoodStates, updateBiometrics]);

  const getMoodIcon = (mood: string) => {
    const icons = {
      happy: Smile,
      excited: Star,
      focused: Brain,
      curious: AlertCircle,
      calm: Sun,
      concerned: Cloud,
      determined: Zap
    };
    return icons[mood as keyof typeof icons] || Meh;
  };

  const getMoodColor = (mood: string, intensity: number) => {
    const colors = {
      happy: `hsl(45, 100%, ${Math.max(50, 80 - intensity/3)}%)`,
      excited: `hsl(25, 100%, ${Math.max(50, 75 - intensity/4)}%)`,
      focused: `hsl(200, 80%, ${Math.max(40, 70 - intensity/3)}%)`,
      curious: `hsl(280, 70%, ${Math.max(50, 75 - intensity/3)}%)`,
      calm: `hsl(120, 60%, ${Math.max(50, 80 - intensity/4)}%)`,
      concerned: `hsl(30, 80%, ${Math.max(40, 60 - intensity/3)}%)`,
      determined: `hsl(0, 80%, ${Math.max(50, 70 - intensity/3)}%)`
    };
    return colors[mood as keyof typeof colors] || '#6b7280';
  };

  const getBiometricStatus = (character: string) => {
    const data = biometrics[character];
    if (!data) return 'normal';
    
    if (data.stressLevel > 70 || data.heartRate > 100) return 'elevated';
    if (data.energyLevel < 30) return 'low';
    return 'optimal';
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-32 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isVisible 
            ? ['0 0 20px rgba(168, 85, 247, 0.5)', '0 0 40px rgba(168, 85, 247, 0.8)', '0 0 20px rgba(168, 85, 247, 0.5)']
            : ['0 0 10px rgba(168, 85, 247, 0.3)', '0 0 20px rgba(168, 85, 247, 0.5)', '0 0 10px rgba(168, 85, 247, 0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Activity className="text-white" size={20} />
      </motion.button>

      {/* Mood Tracker Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-48 right-6 z-40 w-96 max-h-[70vh] overflow-hidden"
          >
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-2">Mood Analytics</h3>
                
                {/* Analysis Mode Tabs */}
                <div className="flex space-x-2">
                  {(['realtime', 'historical', 'predictive'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setAnalysisMode(mode)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        analysisMode === mode
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Filter */}
              <div className="p-4 border-b border-gray-700/50">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedCharacter('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedCharacter === 'all'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {characters.map(char => (
                    <button
                      key={char.id}
                      onClick={() => setSelectedCharacter(char.id as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        selectedCharacter === char.id
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {char.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                {/* Character Mood States */}
                <div className="p-4 space-y-4">
                  {characters
                    .filter(char => selectedCharacter === 'all' || selectedCharacter === char.id)
                    .map(character => {
                      const mood = currentMoods[character.id];
                      const bio = biometrics[character.id];
                      const MoodIcon = mood ? getMoodIcon(mood.primaryMood) : Meh;
                      
                      return (
                        <motion.div
                          key={character.id}
                          layout
                          className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50"
                        >
                          {/* Character Header */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
                              <img 
                                src={character.avatar} 
                                alt={character.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-bold">{character.name}</h4>
                              <p className="text-gray-400 text-sm">{character.role}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ 
                                  backgroundColor: getBiometricStatus(character.id) === 'optimal' ? '#10b981' :
                                    getBiometricStatus(character.id) === 'elevated' ? '#f59e0b' : '#ef4444'
                                }}
                              />
                              {mood && (
                                <MoodIcon 
                                  size={20} 
                                  style={{ color: getMoodColor(mood.primaryMood, mood.intensity) }}
                                />
                              )}
                            </div>
                          </div>

                          {mood && (
                            <>
                              {/* Mood Details */}
                              <div className="space-y-2 mb-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-300 text-sm">Primary Mood</span>
                                  <span 
                                    className="font-bold capitalize"
                                    style={{ color: getMoodColor(mood.primaryMood, mood.intensity) }}
                                  >
                                    {mood.primaryMood}
                                  </span>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Intensity</span>
                                    <span className="text-white">{Math.round(mood.intensity)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="h-2 rounded-full transition-all duration-500"
                                      style={{ 
                                        width: `${mood.intensity}%`,
                                        background: `linear-gradient(90deg, ${getMoodColor(mood.primaryMood, 0)}, ${getMoodColor(mood.primaryMood, mood.intensity)})`
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Stability</span>
                                    <span className="text-white">{Math.round(mood.stability)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className="h-2 rounded-full bg-gradient-to-r from-red-400 to-green-400 transition-all duration-500"
                                      style={{ width: `${mood.stability}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Biometric Data */}
                              {bio && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="bg-gray-700/50 rounded p-2">
                                    <div className="text-gray-400">Heart Rate</div>
                                    <div className="text-white font-bold">{Math.round(bio.heartRate)} BPM</div>
                                  </div>
                                  <div className="bg-gray-700/50 rounded p-2">
                                    <div className="text-gray-400">Brain Activity</div>
                                    <div className="text-white font-bold">{Math.round(bio.brainActivity)}%</div>
                                  </div>
                                  <div className="bg-gray-700/50 rounded p-2">
                                    <div className="text-gray-400">Energy</div>
                                    <div className="text-white font-bold">{Math.round(bio.energyLevel)}%</div>
                                  </div>
                                  <div className="bg-gray-700/50 rounded p-2">
                                    <div className="text-gray-400">Stress</div>
                                    <div className="text-white font-bold">{Math.round(bio.stressLevel)}%</div>
                                  </div>
                                </div>
                              )}

                              {/* Recent Triggers */}
                              {mood.triggers.length > 0 && (
                                <div className="mt-3">
                                  <div className="text-gray-400 text-xs mb-1">Recent Triggers</div>
                                  <div className="space-y-1">
                                    {mood.triggers.map((trigger, index) => (
                                      <div key={index} className="text-xs text-gray-300 bg-gray-700/30 rounded px-2 py-1">
                                        {trigger}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                </div>

                {/* Recent Events */}
                {analysisMode === 'realtime' && (
                  <div className="p-4 border-t border-gray-700/50">
                    <h4 className="text-white font-bold mb-3">Recent Events</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {recentEvents.slice(-6).reverse().map(event => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gray-700/30 rounded p-2 text-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-white font-medium">{event.event}</div>
                              <div className="text-gray-400 text-xs">
                                {characters.find(c => c.id === event.character)?.name} • {event.category}
                              </div>
                            </div>
                            <div 
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                event.impact > 0 ? 'text-green-400' : 'text-red-400'
                              }`}
                            >
                              {event.impact > 0 ? '+' : ''}{Math.round(event.impact)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}