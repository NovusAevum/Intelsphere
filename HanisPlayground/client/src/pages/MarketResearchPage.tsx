/**
 * Market Research Page - Modular market analysis interface
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function MarketResearchPage() {
  const [industry, setIndustry] = useState('');
  const [region, setRegion] = useState('');
  const [focus, setFocus] = useState('competitive-landscape');
  const [model, setModel] = useState('cohere');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const focusAreas = [
    { value: 'competitive-landscape', label: 'Competitive Landscape' },
    { value: 'market-trends', label: 'Market Trends' },
    { value: 'consumer-behavior', label: 'Consumer Behavior' },
    { value: 'pricing-analysis', label: 'Pricing Analysis' },
    { value: 'growth-opportunities', label: 'Growth Opportunities' }
  ];

  const handleResearch = async () => {
    if (!industry.trim() || !region.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/market-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: industry.trim(),
          region: region.trim(),
          focus,
          model
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to perform market research'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Market Research</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Research Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Finance"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <Input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g., North America, Europe, Asia-Pacific"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Research Focus</label>
                <Select value={focus} onValueChange={setFocus}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {focusAreas.map(area => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
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
                onClick={handleResearch}
                disabled={isLoading || !industry.trim() || !region.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Researching...' : 'Conduct Research'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Research Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {result.success ? (
                    <>
                      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <h3 className="font-semibold">{result.industry} - {result.region}</h3>
                        <span className="text-sm text-gray-400">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Textarea
                        value={result.research}
                        readOnly
                        className="min-h-64 bg-gray-700 border-gray-600"
                      />
                    </>
                  ) : (
                    <div className="text-red-400 text-center p-8">
                      <p>Research failed: {result.error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center p-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <p>Enter industry and region to begin market research</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}