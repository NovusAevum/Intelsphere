import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Crown, Target, Shield, Zap, Users, Activity, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';

interface SupremeCommand {
  objective: string;
  priority: 'critical' | 'high' | 'medium' | 'strategic';
  scope: 'local' | 'regional' | 'national' | 'international';
}

interface HighLevelTask {
  task: string;
  instructions: string;
  priority: 'critical' | 'high' | 'medium' | 'strategic';
}

export default function ChiefStateCommander() {
  const [supremeCommand, setSupremeCommand] = useState<SupremeCommand>({
    objective: '',
    priority: 'high',
    scope: 'national'
  });

  const [highLevelTask, setHighLevelTask] = useState<HighLevelTask>({
    task: '',
    instructions: '',
    priority: 'high'
  });

  const [commandResult, setCommandResult] = useState<any>(null);
  const [taskResult, setTaskResult] = useState<any>(null);

  // Query for supreme command status
  const { data: commanderStatus, refetch: refetchStatus } = useQuery({
    queryKey: ['/api/chief-state-commander/status'],
    refetchInterval: 5000
  });

  // Mutation for executing supreme commands
  const executeSupremeCommandMutation = useMutation({
    mutationFn: async (command: SupremeCommand) => {
      return await apiRequest('/api/chief-state-commander/execute-supreme-command', {
        method: 'POST',
        body: JSON.stringify(command)
      });
    },
    onSuccess: (data) => {
      setCommandResult(data);
      refetchStatus();
    }
  });

  // Mutation for receiving high-level tasks
  const receiveHighLevelTaskMutation = useMutation({
    mutationFn: async (task: HighLevelTask) => {
      return await apiRequest('/api/chief-state-commander/receive-high-level-task', {
        method: 'POST',
        body: JSON.stringify(task)
      });
    },
    onSuccess: (data) => {
      setTaskResult(data);
      refetchStatus();
    }
  });

  const handleExecuteSupremeCommand = () => {
    if (!supremeCommand.objective.trim()) return;
    executeSupremeCommandMutation.mutate(supremeCommand);
  };

  const handleReceiveHighLevelTask = () => {
    if (!highLevelTask.task.trim() || !highLevelTask.instructions.trim()) return;
    receiveHighLevelTaskMutation.mutate(highLevelTask);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'strategic': return 'outline';
      default: return 'secondary';
    }
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'local': return <Target className="h-4 w-4" />;
      case 'regional': return <Users className="h-4 w-4" />;
      case 'national': return <Shield className="h-4 w-4" />;
      case 'international': return <TrendingUp className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Crown className="h-12 w-12 text-yellow-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            Chief State Commander Hanis
          </h1>
          <Crown className="h-12 w-12 text-yellow-400" />
        </div>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Supreme Authority over NexusIntel 2.0v Multi-Modal AI Intelligence Platform
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            <Shield className="h-3 w-3 mr-1" />
            Supreme Command Authority
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Activity className="h-3 w-3 mr-1" />
            {commanderStatus?.data?.operational_status || 'Operational'}
          </Badge>
        </div>
      </div>

      {/* Command Status Overview */}
      {commanderStatus?.data && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Supreme Command Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-yellow-400">
                  {commanderStatus.data.active_objectives || 0}
                </div>
                <div className="text-sm text-slate-400">Active Objectives</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-400">
                  {commanderStatus.data.active_directives || 0}
                </div>
                <div className="text-sm text-slate-400">Strategic Directives</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-400">
                  {commanderStatus.data.active_operations || 0}
                </div>
                <div className="text-sm text-slate-400">Active Operations</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-400">
                  {commanderStatus.data.intelligence_reports || 0}
                </div>
                <div className="text-sm text-slate-400">Intelligence Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="supreme-command" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="supreme-command" className="data-[state=active]:bg-yellow-600">
            Supreme Command
          </TabsTrigger>
          <TabsTrigger value="high-level-tasks" className="data-[state=active]:bg-blue-600">
            High-Level Tasks
          </TabsTrigger>
          <TabsTrigger value="system-overview" className="data-[state=active]:bg-green-600">
            System Overview
          </TabsTrigger>
        </TabsList>

        {/* Supreme Command Tab */}
        <TabsContent value="supreme-command">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Command Input */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  Execute Supreme Command
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Issue strategic directives to all subordinate AI systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objective" className="text-white">Strategic Objective</Label>
                  <Textarea
                    id="objective"
                    placeholder="Enter your strategic objective..."
                    value={supremeCommand.objective}
                    onChange={(e) => setSupremeCommand(prev => ({...prev, objective: e.target.value}))}
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Priority Level</Label>
                    <Select 
                      value={supremeCommand.priority} 
                      onValueChange={(value: any) => setSupremeCommand(prev => ({...prev, priority: value}))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="strategic">Strategic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Operational Scope</Label>
                    <Select 
                      value={supremeCommand.scope} 
                      onValueChange={(value: any) => setSupremeCommand(prev => ({...prev, scope: value}))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleExecuteSupremeCommand}
                  disabled={!supremeCommand.objective.trim() || executeSupremeCommandMutation.isPending}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                  size="lg"
                >
                  {executeSupremeCommandMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Executing Command...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Execute Supreme Command
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Command Results */}
            {commandResult && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Command Execution Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(commandResult.data?.mission_control?.high_level_objectives?.[0]?.priority || 'medium')}>
                          {commandResult.data?.mission_control?.high_level_objectives?.[0]?.priority || 'Unknown'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getScopeIcon(commandResult.data?.mission_control?.strategic_directives?.[0]?.execution_parameters?.scope || 'local')}
                          <span className="text-sm text-slate-400">
                            {commandResult.data?.mission_control?.strategic_directives?.[0]?.execution_parameters?.scope || 'Unknown Scope'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Subordinate Systems Coordinated:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-slate-300">
                            AMMA2AMMA: {commandResult.data?.subordinate_systems?.amma2amma_commanders?.length || 0}
                          </div>
                          <div className="text-sm text-slate-300">
                            MMA2MMA: {commandResult.data?.subordinate_systems?.mma2mma_captains?.length || 0}
                          </div>
                          <div className="text-sm text-slate-300">
                            A2A: {commandResult.data?.subordinate_systems?.a2a_soldiers?.length || 0}
                          </div>
                          <div className="text-sm text-slate-300">
                            Systems: {commandResult.data?.subordinate_systems?.hierarchical_systems?.length || 0}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">System Coordination:</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Efficiency:</span>
                            <span className="text-green-400">
                              {Math.round((commandResult.data?.mission_control?.system_wide_coordination?.system_efficiency || 0) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(commandResult.data?.mission_control?.system_wide_coordination?.system_efficiency || 0) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Intelligence Operation:</h4>
                        <div className="text-sm text-slate-300">
                          {commandResult.data?.intelligence_oversight?.osint_operations?.length || 0} OSINT operations initiated
                        </div>
                        <div className="text-sm text-slate-300">
                          {commandResult.data?.intelligence_oversight?.intelligence_reports?.length || 0} intelligence reports generated
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* High-Level Tasks Tab */}
        <TabsContent value="high-level-tasks">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Input */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Issue High-Level Task
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Delegate specific tasks with detailed instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task" className="text-white">Task Description</Label>
                  <Input
                    id="task"
                    placeholder="Enter task description..."
                    value={highLevelTask.task}
                    onChange={(e) => setHighLevelTask(prev => ({...prev, task: e.target.value}))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-white">Detailed Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Provide detailed instructions for task execution..."
                    value={highLevelTask.instructions}
                    onChange={(e) => setHighLevelTask(prev => ({...prev, instructions: e.target.value}))}
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Task Priority</Label>
                  <Select 
                    value={highLevelTask.priority} 
                    onValueChange={(value: any) => setHighLevelTask(prev => ({...prev, priority: value}))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="strategic">Strategic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleReceiveHighLevelTask}
                  disabled={!highLevelTask.task.trim() || !highLevelTask.instructions.trim() || receiveHighLevelTaskMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  size="lg"
                >
                  {receiveHighLevelTaskMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Delegating Task...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Delegate Task
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Task Results */}
            {taskResult && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Task Delegation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      <Alert className="border-green-600 bg-green-900/20">
                        <AlertCircle className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-300">
                          Task successfully delegated to all subordinate systems
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Task Details:</h4>
                        <div className="text-sm text-slate-300 space-y-1">
                          <div><strong>Task ID:</strong> {taskResult.data?.mission_control?.high_level_objectives?.[0]?.objective_id}</div>
                          <div><strong>Priority:</strong> {taskResult.data?.mission_control?.high_level_objectives?.[0]?.priority}</div>
                          <div><strong>Status:</strong> <span className="text-green-400">Initiated</span></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Systems Engaged:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {taskResult.data?.subordinate_systems?.amma2amma_commanders?.map((commander: string, index: number) => (
                            <div key={index} className="text-sm text-blue-300">• AMMA2AMMA Commander: {commander}</div>
                          ))}
                          {taskResult.data?.subordinate_systems?.mma2mma_captains?.map((captain: string, index: number) => (
                            <div key={index} className="text-sm text-purple-300">• MMA2MMA Captain: {captain}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* System Overview Tab */}
        <TabsContent value="system-overview">
          {commanderStatus?.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    Command Authority
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">SUPREME</div>
                      <div className="text-sm text-slate-400">Authority Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        {commanderStatus.data.system_overview?.security_clearance?.toUpperCase() || 'CLASSIFIED'}
                      </div>
                      <div className="text-sm text-slate-400">Security Clearance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Subordinate Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">AMMA2AMMA:</span>
                      <span className="text-blue-400 font-bold">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MMA2MMA:</span>
                      <span className="text-purple-400 font-bold">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">A2A:</span>
                      <span className="text-green-400 font-bold">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hierarchical:</span>
                      <span className="text-yellow-400 font-bold">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-400" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        {commanderStatus.data.system_overview?.resource_allocation?.toUpperCase() || 'OPTIMAL'}
                      </div>
                      <div className="text-sm text-slate-400">Resource Allocation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">
                        {commanderStatus.data.system_overview?.communication_status?.replace(/_/g, ' ').toUpperCase() || 'ALL ACTIVE'}
                      </div>
                      <div className="text-sm text-slate-400">Communication Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}