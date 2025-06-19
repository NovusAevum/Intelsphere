import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Command, Users, Activity, Target, Shield, Brain,
  Zap, CheckCircle, AlertTriangle, ArrowUp, Clock,
  TrendingUp, BarChart3, Settings, Play, RefreshCw
} from 'lucide-react';
import GoBackButton from '@/components/ui/go-back-button';

export default function HierarchicalCommandCenter() {
  const [missionObjective, setMissionObjective] = useState('');
  const [complexityLevel, setComplexityLevel] = useState<'basic' | 'intermediate' | 'advanced' | 'expert'>('basic');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [systemsInvolved, setSystemsInvolved] = useState<string[]>(['frontend', 'backend']);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const queryClient = useQueryClient();

  // System Health Monitoring
  const { data: systemHealth, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/hierarchical-health'],
    refetchInterval: autoRefresh ? 3000 : false,
  });

  // System Status
  const { data: systemStatus } = useQuery({
    queryKey: ['/api/hierarchical-status'],
    refetchInterval: autoRefresh ? 5000 : false,
  });

  // Mission Processing Mutation
  const processMissionMutation = useMutation({
    mutationFn: async (missionData: any) => {
      return apiRequest('/api/hierarchical-mission', {
        method: 'POST',
        body: JSON.stringify(missionData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hierarchical-health'] });
      queryClient.invalidateQueries({ queryKey: ['/api/hierarchical-status'] });
    },
  });

  // System Test Mutation
  const systemTestMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/hierarchical-system-test', {
        method: 'POST',
        body: JSON.stringify({}),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hierarchical-health'] });
      queryClient.invalidateQueries({ queryKey: ['/api/hierarchical-status'] });
    },
  });

  const handleMissionSubmit = () => {
    if (!missionObjective.trim()) return;

    const missionData = {
      objective: missionObjective,
      complexity_level: complexityLevel,
      priority: priority,
      systems_involved: systemsInvolved,
      resource_requirements: getResourceRequirements(complexityLevel),
      estimated_duration: getEstimatedDuration(complexityLevel)
    };

    processMissionMutation.mutate(missionData);
  };

  const getResourceRequirements = (complexity: string): number => {
    switch (complexity) {
      case 'basic': return 50;
      case 'intermediate': return 120;
      case 'advanced': return 250;
      case 'expert': return 500;
      default: return 100;
    }
  };

  const getEstimatedDuration = (complexity: string): number => {
    switch (complexity) {
      case 'basic': return 300;
      case 'intermediate': return 600;
      case 'advanced': return 900;
      case 'expert': return 1800;
      default: return 600;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'overloaded': return 'bg-yellow-500';
      case 'escalating': return 'bg-orange-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCapacityColor = (utilization: number) => {
    if (utilization < 0.5) return 'text-green-600';
    if (utilization < 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <GoBackButton />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 rounded-full flex items-center justify-center">
                <Command className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">
                Hierarchical Command Center
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                A2A Soldiers → MMA2MMA Captains → AMMA2AMMA Commanders
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Hierarchical Protocol
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Target className="w-3 h-3 mr-1" />
                  Auto Escalation
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="mission-control" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mission-control">Mission Control</TabsTrigger>
            <TabsTrigger value="system-health">System Health</TabsTrigger>
            <TabsTrigger value="escalation-logs">Escalation Logs</TabsTrigger>
            <TabsTrigger value="testing">System Testing</TabsTrigger>
          </TabsList>

          {/* Mission Control Tab */}
          <TabsContent value="mission-control" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mission Planning */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      Mission Planning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="objective">Mission Objective</Label>
                      <Textarea
                        id="objective"
                        placeholder="Enter mission objective that will be automatically routed through A2A → MMA2MMA → AMMA2AMMA hierarchy..."
                        value={missionObjective}
                        onChange={(e) => setMissionObjective(e.target.value)}
                        className="min-h-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Complexity Level</Label>
                      <Select value={complexityLevel} onValueChange={(value: any) => setComplexityLevel(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic (A2A Capable)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (MMA2MMA Required)</SelectItem>
                          <SelectItem value="advanced">Advanced (AMMA2AMMA Required)</SelectItem>
                          <SelectItem value="expert">Expert (Commander Override)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Mission Priority</Label>
                      <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="critical">Critical Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Resources: </span>
                        <span className="text-blue-600">{getResourceRequirements(complexityLevel)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Duration: </span>
                        <span className="text-purple-600">{getEstimatedDuration(complexityLevel)}s</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleMissionSubmit}
                      disabled={!missionObjective || processMissionMutation.isPending}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Execute Mission
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Live Command Status */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-500" />
                      Live Command Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {healthLoading ? (
                      <div className="text-center py-8">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                        <p>Loading system health...</p>
                      </div>
                    ) : systemHealth?.data ? (
                      <div className="space-y-6">
                        {/* Command Hierarchy Status */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* A2A Soldiers */}
                          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-green-800 dark:text-green-200">A2A Soldiers</span>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemHealth.data.system_health.a2a_soldiers.status)}`}></div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div>Active Agents: <span className="font-medium">{systemHealth.data.system_health.a2a_soldiers.active_agents}</span></div>
                              <div>Load: <span className={`font-medium ${getCapacityColor(systemHealth.data.system_health.a2a_soldiers.capacity_utilization)}`}>
                                {Math.round(systemHealth.data.system_health.a2a_soldiers.capacity_utilization * 100)}%
                              </span></div>
                            </div>
                          </div>

                          {/* MMA2MMA Captains */}
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-blue-800 dark:text-blue-200">MMA2MMA Captains</span>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemHealth.data.system_health.mma2mma_captains.status)}`}></div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div>Active Sessions: <span className="font-medium">{systemHealth.data.system_health.mma2mma_captains.active_sessions}</span></div>
                              <div>Load: <span className={`font-medium ${getCapacityColor(systemHealth.data.system_health.mma2mma_captains.capacity_utilization)}`}>
                                {Math.round(systemHealth.data.system_health.mma2mma_captains.capacity_utilization * 100)}%
                              </span></div>
                            </div>
                          </div>

                          {/* AMMA2AMMA Commanders */}
                          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Command className="w-5 h-5 text-purple-600" />
                                <span className="font-semibold text-purple-800 dark:text-purple-200">AMMA2AMMA Commanders</span>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemHealth.data.system_health.amma2amma_commanders.status)}`}></div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div>Active Sessions: <span className="font-medium">{systemHealth.data.system_health.amma2amma_commanders.active_sessions}</span></div>
                              <div>Load: <span className={`font-medium ${getCapacityColor(systemHealth.data.system_health.amma2amma_commanders.capacity_utilization)}`}>
                                {Math.round(systemHealth.data.system_health.amma2amma_commanders.capacity_utilization * 100)}%
                              </span></div>
                            </div>
                          </div>
                        </div>

                        {/* Mission Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{systemHealth.data.mission_statistics.active_missions}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Active Missions</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{systemHealth.data.escalation_metrics.total_escalations}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Escalations</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{Math.round(systemHealth.data.escalation_metrics.escalation_rate * 100)}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Escalation Rate</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{systemHealth.data.mission_statistics.completed_missions}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No system health data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system-health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Detailed System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                {systemHealth?.data && (
                  <div className="space-y-6">
                    {/* Success Rates by Level */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Success Rates by Command Level</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">A2A Soldiers</span>
                            <span className="text-green-600 font-bold">{Math.round(systemHealth.data.mission_statistics.success_rate_by_level.A2A * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${systemHealth.data.mission_statistics.success_rate_by_level.A2A * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">MMA2MMA Captains</span>
                            <span className="text-blue-600 font-bold">{Math.round(systemHealth.data.mission_statistics.success_rate_by_level.MMA2MMA * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${systemHealth.data.mission_statistics.success_rate_by_level.MMA2MMA * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">AMMA2AMMA Commanders</span>
                            <span className="text-purple-600 font-bold">{Math.round(systemHealth.data.mission_statistics.success_rate_by_level.AMMA2AMMA * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${systemHealth.data.mission_statistics.success_rate_by_level.AMMA2AMMA * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Common Escalation Reasons */}
                    {systemHealth.data.escalation_metrics.common_escalation_reasons.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Common Escalation Reasons</h3>
                        <div className="space-y-2">
                          {systemHealth.data.escalation_metrics.common_escalation_reasons.map((reason: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              <ArrowUp className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Escalation Logs Tab */}
          <TabsContent value="escalation-logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Escalation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {systemStatus?.data?.escalation_log?.length > 0 ? (
                  <div className="space-y-4">
                    {systemStatus.data.escalation_log.map((log: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ArrowUp className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">{log.from_level} → {log.to_level}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Mission: {log.mission_id}
                        </div>
                        <div className="text-sm">
                          Reason: {log.reason}
                        </div>
                        <div className="mt-2">
                          <Badge className={log.success ? 'bg-green-500' : 'bg-red-500'}>
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No escalation logs available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  Comprehensive System Testing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold mb-2">System Test Protocol</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div>• Tests basic A2A coordination capabilities</div>
                    <div>• Validates MMA2MMA captain coordination</div>
                    <div>• Verifies AMMA2AMMA commander orchestration</div>
                    <div>• Monitors escalation patterns and success rates</div>
                  </div>
                </div>

                <Button 
                  onClick={() => systemTestMutation.mutate()}
                  disabled={systemTestMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {systemTestMutation.isPending ? 'Running System Test...' : 'Execute Comprehensive System Test'}
                </Button>

                {systemTestMutation.data && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800 dark:text-green-200">Test Results</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Total Tests: </span>
                        <span>{systemTestMutation.data.data.test_summary.total_tests}</span>
                      </div>
                      <div>
                        <span className="font-medium">Successful Tests: </span>
                        <span className="text-green-600">{systemTestMutation.data.data.test_summary.successful_tests}</span>
                      </div>
                      <div>
                        <span className="font-medium">Success Rate: </span>
                        <span className="text-blue-600">
                          {Math.round((systemTestMutation.data.data.test_summary.successful_tests / systemTestMutation.data.data.test_summary.total_tests) * 100)}%
                        </span>
                      </div>
                      {systemTestMutation.data.data.recommendations && (
                        <div>
                          <span className="font-medium">Recommendations:</span>
                          <ul className="list-disc list-inside mt-1 text-gray-600 dark:text-gray-400">
                            {systemTestMutation.data.data.recommendations.map((rec: string, index: number) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}