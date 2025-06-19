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
  Robot
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
}

interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio';
  data: string;
  filename?: string;
  size?: number;
}

export default function EnhancedAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('strategic-advisor');
  const [responseStyle, setResponseStyle] = useState<'professional' | 'casual' | 'rude'>('professional');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeWebSearch, setIncludeWebSearch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch AI personalities
  const { data: personalities } = useQuery({
    queryKey: ['/api/ai-assistant/personalities'],
    queryFn: () => apiRequest('/api/ai-assistant/personalities')
  });

  // Enhanced chat mutation
  const chatMutation = useMutation({
    mutationFn: async (payload: any) => {
      return apiRequest('/api/ai-assistant/enhanced-chat', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
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
        processingTime: response.processingTime
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-play audio if available
      if (response.audioUrl && includeAudio) {
        setCurrentAudio(response.audioUrl);
      }
    }
  });

  // OCR mutation
  const ocrMutation = useMutation({
    mutationFn: async (imageData: string) => {
      return apiRequest('/api/ai-assistant/ocr', {
        method: 'POST',
        body: JSON.stringify({ imageData })
      });
    },
    onSuccess: (response) => {
      const ocrMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `OCR Results:\n${response.extractedText}\n\nAnalysis:\n${response.analysis}`,
        timestamp: new Date(),
        personality: 'technical-expert',
        processingTime: response.processingTime
      };
      setMessages(prev => [...prev, ocrMessage]);
    }
  });

  // Text-to-speech mutation
  const ttsMutation = useMutation({
    mutationFn: async (text: string) => {
      return apiRequest('/api/ai-assistant/text-to-speech', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
    },
    onSuccess: (response) => {
      setCurrentAudio(response.audioUrl);
    }
  });

  // Translation mutation
  const translateMutation = useMutation({
    mutationFn: async (payload: { text: string; targetLanguage: string }) => {
      return apiRequest('/api/ai-assistant/translate', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },
    onSuccess: (response) => {
      const translateMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Translation to ${response.targetLanguage}:\n\n${response.translatedText}`,
        timestamp: new Date(),
        personality: 'technical-expert',
        processingTime: response.processingTime
      };
      setMessages(prev => [...prev, translateMessage]);
    }
  });

  // Task execution mutation
  const taskMutation = useMutation({
    mutationFn: async (payload: any) => {
      return apiRequest('/api/ai-assistant/execute-task', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },
    onSuccess: (response) => {
      const taskMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Task Completed:\n\n${JSON.stringify(response, null, 2)}`,
        timestamp: new Date(),
        personality: selectedPersonality
      };
      setMessages(prev => [...prev, taskMessage]);
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

    // Send to AI
    chatMutation.mutate({
      message: inputMessage,
      personality: selectedPersonality,
      responseStyle,
      attachments: attachments.map(att => ({
        type: att.type,
        data: att.data,
        filename: att.filename
      })),
      includeAudio,
      includeWebSearch
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

  const performOCR = (attachment: Attachment) => {
    if (attachment.type === 'image') {
      ocrMutation.mutate(attachment.data);
    }
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const generateTextToSpeech = (text: string) => {
    ttsMutation.mutate(text);
  };

  const translateText = (text: string, targetLanguage: string) => {
    translateMutation.mutate({ text, targetLanguage });
  };

  const executeTask = (taskType: string, parameters: any) => {
    taskMutation.mutate({
      taskType,
      parameters,
      autonomyLevel: 'guided'
    });
  };

  const getPersonalityIcon = (personality: string) => {
    switch (personality) {
      case 'strategic-advisor': return <Target className="w-4 h-4" />;
      case 'technical-expert': return <Zap className="w-4 h-4" />;
      case 'intelligence-analyst': return <Shield className="w-4 h-4" />;
      case 'marketing-guru': return <TrendingUp className="w-4 h-4" />;
      case 'financial-advisor': return <DollarSign className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getResponseStyleColor = (style: string) => {
    switch (style) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'casual': return 'bg-green-100 text-green-800';
      case 'rude': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <GoBackButton />
        <div className="text-center flex-1 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Enhanced AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Multimodal AI with OCR, Text-to-Speech, Web Search, Translation, and Automated Tasks
          </p>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="personality">AI Personality</Label>
                <Select value={selectedPersonality} onValueChange={setSelectedPersonality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {personalities && Object.entries(personalities).map(([key, personality]: [string, any]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {getPersonalityIcon(key)}
                          {personality.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="responseStyle">Response Style</Label>
                <Select value={responseStyle} onValueChange={(value: any) => setResponseStyle(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Professional
                      </div>
                    </SelectItem>
                    <SelectItem value="casual">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Casual
                      </div>
                    </SelectItem>
                    <SelectItem value="rude">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Direct/Blunt
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeAudio" className="flex items-center gap-2">
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
                  <Label htmlFor="includeWebSearch" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Web Search
                  </Label>
                  <Switch
                    id="includeWebSearch"
                    checked={includeWebSearch}
                    onCheckedChange={setIncludeWebSearch}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => executeTask('research', { topic: 'AI trends 2024' })}
                disabled={taskMutation.isPending}
              >
                <Search className="w-4 h-4 mr-2" />
                Deep Research
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => translateText(inputMessage, 'Spanish')}
                disabled={translateMutation.isPending || !inputMessage}
              >
                <Languages className="w-4 h-4 mr-2" />
                Translate
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => generateTextToSpeech(inputMessage)}
                disabled={ttsMutation.isPending || !inputMessage}
              >
                <AudioLines className="w-4 h-4 mr-2" />
                Generate Audio
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Conversation
                </div>
                <div className="flex gap-2">
                  <Badge className={getResponseStyleColor(responseStyle)}>
                    {responseStyle}
                  </Badge>
                  {personalities && personalities[selectedPersonality] && (
                    <Badge variant="secondary">
                      {personalities[selectedPersonality].name}
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col space-y-4">
              {/* Messages */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-12'
                            : 'bg-muted mr-12'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {message.type === 'user' ? 'You' : personalities?.[message.personality || '']?.name || 'AI Assistant'}
                          </span>
                          {message.responseStyle && (
                            <Badge size="sm" className={getResponseStyleColor(message.responseStyle)}>
                              {message.responseStyle}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((att: any) => (
                              <div key={att.id} className="flex items-center gap-2 text-sm">
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
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => playAudio(message.audioUrl!)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Play Audio
                            </Button>
                          </div>
                        )}
                        
                        {/* Web search results */}
                        {message.webSearchResults && message.webSearchResults.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <div className="text-sm font-medium">Web Search Results:</div>
                            {message.webSearchResults.map((result: any, idx: number) => (
                              <div key={idx} className="text-sm">
                                <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {result.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.model && <span>{message.model}</span>}
                          {message.processingTime && <span>{Math.round(message.processingTime)}ms</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(chatMutation.isPending || ocrMutation.isPending || ttsMutation.isPending || translateMutation.isPending || taskMutation.isPending) && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-muted rounded-lg p-3 mr-12">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is processing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                        {attachment.type === 'image' && <Image className="w-4 h-4" />}
                        {attachment.type === 'document' && <FileText className="w-4 h-4" />}
                        {attachment.type === 'audio' && <AudioLines className="w-4 h-4" />}
                        <span className="text-sm">{attachment.filename}</span>
                        {attachment.type === 'image' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => performOCR(attachment)}
                            disabled={ocrMutation.isPending}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAttachment(attachment.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Ask anything... I can help with analysis, research, writing, translation, and more!"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
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
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={chatMutation.isPending || (!inputMessage.trim() && attachments.length === 0)}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" controls />
    </div>
  );
}