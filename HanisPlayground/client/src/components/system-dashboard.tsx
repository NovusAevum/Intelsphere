import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import hanisImage from "@assets/hanis-profile.jpeg";

interface SystemStats {
  totalAgents: number;
  activeAgents: number;
  totalSessions: number;
  activeSessions: number;
  totalMessages: number;
  systemUptime: string;
}

interface SystemLog {
  id: number;
  logLevel: string;
  source: string;
  message: string;
  timestamp: string;
}

export default function SystemDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalAgents: 3,
    activeAgents: 3,
    totalSessions: 0,
    activeSessions: 0,
    totalMessages: 0,
    systemUptime: "Online"
  });

  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ['/api/agents'],
    queryFn: async () => {
      const response = await apiRequest('/api/agents');
      return response;
    }
  });

  const { data: systemLogs, isLoading: logsLoading } = useQuery({
    queryKey: ['/api/system-logs'],
    queryFn: async () => {
      const response = await apiRequest('/api/system-logs?limit=10');
      return response;
    },
    refetchInterval: 5000
  });

  useEffect(() => {
    if (agents && Array.isArray(agents)) {
      setStats(prev => ({
        ...prev,
        totalAgents: agents.length,
        activeAgents: agents.filter((agent: any) => agent.isActive === "true").length
      }));
    }
  }, [agents]);

  const statusIndicators = [
    {
      label: "Command Center",
      status: "OPERATIONAL",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      icon: "🚀"
    },
    {
      label: "Database",
      status: "CONNECTED",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      icon: "🗄️"
    },
    {
      label: "AI Agents",
      status: `${stats.activeAgents}/${stats.totalAgents} ACTIVE`,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      icon: "🤖"
    },
    {
      label: "Security",
      status: "SECURE",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">COMMAND CENTER</span> STATUS
          </h2>
          <p className="text-xl text-gray-300">
            Real-time system monitoring and agent status
          </p>
        </motion.div>

        {/* Hanis Profile Section */}
        <motion.div 
          className="glass rounded-2xl p-8 mb-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative">
              <img 
                src={hanisImage}
                alt="Hanis - Wonder Pets Command Center Director"
                className="w-32 h-32 rounded-full object-cover border-4 border-[hsl(var(--cyber))]"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[hsl(var(--command))] animate-pulse"></div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-[hsl(var(--cyber))] mb-2">
                HANIS - COMMAND CENTER DIRECTOR
              </h3>
              <p className="text-gray-300 mb-4">
                Overseeing Wonder Pets AI operations and strategic intelligence
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-[hsl(var(--cyber))]/20 text-[hsl(var(--cyber))] px-3 py-1 rounded-full text-sm">
                  OSINT Expert
                </span>
                <span className="bg-[hsl(var(--tuck))]/20 text-[hsl(var(--tuck))] px-3 py-1 rounded-full text-sm">
                  AI Strategist
                </span>
                <span className="bg-[hsl(var(--ming))]/20 text-[hsl(var(--ming))] px-3 py-1 rounded-full text-sm">
                  Digital Marketing
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statusIndicators.map((indicator, index) => (
            <motion.div 
              key={indicator.label}
              className="glass rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 ${indicator.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{indicator.icon}</span>
              </div>
              <h4 className="font-bold mb-2">{indicator.label}</h4>
              <p className={`${indicator.color} font-semibold`}>{indicator.status}</p>
            </motion.div>
          ))}
        </div>

        {/* System Logs */}
        <motion.div 
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 text-[hsl(var(--cyber))]">
            SYSTEM ACTIVITY LOG
          </h3>
          <div className="bg-[hsl(var(--panel))] rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logsLoading ? (
              <div className="text-gray-400">Loading system logs...</div>
            ) : systemLogs && systemLogs.length > 0 ? (
              systemLogs.map((log: SystemLog, index: number) => (
                <motion.div 
                  key={log.id}
                  className="mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="text-gray-500">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className={`ml-2 ${
                    log.logLevel === 'error' ? 'text-red-400' :
                    log.logLevel === 'warning' ? 'text-yellow-400' :
                    log.logLevel === 'info' ? 'text-green-400' :
                    'text-blue-400'
                  }`}>
                    [{log.logLevel.toUpperCase()}]
                  </span>
                  <span className="text-white ml-2">{log.message}</span>
                </motion.div>
              ))
            ) : (
              <div className="text-gray-400">
                [SYSTEM] Wonder Pets Command Center initialized successfully
                <br />
                [INFO] All agents operational and ready for deployment
                <br />
                [STATUS] Database connection established
                <br />
                [READY] System monitoring active
              </div>
            )}
          </div>
        </motion.div>

        {/* Agent Status Overview */}
        {agents && (
          <motion.div 
            className="mt-12 glass rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-[hsl(var(--cyber))]">
              AGENT STATUS OVERVIEW
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((agent: any, index: number) => (
                <motion.div 
                  key={agent.agentId}
                  className="bg-[hsl(var(--panel))] rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <h4 className="font-bold">{agent.name}</h4>
                      <p className="text-sm text-gray-400">{agent.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">{agent.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}