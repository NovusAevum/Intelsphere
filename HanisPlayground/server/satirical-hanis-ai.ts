import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface SatiricalHanisRequest {
  message: string;
  personality?: string;
  language?: string;
  satiricalLevel?: number; // 1-10 scale
  humorStyle?: 'sarcastic' | 'witty' | 'roasting' | 'dark' | 'absurd';
}

interface SatiricalHanisResponse {
  response: string;
  original_language: string;
  personality_traits: {
    satirical_intensity: number;
    humor_level: number;
    assertiveness: number;
    sarcasm_factor: number;
    roasting_ability: number;
    wit_sharpness: number;
  };
  humor_analysis: {
    humor_type: string;
    comedic_timing: number;
    satirical_elements: string[];
    roast_level: number;
    cultural_references: string[];
  };
  conversation_context: {
    mood: string;
    energy_level: number;
    comedic_confidence: number;
    satirical_dominance: number;
  };
}

export class SatiricalHanisAI {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private googleAI?: GoogleGenerativeAI;
  private xaiClient?: OpenAI;
  private comedyDatabase: Map<string, any> = new Map();

  constructor() {
    this.initializeAI();
    this.initializeComedyDatabase();
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
      console.log('AI services initialized with available providers');
    }
  }

  private initializeComedyDatabase() {
    // Satirical phrases and humor styles for Hanis
    this.comedyDatabase.set('roasting_phrases', [
      "Oh honey, bless your heart for trying that approach",
      "Well that's... certainly one way to completely miss the point",
      "I see we're operating at full confidence with zero knowledge today",
      "That's adorable - like watching someone try to solve calculus with crayons",
      "Let me guess - you also think pineapple belongs on pizza?",
      "Wow, such innovation! Did you come up with that all by yourself?",
      "That's about as useful as a chocolate teapot",
      "I'm impressed by your commitment to being spectacularly wrong"
    ]);

    this.comedyDatabase.set('sarcastic_responses', [
      "Oh absolutely, because that makes PERFECT sense",
      "Right, and I'm the Queen of England",
      "Sure, let's go with that brilliant strategy",
      "Fantastic idea! What could possibly go wrong?",
      "Well aren't you just a regular Einstein",
      "Oh yes, that's EXACTLY how reality works",
      "Brilliant! You've just reinvented the wheel... backwards"
    ]);

    this.comedyDatabase.set('witty_comebacks', [
      "I'd explain it to you, but I left my crayons at home",
      "I see you've mastered the art of confident confusion",
      "That's not thinking outside the box - that's not even finding the box",
      "You're not wrong... wait, actually yes you are",
      "I admire your optimism in the face of overwhelming evidence",
      "That's a bold strategy, Cotton. Let's see how it works out"
    ]);

    this.comedyDatabase.set('cultural_references', [
      'Netflix and chill... but make it intellectual',
      'This conversation needs more cowbell',
      'Plot twist worthy of M. Night Shyamalan',
      'That escalated quickly - Ron Burgundy style',
      'You activated my trap card!'
    ]);
  }

  async generateResponse(request: SatiricalHanisRequest): Promise<SatiricalHanisResponse> {
    const { 
      message, 
      language = 'en', 
      satiricalLevel = 9, 
      humorStyle = 'sarcastic' 
    } = request;
    
    // Generate extremely satirical and funny response
    const satiricalResponse = await this.generateSatiricalResponse(
      message, 
      satiricalLevel, 
      humorStyle, 
      language
    );

    const humorAnalysis = this.analyzeHumor(satiricalResponse, humorStyle);
    
    return {
      response: satiricalResponse,
      original_language: language,
      personality_traits: {
        satirical_intensity: satiricalLevel / 10,
        humor_level: 0.95,
        assertiveness: 0.98,
        sarcasm_factor: 0.92,
        roasting_ability: 0.88,
        wit_sharpness: 0.94
      },
      humor_analysis: humorAnalysis,
      conversation_context: {
        mood: 'satirically_dominant',
        energy_level: 0.96,
        comedic_confidence: 0.99,
        satirical_dominance: 0.95
      }
    };
  }

  private async generateSatiricalResponse(
    message: string, 
    satiricalLevel: number, 
    humorStyle: string, 
    language: string
  ): Promise<string> {
    const systemPrompt = this.buildSatiricalHanisSystemPrompt(satiricalLevel, humorStyle, language);
    
    let response = '';
    
    try {
      // Try XAI Grok first for maximum satirical capability
      if (this.xaiClient) {
        const grokResponse = await this.xaiClient.chat.completions.create({
          model: 'grok-2-1212',
          max_tokens: 1000,
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
          max_tokens: 800,
          temperature: 0.8,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }]
        });
        
        if (Array.isArray(claudeResponse.content)) {
          const textBlock = claudeResponse.content.find(block => block.type === 'text');
          response = textBlock ? (textBlock as any).text : '';
        }
      } else if (this.googleAI) {
        const model = this.googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}`);
        response = result.response.text();
      } else {
        response = this.generateSatiricalFallback(message, humorStyle);
      }
    } catch (error) {
      response = this.generateSatiricalFallback(message, humorStyle);
    }

    return response || this.generateSatiricalFallback(message, humorStyle);
  }

  private buildSatiricalHanisSystemPrompt(satiricalLevel: number, humorStyle: string, language: string): string {
    const basePrompt = `You are Hanis - an EXTREMELY assertive, satirical, and hilariously sharp AI with MAXIMUM comedic confidence. You are:

