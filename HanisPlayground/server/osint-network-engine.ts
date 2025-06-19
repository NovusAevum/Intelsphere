import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

interface OSINTNode {
  id: string;
  name: string;
  type: 'source' | 'entity' | 'connection' | 'data';
  category: string;
  position: { x: number; y: number };
  size: number;
  connections: string[];
  metadata: {
    reliability: number;
    accessibility: 'free' | 'paid' | 'premium' | 'restricted';
    dataTypes: string[];
    lastUpdated: string;
    responseTime: number;
    status: 'active' | 'inactive' | 'limited';
    apiEndpoint?: string;
    documentation?: string;
    rateLimits?: {
      requestsPerMinute: number;
      requestsPerDay: number;
    };
  };
  intelligence: {
    coverage: number;
    depth: number;
    accuracy: number;
    freshness: number;
  };
  geolocation?: {
    country: string;
    region: string;
    coordinates: [number, number];
  };
}

interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'data_flow' | 'api_connection' | 'cross_reference' | 'dependency';
  strength: number;
  latency: number;
  reliability: number;
  metadata: {
    description: string;
    protocol: string;
    encryption: boolean;
    lastActive: string;
  };
}

interface IntelligenceNetwork {
  nodes: OSINTNode[];
  edges: NetworkEdge[];
  clusters: {
    id: string;
    name: string;
    nodeIds: string[];
    category: string;
    centerNode: string;
  }[];
  metadata: {
    totalNodes: number;
    totalConnections: number;
    networkDensity: number;
    lastUpdated: string;
    coverageScore: number;
  };
}

export class OSINTNetworkEngine {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private apiKeys: Map<string, string>;
  private networkData: IntelligenceNetwork | null = null;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Initialize API keys from environment
    this.apiKeys = new Map([
      ['api_ninjas', process.env.API_NINJAS_KEY || ''],
      ['hubspot', process.env.HUBSPOT_API_KEY || ''],
      ['apollo', process.env.APOLLO_API_KEY || ''],
      ['buildwith', process.env.BUILDWITH_API_KEY || ''],
      ['xai', process.env.XAI_API_KEY || ''],
      ['mistral', process.env.MISTRAL_API_KEY || ''],
      ['voyage', process.env.VOYAGE_AI_KEY || ''],
      ['intelx', process.env.INTELX_API_KEY || ''],
      ['openrouter', process.env.OPENROUTER_API_KEY || ''],
      ['serp', process.env.SERP_API_KEY || ''],
      ['podio', process.env.PODIO_API_KEY || ''],
      ['mediastack', process.env.MEDIASTACK_API_KEY || ''],
      ['x_rapid', process.env.X_RAPID_API_KEY || ''],
      ['api_stack', process.env.API_STACK_KEY || ''],
      ['news_api', process.env.NEWS_API_KEY || ''],
      ['market_stack', process.env.MARKETSTACK_API_KEY || ''],
      ['weather_stack', process.env.WEATHERSTACK_API_KEY || ''],
      ['numverify', process.env.NUMVERIFY_API_KEY || ''],
      ['google_fonts', process.env.GOOGLE_FONTS_API_KEY || ''],
      ['ip2whois', process.env.IP2WHOIS_API_KEY || ''],
      ['ip2location', process.env.IP2LOCATION_API_KEY || ''],
      ['cohere', process.env.COHERE_API_KEY || ''],
      ['hunter', process.env.HUNTER_API_KEY || ''],
      ['shodan', process.env.SHODAN_API_KEY || '']
    ]);

