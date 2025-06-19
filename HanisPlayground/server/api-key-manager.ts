/**
 * Centralized API Key Management System
 * Manages all provided API keys for professional intelligence operations
 */

interface APIKeyConfiguration {
  [key: string]: {
    key: string;
    endpoint?: string;
    headers?: { [key: string]: string };
    queryParam?: string;
  };
}

export class APIKeyManager {
  private static instance: APIKeyManager;
  private apiKeys: APIKeyConfiguration;

  private constructor() {
    this.apiKeys = {
      // OSINT and Intelligence APIs
      'api-ninjas': {
        key: 'E5ysxTrLNQUiGYEa-C8OnA-zpGKF7Zn73yHx2sH',
        headers: { 'X-Api-Key': 'E5ysxTrLNQUiGYEa-C8OnA-zpGKF7Zn73yHx2sH' }
      },
      'hunter-io': {
        key: '2f02912104d50dcd835b07dc6645c51cd20ea718',
        queryParam: 'api_key'
      },
      'intelx': {
        key: '5627edd2-2cbf-4b4b-81cd-058afe8b7cb2',
        headers: { 'x-key': '5627edd2-2cbf-4b4b-81cd-058afe8b7cb2' }
      },
      'serp-api': {
        key: '42048d49ef4bd455daf5433cfa04cb52e6da3cefdb353af27eeaa88edc020bfb',
        queryParam: 'api_key'
      },
      'ip2whois': {
        key: '75B58F1D17A6C7241E8011026670BB51',
        queryParam: 'key'
      },
      'ip2location': {
        key: '75B58F1D17A6C7241E8011026670BB51',
        queryParam: 'key'
      },
      'numverify': {
        key: '06bf6b0a8d6772d2648af9214d2e5d37',
        queryParam: 'access_key'
      },
      'newsapi': {
        key: '1997f4a208f84a94968116e690742727',
        headers: { 'X-API-Key': '1997f4a208f84a94968116e690742727' }
      },

      // Business Intelligence APIs
      'apollo-io': {
        key: 'user:gh.5b40b07d-9236-485e-bb1d-45589617c50d:lqh7z1HOSLjnezu6P2nLUg',
        headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
      },
      'builtwith': {
        key: 'cc6e550c-956a-4dec-a577-b9264a73f0c7',
        queryParam: 'KEY'
      },
      'hubspot': {
        key: 'na2-2628-d044-41bd-97b9-080357278da9',
        headers: { 'Authorization': 'Bearer na2-2628-d044-41bd-97b9-080357278da9' }
      },

      // Market and Financial APIs
      'marketstack': {
        key: 'c2da4a0601a03719c22c36d03179fb4e',
        queryParam: 'access_key'
      },
      'weatherstack': {
        key: 'a1fd2af06b1d67e81429dedf23b0f2fc',
        queryParam: 'access_key'
      },

      // AI Enhancement APIs
      'cohere': {
        key: '6sVORFeeXZESMwpk6Xu7CRAUyqTUF4ENs4iTqEfL',
        headers: { 'Authorization': 'Bearer 6sVORFeeXZESMwpk6Xu7CRAUyqTUF4ENs4iTqEfL' }
      },
      'mistral': {
        key: '4Y4d2aNV2dz8ztGvu9Xef6vAvba3VJGM',
        headers: { 'Authorization': 'Bearer 4Y4d2aNV2dz8ztGvu9Xef6vAvba3VJGM' }
      },
      'voyage-ai': {
        key: 'pa-Kz136-x0xKNGmdls4gUdYgsj-7CROFVzWIFX5ZPCh7F',
        headers: { 'Authorization': 'Bearer pa-Kz136-x0xKNGmdls4gUdYgsj-7CROFVzWIFX5ZPCh7F' }
      },

      // Additional APIs
      'openrouter': {
        key: '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',
        headers: { 'Authorization': 'Bearer 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' }
      },
      'x-rapidapi': {
        key: 'ed5f47f768mmsh1eea963e31dae61p1fac3djsnb4de869ab536',
        headers: { 'X-RapidAPI-Key': 'ed5f47f768mmsh1eea963e31dae61p1fac3djsnb4de869ab536' }
      },
      'apistack': {
        key: '6ed23162268a456eb9ef21aeaf593c0f',
        queryParam: 'access_key'
      }
    };
  }

  public static getInstance(): APIKeyManager {
    if (!APIKeyManager.instance) {
      APIKeyManager.instance = new APIKeyManager();
    }
    return APIKeyManager.instance;
  }

  public getAPIKey(service: string): string | null {
    return this.apiKeys[service]?.key || null;
  }

  public getHeaders(service: string): { [key: string]: string } {
    return this.apiKeys[service]?.headers || {};
  }

  public getQueryParam(service: string): string | null {
    return this.apiKeys[service]?.queryParam || null;
  }

  public isConfigured(service: string): boolean {
    return !!this.apiKeys[service];
  }

  public getAllConfiguredServices(): string[] {
    return Object.keys(this.apiKeys);
  }

  public getServiceConfiguration(service: string) {
    return this.apiKeys[service] || null;
  }

  public addAPIKey(service: string, configuration: any) {
    this.apiKeys[service] = configuration;
  }

  public updateAPIKey(service: string, key: string) {
    if (this.apiKeys[service]) {
      this.apiKeys[service].key = key;
    }
  }

  public validateAPIKey(service: string): boolean {
    const config = this.apiKeys[service];
    return config && config.key && config.key.length > 0;
  }

  public getStatistics() {
    const services = Object.keys(this.apiKeys);
    const categories = {
      osint: 0,
      business: 0,
      ai: 0,
      financial: 0,
      geolocation: 0,
      communication: 0
    };

    services.forEach(service => {
      if (['api-ninjas', 'hunter-io', 'intelx', 'serp-api', 'newsapi'].includes(service)) {
        categories.osint++;
      } else if (['apollo-io', 'builtwith', 'hubspot'].includes(service)) {
        categories.business++;
      } else if (['cohere', 'mistral', 'voyage-ai', 'openrouter'].includes(service)) {
        categories.ai++;
      } else if (['marketstack', 'weatherstack'].includes(service)) {
        categories.financial++;
      } else if (['ip2whois', 'ip2location', 'numverify'].includes(service)) {
        categories.geolocation++;
      } else {
        categories.communication++;
      }
    });

    return {
      total_services: services.length,
      categories,
      configured_services: services,
      validation_status: services.map(service => ({
        service,
        valid: this.validateAPIKey(service)
      }))
    };
  }
}

export const apiKeyManager = APIKeyManager.getInstance();