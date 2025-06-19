import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  Send, 
  Mic, 
  MicOff, 
  Search, 
  Brain, 
  Target, 
  Globe, 
  Shield, 
  Database,
  FileText,
  Download,
  Eye,
  Radar,
  Network,
  Layers,
  Lock,
  Users,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Activity
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysisData?: any;
  metadata?: {
    confidence?: number;
    sources?: number;
    processingTime?: number;
    classification?: string;
  };
}

interface ResearchRequest {
  query: string;
  analysisType: 'quick' | 'comprehensive' | 'deep' | 'maximum';
  includeAdvanced: boolean;
}

export default function Reconnaissance() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your advanced reconnaissance analyst. I can perform deep research and intelligence gathering using professional-grade OSINT techniques. What would you like me to investigate today?",
      timestamp: new Date(),
      metadata: {
        confidence: 100,
        sources: 0,
        processingTime: 0,
        classification: 'public'
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'quick' | 'comprehensive' | 'deep' | 'maximum'>('comprehensive');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const researchMutation = useMutation({
    mutationFn: async (request: ResearchRequest): Promise<any> => {
      const response = await apiRequest('POST', '/api/deep-research', request);
      return response.json();
    },
    onSuccess: (data, variables) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: data.analysis || 'Analysis completed. Please review the findings below.',
        timestamp: new Date(),
        analysisData: data,
        metadata: {
          confidence: data.confidence || 0,
          sources: data.sourcesAnalyzed || 0,
          processingTime: data.processingTime || 0,
          classification: data.classification || 'public'
        }
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I encountered an issue while processing your request. Please try again or provide more specific details.',
        timestamp: new Date(),
        metadata: {
          confidence: 0,
          sources: 0,
          processingTime: 0,
          classification: 'error'
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim() || researchMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add thinking message
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: 'Let me analyze this request and gather intelligence from multiple sources...',
      timestamp: new Date(),
      metadata: {
        confidence: 0,
        sources: 0,
        processingTime: 0,
        classification: 'processing'
      }
    };
    setMessages(prev => [...prev, thinkingMessage]);

    researchMutation.mutate({
      query: inputMessage,
      analysisType: analysisMode,
      includeAdvanced: showAdvancedOptions
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

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatAnalysisData = (data: any) => {
    if (!data) return null;

    return (
      <div className="mt-4 space-y-4">
        {/* Intelligence Summary */}
        {data.summary && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-blue-400 font-semibold mb-2 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Intelligence Summary
            </h4>
            <p className="text-gray-300 text-sm">{data.summary}</p>
          </div>
        )}

        {/* Key Findings */}
        {data.findings && data.findings.length > 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Key Findings
            </h4>
            <div className="space-y-2">
              {data.findings.slice(0, 5).map((finding: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Sources */}
        {data.sources && data.sources.length > 0 && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-purple-400 font-semibold mb-2 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Sources Analyzed ({data.sources.length})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {data.sources.slice(0, 6).map((source: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-2">
                  <span className="text-gray-300 text-xs truncate">{source.name || `Source ${index + 1}`}</span>
                  <span className="text-purple-400 text-xs font-medium">
                    {source.reliability ? `${Math.round(source.reliability * 100)}%` : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Assessment */}
        {data.riskLevel && (
          <div className={`border rounded-xl p-4 ${
            data.riskLevel === 'high' ? 'bg-red-500/10 border-red-500/30' :
            data.riskLevel === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-green-500/10 border-green-500/30'
          }`}>
            <h4 className={`font-semibold mb-2 flex items-center ${
              data.riskLevel === 'high' ? 'text-red-400' :
              data.riskLevel === 'medium' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              <Shield className="w-4 h-4 mr-2" />
              Risk Assessment: {data.riskLevel.toUpperCase()}
            </h4>
            {data.riskFactors && (
              <div className="space-y-1">
                {data.riskFactors.map((factor: string, index: number) => (
                  <p key={index} className="text-gray-300 text-sm">• {factor}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    if (confidence >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/10 backdrop-blur-xl bg-white/5 p-6"
        >
          {/* Go Back Button */}
          <div className="absolute top-4 left-4 z-50">
            <GoBackButton className="mb-4" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Radar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Deep Research Intelligence</h1>
                <p className="text-gray-400 text-sm">Advanced OSINT & Reconnaissance Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-300 text-sm">Analysis Mode:</label>
                <select
                  value={analysisMode}
                  onChange={(e) => setAnalysisMode(e.target.value as any)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="quick">Quick Scan</option>
                  <option value="comprehensive">Comprehensive</option>
                  <option value="deep">Deep Analysis</option>
                  <option value="maximum">Maximum Depth</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showAdvancedOptions 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Advanced
              </button>
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
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium">Research Analyst</span>
                        {message.metadata && (
                          <div className="flex items-center space-x-3 ml-4">
                            {message.metadata.confidence !== undefined && (
                              <span className={`text-xs font-medium ${getConfidenceColor(message.metadata.confidence)}`}>
                                {message.metadata.confidence}% confidence
                              </span>
                            )}
                            {message.metadata.sources !== undefined && message.metadata.sources > 0 && (
                              <span className="text-xs text-gray-400">
                                {message.metadata.sources} sources
                              </span>
                            )}
                            {message.metadata.processingTime !== undefined && message.metadata.processingTime > 0 && (
                              <span className="text-xs text-gray-400">
                                {(message.metadata.processingTime / 1000).toFixed(1)}s
                              </span>
                            )}
                            {message.metadata.classification && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                message.metadata.classification === 'classified' ? 'bg-red-500/20 text-red-400' :
                                message.metadata.classification === 'confidential' ? 'bg-orange-500/20 text-orange-400' :
                                message.metadata.classification === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {message.metadata.classification}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-white whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>

                    {message.analysisData && formatAnalysisData(message.analysisData)}
                    
                    <div className="mt-3 text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {researchMutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-gray-300 ml-2">Analyzing and gathering intelligence...</span>
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
                  placeholder="Enter your research query or target for analysis..."
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-16"
                  disabled={researchMutation.isPending}
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
              disabled={!inputMessage.trim() || researchMutation.isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <div>
              Press Enter to send • Shift+Enter for new line • Click mic for voice input
            </div>
            <div className="flex items-center space-x-4">
              <span>Mode: {analysisMode}</span>
              <span>Advanced: {showAdvancedOptions ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}