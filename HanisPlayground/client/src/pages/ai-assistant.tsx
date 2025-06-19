import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AdaptiveLayout, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveNavigation,
  AdaptiveTypography,
  useScreenInfo 
} from '@/components/ui/adaptive-layout';
import { 
  Brain, MessageSquare, Mic, MicOff, Volume2, VolumeX, 
  Send, User, Bot, Settings, RefreshCw, ArrowLeft,
  Zap, Target, Code, TrendingUp, DollarSign, HelpCircle,
  Heart, Smile, Users
} from 'lucide-react';
import { Link } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import GoBackButton from '@/components/ui/go-back-button';
import TutorialOverlay from '@/components/ui/tutorial-overlay';
import { HumanAIChatbot } from '@/components/human-ai-chatbot';

interface AIPersonality {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  tone: string;
  avatar: string;
  color: string;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  personality?: string;
  model?: string;
  confidence?: number;
  audioUrl?: string;
}

interface ConversationPreferences {
  verbosity: 'concise' | 'detailed' | 'comprehensive';
  tone: 'professional' | 'casual' | 'technical';
  includeVoice: boolean;
}

export default function AIAssistant() {
  const screenInfo = useScreenInfo();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('strategic-advisor');
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [isListening, setIsListening] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [preferences, setPreferences] = useState<ConversationPreferences>({
    verbosity: 'detailed',
    tone: 'professional',
    includeVoice: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user, isAuthenticated } = useAuth();

  // Fetch available AI personalities
  const { data: personalities = {} } = useQuery({
    queryKey: ['/api/ai-assistant/personalities'],
    refetchInterval: false
  });

  // AI conversation mutation
  const conversation = useMutation({
    mutationFn: async (data: { 
      message: string; 
      sessionId: string; 
      personality: string; 
      preferences: ConversationPreferences;
    }) => {
      const response = await fetch('/api/ai-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (response) => {
      const aiMessage: AIMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        personality: response.personality,
        model: response.model,
        confidence: response.confidence,
        audioUrl: response.audioUrl
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Auto-play voice response if enabled
      if (response.audioUrl && preferences.includeVoice && audioRef.current) {
        audioRef.current.src = response.audioUrl;
        audioRef.current.play().catch(console.error);
      }
    }
  });

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    conversation.mutate({
      message: currentMessage,
      sessionId,
      personality: selectedPersonality,
      preferences
    });

    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
      };

      recognition.start();
    }
  };

  const playAudioResponse = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getPersonalityData = () => {
    const personalityMap: Record<string, AIPersonality> = {
      'strategic-advisor': {
        id: 'strategic-advisor',
        name: 'Mr. Hanis',
        role: 'Strategic Business Advisor',
        expertise: ['Business Strategy', 'Market Analysis', 'Competitive Intelligence'],
        tone: 'Professional, analytical',
        avatar: 'MH',
        color: 'bg-blue-600'
      },
      'technical-expert': {
        id: 'technical-expert',
        name: 'Marcus TechLead',
        role: 'Senior Technical Architect',
        expertise: ['Software Architecture', 'AI/ML', 'Cybersecurity'],
        tone: 'Technical, precise',
        avatar: 'MT',
        color: 'bg-green-600'
      },
      'intelligence-analyst': {
        id: 'intelligence-analyst',
        name: 'Agent Phoenix',
        role: 'Intelligence Operations Specialist',
        expertise: ['OSINT', 'Threat Analysis', 'Reconnaissance'],
        tone: 'Analytical, security-focused',
        avatar: 'AP',
        color: 'bg-purple-600'
      },
      'marketing-guru': {
        id: 'marketing-guru',
        name: 'Sofia Growth',
        role: 'Chief Marketing Strategist',
        expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
        tone: 'Creative, data-driven',
        avatar: 'SG',
        color: 'bg-pink-600'
      },
      'financial-advisor': {
        id: 'financial-advisor',
        name: 'David Finance',
        role: 'Financial Intelligence Advisor',
        expertise: ['Financial Analysis', 'Investment Strategy', 'Risk Management'],
        tone: 'Analytical, conservative',
        avatar: 'DF',
        color: 'bg-orange-600'
      }
    };

    return personalityMap[selectedPersonality] || personalityMap['strategic-advisor'];
  };

  const currentPersonality = getPersonalityData();

  // Tutorial steps for AI Assistant
  const tutorialSteps = [
    {
      title: "Welcome to AI Intelligence Assistant",
      content: `
        <p>Your advanced conversational AI with multi-model intelligence and voice capabilities.</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>5 AI Personalities:</strong> Choose from specialized experts</li>
          <li>• <strong>Multi-Model AI:</strong> Claude, GPT-4, and Gemini integration</li>
          <li>• <strong>Voice Features:</strong> Speech recognition and audio responses</li>
        </ul>
      `
    },
    {
      title: "AI Personality Selection",
      content: `
        <p>Select from specialized AI personalities for different expertise:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>Mr. Hanis:</strong> Strategic Business Advisor</li>
          <li>• <strong>Marcus TechLead:</strong> Technical Architecture Expert</li>
          <li>• <strong>Agent Phoenix:</strong> Intelligence Operations Specialist</li>
          <li>• <strong>Sofia Growth:</strong> Marketing Strategy Expert</li>
          <li>• <strong>David Finance:</strong> Financial Intelligence Advisor</li>
        </ul>
      `
    },
    {
      title: "Conversation Preferences",
      content: `
        <p>Customize your AI interaction experience:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>Verbosity:</strong> Concise, Detailed, or Comprehensive responses</li>
          <li>• <strong>Tone:</strong> Professional, Casual, or Technical communication</li>
          <li>• <strong>Voice Responses:</strong> Enable audio responses for hands-free operation</li>
        </ul>
      `
    },
    {
      title: "Advanced Features",
      content: `
        <p>Utilize the full power of the AI assistant:</p>
        <ul style="margin-top: 10px;">
          <li>• <strong>Voice Input:</strong> Click the microphone to speak your queries</li>
          <li>• <strong>Session Statistics:</strong> Track conversation metrics and confidence</li>
          <li>• <strong>Real-time Processing:</strong> Instant responses with multi-model intelligence</li>
          <li>• <strong>Conversation History:</strong> Review and continue previous discussions</li>
        </ul>
      `
    }
  ];

  return (
    <AdaptiveLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto">
          {/* Navigation Header */}
          <div className="absolute top-4 left-4 z-50">
            <GoBackButton />
          </div>

          {/* Adaptive Navigation Header */}
          <AdaptiveNavigation className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-bold text-white">AI Intelligence Assistant</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-slate-600"></div>
                <Badge variant="outline" className="border-blue-400 text-blue-400">
                  AI Assistant: Active
                </Badge>
                {isAuthenticated && user && (
                  <Badge variant="outline" className="border-green-400 text-green-400">
                    User: {user.name}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTutorial(true)}
                  className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Tutorial
                </Button>
              </div>
            </div>
          </AdaptiveNavigation>

          <AdaptiveTypography variant="h1" className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
            AI Intelligence Assistant
          </AdaptiveTypography>
          
          <AdaptiveTypography variant="body" className="text-slate-300 mb-8">
            Advanced conversational AI with multi-model intelligence and voice capabilities
          </AdaptiveTypography>

          <AdaptiveGrid minItemWidth={screenInfo.deviceType === 'mobile' ? 300 : 400} maxColumns={3}>
            {/* Personality Selection */}
            <AdaptiveCard variant={screenInfo.deviceType === 'mobile' ? 'compact' : 'default'}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-blue-400" />
                  AI Personality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                  <Avatar className={`${currentPersonality.color} text-white`}>
                    <AvatarFallback className="text-white font-semibold">
                      {currentPersonality.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{currentPersonality.name}</p>
                    <p className="text-sm text-slate-400 truncate">{currentPersonality.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(personalities).map((key) => (
                    <Button
                      key={key}
                      variant={selectedPersonality === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPersonality(key)}
                      className={`justify-start text-left h-auto p-2 ${
                        selectedPersonality === key ? 'bg-blue-600 text-white' : 'border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {key === 'strategic-advisor' && <Target className="h-4 w-4" />}
                        {key === 'technical-expert' && <Code className="h-4 w-4" />}
                        {key === 'intelligence-analyst' && <Zap className="h-4 w-4" />}
                        {key === 'marketing-guru' && <TrendingUp className="h-4 w-4" />}
                        {key === 'financial-advisor' && <DollarSign className="h-4 w-4" />}
                        <span className="text-xs font-medium">{personalities[key]?.name || key}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </AdaptiveCard>

            {/* Conversation Settings */}
            <AdaptiveCard variant={screenInfo.deviceType === 'mobile' ? 'compact' : 'default'}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-green-400" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Verbosity</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['concise', 'detailed', 'comprehensive'] as const).map((level) => (
                      <Button
                        key={level}
                        variant={preferences.verbosity === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences(prev => ({ ...prev, verbosity: level }))}
                        className={`text-xs ${
                          preferences.verbosity === level ? 'bg-green-600' : 'border-slate-600'
                        }`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Tone</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['professional', 'casual', 'technical'] as const).map((tone) => (
                      <Button
                        key={tone}
                        variant={preferences.tone === tone ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences(prev => ({ ...prev, tone }))}
                        className={`text-xs ${
                          preferences.tone === tone ? 'bg-green-600' : 'border-slate-600'
                        }`}
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Voice Responses</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, includeVoice: !prev.includeVoice }))}
                    className={`border-slate-600 ${preferences.includeVoice ? 'text-green-400' : 'text-slate-400'}`}
                  >
                    {preferences.includeVoice ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </AdaptiveCard>

            {/* Conversation Statistics */}
            <AdaptiveCard variant={screenInfo.deviceType === 'mobile' ? 'compact' : 'default'}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">{messages.length}</p>
                    <p className="text-xs text-slate-400">Messages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">
                      {messages.filter(m => m.role === 'assistant').length}
                    </p>
                    <p className="text-xs text-slate-400">AI Responses</p>
                  </div>
                </div>
                
                {conversation.data?.confidence && (
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-400">{conversation.data.confidence}%</p>
                    <p className="text-xs text-slate-400">Last Response Confidence</p>
                  </div>
                )}
              </CardContent>
            </AdaptiveCard>
          </AdaptiveGrid>

          {/* Chat Interface */}
          <AdaptiveCard className="mt-8" variant="detailed">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-white">
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Intelligent Conversation
                </span>
                {conversation.isPending && (
                  <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages Display */}
              <div 
                className={`space-y-4 mb-4 max-h-96 overflow-y-auto ${
                  screenInfo.deviceType === 'mobile' ? 'max-h-64' : 'max-h-96'
                }`}
              >
                {messages.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                    <p>Start a conversation with your AI assistant</p>
                    <p className="text-sm mt-2">Ask questions, get insights, or request analysis</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className={`${currentPersonality.color} text-white`}>
                        <AvatarFallback className="text-white font-semibold">
                          {currentPersonality.avatar}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700/50 text-slate-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2">
                            {message.model && (
                              <Badge variant="outline" className="text-xs border-slate-500">
                                {message.model}
                              </Badge>
                            )}
                            {message.audioUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => playAudioResponse(message.audioUrl!)}
                                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                              >
                                <Volume2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <Avatar className="bg-slate-600">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <div className="flex-1">
                  {screenInfo.deviceType === 'mobile' ? (
                    <Textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask ${currentPersonality.name} anything...`}
                      className="min-h-[60px] bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                      disabled={conversation.isPending}
                    />
                  ) : (
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask ${currentPersonality.name} anything...`}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                      disabled={conversation.isPending}
                    />
                  )}
                </div>
                
                <Button
                  onClick={startVoiceRecognition}
                  variant="outline"
                  size="sm"
                  className={`border-slate-600 ${isListening ? 'text-red-400' : 'text-slate-400'}`}
                  disabled={conversation.isPending}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || conversation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </AdaptiveCard>
        </div>
      </div>

      {/* Hidden audio element for voice responses */}
      <audio ref={audioRef} className="hidden" />

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="AI Intelligence Assistant Guide"
      />
    </AdaptiveLayout>
  );
}