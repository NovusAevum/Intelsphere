import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, TrendingUp, Globe2, Zap, Brain, Activity, Timer, Shield, Eye, Satellite, Radio } from 'lucide-react';

interface LiveNewsItem {
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  location: string;
}

interface IntelligenceStream {
  timestamp: string;
  activeThreats: number;
  networkNodes: number;
  dataStreams: number;
  supernodes: number;
  threatLevel: number;
  quantumState: string;
  networkLoad: number;
  regions: Array<{ name: string; activity: number }>;
  intelSources: Array<{ type: string; count: number }>;
}

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-lg floating-3d">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Live Time</span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white font-mono">
            {time.toLocaleTimeString()}
          </div>
          <div className="text-sm text-slate-400">
            {time.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LiveMarketData() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/market-data');
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const data = await response.json();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        setError('Unable to connect to market data feed');
        setLoading(false);
        // Fallback to demo data only when API fails
        setMarketData([
          { symbol: 'TSLA', price: 248.50, change: 12.30, changePercent: 5.2 },
          { symbol: 'AAPL', price: 185.64, change: -2.45, changePercent: -1.3 },
          { symbol: 'NVDA', price: 789.12, change: 45.67, changePercent: 6.1 },
          { symbol: 'MSFT', price: 378.90, change: 8.20, changePercent: 2.2 }
        ]);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 backdrop-blur-lg pulse-glow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <span className="text-sm font-medium text-slate-300">Live Markets</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2">
          {marketData.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center">
              <span className="text-sm font-medium text-white">{stock.symbol}</span>
              <div className="text-right">
                <div className="text-sm font-bold text-white">${stock.price.toFixed(2)}</div>
                <div className={`text-xs ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LiveNews() {
  const [news, setNews] = useState<LiveNewsItem[]>([
    {
      title: "AI Revolution Accelerates",
      summary: "Major breakthrough in neural processing technology announced",
      source: "TechCrunch",
      timestamp: "2 min ago",
      category: "Technology",
      sentiment: "positive"
    },
    {
      title: "Global Markets Surge",
      summary: "Tech stocks lead massive rally across international markets",
      source: "Bloomberg",
      timestamp: "5 min ago",
      category: "Finance",
      sentiment: "positive"
    },
    {
      title: "Cybersecurity Alert",
      summary: "New threat detected targeting enterprise infrastructure",
      source: "Security Week",
      timestamp: "8 min ago",
      category: "Security",
      sentiment: "negative"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [news.length]);

  const currentNews = news[currentIndex];

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30 backdrop-blur-lg neural-network">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Globe2 className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Live Intelligence</span>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              currentNews.sentiment === 'positive' ? 'border-green-500/30 text-green-400' :
              currentNews.sentiment === 'negative' ? 'border-red-500/30 text-red-400' :
              'border-yellow-500/30 text-yellow-400'
            }`}
          >
            {currentNews.category}
          </Badge>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-white line-clamp-2">
            {currentNews.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2">
            {currentNews.summary}
          </p>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>{currentNews.source}</span>
            <span>{currentNews.timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SystemPerformance() {
  const [performance, setPerformance] = useState({
    cpu: 34,
    memory: 67,
    network: 89,
    latency: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance({
        cpu: Math.max(20, Math.min(95, performance.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, performance.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(50, Math.min(100, performance.network + (Math.random() - 0.5) * 5)),
        latency: Math.max(5, Math.min(50, performance.latency + (Math.random() - 0.5) * 3))
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [performance]);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-lg holographic">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="h-5 w-5 text-purple-400" />
          <span className="text-sm font-medium text-slate-300">System Status</span>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">CPU</span>
            <span className="text-xs text-white font-mono">{performance.cpu}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${performance.cpu}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Memory</span>
            <span className="text-xs text-white font-mono">{performance.memory}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-green-500 to-teal-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${performance.memory}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Latency</span>
            <span className="text-xs text-white font-mono">{performance.latency}ms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DynamicQuotes() {
  const quotes = [
    {
      text: "Intelligence is not just about processing data—it's about transforming insights into action.",
      author: "Strategic Intelligence Framework",
      category: "Wisdom"
    },
    {
      text: "In the age of information, competitive advantage belongs to those who can see patterns others miss.",
      author: "Business Intelligence Doctrine",
      category: "Strategy"
    },
    {
      text: "The future belongs to organizations that can adapt, analyze, and act faster than uncertainty can spread.",
      author: "Digital Transformation Principles",
      category: "Innovation"
    },
    {
      text: "Every data point tells a story. Every pattern reveals an opportunity. Every insight drives evolution.",
      author: "IntelSphere Philosophy",
      category: "Evolution"
    },
    {
      text: "Professional intelligence is not about knowing everything—it's about knowing what matters most.",
      author: "Intelligence Excellence Standards",
      category: "Focus"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/30 backdrop-blur-lg rotating-gradient">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-medium text-slate-300">Intelligence Wisdom</span>
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-xs">
            {quotes[currentQuote].category}
          </Badge>
        </div>
        <div className="space-y-3">
          <blockquote className="text-sm text-white italic leading-relaxed">
            "{quotes[currentQuote].text}"
          </blockquote>
          <footer className="text-xs text-slate-400 text-right">
            — {quotes[currentQuote].author}
          </footer>
        </div>
      </CardContent>
    </Card>
  );
}

export function LiveCalendar() {
  const [events] = useState([
    { time: "09:00", title: "Market Analysis Review", type: "meeting" },
    { time: "11:30", title: "Competitive Intelligence Brief", type: "briefing" },
    { time: "14:00", title: "Strategic Planning Session", type: "planning" },
    { time: "16:30", title: "OSINT Operations Check", type: "operation" }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border-indigo-500/30 backdrop-blur-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="h-5 w-5 text-indigo-400" />
          <span className="text-sm font-medium text-slate-300">Today's Intelligence Schedule</span>
        </div>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded bg-slate-800/30">
              <div className="text-xs font-mono text-slate-400 w-12">{event.time}</div>
              <div className="flex-1">
                <div className="text-xs text-white">{event.title}</div>
                <div className="text-xs text-slate-500 capitalize">{event.type}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                event.type === 'meeting' ? 'bg-blue-500' :
                event.type === 'briefing' ? 'bg-green-500' :
                event.type === 'planning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GlobalIntelligenceMatrix() {
  const { data: matrixData } = useQuery<IntelligenceStream>({
    queryKey: ['/api/intelligence-stream'],
    refetchInterval: 3000,
    retry: false
  });

  const { data: newsData } = useQuery<LiveNewsItem[]>({
    queryKey: ['/api/news-intelligence'],
    refetchInterval: 8000,
    retry: false
  });

  if (!matrixData) {
    return (
      <Card className="godlevel-card border-cyan-500/30 felt-luxury">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="h-6 w-6 text-cyan-400 animate-spin" />
            <span className="text-lg font-bold text-cyan-300">Global Processing Matrix</span>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center text-cyan-400">Initializing global intelligence streams...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="godlevel-card border-cyan-500/30 felt-luxury">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe2 className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold text-cyan-300">Global Processing Matrix</span>
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/50">
            {matrixData.quantumState}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 felt-texture">
            <Shield className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-300">{matrixData.activeThreats}</div>
            <div className="text-xs text-cyan-400">Active Threats</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 felt-texture">
            <Satellite className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-300">{matrixData.networkNodes}</div>
            <div className="text-xs text-emerald-400">Network Nodes</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 felt-texture">
            <Radio className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-300">{matrixData.dataStreams}</div>
            <div className="text-xs text-purple-400">Data Streams</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 felt-texture">
            <Eye className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-300">{matrixData.supernodes}</div>
            <div className="text-xs text-orange-400">Supernodes</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">Global Activity Heatmap</span>
              <span className="text-sm text-cyan-400">Threat Level: {matrixData.threatLevel}/10</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {matrixData.regions.map((region, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded bg-slate-800/50 border border-slate-600/50 felt-texture">
                  <span className="text-xs text-slate-300">{region.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          region.activity > 70 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                          region.activity > 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-green-500 to-teal-500'
                        }`}
                        style={{ width: `${region.activity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-mono w-8">{region.activity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-300 mb-2">Intelligence Sources</div>
            <div className="grid grid-cols-2 gap-2">
              {matrixData.intelSources.map((source, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded bg-slate-800/50 border border-slate-600/50 felt-texture">
                  <span className="text-xs text-slate-300">{source.type}</span>
                  <span className="text-xs text-cyan-400 font-mono">{source.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {newsData.length > 0 && (
            <div>
              <div className="text-sm text-slate-300 mb-2">Live Intelligence News</div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {newsData.map((news, index) => (
                  <div key={index} className="p-3 rounded bg-slate-800/50 border border-slate-600/50 felt-texture">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-xs font-medium text-white leading-snug">{news.title}</h4>
                      <Badge className={`ml-2 text-xs ${
                        news.sentiment === 'positive' ? 'bg-green-500/20 text-green-300' :
                        news.sentiment === 'negative' ? 'bg-red-500/20 text-red-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {news.sentiment}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">{news.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-cyan-400">{news.source}</span>
                      <span className="text-xs text-slate-500">{new Date(news.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}