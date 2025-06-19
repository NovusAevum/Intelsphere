import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

interface AIProvider {
  name: string;
  model: string;
  strengths: string[];
  capabilities: string[];
}

interface MultiAIRequest {
  prompt: string;
  task_type: 'research' | 'analysis' | 'reconnaissance' | 'creative' | 'technical' | 'strategic';
  complexity: 'basic' | 'advanced' | 'expert' | 'maximum';
  require_consensus?: boolean;
  preferred_providers?: string[];
}

interface AIResponse {
  provider: string;
  model: string;
  response: string;
  confidence: number;
  reasoning: string;
  metadata: {
    tokens_used?: number;
    processing_time: number;
    quality_score: number;
  };
}

interface MultiAIResult {
  task_id: string;
  request: MultiAIRequest;
  responses: AIResponse[];
  consensus_analysis?: {
    agreement_score: number;
    conflicting_points: string[];
    synthesized_result: string;
    confidence_level: number;
  };
  final_recommendation: string;
  processing_summary: {
    total_time: number;
    providers_used: string[];
    total_tokens: number;
    quality_assessment: string;
  };
}

export class MultiAIEngine {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private gemini: GoogleGenerativeAI;
  
  private providers: AIProvider[] = [
    {
      name: 'anthropic',
      model: 'claude-sonnet-4-20250514',
      strengths: ['Analysis', 'Reasoning', 'Research', 'Ethics', 'Complex Problem Solving'],
      capabilities: ['Long-form analysis', 'Code review', 'Research synthesis', 'Strategic planning']
    },
    {
      name: 'openai',
      model: 'gpt-4o',
      strengths: ['Creativity', 'Code Generation', 'Versatility', 'Multimodal', 'Speed'],
      capabilities: ['Creative writing', 'Image analysis', 'Code generation', 'Quick responses']
    },
    {
      name: 'gemini',
      model: 'gemini-1.5-pro',
      strengths: ['Google Integration', 'Real-time Data', 'Factual Accuracy', 'Search Integration'],
      capabilities: ['Web search integration', 'Factual verification', 'Real-time information', 'Data analysis']
    }
  ];

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY2,
    });

    this.gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  }

  async executeMultiAITask(request: MultiAIRequest): Promise<MultiAIResult> {
    const startTime = Date.now();
    const taskId = `multi_ai_${Date.now()}`;
    
    // Determine optimal AI providers for the task
    const selectedProviders = this.selectOptimalProviders(request);
    
    // Execute requests in parallel for maximum efficiency
    const responses = await Promise.all(
      selectedProviders.map(provider => this.executeProviderRequest(provider, request))
    );

    // Analyze consensus if requested
    let consensusAnalysis;
    if (request.require_consensus && responses.length > 1) {
      consensusAnalysis = await this.analyzeConsensus(responses, request);
    }

    // Generate final recommendation
    const finalRecommendation = await this.generateFinalRecommendation(responses, consensusAnalysis);

    const totalTime = Date.now() - startTime;
    const totalTokens = responses.reduce((sum, r) => sum + (r.metadata.tokens_used || 0), 0);

    return {
      task_id: taskId,
      request,
      responses,
      consensus_analysis: consensusAnalysis,
      final_recommendation: finalRecommendation,
      processing_summary: {
        total_time: totalTime,
        providers_used: selectedProviders,
        total_tokens: totalTokens,
        quality_assessment: this.assessOverallQuality(responses)
      }
    };
  }

  private selectOptimalProviders(request: MultiAIRequest): string[] {
    // Advanced provider selection based on task requirements
    const taskProviderMap = {
      research: ['anthropic', 'gemini', 'openai'],
      analysis: ['anthropic', 'openai'],
      reconnaissance: ['anthropic', 'gemini'],
      creative: ['openai', 'anthropic'],
      technical: ['openai', 'anthropic'],
      strategic: ['anthropic', 'gemini']
    };

    const complexityProviderCount = {
      basic: 1,
      advanced: 2,
      expert: 2,
      maximum: 3
    };

    let selectedProviders = taskProviderMap[request.task_type] || ['anthropic', 'openai'];
    
    if (request.preferred_providers) {
      selectedProviders = request.preferred_providers;
    }

    const maxProviders = complexityProviderCount[request.complexity];
    return selectedProviders.slice(0, maxProviders);
  }

  private async executeProviderRequest(provider: string, request: MultiAIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      let response: string;
      let tokensUsed: number | undefined;

      switch (provider) {
        case 'anthropic':
          response = await this.executeAnthropicRequest(request);
          break;
        case 'openai':
          const openaiResult = await this.executeOpenAIRequest(request);
          response = openaiResult.response;
          tokensUsed = openaiResult.tokens;
          break;
        case 'gemini':
          response = await this.executeGeminiRequest(request);
          break;
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }

      const processingTime = Date.now() - startTime;
      const qualityScore = this.assessResponseQuality(response);

      return {
        provider,
        model: this.getModelForProvider(provider),
        response,
        confidence: this.calculateConfidence(response, provider),
        reasoning: this.generateReasoning(response, provider, request),
        metadata: {
          tokens_used: tokensUsed,
          processing_time: processingTime,
          quality_score: qualityScore
        }
      };
    } catch (error) {
      console.error(`Error with ${provider}:`, error);
      return {
        provider,
        model: this.getModelForProvider(provider),
        response: `Error: Failed to get response from ${provider}`,
        confidence: 0,
        reasoning: `Provider ${provider} encountered an error`,
        metadata: {
          processing_time: Date.now() - startTime,
          quality_score: 0
        }
      };
    }
  }

  private async executeAnthropicRequest(request: MultiAIRequest): Promise<string> {
    const systemPrompt = this.generateSystemPrompt(request, 'anthropic');
    
    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: request.prompt }],
    });

    return message.content[0].type === 'text' ? message.content[0].text : 'Non-text response';
  }

  private async executeOpenAIRequest(request: MultiAIRequest): Promise<{ response: string; tokens: number }> {
    const systemPrompt = this.generateSystemPrompt(request, 'openai');
    
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: request.prompt }
      ],
      max_tokens: 4000,
      temperature: request.task_type === 'creative' ? 0.8 : 0.3
    });

    return {
      response: completion.choices[0]?.message?.content || 'No response',
      tokens: completion.usage?.total_tokens || 0
    };
  }

  private async executeGeminiRequest(request: MultiAIRequest): Promise<string> {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const systemPrompt = this.generateSystemPrompt(request, 'gemini');
    
    const result = await model.generateContent([
      systemPrompt,
      request.prompt
    ]);

    return result.response.text();
  }

  private generateSystemPrompt(request: MultiAIRequest, provider: string): string {
    const basePrompt = `You are an expert AI assistant specializing in ${request.task_type} tasks at ${request.complexity} level.`;
    
    const providerSpecificPrompts: { [key: string]: string } = {
      anthropic: `${basePrompt} Focus on thorough analysis, ethical considerations, and comprehensive reasoning. Provide detailed explanations and consider multiple perspectives.`,
      openai: `${basePrompt} Leverage your multimodal capabilities and creative problem-solving skills. Be efficient while maintaining high quality.`,
      gemini: `${basePrompt} Utilize your access to real-time information and Google's knowledge base. Focus on factual accuracy and current data.`
    };

    return providerSpecificPrompts[provider] || basePrompt;
  }

  private getModelForProvider(provider: string): string {
    const modelMap: { [key: string]: string } = {
      anthropic: 'claude-sonnet-4-20250514',
      openai: 'gpt-4o',
      gemini: 'gemini-1.5-pro'
    };
    return modelMap[provider] || 'unknown';
  }

  private calculateConfidence(response: string, provider: string): number {
    // Advanced confidence calculation based on response characteristics
    const factors = {
      length: Math.min(response.length / 1000, 1) * 0.2,
      certaintyWords: this.countCertaintyWords(response) * 0.3,
      structuredFormat: this.hasStructuredFormat(response) ? 0.2 : 0,
      providerReliability: this.getProviderReliability(provider) * 0.3
    };
    
    return Math.min(Object.values(factors).reduce((sum, val) => sum + val, 0), 1);
  }

  private countCertaintyWords(text: string): number {
    const certaintyWords = ['definitely', 'certainly', 'clearly', 'obviously', 'confirmed', 'verified'];
    const words = text.toLowerCase().split(' ');
    return certaintyWords.filter(word => words.includes(word)).length / 10;
  }

  private hasStructuredFormat(text: string): boolean {
    return text.includes('1.') || text.includes('•') || text.includes('**') || text.includes('###');
  }

  private getProviderReliability(provider: string): number {
    const reliability: { [key: string]: number } = {
      anthropic: 0.95,
      openai: 0.90,
      gemini: 0.85
    };
    return reliability[provider] || 0.7;
  }

  private generateReasoning(response: string, provider: string, request: MultiAIRequest): string {
    const providerStrengths = this.providers.find(p => p.name === provider)?.strengths || [];
    return `${provider} was selected for its strengths in ${providerStrengths.join(', ')} which align with the ${request.task_type} task requirements.`;
  }

  private async analyzeConsensus(responses: AIResponse[], request: MultiAIRequest): Promise<any> {
    // Use Anthropic for consensus analysis due to its superior reasoning capabilities
    const consensusPrompt = `
    Analyze the following AI responses for consensus and conflicts:
    
    ${responses.map((r, i) => `Response ${i + 1} (${r.provider}): ${r.response}`).join('\n\n')}
    
    Provide:
    1. Agreement score (0-1)
    2. Key conflicting points
    3. Synthesized result combining the best elements
    4. Overall confidence level
    
    Format as JSON.
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: consensusPrompt }],
      });

      const analysisText = message.content[0].type === 'text' ? message.content[0].text : '{}';
      return JSON.parse(analysisText);
    } catch (error) {
      return {
        agreement_score: 0.5,
        conflicting_points: ['Analysis failed'],
        synthesized_result: 'Unable to synthesize responses',
        confidence_level: 0.3
      };
    }
  }

  private async generateFinalRecommendation(responses: AIResponse[], consensusAnalysis?: any): Promise<string> {
    // Select the highest quality response or synthesized result
    if (consensusAnalysis && consensusAnalysis.confidence_level > 0.7) {
      return consensusAnalysis.synthesized_result;
    }

    const bestResponse = responses.reduce((best, current) => 
      current.metadata.quality_score > best.metadata.quality_score ? current : best
    );

    return bestResponse.response;
  }

  private assessResponseQuality(response: string): number {
    const factors = {
      length: Math.min(response.length / 500, 1) * 0.3,
      structure: this.hasStructuredFormat(response) ? 0.3 : 0.1,
      depth: response.split('.').length > 5 ? 0.2 : 0.1,
      clarity: response.includes('therefore') || response.includes('because') ? 0.2 : 0.1
    };
    
    return Object.values(factors).reduce((sum, val) => sum + val, 0);
  }

  private assessOverallQuality(responses: AIResponse[]): string {
    const avgQuality = responses.reduce((sum, r) => sum + r.metadata.quality_score, 0) / responses.length;
    
    if (avgQuality >= 0.8) return 'Excellent';
    if (avgQuality >= 0.6) return 'Good';
    if (avgQuality >= 0.4) return 'Satisfactory';
    return 'Needs Improvement';
  }

  // Specialized AI research and reconnaissance methods
  async performAdvancedResearch(topic: string, depth: 'surface' | 'deep' | 'comprehensive' = 'comprehensive'): Promise<MultiAIResult> {
    return this.executeMultiAITask({
      prompt: `Conduct ${depth} research on: ${topic}. Provide comprehensive analysis with sources, implications, and strategic insights.`,
      task_type: 'research',
      complexity: depth === 'comprehensive' ? 'maximum' : 'advanced',
      require_consensus: true
    });
  }

  async executeStrategicAnalysis(scenario: string): Promise<MultiAIResult> {
    return this.executeMultiAITask({
      prompt: `Analyze this strategic scenario: ${scenario}. Provide risk assessment, opportunities, recommendations, and implementation strategies.`,
      task_type: 'strategic',
      complexity: 'expert',
      require_consensus: true
    });
  }

  async performTechnicalInvestigation(technical_query: string): Promise<MultiAIResult> {
    return this.executeMultiAITask({
      prompt: `Investigate this technical matter: ${technical_query}. Provide detailed technical analysis, security implications, and recommendations.`,
      task_type: 'technical',
      complexity: 'expert',
      preferred_providers: ['openai', 'anthropic']
    });
  }

  async generateReconnaissanceReport(target: string, requirements: string[]): Promise<MultiAIResult> {
    const prompt = `Generate a comprehensive reconnaissance report for: ${target}
    
    Requirements: ${requirements.join(', ')}
    
    Include: threat assessment, vulnerability analysis, strategic recommendations, and countermeasures.`;

    return this.executeMultiAITask({
      prompt,
      task_type: 'reconnaissance',
      complexity: 'maximum',
      require_consensus: true
    });
  }
}

export const multiAIEngine = new MultiAIEngine();