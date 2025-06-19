import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  Zap, 
  Activity, 
  Settings, 
  Download, 
  RefreshCw,
  MessageSquare,
  Search,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Database,
  Code,
  FileText,
  Image,
  Video,
  PieChart,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  capabilities: string[];
  model: string;
  status: 'online' | 'busy' | 'offline';
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agent?: string;
  metadata?: {
    model?: string;
    tokens?: number;
    confidence?: number;
    processingTime?: number;
  };
  attachments?: Array<{
    type: 'code' | 'data' | 'image' | 'file';
    content: string;
    title: string;
  }>;
}

interface AIRequest {
  message: string;
  agent: string;
  context?: any;
  attachments?: File[];
}

export default function AICenter() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Welcome to the AI Command Center! I'm your multi-model AI assistant with access to Claude, GPT-4, and Gemini. I can help with research, analysis, content creation, code generation, and strategic planning. Which AI agent would you like to work with?",
      timestamp: new Date(),
      agent: 'coordinator',
      metadata: {
        model: 'claude-sonnet-4-20250514',
        confidence: 100,
        processingTime: 0
      }
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('coordinator');
  const [isListening, setIsListening] = useState(false);
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiAgents: AIAgent[] = [
    {
      id: 'coordinator',
      name: 'AI Coordinator',
      description: 'Multi-model orchestrator that routes tasks to the best AI for optimal results',
      icon: Brain,
      color: 'purple',
      capabilities: ['Task Routing', 'Model Selection', 'Quality Assurance', 'Response Synthesis'],
      model: 'Multi-Model',
      status: 'online'
    },
    {
      id: 'claude',
      name: 'Claude Analyst',
      description: 'Advanced reasoning and analysis with superior context understanding',
      icon: Search,
      color: 'blue',
      capabilities: ['Deep Analysis', 'Research', 'Writing', 'Code Review', 'Strategic Planning'],
      model: 'Claude Sonnet 4.0',
      status: 'online'
    },
    {
      id: 'gpt4',
      name: 'GPT-4 Specialist',
      description: 'Versatile problem-solving with strong creative and technical capabilities',
      icon: Sparkles,
      color: 'green',
      capabilities: ['Code Generation', 'Creative Writing', 'Problem Solving', 'Data Analysis'],
      model: 'GPT-4o',
      status: 'online'
    },
    {
      id: 'gemini',
      name: 'Gemini Expert',
      description: 'Multimodal AI with advanced vision and reasoning capabilities',
      icon: Globe,
      color: 'orange',
      capabilities: ['Image Analysis', 'Multimodal Understanding', 'Technical Documentation'],
      model: 'Gemini Pro',
      status: 'online'
    },
    {
      id: 'research',
      name: 'Research Agent',
      description: 'Specialized in deep research, fact-checking, and information synthesis',
      icon: Target,
      color: 'red',
      capabilities: ['OSINT', 'Fact Checking', 'Source Verification', 'Data Synthesis'],
      model: 'Claude + GPT-4',
      status: 'online'
    },
    {
      id: 'smart-multi',
      name: 'Smart AI Assistant',
      description: 'All 7 AI models working simultaneously with advanced consciousness',
      icon: Zap,
      color: 'cyan',
      capabilities: ['Multi-Model Processing', 'Consciousness AI', 'Advanced Reasoning', 'Real-time Analysis'],
      model: 'All 7 Models',
      status: 'online'
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      description: 'Business intelligence, market analysis, and content strategy specialist',
      icon: TrendingUp,
      color: 'teal',
      capabilities: ['Market Analysis', 'Content Strategy', 'Competitor Research', 'Campaign Planning'],
      model: 'GPT-4 + Gemini',
      status: 'online'
    }
  ];

  const chatMutation = useMutation({
    mutationFn: async (request: AIRequest): Promise<any> => {
      const response = await apiRequest('POST', '/api/ai-chat', request);
      return response.json();
    },
    onSuccess: (data, variables) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: data.response || 'I can help you with that request.',
        timestamp: new Date(),
        agent: variables.agent,
        metadata: {
          model: data.model || 'unknown',
          tokens: data.tokens || 0,
          confidence: data.confidence || 0,
          processingTime: data.processingTime || 0
        },
        attachments: data.attachments || []
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error) => {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I encountered an issue processing your request. Please try again or select a different AI agent.',
        timestamp: new Date(),
        agent: selectedAgent,
        metadata: {
          confidence: 0,
          processingTime: 0
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      agent: selectedAgent
    };

    setMessages(prev => [...prev, userMessage]);

    chatMutation.mutate({
      message: inputMessage,
      agent: selectedAgent,
      context: {
        previousMessages: messages.slice(-5),
        selectedModel: aiAgents.find(a => a.id === selectedAgent)?.model
      }
    });

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
      } else {
        recognition.stop();
        setIsListening(false);
      }
    }
  };

  const getAgentInfo = (agentId: string) => {
    return aiAgents.find(a => a.id === agentId) || aiAgents[0];
  };

  const renderAttachment = (attachment: any) => {
    const icons = {
      code: Code,
      data: Database,
      image: Image,
      file: FileText
    };
    
    const IconComponent = icons[attachment.type as keyof typeof icons] || FileText;
    
    return (
      <div key={attachment.title} className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-600/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">{attachment.title}</span>
          </div>
          <button className="p-1 hover:bg-gray-700 rounded">
            <Copy className="w-3 h-3 text-gray-400" />
          </button>
        </div>
        <pre className="text-gray-300 text-xs overflow-x-auto">
          {attachment.content.slice(0, 200)}
          {attachment.content.length > 200 && '...'}
        </pre>
      </div>
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-orange-950 to-red-950 relative overflow-hidden">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <GoBackButton />
      </div>
      
      {/* 3D Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 h-screen flex">
        {/* AI Agent Panel */}
        <AnimatePresence>
          {showAgentPanel && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 border-r border-white/10 backdrop-blur-xl bg-white/5 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">AI Agents</h2>
                <button
                  onClick={() => setShowAgentPanel(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-90" />
                </button>
              </div>

              <div className="space-y-3">
                {aiAgents.map((agent) => {
                  const IconComponent = agent.icon;
                  const isSelected = selectedAgent === agent.id;
                  
                  return (
                    <motion.div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? `bg-${agent.color}-500/20 border-${agent.color}-500/50`
                          : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-${agent.color}-500/20`}>
                          <IconComponent className={`w-5 h-5 text-${agent.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-white font-semibold text-sm">{agent.name}</h3>
                            <div className={`w-2 h-2 rounded-full ${
                              agent.status === 'online' ? 'bg-green-400' :
                              agent.status === 'busy' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}></div>
                          </div>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            {agent.description}
                          </p>
                          <div className="mt-2 text-xs text-gray-500">
                            Model: {agent.model}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {agent.capabilities.slice(0, 2).map((capability) => (
                              <span
                                key={capability}
                                className={`px-2 py-1 bg-${agent.color}-500/10 text-${agent.color}-400 text-xs rounded-full`}
                              >
                                {capability}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-white/10 backdrop-blur-xl bg-white/5 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!showAgentPanel && (
                  <button
                    onClick={() => setShowAgentPanel(true)}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <Brain className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                
                <div className="flex items-center space-x-3">
                  {(() => {
                    const agent = getAgentInfo(selectedAgent);
                    const IconComponent = agent.icon;
                    return (
                      <>
                        <div className={`p-3 rounded-xl bg-${agent.color}-500/20`}>
                          <IconComponent className={`w-6 h-6 text-${agent.color}-400`} />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
                          <p className="text-gray-400 text-sm">{agent.model} • {agent.status}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">
                    {aiAgents.filter(a => a.status === 'online').length} Agents Online
                  </span>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl ${message.type === 'user' ? 'w-auto' : 'w-full'}`}>
                    <div className={`p-4 rounded-2xl backdrop-blur-xl ${
                      message.type === 'user'
                        ? 'bg-blue-600/20 border border-blue-500/30 ml-16'
                        : 'bg-gray-800/40 border border-gray-700/50'
                    }`}>
                      {message.type === 'assistant' && message.agent && (
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const agent = getAgentInfo(message.agent);
                              const IconComponent = agent.icon;
                              return (
                                <>
                                  <div className={`w-8 h-8 rounded-lg bg-${agent.color}-500/20 flex items-center justify-center`}>
                                    <IconComponent className={`w-4 h-4 text-${agent.color}-400`} />
                                  </div>
                                  <span className="text-white font-medium">{agent.name}</span>
                                </>
                              );
                            })()}
                          </div>
                          
                          {message.metadata && (
                            <div className="flex items-center space-x-3 text-xs">
                              {message.metadata.model && (
                                <span className="text-gray-400">{message.metadata.model}</span>
                              )}
                              {message.metadata.confidence !== undefined && (
                                <span className="text-green-400">{message.metadata.confidence}%</span>
                              )}
                              {message.metadata.processingTime !== undefined && message.metadata.processingTime > 0 && (
                                <span className="text-blue-400">{(message.metadata.processingTime / 1000).toFixed(1)}s</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="text-white whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>

                      {message.attachments && message.attachments.map(renderAttachment)}
                      
                      <div className="mt-3 text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {chatMutation.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 backdrop-blur-xl">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const agent = getAgentInfo(selectedAgent);
                      const IconComponent = agent.icon;
                      return (
                        <div className={`w-8 h-8 rounded-lg bg-${agent.color}-500/20 flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 text-${agent.color}-400 animate-pulse`} />
                        </div>
                      );
                    })()}
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                      <span className="text-gray-300 ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 backdrop-blur-xl bg-white/5 p-6"
          >
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask ${getAgentInfo(selectedAgent).name} anything...`}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-16"
                    disabled={chatMutation.isPending}
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || chatMutation.isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <div>
                Press Enter to send • Shift+Enter for new line • Click mic for voice input
              </div>
              <div className="flex items-center space-x-4">
                <span>Active: {getAgentInfo(selectedAgent).name}</span>
                <span>Model: {getAgentInfo(selectedAgent).model}</span>
                <a 
                  href="/smart-ai-assistant" 
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Full Smart Assistant →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}