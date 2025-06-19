import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Shield, Brain, TrendingUp, Zap, Activity, BarChart3 } from 'lucide-react';

export default function StaticAICommandCenter() {
  const [command, setCommand] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'linny',
      name: 'Linny OSINT Command',
      icon: '🔍',
      description: 'Advanced reconnaissance & intelligence',
      specialties: ['OSINT Analysis', 'Threat Intelligence', 'Data Mining', 'Social Engineering']
    },
    {
      id: 'tuck',
      name: 'Tuck AI Specialist',
      icon: '🤖',
      description: 'Neural networks & machine learning',
      specialties: ['Machine Learning', 'Neural Networks', 'AI Development', 'Deep Learning']
    },
    {
      id: 'mingming',
      name: 'Ming-Ming Marketing',
      icon: '📈',
      description: 'Digital strategy & performance marketing',
      specialties: ['Digital Marketing', 'Growth Hacking', 'Performance Analytics', 'Brand Strategy']
    }
  ];

  const capabilities = [
    'Multi-AI model integration (GPT-4, Claude, Gemini)',
    'Deep research with OSINT capabilities',
    'Neural network analysis & visualization',
    'Autonomous task execution',
    'Real-time data processing',
    'Advanced cybersecurity analysis'
  ];

  const quickCommands = [
    { id: 'status', label: 'SYSTEM STATUS', icon: Activity },
    { id: 'osint', label: 'OSINT SCAN', icon: Search },
    { id: 'ai', label: 'AI ANALYSIS', icon: Brain },
    { id: 'market', label: 'MARKET RESEARCH', icon: BarChart3 }
  ];

  const handleSendCommand = () => {
    if (command.trim()) {
      console.log('Command sent:', command, 'Agent:', selectedAgent);
      setCommand('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendCommand();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 mt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          WONDER PETS AI COMMAND CENTER
        </h2>
        
        <div className="bg-black/50 rounded-2xl p-6 border border-cyan-500/30">
          <div className="text-cyan-400 mb-4 text-lg font-semibold">
            🚀 **HANIS WONDER PETS COMMAND CENTER ONLINE**
          </div>
          
          {/* Available Agents */}
          <div className="mb-6">
            <div className="text-white mb-4 font-semibold">**Available Agents:**</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <motion.button
                  key={agent.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  className={`
                    p-4 rounded-lg border transition-all duration-300
                    ${selectedAgent === agent.id
                      ? 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border-cyan-400'
                      : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="text-left">
                      <div className="text-white font-bold text-sm">{agent.name}</div>
                      <div className="text-gray-300 text-xs">{agent.description}</div>
                    </div>
                  </div>
                  
                  {selectedAgent === agent.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-600 pt-2 mt-2"
                    >
                      <div className="text-xs text-gray-400 text-left">
                        {agent.specialties.map((specialty, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                            <span>{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Advanced Capabilities */}
          <div className="text-gray-300 mb-6">
            <div className="text-white mb-3 font-semibold">**Advanced Capabilities:**</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Command Input */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your command or select an agent to begin..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendCommand}
              disabled={!command.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send size={18} />
              <span>SEND</span>
            </motion.button>
          </div>
          
          {/* Quick Commands */}
          <div className="flex flex-wrap gap-3">
            {quickCommands.map((cmd) => (
              <motion.button
                key={cmd.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCommand(cmd.label.toLowerCase())}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500/50 hover:to-blue-500/50 text-white px-4 py-2 rounded-lg transition-all font-medium"
              >
                <cmd.icon size={16} />
                <span>{cmd.label}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Agent Status */}
          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20"
            >
              <div className="text-cyan-400 text-sm font-semibold mb-2">
                Agent {agents.find(a => a.id === selectedAgent)?.name} Selected
              </div>
              <div className="text-gray-300 text-xs">
                Ready to execute commands in {agents.find(a => a.id === selectedAgent)?.description} domain.
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}