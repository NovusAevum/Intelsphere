/**
 * Agent System Manager - Decoupled agent management without circular dependencies
 * Manages agent interactions through centralized state
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, RotateCcw, Cog, Activity, Brain, Crosshair } from 'lucide-react';
import { useAIInterface, useGlobalContext } from '@/state/global-state-manager';

interface Agent {
  id: string;
  name: string;
  title: string;
  status: 'online' | 'offline' | 'busy';
  capabilities: string[];
  systemMetrics: {
    uptime: string;
    tasksCompleted: number;
    accuracy: string;
    responseTime: string;
  };
}

interface AgentSystemManagerProps {
  agents: Agent[];
  onAgentAction?: (agentId: string, action: string) => void;
}

export function AgentSystemManager({ agents, onAgentAction }: AgentSystemManagerProps) {
  const { selectedModel, connectionStatus } = useAIInterface();
  const { state } = useGlobalContext();

  const handleAgentAction = (agentId: string, action: string) => {
    if (onAgentAction) {
      onAgentAction(agentId, action);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 border-green-400';
      case 'busy': return 'text-yellow-400 border-yellow-400';
      case 'offline': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <motion.div
          key={agent.id}
          className={`
            bg-gradient-to-br from-gray-900/80 to-gray-800/80 
            backdrop-blur-sm border rounded-xl p-6 
            hover:scale-105 transition-all duration-300 group
            ${getStatusColor(agent.status)}
          `}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          {/* Agent Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                agent.status === 'online' ? 'bg-green-400 animate-pulse' :
                agent.status === 'busy' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400'
              }`} />
              <div>
                <h3 className="text-lg font-bold text-white font-mono">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-400">{agent.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {agent.status}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleAgentAction(agent.id, 'chat')}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-all duration-300 font-mono text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CHAT</span>
            </button>
            
            <button
              onClick={() => handleAgentAction(agent.id, 'restart')}
              className="px-4 py-2 bg-gray-700/50 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleAgentAction(agent.id, 'settings')}
              className="px-4 py-2 bg-gray-700/50 text-gray-400 hover:text-cyan-400 rounded-lg transition-all duration-300"
            >
              <Cog className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default AgentSystemManager;