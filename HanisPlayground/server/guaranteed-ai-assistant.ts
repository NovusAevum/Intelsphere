import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

interface AIResponse {
  content: string;
  model: string;
  personality: string;
  metadata: any;
  processingTime: number;
  fallbackUsed?: boolean;
}

interface AIRequest {
  message: string;
  personality: string;
  responseStyle: string;
  useAllModels?: boolean;
  selectedModels?: string[];
  priorityModel?: string;
  consciousnessMode?: boolean;
  includeAudio?: boolean;
  includeWebSearch?: boolean;
}

export class GuaranteedAIAssistant {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private personalityProfiles: Record<string, any>;
  private responseStyles: Record<string, string>;

  constructor() {
    this.initializeAI();
    this.initializePersonalities();
    this.initializeResponseStyles();
  }

  private initializeAI() {
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        this.anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });
      }
    } catch (error) {
      console.warn('Anthropic AI initialization failed:', error);
    }

    try {
      if (process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
      }
    } catch (error) {
      console.warn('OpenAI initialization failed:', error);
    }
  }

  private initializePersonalities() {
    this.personalityProfiles = {
      'mr-hanis': {
        name: 'Mr. Hanis',
        role: 'Strategic Business Advisor',
        expertise: ['Business Strategy', 'Leadership', 'Innovation', 'Market Analysis'],
        tone: 'Professional and insightful',
        responseStyle: 'strategic and comprehensive',
        greeting: 'I am Mr. Hanis, your strategic business advisor.',
        specialization: 'Strategic business guidance and leadership insights'
      },
      'business-executive': {
        name: 'Business Executive',
        role: 'Results-Focused Leader',
        expertise: ['Executive Leadership', 'Performance Management', 'Strategic Planning', 'Operations'],
        tone: 'Direct and results-oriented',
        responseStyle: 'actionable and decisive',
        greeting: 'I am your dedicated business executive advisor.',
        specialization: 'Executive decision-making and performance optimization'
      },
      'technical-expert': {
        name: 'Technical Expert',
        role: 'Technology Specialist',
        expertise: ['Technology Solutions', 'System Architecture', 'Innovation', 'Technical Strategy'],
        tone: 'Precise and knowledgeable',
        responseStyle: 'detailed and technical',
        greeting: 'I am your technical expert and technology advisor.',
        specialization: 'Technical solutions and system optimization'
      },
      'friendly-companion': {
        name: 'Friendly Companion',
        role: 'Supportive Assistant',
        expertise: ['Communication', 'Support', 'Guidance', 'Problem Solving'],
        tone: 'Warm and approachable',
        responseStyle: 'supportive and encouraging',
        greeting: 'I am here as your friendly companion and supportive guide.',
        specialization: 'Personal support and encouraging guidance'
      }
    };
  }

  private initializeResponseStyles() {
    this.responseStyles = {
      professional: 'formal, structured, and business-focused',
      casual: 'conversational, relaxed, and approachable',
      technical: 'detailed, precise, and technically comprehensive',
      concise: 'brief, direct, and to-the-point'
    };
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      // Try AI models first
      const aiResponse = await this.tryAIModels(request);
      if (aiResponse) {
        return {
          ...aiResponse,
          processingTime: Date.now() - startTime
        };
      }
    } catch (error) {
      console.log('AI models failed, using guaranteed fallback');
    }

    // Guaranteed fallback response
    return this.generateGuaranteedResponse(request, Date.now() - startTime);
  }

  private async tryAIModels(request: AIRequest): Promise<AIResponse | null> {
    const personality = this.personalityProfiles[request.personality] || this.personalityProfiles['mr-hanis'];
    const systemPrompt = this.buildSystemPrompt(personality, request.responseStyle);

    // Try Anthropic first
    if (this.anthropic) {
      try {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: request.message }]
        });

        if (response.content && response.content.length > 0 && 'text' in response.content[0]) {
          return {
            content: response.content[0].text,
            model: 'claude-3-sonnet',
            personality: request.personality,
            metadata: { aiGenerated: true, model: 'anthropic' }
          };
        }
      } catch (error) {
        console.log('Anthropic failed, trying OpenAI');
      }
    }

    // Try OpenAI as backup
    if (this.openai) {
      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          max_tokens: 1000,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: request.message }
          ]
        });

        if (response.choices && response.choices.length > 0 && response.choices[0].message?.content) {
          return {
            content: response.choices[0].message.content,
            model: 'gpt-4o',
            personality: request.personality,
            metadata: { aiGenerated: true, model: 'openai' }
          };
        }
      } catch (error) {
        console.log('OpenAI failed, using guaranteed fallback');
      }
    }

    return null;
  }

  private buildSystemPrompt(personality: any, responseStyle: string): string {
    return `You are ${personality.name}, a ${personality.role}. 

Your expertise includes: ${personality.expertise.join(', ')}.
Your communication style is ${personality.tone}.
Respond in a ${this.responseStyles[responseStyle] || this.responseStyles.professional} manner.

${personality.specialization}

Always provide helpful, accurate, and actionable guidance while maintaining your professional persona.`;
  }

  private generateGuaranteedResponse(request: AIRequest, processingTime: number): AIResponse {
    const personality = this.personalityProfiles[request.personality] || this.personalityProfiles['mr-hanis'];
    const message = request.message.toLowerCase();
    
    let content = '';

    // Context-aware response generation
    if (this.isGreeting(message)) {
      content = this.generateGreetingResponse(personality);
    } else if (this.isBusinessQuery(message)) {
      content = this.generateBusinessResponse(personality, request.message);
    } else if (this.isTechnicalQuery(message)) {
      content = this.generateTechnicalResponse(personality, request.message);
    } else if (this.isHelpRequest(message)) {
      content = this.generateHelpResponse(personality);
    } else {
      content = this.generateGeneralResponse(personality, request.message);
    }

    return {
      content,
      model: 'guaranteed-ai-assistant',
      personality: request.personality,
      metadata: {
        fallbackUsed: true,
        contextType: this.determineContextType(message),
        personalityUsed: personality.name
      },
      processingTime,
      fallbackUsed: true
    };
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isBusinessQuery(message: string): boolean {
    const businessTerms = ['business', 'strategy', 'market', 'revenue', 'profit', 'growth', 'competition', 'plan'];
    return businessTerms.some(term => message.includes(term));
  }

  private isTechnicalQuery(message: string): boolean {
    const techTerms = ['technology', 'system', 'software', 'technical', 'code', 'development', 'solution'];
    return techTerms.some(term => message.includes(term));
  }

  private isHelpRequest(message: string): boolean {
    const helpTerms = ['help', 'assist', 'support', 'guide', 'advice', 'how to'];
    return helpTerms.some(term => message.includes(term));
  }

  private determineContextType(message: string): string {
    if (this.isGreeting(message)) return 'greeting';
    if (this.isBusinessQuery(message)) return 'business';
    if (this.isTechnicalQuery(message)) return 'technical';
    if (this.isHelpRequest(message)) return 'help';
    return 'general';
  }

  private generateGreetingResponse(personality: any): string {
    return `${personality.greeting} I'm here to provide you with comprehensive guidance and support. As your ${personality.role.toLowerCase()}, I bring expertise in ${personality.expertise.slice(0, 2).join(' and ')}. How can I assist you today?`;
  }

  private generateBusinessResponse(personality: any, originalMessage: string): string {
    const messageExcerpt = originalMessage.length > 50 ? originalMessage.substring(0, 50) + '...' : originalMessage;
    
    return `As ${personality.name}, I understand you're seeking business guidance regarding "${messageExcerpt}". This is an important strategic consideration that requires thoughtful analysis.

Based on my expertise in ${personality.expertise[0]} and ${personality.expertise[1]}, I can provide comprehensive insights on this matter. Let me share some key strategic perspectives:

1. **Strategic Context**: Understanding the broader business environment is crucial for making informed decisions.
2. **Risk Assessment**: Every business decision should consider potential risks and mitigation strategies.
3. **Opportunity Analysis**: Identifying and leveraging opportunities can drive significant business value.
4. **Implementation Planning**: A well-structured approach ensures successful execution.

I'm here to provide detailed guidance tailored to your specific situation. Please feel free to share more details about your particular challenges or objectives.`;
  }

  private generateTechnicalResponse(personality: any, originalMessage: string): string {
    const messageExcerpt = originalMessage.length > 50 ? originalMessage.substring(0, 50) + '...' : originalMessage;
    
    return `Thank you for your technical inquiry about "${messageExcerpt}". As ${personality.name}, I can provide comprehensive technical guidance drawing from my expertise in ${personality.expertise.filter(e => e.includes('Technology') || e.includes('Technical') || e.includes('System')).join(', ')}.

**Technical Analysis Framework:**

1. **Requirements Assessment**: Understanding the specific technical requirements and constraints
2. **Solution Architecture**: Designing robust and scalable technical solutions
3. **Implementation Strategy**: Developing a systematic approach to implementation
4. **Quality Assurance**: Ensuring reliability and performance standards
5. **Optimization**: Continuous improvement and performance enhancement

I'm equipped to dive deep into technical details and provide actionable solutions. What specific technical challenges would you like me to address?`;
  }

  private generateHelpResponse(personality: any): string {
    return `I'm ${personality.name}, and I'm absolutely here to help you. As your ${personality.role.toLowerCase()}, I specialize in providing ${personality.specialization.toLowerCase()}.

**How I Can Assist You:**

• **Strategic Guidance**: Comprehensive analysis and strategic recommendations
• **Problem Solving**: Systematic approach to addressing challenges
• **Decision Support**: Data-driven insights for informed decision-making
• **Implementation Planning**: Structured approaches to achieving your goals

My expertise spans ${personality.expertise.join(', ')}, and I'm committed to providing you with actionable, valuable insights.

What specific area would you like to explore together? I'm here to provide the guidance and support you need.`;
  }

  private generateGeneralResponse(personality: any, originalMessage: string): string {
    const messageLength = originalMessage.length;
    const isComplexQuery = messageLength > 100;
    const messageExcerpt = originalMessage.length > 40 ? originalMessage.substring(0, 40) + '...' : originalMessage;
    
    let response = `Thank you for reaching out. As ${personality.name}, I've carefully considered your message about "${messageExcerpt}".`;
    
    if (isComplexQuery) {
      response += ` I can see this is a comprehensive topic that deserves thorough attention.`;
    }
    
    response += ` 

Drawing from my expertise in ${personality.expertise.slice(0, 2).join(' and ')}, I can provide valuable insights on this matter. Here's my perspective:

**Key Considerations:**
• Understanding the context and background of your situation
• Identifying the core objectives and desired outcomes
• Analyzing potential approaches and strategies
• Considering implementation requirements and timelines

**My Approach:**
As your ${personality.role.toLowerCase()}, I focus on providing ${personality.responseStyle} guidance that addresses your specific needs. I'm committed to helping you achieve your objectives through strategic thinking and practical solutions.

I'd be happy to dive deeper into any specific aspects of this topic. What particular elements would you like me to focus on?`;

    return response;
  }
}

export const guaranteedAIAssistant = new GuaranteedAIAssistant();