import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, Activity, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import { useSpyMode } from './spy-mode-provider';

interface MultiAIRequest {
  prompt: string;
  task_type: 'research' | 'analysis' | 'reconnaissance' | 'creative' | 'technical' | 'strategic';
  complexity: 'basic' | 'advanced' | 'expert' | 'maximum';
  require_consensus?: boolean;
  preferred_providers?: string[];
}

interface AIResponse {
  provider: string;
  model: string;
  response: string;
  confidence: number;
  reasoning: string;
  metadata: {
    tokens_used?: number;
    processing_time: number;
    quality_score: number;
  };
}

interface MultiAIResult {
  task_id: string;
  request: MultiAIRequest;
  responses: AIResponse[];
  consensus_analysis?: {
    agreement_score: number;
    conflicting_points: string[];
    synthesized_result: string;
    confidence_level: number;
  };
  final_recommendation: string;
  processing_summary: {
    total_time: number;
    providers_used: string[];
    total_tokens: number;
    quality_assessment: string;
  };
}

export default function MultiAIInterface() {
  const [request, setRequest] = useState<MultiAIRequest>({
    prompt: '',
    task_type: 'research',
    complexity: 'advanced',
    require_consensus: true,
    preferred_providers: ['anthropic', 'openai', 'gemini']
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<MultiAIResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isSpyMode } = useSpyMode();

  const taskTypes = [
    { id: 'research', name: 'Research', icon: Brain, description: 'Comprehensive analysis and investigation' },
    { id: 'analysis', name: 'Analysis', icon: Target, description: 'Data interpretation and insights' },
    { id: 'reconnaissance', name: 'Reconnaissance', icon: Zap, description: 'Intelligence gathering and assessment' },
    { id: 'creative', name: 'Creative', icon: Activity, description: 'Creative problem solving and ideation' },
    { id: 'technical', name: 'Technical', icon: CheckCircle, description: 'Technical investigation and solutions' },
    { id: 'strategic', name: 'Strategic', icon: Users, description: 'Strategic planning and decision making' }
  ];

  const complexityLevels = [
    { id: 'basic', name: 'Basic', description: 'Quick analysis with single AI' },
    { id: 'advanced', name: 'Advanced', description: 'Multi-AI analysis with comparison' },
    { id: 'expert', name: 'Expert', description: 'Deep analysis with consensus building' },
    { id: 'maximum', name: 'Maximum', description: 'Full multi-AI consensus with synthesis' }
  ];

  const aiProviders = [
    { id: 'anthropic', name: 'Anthropic Claude', model: 'claude-sonnet-4-20250514', color: 'orange' },
    { id: 'openai', name: 'OpenAI GPT', model: 'gpt-4o', color: 'green' },
    { id: 'gemini', name: 'Google Gemini', model: 'gemini-1.5-pro', color: 'blue' }
  ];

  const executeMultiAITask = async () => {
    if (!request.prompt.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/multi-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Multi-AI task failed');
      }

      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const getProviderColor = (provider: string) => {
    const providerColors = {
      anthropic: isSpyMode ? 'text-orange-400' : 'text-orange-500',
      openai: isSpyMode ? 'text-green-400' : 'text-green-500',
      gemini: isSpyMode ? 'text-blue-400' : 'text-blue-500'
    };
    return providerColors[provider as keyof typeof providerColors] || 'text-gray-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return isSpyMode ? 'text-green-400' : 'text-green-500';
    if (confidence >= 0.6) return isSpyMode ? 'text-yellow-400' : 'text-yellow-500';
    return isSpyMode ? 'text-red-400' : 'text-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">MULTI-AI INTELLIGENCE ENGINE</h2>
        <p className="text-gray-300 max-w-4xl mx-auto">
          Harness the combined power of Anthropic Claude, OpenAI GPT-4o, and Google Gemini for 
          unparalleled intelligence analysis and strategic insights.
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
        <h3 className="text-2xl font-bold text-white mb-6">MISSION CONFIGURATION</h3>
        
        {/* Task Input */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-3">INTELLIGENCE QUERY</label>
          <textarea
            value={request.prompt}
            onChange={(e) => setRequest({ ...request, prompt: e.target.value })}
            placeholder="Enter your intelligence query or research request..."
            className="w-full bg-black/50 border border-gray-600 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 h-32 resize-none"
          />
        </div>

        {/* Task Type Selection */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-3">MISSION TYPE</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {taskTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRequest({ ...request, task_type: type.id as any })}
                  className={`p-4 rounded-lg border transition-all ${
                    request.task_type === type.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-cyan-500'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-bold text-sm">{type.name}</div>
                  <div className="text-xs opacity-75">{type.description}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Complexity Level */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-3">ANALYSIS DEPTH</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {complexityLevels.map((level) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRequest({ ...request, complexity: level.id as any })}
                className={`p-4 rounded-lg border transition-all ${
                  request.complexity === level.id
                    ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                    : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-purple-500'
                }`}
              >
                <div className="font-bold text-sm">{level.name}</div>
                <div className="text-xs opacity-75">{level.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Provider Selection */}
        <div className="mb-6">
          <label className="block text-white font-bold mb-3">AI PROVIDERS</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiProviders.map((provider) => (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  const newProviders = request.preferred_providers?.includes(provider.id)
                    ? request.preferred_providers.filter(p => p !== provider.id)
                    : [...(request.preferred_providers || []), provider.id];
                  setRequest({ ...request, preferred_providers: newProviders });
                }}
                className={`p-4 rounded-lg border transition-all ${
                  request.preferred_providers?.includes(provider.id)
                    ? `bg-${provider.color}-500/20 border-${provider.color}-400 text-${provider.color}-400`
                    : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-cyan-500'
                }`}
              >
                <div className="font-bold">{provider.name}</div>
                <div className="text-sm opacity-75">{provider.model}</div>
                {request.preferred_providers?.includes(provider.id) && (
                  <CheckCircle className="w-5 h-5 mx-auto mt-2" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="mb-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={request.require_consensus}
              onChange={(e) => setRequest({ ...request, require_consensus: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 bg-black text-cyan-400 focus:ring-cyan-400"
            />
            <span className="text-white font-bold">Require AI Consensus Analysis</span>
          </label>
        </div>

        {/* Execute Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={executeMultiAITask}
          disabled={isProcessing || !request.prompt.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>PROCESSING MULTI-AI ANALYSIS...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>EXECUTE MULTI-AI ANALYSIS</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">Analysis Error: {error}</span>
          </div>
        </motion.div>
      )}

      {/* Results Display */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Results Header */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white">MULTI-AI ANALYSIS COMPLETE</h3>
                <div className="text-green-400 font-mono text-sm">
                  Task ID: {results.task_id}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold">Processing Time</div>
                  <div className="text-white text-2xl">{results.processing_summary.total_time}ms</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold">Providers Used</div>
                  <div className="text-white text-2xl">{results.processing_summary.providers_used.length}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold">Total Tokens</div>
                  <div className="text-white text-2xl">{results.processing_summary.total_tokens}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-green-400 font-bold">Quality Assessment</div>
                  <div className="text-white text-2xl">{results.processing_summary.quality_assessment}</div>
                </div>
              </div>
            </div>

            {/* Individual AI Responses */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30">
              <h4 className="text-2xl font-bold text-white mb-6">AI PROVIDER RESPONSES</h4>
              <div className="space-y-6">
                {results.responses.map((response, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className={`font-bold text-lg ${getProviderColor(response.provider)}`}>
                          {response.provider.toUpperCase()} - {response.model}
                        </div>
                        <div className="text-gray-400 text-sm">{response.reasoning}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getConfidenceColor(response.confidence)}`}>
                          {(response.confidence * 100).toFixed(1)}% Confidence
                        </div>
                        <div className="text-gray-400 text-sm">
                          Quality: {response.metadata.quality_score.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-white leading-relaxed whitespace-pre-wrap">
                      {response.response}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consensus Analysis */}
            {results.consensus_analysis && (
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
                <h4 className="text-2xl font-bold text-white mb-6">CONSENSUS ANALYSIS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4">
                      <div className="text-purple-400 font-bold">Agreement Score</div>
                      <div className="text-white text-3xl">
                        {(results.consensus_analysis.agreement_score * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold mb-2">Conflicting Points</div>
                      <ul className="space-y-1">
                        {results.consensus_analysis.conflicting_points.map((point, i) => (
                          <li key={i} className="text-yellow-400 text-sm">• {point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold mb-3">Synthesized Result</div>
                    <div className="text-white leading-relaxed">
                      {results.consensus_analysis.synthesized_result}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Final Recommendation */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
              <h4 className="text-2xl font-bold text-white mb-6">FINAL RECOMMENDATION</h4>
              <div className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                {results.final_recommendation}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}