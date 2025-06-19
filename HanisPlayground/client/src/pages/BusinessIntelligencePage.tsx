/**
 * Business Intelligence Page - Modular business analysis interface
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function BusinessIntelligencePage() {
  const [company, setCompany] = useState('');
  const [analysisType, setAnalysisType] = useState('competitive-analysis');
  const [model, setModel] = useState('cohere');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analysisTypes = [
    { value: 'competitive-analysis', label: 'Competitive Analysis' },
    { value: 'market-position', label: 'Market Position' },
    { value: 'swot-analysis', label: 'SWOT Analysis' },
    { value: 'financial-health', label: 'Financial Health' },
    { value: 'strategic-planning', label: 'Strategic Planning' }
  ];

  const handleAnalysis = async () => {
    if (!company.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/business-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company.trim(),
          analysisType,
          model
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to perform analysis'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Business Intelligence</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name..."
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Analysis Type</label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {analysisTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">AI Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="cohere">Cohere (Active)</SelectItem>
                    <SelectItem value="mistral">Mistral (Active)</SelectItem>
                    <SelectItem value="openai">OpenAI (Limited)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleAnalysis}
                disabled={isLoading || !company.trim()}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Business'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {result.success ? (
                    <>
                      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <h3 className="font-semibold">{result.company}</h3>
                        <span className="text-sm text-gray-400">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Textarea
                        value={result.analysis}
                        readOnly
                        className="min-h-64 bg-gray-700 border-gray-600"
                      />
                    </>
                  ) : (
                    <div className="text-red-400 text-center p-8">
                      <p>Analysis failed: {result.error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center p-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Enter a company name and select analysis type to begin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}