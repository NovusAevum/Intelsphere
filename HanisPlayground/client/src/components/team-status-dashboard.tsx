import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Brain, TrendingUp, Shield, Zap, Target, 
  Activity, Wifi, CheckCircle, AlertCircle, Clock,
  Eye, Network, Database, Cpu
} from 'lucide-react';

export default function TeamStatusDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAgent, setActiveAgent] = useState(0);
  const [agentStates, setAgentStates] = useState({
    linny: { active: false, missionStatus: 'standby' },
    tuck: { active: false, missionStatus: 'standby' },
    mingming: { active: false, missionStatus: 'standby' }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const agentInterval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(agentInterval);
  }, []);

  const agents = [
    {
      id: 'linny',
      name: 'LINNY OSINT COMMAND',
      subtitle: 'Strategic Intelligence & OSINT Expert',
      status: 'ONLINE - OSINT Ready',
      icon: Search,
      avatar: '/attached_assets/linny.jpg',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'RECONNAISSANCE', level: 'Advanced Level' },
        { name: 'THREAT INTEL', level: 'Expert Level' },
        { name: 'SOCIAL ENGINEERING', level: 'Master Level' },
        { name: 'STRATEGIC ANALYSIS', level: 'Executive Level' }
      ],
      capabilities: [
        'Advanced digital footprinting',
        'Social media intelligence',
        'Corporate intelligence gathering',
        'Threat landscape analysis',
        'Executive briefing reports'
      ],
      systemMetrics: {
        uptime: '99.97%',
        tasksCompleted: 1247,
        accuracy: '97.3%',
        responseTime: '0.3s'
      }
    },
    {
      id: 'tuck',
      name: 'TUCK AI SPECIALIST',
      subtitle: 'AI Engineering & Machine Learning',
      status: 'ONLINE - AI Systems Active',
      icon: Brain,
      avatar: '/attached_assets/tuck.jpeg',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'NEURAL NETWORKS', level: 'Expert Level' },
        { name: 'ML MODELS', level: 'Advanced Level' },
        { name: 'AUTOMATION', level: 'Master Level' },
        { name: 'AI INTEGRATION', level: 'Executive Level' }
      ],
      capabilities: [
        'Custom AI model development',
        'Neural network optimization',
        'Intelligent automation systems',
        'Real-time data processing',
        'AI system architecture'
      ],
      systemMetrics: {
        uptime: '99.94%',
        tasksCompleted: 892,
        accuracy: '98.7%',
        responseTime: '0.1s'
      }
    },
    {
      id: 'mingming',
      name: 'MING-MING MARKETING',
      subtitle: 'Digital Marketing & Innovation Strategy',
      status: 'ONLINE - Marketing Engine Ready',
      icon: TrendingUp,
      avatar: '/attached_assets/mingming.jpeg',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'GOOGLE ADS', level: 'Expert Level' },
        { name: 'PERFORMANCE', level: 'Master Level' },
        { name: 'GROWTH HACKING', level: 'Advanced Level' },
        { name: 'INNOVATION', level: 'Executive Level' }
      ],
      capabilities: [
        'Google Ads optimization',
        'Social media strategy',
        'Conversion rate optimization',
        'Creative campaign development',
        'Growth strategy planning'
      ],
      systemMetrics: {
        uptime: '99.99%',
        tasksCompleted: 2156,
        accuracy: '96.8%',
        responseTime: '0.2s'
      }
    }
  ];

  const systemStatus = {
    overall: 'OPERATIONAL',
    securityLevel: 'MAXIMUM',
    networkStatus: 'SECURE',
    dataProcessing: 'ACTIVE'
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h3 className="text-4xl font-bold text-white mb-4">
          WONDER PETS INTELLIGENCE TEAM
        </h3>
        <div className="flex items-center justify-center space-x-6 text-lg">
          <div className="flex items-center space-x-2">
            <Activity className="text-green-400" size={20} />
            <span className="text-green-400 font-bold">ALL SYSTEMS {systemStatus.overall}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="text-cyan-400" size={20} />
            <span className="text-cyan-400 font-mono font-bold">{formatTime(currentTime)}</span>
          </div>
        </div>
      </motion.div>

      {/* Team Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.8 }}
            className={`
              bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border 
              ${activeAgent === index ? 'border-cyan-400 shadow-cyan-400/50 shadow-2xl' : 'border-gray-600/50'}
              hover:border-cyan-400 transition-all duration-500 cursor-pointer
            `}
            onClick={() => setActiveAgent(index)}
          >
            {/* Agent Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-lg">{agent.name}</div>
                <div className="text-gray-300 text-sm">{agent.subtitle}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <CheckCircle className="text-green-400" size={14} />
                  <span className="text-green-400 text-xs font-medium">{agent.status}</span>
                </div>
              </div>
              <agent.icon className="text-cyan-400" size={32} />
            </div>

            {/* Skills Grid */}
            <div className="mb-6">
              <h5 className="text-cyan-400 font-semibold mb-3 text-sm">SKILL LEVELS</h5>
              <div className="grid grid-cols-2 gap-3">
                {agent.skills.map((skill, i) => (
                  <div key={i} className="bg-black/50 rounded-lg p-3">
                    <div className="text-white text-xs font-bold">{skill.name}</div>
                    <div className="text-cyan-400 text-xs">{skill.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-6">
              <h5 className="text-cyan-400 font-semibold mb-3 text-sm">CAPABILITIES</h5>
              <div className="space-y-2">
                {agent.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-xs">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Metrics */}
            <div className="border-t border-gray-700 pt-4">
              <h5 className="text-cyan-400 font-semibold mb-3 text-sm">SYSTEM METRICS</h5>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-green-400 font-bold ml-2">{agent.systemMetrics.uptime}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tasks:</span>
                  <span className="text-blue-400 font-bold ml-2">{agent.systemMetrics.tasksCompleted}</span>
                </div>
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-purple-400 font-bold ml-2">{agent.systemMetrics.accuracy}</span>
                </div>
                <div>
                  <span className="text-gray-400">Response:</span>
                  <span className="text-yellow-400 font-bold ml-2">{agent.systemMetrics.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Activate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const agentId = agent.id as keyof typeof agentStates;
                setAgentStates(prev => ({
                  ...prev,
                  [agentId]: {
                    active: !prev[agentId].active,
                    missionStatus: !prev[agentId].active ? 'deployed' : 'standby'
                  }
                }));
                
                // Navigate to agent's specialized page
                if (agent.id === 'linny') {
                  window.location.href = '/osint-analysis';
                } else if (agent.id === 'tuck') {
                  window.location.href = '/neural-net';
                } else if (agent.id === 'mingming') {
                  window.location.href = '/performance-marketing';
                }
              }}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition-all ${
                agentStates[agent.id as keyof typeof agentStates]?.active
                  ? 'bg-red-500 hover:bg-red-400'
                  : `bg-gradient-to-r ${agent.color} hover:shadow-lg`
              }`}
            >
              {agentStates[agent.id as keyof typeof agentStates]?.active 
                ? `DEACTIVATE ${agent.name.split(' ')[0]}`
                : `ACTIVATE ${agent.name.split(' ')[0]}`
              }
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* System Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30"
      >
        <h4 className="text-2xl font-bold text-white mb-6 text-center">TEAM STATUS DASHBOARD</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <Shield className={`mx-auto mb-2 ${agentStates.linny.active ? 'text-red-400' : 'text-blue-400'}`} size={32} />
            <div className="text-blue-400 font-bold text-sm">LINNY STATUS</div>
            <div className={`text-xs ${agentStates.linny.active ? 'text-red-400' : 'text-green-400'}`}>
              {agentStates.linny.active ? 'MISSION ACTIVE' : agents[0].status}
            </div>
          </div>
          
          <div className="text-center">
            <Brain className={`mx-auto mb-2 ${agentStates.tuck.active ? 'text-red-400' : 'text-purple-400'}`} size={32} />
            <div className="text-purple-400 font-bold text-sm">TUCK STATUS</div>
            <div className={`text-xs ${agentStates.tuck.active ? 'text-red-400' : 'text-green-400'}`}>
              {agentStates.tuck.active ? 'MISSION ACTIVE' : agents[1].status}
            </div>
          </div>
          
          <div className="text-center">
            <TrendingUp className={`mx-auto mb-2 ${agentStates.mingming.active ? 'text-red-400' : 'text-green-400'}`} size={32} />
            <div className="text-green-400 font-bold text-sm">MING-MING STATUS</div>
            <div className={`text-xs ${agentStates.mingming.active ? 'text-red-400' : 'text-green-400'}`}>
              {agentStates.mingming.active ? 'MISSION ACTIVE' : agents[2].status}
            </div>
          </div>
          
          <div className="text-center">
            <Activity className="text-cyan-400 mx-auto mb-2" size={32} />
            <div className="text-cyan-400 font-bold text-sm">SYSTEM STATUS</div>
            <div className="text-green-400 text-xs">ALL SYSTEMS {systemStatus.overall}</div>
          </div>
        </div>

        {/* Mission Control Panel */}
        <div className="mt-8 bg-black/60 rounded-xl p-6 border border-red-500/30">
          <h5 className="text-red-400 font-bold text-center mb-4">MISSION CONTROL CENTER</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setAgentStates(prev => ({
                  linny: { active: true, missionStatus: 'deployed' },
                  tuck: { active: true, missionStatus: 'deployed' },
                  mingming: { active: true, missionStatus: 'deployed' }
                }));
                window.location.href = '/reconnaissance-dashboard';
              }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-lg font-bold text-sm"
            >
              DEPLOY ALL AGENTS
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setAgentStates(prev => ({
                  linny: { active: false, missionStatus: 'standby' },
                  tuck: { active: false, missionStatus: 'standby' },
                  mingming: { active: false, missionStatus: 'standby' }
                }));
              }}
              className="border-2 border-gray-400 text-gray-400 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-400 hover:text-black transition-all"
            >
              RECALL ALL AGENTS
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/digital-fortress'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-bold text-sm"
            >
              EMERGENCY PROTOCOL
            </motion.button>
          </div>
        </div>

        {/* Real-time System Indicators */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/50 rounded-lg p-4 text-center">
            <Wifi className="text-green-400 mx-auto mb-2" size={20} />
            <div className="text-green-400 text-xs font-bold">NETWORK</div>
            <div className="text-gray-300 text-xs">{systemStatus.networkStatus}</div>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4 text-center">
            <Eye className="text-blue-400 mx-auto mb-2" size={20} />
            <div className="text-blue-400 text-xs font-bold">SECURITY</div>
            <div className="text-gray-300 text-xs">{systemStatus.securityLevel}</div>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4 text-center">
            <Database className="text-purple-400 mx-auto mb-2" size={20} />
            <div className="text-purple-400 text-xs font-bold">DATA</div>
            <div className="text-gray-300 text-xs">{systemStatus.dataProcessing}</div>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4 text-center">
            <Cpu className="text-yellow-400 mx-auto mb-2" size={20} />
            <div className="text-yellow-400 text-xs font-bold">CPU</div>
            <div className="text-gray-300 text-xs">OPTIMAL</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}