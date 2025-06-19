import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, Settings, Download, Mic, Image, FileText, Globe, Zap, ArrowLeft, Search, Database, Users, BarChart3, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  attachments?: File[];
  isTyping?: boolean;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  capabilities: string[];
  status: 'online' | 'offline' | 'limited';
}

const availableModels: AIModel[] = [
  { id: 'openai-gpt4o', name: 'GPT-4o', provider: 'OpenAI', capabilities: ['text', 'image', 'reasoning'], status: 'online' },
  { id: 'anthropic-claude', name: 'Claude Sonnet 4', provider: 'Anthropic', capabilities: ['text', 'image', 'analysis'], status: 'online' },
  { id: 'xai-grok', name: 'Grok 2', provider: 'xAI', capabilities: ['text', 'realtime'], status: 'online' },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI', capabilities: ['text', 'multilingual'], status: 'online' },
  { id: 'cohere-command', name: 'Command R+', provider: 'Cohere', capabilities: ['text', 'reasoning'], status: 'online' },
  { id: 'voyage-embedding', name: 'Voyage AI', provider: 'Voyage', capabilities: ['embedding', 'search'], status: 'online' },
  { id: 'google-gemini', name: 'Gemini Pro', provider: 'Google', capabilities: ['text', 'multimodal'], status: 'online' },
  { id: 'perplexity-search', name: 'Perplexity', provider: 'Perplexity', capabilities: ['search', 'realtime'], status: 'online' },
];

