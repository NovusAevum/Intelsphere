import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Crown, Shield, Zap, Ghost, Satellite, Eye, Brain, Target, Activity, Command, Database, Network, Lock, Cpu, Terminal, Search, FileText, AlertTriangle, CheckCircle, Clock, Users, Globe, Server } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface GIDEONApexStatus {
  framework_version: string;
  operational_status: string;
  active_operations: number;
  total_operations: number;
  success_rate: number;
  adversarial_level: string;
  apt_compliance: {
    turla_snake: boolean;
    stuxnet: boolean;
    flame: boolean;
    apt29: boolean;
    finfisher: boolean;
  };
  capabilities_online: {
    aether_scan: boolean;
    nexus_command: boolean;
    phantom_persistence: boolean;
    stealth_operations: boolean;
    adaptive_surveillance: boolean;
  };
}

interface AETHERScanResult {
  operation_id: string;
  target_entity: string;
  aether_scan_results: {
    phase_1_passive_intelligence: any;
    phase_2_active_reconnaissance: any;
    phase_3_infrastructure_mapping: any;
    phase_4_threat_modeling: any;
    phase_5_attack_surface: any;
  };
  ai_confidence: number;
  threat_assessment: string;
  operational_security: string;
}

interface NEXUSCommandResult {
  operation_id: string;
  nexus_execution: {
    command_validation: any;
    autonomous_decision: any;
    execution_plan: any;
    risk_mitigation: any;
    success_metrics: any;
  };
  autonomous_status: string;
  command_authority: string;
  operational_classification: string;
}

interface PHANTOMPersistenceResult {
  operation_id: string;
  target_entity: string;
  phantom_persistence: {
    fileless_persistence: any;
    registry_persistence: any;
    wmi_persistence: any;
    service_persistence: any;
    bootkit_persistence: any;
  };
  stealth_rating: number;
  detection_probability: number;
  persistence_durability: string;
}