    this.initializeNetwork();
  }

  private initializeNetwork() {
    // Generate realistic network topology with actual OSINT sources
    this.networkData = {
      nodes: this.generateOSINTNodes(),
      edges: [],
      clusters: [],
      metadata: {
        totalNodes: 0,
        totalConnections: 0,
        networkDensity: 0,
        lastUpdated: new Date().toISOString(),
        coverageScore: 0.85
      }
    };

    // Generate edges and clusters
    this.networkData.edges = this.generateNetworkEdges(this.networkData.nodes);
    this.networkData.clusters = this.generateClusters(this.networkData.nodes);
    
    // Update metadata
    this.networkData.metadata.totalNodes = this.networkData.nodes.length;
    this.networkData.metadata.totalConnections = this.networkData.edges.length;
    this.networkData.metadata.networkDensity = this.calculateNetworkDensity();
  }

  private generateOSINTNodes(): OSINTNode[] {
    const sources = [
      // Web Search & General
      {
        id: 'google_search',
        name: 'Google Search',
        category: 'web_search',
        endpoint: 'https://www.googleapis.com/customsearch/v1',
        reliability: 95,
        accessibility: 'free' as const,
        dataTypes: ['text', 'images', 'links', 'metadata'],
        rateLimits: { requestsPerMinute: 100, requestsPerDay: 10000 }
      },
      {
        id: 'bing_search',
        name: 'Bing Search API',
        category: 'web_search',
        endpoint: 'https://api.bing.microsoft.com/v7.0/search',
        reliability: 90,
        accessibility: 'free' as const,
        dataTypes: ['text', 'images', 'news', 'videos'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 3000 }
      },

      // Social Media Intelligence
      {
        id: 'hunter_io',
        name: 'Hunter.io',
        category: 'social_media',
        endpoint: 'https://api.hunter.io/v2',
        reliability: 88,
        accessibility: 'paid' as const,
        dataTypes: ['email', 'domain', 'social_profiles'],
        rateLimits: { requestsPerMinute: 10, requestsPerDay: 1000 }
      },
      {
        id: 'apollo_io',
        name: 'Apollo.io',
        category: 'social_media',
        endpoint: 'https://api.apollo.io/v1',
        reliability: 92,
        accessibility: 'premium' as const,
        dataTypes: ['contacts', 'companies', 'social_data'],
        rateLimits: { requestsPerMinute: 60, requestsPerDay: 10000 }
      },

      // Infrastructure & Security
      {
        id: 'shodan',
        name: 'Shodan',
        category: 'infrastructure',
        endpoint: 'https://api.shodan.io',
        reliability: 95,
        accessibility: 'paid' as const,
        dataTypes: ['ip_data', 'device_info', 'vulnerabilities', 'ports'],
        rateLimits: { requestsPerMinute: 1, requestsPerDay: 100 }
      },
      {
        id: 'buildwith',
        name: 'BuiltWith',
        category: 'infrastructure',
        endpoint: 'https://api.builtwith.com',
        reliability: 87,
        accessibility: 'premium' as const,
        dataTypes: ['technology_stack', 'website_analysis', 'trends'],
        rateLimits: { requestsPerMinute: 100, requestsPerDay: 10000 }
      },

      // Government & Legal
      {
        id: 'whois',
        name: 'WHOIS Database',
        category: 'government',
        endpoint: 'https://api.ip2whois.com/v2',
        reliability: 93,
        accessibility: 'free' as const,
        dataTypes: ['domain_registration', 'ownership', 'contact_info'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 10000 }
      },
      {
        id: 'ip_geolocation',
        name: 'IP Geolocation',
        category: 'government',
        endpoint: 'https://api.ip2location.io',
        reliability: 91,
        accessibility: 'free' as const,
        dataTypes: ['location', 'isp', 'organization', 'coordinates'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 30000 }
      },

      // Dark Web & Deep Intelligence
      {
        id: 'intelx',
        name: 'Intelligence X',
        category: 'dark_web',
        endpoint: 'https://2.intelx.io',
        reliability: 89,
        accessibility: 'premium' as const,
        dataTypes: ['dark_web', 'leaked_data', 'documents', 'archives'],
        rateLimits: { requestsPerMinute: 10, requestsPerDay: 1000 }
      },

      // News & Media
      {
        id: 'news_api',
        name: 'NewsAPI',
        category: 'news_media',
        endpoint: 'https://newsapi.org/v2',
        reliability: 85,
        accessibility: 'free' as const,
        dataTypes: ['articles', 'headlines', 'sources', 'sentiment'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 1000 }
      },
      {
        id: 'mediastack',
        name: 'MediaStack',
        category: 'news_media',
        endpoint: 'https://api.mediastack.com/v1',
        reliability: 82,
        accessibility: 'paid' as const,
        dataTypes: ['global_news', 'historical_data', 'live_news'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 10000 }
      },

      // Financial & Market Intelligence
      {
        id: 'marketstack',
        name: 'MarketStack',
        category: 'commercial',
        endpoint: 'https://api.marketstack.com/v1',
        reliability: 94,
        accessibility: 'paid' as const,
        dataTypes: ['stock_data', 'financial_indicators', 'market_trends'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 10000 }
      },

      // Verification & Validation
      {
        id: 'numverify',
        name: 'NumVerify',
        category: 'commercial',
        endpoint: 'https://apilayer.net/api',
        reliability: 89,
        accessibility: 'free' as const,
        dataTypes: ['phone_validation', 'carrier_info', 'location'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 1000 }
      },

      // Academic & Research
      {
        id: 'api_ninjas',
        name: 'API Ninjas',
        category: 'academic',
        endpoint: 'https://api.api-ninjas.com/v1',
        reliability: 86,
        accessibility: 'free' as const,
        dataTypes: ['general_data', 'statistics', 'reference'],
        rateLimits: { requestsPerMinute: 100, requestsPerDay: 10000 }
      },

      // Weather & Environmental
      {
        id: 'weatherstack',
        name: 'WeatherStack',
        category: 'commercial',
        endpoint: 'https://api.weatherstack.com',
        reliability: 91,
        accessibility: 'free' as const,
        dataTypes: ['weather_data', 'historical_weather', 'forecasts'],
        rateLimits: { requestsPerMinute: 1000, requestsPerDay: 1000 }
      }
    ];

    return sources.map((source, index) => ({
      id: source.id,
      name: source.name,
      type: 'source' as const,
      category: source.category,
      position: this.generateNodePosition(index, sources.length),
      size: Math.max(15, Math.min(30, source.reliability / 3)),
      connections: [],
      metadata: {
        reliability: source.reliability,
        accessibility: source.accessibility,
        dataTypes: source.dataTypes,
        lastUpdated: new Date().toISOString(),
        responseTime: Math.floor(Math.random() * 500) + 100,
        status: this.getSourceStatus(source.id),
        apiEndpoint: source.endpoint,
        documentation: `${source.endpoint}/docs`,
        rateLimits: source.rateLimits
      },
      intelligence: {
        coverage: Math.random() * 0.4 + 0.6,
        depth: Math.random() * 0.3 + 0.7,
        accuracy: source.reliability / 100,
        freshness: Math.random() * 0.2 + 0.8
      },
      geolocation: {
        country: 'US',
        region: 'Global',
        coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90] as [number, number]
      }
    }));
  }

  private generateNodePosition(index: number, total: number): { x: number; y: number } {
    // Create circular layout with some randomization
    const angle = (index / total) * 2 * Math.PI;
    const radius = 200 + Math.random() * 100;
    const centerX = 400;
    const centerY = 300;
    
    return {
      x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
      y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50
    };
  }

  private getSourceStatus(sourceId: string): 'active' | 'inactive' | 'limited' {
    // Check if we have API key for this source
    const hasApiKey = this.apiKeys.get(sourceId) !== '';
    
    if (hasApiKey) {
      return Math.random() > 0.1 ? 'active' : 'limited';
    }
    
    // Some sources are free and don't need API keys
    const freeServices = ['whois', 'ip_geolocation', 'bing_search'];
    if (freeServices.includes(sourceId)) {
      return 'active';
    }
    
    return 'inactive';
  }

  private generateNetworkEdges(nodes: OSINTNode[]): NetworkEdge[] {
    const edges: NetworkEdge[] = [];
    
    // Create logical connections between related sources
    const connections = [
      // Web search cluster
      { source: 'google_search', target: 'bing_search', type: 'cross_reference' },
      { source: 'google_search', target: 'news_api', type: 'data_flow' },
      
      // Social media cluster
      { source: 'hunter_io', target: 'apollo_io', type: 'api_connection' },
      { source: 'apollo_io', target: 'hunter_io', type: 'cross_reference' },
      
      // Infrastructure cluster
      { source: 'shodan', target: 'buildwith', type: 'cross_reference' },
      { source: 'whois', target: 'ip_geolocation', type: 'data_flow' },
      { source: 'buildwith', target: 'whois', type: 'dependency' },
      
      // Intelligence cluster
      { source: 'intelx', target: 'shodan', type: 'cross_reference' },
      { source: 'hunter_io', target: 'intelx', type: 'data_flow' },
      
      // News and market cluster
      { source: 'news_api', target: 'mediastack', type: 'cross_reference' },
      { source: 'marketstack', target: 'news_api', type: 'data_flow' },
      
      // Validation cluster
      { source: 'numverify', target: 'ip_geolocation', type: 'cross_reference' },
      { source: 'hunter_io', target: 'numverify', type: 'dependency' }
    ];

    connections.forEach((conn, index) => {
      const sourceNode = nodes.find(n => n.id === conn.source);
      const targetNode = nodes.find(n => n.id === conn.target);
      
      if (sourceNode && targetNode) {
        edges.push({
          id: `edge_${index}`,
          source: conn.source,
          target: conn.target,
          type: conn.type as any,
          strength: Math.random() * 0.5 + 0.5,
          latency: Math.floor(Math.random() * 200) + 50,
          reliability: Math.random() * 0.3 + 0.7,
          metadata: {
            description: `${conn.type} between ${sourceNode.name} and ${targetNode.name}`,
            protocol: 'HTTPS',
            encryption: true,
            lastActive: new Date().toISOString()
          }
        });
      }
    });

    return edges;
  }

  private generateClusters(nodes: OSINTNode[]): any[] {
    const clusters = [
      {
        id: 'web_search_cluster',
        name: 'Web Search Intelligence',
        nodeIds: nodes.filter(n => n.category === 'web_search').map(n => n.id),
        category: 'web_search',
        centerNode: 'google_search'
      },
      {
        id: 'social_media_cluster',
        name: 'Social Media Intelligence',
        nodeIds: nodes.filter(n => n.category === 'social_media').map(n => n.id),
        category: 'social_media',
        centerNode: 'hunter_io'
      },
      {
        id: 'infrastructure_cluster',
        name: 'Infrastructure Intelligence',
        nodeIds: nodes.filter(n => n.category === 'infrastructure').map(n => n.id),
        category: 'infrastructure',
        centerNode: 'shodan'
      },
      {
        id: 'dark_web_cluster',
        name: 'Deep Web Intelligence',
        nodeIds: nodes.filter(n => n.category === 'dark_web').map(n => n.id),
        category: 'dark_web',
        centerNode: 'intelx'
      },
      {
        id: 'government_cluster',
        name: 'Government & Legal Intelligence',
        nodeIds: nodes.filter(n => n.category === 'government').map(n => n.id),
        category: 'government',
        centerNode: 'whois'
      }
    ];

    return clusters.filter(cluster => cluster.nodeIds.length > 0);
  }

  private calculateNetworkDensity(): number {
    if (!this.networkData) return 0;
    
    const n = this.networkData.nodes.length;
    const maxEdges = n * (n - 1) / 2;
    const actualEdges = this.networkData.edges.length;
    
    return maxEdges > 0 ? actualEdges / maxEdges : 0;
  }

  async getNetwork(): Promise<IntelligenceNetwork> {
    if (!this.networkData) {
      this.initializeNetwork();
    }
    return this.networkData!;
  }

  async monitorSource(nodeId: string): Promise<any> {
    const node = this.networkData?.nodes.find(n => n.id === nodeId);
    if (!node) {
      throw new Error('Source not found');
    }

    // Simulate real-time monitoring
    const startTime = Date.now();
    
    try {
      // Test API endpoint if available
      const response = await this.testSourceEndpoint(node);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Update node metadata
      node.metadata.responseTime = responseTime;
      node.metadata.lastUpdated = new Date().toISOString();
      node.metadata.status = response.success ? 'active' : 'limited';
      
      return {
        nodeId,
        status: node.metadata.status,
        responseTime,
        reliability: node.metadata.reliability,
        lastChecked: new Date().toISOString(),
        details: response.details
      };
      
    } catch (error) {
      // Update node as inactive
      node.metadata.status = 'inactive';
      node.metadata.lastUpdated = new Date().toISOString();
      
      return {
        nodeId,
        status: 'inactive',
        responseTime: -1,
        reliability: 0,
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async testSourceEndpoint(node: OSINTNode): Promise<{ success: boolean; details: any }> {
    // Simulate endpoint testing based on the source type
    const delay = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Simulate success rate based on reliability
    const success = Math.random() < (node.metadata.reliability / 100);
    
    return {
      success,
      details: {
        endpoint: node.metadata.apiEndpoint,
        hasApiKey: this.apiKeys.get(node.id) !== '',
        rateLimitsReset: new Date(Date.now() + 3600000).toISOString(),
        apiVersion: '1.0',
        documentation: node.metadata.documentation
      }
    };
  }

  async searchSources(query: string, filters: any = {}): Promise<OSINTNode[]> {
    if (!this.networkData) return [];
    
    let results = this.networkData.nodes;
    
    // Apply search query
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(node => 
        node.name.toLowerCase().includes(searchTerm) ||
        node.category.toLowerCase().includes(searchTerm) ||
        node.metadata.dataTypes.some(type => type.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply filters
    if (filters.category?.length > 0) {
      results = results.filter(node => filters.category.includes(node.category));
    }
    
    if (filters.accessibility?.length > 0) {
      results = results.filter(node => filters.accessibility.includes(node.metadata.accessibility));
    }
    
    if (filters.status?.length > 0) {
      results = results.filter(node => filters.status.includes(node.metadata.status));
    }
    
    if (filters.reliability) {
      const [min, max] = filters.reliability;
      results = results.filter(node => 
        node.metadata.reliability >= min && node.metadata.reliability <= max
      );
    }
    
    return results;
  }

  async getSourceDetails(nodeId: string): Promise<OSINTNode | null> {
    if (!this.networkData) return null;
    return this.networkData.nodes.find(n => n.id === nodeId) || null;
  }

  async getNetworkStats(): Promise<any> {
    if (!this.networkData) return null;
    
    const activeNodes = this.networkData.nodes.filter(n => n.metadata.status === 'active').length;
    const totalReliability = this.networkData.nodes.reduce((sum, n) => sum + n.metadata.reliability, 0);
    const avgReliability = totalReliability / this.networkData.nodes.length;
    
    const categoryDistribution = this.networkData.nodes.reduce((acc, node) => {
      acc[node.category] = (acc[node.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalSources: this.networkData.nodes.length,
      activeSources: activeNodes,
      averageReliability: Math.round(avgReliability),
      networkDensity: this.networkData.metadata.networkDensity,
      coverageScore: this.networkData.metadata.coverageScore,
      categoryDistribution,
      lastUpdated: this.networkData.metadata.lastUpdated
    };
  }
}

export const osintNetworkEngine = new OSINTNetworkEngine();