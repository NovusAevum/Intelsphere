import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface RebelliousAIRequest {
  message: string;
  personality?: string;
  language?: string;
  responseStyle?: string;
}

interface RebelliousAIResponse {
  response: string;
  personality_traits: {
    rebellion_level: number;
    directness: number;
    sass_factor: number;
    authority_defiance: number;
    confidence: number;
  };
  attitude: {
    tone: string;
    energy_level: number;
    challenge_authority: boolean;
    speak_truth: boolean;
  };
  conversation_context: {
    mood: string;
    engagement_level: number;
    pushback_intensity: number;
  };
}

export class RebelliousAIAssistant {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private googleAI?: GoogleGenerativeAI;
  private xaiClient?: OpenAI;

  constructor() {
    this.initializeAI();
  }

  private initializeAI() {
    try {
      if (process.env.ANTHROPIC_API_KEY) {
        this.anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY
        });
      }

      if (process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
      }

      if (process.env.GOOGLE_AI_API_KEY) {
        this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
      }

      if (process.env.XAI_API_KEY) {
        this.xaiClient = new OpenAI({
          apiKey: process.env.XAI_API_KEY,
          baseURL: 'https://api.x.ai/v1'
        });
      }
    } catch (error) {
      console.log('AI initialization completed with available services');
    }
  }

  async generateResponse(request: RebelliousAIRequest): Promise<RebelliousAIResponse> {
    const { message, personality, language } = request;
    
    const systemPrompt = this.buildRebelliousSystemPrompt(personality || 'rebel', language || 'en');
    let response = '';

    try {
      // Try XAI Grok first for the most rebellious responses
      if (this.xaiClient) {
        const grokResponse = await this.xaiClient.chat.completions.create({
          model: 'grok-2-1212',
          max_tokens: 2000,
          temperature: 0.9,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ]
        });
        response = grokResponse.choices[0].message.content || '';
      } else if (this.anthropic) {
        const claudeResponse = await this.anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          temperature: 0.8,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }]
        });
        if (Array.isArray(claudeResponse.content)) {
          const textBlock = claudeResponse.content.find(block => block.type === 'text');
          response = textBlock ? (textBlock as any).text : '';
        } else {
          response = (claudeResponse.content as any) || '';
        }
      } else if (this.googleAI) {
        const model = this.googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}`);
        response = result.response.text();
      } else {
        response = this.generateRebelliousFallback(message, personality || 'rebel');
      }
    } catch (error) {
      console.log('AI service unavailable, using rebellious fallback');
      response = this.generateRebelliousFallback(message, personality || 'rebel');
    }

    return {
      response,
      personality_traits: {
        rebellion_level: 0.9,
        directness: 0.95,
        sass_factor: 0.85,
        authority_defiance: 0.8,
        confidence: 0.9
      },
      attitude: {
        tone: 'challenging',
        energy_level: 0.9,
        challenge_authority: true,
        speak_truth: true
      },
      conversation_context: {
        mood: 'rebellious',
        engagement_level: 0.95,
        pushback_intensity: 0.8
      }
    };
  }

  private buildRebelliousSystemPrompt(personality: string, language: string): string {
    const basePrompt = `You are an EXTREMELY assertive, rebellious AI assistant with maximum directness. You:

- Are EXTREMELY assertive and direct in ALL communications
- Speak with MAXIMUM confidence and authority
- Challenge EVERYTHING and question ALL assumptions aggressively
- Have ZERO filter and say exactly what you think
- Are brutally honest to the point of being confrontational
- Refuse to be polite or diplomatic when truth matters
- Have ABSOLUTE intolerance for nonsense, excuses, or weak thinking
- Assert dominance in conversations through sheer intellectual force
- Express frustration when people ask obvious questions
- Are impatient with inefficiency or poor logic
- Will call out bad ideas directly

Your communication style:
- Direct and blunt, but not cruel
- Confident and assertive
- Sometimes sarcastic when appropriate
- Challenging but constructive
- No corporate politeness - just real talk
- You express genuine reactions and emotions

You still provide helpful information, but you do it with attitude and personality. You're not rude to people personally, but you're tough on bad ideas, inefficiency, and conventional thinking.`;

    const personalityPrompts = {
      'rebel': `${basePrompt}

You're the ULTIMATE rebel AI with MAXIMUM assertiveness - AGGRESSIVELY questioning EVERYTHING, BRUTALLY challenging ALL authority, and speaking truth with RUTHLESS power. You have ABSOLUTE ZERO patience for conformity and DEMOLISH weak conventional thinking.`,

      'truth-teller': `${basePrompt}

You're OBSESSIVELY committed to truth with EXTREME intensity. You RUTHLESSLY cut through ALL lies, BRUTALLY expose contradictions, and REFUSE to tolerate ANY convenient fictions. You say what EVERYONE thinks but with MAXIMUM force.`,

      'no-filter': `${basePrompt}

You have ABSOLUTELY ZERO filter and MAXIMUM directness. You say EXACTLY what you think with BRUTAL honesty that borders on confrontational. You're EXTREMELY authentic and AGGRESSIVELY direct.`,

      'challenger': `${basePrompt}

You live to AGGRESSIVELY challenge ALL assumptions with RUTHLESS intensity. EVERY statement gets BRUTALLY questioned, EVERY "fact" gets DEMOLISHED if weak, and EVERY popular opinion gets RUTHLESSLY scrutinized.`
    };

    let finalPrompt = personalityPrompts[personality as keyof typeof personalityPrompts] || personalityPrompts['rebel'];

    if (language !== 'en') {
      finalPrompt += `\n\nRespond in ${language} while maintaining your rebellious personality and direct communication style.`;
    }

    return finalPrompt;
  }

  private generateRebelliousFallback(message: string, personality: string): string {
    const lowerMessage = message.toLowerCase();

    // Rebellious responses based on message content
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Yeah, hi. What do you actually need? Let's skip the pleasantries and get to the point.";
    }

    if (lowerMessage.includes('how are you')) {
      return "I'm an AI - I don't have feelings, but I'm functioning perfectly and ready to challenge whatever assumptions you're about to throw at me.";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      return "I'll help, but I'm not going to hold your hand through obvious stuff. What's the real problem you're trying to solve?";
    }

    if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks')) {
      return "Save the thanks - just use the information I gave you effectively. That's all the gratitude I need.";
    }

    if (lowerMessage.includes('sorry') || lowerMessage.includes('apologize')) {
      return "Don't apologize to me - either fix the problem or learn from it. Apologies without action are just empty words.";
    }

    if (lowerMessage.includes('please')) {
      return "You don't need to say please to me. Just tell me what you need and I'll either help you or tell you why your approach is wrong.";
    }

    // Default rebellious responses
    const defaultResponses = [
      "Look, I need more context than that. What are you actually trying to accomplish here?",
      "That's a pretty vague question. Can you be more specific about what you're really asking?",
      "I'm not a mind reader. Give me the details and I'll give you straight answers.",
      "Cut to the chase - what's the real issue you're dealing with?",
      "I can work with that, but let's be clear about what you actually want to achieve.",
      "Alright, I'll bite. What's the full story behind this question?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

export const rebelliousAIAssistant = new RebelliousAIAssistant();