import { advancedAIEngine } from './advanced-ai-engine';

interface APIConfiguration {
  name: string;
  baseUrl: string;
  apiKey: string;
  category: 'osint' | 'ai' | 'social' | 'business' | 'threat' | 'geolocation' | 'domain' | 'communication';
  description: string;
  endpoints: { [key: string]: string };
  rateLimit?: number;
  authentication: 'header' | 'query' | 'bearer';
}

interface OSINTAPIResult {
  source: string;
  category: string;
  data: any;
  timestamp: string;
  confidence: number;
  metadata: any;
}

export class ComprehensiveAPIIntegration {
  private apiConfigurations: Map<string, APIConfiguration> = new Map();

  constructor() {
    this.initializeAPIConfigurations();
  }

  private initializeAPIConfigurations() {
    // OSINT and Intelligence APIs
    this.apiConfigurations.set('hunter', {
      name: 'Hunter.io',
      baseUrl: 'https://api.hunter.io/v2',
      apiKey: '2f02912104d50dcd835b07dc6645c51cd20ea718',
      category: 'osint',
      description: 'Email discovery and verification for business intelligence',
      endpoints: {
        domainSearch: '/domain-search',
        emailFinder: '/email-finder',
        emailVerifier: '/email-verifier',
        emailCount: '/email-count'
      },
      authentication: 'query'
    });

    this.apiConfigurations.set('intelx', {
      name: 'IntelX',
      baseUrl: 'https://2.intelx.io',
      apiKey: '5627edd2-2cbf-4b4b-81cd-058afe8b7cb2',
      category: 'osint',
      description: 'Deep web and darknet intelligence search',
      endpoints: {
        search: '/intelligent/search',
        file: '/file/read',
        phonebook: '/phonebook/search'
      },
      authentication: 'header'
    });

    this.apiConfigurations.set('serp', {
      name: 'SERP API',
      baseUrl: 'https://serpapi.com',
      apiKey: '42048d49ef4bd455daf5433cfa04cb52e6da3cefdb353af27eeaa88edc020bfb',
      category: 'osint',
      description: 'Search engine results and web scraping',
      endpoints: {
        google: '/search',
        images: '/search',
        news: '/search',
        shopping: '/search'
      },
      authentication: 'query'
    });

    this.apiConfigurations.set('ip2whois', {
      name: 'IP2WHOIS',
      baseUrl: 'https://api.ip2whois.com/v2',
      apiKey: '75B58F1D17A6C7241E8011026670BB51',
      category: 'domain',
      description: 'Domain WHOIS information and analysis',
      endpoints: {
        whois: '',
        bulk: '/bulk'
      },
      authentication: 'query'
    });

    this.apiConfigurations.set('ip2location', {
      name: 'IP2Location',
      baseUrl: 'https://api.ip2location.io',
      apiKey: '75B58F1D17A6C7241E8011026670BB51',
      category: 'geolocation',
      description: 'IP geolocation and analysis',
      endpoints: {
        lookup: '',
        bulk: '/bulk'
      },
      authentication: 'query'
    });

    // Business Intelligence APIs
    this.apiConfigurations.set('apollo', {
      name: 'Apollo.io',
      baseUrl: 'https://api.apollo.io/v1',
      apiKey: 'your_apollo_api_key_here',
      category: 'business',
      description: 'B2B sales intelligence and lead generation',
      endpoints: {
        people: '/people/search',
        companies: '/organizations/search',
        emailFinder: '/email_finder',
        mixedPeople: '/mixed_people/search'
      },
      authentication: 'header'
    });

    this.apiConfigurations.set('builtwith', {
      name: 'BuiltWith',
      baseUrl: 'https://api.builtwith.com/v21',
      apiKey: 'your_builtwith_api_key_here',
      category: 'osint',
      description: 'Website technology profiling and analysis',
      endpoints: {
        domain: '/api',
        trends: '/trends/api',
        lists: '/lists/api'
      },
      authentication: 'query'
    });

    this.apiConfigurations.set('hubspot', {
      name: 'HubSpot',
      baseUrl: 'https://api.hubapi.com',
      apiKey: 'your_hubspot_api_key_here',
      category: 'business',
      description: 'CRM and marketing intelligence',
      endpoints: {
        contacts: '/crm/v3/objects/contacts',
        companies: '/crm/v3/objects/companies',
        deals: '/crm/v3/objects/deals'
      },
      authentication: 'bearer'
    });

    // Data and Analytics APIs
    this.apiConfigurations.set('ninjas', {
      name: 'API Ninjas',
      baseUrl: 'https://api.api-ninjas.com/v1',
      apiKey: 'your_api_ninjas_key_here',
      category: 'osint',
      description: 'Multi-purpose data collection and analysis',
      endpoints: {
        companies: '/companies',
        whois: '/whois',
        dnslookup: '/dnslookup',
        iplookup: '/iplookup',
        email: '/validateemail'
      },
      authentication: 'header'
    });

    this.apiConfigurations.set('numverify', {
      name: 'Numverify',
      baseUrl: 'http://apilayer.net/api',
      apiKey: 'your_numverify_api_key_here',
      category: 'osint',
      description: 'Phone number validation and lookup',
      endpoints: {
        validate: '/validate'
      },
      authentication: 'query'
    });

    // Social Media and Communication APIs
    this.apiConfigurations.set('newsapi', {
      name: 'NewsAPI',
      baseUrl: 'https://newsapi.org/v2',
      apiKey: 'your_news_api_key_here',
      category: 'osint',
      description: 'News articles and media monitoring',
      endpoints: {
        everything: '/everything',
        topHeadlines: '/top-headlines',
        sources: '/sources'
      },
      authentication: 'header'
    });

    // Market and Financial APIs
    this.apiConfigurations.set('marketstack', {
      name: 'MarketStack',
      baseUrl: 'http://api.marketstack.com/v1',
      apiKey: 'your_marketstack_api_key_here',
      category: 'business',
      description: 'Stock market data and financial intelligence',
      endpoints: {
        eod: '/eod',
        tickers: '/tickers',
        exchanges: '/exchanges'
      },
      authentication: 'query'
    });

    // Weather and Environmental APIs
    this.apiConfigurations.set('weatherstack', {
      name: 'WeatherStack',
      baseUrl: 'http://api.weatherstack.com',
      apiKey: 'your_weatherstack_api_key_here',
      category: 'geolocation',
      description: 'Weather data for location intelligence',
      endpoints: {
        current: '/current',
        historical: '/historical',
        forecast: '/forecast'
      },
      authentication: 'query'
    });

    // AI Enhancement APIs
    this.apiConfigurations.set('cohere', {
      name: 'Cohere',
      baseUrl: 'https://api.cohere.ai/v1',
      apiKey: 'your_cohere_api_key_here',
      category: 'ai',
      description: 'Advanced NLP and text analysis',
      endpoints: {
        generate: '/generate',
        classify: '/classify',
        embed: '/embed',
        summarize: '/summarize'
      },
      authentication: 'bearer'
    });

    this.apiConfigurations.set('mistral', {
      name: 'Mistral AI',
      baseUrl: 'https://api.mistral.ai/v1',
      apiKey: 'your_mistral_api_key_here',
      category: 'ai',
      description: 'Advanced language model for analysis',
      endpoints: {
        chat: '/chat/completions',
        embeddings: '/embeddings'
      },
      authentication: 'bearer'
    });

    this.apiConfigurations.set('voyage', {
      name: 'Voyage AI',
      baseUrl: 'https://api.voyageai.com/v1',
      apiKey: 'your_voyage_api_key_here',
      category: 'ai',
      description: 'Embedding and semantic analysis',
      endpoints: {
        embeddings: '/embeddings'
      },
      authentication: 'bearer'
    });
  }

