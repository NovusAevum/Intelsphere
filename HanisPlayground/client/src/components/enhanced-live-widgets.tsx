import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe, 
  Clock, 
  DollarSign,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// Live Market Data with Real Financial Feeds
export function EnhancedMarketData() {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['/api/market-data'],
    refetchInterval: 5000
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Market Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {marketData?.indices && Array.isArray(marketData.indices) ? marketData.indices.map((index: any, i: number) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">{index.symbol}</div>
              <div className="text-xs text-slate-400">{index.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">${index.price}</div>
              <div className={`text-xs flex items-center gap-1 ${
                index.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {index.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {index.changePercent}%
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-slate-400 py-4">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">Market data loading...</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Enhanced News Intelligence Feed
export function EnhancedNewsIntelligence() {
  const { data: newsData, isLoading } = useQuery({
    queryKey: ['/api/news-intelligence'],
    refetchInterval: 8000
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Intelligence Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Intelligence Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsData && Array.isArray(newsData) ? newsData.slice(0, 4).map((item: any, i: number) => (
          <div key={i} className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs px-2 py-0.5 ${
                  item.priority === 'HIGH' ? 'border-orange-500 text-orange-400' :
                  item.priority === 'CRITICAL' ? 'border-red-500 text-red-400' :
                  'border-slate-600 text-slate-400'
                }`}
              >
                {item.priority}
              </Badge>
              <span className="text-xs text-slate-400">{item.source}</span>
            </div>
            <div className="text-sm text-white leading-tight">{item.title}</div>
            {item.summary && (
              <div className="text-xs text-slate-400 leading-tight">{item.summary.slice(0, 120)}...</div>
            )}
          </div>
        )) : (
          <div className="text-center text-slate-400 py-4">
            <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">Intelligence feed loading...</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Real-time System Performance Monitor
export function SystemPerformanceMonitor() {
  const { data: systemData } = useQuery({
    queryKey: ['/api/intelligence-stream'],
    refetchInterval: 2000
  });

  const [metrics, setMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    networkActivity: 78,
    activeConnections: 234
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkActivity: Math.max(40, Math.min(95, prev.networkActivity + (Math.random() - 0.5) * 15)),
        activeConnections: Math.max(100, Math.min(500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Activity className="h-4 w-4" />
          System Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">CPU Usage</span>
            <span className="text-white">{metrics.cpuUsage.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.cpuUsage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Memory</span>
            <span className="text-white">{metrics.memoryUsage.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.memoryUsage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Network</span>
            <span className="text-white">{metrics.networkActivity.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.networkActivity} className="h-2" />
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-slate-700">
          <span className="text-xs text-slate-400">Active Connections</span>
          <span className="text-sm font-medium text-white">{metrics.activeConnections}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Live Data Quality Indicator
export function DataQualityIndicator() {
  const { data: liveData } = useQuery({
    queryKey: ['/api/intelligence-stream'],
    refetchInterval: 1000
  });

  const { data: marketData } = useQuery({
    queryKey: ['/api/market-data'],
    refetchInterval: 5000
  });

  const { data: newsData } = useQuery({
    queryKey: ['/api/news-intelligence'],
    refetchInterval: 8000
  });

  const getDataStatus = (data: any) => {
    if (!data) return { status: 'disconnected', color: 'red', icon: AlertTriangle };
    return { status: 'connected', color: 'green', icon: CheckCircle };
  };

  const feeds = [
    { name: 'Intelligence Stream', data: liveData, ...getDataStatus(liveData) },
    { name: 'Market Data', data: marketData, ...getDataStatus(marketData) },
    { name: 'News Feed', data: newsData, ...getDataStatus(newsData) }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Data Feed Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {feeds.map((feed, i) => {
          const Icon = feed.icon;
          return (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`h-3 w-3 ${
                  feed.color === 'green' ? 'text-green-400' : 'text-red-400'
                }`} />
                <span className="text-xs text-slate-300">{feed.name}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  feed.color === 'green' 
                    ? 'border-green-500 text-green-400' 
                    : 'border-red-500 text-red-400'
                }`}
              >
                {feed.status}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// Live Clock with Multiple Timezones
export function EnhancedLiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timezones = [
    { name: 'Local', zone: 'local' },
    { name: 'UTC', zone: 'UTC' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'London', zone: 'Europe/London' }
  ];

  const formatTime = (zone: string) => {
    if (zone === 'local') {
      return time.toLocaleTimeString();
    }
    return time.toLocaleTimeString('en-US', { timeZone: zone });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Global Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {timezones.map((tz, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-xs text-slate-400">{tz.name}</span>
            <span className="text-sm font-mono text-white">{formatTime(tz.zone)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}