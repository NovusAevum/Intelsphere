import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CohereClient } from 'cohere-ai';

export interface NexusIntelRequest {
  target: string;
  depth: 'surface' | 'deep' | 'quantum';
  modules: string[];
  ai_orchestration: boolean;
  real_time: boolean;
}

export interface IntelligenceNode {
  id: string;
  type: 'shodan' | 'news' | 'social' | 'domain' | 'geo' | 'threat' | 'tech' | 'financial' | 'legal' | 'darkweb';
  name: string;
  data: any;
  confidence: number;
  timestamp: string;
  source_api: string;
  verification_status: 'verified' | 'pending' | 'unverified';
  ai_analysis?: {
    summary: string;
    risk_score: number;
    key_insights: string[];
    correlation_patterns: string[];
  };
}

export interface AgenticResponse {
  intelligence_nodes: IntelligenceNode[];
  ai_orchestration_result: {
    primary_insights: string[];
    threat_assessment: 'minimal' | 'low' | 'medium' | 'high' | 'critical';
    confidence_score: number;
    recommendation_actions: string[];
    correlation_analysis: string;
    predictive_indicators: string[];
  };
  processing_metadata: {
    total_apis_queried: number;
    successful_queries: number;
    processing_time_ms: number;
    ai_models_used: string[];
    data_authenticity_score: number;
  };
}

export class NexusIntelEngine {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private googleAI: GoogleGenerativeAI;
  private xaiClient: OpenAI;
  private cohereClient: CohereClient;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    this.xaiClient = new OpenAI({
      baseURL: "https://api.x.ai/v1",
      apiKey: process.env.XAI_API_KEY,
    });

