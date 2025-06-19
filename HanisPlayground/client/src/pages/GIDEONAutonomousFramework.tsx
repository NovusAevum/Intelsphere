import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'wouter';
import { 
  Crown, 
  Cpu, 
  Shield, 
  Target, 
  Globe, 
  Eye,
  Zap,
  Terminal,
  Satellite,
  Ghost,
  Activity,
  Database,
  Network,
  Command,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play
} from 'lucide-react';

interface GIDEONStatus {
  framework_status: string;
  active_modules: number;
  total_operations: number;
  success_rate: number;
  threat_level: string;
  last_update: string;
  module_status: {
    state_sponsored: boolean;
    nato_osint: boolean;
    greycell: boolean;
    luxcore: boolean;
    defense_ai: boolean;
    blackice: boolean;
    webscry: boolean;
  };
}

export default function GIDEONAutonomousFramework() {
  const [targetEntity, setTargetEntity] = useState('');
  const [operationMode, setOperationMode] = useState('comprehensive');
  const [isExecuting, setIsExecuting] = useState(false);
  const [operationProgress, setOperationProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const queryClient = useQueryClient();

  // Get GIDEON status
  const { data: gideonStatus } = useQuery<GIDEONStatus>({
    queryKey: ['/api/gideon/status'],
    refetchInterval: 5000
  });

  // Execute comprehensive operation
  const comprehensiveOperation = useMutation({
    mutationFn: async (data: { target: string; mode: string }) => {
      return await fetch('/api/gideon/comprehensive-operation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json());
    },
    onSuccess: () => {
      setIsExecuting(false);
      setOperationProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon/status'] });
    },
    onError: () => {
      setIsExecuting(false);
      setOperationProgress(0);
    }
  });

  const executeComprehensiveOperation = async () => {
    if (!targetEntity.trim()) return;
    
    setIsExecuting(true);
    setOperationProgress(0);

    const phases = [
      'State-Sponsored Adversarial Intelligence',
      'NATO OSINT Automation',
      'GreyCell Infiltration Protocol',
      'LUXCORE.RED Autonomous Operations',
      'Defense Industry AI Integration',
      'BLACKICE Phase Exploitation',
      'Web-SCRY Reconnaissance',
      'Comprehensive Analysis & Reporting'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setOperationProgress((i + 1) * 12.5);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    comprehensiveOperation.mutate({ target: targetEntity, mode: operationMode });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'OPERATIONAL': return 'bg-green-600';
      case 'ACTIVE': return 'bg-blue-600';
      case 'STANDBY': return 'bg-yellow-600';
      case 'OFFLINE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL': return 'text-red-400';
      case 'HIGH': return 'text-orange-400';
      case 'MODERATE': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-gray-400';
    }
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
                <h1 className="text-3xl font-bold text-purple-400">GIDEON AUTONOMOUS FRAMEWORK</h1>
                <p className="text-sm text-purple-300/70">Unified Intelligence Command & Control Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={gideonStatus?.framework_status ? getStatusColor(gideonStatus.framework_status) : 'bg-gray-600'}>
                {gideonStatus?.framework_status || 'UNKNOWN'}
              </Badge>
              <Badge className="bg-purple-600">AUTONOMOUS</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-black/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Command className="mr-2 h-5 w-5" />
                  Mission Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-purple-300 mb-2 block">Target Entity</label>
                  <Input
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="target-entity.com"
                    className="bg-slate-900 border-purple-500/30 text-purple-100"
                    disabled={isExecuting}
                  />
                </div>

                <div>
                  <label className="text-sm text-purple-300 mb-2 block">Operation Mode</label>
                  <select 
                    value={operationMode}
                    onChange={(e) => setOperationMode(e.target.value)}
                    className="w-full bg-slate-900 border border-purple-500/30 rounded px-3 py-2 text-purple-100"
                    disabled={isExecuting}
                  >
                    <option value="comprehensive">Comprehensive Analysis</option>
                    <option value="targeted">Targeted Assessment</option>
                    <option value="stealth">Stealth Operation</option>
                    <option value="surveillance">Surveillance Mode</option>
                  </select>
                </div>

                <Button
                  onClick={executeComprehensiveOperation}
                  disabled={!targetEntity.trim() || isExecuting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  {isExecuting ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      EXECUTING
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      EXECUTE GIDEON
                    </>
                  )}
                </Button>

                {isExecuting && (
                  <div className="space-y-2">
                    <div className="text-xs text-purple-300">Phase: {currentPhase}</div>
                    <Progress value={operationProgress} className="bg-slate-800" />
                    <div className="text-xs text-purple-300">{Math.round(operationProgress)}% Complete</div>
                  </div>
                )}

                {/* System Status */}
                {gideonStatus && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-sm font-semibold text-purple-400">System Status</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Active Modules</span>
                        <span className="text-purple-400">{gideonStatus.active_modules}/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Success Rate</span>
                        <span className="text-green-400">{Math.round(gideonStatus.success_rate * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Threat Level</span>
                        <span className={getThreatLevelColor(gideonStatus.threat_level)}>{gideonStatus.threat_level}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/50 border-purple-500/30 mt-4">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Deploy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20">
                    Recon Only
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                    Red Team
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/20">
                    Defense
                  </Button>
                  <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20">
                    OSINT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-black/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-black/50 border-purple-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-purple-300">Framework Status</p>
                          <p className="font-bold text-purple-400">{gideonStatus?.framework_status || 'UNKNOWN'}</p>
                        </div>
                        <Crown className="h-5 w-5 text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-300">Active Modules</p>
                          <p className="text-lg font-bold text-blue-400">{gideonStatus?.active_modules || 0}</p>
                        </div>
                        <Cpu className="h-5 w-5 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-green-300">Total Operations</p>
                          <p className="text-lg font-bold text-green-400">{gideonStatus?.total_operations || 0}</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-orange-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-orange-300">Success Rate</p>
                          <p className="text-lg font-bold text-orange-400">{Math.round((gideonStatus?.success_rate || 0) * 100)}%</p>
                        </div>
                        <Target className="h-5 w-5 text-orange-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-black/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400">GIDEON Framework Architecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-purple-400">Intelligence Modules</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-blue-300">
                              <Shield className="mr-2 h-4 w-4" />
                              State-Sponsored Adversarial
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.state_sponsored ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-blue-300">
                              <Satellite className="mr-2 h-4 w-4" />
                              NATO OSINT Automation
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.nato_osint ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-purple-300">
                              <Ghost className="mr-2 h-4 w-4" />
                              GreyCell Infiltration
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.greycell ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-red-300">
                              <Zap className="mr-2 h-4 w-4" />
                              LUXCORE.RED Autonomous
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.luxcore ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-purple-400">Specialized Frameworks</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-green-300">
                              <Satellite className="mr-2 h-4 w-4" />
                              Defense Industry AI
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.defense_ai ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-cyan-300">
                              <Terminal className="mr-2 h-4 w-4" />
                              BLACKICE Exploitation
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.blackice ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="flex items-center text-orange-300">
                              <Globe className="mr-2 h-4 w-4" />
                              Web-SCRY Reconnaissance
                            </span>
                            <div className={`w-2 h-2 rounded-full ${gideonStatus?.module_status?.webscry ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Modules Tab */}
              <TabsContent value="modules" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/state-sponsored-adversarial">
                    <Card className="bg-black/50 border-blue-500/30 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Shield className="mr-2 h-5 w-5" />
                          State-Sponsored Adversarial
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-300">Advanced adversarial intelligence with state-sponsored capabilities</p>
                        <Badge className="mt-2 bg-blue-600">OPERATIONAL</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/nato-osint-automation">
                    <Card className="bg-black/50 border-blue-500/30 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-blue-400 flex items-center">
                          <Satellite className="mr-2 h-5 w-5" />
                          NATO OSINT Automation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-300">Professional-grade intelligence collection and analysis</p>
                        <Badge className="mt-2 bg-blue-600">OPERATIONAL</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/greycell-infiltration">
                    <Card className="bg-black/50 border-purple-500/30 hover:border-purple-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-purple-400 flex items-center">
                          <Ghost className="mr-2 h-5 w-5" />
                          GreyCell Infiltration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-purple-300">Advanced behavioral reconnaissance and psychological analysis</p>
                        <Badge className="mt-2 bg-purple-600">ACTIVE</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/luxcore-red-team">
                    <Card className="bg-black/50 border-red-500/30 hover:border-red-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-red-400 flex items-center">
                          <Zap className="mr-2 h-5 w-5" />
                          LUXCORE.RED Autonomous
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-red-300">AI-driven red team operations and deception platforms</p>
                        <Badge className="mt-2 bg-red-600">AUTONOMOUS</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/defense-industry-ai">
                    <Card className="bg-black/50 border-green-500/30 hover:border-green-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center">
                          <Satellite className="mr-2 h-5 w-5" />
                          Defense Industry AI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-green-300">Satellite intelligence and defense analysis integration</p>
                        <Badge className="mt-2 bg-green-600">OPERATIONAL</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/blackice-exploitation">
                    <Card className="bg-black/50 border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-cyan-400 flex items-center">
                          <Terminal className="mr-2 h-5 w-5" />
                          BLACKICE Exploitation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-cyan-300">Advanced penetration testing and payload execution</p>
                        <Badge className="mt-2 bg-cyan-600">ACTIVE</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/webscry-reconnaissance">
                    <Card className="bg-black/50 border-orange-500/30 hover:border-orange-400 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Globe className="mr-2 h-5 w-5" />
                          Web-SCRY Reconnaissance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-orange-300">Automated web intelligence and digital footprint analysis</p>
                        <Badge className="mt-2 bg-orange-600">OPERATIONAL</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>

              {/* Operations Tab */}
              <TabsContent value="operations" className="space-y-4">
                <Card className="bg-black/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Recent Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <div>
                              <p className="text-sm font-semibold text-white">Comprehensive Analysis</p>
                              <p className="text-xs text-gray-400">Target: enterprise-target.com</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-400">SUCCESS</p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                          <div className="flex items-center space-x-3">
                            <Activity className="h-4 w-4 text-blue-400 animate-spin" />
                            <div>
                              <p className="text-sm font-semibold text-white">OSINT Collection</p>
                              <p className="text-xs text-gray-400">Target: government-agency.gov</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-blue-400">RUNNING</p>
                            <p className="text-xs text-gray-400">Started 15 min ago</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <div>
                              <p className="text-sm font-semibold text-white">Red Team Assessment</p>
                              <p className="text-xs text-gray-400">Target: defense-contractor.mil</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-400">SUCCESS</p>
                            <p className="text-xs text-gray-400">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Intelligence Tab */}
              <TabsContent value="intelligence" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-black/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <Database className="mr-2 h-5 w-5" />
                        Intelligence Sources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-purple-300">Active APIs</span>
                          <span className="text-purple-400">30</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Data Sources</span>
                          <span className="text-purple-400">127</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Collection Rate</span>
                          <span className="text-green-400">94.7%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Threat Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-purple-300">Current Level</span>
                          <span className={getThreatLevelColor(gideonStatus?.threat_level || 'UNKNOWN')}>
                            {gideonStatus?.threat_level || 'UNKNOWN'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Active Threats</span>
                          <span className="text-red-400">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Mitigated</span>
                          <span className="text-green-400">47</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}