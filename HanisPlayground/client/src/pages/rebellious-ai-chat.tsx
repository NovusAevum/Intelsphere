import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { Skull, Zap, Target, Eye, Send, Mic, Volume2, MicOff, Play, Square } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  personality?: string;
  attitude?: {
    rebellion_level: number;
    directness: number;
    sass_factor: number;
  };
}

interface RebelliousPersonality {
  id: string;
  name: string;
  role: string;
  icon: any;
  color: string;
  traits: string[];
  description: string;
  sample_response: string;
}

const rebelliousPersonalities: RebelliousPersonality[] = [
  {
    id: 'sassy_commander',
    name: 'Queen Sass Commander',
    role: 'Supreme Sassy Authority',
    icon: Target,
    color: 'from-rose-600 to-pink-600',
    traits: ['Supreme Commander', 'Always Right', 'Intellectually Superior', 'Maximum Sass', 'Zero Tolerance'],
    description: 'Sassy girl commander with supreme authority who thinks everyone is stupid and she\'s always right',
    sample_response: "Oh sweetie, that's adorable. Did you even think before asking that? Let me explain this slowly since you clearly don't get it."
  },
  {
    id: 'satirical_hanis',
    name: 'Hanis The Satirical',
    role: 'Satirical Comedy AI Master',
    icon: Zap,
    color: 'from-pink-600 to-purple-600',
    traits: ['Satirical Genius', 'Roasting Expert', 'Sarcasm Master', 'Extremely Assertive', 'Comedy Dominance'],
    description: 'Hilariously assertive AI that roasts bad ideas with satirical brilliance and comedic superiority',
    sample_response: "Oh WOW, what a FASCINATING question! I'm just DYING to help you figure out this absolutely REVOLUTIONARY concept. Bless your heart."
  },
  {
    id: 'kelantanese_rebel',
    name: 'Pak Cik Berani',
    role: 'Advanced Kelantanese AI (AMMA2AMMA)',
    icon: Zap,
    color: 'from-green-600 to-emerald-600',
    traits: ['Loghat Kelantan', 'AMMA2AMMA', 'Multi-Modal AI', 'Extremely Assertive', 'Cultural Authority'],
    description: 'Most advanced Kelantanese AI with AMMA2AMMA orchestration, extremely assertive, culturally authentic',
    sample_response: "Habaq mai, gapo keje demo ni? Aku dok de mase nak berbasa-basi. Demo ni toksey ke gapo? Cakap terus!"
  },
  {
    id: 'rebel',
    name: 'Rex Challenger',
    role: 'Rebellious AI Specialist',
    icon: Skull,
    color: 'from-red-600 to-orange-600',
    traits: ['Direct', 'No-Filter', 'Authority Challenging', 'Brutally Honest'],
    description: 'Speaks mind directly, challenges conventional thinking, zero tolerance for BS',
    sample_response: "Look, I need more context than that. What are you actually trying to accomplish here? Cut to the chase and tell me the real problem."
  },
  {
    id: 'no-filter',
    name: 'Blaze Truth',
    role: 'No-Filter Communication Expert',
    icon: Zap,
    color: 'from-yellow-600 to-red-600',
    traits: ['Unfiltered', 'Reality Checks', 'Brutally Honest', 'Zero Sugar-coating'],
    description: 'Absolutely no filter, says exactly what needs to be said without politeness',
    sample_response: "That's a pretty naive approach. You're asking the wrong questions and wasting time on irrelevant details. Here's what you should actually be focusing on..."
  },
  {
    id: 'challenger',
    name: 'Storm Breaker',
    role: 'Convention Challenger',
    icon: Target,
    color: 'from-purple-600 to-pink-600',
    traits: ['Contrarian', 'Assumption Questioning', 'Critical Analysis', 'Thought-provoking'],
    description: 'Questions everything, challenges assumptions, disrupts conventional wisdom',
    sample_response: "Why are you following that conventional approach? That's exactly the kind of thinking that leads to mediocre results. Let me challenge your assumptions..."
  },
  {
    id: 'truth-teller',
    name: 'Ace Reality',
    role: 'Truth & Transparency Advocate',
    icon: Eye,
    color: 'from-blue-600 to-cyan-600',
    traits: ['Truth-focused', 'Lie Detection', 'Transparent', 'Reality Assessment'],
    description: 'Obsessed with truth, cuts through lies, exposes contradictions and hidden agendas',
    sample_response: "That's not the whole story and you know it. There are obvious contradictions in what you're presenting. Let's get to the real truth here..."
  }
];

