import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { GoBackButton } from '@/components/ui/go-back-button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Shield, 
  Brain, 
  Settings, 
  Activity,
  TrendingUp,
  Lightbulb,
  RotateCcw,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface ErrorContext {
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  component?: string;
  timestamp: Date;
  userAction?: string;
  systemState?: any;
}

interface RecoveryStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'moderate' | 'advanced';
  estimatedTime: string;
  riskLevel: 'low' | 'medium' | 'high';
  successProbability: number;
  automated: boolean;
  requiresRestart: boolean;
}

interface ErrorAnalysis {
  errorCategory: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  rootCause: string;
  confidence: number;
  affectedSystems: string[];
  possibleTriggers: string[];
  recoveryStrategies: RecoveryStrategy[];
  preventionMeasures: string[];
  learningInsights: string[];
  aiAnalysis: string;
  recommendations: string[];
}

const AIErrorRecoveryAssistant = () => {
  const [errorInput, setErrorInput] = useState('');
  const [componentInput, setComponentInput] = useState('');
  const [userActionInput, setUserActionInput] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');
  const [analysisResult, setAnalysisResult] = useState<ErrorAnalysis | null>(null);
  const [recoveryProgress, setRecoveryProgress] = useState<{ [key: string]: number }>({});
  const [automatedRecoveryActive, setAutomatedRecoveryActive] = useState(false);

  // Error history query
  const { data: errorHistory } = useQuery({
    queryKey: ['/api/error-recovery/history'],
    queryFn: () => fetch('/api/error-recovery/history').then(res => res.json()),
    retry: false
  });

  // Error patterns query
  const { data: errorPatterns } = useQuery({
    queryKey: ['/api/error-recovery/patterns'],
    queryFn: () => fetch('/api/error-recovery/patterns').then(res => res.json()),
    retry: false
  });

  // Error analysis mutation
  const analyzeErrorMutation = useMutation({
    mutationFn: async (errorContext: ErrorContext) => {
      const response = await fetch('/api/error-recovery/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorContext)
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      return response.json();
    },
    onSuccess: (result: ErrorAnalysis) => {
      setAnalysisResult(result);
      setActiveTab('strategies');
    },
    onError: (error) => {
      console.error('Error analysis failed:', error);
    }
  });

  // Automated recovery mutation
  const automatedRecoveryMutation = useMutation({
    mutationFn: async ({ strategy, errorContext }: { strategy: RecoveryStrategy, errorContext: ErrorContext }) => {
      const response = await fetch('/api/error-recovery/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy, errorContext })
      });
      
      if (!response.ok) {
        throw new Error('Recovery execution failed');
      }
      
      return response.json();
    },
    onSuccess: (result) => {
      console.log('Automated recovery result:', result);
    }
  });

  const handleAnalyzeError = () => {
    if (!errorInput.trim()) return;

    const errorContext: ErrorContext = {
      errorType: determineErrorType(errorInput),
      errorMessage: errorInput,
      component: componentInput || undefined,
      timestamp: new Date(),
      userAction: userActionInput || undefined
    };

    analyzeErrorMutation.mutate(errorContext);
  };

  const determineErrorType = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('authentication') || lowerMessage.includes('401')) {
      return 'authentication_error';
    } else if (lowerMessage.includes('network') || lowerMessage.includes('connection')) {
      return 'network_error';
    } else if (lowerMessage.includes('validation') || lowerMessage.includes('400')) {
      return 'validation_error';
    } else if (lowerMessage.includes('server') || lowerMessage.includes('500')) {
      return 'server_error';
    }
    
    return 'general_error';
  };

  const executeAutomatedRecovery = (strategy: RecoveryStrategy) => {
    if (!strategy.automated || !analysisResult) return;

    const errorContext: ErrorContext = {
      errorType: determineErrorType(errorInput),
      errorMessage: errorInput,
      component: componentInput,
      timestamp: new Date(),
      userAction: userActionInput
    };

    setAutomatedRecoveryActive(true);
    setRecoveryProgress({ [strategy.id]: 0 });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setRecoveryProgress(prev => {
        const current = prev[strategy.id] || 0;
        if (current >= 100) {
          clearInterval(progressInterval);
          setAutomatedRecoveryActive(false);
          return prev;
        }
        return { ...prev, [strategy.id]: current + 10 };
      });
    }, 500);

    automatedRecoveryMutation.mutate({ strategy, errorContext });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <GoBackButton />
          <div></div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AI Error Recovery Assistant
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                Intelligent Error Analysis & Automated Recovery Solutions
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Auto-Recovery
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Analyze Error
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Recovery Strategies
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Monitor & Track
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Insights & Learning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Error Analysis Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Error Message</label>
                  <Textarea
                    placeholder="Paste the error message or describe the issue you're experiencing..."
                    value={errorInput}
                    onChange={(e) => setErrorInput(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Component (Optional)</label>
                    <Input
                      placeholder="e.g., Smart AI Assistant, Login Page"
                      value={componentInput}
                      onChange={(e) => setComponentInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">User Action (Optional)</label>
                    <Input
                      placeholder="e.g., Clicked submit button, Sent message"
                      value={userActionInput}
                      onChange={(e) => setUserActionInput(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyzeError}
                  disabled={!errorInput.trim() || analyzeErrorMutation.isPending}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  {analyzeErrorMutation.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Error...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Error with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {analysisResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 ${getSeverityColor(analysisResult.severity)} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm text-gray-600">Severity</div>
                      <div className="font-semibold capitalize">{analysisResult.severity}</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm text-gray-600">Confidence</div>
                      <div className="font-semibold">{Math.round(analysisResult.confidence * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm text-gray-600">Strategies</div>
                      <div className="font-semibold">{analysisResult.recoveryStrategies.length}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Root Cause Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300">{analysisResult.rootCause}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">AI Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300">{analysisResult.aiAnalysis}</p>
                  </div>

                  {analysisResult.affectedSystems.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Affected Systems</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.affectedSystems.map((system, index) => (
                          <Badge key={index} variant="outline">{system}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            {analysisResult?.recoveryStrategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {strategy.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(strategy.priority)}>
                        {strategy.priority.toUpperCase()}
                      </Badge>
                      {strategy.automated && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Zap className="w-3 h-3 mr-1" />
                          AUTO
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">{strategy.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Difficulty:</span>
                      <div className="font-medium capitalize">{strategy.difficulty}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Est. Time:</span>
                      <div className="font-medium">{strategy.estimatedTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Success Rate:</span>
                      <div className="font-medium">{Math.round(strategy.successProbability * 100)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Risk Level:</span>
                      <div className={`font-medium capitalize ${getRiskColor(strategy.riskLevel)}`}>
                        {strategy.riskLevel}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Recovery Steps:</h5>
                    <ol className="list-decimal list-inside space-y-1">
                      {strategy.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{step}</li>
                      ))}
                    </ol>
                  </div>

                  {recoveryProgress[strategy.id] !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Recovery Progress</span>
                        <span className="text-sm text-gray-500">{recoveryProgress[strategy.id]}%</span>
                      </div>
                      <Progress value={recoveryProgress[strategy.id]} className="w-full" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    {strategy.automated && (
                      <Button
                        onClick={() => executeAutomatedRecovery(strategy)}
                        disabled={automatedRecoveryActive || automatedRecoveryMutation.isPending}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        {automatedRecoveryActive ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Execute Automatically
                          </>
                        )}
                      </Button>
                    )}
                    <Button variant="outline">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Manual Instructions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Health Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">System Status</div>
                    <div className="font-semibold text-green-600">Healthy</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <RotateCcw className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Recovery Actions</div>
                    <div className="font-semibold">{errorHistory?.length || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">Uptime</div>
                    <div className="font-semibold">99.9%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {errorHistory && errorHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Error History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {errorHistory.slice(0, 5).map((error: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{error.errorType}</div>
                          <div className="text-sm text-gray-600">{error.timestamp}</div>
                        </div>
                        <Badge className={error.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {error.resolved ? 'Resolved' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Learning Insights & Prevention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult?.preventionMeasures && (
                  <div>
                    <h4 className="font-semibold mb-2">Prevention Measures</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.preventionMeasures.map((measure, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{measure}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult?.learningInsights && (
                  <div>
                    <h4 className="font-semibold mb-2">Learning Insights</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.learningInsights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult?.recommendations && (
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {errorPatterns && (
              <Card>
                <CardHeader>
                  <CardTitle>Common Error Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(errorPatterns).map(([pattern, data]: [string, any]) => (
                      <div key={pattern} className="p-3 border rounded-lg">
                        <div className="font-medium capitalize">{pattern.replace('_', ' ')}</div>
                        <div className="text-sm text-gray-600 mt-1">{data.category}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Common causes: {data.commonCauses?.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIErrorRecoveryAssistant;