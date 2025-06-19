import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

interface Agent {
  id: string;
  name: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface ChatInterfaceProps {
  agent: Agent;
  onClose: () => void;
}

interface Message {
  type: 'system' | 'user' | 'agent';
  content: string;
  timestamp: number;
}

export default function ChatInterface({ agent, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentMessages = {
    linny: [
      'Linny OSINT Command activated...',
      'Initializing reconnaissance protocols...',
      'OSINT systems online and ready for deployment.',
      'Available capabilities: Digital footprinting, Social media intelligence, Threat analysis',
      'Type your reconnaissance request to begin.'
    ],
    tuck: [
      'Tuck AI Specialist online...',
      'Loading neural network architectures...',
      'AI systems fully operational.',
      'Available capabilities: Custom AI models, Neural networks, Automation systems',
      'Ready to process your AI development requests.'
    ],
    mingming: [
      'Ming-Ming Marketing engine starting...',
      'Connecting to performance marketing systems...',
      'Digital marketing platform ready.',
      'Available capabilities: Google Ads optimization, Growth strategies, Campaign development',
      'Submit your marketing objectives for analysis.'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize with agent activation messages
    const initMessages = agentMessages[agent.id as keyof typeof agentMessages] || [];
    
    initMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: message,
          timestamp: Date.now()
        }]);
      }, index * 800);
    });
  }, [agent.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: Message = {
        type: 'agent',
        content: `Processing your request: "${input}"... Advanced analysis in progress. Task delegated to ${agent.name} for specialized handling.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickCommands = [
    'SYSTEM STATUS',
    'OSINT SCAN',
    'AI ANALYSIS',
    'MARKET RESEARCH'
  ];

  const handleQuickCommand = (command: string) => {
    setInput(command);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <motion.div 
      className="glass rounded-xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-xl font-bold ${agent.color}`}>
          {agent.icon} {agent.name} {agent.title}
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="bg-[hsl(var(--panel))] rounded-lg p-4 h-64 overflow-y-auto mb-4 font-mono text-sm">
        {messages.map((message, index) => (
          <motion.div 
            key={index}
            className="mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.type === 'system' && (
              <span className={agent.color}>
                [{agent.name.toUpperCase()}] {message.content}
              </span>
            )}
            {message.type === 'user' && (
              <span className="text-[hsl(var(--cyber))]">
                [USER] {message.content}
              </span>
            )}
            {message.type === 'agent' && (
              <span className="text-green-400">
                [AI] {message.content}
              </span>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            [PROCESSING...]
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Type your command..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-[hsl(var(--panel))] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors"
        />
        <button 
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-[hsl(var(--cyber))] text-[hsl(var(--command))] px-6 py-2 rounded-lg hover:bg-[hsl(var(--cyber))]/80 transition-colors disabled:opacity-50"
        >
          SEND
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {quickCommands.map((command) => (
          <button 
            key={command}
            onClick={() => handleQuickCommand(command)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {command}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