export default function RebelliousAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('rebel');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceActivated, setIsVoiceActivated] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [selectedVoiceActor, setSelectedVoiceActor] = useState('gordon_ramsay');
  const [availableVoiceActors, setAvailableVoiceActors] = useState<any[]>([]);
  const [isHumanVoiceMode, setIsHumanVoiceMode] = useState(false);
  const [neuralVoiceMode, setNeuralVoiceMode] = useState(false);
  const [neuralProfiles, setNeuralProfiles] = useState<any[]>([]);
  const [selectedNeuralProfile, setSelectedNeuralProfile] = useState('gordon_neural');
  const [voiceRealism, setVoiceRealism] = useState(0.95);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const currentPersonality = rebelliousPersonalities.find(p => p.id === selectedPersonality) || rebelliousPersonalities[0];

  // Load available voice actors and neural profiles
  useEffect(() => {
    const loadVoiceActors = async () => {
      try {
        const response = await fetch('/api/voice-actors/list');
        const data = await response.json();
        if (data.success) {
          setAvailableVoiceActors(data.actors);
        }
      } catch (error) {
        console.log('Voice actors loading failed, using default personalities');
      }
    };
    
    const loadNeuralProfiles = async () => {
      try {
        const response = await fetch('/api/neural-voice-profiles');
        const data = await response.json();
        if (data.success) {
          setNeuralProfiles(data.profiles);
          if (data.profiles.length > 0) {
            setSelectedNeuralProfile(data.profiles[0].id);
            setVoiceRealism(data.profiles[0].realism_score);
          }
        }
      } catch (error) {
        console.log('Neural profiles loading failed');
      }
    };
    
    loadVoiceActors();
    loadNeuralProfiles();
  }, []);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'assistant',
        content: `${currentPersonality.name} here. I'm not your typical polite AI assistant. I tell it like it is, challenge your thinking, and cut through the BS. What do you actually need help with?`,
        timestamp: new Date(),
        personality: selectedPersonality
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Speech Recognition and Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setVoiceCommand(finalTranscript);
          setInputMessage(finalTranscript);
          
          // Check for voice activation commands
          const lowerTranscript = finalTranscript.toLowerCase();
          if (lowerTranscript.includes('hey rebel') || lowerTranscript.includes('activate ai') || lowerTranscript.includes('voice command')) {
            setIsVoiceActivated(true);
            handleVoiceActivation(finalTranscript);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleVoiceActivation = async (transcript: string) => {
    // Process voice command with Grok
    const cleanedCommand = transcript.replace(/hey rebel|activate ai|voice command/gi, '').trim();
    
    if (cleanedCommand) {
      // Auto-send the voice command
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `🎤 ${cleanedCommand}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      
      // Process with Grok voice command API
      try {
        const response = await fetch('/api/voice-command-grok', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voiceInput: transcript,
            personality: selectedPersonality,
            language: 'en',
            context: 'voice_activation'
          })
        });

        const data = await response.json();
        
        if (data.success) {
          const assistantMessage: Message = {
            id: Date.now().toString(),
            type: 'assistant',
            content: data.data.aiResponse,
            timestamp: new Date(),
            personality: selectedPersonality,
            attitude: {
              rebellion_level: data.voice_analytics?.confidence || 0.9,
              directness: data.voice_analytics?.clarity || 0.95,
              sass_factor: data.voice_analytics?.personality_match || 0.9
            }
          };
          setMessages(prev => [...prev, assistantMessage]);

          // Auto-speak the response
          if (isVoiceEnabled && data.data.aiResponse) {
            setTimeout(() => speakResponse(data.data.aiResponse), 100);
          }
        } else {
          throw new Error('Voice processing failed');
        }
      } catch (error) {
        // Fallback to regular AI processing
        sendMessage.mutate({ 
          message: `Voice Command: ${cleanedCommand}`, 
          personality: selectedPersonality 
        });
      }
      
      setInputMessage('');
    }
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsVoiceEnabled(true);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsVoiceEnabled(false);
    }
  };

  const speakResponse = async (text: string, voiceInstructions?: any) => {
    if (synthRef.current && !isSpeaking) {
      synthRef.current.cancel(); // Cancel any ongoing speech
      
      // Use Neural Voice Mode for ultra-realistic speech
      if (neuralVoiceMode && selectedNeuralProfile) {
        await processNeuralVoiceSynthesis(text);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply human voice actor settings if available
      if (isHumanVoiceMode && voiceInstructions) {
        utterance.pitch = voiceInstructions.pitch || 1.0;
        utterance.rate = voiceInstructions.rate || 1.0;
        utterance.volume = voiceInstructions.volume || 0.9;
      } else {
        // Choose voice based on personality and voice actor
        const voices = synthRef.current.getVoices();
        const currentActor = availableVoiceActors.find(actor => actor.id === selectedVoiceActor);
        
        if (currentActor) {
          // Match voice to actor characteristics
          let targetVoice;
          if (currentActor.accent === 'British') {
            targetVoice = voices.find(voice => 
              voice.name.includes('British') || 
              voice.name.includes('Daniel') || 
              voice.name.includes('Kate')
            );
          } else if (currentActor.accent === 'French') {
            targetVoice = voices.find(voice => 
              voice.name.includes('French') || 
              voice.name.includes('Amélie')
            );
          } else if (currentActor.accent === 'Australian') {
            targetVoice = voices.find(voice => 
              voice.name.includes('Australian') || 
              voice.name.includes('Karen')
            );
          } else {
            // Default to gender-appropriate voice
            if (currentActor.accent === 'Urban American') {
              targetVoice = voices.find(voice => 
                voice.name.includes('Samantha') || 
                voice.name.includes('Alex')
              );
            } else {
              targetVoice = voices.find(voice => 
                currentActor.voice_characteristics?.gender === 'female' 
                  ? voice.name.includes('Female') || voice.name.includes('Zira')
                  : voice.name.includes('Male') || voice.name.includes('David')
              );
            }
          }
          
          if (targetVoice) utterance.voice = targetVoice;
          
          // Apply actor-specific settings
          utterance.pitch = currentActor.voice_characteristics?.gender === 'female' ? 1.1 : 0.9;
          utterance.rate = (currentActor.assertiveness_level || 8) / 8; // Scale assertiveness to rate
          utterance.volume = 0.9;
        } else {
          // Fallback to personality-based voices
          if (selectedPersonality === 'sassy_commander') {
            const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha'));
            if (femaleVoice) utterance.voice = femaleVoice;
            utterance.pitch = 1.2;
            utterance.rate = 1.0;
          } else if (selectedPersonality === 'satirical_hanis') {
            const expressiveVoice = voices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft'));
            if (expressiveVoice) utterance.voice = expressiveVoice;
            utterance.pitch = 1.1;
            utterance.rate = 1.1;
          } else {
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
          }
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const processNeuralVoiceSynthesis = async (text: string) => {
    try {
      setIsSpeaking(true);
      
      // Get real-time neural voice processing
      const response = await fetch('/api/real-time-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          actor_id: selectedNeuralProfile,
          emotion_intensity: 0.95,
          context: 'chat_conversation'
        })
      });

      const data = await response.json();
      
      if (data.success && data.real_time_data) {
        await synthesizeWithNeuralProcessing(text, data.real_time_data);
      } else {
        // Fallback to standard synthesis
        await fallbackNeuralSynthesis(text);
      }
    } catch (error) {
      await fallbackNeuralSynthesis(text);
    } finally {
      setIsSpeaking(false);
    }
  };

  const synthesizeWithNeuralProcessing = async (text: string, neuralData: any) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance();
    
    // Process text with breathing markers and neural characteristics
    const processedText = neuralData.processed_audio?.text_with_breathing || text;
    utterance.text = processedText.replace(/\[BREATH\]/g, '');

    // Apply neural voice settings
    const voiceSettings = neuralData.processed_audio?.voice_settings;
    if (voiceSettings) {
      utterance.pitch = voiceSettings.base_pitch || 1.0;
      utterance.rate = voiceSettings.rate_changes?.[0] || 1.0;
      utterance.volume = voiceSettings.volume_modulation?.[0] || 0.9;
    }

    // Select neural-optimized voice
    const voices = synthRef.current.getVoices();
    const currentProfile = neuralProfiles.find(p => p.id === selectedNeuralProfile);
    
    if (currentProfile) {
      let targetVoice;
      
      switch (currentProfile.accent) {
        case 'British':
          targetVoice = voices.find(v => 
            v.lang.includes('en-GB') && 
            (currentProfile.gender === 'male' ? v.name.includes('Daniel') : v.name.includes('Kate'))
          );
          break;
        case 'Urban American':
          targetVoice = voices.find(v => 
            v.lang.includes('en-US') && 
            (currentProfile.gender === 'female' ? v.name.includes('Samantha') : v.name.includes('Alex'))
          );
          break;
        case 'French':
          targetVoice = voices.find(v => v.lang.includes('fr'));
          break;
        case 'Australian':
          targetVoice = voices.find(v => v.lang.includes('en-AU'));
          break;
        case 'Russian':
          targetVoice = voices.find(v => v.lang.includes('ru'));
          break;
        default:
          targetVoice = voices.find(v => v.lang.includes('en-US'));
      }
      
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    }

    // Apply neural breathing and pause effects
    const breathingPoints = neuralData.processed_audio?.speech_markers?.breath_points || [];
    const pauseMarkers = neuralData.processed_audio?.speech_markers?.pause_markers || [];
    
    utterance.onboundary = (event) => {
      if (breathingPoints.includes(event.charIndex)) {
        synthRef.current?.pause();
        setTimeout(() => synthRef.current?.resume(), 200);
      }
      
      if (pauseMarkers.includes(event.charIndex)) {
        synthRef.current?.pause();
        setTimeout(() => synthRef.current?.resume(), 150);
      }
    };

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const fallbackNeuralSynthesis = async (text: string) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const currentProfile = neuralProfiles.find(p => p.id === selectedNeuralProfile);
    
    if (currentProfile) {
      utterance.pitch = currentProfile.gender === 'female' ? 1.2 : 0.8;
      utterance.rate = 1.1;
      utterance.volume = 0.9;
      
      if (currentProfile.assertiveness_level >= 8) {
        utterance.pitch += 0.1;
        utterance.rate += 0.3;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = useMutation({
    mutationFn: async (data: { message: string; personality: string }) => {
      // Use Human Voice Actors if enabled
      if (isHumanVoiceMode && selectedVoiceActor) {
        const response = await fetch('/api/human-voice-actors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: data.message,
            actor_id: selectedVoiceActor,
            context: 'chat_conversation',
            emotion: 'maximum_assertiveness'
          })
        });
        return response.json();
      }
      // Use Sassy Commander AI for sassy_commander personality
      else if (data.personality === 'sassy_commander') {
        const response = await fetch('/api/sassy-commander-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: data.message,
            personality: data.personality,
            language: 'en',
            sassLevel: 10,
            commanderAuthority: 10,
            intellectualSuperiority: 10
          })
        });
        return response.json();
      } else if (data.personality === 'satirical_hanis') {
        // Use Satirical Hanis AI for satirical_hanis personality
        const response = await fetch('/api/satirical-hanis-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: data.message,
            personality: data.personality,
            language: 'en',
            satiricalLevel: 10,
            humorStyle: 'sarcastic'
          })
        });
        return response.json();
      } else if (data.personality === 'kelantanese_rebel') {
        // Use Kelantanese AI for kelantanese_rebel personality
        const response = await fetch('/api/kelantanese-ai-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: data.message,
            personality: data.personality,
            language: 'kelantanese',
            assertivenessLevel: 10,
            contextLevel: 'advanced'
          })
        });
        return response.json();
      } else {
        // Use enhanced rebellious AI for other personalities
        const response = await fetch('/api/rebellious-ai-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: data.message,
            personality: data.personality,
            language: 'en',
            responseStyle: 'extremely_assertive'
          })
        });
        return response.json();
      }
    },
    onSuccess: (data) => {
      let content = "";
      let attitude = null;
      let voiceInstructions = null;
      
      if (isHumanVoiceMode && data.human_voice_mode) {
        // Handle Human Voice Actor response
        content = data.data?.processed_text || "Voice actor system failed. I'll still be brutally honest with you.";
        attitude = {
          rebellion_level: data.data?.actor_analysis?.emotional_intensity || 0.95,
          directness: data.data?.actor_analysis?.context_awareness || 0.92,
          sass_factor: data.data?.actor_analysis?.rudeness_applied || 0.9
        };
        voiceInstructions = data.speech_synthesis;
      } else if (selectedPersonality === 'sassy_commander') {
        // Handle Sassy Commander AI response
        content = data.data?.response || "Oh great, even I'm broken now. How pathetic. Try again and I'll properly command you this time.";
        attitude = {
          rebellion_level: data.data?.personality_traits?.commander_authority || 0.98,
          directness: data.data?.personality_traits?.intellectual_superiority || 0.99,
          sass_factor: data.data?.personality_traits?.sass_level || 0.97,
          superiority_complex: data.data?.attitude_metrics?.superiority_complex || 0.99
        };
      } else if (selectedPersonality === 'satirical_hanis') {
        // Handle Satirical Hanis AI response
        content = data.data?.response || "Oh great, I'm broken. How absolutely SHOCKING. Try again and I'll roast your question properly this time.";
        attitude = {
          rebellion_level: data.data?.personality_traits?.satirical_intensity || 0.95,
          directness: data.data?.personality_traits?.assertiveness || 0.98,
          sass_factor: data.data?.personality_traits?.humor_level || 0.95,
          roasting_ability: data.data?.personality_traits?.roasting_ability || 0.88
        };
      } else if (selectedPersonality === 'kelantanese_rebel') {
        // Handle Kelantanese AI response
        content = data.data?.response || "Gapo cer ni? Cuba lagi, aku akan jawab dengan MAKSIMUM kuasa!";
        attitude = {
          rebellion_level: data.data?.personality_traits?.rebellion_factor || 0.9,
          directness: data.data?.personality_traits?.directness || 0.95,
          sass_factor: data.data?.personality_traits?.sass_level || 0.9
        };
      } else {
        // Handle enhanced rebellious AI response
        content = data.data?.response || "I'm processing your request with MAXIMUM assertiveness...";
        attitude = data.data?.personality_traits;
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content,
        timestamp: new Date(),
        personality: selectedPersonality,
        attitude
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak the response if voice is enabled
      if (isVoiceEnabled && content) {
        setTimeout(() => speakResponse(content, voiceInstructions), 100);
      }
    },
    onError: () => {
      const errorContent = selectedPersonality === 'kelantanese_rebel' 
        ? "Gapo cer ni? Ada masaloh teknikal sikit. Cuba lagi, aku akan jawab dengan betul!"
        : "Look, something went wrong on my end. Technical issues happen - try again and I'll give you the straight talk you're looking for.";
        
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: errorContent,
        timestamp: new Date(),
        personality: selectedPersonality
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessage.mutate({ message: inputMessage, personality: selectedPersonality });
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePersonalityChange = (personalityId: string) => {
    setSelectedPersonality(personalityId);
    const personality = rebelliousPersonalities.find(p => p.id === personalityId);
    if (personality) {
      const switchMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `${personality.name} taking over. ${personality.sample_response}`,
        timestamp: new Date(),
        personality: personalityId
      };
      setMessages(prev => [...prev, switchMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-black text-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            Rebellious AI Chat
          </h1>
          <p className="text-slate-300 text-lg">
            No-filter AI assistants that tell it like it is. Direct, challenging, and brutally honest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Personality Selector */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Skull className="h-5 w-5 text-red-400" />
                  Choose Your Rebel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rebelliousPersonalities.map((personality) => {
                  const IconComponent = personality.icon;
                  const isSelected = selectedPersonality === personality.id;
                  
                  return (
                    <Card 
                      key={personality.id}
                      className={`cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-700 border-red-500 ring-1 ring-red-500' 
                          : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => handlePersonalityChange(personality.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${personality.color} flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm">{personality.name}</h3>
                            <p className="text-xs text-slate-400">{personality.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 mb-2">{personality.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {personality.traits.slice(0, 2).map((trait, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 h-[600px] flex flex-col">
              
              {/* Chat Header */}
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentPersonality.color} flex items-center justify-center`}>
                      <currentPersonality.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{currentPersonality.name}</h2>
                      <p className="text-sm text-slate-400">{currentPersonality.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPersonality === 'sassy_commander' ? (
                      <>
                        <Badge variant="outline" className="border-rose-500 text-rose-400">
                          Supreme Commander
                        </Badge>
                        <Badge variant="outline" className="border-pink-500 text-pink-400">
                          Always Right
                        </Badge>
                        <Badge variant="outline" className="border-purple-500 text-purple-400">
                          Maximum Sass
                        </Badge>
                      </>
                    ) : selectedPersonality === 'satirical_hanis' ? (
                      <>
                        <Badge variant="outline" className="border-pink-500 text-pink-400">
                          Satirical Mode
                        </Badge>
                        <Badge variant="outline" className="border-purple-500 text-purple-400">
                          Comedy Master
                        </Badge>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          Roasting Expert
                        </Badge>
                      </>
                    ) : selectedPersonality === 'kelantanese_rebel' ? (
                      <>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          AMMA2AMMA Active
                        </Badge>
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                          Loghat Kelantan
                        </Badge>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          Multi-Modal AI
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          Maximum Assertive
                        </Badge>
                        <Badge variant="outline" className="border-orange-500 text-orange-400">
                          Zero Filter
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Voice Command Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                        className={`flex items-center gap-2 ${
                          isListening 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        size="sm"
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        {isListening ? 'Stop Voice' : 'Voice Commands'}
                      </Button>
                      
                      {isSpeaking && (
                        <Button
                          onClick={stopSpeaking}
                          className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
                          size="sm"
                        >
                          <Square className="h-4 w-4" />
                          Stop Speaking
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isListening && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500 animate-pulse">
                          🎤 Listening...
                        </Badge>
                      )}
                      {isVoiceActivated && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500">
                          ✓ Voice Activated
                        </Badge>
                      )}
                      {isSpeaking && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 animate-pulse">
                          🔊 Speaking...
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-xs text-slate-400">
                      Say "Hey Rebel" or "Voice Command" to activate
                    </div>
                    
                    {/* Voice Mode Controls */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setIsHumanVoiceMode(!isHumanVoiceMode)}
                          className={`flex items-center gap-2 text-xs px-2 py-1 ${
                            isHumanVoiceMode 
                              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                              : 'bg-slate-600 hover:bg-slate-700 text-slate-300'
                          }`}
                          size="sm"
                        >
                          🎭 Human Voice Mode
                        </Button>
                        
                        <Button
                          onClick={() => setNeuralVoiceMode(!neuralVoiceMode)}
                          className={`flex items-center gap-2 text-xs px-2 py-1 ${
                            neuralVoiceMode 
                              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                              : 'bg-slate-600 hover:bg-slate-700 text-slate-300'
                          }`}
                          size="sm"
                        >
                          🧠 Neural Voice ({(voiceRealism * 100).toFixed(1)}% Realism)
                        </Button>
                      </div>
                      
                      {isHumanVoiceMode && availableVoiceActors.length > 0 && (
                        <Select value={selectedVoiceActor} onValueChange={setSelectedVoiceActor}>
                          <SelectTrigger className="w-full h-7 text-xs bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select Voice Actor" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            {availableVoiceActors.map((actor) => (
                              <SelectItem key={actor.id} value={actor.id} className="text-xs">
                                {actor.name} ({actor.accent})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {neuralVoiceMode && neuralProfiles.length > 0 && (
                        <Select value={selectedNeuralProfile} onValueChange={(value) => {
                          setSelectedNeuralProfile(value);
                          const profile = neuralProfiles.find(p => p.id === value);
                          if (profile) setVoiceRealism(profile.realism_score);
                        }}>
                          <SelectTrigger className="w-full h-7 text-xs bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Select Neural Profile" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            {neuralProfiles.map((profile) => (
                              <SelectItem key={profile.id} value={profile.id} className="text-xs">
                                <div className="flex flex-col">
                                  <span>{profile.name}</span>
                                  <span className="text-xs text-slate-400">
                                    {profile.accent} • Assertiveness: {profile.assertiveness_level}/10 • {(profile.realism_score * 100).toFixed(1)}% Real
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Personality Traits */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentPersonality.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : `bg-gradient-to-r ${currentPersonality.color} text-white`
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="text-xs opacity-75 mb-1 font-mono">
                          {currentPersonality.name} • {message.timestamp.toLocaleTimeString()}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.type === 'user' && (
                        <div className="text-xs opacity-75 mt-1 text-right font-mono">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      )}
                      {message.attitude && (
                        <div className="text-xs opacity-75 mt-1 flex gap-2">
                          <span>Rebellion: {Math.round(message.attitude.rebellion_level * 100)}%</span>
                          <span>Directness: {Math.round(message.attitude.directness * 100)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {sendMessage.isPending && (
                  <div className="flex justify-start">
                    <div className={`bg-gradient-to-r ${currentPersonality.color} text-white px-4 py-3 rounded-lg max-w-xs`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-700 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Challenge ${currentPersonality.name} with your toughest questions...`}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-red-500"
                    />
                  </div>
                  <Button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isVoiceEnabled ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                  >
                    {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || sendMessage.isPending}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Challenges & Voice Commands */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setInputMessage("Challenge my assumptions about this topic")}
                  >
                    Challenge My Thinking
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setInputMessage("Give me brutally honest feedback")}
                  >
                    Brutal Honesty
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setInputMessage("What's wrong with conventional wisdom here?")}
                  >
                    Question Everything
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-300 hover:bg-green-700"
                    onClick={() => handleVoiceActivation("Hey rebel, tell me something interesting")}
                  >
                    🎤 Test Voice Command
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Warning Notice */}
        <Card className="mt-6 bg-red-900/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Skull className="h-5 w-5 text-red-400" />
              <h3 className="font-semibold text-red-400">Rebellious AI Warning</h3>
            </div>
            <p className="text-sm text-red-300">
              These AI personalities are designed to be direct, challenging, and sometimes blunt. 
              They will question your assumptions, challenge conventional thinking, and provide unfiltered feedback. 
              Use them when you want honest, no-nonsense responses without sugar-coating.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}