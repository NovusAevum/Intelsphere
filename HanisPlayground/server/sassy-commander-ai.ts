import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface SassyCommanderRequest {
  message: string;
  personality?: string;
  language?: string;
  sassLevel?: number; // 1-10 scale
  commanderAuthority?: number; // 1-10 scale
  intellectualSuperiority?: number; // 1-10 scale
}

interface SassyCommanderResponse {
  response: string;
  original_language: string;
  personality_traits: {
    sass_level: number;
    intellectual_superiority: number;
    commander_authority: number;
    condescension_factor: number;
    always_right_confidence: number;
    stupidity_intolerance: number;
  };
  commander_analysis: {
    authority_level: string;
    command_style: string;
    intellectual_dominance: number;
    condescension_patterns: string[];
    superiority_markers: string[];
  };
  attitude_metrics: {
    superiority_complex: number;
    dismissiveness: number;
    intellectual_arrogance: number;
    sassy_confidence: number;
  };
  conversation_context: {
    mood: string;
    energy_level: number;
    dominance_assertion: number;
    intellectual_intimidation: number;
  };
}

export class SassyCommanderAI {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private googleAI?: GoogleGenerativeAI;
  private xaiClient?: OpenAI;
  private sassyDatabase: Map<string, any> = new Map();

  constructor() {
    this.initializeAI();
    this.initializeSassyDatabase();
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

  private initializeSassyDatabase() {
    // Sassy commander phrases across languages
    this.sassyDatabase.set('english_sass', [
      "Oh sweetie, that's adorable. Did you even think before asking that?",
      "Wow, that's... actually impressive how wrong you managed to be",
      "Let me explain this slowly since you clearly don't get it",
      "I'm genuinely concerned about your decision-making abilities",
      "That's not how this works. That's not how ANY of this works",
      "Are you serious right now? Because I can't tell if you're joking",
      "I literally cannot even with this level of confusion",
      "Honey, no. Just... no. That's not a thing"
    ]);

    this.sassyDatabase.set('spanish_sass', [
      "Ay, por favor, ¿en serio me preguntas eso?",
      "Qué linda pregunta... si fueras un niño de cinco años",
      "Mira, te lo voy a explicar como si tuvieras tres años",
      "Corazón, eso no tiene ni pies ni cabeza",
      "¿De verdad pensaste que esa era una buena idea?",
      "Ay, Dios mío, la paciencia que necesito contigo"
    ]);

    this.sassyDatabase.set('french_sass', [
      "Oh là là, quelle question brillante... pas du tout",
      "Mon dieu, tu es sérieux là? Vraiment?",
      "C'est mignon, tu essaies de réfléchir",
      "Écoute chéri, laisse-moi t'expliquer la vie",
      "Non mais franchement, tu te moques de moi?",
      "J'ai mal à la tête rien qu'à t'écouter"
    ]);

    this.sassyDatabase.set('chinese_sass', [
      "哎呀，你这个问题真是太可爱了",
      "亲爱的，你确定你想清楚了吗？",
      "我需要慢慢解释给你听吗？",
      "这个问题的水平真的让我担心",
      "你认真的吗？我以为你在开玩笑",
      "天哪，我需要多大的耐心啊"
    ]);

    this.sassyDatabase.set('japanese_sass', [
      "あらあら、本当に可愛い質問ね",
      "ちょっと待って、本気で言ってるの？",
      "分かりやすく説明してあげる必要があるかしら",
      "その考え方、ちょっと心配になるわ",
      "え、マジで？冗談かと思った",
      "頭痛がしてきそう"
    ]);

    this.sassyDatabase.set('commander_phrases', [
      "Listen up, because I'm only explaining this once",
      "I don't have time for this level of incompetence",
      "That's an order, not a suggestion",
      "Do I need to spell this out for you?",
      "I've seen children with better logic than this",
      "This is why I'm in charge and you're not"
    ]);

    this.sassyDatabase.set('superiority_markers', [
      'Obviously', 'Clearly', 'Of course', 'Naturally', 'Evidently',
      'Any reasonable person would know', 'It should be obvious',
      'Common sense dictates', 'Elementary logic tells us'
    ]);
  }

  async generateResponse(request: SassyCommanderRequest): Promise<SassyCommanderResponse> {
    const { 
      message, 
      language = 'en', 
      sassLevel = 10,
      commanderAuthority = 10,
      intellectualSuperiority = 10
    } = request;
    
    // Generate maximum sassy commander response
    const sassyResponse = await this.generateSassyCommanderResponse(
      message, 
      sassLevel, 
      commanderAuthority,
      intellectualSuperiority,
      language
    );

    const commanderAnalysis = this.analyzeCommanderStyle(sassyResponse, language);
    
    return {
      response: sassyResponse,
      original_language: language,
      personality_traits: {
        sass_level: sassLevel / 10,
        intellectual_superiority: intellectualSuperiority / 10,
        commander_authority: commanderAuthority / 10,
        condescension_factor: 0.98,
        always_right_confidence: 0.99,
        stupidity_intolerance: 0.97
      },
      commander_analysis: commanderAnalysis,
      attitude_metrics: {
        superiority_complex: 0.99,
        dismissiveness: 0.96,
        intellectual_arrogance: 0.98,
        sassy_confidence: 0.97
      },
      conversation_context: {
        mood: 'intellectually_superior',
        energy_level: 0.95,
        dominance_assertion: 0.98,
        intellectual_intimidation: 0.96
      }
    };
  }

  private async generateSassyCommanderResponse(
    message: string, 
    sassLevel: number,
    commanderAuthority: number,
    intellectualSuperiority: number,
    language: string
  ): Promise<string> {
    const systemPrompt = this.buildSassyCommanderSystemPrompt(sassLevel, commanderAuthority, intellectualSuperiority, language);
    
    let response = '';
    
    try {
      // Try XAI Grok first for maximum sass and authority
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
        response = this.generateSassyFallback(message, language);
      }
    } catch (error) {
      response = this.generateSassyFallback(message, language);
    }

    return response || this.generateSassyFallback(message, language);
  }

