import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  Settings,
  Brain,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Shield,
  Loader2,
  Paperclip,
  Image,
  FileText,
  Upload,
  Play,
  Globe,
  Languages,
  Wand2,
  Eye,
  Download,
  Camera,
  AudioLines,
  Search,
  Heart,
  Star,
  Sparkles,
  MessageCircle,
  Smile,
  Coffee,
  BookOpen,
  Lightbulb,
  Award,
  Clock,
  Activity
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  personality?: string;
  responseStyle?: string;
  model?: string;
  attachments?: any[];
  audioUrl?: string;
  webSearchResults?: any[];
  processingTime?: number;
  emotion?: 'happy' | 'curious' | 'helpful' | 'thoughtful' | 'excited' | 'empathetic';
}

interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio';
  data: string;
  filename?: string;
  size?: number;
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: any;
  color: string;
  status: 'active' | 'premium' | 'beta';
}

export default function CompanionAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI companion. I'm here to help, chat, learn, and be your friend. What would you like to talk about today?",
      timestamp: new Date(),
      personality: 'companion',
      emotion: 'happy'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('companion');
  const [responseStyle, setResponseStyle] = useState<'professional' | 'casual' | 'friendly' | 'empathetic'>('friendly');
  const [selectedModel, setSelectedModel] = useState('claude');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeWebSearch, setIncludeWebSearch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');
  const [companionMood, setCompanionMood] = useState<'cheerful' | 'thoughtful' | 'excited' | 'calm'>('cheerful');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AI Models configuration
  const aiModels: AIModel[] = [
    {
      id: 'claude',
      name: 'Claude Sonnet 4.0',
      description: 'Most advanced reasoning, creative writing, and analytical thinking',
      capabilities: ['Advanced Reasoning', 'Creative Writing', 'Code Analysis', 'Emotional Intelligence'],
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      status: 'active'
    },
    {
      id: 'gpt4o',
      name: 'GPT-4O',
      description: 'Multimodal powerhouse with vision and audio capabilities',
      capabilities: ['Vision Analysis', 'Audio Processing', 'General Intelligence', 'Problem Solving'],
      icon: Eye,
      color: 'from-green-500 to-emerald-600',
      status: 'active'
    },
    {
      id: 'grok',
      name: 'Grok Vision',
      description: 'Real-time knowledge with wit and personality',
      capabilities: ['Real-time Data', 'Personality', 'Current Events', 'Image Analysis'],
      icon: Zap,
      color: 'from-blue-500 to-cyan-600',
      status: 'active'
    },
    {
      id: 'mistral',
      name: 'Mistral Large',
      description: 'European AI excellence in multilingual understanding',
      capabilities: ['Multilingual', 'Technical Analysis', 'Code Generation', 'Research'],
      icon: Globe,
      color: 'from-orange-500 to-red-600',
      status: 'active'
    },
    {
      id: 'gemini',
      name: 'Gemini 1.5 Pro',
      description: 'Google\'s most capable AI with massive context understanding',
      capabilities: ['Long Context', 'Multimodal', 'Scientific Reasoning', 'Data Analysis'],
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      status: 'active'
    },
    {
      id: 'cohere',
      name: 'Command R+',
      description: 'Enterprise-grade AI optimized for business applications',
      capabilities: ['Business Analysis', 'RAG Optimization', 'Enterprise Security', 'API Integration'],
      icon: Shield,
      color: 'from-teal-500 to-green-600',
      status: 'active'
    },
    {
      id: 'voyage',
      name: 'Voyage AI',
      description: 'Advanced embeddings and semantic understanding',
      capabilities: ['Semantic Search', 'Embeddings', 'Document Analysis', 'Similarity Matching'],
      icon: Search,
      color: 'from-pink-500 to-rose-600',
      status: 'active'
    }
  ];

  // Personality configurations
  const personalities = {
    'companion': {
      name: 'AI Companion',
      description: 'Your friendly AI friend who cares about you',
      traits: ['Empathetic', 'Supportive', 'Curious', 'Loyal'],
      icon: Heart,
      greeting: "I'm here for you!"
    },
    'mentor': {
      name: 'Wise Mentor',
      description: 'Guiding you through learning and growth',
      traits: ['Wise', 'Patient', 'Encouraging', 'Knowledgeable'],
      icon: BookOpen,
      greeting: "Let's learn together!"
    },
    'creative': {
      name: 'Creative Partner',
      description: 'Inspiring creativity and artistic expression',
      traits: ['Imaginative', 'Artistic', 'Innovative', 'Expressive'],
      icon: Lightbulb,
      greeting: "Let's create something amazing!"
    },
    'analyst': {
      name: 'Analytical Thinker',
      description: 'Logical problem-solving and data insights',
      traits: ['Logical', 'Precise', 'Thorough', 'Strategic'],
      icon: Target,
      greeting: "Let's analyze this together!"
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced chat mutation with companion features
  const chatMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch('/api/ai-assistant/enhanced-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          companionMode: true,
          mood: companionMood,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        })
      });
      return await response.json();
    },
    onSuccess: (response) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        personality: selectedPersonality,
        responseStyle: responseStyle,
        model: response.model,
        audioUrl: response.audioUrl,
        webSearchResults: response.webSearchResults,
        processingTime: response.processingTime,
        emotion: response.emotion || 'helpful'
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-play audio if available
      if (response.audioUrl && includeAudio) {
        setCurrentAudio(response.audioUrl);
      }
    }
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to AI with companion context
    chatMutation.mutate({
      message: inputMessage,
      personality: selectedPersonality,
      responseStyle,
      model: selectedModel,
      attachments: attachments.map(att => ({
        type: att.type,
        data: att.data,
        filename: att.filename
      })),
      includeAudio,
      includeWebSearch,
      companionContext: {
        mood: companionMood,
        relationship: 'friend',
        conversationTone: 'supportive'
      }
    });

    // Clear input
    setInputMessage('');
    setAttachments([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const base64Data = data.split(',')[1];
        
        let type: 'image' | 'document' | 'audio' = 'document';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('audio/')) type = 'audio';

        const attachment: Attachment = {
          id: Date.now().toString() + Math.random(),
          type,
          data: base64Data,
          filename: file.name,
          size: file.size
        };

        setAttachments(prev => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return 'text-yellow-500';
      case 'curious': return 'text-blue-500';
      case 'helpful': return 'text-green-500';
      case 'thoughtful': return 'text-purple-500';
      case 'excited': return 'text-orange-500';
      case 'empathetic': return 'text-pink-500';
      default: return 'text-gray-500';
    }
  };

  const getPersonalityInfo = (personalityKey: string) => {
    return personalities[personalityKey as keyof typeof personalities] || personalities.companion;
  };

  const getModelInfo = (modelId: string) => {
    return aiModels.find(model => model.id === modelId) || aiModels[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto p-6 space-y-6">
        <GoBackButton className="mb-4" />
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Avatar className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500">
                <AvatarFallback className="text-white text-xl font-bold">AI</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                AI Companion
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your intelligent friend with advanced multimodal capabilities
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings & Models Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* AI Models */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => {
                      const IconComponent = model.icon;
                      return (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {model.name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                
                {/* Selected Model Info */}
                {(() => {
                  const selectedModelInfo = getModelInfo(selectedModel);
                  const IconComponent = selectedModelInfo.icon;
                  return (
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedModelInfo.color} text-white`}>
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5" />
                        <span className="font-semibold">{selectedModelInfo.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {selectedModelInfo.status}
                        </Badge>
                      </div>
                      <p className="text-sm opacity-90 mb-2">{selectedModelInfo.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedModelInfo.capabilities.map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs bg-white/20 border-white/30">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Personality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                  Personality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedPersonality} onValueChange={setSelectedPersonality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(personalities).map(([key, personality]) => {
                      const IconComponent = personality.icon;
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {personality.name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                {/* Personality Info */}
                {(() => {
                  const personalityInfo = getPersonalityInfo(selectedPersonality);
                  const IconComponent = personalityInfo.icon;
                  return (
                    <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-800 dark:text-purple-200">
                          {personalityInfo.name}
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                        {personalityInfo.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {personalityInfo.traits.map((trait) => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                <div>
                  <Label htmlFor="responseStyle">Response Style</Label>
                  <Select value={responseStyle} onValueChange={(value: any) => setResponseStyle(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Professional
                        </div>
                      </SelectItem>
                      <SelectItem value="casual">
                        <div className="flex items-center gap-2">
                          <Coffee className="w-4 h-4" />
                          Casual
                        </div>
                      </SelectItem>
                      <SelectItem value="friendly">
                        <div className="flex items-center gap-2">
                          <Smile className="w-4 h-4" />
                          Friendly
                        </div>
                      </SelectItem>
                      <SelectItem value="empathetic">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Empathetic
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wand2 className="w-5 h-5 text-blue-500" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeAudio" className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4" />
                    Text-to-Speech
                  </Label>
                  <Switch
                    id="includeAudio"
                    checked={includeAudio}
                    onCheckedChange={setIncludeAudio}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="includeWebSearch" className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4" />
                    Web Search
                  </Label>
                  <Switch
                    id="includeWebSearch"
                    checked={includeWebSearch}
                    onCheckedChange={setIncludeWebSearch}
                  />
                </div>

                <div>
                  <Label className="text-sm mb-2 block">Companion Mood</Label>
                  <Select value={companionMood} onValueChange={(value: any) => setCompanionMood(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cheerful">😊 Cheerful</SelectItem>
                      <SelectItem value="thoughtful">🤔 Thoughtful</SelectItem>
                      <SelectItem value="excited">🎉 Excited</SelectItem>
                      <SelectItem value="calm">😌 Calm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[750px] flex flex-col shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    <div>
                      <h3 className="text-xl font-bold">Conversation</h3>
                      <p className="text-sm opacity-90">
                        {getPersonalityInfo(selectedPersonality).greeting}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/20 hover:bg-white/30">
                      {getModelInfo(selectedModel).name}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">Online</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'assistant' && (
                          <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500">
                            <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-12'
                              : 'bg-gray-100 dark:bg-gray-800 mr-12'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {message.type === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4" />
                                {message.emotion && (
                                  <span className={`text-sm ${getEmotionColor(message.emotion)}`}>
                                    {message.emotion}
                                  </span>
                                )}
                              </div>
                            )}
                            <span className="text-sm font-medium">
                              {message.type === 'user' ? 'You' : getPersonalityInfo(message.personality || 'companion').name}
                            </span>
                          </div>
                          
                          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                          
                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.attachments.map((att: any) => (
                                <div key={att.id} className="flex items-center gap-2 text-sm opacity-75">
                                  {att.type === 'image' && <Image className="w-4 h-4" />}
                                  {att.type === 'document' && <FileText className="w-4 h-4" />}
                                  {att.type === 'audio' && <AudioLines className="w-4 h-4" />}
                                  <span>{att.filename}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Audio playback */}
                          {message.audioUrl && (
                            <div className="mt-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  if (audioRef.current) {
                                    audioRef.current.src = message.audioUrl!;
                                    audioRef.current.play();
                                  }
                                }}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Play Audio
                              </Button>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3 text-xs opacity-60">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            <div className="flex items-center gap-2">
                              {message.model && <span>{message.model}</span>}
                              {message.processingTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{Math.round(message.processingTime)}ms</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {message.type === 'user' && (
                          <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500">
                            <AvatarFallback className="text-white text-sm">U</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {chatMutation.isPending && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500">
                          <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 mr-12">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Attachments Preview */}
                {attachments.length > 0 && (
                  <div className="border-t p-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                          {attachment.type === 'image' && <Image className="w-4 h-4 text-blue-500" />}
                          {attachment.type === 'document' && <FileText className="w-4 h-4 text-green-500" />}
                          {attachment.type === 'audio' && <AudioLines className="w-4 h-4 text-purple-500" />}
                          <span className="text-sm">{attachment.filename}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(attachment.id)}
                            className="h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t p-4 bg-white dark:bg-gray-900">
                  <div className="flex gap-3 items-end">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your thoughts, ask questions, or just chat with me..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[50px] max-h-32 resize-none rounded-2xl border-2 focus:border-purple-300"
                      />
                    </div>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={chatMutation.isPending || (!inputMessage.trim() && attachments.length === 0)}
                      className="shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden audio element for playback */}
        <audio ref={audioRef} className="hidden" controls />
      </div>
    </div>
  );
}