  async performComprehensiveOSINT(target: string, requirements: string[]): Promise<{
    results: OSINTAPIResult[];
    summary: string;
    confidence: number;
    recommendations: string[];
  }> {
    const results: OSINTAPIResult[] = [];
    
    try {
      // Domain and Infrastructure Intelligence
      if (this.isDomain(target)) {
        results.push(...await this.gatherDomainIntelligence(target));
      }

      // Email Intelligence
      if (this.isEmail(target)) {
        results.push(...await this.gatherEmailIntelligence(target));
      }

      // IP Intelligence
      if (this.isIP(target)) {
        results.push(...await this.gatherIPIntelligence(target));
      }

      // Phone Intelligence
      if (this.isPhone(target)) {
        results.push(...await this.gatherPhoneIntelligence(target));
      }

      // Company Intelligence
      results.push(...await this.gatherCompanyIntelligence(target));

      // News and Media Intelligence
      results.push(...await this.gatherNewsIntelligence(target));

      // Deep Web Intelligence
      results.push(...await this.gatherDeepWebIntelligence(target));

      // Technology Intelligence
      if (this.isDomain(target)) {
        results.push(...await this.gatherTechnologyIntelligence(target));
      }

      // Generate AI-enhanced summary
      const summary = await this.generateIntelligenceSummary(results, target, requirements);
      const confidence = this.calculateOverallConfidence(results);
      const recommendations = this.generateRecommendations(results, requirements);

      return {
        results,
        summary,
        confidence,
        recommendations
      };

    } catch (error) {
      console.error('Comprehensive OSINT error:', error);
      return {
        results: [],
        summary: 'OSINT collection encountered technical difficulties',
        confidence: 0,
        recommendations: ['Retry with different parameters', 'Check API connectivity']
      };
    }
  }

