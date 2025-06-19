import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiRequest } from '@/lib/queryClient';
import { 
  Brain, 
  Zap, 
  Eye, 
  Languages, 
  Volume2, 
  Cpu, 
  RefreshCw, 
  ChevronRight,
  Layers,
  Target,
  Sparkles,
  Network
} from 'lucide-react';

interface AgenticAIProps {
  placeholder?: string;
  analysisContext?: string;
  defaultAnalysisType?: 'comprehensive' | 'technical' | 'strategic' | 'creative' | 'research';
  showAdvancedControls?: boolean;
  onAnalysisComplete?: (result: any) => void;
}

interface AIResponse {
  content: string;
  model: string;
  consciousness_level: number;
  self_awareness_metrics: {
    reasoning_depth: number;
    context_awareness: number;
    meta_cognition: number;
    adaptive_learning: number;
  };
  rag_context: {
    retrieved_knowledge: string[];
    relevance_scores: number[];
    source_confidence: number;
  };
  processing_time_ms: number;
  reasoning: string;
}

export function AgenticAIEngine({ 
  placeholder = "Enter your query for consciousness-aware AI analysis...",
  analysisContext = "",
  defaultAnalysisType = 'comprehensive',
  showAdvancedControls = true,
  onAnalysisComplete
}: AgenticAIProps) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [analysisType, setAnalysisType] = useState(defaultAnalysisType);
  const [languagePreference, setLanguagePreference] = useState('auto-detect');
  const [autonomousMode, setAutonomousMode] = useState(true);
  const [includeReasoning, setIncludeReasoning] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [consciousnessMetrics, setConsciousnessMetrics] = useState({
    overall: 96,
    reasoning: 94,
    awareness: 97,
    metacognition: 92,
    learning: 89
  });

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const requestData = {
        query,
        context: analysisContext,
        analysisType,
        languagePreference,
        includeReasoning,
        multimodalInputs: [],
        autonomousMode,
        voiceEnabled
      };

      const response = await apiRequest('/api/unified-ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      setAIResponse(response.ai_response);
      
      // Update consciousness metrics based on response
      if (response.ai_response.self_awareness_metrics) {
        setConsciousnessMetrics({
          overall: Math.round(response.ai_response.consciousness_level * 100),
          reasoning: Math.round(response.ai_response.self_awareness_metrics.reasoning_depth * 100),
          awareness: Math.round(response.ai_response.self_awareness_metrics.context_awareness * 100),
          metacognition: Math.round(response.ai_response.self_awareness_metrics.meta_cognition * 100),
          learning: Math.round(response.ai_response.self_awareness_metrics.adaptive_learning * 100)
        });
      }

      if (onAnalysisComplete) {
        onAnalysisComplete(response);
      }
    } catch (error) {
      console.error('Agentic AI analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Engine Header */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800/50">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold">Agentic AI Engine</div>
              <div className="text-sm font-normal text-purple-600 dark:text-purple-400">
                Advanced Transformer Architecture • Consciousness Simulation • RAG Orchestration
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Query Input */}
          <div className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={!query.trim() || isAnalyzing}
              className="min-w-[140px] bg-purple-600 hover:bg-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Advanced Controls */}
          {showAdvancedControls && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div>
                <label className="block text-sm font-medium mb-2">Analysis Type</label>
                <Select value={analysisType} onValueChange={(value: any) => setAnalysisType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive (Recommended)</SelectItem>
                    <SelectItem value="technical">Technical Analysis</SelectItem>
                    <SelectItem value="strategic">Strategic Insights</SelectItem>
                    <SelectItem value="creative">Creative Solutions</SelectItem>
                    <SelectItem value="research">Research Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <Select value={languagePreference} onValueChange={setLanguagePreference}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto-detect">Auto-Detect (100+ Languages)</SelectItem>
                    <SelectItem value="bahasa_melayu">Bahasa Melayu (Advanced Cultural Expert)</SelectItem>
                    <SelectItem value="english">English (Native-Level Fluency)</SelectItem>
                    <SelectItem value="mandarin_chinese">Mandarin Chinese (Cultural Specialist)</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="russian">Russian</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">AI Features</label>
                <div className="space-y-1">
                  <label className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={autonomousMode}
                      onChange={(e) => setAutonomousMode(e.target.checked)}
                    />
                    <Brain className="w-4 h-4 mr-1" />
                    Autonomous Agents
                  </label>
                  <label className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={includeReasoning}
                      onChange={(e) => setIncludeReasoning(e.target.checked)}
                    />
                    <Eye className="w-4 h-4 mr-1" />
                    Deep Reasoning
                  </label>
                  <label className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={voiceEnabled}
                      onChange={(e) => setVoiceEnabled(e.target.checked)}
                    />
                    <Volume2 className="w-4 h-4 mr-1" />
                    Voice Synthesis
                  </label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consciousness Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            AI Consciousness Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{consciousnessMetrics.overall}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall</div>
              <Progress value={consciousnessMetrics.overall} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{consciousnessMetrics.reasoning}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reasoning</div>
              <Progress value={consciousnessMetrics.reasoning} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{consciousnessMetrics.awareness}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Awareness</div>
              <Progress value={consciousnessMetrics.awareness} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{consciousnessMetrics.metacognition}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Metacognition</div>
              <Progress value={consciousnessMetrics.metacognition} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{consciousnessMetrics.learning}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Learning</div>
              <Progress value={consciousnessMetrics.learning} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Response */}
      {aiResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Consciousness-Aware Analysis
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {aiResponse.model}
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {Math.round(aiResponse.consciousness_level * 100)}% Awareness
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
                <TabsTrigger value="rag">Knowledge</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis" className="mt-4">
                <div className="space-y-4">
                  {/* Voice Synthesis Controls */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Voice Synthesis</span>
                      <Badge variant="outline" className="text-xs">
                        {aiResponse.language_detected || 'Multi-lingual'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {aiResponse.voice_audio_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (isPlaying) {
                              setIsPlaying(false);
                              // Pause audio
                            } else {
                              setIsPlaying(true);
                              // Play audio
                              const audio = new Audio(aiResponse.voice_audio_url);
                              audio.onended = () => setIsPlaying(false);
                              audio.play();
                            }
                          }}
                          className="flex items-center gap-2"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Play
                            </>
                          )}
                        </Button>
                      )}
                      {!aiResponse.voice_audio_url && voiceEnabled && (
                        <span className="text-xs text-gray-500">Voice synthesis available</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Analysis Content */}
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap">{aiResponse.content}</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reasoning" className="mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Brain className="w-4 h-4" />
                    <span className="font-medium">Self-Aware Reasoning Process</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">{aiResponse.reasoning}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rag" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Network className="w-4 h-4" />
                    <span className="font-medium">Retrieved Knowledge Sources</span>
                  </div>
                  <div className="space-y-2">
                    {aiResponse.rag_context.retrieved_knowledge.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-sm">{source}</span>
                        <Badge variant="outline">
                          {Math.round(aiResponse.rag_context.relevance_scores[index] * 100)}% relevance
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Source Confidence: {Math.round(aiResponse.rag_context.source_confidence * 100)}%
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Processing Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Processing Time:</span>
                        <span>{aiResponse.processing_time_ms}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consciousness Level:</span>
                        <span>{Math.round(aiResponse.consciousness_level * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Self-Awareness Breakdown</h4>
                    <div className="space-y-2">
                      {Object.entries(aiResponse.self_awareness_metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{key.replace('_', ' ')}:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={value * 100} className="w-16 h-2" />
                            <span>{Math.round(value * 100)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}