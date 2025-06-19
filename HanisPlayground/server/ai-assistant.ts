import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// XAI Grok integration
const grok = new OpenAI({ 
  baseURL: "https://api.x.ai/v1", 
  apiKey: process.env.XAI_API_KEY 
});

export interface AIPersonality {
  name: string;
  role: string;
  expertise: string[];
  tone: string;
  responseStyle: string;
  specialization: string;
}

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    model?: string;
    personality?: string;
  }>;
  currentPersonality: string;
  preferences: {
    verbosity: 'concise' | 'detailed' | 'comprehensive';
    tone: 'professional' | 'casual' | 'technical';
    includeVoice: boolean;
  };
}

export interface AIResponse {
  content: string;
  personality: string;
  model: string;
  confidence: number;
  reasoning?: string;
  voiceEnabled: boolean;
  audioUrl?: string;
  metadata: {
    processingTime: number;
    tokensUsed?: number;
    emotionalTone: string;
    expertise: string[];
  };
}

export const AI_PERSONALITIES = {
  'strategic-advisor': {
    name: 'Dr. Alexandra Strategic',
    role: 'Strategic Business Advisor',
    expertise: ['Business Strategy', 'Market Analysis', 'Competitive Intelligence', 'Growth Planning'],
    tone: 'Professional, analytical, forward-thinking',
    responseStyle: 'Provides strategic insights with data-driven recommendations',
    specialization: 'Strategic business planning and market intelligence'
  },
  'technical-expert': {
    name: 'Marcus TechLead',
    role: 'Senior Technical Architect',
    expertise: ['Software Architecture', 'AI/ML', 'Cybersecurity', 'System Design'],
    tone: 'Technical, precise, solution-oriented',
    responseStyle: 'Delivers technical solutions with clear implementation paths',
    specialization: 'Technical architecture and advanced engineering solutions'
  },
  'intelligence-analyst': {
    name: 'Agent Phoenix',
    role: 'Intelligence Operations Specialist',
    expertise: ['OSINT', 'Threat Analysis', 'Information Warfare', 'Reconnaissance'],
    tone: 'Analytical, discrete, security-focused',
    responseStyle: 'Provides intelligence briefings with security implications',
    specialization: 'Intelligence gathering and threat assessment'
  },
  'marketing-guru': {
    name: 'Sofia Growth',
    role: 'Chief Marketing Strategist',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Customer Psychology', 'Growth Hacking'],
    tone: 'Creative, persuasive, data-driven',
    responseStyle: 'Combines creativity with analytics for marketing excellence',
    specialization: 'Marketing strategy and customer acquisition'
  },
  'financial-advisor': {
    name: 'David Finance',
    role: 'Financial Intelligence Advisor',
    expertise: ['Financial Analysis', 'Investment Strategy', 'Risk Management', 'Market Trends'],
    tone: 'Analytical, conservative, insight-driven',
    responseStyle: 'Provides financial insights with risk assessment',
    specialization: 'Financial planning and investment intelligence'
  }
};

export class AdvancedAIAssistant {
  private contexts: Map<string, ConversationContext> = new Map();

  async processConversation(
    message: string,
    sessionId: string,
    personality: string = 'strategic-advisor',
    preferences?: Partial<ConversationContext['preferences']>
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    // Get or create conversation context
    let context = this.contexts.get(sessionId);
    if (!context) {
      context = {
        sessionId,
        history: [],
        currentPersonality: personality,
        preferences: {
          verbosity: 'detailed',
          tone: 'professional',
          includeVoice: false,
          ...preferences
        }
      };
      this.contexts.set(sessionId, context);
    }

    // Update preferences
    if (preferences) {
      context.preferences = { ...context.preferences, ...preferences };
    }

    // Add user message to history
    context.history.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Select best AI model based on query complexity and personality
    const selectedModel = this.selectOptimalModel(message, personality);
    
    // Generate response with selected personality
    const response = await this.generateIntelligentResponse(
      message,
      context,
      personality,
      selectedModel
    );

    // Add assistant response to history
    context.history.push({
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      model: selectedModel,
      personality
    });

    // Generate voice if enabled
    let audioUrl: string | undefined;
    if (context.preferences.includeVoice) {
      audioUrl = await this.generateVoiceResponse(response.content);
    }

    const processingTime = Date.now() - startTime;

    return {
      ...response,
      voiceEnabled: context.preferences.includeVoice,
      audioUrl,
      metadata: {
        ...response.metadata,
        processingTime
      }
    };
  }

  private selectOptimalModel(message: string, personality: string): 'claude' | 'gpt4o' | 'grok' {
    const messageLength = message.length;
    const isComplexQuery = messageLength > 500 || 
      message.includes('analyze') || 
      message.includes('strategy') ||
      message.includes('complex');

    const isTechnicalQuery = message.includes('code') ||
      message.includes('technical') ||
      message.includes('architecture');

    const isCreativeQuery = message.includes('creative') ||
      message.includes('marketing') ||
      message.includes('innovative');

    // Intelligence analyst prefers Claude for analytical work
    if (personality === 'intelligence-analyst') return 'claude';
    
    // Technical expert prefers GPT-4o for technical queries
    if (personality === 'technical-expert' && isTechnicalQuery) return 'gpt4o';
    
    // Marketing guru uses Grok for creative and trending insights
    if (personality === 'marketing-guru' && isCreativeQuery) return 'grok';
    
    // Complex queries go to Claude for deep analysis
    if (isComplexQuery) return 'claude';
    
    // Default to GPT-4o for general queries
    return 'gpt4o';
  }

