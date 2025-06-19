import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Target, Brain, Eye, Zap, Shield, TrendingUp, Users, MapPin, Clock, Activity, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface OpsProtocolXTarget {
  targetId: string;
  targetType: 'company' | 'person' | 'market' | 'competitor' | 'infrastructure' | 'supply_chain';
  primaryIdentifier: string;
  secondaryIdentifiers: string[];
  globalContext: boolean;
  geographicScope: string[];
  priorityLevel: 'critical' | 'high' | 'medium' | 'low';
  securityClearance: 'public' | 'confidential' | 'secret' | 'top_secret';
  operationalComplexity: 'standard' | 'advanced' | 'enterprise' | 'strategic';
}

interface IntelligenceLayer {
  layerId: string;
  layerName: string;
  dataType: 'surface' | 'deep' | 'dark' | 'predictive';
  sources: string[];
  reliability: number;
  processingTime: number;
  aiEnhanced: boolean;
}

interface OpsProtocolXResult {
  targetId: string;
  executionTime: number;
  totalDataPoints: number;
  intelligenceLayers: IntelligenceLayer[];
  consolidatedProfile: any;
  actionableInsights: string[];
  recommendedActions: string[];
  confidenceScore: number;
  nextProtocolSteps: string[];
}

export default function OpsProtocolX() {
  const [target, setTarget] = useState<Partial<OpsProtocolXTarget>>({
    targetType: 'company',
    globalContext: true,
    geographicScope: ['malaysia', 'singapore', 'usa', 'europe'],
    priorityLevel: 'high',
    securityClearance: 'confidential',
    operationalComplexity: 'enterprise',
    secondaryIdentifiers: []
  });
  
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [operationResults, setOperationResults] = useState<OpsProtocolXResult | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenOrientation, setScreenOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('overview');

  // Detect screen orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      setScreenOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    handleOrientationChange(); // Initial check
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Execute OpsProtocolX
  const executeProtocolMutation = useMutation({
    mutationFn: async (targetData: OpsProtocolXTarget) => {
      const response = await fetch('/api/ops-protocol-x/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetData)
      });
      
      if (!response.ok) {
        throw new Error('OpsProtocolX execution failed');
      }
      
      return response.json();
    },
    onSuccess: (result) => {
      setOperationResults(result);
      setActiveOperation(null);
    },
    onError: (error) => {
      console.error('Protocol execution error:', error);
      setActiveOperation(null);
    }
  });

  // Get active operations status
  const { data: operationsStatus } = useQuery({
    queryKey: ['/api/ops-protocol-x/status'],
    refetchInterval: 2000,
    enabled: !!activeOperation
  });

  const handleExecuteProtocol = () => {
    if (!target.primaryIdentifier) return;
    
    const fullTarget: OpsProtocolXTarget = {
      targetId: `TARGET-${Date.now()}`,
      targetType: target.targetType || 'company',
      primaryIdentifier: target.primaryIdentifier,
      secondaryIdentifiers: target.secondaryIdentifiers || [],
      globalContext: target.globalContext || true,
      geographicScope: target.geographicScope || ['global'],
      priorityLevel: target.priorityLevel || 'medium',
      securityClearance: target.securityClearance || 'confidential',
      operationalComplexity: target.operationalComplexity || 'enterprise'
    };

    setActiveOperation(fullTarget.targetId);
    executeProtocolMutation.mutate(fullTarget);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getLayerIcon = (dataType: string) => {
    switch (dataType) {
      case 'surface': return <Eye className="h-4 w-4" />;
      case 'deep': return <Brain className="h-4 w-4" />;
      case 'dark': return <Shield className="h-4 w-4" />;
      case 'predictive': return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
      ${screenOrientation === 'portrait' ? 'p-3 sm:p-4 md:p-6' : 'p-2 sm:p-3 md:p-4'}`}>
      <div className={`w-full mx-auto space-y-3 sm:space-y-4 md:space-y-6 
        ${screenOrientation === 'landscape' ? 'max-w-full' : 'max-w-7xl'}`}>
        
        {/* Mobile-Responsive Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className={`font-bold text-white mb-1 sm:mb-2 
              ${screenOrientation === 'landscape' ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
              OpsProtocolX
            </h1>
            <p className="text-slate-300 text-sm sm:text-base hidden sm:block">
              Global Intelligence & Market Research Platform
            </p>
            <p className="text-slate-300 text-xs sm:hidden">
              Global Intelligence
            </p>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {/* Desktop Badges */}
            <div className="hidden sm:flex items-center gap-2 md:gap-4">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500 text-xs">
                <Target className="h-3 w-3 mr-1" />
                Malaysian Focus
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500 text-xs">
                <Brain className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-slate-700">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500 text-xs">
                <Target className="h-3 w-3 mr-1" />
                Malaysian Focus
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500 text-xs">
                <Brain className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
            <p className="text-slate-300 text-sm">
              Advanced Intelligence Scraping & Analysis System
            </p>
          </div>
        )}

        {/* Mobile-Responsive Target Configuration */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              Target Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className={`grid gap-3 sm:gap-4 
              ${screenOrientation === 'landscape' 
                ? 'grid-cols-2 lg:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="targetType" className="text-slate-300">Target Type</Label>
                <Select 
                  value={target.targetType} 
                  onValueChange={(value) => setTarget({...target, targetType: value as any})}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="person">Person</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="competitor">Competitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-slate-300">Priority Level</Label>
                <Select 
                  value={target.priorityLevel} 
                  onValueChange={(value) => setTarget({...target, priorityLevel: value as any})}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Malaysian Context
                </Label>
                <Select 
                  value={target.malaysianContext ? 'yes' : 'no'} 
                  onValueChange={(value) => setTarget({...target, malaysianContext: value === 'yes'})}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Malaysian Focus</SelectItem>
                    <SelectItem value="no">Global Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Execute Protocol</Label>
                <Button 
                  onClick={handleExecuteProtocol}
                  disabled={!target.primaryIdentifier || executeProtocolMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {executeProtocolMutation.isPending ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Execute OpsProtocolX
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryTarget" className="text-slate-300">Primary Target Identifier</Label>
              <Input
                id="primaryTarget"
                value={target.primaryIdentifier || ''}
                onChange={(e) => setTarget({...target, primaryIdentifier: e.target.value})}
                placeholder="Company name, domain, or identifier"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryTargets" className="text-slate-300">Secondary Identifiers (Optional)</Label>
              <Textarea
                id="secondaryTargets"
                value={target.secondaryIdentifiers?.join('\n') || ''}
                onChange={(e) => setTarget({...target, secondaryIdentifiers: e.target.value.split('\n').filter(Boolean)})}
                placeholder="Additional identifiers, one per line"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mobile-Responsive Active Operation Status */}
        {activeOperation && (
          <Card className="bg-slate-800/50 border-slate-700 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Operation In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className={`flex items-center justify-between 
                  ${screenOrientation === 'landscape' ? 'flex-row' : 'flex-col sm:flex-row gap-2 sm:gap-0'}`}>
                  <span className="text-slate-300 text-sm sm:text-base truncate">
                    Target: {target.primaryIdentifier}
                  </span>
                  <Badge className={`${getPriorityColor(target.priorityLevel || 'medium')} text-white text-xs`}>
                    {target.priorityLevel?.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-300">Intelligence Gathering Progress</span>
                    <span className="text-slate-300">Processing...</span>
                  </div>
                  <Progress value={65} className="bg-slate-700" />
                </div>
                <div className={`grid gap-2 sm:gap-4 text-xs sm:text-sm
                  ${screenOrientation === 'landscape' ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">Surface</div>
                    <div className="text-slate-300">Scanning...</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">Deep</div>
                    <div className="text-slate-300">Queued</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-semibold">Dark</div>
                    <div className="text-slate-300">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">Predictive</div>
                    <div className="text-slate-300">Waiting</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile-Responsive Operation Results */}
        {operationResults && (
          <div className="space-y-3 sm:space-y-6">
            {/* Mobile-Optimized Results Overview */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">Operation Results: {operationResults.targetId}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-3 sm:gap-4 
                  ${screenOrientation === 'landscape' 
                    ? 'grid-cols-4' 
                    : 'grid-cols-2 sm:grid-cols-4'}`}>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{operationResults.executionTime}ms</div>
                    <div className="text-slate-300 text-xs sm:text-sm">Execution Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-400">{operationResults.totalDataPoints}</div>
                    <div className="text-slate-300 text-xs sm:text-sm">Data Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-400">{operationResults.confidenceScore}%</div>
                    <div className="text-slate-300 text-xs sm:text-sm">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-orange-400">{operationResults.intelligenceLayers.length}</div>
                    <div className="text-slate-300 text-xs sm:text-sm">Layers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-Responsive Intelligence Layers */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                  Intelligence Layers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {operationResults.intelligenceLayers.map((layer) => (
                    <div key={layer.layerId} className="border border-slate-600 rounded-lg p-3 sm:p-4">
                      <div className={`flex items-center justify-between mb-3 
                        ${screenOrientation === 'landscape' ? 'flex-row' : 'flex-col sm:flex-row gap-2 sm:gap-0'}`}>
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          {getLayerIcon(layer.dataType)}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-white font-semibold text-sm sm:text-base truncate">{layer.layerName}</h3>
                            <p className="text-slate-400 text-xs sm:text-sm capitalize">{layer.dataType} Intelligence</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          {layer.aiEnhanced && (
                            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 text-xs">
                              AI Enhanced
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-green-500/20 text-green-300 text-xs">
                            {Math.round(layer.reliability * 100)}% Reliable
                          </Badge>
                        </div>
                      </div>
                      
                      <div className={`grid gap-3 sm:gap-4 mb-3 
                        ${screenOrientation === 'landscape' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                        <div>
                          <div className="text-slate-300 text-xs sm:text-sm mb-1">Processing Time</div>
                          <div className="text-white flex items-center gap-2 text-sm sm:text-base">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            {layer.processingTime}ms
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-300 text-xs sm:text-sm mb-1">Data Sources</div>
                          <div className="text-white text-sm sm:text-base">{layer.sources.length} sources</div>
                        </div>
                      </div>

                      {/* Mobile-Responsive Collapsible Sources */}
                      <div>
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedLayers);
                            if (newExpanded.has(layer.layerId)) {
                              newExpanded.delete(layer.layerId);
                            } else {
                              newExpanded.add(layer.layerId);
                            }
                            setExpandedLayers(newExpanded);
                          }}
                          className="flex items-center justify-between w-full text-left mb-2 hover:bg-slate-700/30 p-1 rounded transition-colors"
                        >
                          <div className="text-slate-300 text-xs sm:text-sm">Sources ({layer.sources.length})</div>
                          {expandedLayers.has(layer.layerId) ? (
                            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                          )}
                        </button>
                        
                        {expandedLayers.has(layer.layerId) ? (
                          <div className="grid gap-1 sm:gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                            {layer.sources.map((source, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs justify-start p-2 break-words">
                                {source.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {layer.sources.slice(0, screenOrientation === 'landscape' ? 4 : 3).map((source, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                                {source.replace(/_/g, ' ').slice(0, 15)}...
                              </Badge>
                            ))}
                            {layer.sources.length > (screenOrientation === 'landscape' ? 4 : 3) && (
                              <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                                +{layer.sources.length - (screenOrientation === 'landscape' ? 4 : 3)} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile-Responsive Detailed Results */}
            <Tabs defaultValue="insights" className="space-y-3 sm:space-y-4">
              <TabsList className={`bg-slate-800 border-slate-700 w-full 
                ${screenOrientation === 'landscape' 
                  ? 'grid grid-cols-4 h-9' 
                  : 'grid grid-cols-2 sm:grid-cols-4 h-auto gap-1 sm:gap-0'}`}>
                <TabsTrigger 
                  value="insights" 
                  className={`data-[state=active]:bg-slate-700 text-xs sm:text-sm 
                    ${screenOrientation === 'landscape' ? 'px-2' : 'px-2 py-2 sm:py-1.5'}`}
                >
                  {screenOrientation === 'landscape' ? 'Insights' : 'Actionable Insights'}
                </TabsTrigger>
                <TabsTrigger 
                  value="actions" 
                  className={`data-[state=active]:bg-slate-700 text-xs sm:text-sm 
                    ${screenOrientation === 'landscape' ? 'px-2' : 'px-2 py-2 sm:py-1.5'}`}
                >
                  {screenOrientation === 'landscape' ? 'Actions' : 'Recommended Actions'}
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className={`data-[state=active]:bg-slate-700 text-xs sm:text-sm 
                    ${screenOrientation === 'landscape' ? 'px-2' : 'px-2 py-2 sm:py-1.5'}`}
                >
                  {screenOrientation === 'landscape' ? 'Profile' : 'Target Profile'}
                </TabsTrigger>
                <TabsTrigger 
                  value="next" 
                  className={`data-[state=active]:bg-slate-700 text-xs sm:text-sm 
                    ${screenOrientation === 'landscape' ? 'px-2' : 'px-2 py-2 sm:py-1.5'}`}
                >
                  {screenOrientation === 'landscape' ? 'Next' : 'Next Steps'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Actionable Intelligence Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {operationResults.actionableInsights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                          <div className="text-blue-400 font-semibold text-sm mt-1">#{index + 1}</div>
                          <div className="text-slate-200">{insight}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {operationResults.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                          <div className="text-green-400 font-semibold text-sm mt-1">▶</div>
                          <div className="text-slate-200">{action}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Consolidated Target Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-white font-semibold mb-2">Profile Summary</h3>
                          <div className="text-slate-300 bg-slate-700/50 p-3 rounded-lg">
                            {operationResults.consolidatedProfile?.intelligenceSummary || 'Comprehensive profile analysis completed'}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-2">Data Quality Metrics</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-300">Total Sources:</span>
                              <span className="text-white">{operationResults.consolidatedProfile?.dataQuality?.totalSources || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">Reliability:</span>
                              <span className="text-white">{Math.round((operationResults.consolidatedProfile?.dataQuality?.averageReliability || 0) * 100)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300">AI Enhancement:</span>
                              <span className="text-white">{Math.round((operationResults.consolidatedProfile?.dataQuality?.aiEnhancementLevel || 0) * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="next">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Next Protocol Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {operationResults.nextProtocolSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                          <div className="text-purple-400 font-semibold text-sm mt-1">{index + 1}.</div>
                          <div className="text-slate-200">{step}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* MMA Commander Status */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              MMA Commander Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-semibold mb-3">Frontend MMA Commanders</h3>
                <div className="space-y-2">
                  {['MMA-FRONTEND-001', 'MMA-FRONTEND-002', 'MMA-FRONTEND-003'].map((commander) => (
                    <div key={commander} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">{commander}</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-300">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Backend MMA Commanders</h3>
                <div className="space-y-2">
                  {['MMA-BACKEND-001', 'MMA-BACKEND-002', 'MMA-BACKEND-003'].map((commander) => (
                    <div key={commander} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                      <span className="text-slate-300">{commander}</span>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300">
                        Operational
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}