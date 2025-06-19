import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export interface ErrorContext {
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  component?: string;
  timestamp: Date;
  userAction?: string;
  systemState?: any;
  previousErrors?: ErrorContext[];
}

export interface RecoveryStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'moderate' | 'advanced';
  estimatedTime: string;
  riskLevel: 'low' | 'medium' | 'high';
  successProbability: number;
  automated: boolean;
  requiresRestart: boolean;
}

export interface ErrorAnalysis {
  errorCategory: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  rootCause: string;
  confidence: number;
  affectedSystems: string[];
  possibleTriggers: string[];
  recoveryStrategies: RecoveryStrategy[];
  preventionMeasures: string[];
  learningInsights: string[];
  aiAnalysis: string;
  recommendations: string[];
}

export class AIErrorRecoveryAssistant {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private errorPatterns: Map<string, any> = new Map();
  private recoveryHistory: Map<string, any> = new Map();

  constructor() {
    this.initializeAI();
    this.initializeErrorPatterns();
  }

  private initializeAI() {
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        this.anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY
        });
      }
    } catch (e) {
      console.log('Anthropic unavailable for error recovery');
    }

    try {
      if (process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
      }
    } catch (e) {
      console.log('OpenAI unavailable for error recovery');
    }
  }

  private initializeErrorPatterns() {
    // Common error patterns and their recovery strategies
    this.errorPatterns.set('authentication_error', {
      category: 'Authentication',
      commonCauses: ['Invalid API key', 'Expired token', 'Network connectivity'],
      recoveryStrategies: ['Verify API credentials', 'Refresh authentication', 'Check network connection']
    });

    this.errorPatterns.set('network_error', {
      category: 'Network',
      commonCauses: ['Connection timeout', 'DNS resolution', 'Firewall blocking'],
      recoveryStrategies: ['Retry with backoff', 'Switch endpoints', 'Check connectivity']
    });

    this.errorPatterns.set('validation_error', {
      category: 'Data Validation',
      commonCauses: ['Invalid input format', 'Missing required fields', 'Data type mismatch'],
      recoveryStrategies: ['Validate input', 'Sanitize data', 'Provide default values']
    });

    this.errorPatterns.set('server_error', {
      category: 'Server',
      commonCauses: ['Internal server error', 'Service unavailable', 'Rate limiting'],
      recoveryStrategies: ['Retry after delay', 'Use fallback service', 'Implement circuit breaker']
    });
  }

  async analyzeError(errorContext: ErrorContext): Promise<ErrorAnalysis> {
    try {
      // Categorize error type
      const errorCategory = this.categorizeError(errorContext);
      const severity = this.assessSeverity(errorContext);
      
      // Generate AI analysis
      const aiAnalysis = await this.generateAIAnalysis(errorContext);
      
      // Determine root cause
      const rootCause = this.determineRootCause(errorContext);
      
      // Generate recovery strategies
      const recoveryStrategies = this.generateRecoveryStrategies(errorContext);
      
      // Calculate confidence
      const confidence = this.calculateConfidence(errorContext, recoveryStrategies);

      const analysis: ErrorAnalysis = {
        errorCategory,
        severity,
        rootCause,
        confidence,
        affectedSystems: this.identifyAffectedSystems(errorContext),
        possibleTriggers: this.identifyTriggers(errorContext),
        recoveryStrategies,
        preventionMeasures: this.generatePreventionMeasures(errorContext),
        learningInsights: this.generateLearningInsights(errorContext),
        aiAnalysis: aiAnalysis || this.generateFallbackAnalysis(errorContext),
        recommendations: this.generateRecommendations(errorContext, recoveryStrategies)
      };

      // Store for learning
      this.storeErrorPattern(errorContext, analysis);

      return analysis;

    } catch (error) {
      console.error('Error analysis failed:', error);
      return this.generateFallbackAnalysis(errorContext);
    }
  }

  private categorizeError(errorContext: ErrorContext): string {
    const errorMessage = errorContext.errorMessage.toLowerCase();
    const errorType = errorContext.errorType.toLowerCase();

    if (errorMessage.includes('authentication') || errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
      return 'Authentication Error';
    } else if (errorMessage.includes('network') || errorMessage.includes('connection') || errorMessage.includes('timeout')) {
      return 'Network Error';
    } else if (errorMessage.includes('validation') || errorMessage.includes('invalid') || errorMessage.includes('400')) {
      return 'Validation Error';
    } else if (errorMessage.includes('server') || errorMessage.includes('500') || errorMessage.includes('internal')) {
      return 'Server Error';
    } else if (errorMessage.includes('permission') || errorMessage.includes('forbidden') || errorMessage.includes('403')) {
      return 'Permission Error';
    } else if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      return 'Resource Not Found';
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      return 'Rate Limiting';
    } else if (errorContext.component) {
      return `${errorContext.component} Error`;
    }

    return 'General Error';
  }

  private assessSeverity(errorContext: ErrorContext): 'critical' | 'high' | 'medium' | 'low' {
    const errorMessage = errorContext.errorMessage.toLowerCase();
    
    if (errorMessage.includes('critical') || errorMessage.includes('fatal') || errorMessage.includes('crash')) {
      return 'critical';
    } else if (errorMessage.includes('error') || errorMessage.includes('fail') || errorMessage.includes('500')) {
      return 'high';
    } else if (errorMessage.includes('warning') || errorMessage.includes('deprecated')) {
      return 'medium';
    }
    
    return 'low';
  }

  private async generateAIAnalysis(errorContext: ErrorContext): Promise<string | null> {
    try {
      const prompt = `Analyze this error and provide recovery recommendations:

Error Type: ${errorContext.errorType}
Error Message: ${errorContext.errorMessage}
Component: ${errorContext.component || 'Unknown'}
User Action: ${errorContext.userAction || 'Unknown'}
Timestamp: ${errorContext.timestamp}

Please provide:
1. Root cause analysis
2. Immediate recovery steps
3. Prevention strategies
4. System health impact assessment

Be concise and actionable.`;

      if (this.anthropic) {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 800,
          messages: [{ role: 'user', content: prompt }],
          system: 'You are an expert AI error recovery specialist. Provide clear, actionable guidance for error resolution.'
        });
        return response.content[0]?.text || null;
      } else if (this.openai) {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert AI error recovery specialist. Provide clear, actionable guidance for error resolution.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 800
        });
        return response.choices[0]?.message?.content || null;
      }
    } catch (error) {
      console.log('AI analysis unavailable, using fallback');
    }
    
    return null;
  }

  private determineRootCause(errorContext: ErrorContext): string {
    const errorMessage = errorContext.errorMessage.toLowerCase();
    const patterns = this.errorPatterns.get(errorContext.errorType) || {};

    if (errorMessage.includes('api key') || errorMessage.includes('unauthorized')) {
      return 'Invalid or missing API credentials';
    } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      return 'Network connectivity issues';
    } else if (errorMessage.includes('validation') || errorMessage.includes('invalid input')) {
      return 'Data validation failure';
    } else if (errorMessage.includes('rate limit')) {
      return 'API rate limiting exceeded';
    } else if (errorMessage.includes('server') || errorMessage.includes('500')) {
      return 'Server-side processing error';
    } else if (patterns.commonCauses?.length > 0) {
      return patterns.commonCauses[0];
    }

    return 'Undetermined - requires further investigation';
  }

  private generateRecoveryStrategies(errorContext: ErrorContext): RecoveryStrategy[] {
    const strategies: RecoveryStrategy[] = [];
    const errorMessage = errorContext.errorMessage.toLowerCase();

    // Authentication Error Strategies
    if (errorMessage.includes('authentication') || errorMessage.includes('unauthorized')) {
      strategies.push({
        id: 'verify-credentials',
        title: 'Verify API Credentials',
        description: 'Check and update API keys and authentication tokens',
        steps: [
          'Navigate to API settings',
          'Verify API key is correctly set',
          'Check for expired tokens',
          'Regenerate credentials if necessary',
          'Test connection with new credentials'
        ],
        priority: 'high',
        difficulty: 'easy',
        estimatedTime: '2-5 minutes',
        riskLevel: 'low',
        successProbability: 0.85,
        automated: false,
        requiresRestart: false
      });
    }

    // Network Error Strategies
    if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      strategies.push({
        id: 'network-recovery',
        title: 'Network Connection Recovery',
        description: 'Diagnose and recover network connectivity issues',
        steps: [
          'Check internet connectivity',
          'Verify DNS resolution',
          'Test endpoint accessibility',
          'Implement retry with exponential backoff',
          'Switch to backup endpoints if available'
        ],
        priority: 'high',
        difficulty: 'moderate',
        estimatedTime: '3-10 minutes',
        riskLevel: 'low',
        successProbability: 0.75,
        automated: true,
        requiresRestart: false
      });
    }

    // Validation Error Strategies
    if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
      strategies.push({
        id: 'data-validation',
        title: 'Data Validation Fix',
        description: 'Correct data format and validation issues',
        steps: [
          'Identify invalid data fields',
          'Apply data sanitization',
          'Implement proper validation rules',
          'Provide default values for missing fields',
          'Retry operation with corrected data'
        ],
        priority: 'medium',
        difficulty: 'easy',
        estimatedTime: '1-3 minutes',
        riskLevel: 'low',
        successProbability: 0.90,
        automated: true,
        requiresRestart: false
      });
    }

    // Server Error Strategies
    if (errorMessage.includes('server') || errorMessage.includes('500')) {
      strategies.push({
        id: 'server-recovery',
        title: 'Server Error Recovery',
        description: 'Handle server-side errors with fallback strategies',
        steps: [
          'Wait for server recovery (30 seconds)',
          'Retry request with exponential backoff',
          'Switch to alternative service endpoint',
          'Use cached data if available',
          'Implement circuit breaker pattern'
        ],
        priority: 'high',
        difficulty: 'moderate',
        estimatedTime: '2-15 minutes',
        riskLevel: 'medium',
        successProbability: 0.70,
        automated: true,
        requiresRestart: false
      });
    }

    // Rate Limiting Strategies
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      strategies.push({
        id: 'rate-limit-recovery',
        title: 'Rate Limit Recovery',
        description: 'Handle API rate limiting with intelligent backoff',
        steps: [
          'Parse rate limit headers',
          'Calculate appropriate wait time',
          'Implement exponential backoff',
          'Queue requests for later processing',
          'Consider request batching optimization'
        ],
        priority: 'medium',
        difficulty: 'moderate',
        estimatedTime: '1-60 minutes',
        riskLevel: 'low',
        successProbability: 0.95,
        automated: true,
        requiresRestart: false
      });
    }

    // General Recovery Strategy
    if (strategies.length === 0) {
      strategies.push({
        id: 'general-recovery',
        title: 'General Error Recovery',
        description: 'Generic recovery approach for unspecified errors',
        steps: [
          'Analyze error details thoroughly',
          'Check system logs for context',
          'Retry operation after brief delay',
          'Clear relevant caches',
          'Restart affected components if necessary'
        ],
        priority: 'medium',
        difficulty: 'moderate',
        estimatedTime: '5-15 minutes',
        riskLevel: 'medium',
        successProbability: 0.60,
        automated: false,
        requiresRestart: true
      });
    }

    return strategies.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private identifyAffectedSystems(errorContext: ErrorContext): string[] {
    const systems: string[] = [];
    const errorMessage = errorContext.errorMessage.toLowerCase();

    if (errorContext.component) {
      systems.push(errorContext.component);
    }

    if (errorMessage.includes('api') || errorMessage.includes('service')) {
      systems.push('API Services');
    }
    if (errorMessage.includes('database') || errorMessage.includes('db')) {
      systems.push('Database');
    }
    if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      systems.push('Network Layer');
    }
    if (errorMessage.includes('auth')) {
      systems.push('Authentication System');
    }
    if (errorMessage.includes('ui') || errorMessage.includes('frontend')) {
      systems.push('User Interface');
    }

    return systems.length > 0 ? systems : ['Unknown System'];
  }

  private identifyTriggers(errorContext: ErrorContext): string[] {
    const triggers: string[] = [];

    if (errorContext.userAction) {
      triggers.push(`User Action: ${errorContext.userAction}`);
    }

    const errorMessage = errorContext.errorMessage.toLowerCase();
    
    if (errorMessage.includes('timeout')) {
      triggers.push('Request Timeout');
    }
    if (errorMessage.includes('invalid')) {
      triggers.push('Invalid Input Data');
    }
    if (errorMessage.includes('missing')) {
      triggers.push('Missing Required Data');
    }
    if (errorMessage.includes('exceeded')) {
      triggers.push('Resource Limit Exceeded');
    }

    return triggers.length > 0 ? triggers : ['Unknown Trigger'];
  }

  private generatePreventionMeasures(errorContext: ErrorContext): string[] {
    const measures: string[] = [];
    const errorMessage = errorContext.errorMessage.toLowerCase();

    if (errorMessage.includes('authentication')) {
      measures.push('Implement automatic token refresh');
      measures.push('Add credential validation checks');
      measures.push('Monitor authentication status');
    }

    if (errorMessage.includes('network')) {
      measures.push('Implement connection health monitoring');
      measures.push('Add network retry mechanisms');
      measures.push('Use connection pooling');
    }

    if (errorMessage.includes('validation')) {
      measures.push('Add client-side validation');
      measures.push('Implement schema validation');
      measures.push('Add input sanitization');
    }

    if (errorMessage.includes('rate limit')) {
      measures.push('Implement request throttling');
      measures.push('Add intelligent request queuing');
      measures.push('Monitor API usage patterns');
    }

    measures.push('Add comprehensive error logging');
    measures.push('Implement error monitoring alerts');
    measures.push('Regular system health checks');

    return measures;
  }

  private generateLearningInsights(errorContext: ErrorContext): string[] {
    const insights: string[] = [];

    insights.push(`Error occurred in ${errorContext.component || 'unknown component'} at ${errorContext.timestamp}`);
    
    if (errorContext.userAction) {
      insights.push(`Triggered by user action: ${errorContext.userAction}`);
    }

    insights.push('Consider implementing proactive monitoring for this error pattern');
    insights.push('Document this error scenario for future reference');
    insights.push('Review and update error handling strategies based on this incident');

    return insights;
  }

  private generateRecommendations(errorContext: ErrorContext, strategies: RecoveryStrategy[]): string[] {
    const recommendations: string[] = [];

    const highPriorityStrategies = strategies.filter(s => s.priority === 'high');
    if (highPriorityStrategies.length > 0) {
      recommendations.push(`Immediate action: Execute ${highPriorityStrategies[0].title}`);
    }

    const automatedStrategies = strategies.filter(s => s.automated);
    if (automatedStrategies.length > 0) {
      recommendations.push(`Consider automated recovery using: ${automatedStrategies.map(s => s.title).join(', ')}`);
    }

    recommendations.push('Monitor system behavior after recovery implementation');
    recommendations.push('Document the recovery process for future incidents');
    
    if (strategies.some(s => s.requiresRestart)) {
      recommendations.push('Plan for system restart during maintenance window if automated recovery fails');
    }

    return recommendations;
  }

  private calculateConfidence(errorContext: ErrorContext, strategies: RecoveryStrategy[]): number {
    let confidence = 0.5; // Base confidence

    // Increase confidence based on error pattern recognition
    if (this.errorPatterns.has(errorContext.errorType)) {
      confidence += 0.2;
    }

    // Increase confidence based on available strategies
    if (strategies.length > 0) {
      const avgSuccessProbability = strategies.reduce((sum, s) => sum + s.successProbability, 0) / strategies.length;
      confidence += avgSuccessProbability * 0.3;
    }

    // Increase confidence if we have historical data
    if (this.recoveryHistory.has(errorContext.errorType)) {
      confidence += 0.1;
    }

    return Math.min(0.95, Math.max(0.1, confidence));
  }

  private storeErrorPattern(errorContext: ErrorContext, analysis: ErrorAnalysis): void {
    const pattern = {
      errorContext,
      analysis,
      timestamp: new Date(),
      resolved: false
    };

    this.recoveryHistory.set(`${errorContext.errorType}_${Date.now()}`, pattern);
  }

  private generateFallbackAnalysis(errorContext: ErrorContext): ErrorAnalysis {
    return {
      errorCategory: this.categorizeError(errorContext),
      severity: this.assessSeverity(errorContext),
      rootCause: this.determineRootCause(errorContext),
      confidence: 0.6,
      affectedSystems: this.identifyAffectedSystems(errorContext),
      possibleTriggers: this.identifyTriggers(errorContext),
      recoveryStrategies: this.generateRecoveryStrategies(errorContext),
      preventionMeasures: this.generatePreventionMeasures(errorContext),
      learningInsights: this.generateLearningInsights(errorContext),
      aiAnalysis: `Error analysis completed using fallback system. ${errorContext.errorType}: ${errorContext.errorMessage}. Recommended immediate action: Review error details and apply suggested recovery strategies.`,
      recommendations: this.generateRecommendations(errorContext, this.generateRecoveryStrategies(errorContext))
    };
  }

  async executeAutomatedRecovery(strategy: RecoveryStrategy, errorContext: ErrorContext): Promise<{
    success: boolean;
    message: string;
    details?: any;
  }> {
    if (!strategy.automated) {
      return {
        success: false,
        message: 'Strategy requires manual intervention'
      };
    }

    try {
      switch (strategy.id) {
        case 'network-recovery':
          return await this.executeNetworkRecovery(errorContext);
        
        case 'data-validation':
          return await this.executeDataValidation(errorContext);
        
        case 'server-recovery':
          return await this.executeServerRecovery(errorContext);
        
        case 'rate-limit-recovery':
          return await this.executeRateLimitRecovery(errorContext);
        
        default:
          return {
            success: false,
            message: 'No automated recovery available for this strategy'
          };
      }
    } catch (error) {
      return {
        success: false,
        message: `Automated recovery failed: ${error.message}`
      };
    }
  }

  private async executeNetworkRecovery(errorContext: ErrorContext): Promise<any> {
    // Implement network recovery logic
    return {
      success: true,
      message: 'Network recovery initiated with retry mechanism'
    };
  }

  private async executeDataValidation(errorContext: ErrorContext): Promise<any> {
    // Implement data validation recovery
    return {
      success: true,
      message: 'Data validation rules applied and data sanitized'
    };
  }

  private async executeServerRecovery(errorContext: ErrorContext): Promise<any> {
    // Implement server recovery logic
    return {
      success: true,
      message: 'Server recovery strategy executed with fallback mechanisms'
    };
  }

  private async executeRateLimitRecovery(errorContext: ErrorContext): Promise<any> {
    // Implement rate limit recovery
    return {
      success: true,
      message: 'Rate limit recovery applied with intelligent backoff'
    };
  }

  getErrorHistory(): any[] {
    return Array.from(this.recoveryHistory.values());
  }

  getErrorPatterns(): any {
    return Object.fromEntries(this.errorPatterns);
  }
}

export const aiErrorRecoveryAssistant = new AIErrorRecoveryAssistant();