// Malaysian/ASEAN Market Data Types
export interface MarketTrendsData {
  timestamp: string;
  markets: {
    malaysia: {
      ftse_klci: {
        value: number;
        change: number;
        change_percent: number;
        status: string;
      };
      ringgit_usd: {
        value: number;
        change: number;
        change_percent: number;
      };
    };
    asean: {
      singapore_sti: {
        value: number;
        change: number;
        change_percent: number;
      };
      thailand_set: {
        value: number;
        change: number;
        change_percent: number;
      };
    };
    global: {
      sp500: {
        value: number;
        change: number;
        change_percent: number;
      };
      nasdaq: {
        value: number;
        change: number;
        change_percent: number;
      };
    };
  };
  sectors: {
    technology: { performance: number; trend: string };
    finance: { performance: number; trend: string };
    healthcare: { performance: number; trend: string };
    energy: { performance: number; trend: string };
  };
}

// Weather Data Types for ASEAN Cities
export interface WeatherData {
  timestamp: string;
  locations: {
    kuala_lumpur: CityWeather;
    singapore: CityWeather;
    bangkok: CityWeather;
    jakarta: CityWeather;
    manila: CityWeather;
  };
  regional_summary: {
    average_temp: number;
    dominant_condition: string;
    air_quality_index: number;
    uv_index: number;
  };
}

export interface CityWeather {
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
  wind_speed: number;
  precipitation: number;
}

// Google Trends Data Types for Malaysia/ASEAN
export interface GoogleTrendsData {
  timestamp: string;
  regions: {
    malaysia: {
      trending_topics: TrendingTopic[];
    };
    asean: {
      trending_topics: TrendingTopic[];
    };
    global: {
      trending_topics: TrendingTopic[];
    };
  };
  search_volume_index: {
    malaysia_specific: number;
    asean_regional: number;
    global_trends: number;
  };
}

export interface TrendingTopic {
  keyword: string;
  score: number;
  category: string;
}

// Enhanced News Intelligence Types
export interface NewsIntelligenceItem {
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  region: string;
}

export type NewsIntelligenceData = NewsIntelligenceItem[];

// Social Media Types for Malaysian Market
export interface SocialMediaHashtag {
  tag: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  growth: string;
}

export interface SocialMediaPlatform {
  activity: number;
  trend: 'up' | 'down' | 'stable';
}

export interface SocialMediaPost {
  id: string;
  platform: string;
  user: string;
  content: string;
  hashtags: string[];
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  timestamp: string;
  verified: boolean;
}

export interface TrendingMoment {
  topic: string;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  peak_time: string;
  related_hashtags: string[];
}

export interface SocialMediaTrendsData {
  timestamp: string;
  malaysia_trending: {
    hashtags: SocialMediaHashtag[];
    platforms: {
      twitter: SocialMediaPlatform;
      instagram: SocialMediaPlatform;
      tiktok: SocialMediaPlatform;
      facebook: SocialMediaPlatform;
    };
  };
  asean_trending: {
    hashtags: SocialMediaHashtag[];
  };
  viral_content: {
    malaysia: Array<{
      type: 'video' | 'post' | 'thread';
      platform: string;
      description: string;
      engagement: number;
      reach: string;
      hashtags: string[];
    }>;
  };
  sentiment_analysis: {
    overall_sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    positive_percentage: number;
    negative_percentage: number;
    neutral_percentage: number;
  };
  geographic_distribution: {
    kuala_lumpur: number;
    selangor: number;
    penang: number;
    johor: number;
    sarawak: number;
    sabah: number;
    others: number;
  };
}

export interface SocialMediaFeedData {
  timestamp: string;
  live_posts: SocialMediaPost[];
  trending_moments: TrendingMoment[];
}