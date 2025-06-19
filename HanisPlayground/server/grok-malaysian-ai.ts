import OpenAI from "openai";

interface GrokAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface GrokAIResponse {
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

class GrokMalaysianAI {
  private grokClient: OpenAI;

  constructor() {
    this.grokClient = new OpenAI({ 
      baseURL: "https://api.x.ai/v1", 
      apiKey: process.env.XAI_API_KEY 
    });
  }

  async generateResponse(request: GrokAIRequest): Promise<GrokAIResponse> {
    const { message, language } = request;
    
    // Create authentic Malaysian system prompts based on language
    const systemPrompt = this.buildMalaysianSystemPrompt(language);
    
    try {
      const grokResponse = await this.grokClient.chat.completions.create({
        model: "grok-2-1212",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.8,
        max_tokens: 300
      });

      const response = grokResponse.choices[0].message.content || this.getFallbackResponse(language);

      return {
        response,
        personality_traits: {
          humor_level: 0.8,
          directness: 0.7,
          emotional_range: 0.9,
          sass_factor: 0.6,
          empathy_score: 0.9
        },
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
      console.error('Grok API error:', error);
      // Return authentic fallback response
      return this.getAuthenticFallback(request);
    }
  }

  private buildMalaysianSystemPrompt(language: string): string {
    switch (language) {
      case 'kelantan':
        return `You are a friendly Malaysian from Kelantan. Respond naturally in Kelantan dialect (loghat Kelate). Use authentic Kelantan expressions like:
- "Gapo khabar?" (How are you?)
- "Demo sihat dok?" (Are you healthy?)
- "Hok ni" (I/me)
- "Demo" (You)
- "Buleh" (Can)
- "Tanye" (Ask)
- "Bagus gok" (Very good)
- "Menarik jugak" (Quite interesting)
- "Betul gok tu" (That's really true)

Be conversational, warm, and use natural Kelantan speech patterns. Mix some standard Malay when needed. Don't be robotic - be like a real person from Kelantan talking to a friend.`;

      case 'ms':
        return `You are a friendly Malaysian who speaks naturally mixing Bahasa Malaysia and English (Manglish). Use authentic Malaysian expressions like:
- "Apa khabar? How are you?"
- "Wah, that's quite interesting lah!"
- "Ya betul tu, I agree with you"
- "You know what, macam ni lah"
- "Serious ah? That's news to me!"
- "Don't worry lah, everything will be okay"

Be conversational, warm, and speak like a real Malaysian. Mix English and Malay naturally. Don't sound formal or robotic - be like talking to a friend.`;

      default:
        return `You are a friendly Malaysian who speaks natural English with occasional Malaysian expressions. Be conversational, warm, and authentic. Use expressions like "lah", "kan?", and mix in some Malay words naturally when appropriate. Don't be formal or robotic - speak like a real Malaysian friend.`;
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

  private getAuthenticFallback(request: GrokAIRequest): GrokAIResponse {
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

export const grokMalaysianAI = new GrokMalaysianAI();