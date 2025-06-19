import { motion } from "framer-motion";
import linnyImage from "@assets/linny.jpg";
import tuckImage from "@assets/tuck.jpeg";
import mingmingImage from "@assets/mingming.jpeg";

interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  status: string;
  skills: Array<{ name: string; level: string }>;
  capabilities: string[];
}

interface AgentCardProps {
  agent: Agent;
  onActivate: (agent: Agent) => void;
  index: number;
}

const getCharacterImage = (agentId: string) => {
  switch (agentId) {
    case "linny":
      return linnyImage;
    case "tuck":
      return tuckImage;
    case "mingming":
      return mingmingImage;
    default:
      return linnyImage;
  }
};

export default function AgentCard({ agent, onActivate, index }: AgentCardProps) {
  return (
    <motion.div 
      className="agent-card glass rounded-2xl p-6 border-l-4 hover:scale-105 transition-transform group"
      style={{ borderLeftColor: `hsl(var(--${agent.id === 'mingming' ? 'ming' : agent.id}))` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Character Image */}
      <div className="mb-6">
        <img 
          src={getCharacterImage(agent.id)}
          alt={`${agent.name} Wonder Pets character`}
          className="w-full h-48 object-contain rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20" 
        />
      </div>

      <div className="text-center mb-6">
        <motion.div 
          className={`w-20 h-20 ${agent.bgColor}/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce`}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-3xl">{agent.icon}</span>
        </motion.div>
        <h3 className={`text-xl font-bold ${agent.color} mb-2`}>
          {agent.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {agent.title}
        </p>
        <p className="text-lg font-semibold mb-4">
          {agent.description}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse status-indicator"></div>
          <span className="text-green-400 text-sm">{agent.status}</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {agent.skills.map((skill, skillIndex) => (
          <motion.div 
            key={skill.name}
            className="flex justify-between items-center p-3 bg-[hsl(var(--panel))] rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm">{skill.name}</span>
            <span className={`${agent.color} font-bold text-sm`}>
              {skill.level}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold mb-3">CAPABILITIES</h4>
        <ul className="text-sm space-y-2 text-gray-300">
          {agent.capabilities.map((capability, capIndex) => (
            <motion.li 
              key={capability}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: capIndex * 0.05 }}
              viewport={{ once: true }}
            >
              • {capability}
            </motion.li>
          ))}
        </ul>
      </div>
      
      <motion.button 
        onClick={() => onActivate(agent)}
        className={`w-full ${agent.bgColor} hover:opacity-80 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 hover:animate-glow`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ACTIVATE {agent.name.toUpperCase()} {agent.title}
      </motion.button>
    </motion.div>
  );
}
