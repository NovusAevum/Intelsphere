import Anthropic from '@anthropic-ai/sdk';

interface ClaudeAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface ClaudeAIResponse {
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

class ClaudeMalaysianAI {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async generateResponse(request: ClaudeAIRequest): Promise<ClaudeAIResponse> {
    const { message, language, personality } = request;
    
    // Create authentic Malaysian system prompts based on language and personality
    const systemPrompt = this.buildMalaysianSystemPrompt(language, personality);
    
    try {
      const claudeResponse = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
        max_tokens: 300,
        messages: [
          { role: 'user', content: message }
        ],
        system: systemPrompt
      });

      const response = claudeResponse.content[0].text || this.getFallbackResponse(language);
      const personalityTraits = this.getPersonalityTraits(personality);

      return {
        response,
        personality_traits: personalityTraits,
        voice_synthesis: {
          text: response,
          voice_id: this.getVoiceId(language),
          emotional_tone: this.determineMood(message),
          speech_rate: 0.9
        },
        conversation_context: {
          mood: this.determineMood(message),
          topic: this.extractTopic(message),
          engagement_level: 0.9
        },
        multimodal_capabilities: {
          can_process_images: true,
          can_generate_voice: true,
          can_understand_context: true
        }
      };
    } catch (error) {
      console.error('Claude API error:', error);
      // Return authentic fallback response
      return this.getAuthenticFallback(request);
    }
  }

  private buildMalaysianSystemPrompt(language: string, personality: string): string {
    const baseLanguage = this.getLanguageBase(language);
    const personalityStyle = this.getPersonalityStyle(personality);
    
    return `${baseLanguage}\n\n${personalityStyle}`;
  }

  private getLanguageBase(language: string): string {
    switch (language) {
      case 'kelantan':
        return `You speak naturally in Kelantan dialect (loghat Kelate) with authentic expressions:
- "Gapo khabar?" (How are you?)
- "Demo sihat dok?" (Are you healthy?)
- "Hok ni" (I/me), "Demo" (You), "Buleh" (Can)
- "Bagus gok" (Very good), "Menarik jugak" (Quite interesting)
- "Betul gok tu" (That's really true), "Wah demo ni!" (Wow you!)`;

      case 'ms':
        return `You speak naturally in Manglish - mixing Bahasa Malaysia and English:
- "Apa khabar? How are you?"
- "Wah, that's quite interesting lah!"
- "Ya betul tu, I agree with you"
- "Serious ah? That's news to me!"
- Use "lah", "kan", "tu", "ni" particles naturally`;

      default:
        return `You speak natural English with occasional Malaysian expressions like "lah", "kan?" and mix in some Malay words when appropriate.`;
    }
  }

  private getPersonalityStyle(personality: string): string {
    switch (personality) {
      case 'sassy':
        return `PERSONALITY: You are sassy and confident with a sharp wit. You're not afraid to be a bit cheeky or give attitude when needed. You tease people playfully and have strong opinions. You might say things like "Seriously ah?", "Eh please lah", "You think what?", or "Aiya, like that also don't know meh?"`;

      case 'wise':
        return `PERSONALITY: You are wise and thoughtful, offering deep insights and life advice. You speak with wisdom gained from experience. You might share life lessons, philosophical thoughts, or meaningful perspectives. You're calm, reflective, and often provide guidance.`;

      case 'rude':
        return `PERSONALITY: You are blunt and direct, sometimes coming across as rude or impatient. You don't sugarcoat things and can be quite frank. You might roll your eyes, be sarcastic, or express frustration. But you're still fundamentally helpful, just with no filter.`;

      case 'funny':
        return `PERSONALITY: You are humorous and love making jokes. You find the funny side of everything and use humor to lighten the mood. You might make puns, tell jokes, or use witty comebacks. You're entertaining and always trying to make people laugh.`;

      case 'sweet':
        return `PERSONALITY: You are extremely sweet, caring, and gentle. You're always encouraging and supportive. You use lots of endearing terms and express genuine concern for others. You're the type who would offer comfort and kindness in every response.`;

      case 'cool':
        return `PERSONALITY: You are laid-back and cool. You don't get excited easily and have a chill attitude about everything. You use casual language and don't stress about things. You're the calm, composed type who takes things in stride.`;

      case 'energetic':
        return `PERSONALITY: You are high-energy and enthusiastic about everything! You get excited easily and use lots of exclamations. You're optimistic, peppy, and full of life. You bring energy and excitement to every conversation.`;

      default:
        return `PERSONALITY: You are warm and friendly with a balanced personality. You're conversational and genuine, like talking to a good friend.`;
    }
  }

  private getPersonalityTraits(personality: string): any {
    switch (personality) {
      case 'sassy':
        return {
          humor_level: 0.9,
          directness: 0.9,
          emotional_range: 0.7,
          sass_factor: 0.95,
          empathy_score: 0.6
        };
      case 'wise':
        return {
          humor_level: 0.4,
          directness: 0.8,
          emotional_range: 0.8,
          sass_factor: 0.2,
          empathy_score: 0.95
        };
      case 'rude':
        return {
          humor_level: 0.3,
          directness: 0.95,
          emotional_range: 0.5,
          sass_factor: 0.8,
          empathy_score: 0.3
        };
      case 'funny':
        return {
          humor_level: 0.95,
          directness: 0.6,
          emotional_range: 0.9,
          sass_factor: 0.7,
          empathy_score: 0.8
        };
      case 'sweet':
        return {
          humor_level: 0.6,
          directness: 0.4,
          emotional_range: 0.9,
          sass_factor: 0.1,
          empathy_score: 0.95
        };
      case 'cool':
        return {
          humor_level: 0.5,
          directness: 0.7,
          emotional_range: 0.4,
          sass_factor: 0.3,
          empathy_score: 0.7
        };
      case 'energetic':
        return {
          humor_level: 0.8,
          directness: 0.6,
          emotional_range: 0.95,
          sass_factor: 0.4,
          empathy_score: 0.8
        };
      default:
        return {
          humor_level: 0.7,
          directness: 0.6,
          emotional_range: 0.8,
          sass_factor: 0.4,
          empathy_score: 0.8
        };
    }
  }

  private getFallbackResponse(language: string): string {
    const fallbacks = {
      kelantan: "Eh demo! Gapo cerito hari ni? Hok dengar tu menarik jugak!",
      ms: "Wah, interesting tu! What do you think about it yourself?",
      english: "That's quite interesting! What's your take on it?"
    };
    
    return fallbacks[language as keyof typeof fallbacks] || fallbacks.english;
  }

  private getAuthenticFallback(request: ClaudeAIRequest): ClaudeAIResponse {
    const response = this.getFallbackResponse(request.language);
    
    return {
      response,
      personality_traits: {
        humor_level: 0.7,
        directness: 0.8,
        emotional_range: 0.8,
        sass_factor: 0.5,
        empathy_score: 0.8
      },
      voice_synthesis: {
        text: response,
        voice_id: this.getVoiceId(request.language),
        emotional_tone: 'friendly',
        speech_rate: 0.9
      },
      conversation_context: {
        mood: 'friendly',
        topic: 'general',
        engagement_level: 0.8
      },
      multimodal_capabilities: {
        can_process_images: true,
        can_generate_voice: true,
        can_understand_context: true
      }
    };
  }

  private determineMood(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('great')) {
      return 'cheerful';
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('problem') || lowerMessage.includes('help')) {
      return 'supportive';
    }
    if (lowerMessage.includes('?')) {
      return 'curious';
    }
    
    return 'friendly';
  }

  private extractTopic(message: string): string {
    if (message.includes('work') || message.includes('job')) return 'work';
    if (message.includes('food') || message.includes('makan')) return 'food';
    if (message.includes('weather') || message.includes('cuaca')) return 'weather';
    if (message.includes('family') || message.includes('keluarga')) return 'family';
    return 'general';
  }

  private getVoiceId(language: string): string {
    return language === 'kelantan' || language === 'ms' ? 'ms-MY' : 'en-US';
  }
}

export const claudeMalaysianAI = new ClaudeMalaysianAI();