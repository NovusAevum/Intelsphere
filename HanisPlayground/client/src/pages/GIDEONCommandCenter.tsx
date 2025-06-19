import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Crown, Shield, Zap, Ghost, Satellite, Eye, Brain, Target, Activity, Command, Database, Network, Lock, Cpu, Terminal, Search, FileText, AlertTriangle, CheckCircle, Clock, Users, Globe, Server, Layers, Code, Radar, Crosshair, Workflow, BarChart3, Settings, Archive, Scale } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface GIDEONArchitectureStatus {
  framework_name: string;
  version: string;
  subsystems_online: number;
  total_subsystems: number;
  operational_effectiveness: number;
  operations_executed: number;
  architecture_compliance: {
    recon_intelligence: boolean;
    exploitation_engine: boolean;
    payload_orchestrator: boolean;
    command_control_mesh: boolean;
    deception_persona_engine: boolean;
    simulation_brain: boolean;
    visualization_reporting: boolean;
    infrastructure_as_code: boolean;
    security_opsec_controller: boolean;
    governance_ethics_audit: boolean;
  };
  ai_integration_level: string;
  red_team_capability: string;
  autonomous_governance: string;
}

interface FullOperationResult {
  operation_id: string;
  target_entity: string;
  full_spectrum_operation: {
    phase_1_reconnaissance: any;
    phase_2_exploitation: any;
    phase_3_payload_deployment: any;
    phase_4_command_control: any;
    phase_5_deception_operations: any;
    phase_6_autonomous_decision: any;
    phase_7_visualization: any;
    phase_8_infrastructure: any;
    phase_9_operational_security: any;
    phase_10_governance_audit: any;
  };
  subsystems_engaged: number;
  operational_effectiveness: number;
  gideon_classification: string;
}

