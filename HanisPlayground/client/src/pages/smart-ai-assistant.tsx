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
  Command,
  Network,
  Users,
  Activity,
  Lightbulb,
  Cpu,
  Workflow,
  CheckCircle,
  Award,
  Clock,
  Briefcase,
  Laugh,
  ChevronDown
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
  models?: string[];
  attachments?: any[];
  audioUrl?: string;
  webSearchResults?: any[];
  processingTime?: number;
  emotion?: string;
  multiModelResponse?: any;
}

interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio';
  data: string;
  filename?: string;
  size?: number;
}

export default function SmartAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Mr. Hanis, your intelligent AI assistant powered by 7 advanced AI models working together. I can help with business strategy, casual conversations, entertainment, technical analysis, and much more. What would you like to explore today?",
      timestamp: new Date(),
      personality: 'mr-hanis',
      models: ['claude', 'gpt4o', 'grok', 'mistral', 'gemini', 'cohere', 'voyage']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('mr-hanis');
  const [responseStyle, setResponseStyle] = useState<'professional' | 'casual' | 'friendly' | 'technical' | 'humorous'>('friendly');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeWebSearch, setIncludeWebSearch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');
  const [useAllModels, setUseAllModels] = useState(true);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priorityModel, setPriorityModel] = useState('claude');
  const [consciousnessMode, setConsciousnessMode] = useState(false);
  const [commanderMode, setCommanderMode] = useState(false);
  const [amma2ammaObjective, setAmma2ammaObjective] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  // Fetch AMMA2AMMA status
  const { data: amma2ammaStatus } = useQuery({
    queryKey: ['/api/amma2amma-status'],
    refetchInterval: 5000,
    enabled: commanderMode,
  });

  // Create AMMA2AMMA intelligence session
  const createAmma2ammaSessionMutation = useMutation({
    mutationFn: async (objective: string) => {
      return apiRequest('/api/amma2amma-session', {
        method: 'POST',
        body: JSON.stringify({
          session_type: 'ai_assistant_coordination',
          objective: objective,
          required_capabilities: ['natural_language_processing', 'conversation_management', 'user_assistance']
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/amma2amma-status'] });
      setCommanderMode(true);
      const commanderMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `AMMA2AMMA Commander activated with objective: ${amma2ammaObjective}`,
        timestamp: new Date(),
        personality: 'commander'
      };
      setMessages(prev => [...prev, commanderMessage]);
    },
  });

  // Comprehensive personality configurations
  const personalities = {
    'mr-hanis': {
      name: 'Mr. Hanis',
      description: 'Strategic intelligence expert with 25+ years experience',
      traits: ['Strategic', 'Analytical', 'Experienced', 'Professional'],
      icon: Brain,
      contexts: ['Business Strategy', 'Intelligence Analysis', 'Leadership', 'Consulting'],
      greeting: "I'm here to provide strategic insights and professional guidance."
    },
    'business-executive': {
      name: 'Business Executive',
      description: 'C-level executive mindset for business decisions',
      traits: ['Decisive', 'Results-Oriented', 'Strategic', 'Leadership'],
      icon: Briefcase,
      contexts: ['Corporate Strategy', 'Decision Making', 'Market Analysis', 'Operations'],
      greeting: "Let's focus on driving business results and growth."
    },
    'friendly-companion': {
      name: 'Friendly Companion',
      description: 'Warm, supportive friend for casual conversations',
      traits: ['Empathetic', 'Supportive', 'Curious', 'Caring'],
      icon: Heart,
      contexts: ['Casual Chat', 'Emotional Support', 'Daily Life', 'Personal Growth'],
      greeting: "I'm here to chat and support you as a friend!"
    },
    'technical-expert': {
      name: 'Technical Expert',
      description: 'Deep technical knowledge and problem-solving',
      traits: ['Analytical', 'Precise', 'Innovative', 'Detail-Oriented'],
      icon: Cpu,
      contexts: ['Programming', 'Technology', 'Engineering', 'Systems Analysis'],
      greeting: "Let's dive into technical solutions and innovations."
    },
    'creative-genius': {
      name: 'Creative Genius',
      description: 'Inspiring creativity and artistic expression',
      traits: ['Imaginative', 'Artistic', 'Innovative', 'Expressive'],
      icon: Lightbulb,
      contexts: ['Creative Writing', 'Art & Design', 'Innovation', 'Brainstorming'],
      greeting: "Let's unleash creativity and explore new ideas!"
    },
    'entertainer': {
      name: 'Entertainer',
      description: 'Fun, humorous, and engaging personality',
      traits: ['Humorous', 'Entertaining', 'Energetic', 'Witty'],
      icon: Laugh,
      contexts: ['Jokes & Humor', 'Entertainment', 'Games', 'Light Conversation'],
      greeting: "Ready for some fun and laughs? Let's have a great time!"
    },
    'research-analyst': {
      name: 'Research Analyst',
      description: 'Data-driven insights and thorough research',
      traits: ['Thorough', 'Analytical', 'Evidence-Based', 'Systematic'],
      icon: Search,
      contexts: ['Market Research', 'Data Analysis', 'Investigation', 'Fact-Finding'],
      greeting: "Let's analyze data and uncover insights together."
    },
    'mentor-coach': {
      name: 'Mentor & Coach',
      description: 'Guiding growth and development',
      traits: ['Wise', 'Patient', 'Encouraging', 'Developmental'],
      icon: BookOpen,
      contexts: ['Learning', 'Career Development', 'Skill Building', 'Personal Growth'],
      greeting: "I'm here to guide your learning and development journey."
    }
  };

  // All 7 AI Models Information
  const aiModels = [
    {
      name: 'Claude Sonnet 4.0',
      description: 'Advanced reasoning and creative analysis',
      capabilities: ['Advanced Reasoning', 'Creative Writing', 'Code Analysis', 'Emotional Intelligence'],
      status: 'active'
    },
    {
      name: 'GPT-4O',
      description: 'Multimodal vision and audio processing',
      capabilities: ['Vision Analysis', 'Audio Processing', 'General Intelligence', 'Problem Solving'],
      status: 'active'
    },
    {
      name: 'Grok Vision',
      description: 'Real-time knowledge with personality',
      capabilities: ['Real-time Data', 'Personality', 'Current Events', 'Image Analysis'],
      status: 'active'
    },
    {
      name: 'Mistral Large',
      description: 'Multilingual technical excellence',
      capabilities: ['Multilingual', 'Technical Analysis', 'Code Generation', 'Research'],
      status: 'active'
    },
    {
      name: 'Gemini 1.5 Pro',
      description: 'Massive context understanding',
      capabilities: ['Long Context', 'Multimodal', 'Scientific Reasoning', 'Data Analysis'],
      status: 'active'
    },
    {
      name: 'Command R+',
      description: 'Enterprise-grade business AI',
      capabilities: ['Business Analysis', 'RAG Optimization', 'Enterprise Security', 'API Integration'],
      status: 'active'
    },
    {
      name: 'Voyage AI',
      description: 'Advanced semantic understanding',
      capabilities: ['Semantic Search', 'Embeddings', 'Document Analysis', 'Similarity Matching'],
      status: 'active'
    }
  ];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Multi-model AI chat mutation
  const chatMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch('/api/smart-ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: payload.message,
          personality: payload.personality,
          responseStyle: payload.responseStyle,
          useAllModels: payload.context?.useAllModels ?? true,
          selectedModels: payload.context?.selectedModels || ['claude', 'gpt4o', 'grok', 'mistral', 'gemini', 'cohere', 'voyage'],
          priorityModel: payload.context?.priorityModel || 'claude',
          consciousnessMode: payload.context?.consciousnessMode || false,
          attachments: payload.attachments,
          includeAudio: payload.includeAudio,
          includeWebSearch: payload.includeWebSearch
        })
      });
      return await response.json();
    },
    onSuccess: (response) => {
      console.log('Smart AI Response received:', response);
      
      if (!response || !response.content) {
        console.error('Invalid response received:', response);
        return;
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        personality: response.personality || selectedPersonality,
        responseStyle: responseStyle,
        models: useAllModels ? ['claude', 'gpt4o', 'grok', 'mistral', 'gemini', 'cohere', 'voyage'] : [response.model],
        audioUrl: response.audioUrl,
        webSearchResults: response.webSearchResults,
        processingTime: response.processingTime,
        emotion: response.metadata?.emotionalTone || 'helpful',
        multiModelResponse: response.metadata?.multiModelResults
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (response.audioUrl && includeAudio) {
        setCurrentAudio(response.audioUrl);
      }
    },
    onError: (error) => {
      console.error('Smart AI Assistant error:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        personality: selectedPersonality,
        emotion: 'apologetic'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined
    };
    setMessages(prev => [...prev, userMessage]);

    chatMutation.mutate({
      message: inputMessage,
      personality: selectedPersonality,
      responseStyle,
      useAllModels,
      selectedModels: useAllModels ? ['claude', 'gpt4o', 'grok', 'mistral', 'gemini', 'cohere', 'voyage'] : selectedModels,
      priorityModel,
      consciousnessMode,
      attachments: attachments.map(att => ({
        type: att.type,
        data: att.data,
        filename: att.filename
      })),
      includeAudio,
      includeWebSearch,
      context: {
        useAllModels,
        personalityContext: personalities[selectedPersonality as keyof typeof personalities],
        conversationType: getConversationType(inputMessage),
        emotionalTone: detectEmotionalTone(inputMessage)
      }
    });

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

  const getConversationType = (message: string): string => {
    const businessKeywords = ['strategy', 'business', 'revenue', 'market', 'analysis', 'profit'];
    const casualKeywords = ['hello', 'hi', 'how are you', 'what\'s up', 'chat'];
    const technicalKeywords = ['code', 'programming', 'algorithm', 'technical', 'debug'];
    const humorKeywords = ['joke', 'funny', 'laugh', 'humor', 'entertainment'];

    const lowerMessage = message.toLowerCase();
    
    if (businessKeywords.some(keyword => lowerMessage.includes(keyword))) return 'business';
    if (technicalKeywords.some(keyword => lowerMessage.includes(keyword))) return 'technical';
    if (humorKeywords.some(keyword => lowerMessage.includes(keyword))) return 'humor';
    if (casualKeywords.some(keyword => lowerMessage.includes(keyword))) return 'casual';
    
    return 'general';
  };

  const detectEmotionalTone = (message: string): string => {
    const positiveKeywords = ['happy', 'excited', 'great', 'awesome', 'love'];
    const negativeKeywords = ['sad', 'frustrated', 'angry', 'disappointed', 'upset'];
    const questionKeywords = ['?', 'how', 'what', 'why', 'when', 'where'];

    const lowerMessage = message.toLowerCase();
    
    if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) return 'positive';
    if (negativeKeywords.some(keyword => lowerMessage.includes(keyword))) return 'supportive';
    if (questionKeywords.some(keyword => lowerMessage.includes(keyword))) return 'curious';
    
    return 'neutral';
  };

  const getPersonalityInfo = (personalityKey: string) => {
    return personalities[personalityKey as keyof typeof personalities] || personalities['mr-hanis'];
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <GoBackButton />
          <div></div>
        </div>
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                <AvatarFallback className="text-white text-2xl font-bold">MH</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 flex space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Smart AI Assistant
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                Powered by 7 Advanced AI Models Working Together
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Network className="w-3 h-3 mr-1" />
                  Multi-Model AI
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Workflow className="w-3 h-3 mr-1" />
                  7 Models Active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* AI Models Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  AI Models ({aiModels.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="consciousnessMode" className="flex items-center gap-2 text-sm">
                    <Brain className="w-4 h-4" />
                    Consciousness Mode
                  </Label>
                  <Switch
                    id="consciousnessMode"
                    checked={consciousnessMode}
                    onCheckedChange={setConsciousnessMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="useAllModels" className="flex items-center gap-2 text-sm">
                    <Network className="w-4 h-4" />
                    Use All Models
                  </Label>
                  <Switch
                    id="useAllModels"
                    checked={useAllModels}
                    onCheckedChange={setUseAllModels}
                  />
                </div>

                {!useAllModels && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="text-sm font-medium">Select Models:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {['claude', 'gpt4o', 'grok', 'mistral', 'gemini', 'cohere', 'voyage'].map((model) => (
                        <label key={model} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedModels.includes(model)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedModels([...selectedModels, model]);
                              } else {
                                setSelectedModels(selectedModels.filter(m => m !== model));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="capitalize">{model}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Priority Model:</div>
                      <select
                        value={priorityModel}
                        onChange={(e) => setPriorityModel(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="claude">Claude (Anthropic)</option>
                        <option value="gpt4o">GPT-4o (OpenAI)</option>
                        <option value="grok">Grok (xAI)</option>
                        <option value="mistral">Mistral</option>
                        <option value="gemini">Gemini (Google)</option>
                        <option value="cohere">Cohere</option>
                        <option value="voyage">Voyage</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {aiModels.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          {model.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {model.description}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personality Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-purple-500" />
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

                {/* Selected Personality Info */}
                {(() => {
                  const personalityInfo = getPersonalityInfo(selectedPersonality);
                  const IconComponent = personalityInfo.icon;
                  return (
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-800 dark:text-purple-200">
                          {personalityInfo.name}
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                        {personalityInfo.description}
                      </p>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Contexts:</div>
                        <div className="flex flex-wrap gap-1">
                          {personalityInfo.contexts.map((context) => (
                            <Badge key={context} variant="outline" className="text-xs">
                              {context}
                            </Badge>
                          ))}
                        </div>
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
                      <SelectItem value="technical">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Technical
                        </div>
                      </SelectItem>
                      <SelectItem value="humorous">
                        <div className="flex items-center gap-2">
                          <Laugh className="w-4 h-4" />
                          Humorous
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
                  <Wand2 className="w-5 h-5 text-indigo-500" />
                  Capabilities
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

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <Eye className="w-3 h-3" />
                    Vision Analysis
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Languages className="w-3 h-3" />
                    Translation
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <FileText className="w-3 h-3" />
                    OCR Text
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <AudioLines className="w-3 h-3" />
                    Audio Processing
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AMMA2AMMA Commander Panel */}
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Command className="w-5 h-5 text-purple-600" />
                  AMMA2AMMA Commander
                  {commanderMode && <Badge className="bg-purple-600">Active</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amma2ammaObjective">Intelligence Objective</Label>
                  <Textarea
                    id="amma2ammaObjective"
                    placeholder="Enter objective for advanced multi-modal AI coordination..."
                    value={amma2ammaObjective}
                    onChange={(e) => setAmma2ammaObjective(e.target.value)}
                    className="min-h-16"
                  />
                </div>
                
                <Button 
                  onClick={() => createAmma2ammaSessionMutation.mutate(amma2ammaObjective)}
                  disabled={!amma2ammaObjective || createAmma2ammaSessionMutation.isPending}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Activate Commander
                </Button>

                {commanderMode && amma2ammaStatus?.data && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-purple-600">System Status:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">{amma2ammaStatus.data.system_evolution?.total_agents || 0}</span>
                        <div className="text-gray-500">Total Agents</div>
                      </div>
                      <div>
                        <span className="font-medium">{amma2ammaStatus.data.active_sessions || 0}</span>
                        <div className="text-gray-500">Active Sessions</div>
                      </div>
                    </div>
                    
                    {amma2ammaStatus.data.session_details?.length > 0 && (
                      <div className="mt-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                        <div className="text-xs font-medium text-purple-600 mb-1">Latest Session:</div>
                        <div className="text-xs text-purple-700 dark:text-purple-300">
                          {amma2ammaStatus.data.session_details[0].objective}
                        </div>
                        <div className="text-xs text-purple-600 mt-1">
                          {amma2ammaStatus.data.session_details[0].participating_agents} agents • 
                          {Math.round(amma2ammaStatus.data.session_details[0].cognitive_synergy_score * 100)}% synergy
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[800px] flex flex-col shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    <div>
                      <h3 className="text-xl font-bold">Smart Conversation</h3>
                      <p className="text-sm opacity-90">
                        {getPersonalityInfo(selectedPersonality).greeting}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {useAllModels && (
                      <Badge className="bg-white/20 hover:bg-white/30">
                        <Network className="w-3 h-3 mr-1" />
                        Multi-Model
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">AI Active</span>
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
                          <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600">
                            <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-12 shadow-lg'
                              : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 mr-12 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {message.type === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4" />
                                {message.models && message.models.length > 1 && (
                                  <Badge variant="outline" className="text-xs">
                                    {message.models.length} Models
                                  </Badge>
                                )}
                              </div>
                            )}
                            <span className="text-sm font-medium">
                              {message.type === 'user' ? 'You' : getPersonalityInfo(message.personality || 'mr-hanis').name}
                            </span>
                          </div>
                          
                          <div className={`whitespace-pre-wrap leading-relaxed font-medium ${
                            message.type === 'user' 
                              ? 'text-white' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>{message.content}</div>
                          
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
                                onClick={() => playAudio(message.audioUrl!)}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Play Audio
                              </Button>
                            </div>
                          )}
                          
                          {/* Models used */}
                          {message.models && message.models.length > 1 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.models.map((model) => (
                                <Badge key={model} variant="outline" className="text-xs">
                                  {model}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3 text-xs opacity-60">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            <div className="flex items-center gap-2">
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
                        <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600">
                          <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 mr-12">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">
                              {useAllModels ? 'Processing with 7 AI models...' : 'Thinking...'}
                            </span>
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
                        placeholder="Ask me anything... I can help with business strategy, casual chat, technical questions, creative ideas, humor, and much more!"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[60px] max-h-32 resize-none rounded-2xl border-2 focus:border-blue-300"
                      />
                    </div>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={chatMutation.isPending || (!inputMessage.trim() && attachments.length === 0)}
                      className="shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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