export default function EnhancedChatGPTInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Welcome to IntelSphere Enhanced Chat! I\'m your advanced AI assistant with access to 8 cutting-edge models and comprehensive intelligence capabilities.\n\n🚀 **What I can help you with:**\n• Advanced research and analysis\n• Document processing and insights\n• OSINT investigations\n• Business intelligence\n• Multi-language support\n• Image analysis and generation\n• Real-time web search\n\n📎 You can attach documents, images, or ask me anything. Which AI model would you like to use?',
      timestamp: new Date(),
      model: 'system'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('openai-gpt4o');
  const [selectedModels, setSelectedModels] = useState<string[]>(['openai-gpt4o']);
  const [multiModelMode, setMultiModelMode] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [osintEnabled, setOsintEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setAttachedFiles(prev => [...prev, ...files]);
      toast({
        title: 'Files attached',
        description: `${files.length} file(s) attached successfully`,
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setAttachedFiles([]);
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date(),
      model: selectedModel,
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const formData = new FormData();
      formData.append('message', currentMessage);
      formData.append('multiModelMode', multiModelMode.toString());
      formData.append('osintEnabled', osintEnabled.toString());
      formData.append('webSearchEnabled', webSearchEnabled.toString());
      
      if (multiModelMode) {
        formData.append('models', JSON.stringify(selectedModels));
      } else {
        formData.append('model', selectedModel);
      }
      
      attachedFiles.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });

      const response = await fetch('/api/enhanced-chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      if (multiModelMode && data.responses) {
        // Add responses from multiple models with staggered timing
        data.responses.forEach((modelResponse: any, index: number) => {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: Date.now().toString() + index,
              role: 'assistant',
              content: modelResponse.content || modelResponse.response,
              timestamp: new Date(),
              model: modelResponse.model,
            }]);
          }, index * 800); // Stagger responses for better UX
        });
      } else {
        // Single model response
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.response || data.content || 'I apologize, but I encountered an issue processing your request. Please try again.',
          timestamp: new Date(),
          model: data.model || selectedModel,
        }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          role: 'assistant',
          content: '⚠️ I encountered an issue processing your request. Please check your connection and try again.',
          timestamp: new Date(),
          model: selectedModel,
        }];
      });

      toast({
        title: 'Connection Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    '🔍 Analyze this document for key insights',
    '🌐 Research current market trends',
    '📊 Generate a business analysis',
    '🔒 Perform OSINT investigation',
    '💡 Brainstorm innovative solutions',
    '📝 Summarize and extract action items'
  ];

  const handleModelToggle = (modelId: string, checked: boolean) => {
    if (checked) {
      setSelectedModels(prev => [...prev, modelId]);
    } else {
      setSelectedModels(prev => prev.filter(id => id !== modelId));
    }
  };

  const handleSelectAllModels = () => {
    if (selectedModels.length === availableModels.length) {
      setSelectedModels([selectedModel]); // Keep at least one model
    } else {
      setSelectedModels(availableModels.map(m => m.id));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      {/* Enhanced Header - Mobile Responsive */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-1 sm:p-2">
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-600 hidden sm:block"></div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Enhanced AI Chat</h1>
            <Badge variant="outline" className="text-blue-300 border-blue-500/30 text-xs">
              {multiModelMode ? `${selectedModels.length} Models` : '1 Model'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Advanced Settings - Mobile Responsive */}
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Search className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <Switch
                  checked={webSearchEnabled}
                  onCheckedChange={setWebSearchEnabled}
                  className="data-[state=checked]:bg-green-600 scale-75 sm:scale-100"
                />
                <span className="text-xs text-gray-300 hidden md:inline">Web Search</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Database className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <Switch
                  checked={osintEnabled}
                  onCheckedChange={setOsintEnabled}
                  className="data-[state=checked]:bg-purple-600 scale-75 sm:scale-100"
                />
                <span className="text-xs text-gray-300 hidden md:inline">OSINT</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                <Switch
                  checked={multiModelMode}
                  onCheckedChange={setMultiModelMode}
                  className="data-[state=checked]:bg-orange-600 scale-75 sm:scale-100"
                />
                <span className="text-xs text-gray-300 hidden md:inline">Multi-Model</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Mobile Responsive */}
      <div className="hidden lg:flex lg:w-80 w-0 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700/50 p-2 sm:p-4 pt-16 sm:pt-20">
        <div className="space-y-4">
          {/* Model Selection */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-400" />
                {multiModelMode ? 'AI Models Selection' : 'AI Model'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {multiModelMode ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={handleSelectAllModels}
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                    >
                      {selectedModels.length === availableModels.length ? 'Deselect All' : 'Select All'}
                    </Button>
                    <span className="text-xs text-gray-400">{selectedModels.length} selected</span>
                  </div>
                  
                  <div className="space-y-2">
                    {availableModels.map((model) => (
                      <div key={model.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50">
                        <Checkbox
                          id={model.id}
                          checked={selectedModels.includes(model.id)}
                          onCheckedChange={(checked) => handleModelToggle(model.id, checked as boolean)}
                          className="border-gray-500 data-[state=checked]:bg-blue-600"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant={model.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                              {model.status}
                            </Badge>
                            <label htmlFor={model.id} className="text-sm text-white font-medium cursor-pointer">
                              {model.name}
                            </label>
                          </div>
                          <div className="text-xs text-gray-400">{model.provider}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {availableModels.map((model) => (
                        <SelectItem key={model.id} value={model.id} className="text-white hover:bg-gray-700">
                          <div className="flex items-center gap-2">
                            <Badge variant={model.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                              {model.status}
                            </Badge>
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              
                  {/* Model Info */}
                  {(() => {
                    const currentModel = availableModels.find(m => m.id === selectedModel);
                    return currentModel ? (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-gray-400">Provider: {currentModel.provider}</div>
                        <div className="flex flex-wrap gap-1">
                          {currentModel.capabilities.map((cap) => (
                            <Badge key={cap} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                              {cap}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  onClick={() => setCurrentMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Messages:</span>
                <span className="text-white">{messages.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Model:</span>
                <span className="text-blue-300">{availableModels.find(m => m.id === selectedModel)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Chat Area - Mobile Responsive */}
      <div className="flex-1 flex flex-col pt-14 sm:pt-16">
        {/* Mobile Model Selection */}
        <div className="lg:hidden bg-gray-800/50 border-b border-gray-700/50 p-2">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white text-sm">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {availableModels.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-white hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Badge variant={model.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                      {model.status}
                    </Badge>
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-gray-400">({model.provider})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* OSINT Tools Bar - Mobile Responsive */}
        {osintEnabled && (
          <div className="bg-purple-900/30 border-b border-purple-700/50 p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 font-medium">OSINT Tools Active</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                  NATO OSINT
                </Badge>
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                  APT Intel
                </Badge>
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300 hidden sm:inline-flex">
                  Cyber Reconnaissance
                </Badge>
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300 hidden sm:inline-flex">
                  Social Intelligence
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Web Search Bar - Mobile Responsive */}
        {webSearchEnabled && (
          <div className="bg-green-900/30 border-b border-green-700/50 p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-medium">Web Crawling Active</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-300">
                  Real-time Search
                </Badge>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-300 hidden sm:inline-flex">
                  Deep Web Crawling
                </Badge>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-300 hidden sm:inline-flex">
                  Source Verification
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Messages - Mobile Responsive */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-4xl sm:max-w-3xl lg:max-w-4xl rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white'
                }`}
              >
                {message.model && message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                      {availableModels.find(m => m.id === message.model)?.name || message.model}
                    </Badge>
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                )}
                
                <div className="prose prose-invert max-w-none">
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-gray-400">{message.content}</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-1">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-300">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Mobile Responsive */}
        <div className="bg-gray-900/50 backdrop-blur-xl border-t border-gray-700/50 p-2 sm:p-4">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-2 sm:mb-3 flex flex-wrap gap-1 sm:gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-2 sm:px-3 py-1">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="text-xs text-gray-300 truncate max-w-[120px] sm:max-w-none">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-3 w-3 sm:h-4 sm:w-4 p-0 text-gray-400 hover:text-red-400"
                    onClick={() => removeAttachment(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... I have access to advanced AI models and intelligence capabilities."
                className="min-h-[50px] sm:min-h-[60px] bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 resize-none text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-1 sm:gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileAttachment}
                multiple
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-1 sm:p-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-1 sm:p-2 hidden sm:flex"
                disabled={isLoading}
              >
                <Mic className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={sendMessage}
                disabled={isLoading || (!currentMessage.trim() && attachedFiles.length === 0)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            Enhanced with 8 AI models • OSINT capabilities • Document analysis • Real-time intelligence
          </div>
        </div>
      </div>
    </div>
  );
}