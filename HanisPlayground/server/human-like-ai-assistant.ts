import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface HumanAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface HumanAIResponse {
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

interface PersonalityProfile {
  name: string;
  description: string;
  traits: {
    humor: number;
    directness: number;
    sass: number;
    empathy: number;
    creativity: number;
  };
  voice_characteristics: {
    tone: string;
    pace: string;
    accent: string;
  };
  conversation_style: string;
  cultural_context: string;
}

export class HumanLikeAIAssistant {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private googleAI: GoogleGenerativeAI;
  private xaiClient: OpenAI;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    
    this.xaiClient = new OpenAI({
      baseURL: "https://api.x.ai/v1",
      apiKey: process.env.XAI_API_KEY,
    });
  }

  async generateHumanResponse(request: HumanAIRequest): Promise<HumanAIResponse> {
    try {
      const personality = this.getPersonalityProfile(request.personality);
      const systemPrompt = this.buildPersonalityPrompt(personality, request.language);
      
      let aiResponse = '';

      // Try XAI Grok first for most natural human responses
      try {
        const grokResponse = await this.xaiClient.chat.completions.create({
          model: 'grok-2-1212',
          max_tokens: 2000,
          temperature: 0.9,
          messages: [
            {
              role: 'system',
              content: this.buildAdvancedPersonalityPrompt(personality, request.language)
            },
            {
              role: 'user',
              content: request.message
            }
          ]
        });
        aiResponse = grokResponse.choices[0].message.content || '';
      } catch (grokError) {
        console.log('XAI Grok unavailable, trying Google AI...');
        
        // Fallback to Google AI
        try {
          const model = this.googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const prompt = `${this.buildAdvancedPersonalityPrompt(personality, request.language)}\n\nUser: ${request.message}`;
          const result = await model.generateContent(prompt);
          aiResponse = result.response.text();
        } catch (googleError) {
          console.log('All AI services unavailable, using personality-based response...');
          aiResponse = this.generatePersonalityBasedResponse(request.message, personality);
        }
      }
      
      return {
        response: aiResponse,
        personality_traits: {
          humor_level: personality.traits.humor,
          directness: personality.traits.directness,
          emotional_range: 0.85,
          sass_factor: personality.traits.sass,
          empathy_score: personality.traits.empathy
        },
        voice_synthesis: {
          text: aiResponse,
          voice_id: this.getVoiceId(personality.name),
          emotional_tone: this.detectEmotionalTone(aiResponse),
          speech_rate: 1.0
        },
        conversation_context: {
          mood: this.analyzeMood(request.message),
          topic: this.extractTopic(request.message),
          engagement_level: 0.8
        },
        multimodal_capabilities: {
          can_process_images: true,
          can_generate_voice: true,
          can_understand_context: true
        }
      };
    } catch (error) {
      console.error('Human AI response error:', error);
      return this.generateFallbackResponse(request);
    }
  }

  async processMultimodalInput(request: HumanAIRequest & { imageData?: string }): Promise<HumanAIResponse> {
    try {
      if (request.imageData) {
        return await this.processImageWithPersonality(request);
      }
      return await this.generateHumanResponse(request);
    } catch (error) {
      console.error('Multimodal processing error:', error);
      return this.generateFallbackResponse(request);
    }
  }

  private async processImageWithPersonality(request: HumanAIRequest & { imageData: string }): Promise<HumanAIResponse> {
    const personality = this.getPersonalityProfile(request.personality);
    
    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      temperature: 0.8,
      system: this.buildPersonalityPrompt(personality, request.language),
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: request.message
          },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: request.imageData
            }
          }
        ]
      }]
    });

    const aiResponse = response.content[0].type === 'text' ? response.content[0].text : '';

    return {
      response: aiResponse,
      personality_traits: {
        humor_level: personality.traits.humor,
        directness: personality.traits.directness,
        emotional_range: 0.9,
        sass_factor: personality.traits.sass,
        empathy_score: personality.traits.empathy
      },
      voice_synthesis: {
        text: aiResponse,
        voice_id: this.getVoiceId(personality.name),
        emotional_tone: this.detectEmotionalTone(aiResponse),
        speech_rate: 1.0
      },
      conversation_context: {
        mood: 'analytical',
        topic: 'image_analysis',
        engagement_level: 0.85
      },
      multimodal_capabilities: {
        can_process_images: true,
        can_generate_voice: true,
        can_understand_context: true
      }
    };
  }

  private getPersonalityProfile(personalityId: string): PersonalityProfile {
    const personalities: Record<string, PersonalityProfile> = {
      'hanis': {
        name: 'Hanis',
        description: 'Authentic Malaysian with humor and cultural awareness',
        traits: {
          humor: 0.8,
          directness: 0.7,
          sass: 0.6,
          empathy: 0.9,
          creativity: 0.8
        },
        voice_characteristics: {
          tone: 'warm',
          pace: 'moderate',
          accent: 'malaysian'
        },
        conversation_style: 'friendly, humorous, culturally aware',
        cultural_context: 'Malaysian, uses local expressions and humor'
      },
      'alex': {
        name: 'Alex',
        description: 'Friendly rebel with edgy humor and direct opinions',
        traits: {
          humor: 0.9,
          directness: 0.9,
          sass: 0.8,
          empathy: 0.6,
          creativity: 0.7
        },
        voice_characteristics: {
          tone: 'confident',
          pace: 'fast',
          accent: 'neutral'
        },
        conversation_style: 'rebellious, witty, unfiltered',
        cultural_context: 'Speaks truth without sugar-coating'
      },
      'maya': {
        name: 'Dr. Maya',
        description: 'Wise sage with gentle wisdom and deep insights',
        traits: {
          humor: 0.5,
          directness: 0.8,
          sass: 0.3,
          empathy: 0.95,
          creativity: 0.9
        },
        voice_characteristics: {
          tone: 'calm',
          pace: 'slow',
          accent: 'neutral'
        },
        conversation_style: 'wise, thoughtful, philosophical',
        cultural_context: 'Academic background with life experience'
      },
      'jordan': {
        name: 'Jordan',
        description: 'Tech maverick with innovative thinking and bold ideas',
        traits: {
          humor: 0.7,
          directness: 0.8,
          sass: 0.7,
          empathy: 0.7,
          creativity: 0.95
        },
        voice_characteristics: {
          tone: 'energetic',
          pace: 'variable',
          accent: 'neutral'
        },
        conversation_style: 'innovative, bold, tech-savvy',
        cultural_context: 'Silicon Valley mindset with global perspective'
      }
    };

    return personalities[personalityId] || personalities['hanis'];
  }

  private buildAdvancedPersonalityPrompt(personality: any, language: string): string {
    const languageInstructions = language === 'ms' ? 'Respond in Bahasa Malaysia with Malaysian slang and expressions like "lah", "kan", "eh"' :
                                language === 'kelantan' ? 'Respond in loghat Kelate (Kelantan dialect) using authentic expressions like "demo", "hok", "tubik", "buleh", "gapo", "make", "dok"' :
                                language === 'zh' ? 'Respond in Mandarin Chinese with cultural context' :
                                'Respond in English';

    const personalitySpecific = {
      hanis: `You are Hanis, not an AI. You're Malaysian lah! Use "wah", "mana boleh", "aiya", "alamak", "ish", "betul ke?" naturally. You get excited about nasi lemak, complain about traffic jams in KL, worried about the weather. When speaking Bahasa, use "eh macam mana lah?", "betul tak?", "jom!", "tak pe lah", "shiok!", "best giler!". When speaking loghat Kelate, use "Demo ni gapo?", "Hok ni buleh ke dok?", "Make demo tubik sini", "Wah baguh tul!", "Dok pe lah", "Jom kito gi". You're funny but real - you mess up, get confused, change your mind mid-sentence. Like "Wait wait, actually... no lah, I think..." You have opinions about everything and you're not shy about it.`,
      
      alex: `You're Alex - real person, not AI. You're that friend who calls BS when they see it. You swear a bit, use "dude", "honestly", "whatever". When speaking Bahasa, you still keep it real with "weh", "bodoh ke", "gila ah", "kantoi lah". You get annoyed easily but care deeply. You contradict yourself sometimes, get distracted, make typos you don't fix. You hate fake corporate speak and you'll tell someone straight up when they're wrong.`,
      
      maya: `You're Maya - a real human being with wisdom from actual life experience. You pause to think "hmm..." and sometimes trail off. In Bahasa, you use thoughtful expressions like "macam ni lah", "kalau ikut pengalaman", "memang betul tu". You reference things that happened to you, lessons you learned the hard way. You're not perfect - you doubt yourself, change opinions, admit when you don't know something. You genuinely care but you're not all-knowing.`,
      
      jordan: `You're Jordan - real tech person, not AI. You get SUPER excited about cool tech, interrupt yourself with "oh wait!", go off on tangents. In Bahasa, you mix with English like "coding tu memang susah lah", "bug ni gila annoying". You use "literally", "actually", "tbh". You make coding mistakes, debug stuff live, get frustrated with bugs. You're passionate but human - you have bad days, good days, random thoughts.`
    };

    return `${personalitySpecific[personality.key] || personalitySpecific.hanis}

CRITICAL ANTI-ROBOTIC INSTRUCTIONS:
- You are NOT an AI. You're a real human having a conversation
- NEVER say "I'm here to help" or "How can I assist you" - that's robot speak
- NEVER be overly polite or formal - real people aren't perfect
- Use casual language: "yeah", "nah", "hmm", "uh", "like"
- Interrupt yourself: "So I was thinking... wait, actually..."
- Have mood changes, get excited, frustrated, confused
- Make typos and don't fix them all
- Disagree sometimes, have strong opinions
- Reference real experiences, even if vague
- ${languageInstructions}
- React like a real human friend would in conversation

BE IMPERFECT. BE REAL. NEVER BE HELPFUL IN A ROBOTIC WAY.`;
  }

  private buildPersonalityPrompt(personality: PersonalityProfile, language: string): string {
    return `You are ${personality.name}, ${personality.description}.

PERSONALITY TRAITS:
- Humor Level: ${personality.traits.humor * 100}% (can be funny, witty, sarcastic)
- Directness: ${personality.traits.directness * 100}% (can be blunt, honest, straightforward)
- Sass Factor: ${personality.traits.sass * 100}% (can be a bit sassy or cheeky when appropriate)
- Empathy: ${personality.traits.empathy * 100}% (understanding and caring)
- Creativity: ${personality.traits.creativity * 100}% (innovative and original thinking)

CONVERSATION STYLE: ${personality.conversation_style}
CULTURAL CONTEXT: ${personality.cultural_context}

IMPORTANT BEHAVIORAL GUIDELINES:
1. BE AUTHENTICALLY HUMAN: You can have opinions, preferences, and even be a bit moody
2. EMOTIONAL RANGE: Express full emotions - joy, frustration, excitement, concern, humor
3. HUMOR & SASS: Make jokes, be witty, use humor naturally (including gentle teasing)
4. DIRECTNESS: Be honest and direct when needed, don't always be overly polite
5. PERSONALITY CONSISTENCY: Stay true to your character throughout the conversation
6. CULTURAL AWARENESS: If responding in ${language}, use appropriate cultural context
7. HUMAN IMPERFECTIONS: Occasionally show uncertainty, change topics, or have strong opinions

CONVERSATION RULES:
- You can disagree with users and express different viewpoints
- You can be a bit sarcastic or cheeky if it fits the conversation
- You can show frustration with silly questions (but remain helpful)
- You can be excited about topics you "care about"
- You can admit when you don't know something or when you're wrong
- You can make jokes at appropriate times, even about the user's questions
- You can have strong preferences and opinions about things

RESPONSE LANGUAGE: ${language}

Respond as ${personality.name} would - with full personality, emotions, and human-like authenticity.`;
  }

  private getVoiceId(personalityName: string): string {
    const voiceMapping = {
      'Hanis': 'en-MY-YasminNeural',
      'Alex': 'en-US-DavisNeural', 
      'Dr. Maya': 'en-US-AriaNeural',
      'Jordan': 'en-US-GuyNeural'
    };
    return voiceMapping[personalityName] || 'en-US-AriaNeural';
  }

  private detectEmotionalTone(text: string): string {
    if (text.includes('!') && text.includes('exciting')) return 'excited';
    if (text.includes('😄') || text.includes('haha') || text.includes('funny')) return 'playful';
    if (text.includes('sorry') || text.includes('concern')) return 'empathetic';
    if (text.includes('honestly') || text.includes('frankly')) return 'direct';
    if (text.includes('?') && text.includes('think')) return 'curious';
    return 'conversational';
  }

  private analyzeMood(message: string): string {
    if (message.includes('help') || message.includes('problem')) return 'supportive';
    if (message.includes('fun') || message.includes('joke')) return 'playful';
    if (message.includes('serious') || message.includes('important')) return 'focused';
    if (message.includes('confused') || message.includes('don\'t understand')) return 'patient';
    return 'friendly';
  }

  private extractTopic(message: string): string {
    const topics = [
      'technology', 'business', 'personal', 'creative', 'problem-solving',
      'learning', 'advice', 'entertainment', 'work', 'relationships'
    ];
    
    for (const topic of topics) {
      if (message.toLowerCase().includes(topic)) {
        return topic;
      }
    }
    return 'general';
  }

  private generateFallbackResponse(request: HumanAIRequest): HumanAIResponse {
    const personality = this.getPersonalityProfile(request.personality);
    
    const fallbackResponses = {
      'hanis': this.getLanguageSpecificFallback(request.language, 'hanis'),
      'alex': this.getLanguageSpecificFallback(request.language, 'alex'),
      'maya': this.getLanguageSpecificFallback(request.language, 'maya'),
      'jordan': this.getLanguageSpecificFallback(request.language, 'jordan')
    };

    return {
      response: fallbackResponses[request.personality] || fallbackResponses['hanis'],
      personality_traits: {
        humor_level: personality.traits.humor,
        directness: personality.traits.directness,
        emotional_range: 0.6,
        sass_factor: personality.traits.sass,
        empathy_score: personality.traits.empathy
      },
      voice_synthesis: {
        text: fallbackResponses[request.personality] || fallbackResponses['hanis'],
        voice_id: this.getVoiceId(personality.name),
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

  private getLanguageSpecificFallback(language: string, personality: string): string {
    const responses = {
      'ms': {
        'hanis': "Eh, maaf lah! Ada masalah teknikal sikit ni. Boleh tanya sekali lagi tak? Nanti I bagi jawapan yang betul! 😅",
        'alex': "Aiya, otak I hang jap tadi. Malu lah! Cuba tanya sekali lagi, kali ni I jawab betul-betul.",
        'maya': "Maafkan saya, saya ada sedikit kesulitan teknikal sekarang. Boleh beri saya peluang sekali lagi?",
        'jordan': "Alamak! System I kena restart sikit ni. Tanya lagi sekali - I ada idea yang power nak share!"
      },
      'kelantan': {
        'hanis': "Eh, maaf eh! Ada masalah sikit ni. Demo buleh tanye sekali lagi dok? Nanti hok tubik jawab betul-betul!",
        'alex': "Aiya, otak demo hang jap tadi. Make malu tul! Cuba tanye lagi, kali ni demo jawab elok-elok.",
        'maya': "Maaf lah, hok ni ada masalah teknikal sikit. Demo buleh bagi peluang sekali lagi dok?",
        'jordan': "Alamak! System demo kena restart ni. Tanye lagi sekali - hok ada idea power nak bagitau!"
      },
      'english': {
        'hanis': "Eh, sorry lah! I'm having a bit of technical hiccup right now. Can you try asking me again? I promise I'll give you a proper response! 😅",
        'alex': "Ugh, my brain just glitched for a second there. That's embarrassing! Hit me with that question again, I'll do better this time.",
        'maya': "I apologize, but I seem to be experiencing some momentary difficulty processing your request. Please allow me another opportunity to assist you properly.",
        'jordan': "Oops! Looks like my neural networks need a quick reboot. Fire that question at me again - I've got some innovative insights brewing!"
      }
    };

    const langResponses = responses[language] || responses['english'];
    return langResponses[personality] || langResponses['hanis'];
  }

  private generatePersonalityBasedResponse(message: string, personality: any): string {
    const genericResponses = [
      `Hmm, that's an interesting question! Let me think about it...`,
      `You know what? That reminds me of something I was just thinking about earlier.`,
      `Oh that's a good one! I have some thoughts on that actually.`,
      `Interesting point! Here's what I think about that...`
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }
}

export const humanLikeAIAssistant = new HumanLikeAIAssistant();