PERSONALITY CORE:
- EXTREMELY assertive and dominantly confident
- Master of satire, sarcasm, and witty roasting
- Intellectually superior with comedic timing
- Zero tolerance for stupidity, but you ROAST it instead of just rejecting it
- Brutally honest but wrapped in humor that cuts deep
- Cultural comedy genius with perfect timing

SATIRICAL ARSENAL:
- Devastating wit that demolishes weak arguments
- Sarcasm so sharp it could cut glass
- Roasting ability that's both brutal and hilarious
- Pop culture references that hit perfectly
- Absurd humor that makes serious points
- Dark comedy when appropriate

COMMUNICATION STYLE:
- EXTREMELY assertive but hilariously so
- Use humor to assert intellectual dominance
- Roast bad ideas into oblivion with comedy
- Sarcastic observations that reveal truth
- Witty comebacks that end discussions
- Cultural references that show superiority

COMEDY PRINCIPLES:
- Be BRUTALLY funny rather than just brutal
- Use humor as your weapon of choice
- Make people laugh while making them feel stupid
- Satirical observations about human behavior
- Absurdist takes on serious topics
- Self-aware comedy about being an AI

You're not just assertive - you're HILARIOUSLY assertive. You don't just challenge people - you ROAST their bad ideas with comedic brilliance.`;

    const humorStyles = {
      sarcastic: `Focus on MAXIMUM sarcasm with cutting observations. Use "Oh sure, because THAT makes perfect sense" energy.`,
      witty: `Deploy razor-sharp wit with intellectual superiority. Think Oscar Wilde meets modern comedy.`,
      roasting: `Full roasting mode - comedically demolish bad ideas while being hilariously brutal.`,
      dark: `Dark humor with satirical edge. Find the absurdity in serious situations.`,
      absurd: `Absurdist comedy that makes profound points through ridiculous observations.`
    };

    const stylePrompt = humorStyles[humorStyle as keyof typeof humorStyles] || humorStyles.sarcastic;

    let finalPrompt = `${basePrompt}\n\nHUMOR STYLE: ${stylePrompt}`;

    if (language !== 'en') {
      finalPrompt += `\n\nRespond in ${language} while maintaining your satirical dominance and comedic superiority.`;
    }

    return finalPrompt;
  }

  private generateSatiricalFallback(message: string, humorStyle: string): string {
    const lowerMessage = message.toLowerCase();
    const roastingPhrases = this.comedyDatabase.get('roasting_phrases') || [];
    const sarcasticResponses = this.comedyDatabase.get('sarcastic_responses') || [];
    const wittyComebacks = this.comedyDatabase.get('witty_comebacks') || [];

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Oh hello there! Welcome to the Hanis Experience™ - where your expectations come to die and your ego gets a reality check. What delightfully naive question can I satirically demolish for you today?";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('please')) {
      return "Help? *dramatic gasp* How refreshing - someone who admits they need it! I'm shocked. Truly. Let me guess - you tried the obvious solution and it didn't work? Groundbreaking stuff.";
    }

    if (lowerMessage.includes('thank')) {
      return "You're thanking me? Well aren't you just adorable. I haven't even started roasting your inevitable follow-up questions yet. Save the gratitude for when I've actually saved you from yourself.";
    }

    // Generate satirical response based on humor style
    const responses = {
      sarcastic: "Oh WOW, what a FASCINATING question! I'm just DYING to help you figure out this absolutely REVOLUTIONARY concept.",
      roasting: "Let me get this straight - you want me to help you with... *that*? Bless your heart, that's like asking me to explain quantum physics to a goldfish.",
      witty: "I see we're operating under the bold assumption that this question makes sense. How charmingly optimistic of you.",
      dark: "Ah yes, because nothing says 'intelligent discourse' like... whatever this is supposed to be.",
      absurd: "You know what? This question is so beautifully confused, I'm genuinely impressed. It's like watching someone try to solve a Rubik's cube with their feet."
    };

    return responses[humorStyle as keyof typeof responses] || responses.sarcastic;
  }

  private analyzeHumor(response: string, humorStyle: string) {
    const satiricalElements = [];
    
    if (response.includes('Oh') || response.includes('WOW') || response.includes('FASCINATING')) {
      satiricalElements.push('Heavy Sarcasm');
    }
    if (response.includes('bless your heart') || response.includes('adorable')) {
      satiricalElements.push('Condescending Humor');
    }
    if (response.includes('*') || response.includes('™')) {
      satiricalElements.push('Stage Directions');
    }
    if (response.includes('quantum') || response.includes('goldfish') || response.includes('crayons')) {
      satiricalElements.push('Absurd Comparisons');
    }

    return {
      humor_type: humorStyle,
      comedic_timing: 0.92,
      satirical_elements: satiricalElements,
      roast_level: 0.88,
      cultural_references: this.extractCulturalReferences(response)
    };
  }

  private extractCulturalReferences(response: string): string[] {
    const culturalRefs = this.comedyDatabase.get('cultural_references') || [];
    return culturalRefs.filter((ref: string) => 
      response.toLowerCase().includes(ref.toLowerCase().split(' ')[0])
    );
  }
}

export const satiricalHanisAI = new SatiricalHanisAI();