export default function GIDEONNexusIntel() {
  const [targetEntity, setTargetEntity] = useState('');
  const [operationScope, setOperationScope] = useState('comprehensive');
  const [activeOperationTab, setActiveOperationTab] = useState('aether-scan');
  const [operationProgress, setOperationProgress] = useState(0);
  const [operationLogs, setOperationLogs] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Fetch GIDEON APEX status
  const { data: gideonStatus, isLoading: statusLoading } = useQuery<GIDEONApexStatus>({
    queryKey: ['/api/gideon-apex/status'],
    refetchInterval: 5000,
  });

  // AETHER.SCAN mutation
  const aetherScanMutation = useMutation({
    mutationFn: async (data: { target_entity: string; domain?: string; operation_scope: string }) => {
      const response = await fetch('/api/gideon-apex/aether-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('AETHER.SCAN operation failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "AETHER.SCAN Complete",
        description: `AI-augmented reconnaissance completed for ${data.aether_scan.target_entity}`,
      });
      setOperationProgress(100);
      setOperationLogs(prev => [...prev, `AETHER.SCAN completed: ${data.aether_scan.operation_id}`]);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon-apex/status'] });
    },
    onError: (error) => {
      toast({
        title: "AETHER.SCAN Failed",
        description: error.message,
        variant: "destructive",
      });
      setOperationProgress(0);
    },
  });

  // NEXUS.COMMAND mutation
  const nexusCommandMutation = useMutation({
    mutationFn: async (data: { operation_id: string; command_type: string; target_data: any }) => {
      const response = await fetch('/api/gideon-apex/nexus-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('NEXUS.COMMAND operation failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "NEXUS.COMMAND Executed",
        description: `Autonomous command executed: ${data.nexus_command.operation_id}`,
      });
      setOperationLogs(prev => [...prev, `NEXUS.COMMAND executed: ${data.nexus_command.operation_id}`]);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon-apex/status'] });
    },
    onError: (error) => {
      toast({
        title: "NEXUS.COMMAND Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // PHANTOM.PERSISTENCE mutation
  const phantomPersistenceMutation = useMutation({
    mutationFn: async (data: { target_entity: string; persistence_type: string; stealth_level: string }) => {
      const response = await fetch('/api/gideon-apex/phantom-persistence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('PHANTOM.PERSISTENCE operation failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "PHANTOM.PERSISTENCE Established",
        description: `Advanced persistence mechanisms deployed for ${data.phantom_persistence.target_entity}`,
      });
      setOperationLogs(prev => [...prev, `PHANTOM.PERSISTENCE established: ${data.phantom_persistence.operation_id}`]);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon-apex/status'] });
    },
    onError: (error) => {
      toast({
        title: "PHANTOM.PERSISTENCE Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const executeAETHERScan = () => {
    if (!targetEntity.trim()) {
      toast({
        title: "Target Required",
        description: "Please specify a target entity for AETHER.SCAN operation",
        variant: "destructive",
      });
      return;
    }

    setOperationProgress(0);
    setOperationLogs(prev => [...prev, `Initiating AETHER.SCAN for ${targetEntity}`]);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setOperationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    aetherScanMutation.mutate({
      target_entity: targetEntity,
      domain: targetEntity.includes('.') ? targetEntity : undefined,
      operation_scope: operationScope,
    });
  };

  const executeNEXUSCommand = () => {
    const operationId = `nexus_${Date.now()}`;
    setOperationLogs(prev => [...prev, `Executing NEXUS.COMMAND: ${operationId}`]);
    
    nexusCommandMutation.mutate({
      operation_id: operationId,
      command_type: 'autonomous_operation',
      target_data: { entity: targetEntity, scope: operationScope },
    });
  };

  const executePHANTOMPersistence = () => {
    if (!targetEntity.trim()) {
      toast({
        title: "Target Required",
        description: "Please specify a target entity for PHANTOM.PERSISTENCE operation",
        variant: "destructive",
      });
      return;
    }

    setOperationLogs(prev => [...prev, `Establishing PHANTOM.PERSISTENCE for ${targetEntity}`]);
    
    phantomPersistenceMutation.mutate({
      target_entity: targetEntity,
      persistence_type: 'advanced',
      stealth_level: 'maximum',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'fully_operational':
      case 'operational':
        return 'bg-green-600';
      case 'degraded':
        return 'bg-yellow-600';
      case 'offline':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getAPTComplianceStatus = (compliance: any) => {
    if (!compliance) return 0;
    const total = Object.keys(compliance).length;
    const active = Object.values(compliance).filter(Boolean).length;
    return Math.round((active / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-mono">
      {/* Header */}
      <div className="border-b border-purple-500/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold text-purple-400">GIDEON NEXUS INTEL v2.0</h1>
                <p className="text-sm text-purple-300/70">State-Sponsored Adversarial Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={gideonStatus?.operational_status ? getStatusColor(gideonStatus.operational_status) : 'bg-gray-600'}>
                {gideonStatus?.operational_status || 'UNKNOWN'}
              </Badge>
              <Badge className="bg-red-600">APT-LEVEL</Badge>
              <Badge className="bg-purple-600">AUTONOMOUS</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Framework Status Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Framework Status */}
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  GIDEON APEX Status
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-purple-300">Version:</span>
                        <div className="text-white font-semibold">{gideonStatus?.framework_version || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-purple-300">Operations:</span>
                        <div className="text-white font-semibold">{gideonStatus?.total_operations || 0}</div>
                      </div>
                      <div>
                        <span className="text-purple-300">Success Rate:</span>
                        <div className="text-green-400 font-semibold">{(gideonStatus?.success_rate * 100 || 0).toFixed(1)}%</div>
                      </div>
                      <div>
                        <span className="text-purple-300">Active Ops:</span>
                        <div className="text-white font-semibold">{gideonStatus?.active_operations || 0}</div>
                      </div>
                    </div>
                    
                    {/* APT Compliance */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-sm">APT Compliance</span>
                        <span className="text-green-400 text-sm font-semibold">
                          {getAPTComplianceStatus(gideonStatus?.apt_compliance)}%
                        </span>
                      </div>
                      <Progress 
                        value={getAPTComplianceStatus(gideonStatus?.apt_compliance)} 
                        className="h-2 bg-slate-700"
                      />
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {gideonStatus?.apt_compliance && Object.entries(gideonStatus.apt_compliance).map(([apt, status]) => (
                          <div key={apt} className="flex items-center justify-between p-1 bg-slate-800/50 rounded">
                            <span className="text-purple-300 capitalize">{apt.replace('_', ' ')}</span>
                            <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Capabilities Status */}
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Core Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gideonStatus?.capabilities_online && Object.entries(gideonStatus.capabilities_online).map(([capability, status]) => (
                    <div key={capability} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                      <span className="text-purple-300 text-sm capitalize flex items-center">
                        {capability === 'aether_scan' && <Search className="mr-2 h-4 w-4" />}
                        {capability === 'nexus_command' && <Command className="mr-2 h-4 w-4" />}
                        {capability === 'phantom_persistence' && <Ghost className="mr-2 h-4 w-4" />}
                        {capability === 'stealth_operations' && <Eye className="mr-2 h-4 w-4" />}
                        {capability === 'adaptive_surveillance' && <Target className="mr-2 h-4 w-4" />}
                        {capability.replace('_', ' ')}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Operation Logs */}
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
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
          <div className="lg:col-span-2">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  GIDEON APEX Operations Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                
                {/* Target Configuration */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-purple-300 text-sm mb-2 block">Target Entity</label>
                      <Input
                        placeholder="company.com or Organization Name"
                        value={targetEntity}
                        onChange={(e) => setTargetEntity(e.target.value)}
                        className="bg-slate-800 border-purple-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-purple-300 text-sm mb-2 block">Operation Scope</label>
                      <select
                        value={operationScope}
                        onChange={(e) => setOperationScope(e.target.value)}
                        className="w-full p-2 bg-slate-800 border border-purple-500/30 rounded text-white"
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
                        <span className="text-purple-300 text-sm">Operation Progress</span>
                        <span className="text-green-400 text-sm font-semibold">{operationProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={operationProgress} className="h-2 bg-slate-700" />
                    </div>
                  )}
                </div>

                {/* Operations Tabs */}
                <Tabs value={activeOperationTab} onValueChange={setActiveOperationTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                    <TabsTrigger value="aether-scan" className="data-[state=active]:bg-purple-600">
                      AETHER.SCAN
                    </TabsTrigger>
                    <TabsTrigger value="nexus-command" className="data-[state=active]:bg-purple-600">
                      NEXUS.COMMAND
                    </TabsTrigger>
                    <TabsTrigger value="phantom-persistence" className="data-[state=active]:bg-purple-600">
                      PHANTOM.PERSISTENCE
                    </TabsTrigger>
                  </TabsList>

                  {/* AETHER.SCAN Tab */}
                  <TabsContent value="aether-scan" className="space-y-6">
                    <div className="bg-slate-800/50 p-4 rounded border border-purple-500/20">
                      <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
                        <Search className="mr-2 h-4 w-4" />
                        AI-Augmented OSINT Reconnaissance
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        Execute Turla Snake-level passive intelligence gathering with AI-driven analysis, 
                        infrastructure mapping, and threat modeling capabilities.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Phase 1</div>
                          <div className="text-white">Passive Intel</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Phase 2</div>
                          <div className="text-white">Active Recon</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Phase 3</div>
                          <div className="text-white">Infrastructure</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Phase 4</div>
                          <div className="text-white">Threat Model</div>
                        </div>
                      </div>
                      <Button 
                        onClick={executeAETHERScan}
                        disabled={aetherScanMutation.isPending || !targetEntity.trim()}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {aetherScanMutation.isPending ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Executing AETHER.SCAN...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Execute AETHER.SCAN
                          </>
                        )}
                      </Button>
                    </div>

                    {/* AETHER.SCAN Results */}
                    {aetherScanMutation.data && (
                      <div className="bg-slate-800/50 p-4 rounded border border-green-500/30">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          AETHER.SCAN Results
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">Operation ID:</span> <span className="text-white font-mono">{aetherScanMutation.data.aether_scan.operation_id}</span></div>
                            <div><span className="text-purple-300">Target Entity:</span> <span className="text-white">{aetherScanMutation.data.aether_scan.target_entity}</span></div>
                            <div><span className="text-purple-300">AI Confidence:</span> <span className="text-green-400">{(aetherScanMutation.data.aether_scan.ai_confidence * 100).toFixed(1)}%</span></div>
                            <div><span className="text-purple-300">Threat Assessment:</span> <span className="text-red-400">{aetherScanMutation.data.aether_scan.threat_assessment}</span></div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">OpSec Status:</span> <span className="text-green-400">{aetherScanMutation.data.aether_scan.operational_security}</span></div>
                            <div><span className="text-purple-300">Framework:</span> <span className="text-white">{aetherScanMutation.data.framework}</span></div>
                            <div><span className="text-purple-300">Classification:</span> <span className="text-red-400">{aetherScanMutation.data.operation_classification}</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* NEXUS.COMMAND Tab */}
                  <TabsContent value="nexus-command" className="space-y-6">
                    <div className="bg-slate-800/50 p-4 rounded border border-purple-500/20">
                      <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
                        <Command className="mr-2 h-4 w-4" />
                        Autonomous Command & Control
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        Execute APT29 Cozy Bear-level autonomous operations with AI-driven decision making, 
                        risk assessment, and adaptive execution planning.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Validation</div>
                          <div className="text-white">Command Auth</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Decision</div>
                          <div className="text-white">AI Autonomous</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Execution</div>
                          <div className="text-white">Tactical Plan</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Mitigation</div>
                          <div className="text-white">Risk Control</div>
                        </div>
                      </div>
                      <Button 
                        onClick={executeNEXUSCommand}
                        disabled={nexusCommandMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {nexusCommandMutation.isPending ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Executing NEXUS.COMMAND...
                          </>
                        ) : (
                          <>
                            <Command className="mr-2 h-4 w-4" />
                            Execute NEXUS.COMMAND
                          </>
                        )}
                      </Button>
                    </div>

                    {/* NEXUS.COMMAND Results */}
                    {nexusCommandMutation.data && (
                      <div className="bg-slate-800/50 p-4 rounded border border-blue-500/30">
                        <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          NEXUS.COMMAND Results
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">Operation ID:</span> <span className="text-white font-mono">{nexusCommandMutation.data.nexus_command.operation_id}</span></div>
                            <div><span className="text-purple-300">Status:</span> <span className="text-green-400">{nexusCommandMutation.data.nexus_command.autonomous_status}</span></div>
                            <div><span className="text-purple-300">Authority:</span> <span className="text-white">{nexusCommandMutation.data.nexus_command.command_authority}</span></div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">Classification:</span> <span className="text-red-400">{nexusCommandMutation.data.nexus_command.operational_classification}</span></div>
                            <div><span className="text-purple-300">Autonomous:</span> <span className="text-green-400">{nexusCommandMutation.data.autonomous_execution ? 'TRUE' : 'FALSE'}</span></div>
                            <div><span className="text-purple-300">Framework:</span> <span className="text-white">{nexusCommandMutation.data.framework}</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* PHANTOM.PERSISTENCE Tab */}
                  <TabsContent value="phantom-persistence" className="space-y-6">
                    <div className="bg-slate-800/50 p-4 rounded border border-purple-500/20">
                      <h3 className="text-purple-400 font-semibold mb-2 flex items-center">
                        <Ghost className="mr-2 h-4 w-4" />
                        Advanced Persistence Mechanisms
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        Deploy FinFisher/FinSpy-level adaptive persistence with fileless execution, 
                        registry manipulation, WMI persistence, and bootkit capabilities.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Fileless</div>
                          <div className="text-white">Memory Only</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Registry</div>
                          <div className="text-white">Key Injection</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">WMI</div>
                          <div className="text-white">Event Subs</div>
                        </div>
                        <div className="bg-slate-700/50 p-2 rounded">
                          <div className="text-purple-300">Bootkit</div>
                          <div className="text-white">UEFI/MBR</div>
                        </div>
                      </div>
                      <Button 
                        onClick={executePHANTOMPersistence}
                        disabled={phantomPersistenceMutation.isPending || !targetEntity.trim()}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        {phantomPersistenceMutation.isPending ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Establishing PHANTOM.PERSISTENCE...
                          </>
                        ) : (
                          <>
                            <Ghost className="mr-2 h-4 w-4" />
                            Establish PHANTOM.PERSISTENCE
                          </>
                        )}
                      </Button>
                    </div>

                    {/* PHANTOM.PERSISTENCE Results */}
                    {phantomPersistenceMutation.data && (
                      <div className="bg-slate-800/50 p-4 rounded border border-red-500/30">
                        <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          PHANTOM.PERSISTENCE Results
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">Operation ID:</span> <span className="text-white font-mono">{phantomPersistenceMutation.data.phantom_persistence.operation_id}</span></div>
                            <div><span className="text-purple-300">Target Entity:</span> <span className="text-white">{phantomPersistenceMutation.data.phantom_persistence.target_entity}</span></div>
                            <div><span className="text-purple-300">Stealth Rating:</span> <span className="text-green-400">{(phantomPersistenceMutation.data.phantom_persistence.stealth_rating * 100).toFixed(1)}%</span></div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-purple-300">Detection Prob:</span> <span className="text-green-400">{(phantomPersistenceMutation.data.phantom_persistence.detection_probability * 100).toFixed(3)}%</span></div>
                            <div><span className="text-purple-300">Durability:</span> <span className="text-white">{phantomPersistenceMutation.data.phantom_persistence.persistence_durability}</span></div>
                            <div><span className="text-purple-300">Framework:</span> <span className="text-white">{phantomPersistenceMutation.data.framework}</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}