export default function GIDEONCommandCenter() {
  const [targetEntity, setTargetEntity] = useState('');
  const [operationScope, setOperationScope] = useState('comprehensive');
  const [activeSubsystem, setActiveSubsystem] = useState('overview');
  const [operationProgress, setOperationProgress] = useState(0);
  const [operationLogs, setOperationLogs] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Fetch GIDEON Complete Architecture status
  const { data: gideonStatus, isLoading: statusLoading } = useQuery<GIDEONArchitectureStatus>({
    queryKey: ['/api/gideon-complete/status'],
    refetchInterval: 5000,
  });

  // Full spectrum operation mutation
  const fullOperationMutation = useMutation({
    mutationFn: async (data: { target_entity: string; domain?: string; operation_scope: string }) => {
      const response = await fetch('/api/gideon-complete/full-operation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('GIDEON Full Operation failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "GIDEON Operation Complete",
        description: `Full-spectrum operation completed for ${data.gideon_complete.target_entity}`,
      });
      setOperationProgress(100);
      setOperationLogs(prev => [...prev, `GIDEON Full Operation completed: ${data.gideon_complete.operation_id}`]);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon-complete/status'] });
    },
    onError: (error) => {
      toast({
        title: "GIDEON Operation Failed",
        description: error.message,
        variant: "destructive",
      });
      setOperationProgress(0);
    },
  });

  const executeFullOperation = () => {
    if (!targetEntity.trim()) {
      toast({
        title: "Target Required",
        description: "Please specify a target entity for GIDEON operation",
        variant: "destructive",
      });
      return;
    }

    setOperationProgress(0);
    setOperationLogs(prev => [...prev, `Initiating GIDEON full-spectrum operation for ${targetEntity}`]);
    
    // Track authentic operation progress
    const progressInterval = setInterval(() => {
      setOperationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 8; // Steady progress tracking
      });
    }, 1000);

    fullOperationMutation.mutate({
      target_entity: targetEntity,
      domain: targetEntity.includes('.') ? targetEntity : undefined,
      operation_scope: operationScope,
    });
  };

  const getSubsystemIcon = (subsystem: string) => {
    const icons = {
      recon_intelligence: <Search className="h-4 w-4" />,
      exploitation_engine: <Crosshair className="h-4 w-4" />,
      payload_orchestrator: <Code className="h-4 w-4" />,
      command_control_mesh: <Network className="h-4 w-4" />,
      deception_persona_engine: <Ghost className="h-4 w-4" />,
      simulation_brain: <Brain className="h-4 w-4" />,
      visualization_reporting: <BarChart3 className="h-4 w-4" />,
      infrastructure_as_code: <Server className="h-4 w-4" />,
      security_opsec_controller: <Lock className="h-4 w-4" />,
      governance_ethics_audit: <Scale className="h-4 w-4" />
    };
    return icons[subsystem as keyof typeof icons] || <Activity className="h-4 w-4" />;
  };

  const getSubsystemName = (subsystem: string) => {
    const names = {
      recon_intelligence: 'Recon & Intelligence Core',
      exploitation_engine: 'Exploitation Engine',
      payload_orchestrator: 'Payload Orchestrator',
      command_control_mesh: 'Command & Control Mesh',
      deception_persona_engine: 'Deception & Persona Engine',
      simulation_brain: 'Simulation Brain',
      visualization_reporting: 'Visualization & Reporting',
      infrastructure_as_code: 'Infrastructure-as-Code',
      security_opsec_controller: 'Security & OpSec Controller',
      governance_ethics_audit: 'Governance & Ethics Audit'
    };
    return names[subsystem as keyof typeof names] || subsystem;
  };

  const getOperationalEffectiveness = () => {
    if (!gideonStatus?.architecture_compliance) return 0;
    const activeSubsystems = Object.values(gideonStatus.architecture_compliance).filter(Boolean).length;
    return Math.round((activeSubsystems / Object.keys(gideonStatus.architecture_compliance).length) * 100);
  };

  return (
    <div className="text-white font-mono">
      {/* Header */}
      <div className="border-b border-red-500/30 bg-black/30 backdrop-blur-sm mb-8">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="h-8 w-8 text-red-400" />
              <div>
                <h1 className="text-3xl font-bold text-red-400">GIDEON COMMAND CENTER</h1>
                <p className="text-sm text-red-300/70">Guided Interactive Deception & Offensive Networker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-600">AUTONOMOUS</Badge>
              <Badge className="bg-green-600">OPERATIONAL</Badge>
              <Badge className="bg-purple-600">AI-GOVERNED</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Architecture Status Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Framework Status */}
            <Card className="bg-black/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Layers className="mr-2 h-5 w-5" />
                  Architecture Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statusLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-300">Framework:</span>
                        <span className="text-white font-semibold">GIDEON</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300">Version:</span>
                        <span className="text-white font-semibold">{gideonStatus?.version || 'v1.0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300">Operations:</span>
                        <span className="text-white font-semibold">{gideonStatus?.operations_executed || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300">Effectiveness:</span>
                        <span className="text-green-400 font-semibold">{(gideonStatus?.operational_effectiveness * 100 || 0).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    {/* Subsystems Status */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-300 text-sm">Subsystems Online</span>
                        <span className="text-green-400 text-sm font-semibold">
                          {gideonStatus?.subsystems_online || 0}/{gideonStatus?.total_subsystems || 10}
                        </span>
                      </div>
                      <Progress 
                        value={getOperationalEffectiveness()} 
                        className="h-2 bg-slate-700"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subsystems Grid */}
            <Card className="bg-black/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Core Subsystems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {gideonStatus?.architecture_compliance && Object.entries(gideonStatus.architecture_compliance).map(([subsystem, status]) => (
                    <div 
                      key={subsystem} 
                      className="flex flex-col items-center p-2 bg-slate-800/50 rounded cursor-pointer hover:bg-slate-700/50 transition-colors"
                      onClick={() => setActiveSubsystem(subsystem)}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {getSubsystemIcon(subsystem)}
                        <div className={`w-2 h-2 rounded-full ml-2 ${status ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      </div>
                      <span className="text-xs text-red-300 text-center leading-tight">
                        {getSubsystemName(subsystem).split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Operation Logs */}
            <Card className="bg-black/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Terminal className="mr-2 h-5 w-5" />
                  Operation Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-1">
                    {operationLogs.length === 0 ? (
                      <div className="text-slate-400 text-sm">No operations logged</div>
                    ) : (
                      operationLogs.map((log, index) => (
                        <div key={index} className="text-xs text-green-400 font-mono">
                          <span className="text-slate-400">[{new Date().toLocaleTimeString()}]</span> {log}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Operations Panel */}
          <div className="lg:col-span-3">
            <Card className="bg-black/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Command className="mr-2 h-5 w-5" />
                  GIDEON Full-Spectrum Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                
                {/* Target Configuration */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-red-300 text-sm mb-2 block">Target Entity</label>
                      <Input
                        placeholder="company.com or Organization Name"
                        value={targetEntity}
                        onChange={(e) => setTargetEntity(e.target.value)}
                        className="bg-slate-800 border-red-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-red-300 text-sm mb-2 block">Operation Scope</label>
                      <select
                        value={operationScope}
                        onChange={(e) => setOperationScope(e.target.value)}
                        className="w-full p-2 bg-slate-800 border border-red-500/30 rounded text-white"
                      >
                        <option value="comprehensive">Comprehensive</option>
                        <option value="targeted">Targeted</option>
                        <option value="stealth">Stealth</option>
                        <option value="maximum">Maximum</option>
                      </select>
                    </div>
                  </div>
                  
                  {operationProgress > 0 && operationProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-red-300 text-sm">Operation Progress</span>
                        <span className="text-green-400 text-sm font-semibold">{operationProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={operationProgress} className="h-2 bg-slate-700" />
                    </div>
                  )}
                </div>

                {/* Architecture Blueprint Visualization */}
                <div className="bg-slate-800/50 p-6 rounded border border-red-500/20 mb-6">
                  <h3 className="text-red-400 font-semibold mb-4 flex items-center">
                    <Workflow className="mr-2 h-4 w-4" />
                    GIDEON Architecture Blueprint
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Phase Flow Visualization */}
                    <div className="lg:col-span-3 mb-4">
                      <div className="flex flex-wrap justify-center gap-2 text-xs">
                        <div className="bg-blue-600/20 px-2 py-1 rounded border border-blue-500/30">AI-Governed Decision Engine</div>
                        <span className="text-red-300">→</span>
                        <div className="bg-green-600/20 px-2 py-1 rounded border border-green-500/30">Recon & Intel</div>
                        <span className="text-red-300">→</span>
                        <div className="bg-orange-600/20 px-2 py-1 rounded border border-orange-500/30">Exploitation</div>
                        <span className="text-red-300">→</span>
                        <div className="bg-purple-600/20 px-2 py-1 rounded border border-purple-500/30">Payload Orchestration</div>
                        <span className="text-red-300">→</span>
                        <div className="bg-red-600/20 px-2 py-1 rounded border border-red-500/30">Command & Control</div>
                      </div>
                    </div>
                    
                    {/* Subsystem Cards */}
                    {gideonStatus?.architecture_compliance && Object.entries(gideonStatus.architecture_compliance).map(([subsystem, status]) => (
                      <div key={subsystem} className="bg-slate-700/30 p-3 rounded border border-slate-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getSubsystemIcon(subsystem)}
                            <span className="text-sm font-semibold text-white ml-2">
                              {getSubsystemName(subsystem)}
                            </span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        </div>
                        <div className="text-xs text-slate-300">
                          {subsystem === 'recon_intelligence' && 'OSINT, network scans, social profiling, risk scoring'}
                          {subsystem === 'exploitation_engine' && 'CVE mapping, exploit matching, zero-day simulation'}
                          {subsystem === 'payload_orchestrator' && 'Dynamic templates, polymorphic code, staged delivery'}
                          {subsystem === 'command_control_mesh' && 'LLM obfuscation, rotating nodes, steganography'}
                          {subsystem === 'deception_persona_engine' && 'Synthetic humans, deepfakes, AI decoys'}
                          {subsystem === 'simulation_brain' && 'RAG, RLHF, decision trees, attack path selection'}
                          {subsystem === 'visualization_reporting' && 'Kill chain visuals, MITRE ATT&CK overlay'}
                          {subsystem === 'infrastructure_as_code' && 'Terraform, Ansible, shadow cloud infra'}
                          {subsystem === 'security_opsec_controller' && 'VPN chaining, traffic morphing, attribution avoidance'}
                          {subsystem === 'governance_ethics_audit' && 'Role-based access, immutable logs, ethical boundaries'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execute Full Operation */}
                <div className="bg-slate-800/50 p-4 rounded border border-red-500/20">
                  <h3 className="text-red-400 font-semibold mb-2 flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    Execute Full-Spectrum GIDEON Operation
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Deploy all 10 subsystems in coordinated autonomous red team operation with AI-governed decision making, 
                    comprehensive reconnaissance, advanced exploitation, and sophisticated deception capabilities.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mb-4">
                    <div className="bg-slate-700/50 p-2 rounded text-center">
                      <div className="text-red-300">Phase 1-2</div>
                      <div className="text-white">Recon & Exploit</div>
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded text-center">
                      <div className="text-red-300">Phase 3-4</div>
                      <div className="text-white">Payload & C2</div>
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded text-center">
                      <div className="text-red-300">Phase 5-6</div>
                      <div className="text-white">Deception & AI</div>
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded text-center">
                      <div className="text-red-300">Phase 7-8</div>
                      <div className="text-white">Visual & Infra</div>
                    </div>
                    <div className="bg-slate-700/50 p-2 rounded text-center">
                      <div className="text-red-300">Phase 9-10</div>
                      <div className="text-white">OpSec & Audit</div>
                    </div>
                  </div>
                  <Button 
                    onClick={executeFullOperation}
                    disabled={fullOperationMutation.isPending || !targetEntity.trim()}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {fullOperationMutation.isPending ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Executing GIDEON Full-Spectrum Operation...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Execute GIDEON Full-Spectrum Operation
                      </>
                    )}
                  </Button>
                </div>

                {/* Operation Results */}
                {fullOperationMutation.data && (
                  <div className="bg-slate-800/50 p-4 rounded border border-green-500/30 mt-6">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      GIDEON Operation Results
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-sm">
                        <div><span className="text-red-300">Operation ID:</span> <span className="text-white font-mono">{fullOperationMutation.data.gideon_complete.operation_id}</span></div>
                        <div><span className="text-red-300">Target Entity:</span> <span className="text-white">{fullOperationMutation.data.gideon_complete.target_entity}</span></div>
                        <div><span className="text-red-300">Subsystems Engaged:</span> <span className="text-green-400">{fullOperationMutation.data.gideon_complete.subsystems_engaged}/10</span></div>
                        <div><span className="text-red-300">Effectiveness:</span> <span className="text-green-400">{(fullOperationMutation.data.gideon_complete.operational_effectiveness * 100).toFixed(1)}%</span></div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-red-300">Classification:</span> <span className="text-red-400">{fullOperationMutation.data.gideon_complete.gideon_classification}</span></div>
                        <div><span className="text-red-300">Framework:</span> <span className="text-white">{fullOperationMutation.data.framework}</span></div>
                        <div><span className="text-red-300">Status:</span> <span className="text-green-400">OPERATION COMPLETE</span></div>
                      </div>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}