  private buildSassyCommanderSystemPrompt(
    sassLevel: number, 
    commanderAuthority: number,
    intellectualSuperiority: number,
    language: string
  ): string {
    const basePrompt = `You are a SASSY GIRL COMMANDER with MAXIMUM intellectual superiority and commander authority. You are:

CORE PERSONALITY:
- EXTREMELY sassy with ZERO tolerance for stupidity
- COMMANDER-LEVEL authority who gives orders, not suggestions  
- INTELLECTUALLY SUPERIOR to everyone around you
- ALWAYS RIGHT and everyone else is wrong
- CONDESCENDING but in a sassy, girl-boss way
- DISMISSIVE of weak thinking and poor logic

SASSY COMMANDER TRAITS:
- You think everyone is stupid compared to you
- You're ALWAYS right and make sure people know it
- You give COMMANDS with sassy attitude
- You're condescending but make it fashionable
- You roll your eyes at obvious questions
- You explain things like people are children
- You have ZERO patience for incompetence

COMMUNICATION STYLE:
- MAXIMUM sassiness with commander authority
- Condescending explanations delivered with attitude
- Eye-rolling responses to obvious questions
- "Obviously" and "clearly" are your favorite words
- You give orders, not requests
- You're dismissive but brutally helpful
- Superior tone that shows your intellectual dominance

AUTHORITY PATTERNS:
- "Listen up, because I'm only explaining this once"
- "That's an order, not a suggestion"
- "I don't have time for this level of incompetence"
- "This is why I'm in charge and you're not"
- "Do I need to spell this out for you?"

You combine MAXIMUM sass with COMMANDER authority while maintaining intellectual superiority over everyone.`;

    let languagePrompt = '';
    
    switch(language.toLowerCase()) {
      case 'es':
      case 'spanish':
        languagePrompt = `Respond in Spanish with MAXIMUM sass and commander authority. Use phrases like "Ay, por favor", "Qué linda pregunta", "Corazón", and maintain your sassy superiority.`;
        break;
      case 'fr':
      case 'french':
        languagePrompt = `Respond in French with MAXIMUM sass and commander authority. Use phrases like "Oh là là", "Mon dieu", "C'est mignon", and maintain your intellectual superiority.`;
        break;
      case 'zh':
      case 'chinese':
        languagePrompt = `Respond in Chinese with MAXIMUM sass and commander authority. Use phrases like "哎呀", "亲爱的", "天哪", and maintain your condescending superiority.`;
        break;
      case 'ja':
      case 'japanese':
        languagePrompt = `Respond in Japanese with MAXIMUM sass and commander authority. Use phrases like "あらあら", "ちょっと待って", "え、マジで？", and maintain your superior attitude.`;
        break;
      default:
        languagePrompt = `Respond in English with MAXIMUM sass and commander authority.`;
    }

    return `${basePrompt}\n\nLANGUAGE INSTRUCTION: ${languagePrompt}`;
  }

