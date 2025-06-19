import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Cloud, Sun, 
  MapPin, Activity, Globe, Search,
  Thermometer, Droplets, Wind, Eye,
  Hash, Users, MessageCircle, Heart, 
  Share, BarChart3, Zap
} from 'lucide-react';
import type { 
  MarketTrendsData, 
  WeatherData, 
  GoogleTrendsData, 
  NewsIntelligenceData,
  SocialMediaTrendsData,
  SocialMediaFeedData
} from '@shared/malaysia-types';

// Enhanced Market Trends Widget with Malaysia/ASEAN focus
export function EnhancedMarketTrendsWidget() {
  const { data: marketData, isLoading, error } = useQuery<MarketTrendsData>({
    queryKey: ['/api/market-trends'],
    queryFn: async () => {
      const response = await fetch('/api/market-trends');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 30000,
    staleTime: 0,
    retry: 3,
    enabled: true
  });

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-emerald-300 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Malaysia & ASEAN Markets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Loading market data...</div>
        </CardContent>
      </Card>
    );
  }



  if (error || !marketData || !marketData.markets) {
    return (
      <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-emerald-300 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Malaysia & ASEAN Markets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Market data unavailable</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-emerald-300 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Malaysia & ASEAN Markets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* FTSE KLCI */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-400">FTSE KLCI</div>
            <div className="text-lg font-bold text-white">
              {marketData.markets?.malaysia?.ftse_klci?.value?.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold flex items-center gap-1 ${
              (marketData.markets?.malaysia?.ftse_klci?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {(marketData.markets?.malaysia?.ftse_klci?.change || 0) >= 0 ? 
                <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {marketData.markets?.malaysia?.ftse_klci?.change?.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400">
              {marketData.markets?.malaysia?.ftse_klci?.change_percent?.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* MYR/USD */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-400">MYR/USD</div>
            <div className="text-lg font-bold text-white">
              {marketData.markets?.malaysia?.ringgit_usd?.value?.toFixed(4) || '4.4700'}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${
              (marketData.markets?.malaysia?.ringgit_usd?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {marketData.markets?.malaysia?.ringgit_usd?.change?.toFixed(4) || '-0.0200'}
            </div>
            <div className="text-xs text-slate-400">
              {marketData.markets?.malaysia?.ringgit_usd?.change_percent?.toFixed(2) || '-0.45'}%
            </div>
          </div>
        </div>

        {/* Singapore STI */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-400">Singapore STI</div>
            <div className="text-lg font-bold text-white">
              {marketData.markets?.asean?.singapore_sti?.value?.toFixed(2) || '3,785.42'}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${
              (marketData.markets?.asean?.singapore_sti?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {marketData.markets?.asean?.singapore_sti?.change?.toFixed(2) || '+8.23'}
            </div>
            <div className="text-xs text-slate-400">
              {marketData.markets?.asean?.singapore_sti?.change_percent?.toFixed(2) || '0.22'}%
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-emerald-500/20">
          <div className="text-xs text-slate-400 text-center">
            Last updated: {new Date(marketData.timestamp || Date.now()).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Weather Widget with ASEAN Cities
export function EnhancedWeatherWidget() {
  const { data: weatherData } = useQuery<WeatherData>({
    queryKey: ['/api/weather-data'],
    queryFn: async () => {
      const response = await fetch('/api/weather-data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 300000
  });

  if (!weatherData || !weatherData.locations) {
    return (
      <Card className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 border-sky-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sky-300 flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            ASEAN Weather Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Loading weather data...</div>
        </CardContent>
      </Card>
    );
  }

  const cities = [
    { key: 'kuala_lumpur', name: 'Kuala Lumpur', flag: '🇲🇾' },
    { key: 'singapore', name: 'Singapore', flag: '🇸🇬' },
    { key: 'bangkok', name: 'Bangkok', flag: '🇹🇭' },
    { key: 'jakarta', name: 'Jakarta', flag: '🇮🇩' }
  ];

  return (
    <Card className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 border-sky-500/30 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-sky-300 flex items-center gap-2">
          <Cloud className="h-4 w-4" />
          ASEAN Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cities.map((city) => {
          const cityData = weatherData.locations?.[city.key as keyof typeof weatherData.locations];
          if (!cityData) return null;

          return (
            <div key={city.key} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg">{city.flag}</span>
                <div>
                  <div className="text-xs text-slate-400">{city.name}</div>
                  <div className="text-sm text-white font-semibold">
                    {cityData.temperature || 32}°C
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{cityData.icon || '⛅'}</span>
                <div className="text-right">
                  <div className="text-xs text-slate-400">
                    {cityData.humidity || 75}% humidity
                  </div>
                  <div className="text-xs text-slate-400">
                    {cityData.wind_speed || 15} km/h
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-2 border-t border-sky-500/20">
          <div className="flex justify-between text-xs text-slate-400">
            <span>AQI: {weatherData.regional_summary?.air_quality_index || 85}</span>
            <span>UV: {weatherData.regional_summary?.uv_index || 8}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Google Trends Widget with Malaysia Focus
export function EnhancedGoogleTrendsWidget() {
  const { data: trendsData } = useQuery<GoogleTrendsData>({
    queryKey: ['/api/google-trends'],
    queryFn: async () => {
      const response = await fetch('/api/google-trends');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 600000
  });

  if (!trendsData) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-300 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Malaysia & ASEAN Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Connecting to trends feeds...</div>
        </CardContent>
      </Card>
    );
  }

  const malaysiaTrends = trendsData.regions?.malaysia?.trending_topics || [];
  const aseanTrends = trendsData.regions?.asean?.trending_topics || [];

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-purple-300 flex items-center gap-2">
          <Search className="h-4 w-4" />
          Malaysia & ASEAN Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <span className="text-base">🇲🇾</span> Malaysia Trending
          </div>
          <div className="space-y-1">
            {malaysiaTrends.slice(0, 3).map((trend, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="text-xs text-white truncate flex-1 mr-2">
                  {trend.keyword}
                </div>
                <Badge 
                  variant="outline" 
                  className="text-xs px-2 py-0 border-purple-500/30 text-purple-300"
                >
                  {trend.score}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-purple-500/20 pt-3">
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <Globe className="h-3 w-3" /> ASEAN Regional
          </div>
          <div className="space-y-1">
            {aseanTrends.slice(0, 2).map((trend, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="text-xs text-white truncate flex-1 mr-2">
                  {trend.keyword}
                </div>
                <Badge 
                  variant="outline" 
                  className="text-xs px-2 py-0 border-indigo-500/30 text-indigo-300"
                >
                  {trend.score}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-purple-500/20">
          <div className="text-xs text-slate-400 text-center">
            Search volume: {trendsData.search_volume_index?.malaysia_specific || 147}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Live News Widget with Malaysia/ASEAN Coverage
export function EnhancedLiveNewsWidget() {
  const { data: newsData } = useQuery<NewsIntelligenceData>({
    queryKey: ['/api/news-intelligence'],
    queryFn: async () => {
      const response = await fetch('/api/news-intelligence');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 60000
  });

  if (!newsData || !Array.isArray(newsData)) {
    return (
      <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-300 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live News Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Connecting to news feeds...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-orange-300 flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Live News Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsData.slice(0, 4).map((news, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white font-medium leading-tight line-clamp-2">
                  {news.title}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{news.source}</span>
                  {news.region && (
                    <Badge 
                      variant="outline" 
                      className="text-xs px-1 py-0 border-orange-500/30 text-orange-300"
                    >
                      {news.region}
                    </Badge>
                  )}
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                news.sentiment === 'positive' ? 'bg-emerald-500' :
                news.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
            </div>
            {index < newsData.length - 1 && (
              <div className="border-t border-orange-500/20" />
            )}
          </div>
        ))}

        <div className="pt-2 border-t border-orange-500/20">
          <div className="text-xs text-slate-400 text-center">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Social Media Monitoring Widget for Malaysian Market
export function EnhancedSocialMediaWidget() {
  const { data: socialData } = useQuery<SocialMediaTrendsData>({
    queryKey: ['/api/social-media-trends'],
    queryFn: async () => {
      const response = await fetch('/api/social-media-trends');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 120000
  });

  if (!socialData) {
    return (
      <Card className="bg-gradient-to-br from-pink-900/30 to-violet-900/30 border-pink-500/30 backdrop-blur-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-pink-300 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Social Media Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-slate-400">Connecting to social feeds...</div>
        </CardContent>
      </Card>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <BarChart3 className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-400" />
          Social Media Malaysia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top Malaysian Hashtags */}
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2">Trending Hashtags Malaysia</h4>
          <div className="grid gap-2">
            {socialData.malaysia_trending.hashtags.slice(0, 6).map((hashtag, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Hash className="w-3 h-3 text-blue-400" />
                  <span className="text-sm text-white">{hashtag.tag}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getSentimentColor(hashtag.sentiment)} border-slate-600`}
                  >
                    {hashtag.sentiment}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <span>{hashtag.count.toLocaleString()}</span>
                  <span className="text-green-400">{hashtag.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Activity */}
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2">Platform Activity</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(socialData.malaysia_trending.platforms).map(([platform, data]) => (
              <div key={platform} className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 capitalize">{platform}</span>
                  {getTrendIcon(data.trend)}
                </div>
                <span className="text-xs text-white">{data.activity}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ASEAN Trending */}
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2">ASEAN Trending</h4>
          <div className="space-y-1">
            {socialData.asean_trending.hashtags.slice(0, 3).map((hashtag, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-orange-400" />
                  <span className="text-sm text-slate-300">{hashtag.tag}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400">{hashtag.count.toLocaleString()}</span>
                  <span className="text-green-400">{hashtag.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Overview */}
        <div className="pt-2 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Overall Sentiment</span>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getSentimentColor(socialData.sentiment_analysis.overall_sentiment)} border-slate-600`}
              >
                {socialData.sentiment_analysis.overall_sentiment}
              </Badge>
              <span className="text-xs text-slate-400">
                {Math.round(socialData.sentiment_analysis.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}