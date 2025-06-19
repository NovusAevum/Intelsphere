import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { Send, Mic, MicOff, Brain, Shield, Zap, Image, Paperclip, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  metadata?: any;
}

interface AIAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  color: string;
  capabilities: string[];
  status: 'online' | 'busy' | 'offline';
}

const aiAgents: AIAgent[] = [
  {
    id: 'linny',
    name: 'LINNY OSINT',
    title: 'Intelligence & Reconnaissance Specialist',
    description: 'Advanced OSINT operations, threat analysis, and strategic intelligence gathering',
    avatar: '🔍',
    color: 'from-red-500 to-pink-500',
    capabilities: ['OSINT Analysis', 'Threat Assessment', 'Data Mining', 'Intelligence Reports'],
    status: 'online'
  },
  {
    id: 'tuck',
    name: 'TUCK SECURITY',
    title: 'Cybersecurity Defense Specialist',
    description: 'Network security, vulnerability assessment, and incident response',
    avatar: '🛡️',
    color: 'from-green-500 to-emerald-500',
    capabilities: ['Security Analysis', 'Penetration Testing', 'Incident Response', 'Risk Assessment'],
    status: 'online'
  },
  {
    id: 'mingming',
    name: 'MING-MING MARKETING',
    title: 'Performance Marketing Strategist',
    description: 'Digital marketing optimization, analytics, and campaign management',
    avatar: '📈',
    color: 'from-purple-500 to-pink-500',
    capabilities: ['Campaign Optimization', 'Analytics', 'ROI Analysis', 'Market Research'],
    status: 'online'
  }
];

export default function ChatInterface() {
  const [match, params] = useRoute("/chat/:agentId?");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(aiAgents[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (params?.agentId) {
      const agent = aiAgents.find(a => a.id === params.agentId);
      if (agent) setSelectedAgent(agent);
    }
  }, [params]);

  useEffect(() => {
    // Initialize chat with welcome message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'system',
        content: `Welcome to the AI Chat Interface. You're now connected to ${selectedAgent.name}. How can I assist you today?`,
        timestamp: new Date()
      }]);
    }
  }, [selectedAgent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAIResponse(inputMessage, selectedAgent),
        timestamp: new Date(),
        agentId: selectedAgent.id
      };

      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, agent: AIAgent): string => {
    const responses = {
      linny: [
        "Analyzing intelligence patterns... I've identified several key data points that require further investigation.",
        "Based on OSINT analysis, I recommend cross-referencing multiple sources for verification.",
        "Threat assessment complete. Implementing advanced reconnaissance protocols for deeper analysis.",
        "Intelligence gathered. Processing through neural network for pattern recognition and threat evaluation."
      ],
      tuck: [
        "Security scan initiated. Analyzing potential vulnerabilities and threat vectors.",
        "Implementing defensive protocols. Network security assessment in progress.",
        "Incident response protocols activated. Monitoring for anomalous activities.",
        "Vulnerability assessment complete. Recommending security hardening measures."
      ],
      mingming: [
        "Campaign performance metrics analyzed. Optimization recommendations generated.",
        "Marketing intelligence processed. ROI improvement strategies identified.",
        "Audience targeting refined. Performance analytics indicate positive trend vectors.",
        "Digital marketing analysis complete. Implementing advanced optimization algorithms."
      ]
    };

    const agentResponses = responses[agent.id as keyof typeof responses] || responses.linny;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-6">
      <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-8rem)]">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-t-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedAgent.color} flex items-center justify-center text-2xl`}>
                {selectedAgent.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-mono">{selectedAgent.name}</h2>
                <p className="text-gray-400">{selectedAgent.title}</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-green-400 text-sm font-mono">{selectedAgent.status.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Agent Selector */}
            <div className="flex items-center space-x-2">
              {aiAgents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    selectedAgent.id === agent.id 
                      ? `bg-gradient-to-r ${agent.color} scale-110` 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {agent.avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Agent Capabilities */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedAgent.capabilities.map((capability, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border-x border-gray-700/50 flex-1 p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : `bg-gradient-to-r ${selectedAgent.color} text-white`
                  }`}
                >
                  {message.type !== 'user' && (
                    <div className="text-xs opacity-75 mb-1 font-mono">
                      {message.type === 'system' ? 'SYSTEM' : selectedAgent.name} • {message.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.type === 'user' && (
                    <div className="text-xs opacity-75 mt-1 text-right font-mono">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`bg-gradient-to-r ${selectedAgent.color} text-white px-4 py-3 rounded-lg max-w-xs`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-b-xl p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message ${selectedAgent.name}...`}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none resize-none font-mono"
                rows={3}
              />
            </div>

            {/* Input Controls */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isVoiceMode 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-gray-700/50 text-gray-400 hover:text-cyan-400'
                }`}
              >
                {isVoiceMode ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button className="w-12 h-12 rounded-lg bg-gray-700/50 text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300">
                <Paperclip className="w-5 h-5" />
              </button>

              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-colors">
              Quick Analysis
            </button>
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-colors">
              Generate Report
            </button>
            <button className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-colors">
              System Status
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}