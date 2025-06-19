import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, MessageSquare, Mic, MicOff, Volume2, VolumeX, 
  Send, User, Bot, Settings, RefreshCw, Play, Pause,
  Zap, Target, Code, TrendingUp, DollarSign, HelpCircle,
  Smile, Frown, Meh, Heart, ThumbsUp, Languages
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface HumanPersonality {
  key: string;
  name: string;
  traits: string[];
  humor_style: string;
  directness_level: number;
  conversation_style: string;
  cultural_background: string;
  can_be_rude: boolean;
  uses_humor: boolean;
  has_opinions: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  personality?: string;
  emotional_state?: string;
  humor_detected?: boolean;
  directness_score?: number;
  voice_audio_url?: string;
  response_metadata?: {
    tone: string;
    emotion: string;
    sass_level: number;
    joke_type?: string;
  };
}

interface HumanAIChatbotProps {
  defaultPersonality?: string;
  showPersonalitySelector?: boolean;
  enableVoice?: boolean;
  placeholder?: string;
}

export function HumanAIChatbot({ 
  defaultPersonality = 'hanis-authentic',
  showPersonalitySelector = true,
  enableVoice = true,
  placeholder = "Type your message... I'll respond naturally with personality!"
}: HumanAIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState(defaultPersonality);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(enableVoice);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [language, setLanguage] = useState('auto');
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize voice system with better error handling
  useEffect(() => {
    const loadVoices = () => {
      try {
        if (typeof speechSynthesis !== 'undefined') {
          const voices = speechSynthesis.getVoices();
          if (voices.length > 0) {
            setVoicesLoaded(true);
          } else {
            // Retry after a delay if voices not loaded yet
            setTimeout(() => {
              const retryVoices = speechSynthesis.getVoices();
              if (retryVoices.length > 0) {
                setVoicesLoaded(true);
              }
            }, 1000);
          }
        }
      } catch (error) {
        console.log('Speech synthesis not supported');
        setVoicesLoaded(false);
      }
    };

    loadVoices();
    
    try {
      if (typeof speechSynthesis !== 'undefined') {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
      }
    } catch (error) {
      console.log('Voice events not supported');
    }

    return () => {
      try {
        if (typeof speechSynthesis !== 'undefined') {
          speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Fetch available personalities
  const { data: personalitiesData } = useQuery({
    queryKey: ['/api/ai-personalities'],
    retry: false,
  });

  // Human AI chat mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/human-ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          personality: selectedPersonality,
          language,
          voiceEnabled,
          context: messages.slice(-5).map(m => m.content).join('\n')
        })
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: data.data.response,
          timestamp: new Date(),
          personality: selectedPersonality,
          emotional_state: data.data.conversation_context?.mood || 'Friendly',
          humor_detected: data.data.personality_traits?.humor_level > 0.7,
          directness_score: data.data.personality_traits?.directness || 0.5,
          voice_audio_url: data.data.voice_synthesis?.text ? 'synthesized' : undefined,
          response_metadata: data.data.personality_traits
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        // Synthesize voice if enabled and voices are loaded
        if (voiceEnabled && data.data.response) {
          setTimeout(() => {
            try {
              // Check if speech synthesis is available and not speaking
              if (typeof speechSynthesis !== 'undefined' && !speechSynthesis.speaking) {
                const utterance = new SpeechSynthesisUtterance(data.data.response);
                utterance.rate = 0.8;
                utterance.pitch = 1.0;
                utterance.volume = 0.9;
                
                // Simple voice selection without complex filtering to avoid errors
                const voices = speechSynthesis.getVoices();
                if (voices && voices.length > 0) {
                  // Use first available voice or specific language if available
                  const preferredVoice = voices.find(voice => {
                    if (language === 'zh') return voice.lang.startsWith('zh');
                    if (language === 'ms' || language === 'kelantan') return voice.lang.startsWith('id') || voice.lang.startsWith('ms');
                    return voice.lang.startsWith('en');
                  }) || voices[0];
                  
                  if (preferredVoice) {
                    utterance.voice = preferredVoice;
                  }
                }
                
                // Simple event handlers
                utterance.onstart = () => setIsPlaying(assistantMessage.id);
                utterance.onend = () => setIsPlaying(null);
                utterance.onerror = () => setIsPlaying(null);
                
                speechSynthesis.speak(utterance);
              }
            } catch (error) {
              console.log('Voice synthesis not available');
              setIsPlaying(null);
            }
          }, 100);
        }
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: 'Hey, sorry about that - I\'m having some technical difficulties. Give me a moment and try again?',
        timestamp: new Date(),
        personality: 'Technical Issues',
        emotional_state: 'Apologetic'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || chatMutation.isPending) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to AI
    chatMutation.mutate(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const playVoice = (audioUrl: string, messageId: string) => {
    if (isPlaying === messageId) {
      setIsPlaying(null);
      return;
    }

    try {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlaying(null);
      audio.onplay = () => setIsPlaying(messageId);
      audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  const personalities = personalitiesData?.personalities || [];
  const currentPersonality = personalities.find((p: HumanPersonality) => p.key === selectedPersonality);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-6">
      {/* Personality & Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Human-Like AI Chatbot
            <Badge variant="secondary">Voice Enabled</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {showPersonalitySelector && (
              <div>
                <label className="block text-sm font-medium mb-2">AI Personality</label>
                <Select value={selectedPersonality} onValueChange={setSelectedPersonality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {personalities.map((p: HumanPersonality) => (
                      <SelectItem key={p.key} value={p.key}>
                        {p.name} {p.can_be_rude && '⚡'} {p.uses_humor && '😄'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-Detect</SelectItem>
                  <SelectItem value="ms">Bahasa Melayu</SelectItem>
                  <SelectItem value="kelantan">Loghat Kelate (Kelantan)</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="zh">Mandarin Chinese</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Features</label>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={voiceEnabled ? "default" : "outline"}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="flex items-center gap-2"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Voice
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearConversation}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>

            {currentPersonality && (
              <div>
                <label className="block text-sm font-medium mb-2">Current AI</label>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <div className="text-sm font-medium">{currentPersonality.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Directness: {currentPersonality.directness_level}/10
                  </div>
                  <div className="flex gap-1 mt-1">
                    {currentPersonality.can_be_rude && <Badge variant="outline" className="text-xs">Can be blunt</Badge>}
                    {currentPersonality.uses_humor && <Badge variant="outline" className="text-xs">Humorous</Badge>}
                    {currentPersonality.has_opinions && <Badge variant="outline" className="text-xs">Opinionated</Badge>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversation
            </span>
            <Badge variant="secondary">{messages.length} messages</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Start a conversation! I'll respond with authentic human personality.</p>
                <p className="text-sm">I can be funny, direct, or even a bit sassy depending on my mood.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white ml-auto' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {message.role === 'assistant' && (
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex gap-2">
                          {message.emotional_state && (
                            <Badge variant="outline" className="text-xs">
                              {message.emotional_state}
                            </Badge>
                          )}
                          {message.humor_detected && (
                            <Badge variant="outline" className="text-xs">
                              <Smile className="w-3 h-3 mr-1" />
                              Funny
                            </Badge>
                          )}
                          {message.directness_score && message.directness_score > 7 && (
                            <Badge variant="outline" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Direct
                            </Badge>
                          )}
                        </div>
                        
                        {message.voice_audio_url && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => playVoice(message.voice_audio_url!, message.id)}
                            className="p-1 h-6 w-6"
                          >
                            {isPlaying === message.id ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                    {message.personality && (
                      <span>• {message.personality}</span>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={chatMutation.isPending}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || chatMutation.isPending}
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}