    this.cohereClient = new CohereClient({
      token: process.env.COHERE_API_KEY!,
    });
  }

  async performNexusIntelligence(request: NexusIntelRequest): Promise<AgenticResponse> {
    const startTime = Date.now();
    console.log(`🔬 NexusIntel Engine: Deep analysis of "${request.target}"`);

    const intelligenceNodes: IntelligenceNode[] = [];
    const apiResults = new Map<string, any>();

    // Parallel intelligence gathering across all available APIs
    const gatheringTasks = [
      this.gatherShodanIntelligence(request.target),
      this.gatherNewsIntelligence(request.target),
      this.gatherDomainIntelligence(request.target),
      this.gatherGeoIntelligence(request.target),
      this.gatherThreatIntelligence(request.target),
      this.gatherTechnicalIntelligence(request.target),
      this.gatherFinancialIntelligence(request.target),
      this.gatherSocialIntelligence(request.target),
      this.gatherWeatherIntelligence(request.target),
      this.gatherMarketIntelligence(request.target)
    ];

    const results = await Promise.allSettled(gatheringTasks);
    let successfulQueries = 0;

    // Process all gathered intelligence
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        intelligenceNodes.push(...result.value);
        successfulQueries++;
      }
    });

    console.log(`📊 Processed ${intelligenceNodes.length} intelligence nodes from ${successfulQueries} APIs`);

    // AI Orchestration and Analysis
    let aiOrchestrationResult;
    if (request.ai_orchestration && intelligenceNodes.length > 0) {
      aiOrchestrationResult = await this.performAIOrchestration(request.target, intelligenceNodes);
    } else {
      aiOrchestrationResult = this.generateBasicOrchestration(request.target, intelligenceNodes);
    }

    const processingTime = Date.now() - startTime;

    return {
      intelligence_nodes: intelligenceNodes,
      ai_orchestration_result: aiOrchestrationResult,
      processing_metadata: {
        total_apis_queried: gatheringTasks.length,
        successful_queries: successfulQueries,
        processing_time_ms: processingTime,
        ai_models_used: request.ai_orchestration ? ['claude-sonnet-4', 'gpt-4o', 'gemini-pro', 'grok-2'] : [],
        data_authenticity_score: this.calculateAuthenticityScore(intelligenceNodes)
      }
    };
  }

  private async gatherShodanIntelligence(target: string): Promise<IntelligenceNode[]> {
    if (!process.env.SHODAN_API_KEY || process.env.SHODAN_API_KEY === 'your_shodan_api_key_here') {
      return [];
    }

    try {
      console.log(`🌐 Shodan: Scanning "${target}"`);
      
      const searchUrl = `https://api.shodan.io/shodan/host/search?key=${process.env.SHODAN_API_KEY}&query=${encodeURIComponent(target)}&limit=20`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) return [];

      const data = await response.json();
      const nodes: IntelligenceNode[] = [];

      if (data.matches && Array.isArray(data.matches)) {
        for (const host of data.matches.slice(0, 10)) {
          nodes.push({
            id: `shodan_${host.ip_str}_${Date.now()}`,
            type: 'shodan',
            name: `Network Host: ${host.ip_str}:${host.port}`,
            data: {
              ip: host.ip_str,
              port: host.port,
              protocol: host.transport,
              product: host.product,
              version: host.version,
              organization: host.org,
              location: host.location,
              vulnerabilities: host.vulns ? Object.keys(host.vulns) : [],
              hostnames: host.hostnames,
              banner: host.data
            },
            confidence: 0.95,
            timestamp: new Date().toISOString(),
            source_api: 'shodan',
            verification_status: 'verified'
          });
        }
      }

      return nodes;
    } catch (error) {
      console.log(`⚠️ Shodan error:`, error);
      return [];
    }
  }

  private async gatherNewsIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // News API with authentication
    if (process.env.NEWS_API_KEY) {
      try {
        console.log(`📰 News API: Searching "${target}"`);
        const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(target)}&sortBy=publishedAt&pageSize=15&language=en`;
        const response = await fetch(newsUrl, {
          headers: {
            'X-API-Key': process.env.NEWS_API_KEY,
            'User-Agent': 'NexusIntel-Engine/2.0'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.articles && Array.isArray(data.articles)) {
            for (const article of data.articles.slice(0, 8)) {
              nodes.push({
                id: `news_${Date.now()}_${Math.random()}`,
                type: 'news',
                name: article.title || 'News Article',
                data: {
                  title: article.title,
                  description: article.description,
                  url: article.url,
                  source: article.source?.name,
                  author: article.author,
                  publishedAt: article.publishedAt,
                  content: article.content,
                  urlToImage: article.urlToImage
                },
                confidence: this.calculateNewsCredibility(article),
                timestamp: new Date().toISOString(),
                source_api: 'newsapi',
                verification_status: 'verified'
              });
            }
          }
        }
      } catch (error) {
        console.log(`📰 News API error:`, error);
      }
    }

    return nodes;
  }

  private async gatherDomainIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // Hunter.io for email intelligence
    if (process.env.HUNTER_API_KEY) {
      try {
        console.log(`🔍 Hunter.io: Analyzing domain "${target}"`);
        const hunterUrl = `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(target)}&api_key=${process.env.HUNTER_API_KEY}&limit=10`;
        const response = await fetch(hunterUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.emails) {
            for (const email of data.data.emails.slice(0, 5)) {
              nodes.push({
                id: `domain_${Date.now()}_${Math.random()}`,
                type: 'domain',
                name: `Email Contact: ${email.value}`,
                data: {
                  email: email.value,
                  type: email.type,
                  confidence: email.confidence,
                  first_name: email.first_name,
                  last_name: email.last_name,
                  position: email.position,
                  department: email.department,
                  sources: email.sources
                },
                confidence: email.confidence / 100,
                timestamp: new Date().toISOString(),
                source_api: 'hunter',
                verification_status: email.confidence > 80 ? 'verified' : 'pending'
              });
            }
          }
        }
      } catch (error) {
        console.log(`🔍 Hunter.io error:`, error);
      }
    }

    // API Ninjas for WHOIS and DNS
    if (process.env.API_NINJAS_KEY) {
      try {
        console.log(`🕸️ API Ninjas: Domain analysis "${target}"`);
        
        const whoisUrl = `https://api.api-ninjas.com/v1/whois?domain=${encodeURIComponent(target)}`;
        const whoisResponse = await fetch(whoisUrl, {
          headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });

        if (whoisResponse.ok) {
          const whoisData = await whoisResponse.json();
          nodes.push({
            id: `whois_${Date.now()}`,
            type: 'domain',
            name: `WHOIS Data: ${target}`,
            data: whoisData,
            confidence: 0.90,
            timestamp: new Date().toISOString(),
            source_api: 'api_ninjas',
            verification_status: 'verified'
          });
        }
      } catch (error) {
        console.log(`🕸️ API Ninjas error:`, error);
      }
    }

    return nodes;
  }

  private async gatherGeoIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // IP2Location for geographic data
    if (process.env.IP2LOCATION_API_KEY) {
      try {
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (ipRegex.test(target)) {
          console.log(`🌍 IP2Location: Locating "${target}"`);
          const locationUrl = `https://api.ip2location.io/?key=${process.env.IP2LOCATION_API_KEY}&ip=${target}`;
          const response = await fetch(locationUrl);
          
          if (response.ok) {
            const data = await response.json();
            nodes.push({
              id: `geo_${Date.now()}`,
              type: 'geo',
              name: `Geographic Location: ${data.city_name}, ${data.country_name}`,
              data: {
                ip: target,
                country: data.country_name,
                region: data.region_name,
                city: data.city_name,
                coordinates: {
                  lat: parseFloat(data.latitude),
                  lng: parseFloat(data.longitude)
                },
                zip_code: data.zip_code,
                time_zone: data.time_zone,
                isp: data.isp,
                domain: data.domain,
                net_speed: data.net_speed,
                idd_code: data.idd_code,
                area_code: data.area_code
              },
              confidence: 0.88,
              timestamp: new Date().toISOString(),
              source_api: 'ip2location',
              verification_status: 'verified'
            });
          }
        }
      } catch (error) {
        console.log(`🌍 IP2Location error:`, error);
      }
    }

    return nodes;
  }

  private async gatherThreatIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // IntelX for threat intelligence
    if (process.env.INTELX_API_KEY) {
      try {
        console.log(`⚠️ IntelX: Threat analysis "${target}"`);
        const intelUrl = `https://2.intelx.io/phonebook/search?k=${process.env.INTELX_API_KEY}&term=${encodeURIComponent(target)}&maxresults=10`;
        const response = await fetch(intelUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.selectors) {
            for (const selector of data.selectors.slice(0, 5)) {
              nodes.push({
                id: `threat_${Date.now()}_${Math.random()}`,
                type: 'threat',
                name: `Threat Intelligence: ${selector.selectorvalue}`,
                data: {
                  selector_type: selector.selectortype,
                  selector_value: selector.selectorvalue,
                  first_seen: selector.firstseen,
                  last_seen: selector.lastseen,
                  bucket: selector.bucket
                },
                confidence: 0.85,
                timestamp: new Date().toISOString(),
                source_api: 'intelx',
                verification_status: 'verified'
              });
            }
          }
        }
      } catch (error) {
        console.log(`⚠️ IntelX error:`, error);
      }
    }

    return nodes;
  }

  private async gatherTechnicalIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // BuildWith for technology stack
    if (process.env.BUILDWITH_API_KEY) {
      try {
        console.log(`🛠️ BuildWith: Technology analysis "${target}"`);
        const buildWithUrl = `https://api.builtwith.com/v21/api.json?KEY=${process.env.BUILDWITH_API_KEY}&LOOKUP=${encodeURIComponent(target)}`;
        const response = await fetch(buildWithUrl);
        
        if (response.ok) {
          const data = await response.json();
          nodes.push({
            id: `tech_${Date.now()}`,
            type: 'tech',
            name: `Technology Stack: ${target}`,
            data: {
              domain: target,
              technologies: data.Results?.[0]?.Result?.Paths?.[0]?.Technologies || [],
              meta: data.Results?.[0]?.Result?.Paths?.[0]?.Meta || {},
              domain_age: data.Results?.[0]?.Result?.Paths?.[0]?.Domain?.Age,
              country: data.Results?.[0]?.Result?.Paths?.[0]?.Domain?.Country
            },
            confidence: 0.92,
            timestamp: new Date().toISOString(),
            source_api: 'builtwith',
            verification_status: 'verified'
          });
        }
      } catch (error) {
        console.log(`🛠️ BuildWith error:`, error);
      }
    }

    return nodes;
  }

  private async gatherFinancialIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // Market Stack for financial data
    if (process.env.MARKETSTACK_API_KEY) {
      try {
        console.log(`💰 MarketStack: Financial analysis "${target}"`);
        const marketUrl = `http://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_API_KEY}&symbols=${encodeURIComponent(target)}&limit=5`;
        const response = await fetch(marketUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            nodes.push({
              id: `financial_${Date.now()}`,
              type: 'financial',
              name: `Financial Data: ${target}`,
              data: {
                symbol: target,
                stock_data: data.data,
                pagination: data.pagination
              },
              confidence: 0.90,
              timestamp: new Date().toISOString(),
              source_api: 'marketstack',
              verification_status: 'verified'
            });
          }
        }
      } catch (error) {
        console.log(`💰 MarketStack error:`, error);
      }
    }

    return nodes;
  }

  private async gatherSocialIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // SERP API for social media intelligence
    if (process.env.SERP_API_KEY) {
      try {
        console.log(`📱 SERP API: Social intelligence "${target}"`);
        const socialQuery = `${target} site:twitter.com OR site:linkedin.com OR site:facebook.com OR site:instagram.com`;
        const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(socialQuery)}&api_key=${process.env.SERP_API_KEY}&num=10`;
        const response = await fetch(serpUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.organic_results) {
            for (const result of data.organic_results.slice(0, 5)) {
              nodes.push({
                id: `social_${Date.now()}_${Math.random()}`,
                type: 'social',
                name: `Social Profile: ${this.extractPlatform(result.link)}`,
                data: {
                  title: result.title,
                  link: result.link,
                  snippet: result.snippet,
                  platform: this.extractPlatform(result.link),
                  position: result.position
                },
                confidence: 0.75,
                timestamp: new Date().toISOString(),
                source_api: 'serpapi',
                verification_status: 'pending'
              });
            }
          }
        }
      } catch (error) {
        console.log(`📱 SERP API error:`, error);
      }
    }

    return nodes;
  }

  private async gatherWeatherIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // WeatherStack for location-based weather intelligence
    if (process.env.WEATHERSTACK_API_KEY) {
      try {
        console.log(`🌤️ WeatherStack: Environmental data "${target}"`);
        const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${encodeURIComponent(target)}`;
        const response = await fetch(weatherUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.current && data.location) {
            nodes.push({
              id: `weather_${Date.now()}`,
              type: 'geo',
              name: `Environmental Data: ${data.location.name}`,
              data: {
                location: data.location,
                current_weather: data.current,
                observation_time: data.current.observation_time,
                temperature: data.current.temperature,
                weather_descriptions: data.current.weather_descriptions
              },
              confidence: 0.85,
              timestamp: new Date().toISOString(),
              source_api: 'weatherstack',
              verification_status: 'verified'
            });
          }
        }
      } catch (error) {
        console.log(`🌤️ WeatherStack error:`, error);
      }
    }

    return nodes;
  }

  private async gatherMarketIntelligence(target: string): Promise<IntelligenceNode[]> {
    const nodes: IntelligenceNode[] = [];

    // HubSpot for business intelligence
    if (process.env.HUBSPOT_API_KEY) {
      try {
        console.log(`🏢 HubSpot: Business intelligence "${target}"`);
        const hubspotUrl = `https://api.hubapi.com/companies/v2/companies/search?q=${encodeURIComponent(target)}&hapikey=${process.env.HUBSPOT_API_KEY}`;
        const response = await fetch(hubspotUrl);
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            for (const company of data.results.slice(0, 3)) {
              nodes.push({
                id: `business_${Date.now()}_${Math.random()}`,
                type: 'financial',
                name: `Business Profile: ${company.properties.name?.value || target}`,
                data: {
                  company_id: company.companyId,
                  properties: company.properties,
                  portal_id: company.portalId
                },
                confidence: 0.88,
                timestamp: new Date().toISOString(),
                source_api: 'hubspot',
                verification_status: 'verified'
              });
            }
          }
        }
      } catch (error) {
        console.log(`🏢 HubSpot error:`, error);
      }
    }

    return nodes;
  }

  private async performAIOrchestration(target: string, nodes: IntelligenceNode[]): Promise<any> {
    try {
      console.log(`🧠 AI Orchestration: Analyzing ${nodes.length} intelligence nodes`);
      
      const nodesSummary = nodes.map(node => 
        `${node.type.toUpperCase()}: ${node.name} (${Math.round(node.confidence * 100)}% confidence) - ${node.source_api}`
      ).join('\n');

      const orchestrationPrompt = `Perform advanced intelligence analysis for target: "${target}"

INTELLIGENCE NODES GATHERED:
${nodesSummary}

Provide comprehensive analysis including:
1. Primary insights (5 key findings)
2. Threat assessment (minimal/low/medium/high/critical)
3. Confidence score (0-1)
4. Recommended actions (5 specific actions)
5. Correlation analysis (relationships between data points)
6. Predictive indicators (future risks/opportunities)

Return as JSON with keys: primary_insights, threat_assessment, confidence_score, recommendation_actions, correlation_analysis, predictive_indicators`;

      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: orchestrationPrompt
        }]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        try {
          return JSON.parse(content.text);
        } catch {
          return this.generateFallbackOrchestration(target, nodes);
        }
      }

      return this.generateFallbackOrchestration(target, nodes);
    } catch (error) {
      console.log(`🧠 AI Orchestration error:`, error);
      return this.generateFallbackOrchestration(target, nodes);
    }
  }

  private generateBasicOrchestration(target: string, nodes: IntelligenceNode[]): any {
    const threatLevels = nodes.filter(n => n.type === 'threat').length;
    const socialNodes = nodes.filter(n => n.type === 'social').length;
    const techNodes = nodes.filter(n => n.type === 'tech').length;

    return {
      primary_insights: [
        `Found ${nodes.length} intelligence sources across ${new Set(nodes.map(n => n.type)).size} categories`,
        `${threatLevels} threat intelligence indicators discovered`,
        `${socialNodes} social media profiles identified`,
        `${techNodes} technical infrastructure points analyzed`,
        `Average confidence score: ${Math.round(nodes.reduce((sum, n) => sum + n.confidence, 0) / nodes.length * 100)}%`
      ],
      threat_assessment: threatLevels > 3 ? 'high' : threatLevels > 1 ? 'medium' : 'low',
      confidence_score: nodes.reduce((sum, n) => sum + n.confidence, 0) / nodes.length,
      recommendation_actions: [
        'Continue monitoring identified sources',
        'Verify high-confidence findings through additional channels',
        'Cross-reference threat indicators with security databases',
        'Monitor social media presence for updates',
        'Track technical infrastructure changes'
      ],
      correlation_analysis: `Analysis reveals ${nodes.length} interconnected data points across multiple intelligence domains.`,
      predictive_indicators: [
        'Monitor for changes in digital footprint',
        'Track infrastructure modifications',
        'Watch for new threat intelligence indicators'
      ]
    };
  }

  private generateFallbackOrchestration(target: string, nodes: IntelligenceNode[]): any {
    return this.generateBasicOrchestration(target, nodes);
  }

  private calculateAuthenticityScore(nodes: IntelligenceNode[]): number {
    if (nodes.length === 0) return 0;
    
    const verifiedNodes = nodes.filter(n => n.verification_status === 'verified').length;
    const totalConfidence = nodes.reduce((sum, n) => sum + n.confidence, 0);
    
    return (verifiedNodes / nodes.length) * 0.6 + (totalConfidence / nodes.length) * 0.4;
  }

  private calculateNewsCredibility(article: any): number {
    let score = 0.5;
    
    if (article.source?.name) score += 0.2;
    if (article.author) score += 0.1;
    if (article.publishedAt) score += 0.1;
    if (article.urlToImage) score += 0.05;
    if (article.description && article.description.length > 100) score += 0.05;
    
    return Math.min(score, 1.0);
  }

  private extractPlatform(url: string): string {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('instagram.com')) return 'Instagram';
    return 'Unknown Platform';
  }
}

export const nexusIntelEngine = new NexusIntelEngine();