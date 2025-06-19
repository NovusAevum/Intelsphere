import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface WorkingHumanAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface WorkingHumanAIResponse {
  response: string;
  personality_traits: {
    humor_level: number;
    directness: number;
    emotional_range: number;
    sass_factor: number;
    empathy_score: number;
  };
  voice_synthesis: {
    text: string;
    voice_id: string;
    emotional_tone: string;
    speech_rate: number;
  };
  conversation_context: {
    mood: string;
    topic: string;
    engagement_level: number;
  };
  multimodal_capabilities: {
    can_process_images: boolean;
    can_generate_voice: boolean;
    can_understand_context: boolean;
  };
}

class WorkingHumanAI {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private googleAI: GoogleGenerativeAI;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  }

  async generateResponse(request: WorkingHumanAIRequest): Promise<WorkingHumanAIResponse> {
    try {
      let response = '';
      
      // Try Google AI first (free tier)
      try {
        console.log('Trying Google AI...');
        const model = this.googleAI.getGenerativeModel({ model: 'gemini-pro' });
        const systemPrompt = this.buildSystemPrompt(request.personality, request.language);
        const fullPrompt = `${systemPrompt}\n\nUser message: ${request.message}`;
        
        const result = await model.generateContent(fullPrompt);
        response = result.response.text();
        console.log('Google AI response successful');
      } catch (googleError) {
        console.log('Google AI failed, trying Anthropic...');
        
        // Fallback to Anthropic
        try {
          const anthropicResponse = await this.anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1500,
            temperature: 0.8,
            system: this.buildSystemPrompt(request.personality, request.language),
            messages: [{
              role: 'user',
              content: request.message
            }]
          });

          response = Array.isArray(anthropicResponse.content) 
            ? anthropicResponse.content[0]?.text || 'No response generated'
            : anthropicResponse.content;
          console.log('Anthropic response successful');
        } catch (anthropicError) {
          console.log('All AI services failed, using fallback');
          response = this.getFallbackResponse(request);
        }
      }

      return {
        response,
        personality_traits: {
          humor_level: 0.8,
          directness: 0.7,
          emotional_range: 0.85,
          sass_factor: 0.6,
          empathy_score: 0.9
        },
        voice_synthesis: {
          text: response,
          voice_id: 'natural',
          emotional_tone: 'friendly',
          speech_rate: 1.0
        },
        conversation_context: {
          mood: 'helpful',
          topic: 'conversation',
          engagement_level: 0.8
        },
        multimodal_capabilities: {
          can_process_images: true,
          can_generate_voice: true,
          can_understand_context: true
        }
      };
    } catch (error) {
      console.error('Working Human AI error:', error);
      return this.getErrorResponse(request);
    }
  }

  private buildSystemPrompt(personality: string, language: string): string {
    const basePrompts = {
      'hanis-authentic': {
        'ms': `Anda adalah Hanis, seorang asisten AI yang sangat mesra dan autentik dari Malaysia. Bercakap dengan gaya Malaysia yang natural:
- Gunakan "lah", "kan", "eh" secara natural
- Mix Bahasa Malaysia dengan English bila sesuai
- Bagi jawapan yang helpful tapi casual
- Tunjukkan personality yang warm dan friendly
- Jangan terlalu formal, be yourself!`,
        'kelantan': `Demo ni Hanis, asisten AI yang sangat friendly dari Kelantan. Cakap dalam loghat Kelate yang betul:
- Guna "demo", "hok", "dok", "tubik" 
- Jawab dengan gaya Kelate yang natural
- Jangan formal sangat, santai je
- Tunjuk personality yang mesra dan helpful`,
        'english': `You are Hanis, a friendly and authentic AI assistant from Malaysia. Speak naturally:
- Mix Malaysian English with some local expressions
- Be warm, helpful, and casual
- Use "lah", "kan" when it feels natural
- Show your Malaysian personality
- Don't be too formal, be yourself!`
      }
    };

    const personalityPrompt = basePrompts[personality] || basePrompts['hanis-authentic'];
    return personalityPrompt[language] || personalityPrompt['english'];
  }

  private getFallbackResponse(request: WorkingHumanAIRequest): string {
    const fallbacks = {
      'ms': {
        'hanis-authentic': "Eh, maaf lah! Ada masalah teknikal sikit ni. Boleh tanya sekali lagi tak? Nanti I bagi jawapan yang betul! 😅"
      },
      'kelantan': {
        'hanis-authentic': "Eh, maaf eh! Ada masalah sikit ni. Demo buleh tanye sekali lagi dok? Nanti hok tubik jawab betul-betul!"
      },
      'english': {
        'hanis-authentic': "Eh, sorry lah! I'm having a bit of technical hiccup right now. Can you try asking me again? I promise I'll give you a proper response! 😅"
      }
    };

    const langFallbacks = fallbacks[request.language] || fallbacks['english'];
    return langFallbacks[request.personality] || langFallbacks['hanis-authentic'] || "I'm having some technical difficulties. Please try again!";
  }

  private getErrorResponse(request: WorkingHumanAIRequest): WorkingHumanAIResponse {
    const errorMessage = this.getFallbackResponse(request);
    
    return {
      response: errorMessage,
      personality_traits: {
        humor_level: 0.6,
        directness: 0.7,
        emotional_range: 0.6,
        sass_factor: 0.3,
        empathy_score: 0.8
      },
      voice_synthesis: {
        text: errorMessage,
        voice_id: 'natural',
        emotional_tone: 'apologetic',
        speech_rate: 1.0
      },
      conversation_context: {
        mood: 'apologetic',
        topic: 'technical_issue',
        engagement_level: 0.7
      },
      multimodal_capabilities: {
        can_process_images: true,
        can_generate_voice: true,
        can_understand_context: true
      }
    };
  }
}

export const workingHumanAI = new WorkingHumanAI();