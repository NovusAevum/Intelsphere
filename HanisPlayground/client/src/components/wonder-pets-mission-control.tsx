import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Brain, TrendingUp, Zap, Activity, Target, 
  Play, Pause, RotateCcw, Settings, Monitor, Wifi,
  CheckCircle, AlertCircle, Clock, Eye, Network, Database
} from 'lucide-react';

interface AgentState {
  active: boolean;
  missionStatus: 'standby' | 'deployed' | 'returning' | 'mission-complete';
  currentTask: string;
  location: string;
  batteryLevel: number;
  signalStrength: number;
}

interface MissionObjective {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedAgent: string;
  progress: number;
}

export default function WonderPetsMissionControl() {
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({
    linny: {
      active: false,
      missionStatus: 'standby',
      currentTask: 'OSINT Reconnaissance',
      location: 'Command Center',
      batteryLevel: 98,
      signalStrength: 100
    },
    tuck: {
      active: false,
      missionStatus: 'standby',
      currentTask: 'Neural Network Analysis',
      location: 'Command Center',
      batteryLevel: 95,
      signalStrength: 100
    },
    mingming: {
      active: false,
      missionStatus: 'standby',
      currentTask: 'Performance Marketing',
      location: 'Command Center',
      batteryLevel: 97,
      signalStrength: 100
    }
  });

  const [missions, setMissions] = useState<MissionObjective[]>([
    {
      id: 'mission-001',
      title: 'Advanced Threat Intelligence Gathering',
      status: 'pending',
      priority: 'high',
      assignedAgent: 'linny',
      progress: 0
    },
    {
      id: 'mission-002',
      title: 'Deep Learning Model Optimization',
      status: 'pending',
      priority: 'medium',
      assignedAgent: 'tuck',
      progress: 0
    },
    {
      id: 'mission-003',
      title: 'Marketing Campaign Analysis',
      status: 'pending',
      priority: 'medium',
      assignedAgent: 'mingming',
      progress: 0
    }
  ]);

  const [systemStatus, setSystemStatus] = useState({
    overall: 'OPERATIONAL',
    networkStatus: 'SECURE',
    securityLevel: 'MAXIMUM',
    activeConnections: 847,
    threatLevel: 'LOW'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStates(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(agentId => {
          if (updated[agentId].active) {
            // Simulate mission progress
            updated[agentId].batteryLevel = Math.max(85, updated[agentId].batteryLevel - Math.random() * 0.5);
            updated[agentId].signalStrength = 95 + Math.random() * 5;
            
            // Update mission progress
            setMissions(prevMissions => 
              prevMissions.map(mission => 
                mission.assignedAgent === agentId && mission.status === 'active'
                  ? { ...mission, progress: Math.min(100, mission.progress + Math.random() * 2) }
                  : mission
              )
            );
          }
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activateAgent = (agentId: string) => {
    setAgentStates(prev => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        active: !prev[agentId].active,
        missionStatus: !prev[agentId].active ? 'deployed' : 'standby',
        location: !prev[agentId].active ? 'Field Operations' : 'Command Center'
      }
    }));

    // Update mission status
    setMissions(prev => 
      prev.map(mission => 
        mission.assignedAgent === agentId
          ? { ...mission, status: !agentStates[agentId].active ? 'active' : 'pending', progress: 0 }
          : mission
      )
    );

    // Navigate to agent's specialized page
    setTimeout(() => {
      if (!agentStates[agentId].active) {
        if (agentId === 'linny') {
          window.location.href = '/advanced-osint';
        } else if (agentId === 'tuck') {
          window.location.href = '/evolving-ai-research';
        } else if (agentId === 'mingming') {
          window.location.href = '/advanced-performance-marketing';
        }
      }
    }, 500);
  };

  const deployAllAgents = () => {
    const newStates = { ...agentStates };
    Object.keys(newStates).forEach(agentId => {
      newStates[agentId] = {
        ...newStates[agentId],
        active: true,
        missionStatus: 'deployed',
        location: 'Field Operations'
      };
    });
    setAgentStates(newStates);

    setMissions(prev => 
      prev.map(mission => ({ ...mission, status: 'active' as const, progress: 0 }))
    );

    setTimeout(() => {
      window.location.href = '/reconnaissance-dashboard';
    }, 1000);
  };

  const recallAllAgents = () => {
    const newStates = { ...agentStates };
    Object.keys(newStates).forEach(agentId => {
      newStates[agentId] = {
        ...newStates[agentId],
        active: false,
        missionStatus: 'standby',
        location: 'Command Center'
      };
    });
    setAgentStates(newStates);

    setMissions(prev => 
      prev.map(mission => ({ ...mission, status: 'pending' as const, progress: 0 }))
    );
  };

  const agents = [
    {
      id: 'linny',
      name: 'LINNY',
      subtitle: 'Strategic Intelligence & OSINT Expert',
      avatar: '/attached_assets/linny.jpg',
      color: 'from-blue-500 to-cyan-500',
      icon: Shield,
      specialization: 'Advanced Reconnaissance & Threat Analysis'
    },
    {
      id: 'tuck',
      name: 'TUCK',
      subtitle: 'Neural Network Specialist',
      avatar: '/attached_assets/tuck.jpeg',
      color: 'from-purple-500 to-pink-500',
      icon: Brain,
      specialization: 'Machine Learning & AI Development'
    },
    {
      id: 'mingming',
      name: 'MING-MING',
      subtitle: 'Performance Marketing Expert',
      avatar: '/attached_assets/mingming.jpeg',
      color: 'from-green-500 to-emerald-500',
      icon: TrendingUp,
      specialization: 'Digital Marketing & Analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Mission Control Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-8"
      >
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          WONDER PETS MISSION CONTROL
        </h1>
        <p className="text-xl text-center text-gray-300 mb-8">
          Advanced Intelligence Command Center - Elite Operations Division
        </p>
      </motion.div>

      {/* Agent Status Cards */}
      <div className="relative z-10 px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const state = agentStates[agent.id];
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-6 border-2 transition-all duration-500 ${
                  state.active 
                    ? 'border-red-500 shadow-red-500/50 shadow-2xl' 
                    : 'border-cyan-500/30 hover:border-cyan-400'
                }`}
              >
                {/* Agent Avatar */}
                <div className="text-center mb-6">
                  <div className={`relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 ${
                    state.active ? 'border-red-400' : 'border-cyan-400'
                  } mb-4`}>
                    <img 
                      src={agent.avatar} 
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                    <AnimatePresence>
                      {state.active && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
                        >
                          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{agent.subtitle}</p>
                  <p className="text-xs text-cyan-400">{agent.specialization}</p>
                </div>

                {/* Mission Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className={`text-sm font-bold ${
                      state.active ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {state.missionStatus.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Location:</span>
                    <span className="text-sm text-cyan-400">{state.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Task:</span>
                    <span className="text-sm text-white">{state.currentTask}</span>
                  </div>
                </div>

                {/* Agent Metrics */}
                <div className="mb-6 space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Battery</span>
                      <span className="text-green-400">{state.batteryLevel.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${state.batteryLevel}%` }}
                        className="bg-green-400 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Signal</span>
                      <span className="text-blue-400">{state.signalStrength.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${state.signalStrength}%` }}
                        className="bg-blue-400 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Activation Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => activateAgent(agent.id)}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                    state.active
                      ? 'bg-red-500 hover:bg-red-400'
                      : `bg-gradient-to-r ${agent.color} hover:shadow-lg`
                  }`}
                >
                  {state.active ? `DEACTIVATE ${agent.name}` : `ACTIVATE ${agent.name}`}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mission Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 px-8 mb-12"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30">
          <h2 className="text-3xl font-bold text-center mb-8">MISSION CONTROL CENTER</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={deployAllAgents}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2"
            >
              <Play size={24} />
              <span>DEPLOY ALL AGENTS</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={recallAllAgents}
              className="border-2 border-gray-400 text-gray-400 px-6 py-4 rounded-lg font-bold text-lg hover:bg-gray-400 hover:text-black transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw size={24} />
              <span>RECALL ALL AGENTS</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/digital-fortress'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2"
            >
              <Shield size={24} />
              <span>EMERGENCY PROTOCOL</span>
            </motion.button>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-black/50 rounded-lg p-4 text-center">
              <Activity className="text-green-400 mx-auto mb-2" size={20} />
              <div className="text-green-400 text-xs font-bold">SYSTEM</div>
              <div className="text-gray-300 text-xs">{systemStatus.overall}</div>
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 text-center">
              <Wifi className="text-blue-400 mx-auto mb-2" size={20} />
              <div className="text-blue-400 text-xs font-bold">NETWORK</div>
              <div className="text-gray-300 text-xs">{systemStatus.networkStatus}</div>
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 text-center">
              <Shield className="text-purple-400 mx-auto mb-2" size={20} />
              <div className="text-purple-400 text-xs font-bold">SECURITY</div>
              <div className="text-gray-300 text-xs">{systemStatus.securityLevel}</div>
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 text-center">
              <Network className="text-cyan-400 mx-auto mb-2" size={20} />
              <div className="text-cyan-400 text-xs font-bold">CONNECTIONS</div>
              <div className="text-gray-300 text-xs">{systemStatus.activeConnections}</div>
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 text-center">
              <AlertCircle className="text-green-400 mx-auto mb-2" size={20} />
              <div className="text-green-400 text-xs font-bold">THREAT LEVEL</div>
              <div className="text-gray-300 text-xs">{systemStatus.threatLevel}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Missions */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-8 pb-12"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
          <h2 className="text-3xl font-bold text-center mb-8">ACTIVE MISSIONS</h2>
          
          <div className="space-y-4">
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-black/50 rounded-lg p-6 border-l-4 ${
                  mission.priority === 'critical' ? 'border-red-500' :
                  mission.priority === 'high' ? 'border-orange-500' :
                  mission.priority === 'medium' ? 'border-yellow-500' :
                  'border-green-500'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{mission.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      mission.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      mission.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {mission.status.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      mission.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                      mission.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      mission.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {mission.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Assigned Agent:</span>
                  <span className="text-sm text-cyan-400 font-bold">
                    {agents.find(a => a.id === mission.assignedAgent)?.name}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{mission.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mission.progress}%` }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}