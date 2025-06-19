import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiRequest } from '@/lib/queryClient';
import { 
  Brain, 
  Activity, 
  Target, 
  TrendingUp, 
  Eye, 
  Zap,
  BarChart3,
  PieChart,
  Network,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  score: number;
  emotional_intensity: number;
  emotional_breakdown: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    surprise: number;
    disgust: number;
    trust: number;
    anticipation: number;
  };
  contextual_insights: {
    sarcasm_detected: boolean;
    urgency_level: number;
    formality_level: number;
    cultural_sensitivity: number;
  };
  amma2amma_consensus: {
    models_agreement: number;
    ensemble_confidence: number;
    reliability_score: number;
  };
}

interface AnalysisResult {
  success: boolean;
  analysis: SentimentAnalysis;
  metadata: {
    processing_time_ms: number;
    models_used: string[];
    accuracy_estimation: number;
  };
  amma2amma_enabled: boolean;
}

export default function EnhancedSentimentAnalysis() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (inputText: string) => {
      const response = await fetch('/api/sentiment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    },
    onSuccess: (data: AnalysisResult) => {
      setResult(data);
    },
    onError: (error) => {
      console.error('Sentiment analysis error:', error);
      setResult({
        success: false,
        analysis: null,
        metadata: {
          processing_time_ms: 0,
          models_used: [],
          accuracy_estimation: 0
        },
        amma2amma_enabled: false,
        error: error instanceof Error ? error.message : 'Authentication or API access error occurred'
      } as any);
    }
  });

  const handleAnalyze = () => {
    if (text.trim()) {
      analyzeMutation.mutate(text);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20 border-green-500';
      case 'negative': return 'text-red-400 bg-red-500/20 border-red-500';
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="h-4 w-4" />;
      case 'negative': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joy: 'bg-yellow-500',
      anger: 'bg-red-500',
      fear: 'bg-purple-500',
      sadness: 'bg-blue-500',
      surprise: 'bg-pink-500',
      disgust: 'bg-green-500',
      trust: 'bg-cyan-500',
      anticipation: 'bg-orange-500'
    };
    return colors[emotion] || 'bg-gray-500';
  };

  return (
    <div className="mobile-friendly bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
      <div className="responsive-container responsive-padding">
        {/* Header */}
        <div className="enterprise-nav mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Enhanced Sentiment Analysis
            </h1>
            <p className="responsive-small-text text-slate-300">
              AMMA2AMMA Multi-Model Ensemble for Precise Emotional Intelligence
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500">
              <Brain className="h-3 w-3 mr-1" />
              Multi-AI Ensemble
            </Badge>
            <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-500">
              <Network className="h-3 w-3 mr-1" />
              AMMA2AMMA Protocol
            </Badge>
          </div>
        </div>

        {/* Input Section */}
        <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700 mb-6">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-white flex items-center gap-2 responsive-text">
              <Eye className="h-5 w-5" />
              Text Analysis Input
            </CardTitle>
          </CardHeader>
          <CardContent className="form-responsive">
            <Textarea
              placeholder="Enter text for sentiment analysis..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="enterprise-input bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 mb-4"
              rows={4}
            />
            <Button
              onClick={handleAnalyze}
              disabled={!text.trim() || analyzeMutation.isPending}
              className="enterprise-button bg-purple-600 hover:bg-purple-700"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Activity className="animate-spin h-4 w-4 mr-2" />
                  Analyzing with AMMA2AMMA...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Sentiment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display Section */}
        {result && !result.success && (
          <Card className="enterprise-mobile-card bg-red-900/20 border-red-500/30 mb-6">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                API Service Unavailable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-red-300">
                  AMMA2AMMA Sentiment Analysis requires valid API credentials to function properly.
                </p>
                <div className="bg-red-950/50 rounded-lg p-4">
                  <h4 className="text-red-200 font-semibold mb-2">Required API Keys:</h4>
                  <ul className="list-disc list-inside text-red-300 space-y-1">
                    <li>ANTHROPIC_API_KEY (with Claude access)</li>
                    <li>OPENAI_API_KEY (with GPT-4o permissions)</li>
                    <li>GOOGLE_API_KEY (with Gemini access)</li>
                  </ul>
                </div>
                <p className="text-red-400 text-sm">
                  Please verify all API keys are properly configured with sufficient permissions and try again.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {result && result.success && (
          <div className="space-y-6">
            {/* Main Results Card */}
            <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analysis Results
                  </span>
                  <Badge variant="outline" className={getSentimentColor(result.analysis.sentiment)}>
                    {getSentimentIcon(result.analysis.sentiment)}
                    <span className="ml-1 capitalize">{result.analysis.sentiment}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid-mobile gap-4">
                {/* Primary Metrics */}
                <div className="col-span-full">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(result.analysis.score)}%
                      </div>
                      <div className="text-sm text-slate-400">Confidence Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {Math.round(result.analysis.emotional_intensity * 100)}%
                      </div>
                      <div className="text-sm text-slate-400">Emotional Intensity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {Math.round(result.analysis.amma2amma_consensus.models_agreement * 100)}%
                      </div>
                      <div className="text-sm text-slate-400">Model Agreement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {Math.round(result.metadata.accuracy_estimation * 100)}%
                      </div>
                      <div className="text-sm text-slate-400">Accuracy Est.</div>
                    </div>
                  </div>
                </div>

                {/* Confidence Progress */}
                <div className="col-span-full">
                  <div className="mb-2 text-sm text-slate-300">
                    Overall Confidence: {Math.round(result.analysis.confidence * 100)}%
                  </div>
                  <Progress 
                    value={result.analysis.confidence * 100} 
                    className="h-3 bg-slate-700"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="emotions" className="w-full">
              <TabsList className="grid-mobile bg-slate-800 border-slate-700">
                <TabsTrigger value="emotions" className="tab-mobile text-white data-[state=active]:bg-purple-600">
                  <PieChart className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Emotional Breakdown</span>
                  <span className="sm:hidden">Emotions</span>
                </TabsTrigger>
                <TabsTrigger value="context" className="tab-mobile text-white data-[state=active]:bg-cyan-600">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Contextual Insights</span>
                  <span className="sm:hidden">Context</span>
                </TabsTrigger>
                <TabsTrigger value="amma2amma" className="tab-mobile text-white data-[state=active]:bg-green-600">
                  <Network className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">AMMA2AMMA Consensus</span>
                  <span className="sm:hidden">Consensus</span>
                </TabsTrigger>
                <TabsTrigger value="metadata" className="tab-mobile text-white data-[state=active]:bg-orange-600">
                  <Zap className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Processing Data</span>
                  <span className="sm:hidden">Meta</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="emotions" className="mt-4">
                <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Emotional Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(result.analysis.emotional_breakdown).map(([emotion, value]) => (
                        <div key={emotion} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-300 capitalize">{emotion}</span>
                            <span className="text-sm text-white">{Math.round(value * 100)}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getEmotionColor(emotion)}`}
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="context" className="mt-4">
                <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Contextual Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Sarcasm Detection</span>
                      {result.analysis.contextual_insights.sarcasm_detected ? (
                        <Badge variant="outline" className="text-orange-400 bg-orange-500/20 border-orange-500">
                          Detected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-400 bg-green-500/20 border-green-500">
                          None
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Urgency Level</span>
                        <span className="text-white">{Math.round(result.analysis.contextual_insights.urgency_level * 100)}%</span>
                      </div>
                      <Progress value={result.analysis.contextual_insights.urgency_level * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Formality Level</span>
                        <span className="text-white">{Math.round(result.analysis.contextual_insights.formality_level * 100)}%</span>
                      </div>
                      <Progress value={result.analysis.contextual_insights.formality_level * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Cultural Sensitivity</span>
                        <span className="text-white">{Math.round(result.analysis.contextual_insights.cultural_sensitivity * 100)}%</span>
                      </div>
                      <Progress value={result.analysis.contextual_insights.cultural_sensitivity * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amma2amma" className="mt-4">
                <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      AMMA2AMMA Consensus Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-cyan-400">
                          {Math.round(result.analysis.amma2amma_consensus.models_agreement * 100)}%
                        </div>
                        <div className="text-sm text-slate-400">Models Agreement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-400">
                          {Math.round(result.analysis.amma2amma_consensus.ensemble_confidence * 100)}%
                        </div>
                        <div className="text-sm text-slate-400">Ensemble Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-400">
                          {Math.round(result.analysis.amma2amma_consensus.reliability_score * 100)}%
                        </div>
                        <div className="text-sm text-slate-400">Reliability Score</div>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        Multi-Model Validation
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Analysis performed using {result.metadata.models_used.length} AI models with consensus-based validation. 
                        High agreement scores indicate consistent results across all models.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metadata" className="mt-4">
                <Card className="enterprise-mobile-card bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Processing Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-slate-400 text-sm">Processing Time</div>
                        <div className="text-white font-semibold">{result.metadata.processing_time_ms}ms</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Models Used</div>
                        <div className="text-white font-semibold">{result.metadata.models_used.length}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-2">AI Models</div>
                      <div className="flex flex-wrap gap-2">
                        {result.metadata.models_used.map((model, index) => (
                          <Badge key={index} variant="outline" className="text-blue-400 bg-blue-500/20 border-blue-500">
                            {model}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-white font-semibold">AMMA2AMMA Status</span>
                      </div>
                      <div className="text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Multi-model ensemble analysis completed successfully
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}