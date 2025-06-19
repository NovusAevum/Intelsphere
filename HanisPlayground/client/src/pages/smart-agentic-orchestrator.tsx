import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Zap, 
  Globe, 
  Eye, 
  Cpu, 
  Activity, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Image,
  FileText,
  Mic,
  Video,
  Settings,
  Network,
  Database,
  Layers,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface AgenticTask {
  id: string;
  query: string;
  type: 'research' | 'analysis' | 'synthesis' | 'reasoning' | 'web_scraping';
  status: 'processing' | 'completed' | 'failed';
  result?: any;
  processingTime?: number;
  metadata?: any;
}

interface SystemMetrics {
  totalRequests: number;
  averageResponseTime: number;
  successRate: number;
  fallbackUsage: number;
  activeTasks: number;
  systemHealth: number;
}

export default function SmartAgenticOrchestrator() {
  const [activeTab, setActiveTab] = useState('main');
  const [query, setQuery] = useState('');
  const [taskType, setTaskType] = useState<'research' | 'analysis' | 'synthesis' | 'reasoning' | 'web_scraping'>('research');
  const [enableRAG, setEnableRAG] = useState(true);
  const [enableWebScraping, setEnableWebScraping] = useState(false);
  const [enableMultiModal, setEnableMultiModal] = useState(false);
  const [webScrapingUrls, setWebScrapingUrls] = useState('');
  const [multiModalText, setMultiModalText] = useState('');
  const [multiModalImage, setMultiModalImage] = useState('');
  const [activeTasks, setActiveTasks] = useState<AgenticTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<AgenticTask[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);

  const queryClient = useQueryClient();

  // Fetch system metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/smart-agentic/metrics'],
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  // Fetch system health
  const { data: health, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/smart-agentic/health'],
    refetchInterval: 15000 // Refresh every 15 seconds
  });

  // Main Smart Agentic AI mutation
  const smartAgenticMutation = useMutation({
    mutationFn: async (request: any) => {
      const response = await apiRequest('/api/smart-agentic', {
        method: 'POST',
        body: JSON.stringify(request)
      });
      return response;
    },
    onSuccess: (data) => {
      const task: AgenticTask = {
        id: data.data.taskId,
        query: query,
        type: taskType,
        status: 'completed',
        result: data.data.result,
        processingTime: data.data.processingTime,
        metadata: data.data.metadata
      };
      
      setCompletedTasks(prev => [task, ...prev.slice(0, 9)]); // Keep last 10 tasks
      setActiveTasks(prev => prev.filter(t => t.id !== task.id));
      setProcessingProgress(100);
      
      // Reset form
      setQuery('');
      setMultiModalText('');
      setMultiModalImage('');
      setWebScrapingUrls('');
      
      queryClient.invalidateQueries({ queryKey: ['/api/smart-agentic/metrics'] });
    },
    onError: (error) => {
      console.error('Smart Agentic AI error:', error);
      setActiveTasks(prev => prev.map(task => 
        task.status === 'processing' ? { ...task, status: 'failed' } : task
      ));
      setProcessingProgress(0);
    },
    onMutate: () => {
      const taskId = `task_${Date.now()}`;
      const newTask: AgenticTask = {
        id: taskId,
        query: query,
        type: taskType,
        status: 'processing'
      };
      
      setActiveTasks(prev => [newTask, ...prev]);
      setProcessingProgress(10);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 20;
        });
      }, 1000);
    }
  });

  // Advanced web scraping mutation
  const webScrapingMutation = useMutation({
    mutationFn: async (urls: string[]) => {
      const response = await apiRequest('/api/advanced-web-scraping', {
        method: 'POST',
        body: JSON.stringify({
          urls,
          selectors: ['p', 'h1', 'h2', 'h3', 'article', '.content'],
          depth: 1,
          followLinks: false
        })
      });
      return response;
    },
    onSuccess: (data) => {
      console.log('Web scraping completed:', data);
    }
  });

  // Multi-modal analysis mutation
  const multiModalMutation = useMutation({
    mutationFn: async (input: any) => {
      const response = await apiRequest('/api/multimodal-analysis', {
        method: 'POST',
        body: JSON.stringify(input)
      });
      return response;
    },
    onSuccess: (data) => {
      console.log('Multi-modal analysis completed:', data);
    }
  });

  const handleExecuteTask = () => {
    if (!query.trim()) return;

    const request: any = {
      query: query.trim(),
      type: taskType,
      context: {},
      enableAdvancedRAG: enableRAG,
      enableWebScraping: enableWebScraping,
      enableMultiModal: enableMultiModal
    };

    if (enableMultiModal) {
      request.multiModal = {};
      if (multiModalText) request.multiModal.text = multiModalText;
      if (multiModalImage) request.multiModal.image = multiModalImage;
    }

    if (enableWebScraping && webScrapingUrls) {
      const urls = webScrapingUrls.split('\n').filter(url => url.trim());
      request.webScraping = urls.map(url => ({
        url: url.trim(),
        selectors: ['p', 'h1', 'h2', 'h3', 'article', '.content'],
        depth: 1,
        followLinks: false,
        respectRobots: true,
        timeout: 30000
      }));
    }

    smartAgenticMutation.mutate(request);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Activity className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'research':
        return <Search className="h-4 w-4" />;
      case 'analysis':
        return <BarChart3 className="h-4 w-4" />;
      case 'synthesis':
        return <Layers className="h-4 w-4" />;
      case 'reasoning':
        return <Brain className="h-4 w-4" />;
      case 'web_scraping':
        return <Globe className="h-4 w-4" />;
      default:
        return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Brain className="h-12 w-12 text-blue-400" />
              <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                Smart Agentic AI Orchestrator
              </h1>
              <p className="text-xl text-gray-300 mt-2">
                Advanced Multi-Modal AI with RAG, Web Scraping & Unified Tokenization
              </p>
            </div>
          </div>
          
          {/* System Status Bar */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">System Operational</span>
            </div>
            {metrics && (
              <>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span>{metrics.data.activeTasks} Active Tasks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>{(metrics.data.successRate * 100).toFixed(1)}% Success Rate</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="main" className="data-[state=active]:bg-blue-600">
              <Cpu className="h-4 w-4 mr-2" />
              AI Orchestrator
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-600">
              <Target className="h-4 w-4 mr-2" />
              Task Monitor
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-emerald-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-orange-600">
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </TabsTrigger>
          </TabsList>

          {/* Main Orchestrator Tab */}
          <TabsContent value="main" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-400" />
                      <span>AI Orchestration Interface</span>
                    </CardTitle>
                    <CardDescription>
                      Execute advanced AI tasks with multi-modal capabilities, RAG, and web scraping
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Main Query Input */}
                    <div className="space-y-2">
                      <Label htmlFor="query">Query / Task Description</Label>
                      <Textarea
                        id="query"
                        placeholder="Enter your research question, analysis request, or reasoning task..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-[120px] bg-gray-800 border-gray-600 text-white"
                        disabled={smartAgenticMutation.isPending}
                      />
                    </div>

                    {/* Task Type Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="taskType">Task Type</Label>
                      <Select value={taskType} onValueChange={(value: any) => setTaskType(value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="research">🔍 Research & Investigation</SelectItem>
                          <SelectItem value="analysis">📊 Data Analysis</SelectItem>
                          <SelectItem value="synthesis">🧬 Information Synthesis</SelectItem>
                          <SelectItem value="reasoning">🧠 Advanced Reasoning</SelectItem>
                          <SelectItem value="web_scraping">🌐 Web Scraping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Capability Toggles */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-300">Advanced Capabilities</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                          <Switch
                            id="enableRAG"
                            checked={enableRAG}
                            onCheckedChange={setEnableRAG}
                          />
                          <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-blue-400" />
                            <Label htmlFor="enableRAG" className="text-sm">Advanced RAG</Label>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                          <Switch
                            id="enableWebScraping"
                            checked={enableWebScraping}
                            onCheckedChange={setEnableWebScraping}
                          />
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-emerald-400" />
                            <Label htmlFor="enableWebScraping" className="text-sm">Web Scraping</Label>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                          <Switch
                            id="enableMultiModal"
                            checked={enableMultiModal}
                            onCheckedChange={setEnableMultiModal}
                          />
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-purple-400" />
                            <Label htmlFor="enableMultiModal" className="text-sm">Multi-Modal</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conditional Inputs */}
                    {enableWebScraping && (
                      <div className="space-y-2">
                        <Label htmlFor="webScrapingUrls">URLs to Scrape (one per line)</Label>
                        <Textarea
                          id="webScrapingUrls"
                          placeholder="https://example.com&#10;https://another-site.com"
                          value={webScrapingUrls}
                          onChange={(e) => setWebScrapingUrls(e.target.value)}
                          className="bg-gray-800 border-gray-600"
                          rows={4}
                        />
                      </div>
                    )}

                    {enableMultiModal && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="multiModalText">Additional Text Context</Label>
                          <Textarea
                            id="multiModalText"
                            placeholder="Additional text for multi-modal analysis..."
                            value={multiModalText}
                            onChange={(e) => setMultiModalText(e.target.value)}
                            className="bg-gray-800 border-gray-600"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="multiModalImage">Image (Base64 or URL)</Label>
                          <Input
                            id="multiModalImage"
                            placeholder="data:image/jpeg;base64,... or https://..."
                            value={multiModalImage}
                            onChange={(e) => setMultiModalImage(e.target.value)}
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>
                      </div>
                    )}

                    {/* Execute Button */}
                    <Button
                      onClick={handleExecuteTask}
                      disabled={!query.trim() || smartAgenticMutation.isPending}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      {smartAgenticMutation.isPending ? (
                        <>
                          <Activity className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Execute Smart Agentic Task
                        </>
                      )}
                    </Button>

                    {/* Progress Bar */}
                    {smartAgenticMutation.isPending && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing...</span>
                          <span>{Math.round(processingProgress)}%</span>
                        </div>
                        <Progress value={processingProgress} className="bg-gray-700" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* System Overview Panel */}
              <div className="space-y-6">
                {/* System Health */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {healthLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    ) : health && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Overall Health</span>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {(health.data.performance.systemHealth * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Uptime</span>
                          <span className="text-sm">{Math.round(health.data.uptime / 3600)}h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Memory Usage</span>
                          <span className="text-sm">{Math.round(health.data.memory.heapUsed / 1024 / 1024)}MB</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Active Tasks */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-blue-400" />
                      <span>Active Tasks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      {activeTasks.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-4">No active tasks</p>
                      ) : (
                        <div className="space-y-3">
                          {activeTasks.map((task) => (
                            <div key={task.id} className="flex items-center space-x-3 p-2 rounded bg-gray-800/50">
                              {getStatusIcon(task.status)}
                              <div className="flex-1">
                                <p className="text-sm font-medium truncate">{task.query}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {getTaskTypeIcon(task.type)}
                                  <Badge variant="outline" className="text-xs">
                                    {task.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Results */}
            {completedTasks.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Recent Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {completedTasks.map((task) => (
                        <div key={task.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getTaskTypeIcon(task.type)}
                              <Badge variant="outline">{task.type}</Badge>
                              {task.processingTime && (
                                <Badge variant="outline" className="text-xs">
                                  {task.processingTime}ms
                                </Badge>
                              )}
                            </div>
                            {getStatusIcon(task.status)}
                          </div>
                          
                          <h4 className="font-medium mb-2">{task.query}</h4>
                          
                          {task.result && (
                            <div className="text-sm text-gray-300">
                              {task.result.synthesis && (
                                <div className="mb-2">
                                  <strong className="text-blue-400">Synthesis:</strong>
                                  <p className="mt-1">{task.result.synthesis.substring(0, 200)}...</p>
                                </div>
                              )}
                              
                              {task.result.ragResponse && (
                                <div className="mb-2">
                                  <strong className="text-purple-400">RAG Response:</strong>
                                  <p className="mt-1">{task.result.ragResponse.response.substring(0, 200)}...</p>
                                </div>
                              )}
                              
                              {task.result.scrapedData && (
                                <div className="mb-2">
                                  <strong className="text-emerald-400">Web Data:</strong>
                                  <p className="mt-1">{task.result.scrapedData.length} sources scraped</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Task Monitor Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Processing Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Task queue monitoring will be displayed here</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Task History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Detailed task history and analytics</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            {metricsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-8 bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Requests</p>
                        <p className="text-2xl font-bold">{metrics.data.totalRequests}</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Avg Response Time</p>
                        <p className="text-2xl font-bold">{Math.round(metrics.data.averageResponseTime)}ms</p>
                      </div>
                      <Clock className="h-8 w-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Success Rate</p>
                        <p className="text-2xl font-bold">{(metrics.data.successRate * 100).toFixed(1)}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">System Health</p>
                        <p className="text-2xl font-bold">{(metrics.data.systemHealth * 100).toFixed(1)}%</p>
                      </div>
                      <Shield className="h-8 w-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Advanced settings for the Smart Agentic AI Orchestrator
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Configuration options will be available here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}