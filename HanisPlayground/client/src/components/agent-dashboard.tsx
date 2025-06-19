import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AgentCard from "./agent-card";
import ChatInterface from "./chat-interface";

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

const agents: Agent[] = [
  {
    id: "linny",
    name: "Linny",
    title: "OSINT COMMAND",
    description: "Strategic Intelligence & OSINT Expert",
    icon: "🔍",
    color: "text-[hsl(var(--linny))]",
    bgColor: "bg-[hsl(var(--linny))]",
    status: "ONLINE - OSINT Ready",
    skills: [
      { name: "RECONNAISSANCE", level: "Advanced Level" },
      { name: "THREAT INTEL", level: "Expert Level" },
      { name: "SOCIAL ENGINEERING", level: "Master Level" },
    ],
    capabilities: [
      "Advanced digital footprinting",
      "Social media intelligence",
      "Corporate intelligence gathering",
      "Threat landscape analysis",
      "Executive briefing reports"
    ]
  },
  {
    id: "tuck",
    name: "Tuck",
    title: "AI SPECIALIST",
    description: "AI Engineering & Machine Learning",
    icon: "🤖",
    color: "text-[hsl(var(--tuck))]",
    bgColor: "bg-[hsl(var(--tuck))]",
    status: "ONLINE - AI Systems Active",
    skills: [
      { name: "NEURAL NETWORKS", level: "Expert Level" },
      { name: "ML MODELS", level: "Advanced Level" },
      { name: "AUTOMATION", level: "Master Level" },
    ],
    capabilities: [
      "Custom AI model development",
      "Neural network optimization",
      "Intelligent automation systems",
      "Real-time data processing",
      "AI system architecture"
    ]
  },
  {
    id: "mingming",
    name: "Ming-Ming",
    title: "MARKETING",
    description: "Digital Marketing & Innovation Strategy",
    icon: "📈",
    color: "text-[hsl(var(--ming))]",
    bgColor: "bg-[hsl(var(--ming))]",
    status: "ONLINE - Marketing Engine Ready",
    skills: [
      { name: "GOOGLE ADS", level: "Expert Level" },
      { name: "PERFORMANCE", level: "Master Level" },
      { name: "GROWTH HACKING", level: "Advanced Level" },
    ],
    capabilities: [
      "Google Ads optimization",
      "Social media strategy",
      "Conversion rate optimization",
      "Creative campaign development",
      "Growth strategy planning"
    ]
  }
];

export default function AgentDashboard() {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  const { data: dbAgents, isLoading, error } = useQuery({
    queryKey: ['/api/agents'],
    queryFn: async () => {
      const response = await apiRequest('/api/agents');
      return response;
    }
  });

  const activateAgent = (agent: Agent) => {
    setActiveAgent(agent);
  };

  const closeChatInterface = () => {
    setActiveAgent(null);
  };

  // Use database agents if available, fallback to static data for display
  const agentsToDisplay = dbAgents && Array.isArray(dbAgents) && dbAgents.length > 0 ? 
    dbAgents.map((dbAgent: any) => ({
      id: dbAgent.agentId,
      name: dbAgent.name,
      title: dbAgent.title,
      description: dbAgent.description,
      icon: dbAgent.icon,
      color: dbAgent.color,
      bgColor: dbAgent.bgColor,
      status: dbAgent.status,
      skills: dbAgent.skills,
      capabilities: dbAgent.capabilities
    })) : agents;

  return (
    <section id="agents" className="py-20 relative">
      {/* Neural network visualization background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
          alt="Neural network visualization with interconnected nodes" 
          className="w-full h-full object-cover opacity-10" 
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">WONDER PETS</span> AI COMMAND CENTER
          </h2>
          <p className="text-xl text-gray-300">
            Three specialized autonomous agents ready for deployment
          </p>
        </motion.div>

        {/* Team Status Dashboard */}
        <motion.div 
          className="glass rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-6 text-center text-[hsl(var(--cyber))]">
            TEAM STATUS DASHBOARD
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div 
                key={agent.id}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 ${agent.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse`}>
                  <span className="text-2xl">{agent.icon}</span>
                </div>
                <h4 className={`font-bold ${agent.color}`}>{agent.name.toUpperCase()} STATUS</h4>
                <p className="text-sm text-gray-400">{agent.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {agentsToDisplay.map((agent, index) => (
            <AgentCard 
              key={agent.id}
              agent={agent}
              onActivate={activateAgent}
              index={index}
            />
          ))}
        </div>

        {/* Chat Interface */}
        {activeAgent && (
          <ChatInterface 
            agent={activeAgent}
            onClose={closeChatInterface}
          />
        )}
      </div>
    </section>
  );
}
