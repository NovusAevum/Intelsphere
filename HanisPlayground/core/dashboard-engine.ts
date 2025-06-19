/**
 * Core Dashboard Engine - Business Logic Layer
 * Handles all dashboard operations and data management
 */

export interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  component: string;
  capabilities: string[];
  apiEndpoints: string[];
  active: boolean;
}

export interface ServiceStatus {
  name: string;
  active: boolean;
  model?: string;
  responseTime?: number;
  lastCheck: Date;
}

export class DashboardEngine {
  private modules: Map<string, DashboardModule> = new Map();
  private serviceStatuses: Map<string, ServiceStatus> = new Map();

  constructor() {
    this.initializeModules();
  }

  private initializeModules() {
    const coreModules: DashboardModule[] = [
      {
        id: 'ai-chat',
        name: 'AI Chat',
        description: 'Engage with advanced AI models for intelligent conversations and assistance',
        icon: '🤖',
        path: '/chat',
        component: 'AIChatModule',
        capabilities: ['conversation', 'analysis', 'assistance'],
        apiEndpoints: ['/api/chat'],
        active: true
      },
      {
        id: 'business-intelligence',
        name: 'Business Intelligence',
        description: 'Comprehensive business analysis and strategic insights for decision making',
        icon: '📊',
        path: '/business',
        component: 'BusinessIntelligenceModule',
        capabilities: ['analysis', 'competitive-intelligence', 'market-positioning'],
        apiEndpoints: ['/api/business-analysis'],
        active: true
      },
      {
        id: 'market-research',
        name: 'Market Research',
        description: 'In-depth market analysis and competitive intelligence research',
        icon: '🔍',
        path: '/research',
        component: 'MarketResearchModule',
        capabilities: ['market-analysis', 'competitor-research', 'industry-trends'],
        apiEndpoints: ['/api/market-research'],
        active: true
      },
      {
        id: 'osint-intelligence',
        name: 'OSINT Intelligence',
        description: 'Open Source Intelligence gathering and analysis',
        icon: '🕵️',
        path: '/osint',
        component: 'OSINTModule',
        capabilities: ['intelligence-gathering', 'data-analysis', 'threat-assessment'],
        apiEndpoints: ['/api/osint'],
        active: false
      },
      {
        id: 'financial-analysis',
        name: 'Financial Analysis',
        description: 'Advanced financial modeling and investment analysis',
        icon: '💰',
        path: '/finance',
        component: 'FinancialModule',
        capabilities: ['financial-modeling', 'risk-assessment', 'portfolio-analysis'],
        apiEndpoints: ['/api/financial'],
        active: false
      }
    ];

    coreModules.forEach(module => {
      this.modules.set(module.id, module);
    });
  }

  getActiveModules(): DashboardModule[] {
    return Array.from(this.modules.values()).filter(module => module.active);
  }

  getAllModules(): DashboardModule[] {
    return Array.from(this.modules.values());
  }

  getModule(id: string): DashboardModule | undefined {
    return this.modules.get(id);
  }

  activateModule(id: string): boolean {
    const module = this.modules.get(id);
    if (module) {
      module.active = true;
      return true;
    }
    return false;
  }

  deactivateModule(id: string): boolean {
    const module = this.modules.get(id);
    if (module) {
      module.active = false;
      return true;
    }
    return false;
  }

  updateServiceStatus(serviceName: string, status: Partial<ServiceStatus>) {
    const existing = this.serviceStatuses.get(serviceName) || {
      name: serviceName,
      active: false,
      lastCheck: new Date()
    };

    this.serviceStatuses.set(serviceName, {
      ...existing,
      ...status,
      lastCheck: new Date()
    });
  }

  getServiceStatuses(): ServiceStatus[] {
    return Array.from(this.serviceStatuses.values());
  }

  getActiveServices(): ServiceStatus[] {
    return this.getServiceStatuses().filter(service => service.active);
  }

  generateDashboardConfig() {
    return {
      modules: this.getActiveModules(),
      services: this.getServiceStatuses(),
      navigation: this.generateNavigation(),
      capabilities: this.generateCapabilityMatrix()
    };
  }

  private generateNavigation() {
    return this.getActiveModules().map(module => ({
      label: module.name,
      path: module.path,
      icon: module.icon,
      component: module.component
    }));
  }

  private generateCapabilityMatrix() {
    const matrix: Record<string, string[]> = {};
    this.getActiveModules().forEach(module => {
      matrix[module.id] = module.capabilities;
    });
    return matrix;
  }

  async performHealthCheck(): Promise<{
    overall: 'healthy' | 'degraded' | 'critical';
    services: number;
    modules: number;
    issues: string[];
  }> {
    const activeServices = this.getActiveServices().length;
    const activeModules = this.getActiveModules().length;
    const issues: string[] = [];

    if (activeServices === 0) {
      issues.push('No AI services active');
    }

    if (activeModules < 3) {
      issues.push('Limited module availability');
    }

    const overall = issues.length === 0 ? 'healthy' : 
                   issues.length < 3 ? 'degraded' : 'critical';

    return {
      overall,
      services: activeServices,
      modules: activeModules,
      issues
    };
  }
}

export const dashboardEngine = new DashboardEngine();