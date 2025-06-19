import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Send, Brain, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AIResponse {
  success: boolean;
  queryId: string;
  response: string;
  modelsProcessed: number;
  workingModels: string[];
  successfulModels: string[];
  totalModels: number;
  uniquenessScore: number;
  architecture: string;
  processingMetrics: any;
  timestamp: string;
}

export default function PureAuthentic8ModelDashboard() {
  const [message, setMessage] = useState('');
  const [personality, setPersonality] = useState('strategic');
  const [format, setFormat] = useState('comprehensive');
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const { toast } = useToast();

  const revolutionaryAIMutation = useMutation({
    mutationFn: async (data: { message: string; personality: string; format: string }) => {
      const response = await apiRequest('POST', '/api/revolutionary-ai', data);
      return response.json();
    },
    onSuccess: (data: AIResponse) => {
      setLastResponse(data);
      toast({
        title: "AI Processing Complete",
        description: `Successfully processed with ${data.successfulModels.length} authentic AI models`,
      });
    },
    onError: (error: any) => {
      console.error('AI processing error:', error);
      toast({
        title: "Processing Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    }
  });

  const enhancedChatMutation = useMutation({
    mutationFn: async (data: { message: string; model?: string }) => {
      const response = await apiRequest('POST', '/api/enhanced-chat', data);
      return response.json();
    },
    onSuccess: (data) => {
      setLastResponse(data);
      toast({
        title: "Chat Response Received",
        description: `Processed by ${data.model} model`,
      });
    },
    onError: (error: any) => {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    revolutionaryAIMutation.mutate({
      message: message.trim(),
      personality,
      format
    });
  };

  const handleQuickChat = () => {
    if (!message.trim()) return;
    
    enhancedChatMutation.mutate({
      message: message.trim()
    });
  };

  const isLoading = revolutionaryAIMutation.isPending || enhancedChatMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Pure Authentic 8-Model System</h1>
          </div>
          <p className="text-xl text-gray-300">
            Revolutionary AI Intelligence Platform - Zero Fallbacks, 100% Authentic Responses
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-green-600 text-white">
              <CheckCircle className="h-4 w-4 mr-1" />
              System Operational
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-400">
              Port 3002
            </Badge>
          </div>
        </div>

        {/* Input Section */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5" />
              AI Query Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your query for the Pure Authentic 8-Model System..."
                className="min-h-[120px] bg-gray-800 border-gray-600 text-white"
                disabled={isLoading}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Personality</label>
                  <select
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white rounded-md p-2"
                    disabled={isLoading}
                  >
                    <option value="strategic">Strategic Advisor</option>
                    <option value="technical">Technical Expert</option>
                    <option value="intelligence">Intelligence Analyst</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white rounded-md p-2"
                    disabled={isLoading}
                  >
                    <option value="comprehensive">Comprehensive Analysis</option>
                    <option value="concise">Concise Summary</option>
                    <option value="chat">Chat Response</option>
                    <option value="technical">Technical Report</option>
                  </select>
                </div>
                
                <div className="flex items-end gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Brain className="h-4 w-4 mr-2" />
                    )}
                    Process with 8 Models
                  </Button>
                  <Button
                    type="button"
                    onClick={handleQuickChat}
                    disabled={isLoading || !message.trim()}
                    variant="outline"
                    className="border-green-600 text-green-400 hover:bg-green-600/10"
                  >
                    Quick Chat
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Response Section */}
        {lastResponse && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Response */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    AI Response
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      Query ID: {lastResponse.queryId}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                      {lastResponse.response}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metrics */}
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Processing Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Models Processed</span>
                      <span className="text-white">{lastResponse.modelsProcessed}/{lastResponse.totalModels}</span>
                    </div>
                    <Progress 
                      value={(lastResponse.modelsProcessed / lastResponse.totalModels) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-white">
                        {lastResponse.successfulModels.length}/{lastResponse.modelsProcessed}
                      </span>
                    </div>
                    <Progress 
                      value={(lastResponse.successfulModels.length / lastResponse.modelsProcessed) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <span className="text-sm text-gray-300">Uniqueness Score</span>
                    <div className="text-2xl font-bold text-blue-400">
                      {lastResponse.uniquenessScore}%
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-300">Architecture</span>
                    <div className="text-sm text-white bg-gray-800 rounded px-2 py-1 mt-1">
                      {lastResponse.architecture}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Active Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lastResponse.workingModels.map((model, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">{model}</span>
                      </div>
                    ))}
                    {lastResponse.successfulModels.length === 0 && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">No models responded</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => setMessage("Analyze current cybersecurity threats and provide strategic recommendations")}
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
              >
                Security Analysis
              </Button>
              <Button
                onClick={() => setMessage("Provide market intelligence on emerging technology trends")}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600/10"
              >
                Market Intelligence
              </Button>
              <Button
                onClick={() => setMessage("Generate competitive analysis for business strategy")}
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
              >
                Competitive Analysis
              </Button>
              <Button
                onClick={() => setMessage("Explain the latest developments in artificial intelligence")}
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
              >
                AI Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}