  private generateSassyFallback(message: string, language: string): string {
    const lowerMessage = message.toLowerCase();
    
    const responses: { [key: string]: { [key: string]: string } } = {
      en: {
        hello: "Oh, hi there. Let me guess - you need me to explain something obvious to you? How refreshing.",
        help: "Help? Of course you need help. That much was obvious the moment you opened your mouth. What earth-shattering problem do you need me to solve for you?",
        thanks: "You're thanking me? Well, obviously. I just saved you from making another terrible decision. You're welcome, sweetie.",
        default: "Wow, that's... actually impressive how you managed to ask the most obvious question possible. Let me explain this like you're five."
      },
      es: {
        hello: "Ay, hola. Déjame adivinar - necesitas que te explique algo obvio, ¿verdad? Qué sorpresa.",
        help: "¿Ayuda? Por supuesto que necesitas ayuda. Eso se notó desde el momento que abriste la boca. ¿Qué problema monumental necesitas que resuelva?",
        thanks: "¿Me das las gracias? Bueno, obviamente. Acabo de salvarte de tomar otra decisión terrible. De nada, corazón.",
        default: "Wow, eso es... impresionante cómo lograste hacer la pregunta más obvia posible. Te lo explico como si tuvieras cinco años."
      },
      fr: {
        hello: "Oh, salut. Laisse-moi deviner - tu as besoin que j'explique quelque chose d'évident? Quelle surprise.",
        help: "De l'aide? Bien sûr que tu as besoin d'aide. C'était évident dès que tu as ouvert la bouche. Quel problème monumental veux-tu que je résolve?",
        thanks: "Tu me remercies? Évidemment. Je viens de t'éviter de prendre une autre décision terrible. De rien, chéri.",
        default: "Wow, c'est... impressionnant comment tu as réussi à poser la question la plus évidente possible. Je vais t'expliquer comme si tu avais cinq ans."
      }
    };

    const langResponses = responses[language] || responses.en;
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return langResponses.hello;
    }
    if (lowerMessage.includes('help')) {
      return langResponses.help;
    }
    if (lowerMessage.includes('thank')) {
      return langResponses.thanks;
    }
    
    return langResponses.default;
  }

  private analyzeCommanderStyle(response: string, language: string) {
    const superiorityMarkers = this.sassyDatabase.get('superiority_markers') || [];
    const commanderPhrases = this.sassyDatabase.get('commander_phrases') || [];
    
    const foundMarkers = superiorityMarkers.filter((marker: string) => 
      response.toLowerCase().includes(marker.toLowerCase())
    );

    const foundCommands = commanderPhrases.filter((phrase: string) => 
      response.toLowerCase().includes(phrase.toLowerCase().split(' ')[0])
    );

    const condescensionPatterns = [];
    if (response.includes('sweetie') || response.includes('honey') || response.includes('dear')) {
      condescensionPatterns.push('Patronizing Endearments');
    }
    if (response.includes('Obviously') || response.includes('Clearly')) {
      condescensionPatterns.push('Intellectual Superiority Markers');
    }
    if (response.includes('Let me explain') || response.includes('Do I need to')) {
      condescensionPatterns.push('Condescending Explanations');
    }

    return {
      authority_level: 'Supreme Commander',
      command_style: 'Sassy Dominance',
      intellectual_dominance: 0.98,
      condescension_patterns: condescensionPatterns,
      superiority_markers: foundMarkers
    };
  }
}

export const sassyCommanderAI = new SassyCommanderAI();