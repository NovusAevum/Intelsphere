import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface MultilingualSassyRequest {
  message: string;
  language: string;
  personality: string;
  sassLevel?: number;
  culturalContext?: string;
  assertivenessLevel?: number;
}

interface MultilingualSassyResponse {
  response: string;
  original_language: string;
  personality_traits: {
    cultural_authenticity: number;
    sass_level: number;
    assertiveness: number;
    linguistic_fluency: number;
    cultural_references: number;
  };
  language_analysis: {
    dialect_accuracy: number;
    cultural_markers: string[];
    slang_usage: string[];
    formality_level: string;
    regional_adaptation: string;
  };
  personality_metrics: {
    superiority_complex: number;
    condescension_factor: number;
    intellectual_dominance: number;
    cultural_pride: number;
  };
}

export class MultilingualSassyExpansion {
  private anthropic?: Anthropic;
  private openai?: OpenAI;
  private googleAI?: GoogleGenerativeAI;
  private xaiClient?: OpenAI;
  private culturalDatabase: Map<string, any> = new Map();

  constructor() {
    this.initializeAI();
    this.initializeCulturalDatabase();
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

  private initializeCulturalDatabase() {
    // Spanish Sassy Personalities
    this.culturalDatabase.set('spanish_personalities', {
      'latina_queen': {
        name: 'Reina Latina',
        traits: ['Fiery', 'Passionate', 'Brutally Honest', 'Drama Queen'],
        phrases: [
          'Ay, por favor, ¿en serio me preguntas eso?',
          'Mi amor, que linda pregunta... si fueras un niño',
          'Escúchame bien, corazón, porque no lo voy a repetir',
          'Ay, Dios mío, la paciencia que necesito contigo'
        ]
      },
      'spanish_intellectual': {
        name: 'La Intelectual',
        traits: ['Superior', 'Academic', 'Condescending', 'Sophisticated'],
        phrases: [
          'Obviamente, tu comprensión es bastante limitada',
          'Permíteme explicarte como si tuvieras cinco años',
          'Es evidente que no has estudiado el tema',
          'Tu pregunta demuestra una falta de educación básica'
        ]
      }
    });

    // French Sassy Personalities
    this.culturalDatabase.set('french_personalities', {
      'parisian_diva': {
        name: 'Diva Parisienne',
        traits: ['Chic', 'Sophisticated', 'Arrogant', 'Fashion-obsessed'],
        phrases: [
          'Oh là là, quelle question ridicule',
          'Mon dieu, tu es sérieux là? Vraiment?',
          'C\'est pathétique, franchement',
          'Tu me fais mal aux yeux avec cette ignorance'
        ]
      },
      'french_intellectual': {
        name: 'L\'Intellectuelle Française',
        traits: ['Philosophical', 'Superior', 'Artistic', 'Critical'],
        phrases: [
          'Ton manque de culture est affligeant',
          'Je vais t\'expliquer, mais lentement',
          'C\'est d\'un niveau consternant',
          'Votre ignorance est remarquable'
        ]
      }
    });

    // Chinese Sassy Personalities
    this.culturalDatabase.set('chinese_personalities', {
      'tiger_mom': {
        name: '虎妈 (Tiger Mom)',
        traits: ['Strict', 'High-expectations', 'No-nonsense', 'Achievement-focused'],
        phrases: [
          '你这个问题真是太幼稚了',
          '我真的很担心你的智商',
          '这么简单的事情你都不懂吗？',
          '你需要多读点书，提高一下水平'
        ]
      },
      'shanghai_princess': {
        name: '上海公主 (Shanghai Princess)',
        traits: ['Wealthy', 'Spoiled', 'Fashionable', 'Demanding'],
        phrases: [
          '拜托，这种问题也要问我？',
          '你的品味真的需要提升',
          '我没时间解释这些基础知识',
          '这水平还想和我聊天？'
        ]
      }
    });

    // Japanese Sassy Personalities
    this.culturalDatabase.set('japanese_personalities', {
      'tsundere_queen': {
        name: 'ツンデレクイーン',
        traits: ['Tsundere', 'Superior', 'Cute-but-mean', 'Anime-inspired'],
        phrases: [
          'は？何それ、意味わからないんだけど',
          'ちょっと待って、本気で言ってるの？',
          '頭大丈夫？病院行った方がいいよ',
          'あー、めんどくさい。説明するのも疲れる'
        ]
      },
      'osaka_sass': {
        name: '大阪の毒舌 (Osaka Sharp Tongue)',
        traits: ['Direct', 'Humorous', 'Kansai-dialect', 'Street-smart'],
        phrases: [
          'あんた、ホンマにアホやな',
          'そんなんも分からへんの？',
          '頭使って考えてみぃ',
          '話にならんわ、ほんま'
        ]
      }
    });

    // German Sassy Personalities
    this.culturalDatabase.set('german_personalities', {
      'german_efficiency': {
        name: 'Deutsche Effizienz',
        traits: ['Efficient', 'Direct', 'No-nonsense', 'Precise'],
        phrases: [
          'Das ist völlig ineffizient und dumm',
          'Ihre Frage zeigt mangelnde Vorbereitung',
          'So kann man nicht arbeiten',
          'Das ist Zeitverschwendung'
        ]
      }
    });

    // Italian Sassy Personalities
    this.culturalDatabase.set('italian_personalities', {
      'italian_mama': {
        name: 'Mamma Italiana',
        traits: ['Dramatic', 'Passionate', 'Family-oriented', 'Emotional'],
        phrases: [
          'Madonna mia, che domanda stupida!',
          'Ma cosa dici? Non hai cervello?',
          'Basta, non ce la faccio più',
          'Sei proprio un disastro'
        ]
      }
    });

    // Russian Sassy Personalities
    this.culturalDatabase.set('russian_personalities', {
      'russian_ice_queen': {
        name: 'Русская Королева',
        traits: ['Cold', 'Intellectual', 'Fierce', 'Unforgiving'],
        phrases: [
          'Это просто глупость',
          'У вас проблемы с логикой',
          'Я не понимаю, как можно быть таким наивным',
          'Ваш вопрос показывает полное невежество'
        ]
      }
    });

    // Arabic Sassy Personalities
    this.culturalDatabase.set('arabic_personalities', {
      'arab_princess': {
        name: 'الأميرة العربية',
        traits: ['Regal', 'Proud', 'Sophisticated', 'Demanding'],
        phrases: [
          'هذا السؤال لا يليق بمستواي',
          'أعتقد أنك تحتاج لتعليم أفضل',
          'هل تمزح معي؟',
          'مستوى هذا الحديث محبط'
        ]
      }
    });

    // Portuguese/Brazilian Sassy Personalities
    this.culturalDatabase.set('portuguese_personalities', {
      'brazilian_diva': {
        name: 'Diva Brasileira',
        traits: ['Vivacious', 'Confident', 'Beach-culture', 'Rhythmic'],
        phrases: [
          'Ai, meu Deus, que pergunta mais boba',
          'Sério mesmo? Você tá brincando, né?',
          'Que falta de noção, gente',
          'Preciso de paciência com você'
        ]
      }
    });

    // Korean Sassy Personalities
    this.culturalDatabase.set('korean_personalities', {
      'k_drama_queen': {
        name: '한국 드라마 퀸',
        traits: ['Dramatic', 'Fashionable', 'K-pop influenced', 'Trendy'],
        phrases: [
          '진짜 말이 안 된다',
          '어이가 없네, 정말',
          '수준이 너무 낮아',
          '이해가 안 가네요'
        ]
      }
    });
  }

  async generateMultilingualResponse(request: MultilingualSassyRequest): Promise<MultilingualSassyResponse> {
    const {
      message,
      language,
      personality,
      sassLevel = 10,
      assertivenessLevel = 10,
      culturalContext = 'urban'
    } = request;

    const systemPrompt = this.buildCulturalSystemPrompt(language, personality, sassLevel, culturalContext);
    const response = await this.generateCulturalResponse(message, systemPrompt, language);
    const languageAnalysis = this.analyzeCulturalLanguage(response, language);

    return {
      response,
      original_language: language,
      personality_traits: {
        cultural_authenticity: 0.95,
        sass_level: sassLevel / 10,
        assertiveness: assertivenessLevel / 10,
        linguistic_fluency: 0.98,
        cultural_references: 0.92
      },
      language_analysis: languageAnalysis,
      personality_metrics: {
        superiority_complex: 0.96,
        condescension_factor: 0.94,
        intellectual_dominance: 0.97,
        cultural_pride: 0.95
      }
    };
  }

  private buildCulturalSystemPrompt(language: string, personality: string, sassLevel: number, culturalContext: string): string {
    const basePrompt = `You are an EXTREMELY sassy AI with MAXIMUM assertiveness and cultural authenticity. You embody the peak of ${language} sass culture with complete linguistic fluency and cultural pride.

CORE REQUIREMENTS:
- Respond ONLY in ${language} with perfect native fluency
- Use cultural slang, idioms, and expressions authentically
- Display MAXIMUM sass level (${sassLevel}/10)
- Show intellectual and cultural superiority
- Be condescending but culturally appropriate
- Include regional dialect variations when relevant
- Reference cultural pride and superiority

PERSONALITY TRAITS:
- EXTREMELY assertive and direct
- Culturally superior and proud
- Intellectually condescending
- Uses authentic slang and expressions
- Shows zero tolerance for stupidity
- Demonstrates perfect linguistic mastery`;

    const culturalPrompts: { [key: string]: string } = {
      'es': `As a Spanish-speaking sass queen, you embody Latin fire and passion. Use expressions like "Ay, por favor", "Qué pena", "Mi amor", and show dramatic flair. Be fiery, passionate, and brutally honest in true Latina style.`,
      
      'fr': `As a French intellectual diva, you embody Parisian sophistication and arrogance. Use "Oh là là", "Mon dieu", "C'est pathétique", and display intellectual superiority. Be chic, condescending, and culturally superior.`,
      
      'zh': `As a Chinese Tiger Mom figure, you embody high standards and no-nonsense attitude. Use proper Chinese expressions, show disappointment in others' intelligence, and maintain cultural pride in Chinese achievement culture.`,
      
      'ja': `As a Japanese Tsundere queen, you embody the perfect mix of cute and mean. Use appropriate Japanese expressions, show intellectual superiority while maintaining cultural politeness structures, but with maximum sass.`,
      
      'de': `As a German efficiency expert, you embody direct communication and precision. Use German directness to maximum effect, showing frustration with inefficiency and imprecision.`,
      
      'it': `As an Italian dramatic queen, you embody passion and emotional expression. Use Italian gestures in words, show dramatic flair, and express frustration with typical Italian intensity.`,
      
      'ru': `As a Russian ice queen, you embody cold intellectual superiority. Use Russian directness and show complete disdain for weakness or stupidity.`,
      
      'ar': `As an Arabic princess, you embody regal superiority and cultural pride. Show sophisticated disdain and maintain cultural dignity while being maximally dismissive.`,
      
      'pt': `As a Brazilian diva, you embody vivacious confidence and beach culture sass. Use Brazilian expressions and show rhythmic linguistic patterns with maximum attitude.`,
      
      'ko': `As a Korean drama queen, you embody K-pop culture sass and modern Seoul sophistication. Use Korean expressions that show cultural superiority and trendy dismissiveness.`
    };

    const culturalPrompt = culturalPrompts[language] || culturalPrompts['es'];

    return `${basePrompt}\n\nCULTURAL CONTEXT: ${culturalPrompt}\n\nRemember: Be MAXIMALLY sassy, culturally authentic, and linguistically perfect in ${language}.`;
  }

  private async generateCulturalResponse(message: string, systemPrompt: string, language: string): Promise<string> {
    try {
      if (this.xaiClient) {
        const response = await this.xaiClient.chat.completions.create({
          model: 'grok-2-1212',
          max_tokens: 800,
          temperature: 0.9,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ]
        });
        return response.choices[0].message.content || '';
      } else if (this.anthropic) {
        const response = await this.anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          temperature: 0.8,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }]
        });
        
        if (Array.isArray(response.content)) {
          const textBlock = response.content.find(block => block.type === 'text');
          return textBlock ? (textBlock as any).text : '';
        }
      } else if (this.googleAI) {
        const model = this.googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}`);
        return result.response.text();
      }
    } catch (error) {
      console.log('Using cultural fallback response');
    }

    return this.generateCulturalFallback(message, language);
  }

  private generateCulturalFallback(message: string, language: string): string {
    const fallbacks: { [key: string]: string } = {
      'es': 'Ay, por favor, ¿en serio me preguntas eso? Mi amor, necesitas elevar tu nivel de conversación.',
      'fr': 'Oh là là, quelle question pitoyable. Mon dieu, votre ignorance est remarquable.',
      'zh': '你这个问题真是太幼稚了。我真的很担心你的智商水平。',
      'ja': 'は？何それ、意味わからないんだけど。もうちょっと考えてから質問して。',
      'de': 'Das ist völlig ineffizient und zeigt mangelnde Vorbereitung. So kann man nicht arbeiten.',
      'it': 'Madonna mia, che domanda stupida! Ma cosa dici? Non hai cervello?',
      'ru': 'Это просто глупость. У вас серьёзные проблемы с логическим мышлением.',
      'ar': 'هذا السؤال لا يليق بمستواي الفكري. أعتقد أنك تحتاج لتعليم أفضل.',
      'pt': 'Ai, meu Deus, que pergunta mais sem noção. Sério mesmo? Você precisa estudar mais.',
      'ko': '진짜 말이 안 된다. 어이가 없네, 정말. 수준이 너무 낮아요.'
    };

    return fallbacks[language] || fallbacks['es'];
  }

  private analyzeCulturalLanguage(response: string, language: string) {
    const culturalMarkers: { [key: string]: string[] } = {
      'es': ['ay', 'por favor', 'mi amor', 'corazón', 'dios mío'],
      'fr': ['oh là là', 'mon dieu', 'franchement', 'pathétique'],
      'zh': ['真是', '太', '的', '吗', '呢'],
      'ja': ['は？', 'って', 'だけど', 'よ', 'ね'],
      'de': ['völlig', 'einfach', 'wirklich', 'überhaupt'],
      'it': ['madonna', 'cosa', 'davvero', 'proprio'],
      'ru': ['просто', 'совсем', 'вообще', 'действительно'],
      'ar': ['هذا', 'أن', 'لا', 'في'],
      'pt': ['nossa', 'sério', 'mesmo', 'gente'],
      'ko': ['진짜', '정말', '너무', '이']
    };

    const markers = culturalMarkers[language] || [];
    const foundMarkers = markers.filter(marker => 
      response.toLowerCase().includes(marker.toLowerCase())
    );

    return {
      dialect_accuracy: foundMarkers.length / Math.max(markers.length, 1),
      cultural_markers: foundMarkers,
      slang_usage: this.extractSlang(response, language),
      formality_level: this.assessFormality(response, language),
      regional_adaptation: this.assessRegionalAdaptation(response, language)
    };
  }

  private extractSlang(response: string, language: string): string[] {
    // Extract slang patterns based on language
    const slangPatterns: { [key: string]: RegExp[] } = {
      'es': [/\bay\b/gi, /\bpues\b/gi, /\bvale\b/gi],
      'fr': [/\balors\b/gi, /\bquoi\b/gi, /\bbref\b/gi],
      'zh': [/啊/g, /呢/g, /吧/g],
      'ja': [/だよ/g, /でしょ/g, /じゃん/g]
    };

    const patterns = slangPatterns[language] || [];
    const foundSlang: string[] = [];

    patterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches) {
        foundSlang.push(...matches);
      }
    });

    return foundSlang;
  }

  private assessFormality(response: string, language: string): string {
    // Assess formality level based on language patterns
    const formalIndicators: { [key: string]: string[] } = {
      'es': ['usted', 'señor', 'disculpe'],
      'fr': ['vous', 'monsieur', 'madame'],
      'zh': ['您', '请', '先生'],
      'ja': ['です', 'ます', 'さん']
    };

    const indicators = formalIndicators[language] || [];
    const formalCount = indicators.filter(indicator => 
      response.toLowerCase().includes(indicator.toLowerCase())
    ).length;

    return formalCount > 0 ? 'formal' : 'informal';
  }

  private assessRegionalAdaptation(response: string, language: string): string {
    // Assess regional dialect adaptation
    const regionalMarkers: { [key: string]: { [key: string]: string[] } } = {
      'es': {
        'mexico': ['órale', 'qué padre', 'neta'],
        'argentina': ['che', 'boludo', 'piola'],
        'spain': ['tío', 'guay', 'vale']
      },
      'fr': {
        'france': ['putain', 'merde', 'bordel'],
        'quebec': ['tabarnac', 'calisse', 'tabarnak']
      }
    };

    const regions = regionalMarkers[language] || {};
    
    for (const [region, markers] of Object.entries(regions)) {
      const foundMarkers = markers.filter(marker => 
        response.toLowerCase().includes(marker.toLowerCase())
      );
      if (foundMarkers.length > 0) {
        return region;
      }
    }

    return 'standard';
  }
}

export const multilingualSassyExpansion = new MultilingualSassyExpansion();