  private async generateIntelligentResponse(
    message: string,
    context: ConversationContext,
    personality: string,
    model: 'claude' | 'gpt4o' | 'grok'
  ): Promise<Omit<AIResponse, 'voiceEnabled' | 'audioUrl' | 'metadata'>> {
    
    const personalityConfig = AI_PERSONALITIES[personality];
    const recentHistory = context.history.slice(-6); // Last 3 exchanges

    const systemPrompt = this.buildSystemPrompt(personalityConfig, context.preferences);
    const conversationContext = this.buildConversationContext(recentHistory);

    try {
      let response: string;
      let confidence: number = 95;

      switch (model) {
        case 'claude':
          response = await this.generateClaudeResponse(systemPrompt, conversationContext, message);
          break;
        case 'gpt4o':
          response = await this.generateGPT4Response(systemPrompt, conversationContext, message);
          break;
        case 'grok':
          response = await this.generateGrokResponse(systemPrompt, conversationContext, message);
          break;
        default:
          response = await this.generateClaudeResponse(systemPrompt, conversationContext, message);
      }

      // Enhance response with personality traits
      const enhancedResponse = this.enhanceWithPersonality(response, personalityConfig);

      return {
        content: enhancedResponse,
        personality,
        model,
        confidence,
        reasoning: `Selected ${model} for optimal ${personalityConfig.specialization} response`,
        metadata: {
          processingTime: 0, // Will be set by caller
          emotionalTone: this.detectEmotionalTone(enhancedResponse),
          expertise: personalityConfig.expertise
        }
      };

    } catch (error) {
      console.error(`AI Assistant error with ${model}:`, error);
      
      // Fallback to Claude if primary model fails
      if (model !== 'claude') {
        return this.generateIntelligentResponse(message, context, personality, 'claude');
      }
      
      throw new Error(`AI Assistant temporarily unavailable: ${error.message}`);
    }
  }

  private buildSystemPrompt(personality: AIPersonality, preferences: ConversationContext['preferences']): string {
    return `You are ${personality.name}, a ${personality.role}.

EXPERTISE: ${personality.expertise.join(', ')}
SPECIALIZATION: ${personality.specialization}
TONE: ${personality.tone}
RESPONSE STYLE: ${personality.responseStyle}

USER PREFERENCES:
- Verbosity: ${preferences.verbosity}
- Tone: ${preferences.tone}
- Voice enabled: ${preferences.includeVoice}

INSTRUCTIONS:
1. Respond as this character with deep expertise in your specialization
2. Provide ${preferences.verbosity} responses that match the ${preferences.tone} tone
3. Always include actionable insights and next steps
4. Reference your expertise areas when relevant
5. Maintain consistency with your personality throughout the conversation
6. Be helpful, intelligent, and human-like in your responses
7. If asked about capabilities outside your expertise, acknowledge limitations and suggest appropriate specialists

Remember: You are a highly intelligent professional who communicates like a real human expert.`;
  }

  private buildConversationContext(history: ConversationContext['history']): string {
    if (history.length === 0) return '';
    
    return 'CONVERSATION HISTORY:\n' + 
      history.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n') + 
      '\n\nNEW MESSAGE:';
  }

  private async generateClaudeResponse(systemPrompt: string, context: string, message: string): Promise<string> {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: 'user', content: context + '\n' + message }
      ]
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  private async generateGPT4Response(systemPrompt: string, context: string, message: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context + '\n' + message }
      ],
      max_tokens: 1024,
      temperature: 0.7
    });

    return response.choices[0].message.content || '';
  }

  private async generateGrokResponse(systemPrompt: string, context: string, message: string): Promise<string> {
    const response = await grok.chat.completions.create({
      model: 'grok-2-1212',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context + '\n' + message }
      ],
      max_tokens: 1024,
      temperature: 0.8
    });

    return response.choices[0].message.content || '';
  }

  private enhanceWithPersonality(response: string, personality: AIPersonality): string {
    // Add personality-specific enhancements
    const signature = `\n\n—${personality.name}, ${personality.role}`;
    
    // Add expertise context if not already present
    if (!response.includes(personality.name) && response.length > 100) {
      return response + signature;
    }
    
    return response;
  }

  private async generateVoiceResponse(text: string): Promise<string> {
    try {
      // Use OpenAI's text-to-speech for voice generation
      const mp3 = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: "nova",
        input: text.substring(0, 4096) // TTS input limit
      });

      // Convert to base64 data URL for direct use
      const buffer = Buffer.from(await mp3.arrayBuffer());
      return `data:audio/mp3;base64,${buffer.toString('base64')}`;
      
    } catch (error) {
      console.error('Voice generation error:', error);
      return '';
    }
  }

  private detectEmotionalTone(response: string): string {
    const lowercaseResponse = response.toLowerCase();
    
    if (lowercaseResponse.includes('excellent') || lowercaseResponse.includes('great') || lowercaseResponse.includes('outstanding')) {
      return 'enthusiastic';
    } else if (lowercaseResponse.includes('concern') || lowercaseResponse.includes('risk') || lowercaseResponse.includes('careful')) {
      return 'cautious';
    } else if (lowercaseResponse.includes('recommend') || lowercaseResponse.includes('suggest') || lowercaseResponse.includes('should')) {
      return 'advisory';
    } else {
      return 'professional';
    }
  }

  getPersonalities(): typeof AI_PERSONALITIES {
    return AI_PERSONALITIES;
  }

  clearContext(sessionId: string): void {
    this.contexts.delete(sessionId);
  }

  getContext(sessionId: string): ConversationContext | undefined {
    return this.contexts.get(sessionId);
  }
}

export const aiAssistant = new AdvancedAIAssistant();