  private async gatherDomainIntelligence(domain: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // WHOIS Information
      const whoisData = await this.makeAPIRequest('ip2whois', '', {
        key: this.apiConfigurations.get('ip2whois')!.apiKey,
        domain: domain
      });

      if (whoisData) {
        results.push({
          source: 'IP2WHOIS',
          category: 'domain',
          data: whoisData,
          timestamp: new Date().toISOString(),
          confidence: 0.95,
          metadata: { type: 'whois_lookup' }
        });
      }

      // Domain Technology Stack
      const techData = await this.makeAPIRequest('builtwith', '/api', {
        KEY: this.apiConfigurations.get('builtwith')!.apiKey,
        LOOKUP: domain
      });

      if (techData) {
        results.push({
          source: 'BuiltWith',
          category: 'osint',
          data: techData,
          timestamp: new Date().toISOString(),
          confidence: 0.90,
          metadata: { type: 'technology_stack' }
        });
      }

      // DNS Lookup
      const dnsData = await this.makeAPIRequest('ninjas', '/dnslookup', {
        domain: domain
      }, 'ninjas');

      if (dnsData) {
        results.push({
          source: 'API Ninjas DNS',
          category: 'osint',
          data: dnsData,
          timestamp: new Date().toISOString(),
          confidence: 0.92,
          metadata: { type: 'dns_lookup' }
        });
      }

    } catch (error) {
      console.log('Domain intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherEmailIntelligence(email: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];
    const domain = email.split('@')[1];

    try {
      // Hunter.io Email Verification
      const hunterData = await this.makeAPIRequest('hunter', '/email-verifier', {
        email: email,
        api_key: this.apiConfigurations.get('hunter')!.apiKey
      });

      if (hunterData) {
        results.push({
          source: 'Hunter.io',
          category: 'osint',
          data: hunterData,
          timestamp: new Date().toISOString(),
          confidence: 0.88,
          metadata: { type: 'email_verification' }
        });
      }

      // Domain Analysis for Email
      if (domain) {
        const domainResults = await this.gatherDomainIntelligence(domain);
        results.push(...domainResults);
      }

    } catch (error) {
      console.log('Email intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherIPIntelligence(ip: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // IP Geolocation
      const geoData = await this.makeAPIRequest('ip2location', '', {
        key: this.apiConfigurations.get('ip2location')!.apiKey,
        ip: ip
      });

      if (geoData) {
        results.push({
          source: 'IP2Location',
          category: 'geolocation',
          data: geoData,
          timestamp: new Date().toISOString(),
          confidence: 0.93,
          metadata: { type: 'ip_geolocation' }
        });
      }

      // IP Lookup via API Ninjas
      const ipData = await this.makeAPIRequest('ninjas', '/iplookup', {
        address: ip
      }, 'ninjas');

      if (ipData) {
        results.push({
          source: 'API Ninjas IP',
          category: 'osint',
          data: ipData,
          timestamp: new Date().toISOString(),
          confidence: 0.90,
          metadata: { type: 'ip_lookup' }
        });
      }

    } catch (error) {
      console.log('IP intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherPhoneIntelligence(phone: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // Phone Number Validation
      const phoneData = await this.makeAPIRequest('numverify', '/validate', {
        access_key: this.apiConfigurations.get('numverify')!.apiKey,
        number: phone
      });

      if (phoneData) {
        results.push({
          source: 'Numverify',
          category: 'osint',
          data: phoneData,
          timestamp: new Date().toISOString(),
          confidence: 0.87,
          metadata: { type: 'phone_validation' }
        });
      }

    } catch (error) {
      console.log('Phone intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherCompanyIntelligence(target: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // Company Search via Apollo
      const apolloData = await this.makeAPIRequest('apollo', '/organizations/search', {
        q_name: target,
        per_page: 10
      }, 'apollo');

      if (apolloData) {
        results.push({
          source: 'Apollo.io',
          category: 'business',
          data: apolloData,
          timestamp: new Date().toISOString(),
          confidence: 0.85,
          metadata: { type: 'company_search' }
        });
      }

      // Company Information via API Ninjas
      const companyData = await this.makeAPIRequest('ninjas', '/companies', {
        name: target
      }, 'ninjas');

      if (companyData) {
        results.push({
          source: 'API Ninjas Companies',
          category: 'business',
          data: companyData,
          timestamp: new Date().toISOString(),
          confidence: 0.82,
          metadata: { type: 'company_info' }
        });
      }

    } catch (error) {
      console.log('Company intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherNewsIntelligence(target: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // News Search
      const newsData = await this.makeAPIRequest('newsapi', '/everything', {
        q: target,
        pageSize: 20,
        sortBy: 'relevancy'
      }, 'newsapi');

      if (newsData) {
        results.push({
          source: 'NewsAPI',
          category: 'osint',
          data: newsData,
          timestamp: new Date().toISOString(),
          confidence: 0.78,
          metadata: { type: 'news_search' }
        });
      }

    } catch (error) {
      console.log('News intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherDeepWebIntelligence(target: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // IntelX Search
      const intelxData = await this.makeAPIRequest('intelx', '/intelligent/search', {
        term: target,
        maxresults: 100,
        media: 0,
        sort: 4
      }, 'intelx');

      if (intelxData) {
        results.push({
          source: 'IntelX',
          category: 'osint',
          data: intelxData,
          timestamp: new Date().toISOString(),
          confidence: 0.80,
          metadata: { type: 'deep_web_search' }
        });
      }

    } catch (error) {
      console.log('Deep web intelligence gathering error:', error);
    }

    return results;
  }

  private async gatherTechnologyIntelligence(domain: string): Promise<OSINTAPIResult[]> {
    const results: OSINTAPIResult[] = [];

    try {
      // SERP API for Technology Research
      const serpData = await this.makeAPIRequest('serp', '/search', {
        q: `${domain} technology stack site:stackshare.io OR site:github.com`,
        api_key: this.apiConfigurations.get('serp')!.apiKey,
        engine: 'google',
        num: 10
      });

      if (serpData) {
        results.push({
          source: 'SERP Technology',
          category: 'osint',
          data: serpData,
          timestamp: new Date().toISOString(),
          confidence: 0.75,
          metadata: { type: 'technology_research' }
        });
      }

    } catch (error) {
      console.log('Technology intelligence gathering error:', error);
    }

    return results;
  }

  private async makeAPIRequest(configKey: string, endpoint: string, params: any, authKey?: string): Promise<any> {
    const config = this.apiConfigurations.get(authKey || configKey);
    if (!config) return null;

    try {
      const url = new URL(config.baseUrl + endpoint);
      const headers: any = {
        'User-Agent': 'IntelSphere-OSINT/1.0'
      };

      if (config.authentication === 'header') {
        if (configKey === 'intelx') {
          headers['x-key'] = config.apiKey;
        } else if (configKey === 'ninjas') {
          headers['X-Api-Key'] = config.apiKey;
        } else if (configKey === 'newsapi') {
          headers['X-API-Key'] = config.apiKey;
        } else if (configKey === 'apollo') {
          headers['Cache-Control'] = 'no-cache';
          headers['Content-Type'] = 'application/json';
        }
      } else if (config.authentication === 'bearer') {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
      }

      if (config.authentication === 'query' || configKey === 'serp') {
        Object.keys(params).forEach(key => {
          url.searchParams.append(key, params[key]);
        });
      }

      const requestOptions: RequestInit = {
        method: 'GET',
        headers
      };

      if (config.authentication === 'header' && (configKey === 'apollo' || configKey === 'intelx')) {
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify(params);
      }

      const response = await fetch(url.toString(), requestOptions);
      
      if (!response.ok) {
        console.log(`API request failed for ${config.name}: ${response.status}`);
        return null;
      }

      return await response.json();

    } catch (error) {
      console.log(`API request error for ${config.name}:`, error);
      return null;
    }
  }

  private async generateIntelligenceSummary(results: OSINTAPIResult[], target: string, requirements: string[]): Promise<string> {
    try {
      const summaryPrompt = `Analyze the following OSINT intelligence collection results for target "${target}":

Requirements: ${requirements.join(', ')}

Intelligence Sources (${results.length} total):
${results.map(r => `- ${r.source} (${r.category}): ${r.confidence * 100}% confidence`).join('\n')}

Sample Data:
${results.slice(0, 3).map(r => `${r.source}: ${JSON.stringify(r.data).substring(0, 200)}...`).join('\n\n')}

Provide a professional intelligence assessment with key findings, threat indicators, and strategic insights.`;

      const analysis = await advancedAIEngine.generateEnsembleResponse(
        summaryPrompt,
        'intelligence-analyst',
        'english'
      );

      return analysis.content;
    } catch (error) {
      return `Professional OSINT Analysis for ${target}:

Data Collection Summary:
- Total intelligence sources: ${results.length}
- Categories covered: ${[...new Set(results.map(r => r.category))].join(', ')}
- Average confidence: ${(results.reduce((sum, r) => sum + r.confidence, 0) / results.length * 100).toFixed(1)}%

Key Intelligence Sources:
${results.slice(0, 5).map(r => `• ${r.source}: ${r.metadata.type} (${(r.confidence * 100).toFixed(1)}% confidence)`).join('\n')}

Recommendation: Manual analysis required for detailed threat assessment and strategic insights.`;
    }
  }

  private calculateOverallConfidence(results: OSINTAPIResult[]): number {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length * 100);
  }

  private generateRecommendations(results: OSINTAPIResult[], requirements: string[]): string[] {
    const recommendations = [];
    const categories = [...new Set(results.map(r => r.category))];
    
    if (categories.includes('domain')) {
      recommendations.push('Monitor domain infrastructure changes');
    }
    if (categories.includes('business')) {
      recommendations.push('Track company intelligence updates');
    }
    if (categories.includes('osint')) {
      recommendations.push('Continue deep web monitoring');
    }
    if (results.length > 10) {
      recommendations.push('High-confidence intelligence collection achieved');
    }
    
    recommendations.push('Schedule periodic intelligence refresh');
    return recommendations;
  }

  private isDomain(target: string): boolean {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(target);
  }

  private isEmail(target: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target);
  }

  private isIP(target: string): boolean {
    return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(target) || /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(target);
  }

  private isPhone(target: string): boolean {
    return /^\+?[1-9]\d{1,14}$/.test(target.replace(/\s+/g, ''));
  }

  getAPIStatistics(): any {
    const stats = {
      total_apis: this.apiConfigurations.size,
      categories: {} as any,
      apis: Array.from(this.apiConfigurations.values()).map(config => ({
        name: config.name,
        category: config.category,
        description: config.description,
        endpoints: Object.keys(config.endpoints).length
      }))
    };

    // Count by category
    this.apiConfigurations.forEach(config => {
      stats.categories[config.category] = (stats.categories[config.category] || 0) + 1;
    });

    return stats;
  }
}

export const comprehensiveAPIIntegration = new ComprehensiveAPIIntegration();