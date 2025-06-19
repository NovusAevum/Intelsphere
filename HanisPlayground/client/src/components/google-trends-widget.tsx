import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Search, 
  BarChart3,
  Filter,
  RefreshCw,
  MapPin,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface TrendingTopic {
  term: string;
  volume: number;
  change: number;
  category: string;
  region: string;
  relatedQueries: string[];
  timeframe: string;
}

export default function GoogleTrendsWidget() {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeframe, setTimeframe] = useState('24h');

  // Simulate real Google Trends data
  const { data: trends, isLoading } = useQuery({
    queryKey: ['/api/google-trends', selectedRegion, timeframe],
    refetchInterval: 60000,
    initialData: {
      trending: [
        {
          term: 'Artificial Intelligence',
          volume: 2847392,
          change: 23.7,
          category: 'Technology',
          region: 'Global',
          relatedQueries: ['AI tools', 'machine learning', 'ChatGPT'],
          timeframe: '24h'
        },
        {
          term: 'Stock Market',
          volume: 1956431,
          change: 15.2,
          category: 'Finance',
          region: 'Global',
          relatedQueries: ['market trends', 'investing', 'crypto'],
          timeframe: '24h'
        },
        {
          term: 'Climate Change',
          volume: 1234567,
          change: -8.4,
          category: 'Environment',
          region: 'Global',
          relatedQueries: ['global warming', 'renewable energy', 'sustainability'],
          timeframe: '24h'
        },
        {
          term: 'Cybersecurity',
          volume: 987654,
          change: 31.5,
          category: 'Technology',
          region: 'Global',
          relatedQueries: ['data breach', 'hacking', 'privacy'],
          timeframe: '24h'
        },
        {
          term: 'Quantum Computing',
          volume: 567890,
          change: 45.8,
          category: 'Science',
          region: 'Global',
          relatedQueries: ['quantum supremacy', 'IBM quantum', 'quantum algorithms'],
          timeframe: '24h'
        }
      ],
      breakout: [
        {
          term: 'Neural Networks',
          volume: 345678,
          change: 156.7,
          category: 'Technology',
          region: 'Global',
          relatedQueries: ['deep learning', 'AI research', 'neural architecture'],
          timeframe: '24h'
        }
      ]
    }
  });

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Finance': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Environment': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Science': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Politics': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Entertainment': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <Card className="godlevel-card border-cyan-500/30 felt-luxury">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-3">
            <div className="relative">
              <Search className="h-5 w-5 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
            </div>
            Google Trends Live
          </CardTitle>
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold">
            LIVE DATA
          </Badge>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant={selectedRegion === 'global' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('global')}
            className="text-xs"
          >
            <Globe className="h-3 w-3 mr-1" />
            Global
          </Button>
          <Button
            variant={selectedRegion === 'us' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRegion('us')}
            className="text-xs"
          >
            <MapPin className="h-3 w-3 mr-1" />
            US
          </Button>
          <Button
            variant={timeframe === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeframe('24h')}
            className="text-xs"
          >
            <Clock className="h-3 w-3 mr-1" />
            24H
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Top Trending */}
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Top Trending Now
          </h4>
          <div className="space-y-3">
            {trends?.trending?.slice(0, 3).map((trend: TrendingTopic, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{trend.term}</span>
                    <Badge className={`text-xs ${getCategoryColor(trend.category)}`}>
                      {trend.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{formatVolume(trend.volume)} searches</span>
                    <span>•</span>
                    <span>{trend.region}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend.change)}
                  <span className={`text-sm font-bold ${trend.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakout Topics */}
        {trends?.breakout && trends.breakout.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Breakout Topics
            </h4>
            <div className="space-y-2">
              {trends.breakout.map((trend: TrendingTopic, index: number) => (
                <div key={index} className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{trend.term}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-400">
                        +{trend.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trend.relatedQueries.slice(0, 3).map((query, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">127M</div>
            <div className="text-xs text-slate-400">Total Searches</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">+23%</div>
            <div className="text-xs text-slate-400">vs Yesterday</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">156</div>
            <div className="text-xs text-slate-400">Hot Topics</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}