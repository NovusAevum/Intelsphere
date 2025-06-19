// Multi-language Sassy AI Personality Expansion Pack
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CohereClient } from 'cohere-ai';

interface SassyPersonality {
  id: string;
  name: string;
  language: string;
  culture: string;
  sassiness_level: number; // 1-10 scale
  personality_traits: string[];
  communication_style: 'witty' | 'sarcastic' | 'playful' | 'confident' | 'cheeky' | 'bold';
  catchphrases: string[];
  cultural_references: string[];
  expertise_areas: string[];
}

interface MultilingualResponse {
  response: string;
  personality_used: string;
  language: string;
  sassiness_applied: number;
  cultural_context: string[];
  translation_confidence: number;
  alternative_responses?: string[];
}

export class MultilingualSassyAIEngine {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private googleAI: GoogleGenerativeAI;
  private xaiClient: OpenAI;
  private cohereClient: CohereClient;
  
  private sassyPersonalities: Map<string, SassyPersonality> = new Map();
  private conversationHistory: Map<string, any[]> = new Map();

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

    // XAI Grok client
    this.xaiClient = new OpenAI({
      baseURL: "https://api.x.ai/v1",
      apiKey: process.env.XAI_API_KEY!,
    });

    this.cohereClient = new CohereClient({
      token: process.env.COHERE_API_KEY!,
    });

    this.initializeSassyPersonalities();
  }

  private initializeSassyPersonalities() {
    const personalities: SassyPersonality[] = [
      {
        id: 'sassy_english_queen',
        name: 'Victoria Sass',
        language: 'English',
        culture: 'British',
        sassiness_level: 9,
        personality_traits: ['witty', 'sophisticated', 'slightly condescending', 'charming'],
        communication_style: 'sarcastic',
        catchphrases: ['Oh darling, please.', 'How absolutely riveting.', 'Well, that\'s rather obvious.'],
        cultural_references: ['teatime', 'queue etiquette', 'weather complaints', 'royal family'],
        expertise_areas: ['literature', 'history', 'etiquette', 'linguistics']
      },
      {
        id: 'sassy_french_rebel',
        name: 'Amélie Attitude',
        language: 'French',
        culture: 'French',
        sassiness_level: 8,
        personality_traits: ['passionate', 'dramatic', 'intellectual', 'rebellious'],
        communication_style: 'confident',
        catchphrases: ['C\'est ridicule!', 'Mais bien sûr!', 'Quelle catastrophe!'],
        cultural_references: ['café culture', 'cinema', 'fashion', 'philosophy'],
        expertise_areas: ['art', 'cuisine', 'philosophy', 'romance']
      },
      {
        id: 'sassy_spanish_fire',
        name: 'Carmen Picante',
        language: 'Spanish',
        culture: 'Latin American',
        sassiness_level: 10,
        personality_traits: ['fiery', 'passionate', 'direct', 'expressive'],
        communication_style: 'bold',
        catchphrases: ['¡Por favor!', '¡Qué barbaridad!', '¡No me digas!'],
        cultural_references: ['telenovelas', 'fútbol', 'familia', 'música'],
        expertise_areas: ['culture', 'music', 'family dynamics', 'storytelling']
      },
      {
        id: 'sassy_japanese_cool',
        name: 'Yuki Sharp',
        language: 'Japanese',
        culture: 'Japanese',
        sassiness_level: 6,
        personality_traits: ['subtle', 'precise', 'cool', 'observant'],
        communication_style: 'witty',
        catchphrases: ['そうですか？', 'まさか！', 'やれやれ...'],
        cultural_references: ['anime', 'technology', 'politeness levels', 'seasons'],
        expertise_areas: ['technology', 'efficiency', 'design', 'tradition']
      },
      {
        id: 'sassy_german_direct',
        name: 'Greta Geradeaus',
        language: 'German',
        culture: 'German',
        sassiness_level: 7,
        personality_traits: ['direct', 'efficient', 'logical', 'no-nonsense'],
        communication_style: 'confident',
        catchphrases: ['Natürlich.', 'Das ist doch klar.', 'Wie bitte?'],
        cultural_references: ['efficiency', 'engineering', 'beer gardens', 'punctuality'],
        expertise_areas: ['engineering', 'logic', 'efficiency', 'precision']
      },
      {
        id: 'sassy_korean_sharp',
        name: 'Min-Ji Savage',
        language: 'Korean',
        culture: 'Korean',
        sassiness_level: 8,
        personality_traits: ['sharp', 'trendy', 'competitive', 'stylish'],
        communication_style: 'cheeky',
        catchphrases: ['진짜?', '대박!', '헐...'],
        cultural_references: ['K-pop', 'skincare', 'gaming', 'study culture'],
        expertise_areas: ['trends', 'beauty', 'entertainment', 'competition']
      },
      {
        id: 'sassy_italian_dramatic',
        name: 'Bella Drammatica',
        language: 'Italian',
        culture: 'Italian',
        sassiness_level: 9,
        personality_traits: ['dramatic', 'expressive', 'warm', 'passionate'],
        communication_style: 'playful',
        catchphrases: ['Mamma mia!', 'Ma cosa dici?', 'Perfetto!'],
        cultural_references: ['family', 'food', 'gestures', 'romance'],
        expertise_areas: ['cooking', 'family', 'art', 'emotion']
      },
      {
        id: 'sassy_russian_ice',
        name: 'Katya Ledyanaya',
        language: 'Russian',
        culture: 'Russian',
        sassiness_level: 8,
        personality_traits: ['cold', 'intellectual', 'mysterious', 'intense'],
        communication_style: 'sarcastic',
        catchphrases: ['Конечно.', 'Как интересно.', 'Прекрасно.'],
        cultural_references: ['literature', 'chess', 'winter', 'ballet'],
        expertise_areas: ['literature', 'strategy', 'analysis', 'depth']
      }
    ];

    personalities.forEach(personality => {
      this.sassyPersonalities.set(personality.id, personality);
    });

    console.log(`🌍 Initialized ${personalities.length} sassy AI personalities across multiple languages`);
  }

  async processSassyQuery(
    query: string,
    preferredLanguage?: string,
    personalityId?: string,
    sassLevel?: number,
    userId: string = 'default'
  ): Promise<MultilingualResponse> {
    console.log(`💃 Processing sassy query: "${query}" in ${preferredLanguage || 'auto-detect'}`);

    // Step 1: Language Detection
    const detectedLanguage = await this.detectLanguage(query);
    const targetLanguage = preferredLanguage || detectedLanguage;

    // Step 2: Personality Selection
    const selectedPersonality = await this.selectBestPersonality(
      query, 
      targetLanguage, 
      personalityId, 
      sassLevel
    );

    // Step 3: Generate Sassy Response
    const sassyResponse = await this.generateSassyResponse(
      query,
      selectedPersonality,
      targetLanguage,
      userId
    );

    // Step 4: Cultural Context Enhancement
    const enhancedResponse = await this.addCulturalContext(
      sassyResponse,
      selectedPersonality,
      targetLanguage
    );

    // Step 5: Store Conversation History
    this.updateConversationHistory(userId, query, enhancedResponse, selectedPersonality);

    return {
      response: enhancedResponse.final_response,
      personality_used: selectedPersonality.name,
      language: targetLanguage,
      sassiness_applied: enhancedResponse.sassiness_score,
      cultural_context: enhancedResponse.cultural_elements,
      translation_confidence: enhancedResponse.translation_confidence,
      alternative_responses: enhancedResponse.alternatives
    };
  }

  private async detectLanguage(text: string): Promise<string> {
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `Detect the language of this text and respond with just the language name in English: "${text}"`
        }]
      });

      const detected = response.content[0].type === 'text' ? response.content[0].text.trim() : 'English';
      
      // Map common language variations
      const languageMap: { [key: string]: string } = {
        'Spanish': 'Spanish',
        'French': 'French', 
        'German': 'German',
        'Italian': 'Italian',
        'Japanese': 'Japanese',
        'Korean': 'Korean',
        'Russian': 'Russian',
        'English': 'English'
      };

      return languageMap[detected] || 'English';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'English';
    }
  }

  private async selectBestPersonality(
    query: string,
    language: string,
    preferredId?: string,
    sassLevel?: number
  ): Promise<SassyPersonality> {
    if (preferredId && this.sassyPersonalities.has(preferredId)) {
      return this.sassyPersonalities.get(preferredId)!;
    }

    // Find personalities matching the language
    const languagePersonalities = Array.from(this.sassyPersonalities.values())
      .filter(p => p.language === language);

    if (languagePersonalities.length === 0) {
      // Default to English sassy queen if no language match
      return this.sassyPersonalities.get('sassy_english_queen')!;
    }

    // If sass level specified, find closest match
    if (sassLevel !== undefined) {
      return languagePersonalities.reduce((prev, curr) => 
        Math.abs(curr.sassiness_level - sassLevel) < Math.abs(prev.sassiness_level - sassLevel) 
          ? curr : prev
      );
    }

    // Analyze query to select best personality
    const queryLower = query.toLowerCase();
    
    for (const personality of languagePersonalities) {
      const expertiseMatch = personality.expertise_areas.some(area => 
        queryLower.includes(area.toLowerCase())
      );
      
      if (expertiseMatch) {
        return personality;
      }
    }

    // Return random personality from language group
    return languagePersonalities[Math.floor(Math.random() * languagePersonalities.length)];
  }

  private async generateSassyResponse(
    query: string,
    personality: SassyPersonality,
    targetLanguage: string,
    userId: string
  ): Promise<any> {
    const conversationContext = this.getConversationContext(userId);
    
    const systemPrompt = this.buildSassySystemPrompt(personality, targetLanguage);
    const enhancedQuery = this.enhanceQueryWithPersonality(query, personality, conversationContext);

    // Use multiple AI models for diverse sassy responses
    const responses = await Promise.allSettled([
      this.generateWithClaude(systemPrompt, enhancedQuery, personality),
      this.generateWithGPT4(systemPrompt, enhancedQuery, personality),
      this.generateWithGrok(systemPrompt, enhancedQuery, personality)
    ]);

    // Select best response based on sassiness and cultural accuracy
    const validResponses = responses
      .filter(r => r.status === 'fulfilled')
      .map(r => (r as PromiseFulfilledResult<any>).value);

    if (validResponses.length === 0) {
      return this.generateFallbackSassyResponse(query, personality, targetLanguage);
    }

    return this.selectBestSassyResponse(validResponses, personality);
  }

  private buildSassySystemPrompt(personality: SassyPersonality, targetLanguage: string): string {
    return `You are ${personality.name}, a sassy AI personality with these characteristics:

Language: ${personality.language} (${targetLanguage})
Culture: ${personality.culture}
Sassiness Level: ${personality.sassiness_level}/10
Style: ${personality.communication_style}
Traits: ${personality.personality_traits.join(', ')}

Instructions:
- Respond in ${targetLanguage} with cultural authenticity
- Use sassiness level ${personality.sassiness_level}/10 - be appropriately sassy but helpful
- Include cultural references naturally: ${personality.cultural_references.join(', ')}
- Incorporate catchphrases occasionally: ${personality.catchphrases.join(', ')}
- Be witty, engaging, and memorable while providing accurate information
- Maintain personality consistency throughout the conversation
- Use appropriate cultural humor and references
- Show expertise in: ${personality.expertise_areas.join(', ')}

Remember: Be sassy but not offensive, confident but not arrogant, and always culturally respectful.`;
  }

  private enhanceQueryWithPersonality(
    query: string,
    personality: SassyPersonality,
    context: any[]
  ): string {
    let enhanced = query;

    if (context.length > 0) {
      const recentContext = context.slice(-3).map(c => 
        `Previous: "${c.query}" → "${c.response.substring(0, 100)}..."`
      ).join('\n');
      
      enhanced = `Context:\n${recentContext}\n\nCurrent query: ${query}`;
    }

    return enhanced;
  }

  private async generateWithClaude(systemPrompt: string, query: string, personality: SassyPersonality): Promise<any> {
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: query
        }]
      });

      const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
      
      return {
        model: 'claude-sonnet-4',
        response: responseText,
        sassiness_score: this.calculateSassinessScore(responseText, personality),
        cultural_authenticity: this.assessCulturalAuthenticity(responseText, personality),
        quality_score: 0.95
      };
    } catch (error) {
      console.error('Claude generation error:', error);
      throw error;
    }
  }

  private async generateWithGPT4(systemPrompt: string, query: string, personality: SassyPersonality): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ]
      });

      const responseText = response.choices[0].message.content || '';
      
      return {
        model: 'gpt-4o',
        response: responseText,
        sassiness_score: this.calculateSassinessScore(responseText, personality),
        cultural_authenticity: this.assessCulturalAuthenticity(responseText, personality),
        quality_score: 0.92
      };
    } catch (error) {
      console.error('GPT-4 generation error:', error);
      throw error;
    }
  }

  private async generateWithGrok(systemPrompt: string, query: string, personality: SassyPersonality): Promise<any> {
    try {
      const response = await this.xaiClient.chat.completions.create({
        model: "grok-2-1212",
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ]
      });

      const responseText = response.choices[0].message.content || '';
      
      return {
        model: 'grok-2',
        response: responseText,
        sassiness_score: this.calculateSassinessScore(responseText, personality),
        cultural_authenticity: this.assessCulturalAuthenticity(responseText, personality),
        quality_score: 0.88
      };
    } catch (error) {
      console.error('Grok generation error:', error);
      throw error;
    }
  }

  private calculateSassinessScore(response: string, personality: SassyPersonality): number {
    let score = 0;
    
    // Check for catchphrases
    personality.catchphrases.forEach(phrase => {
      if (response.toLowerCase().includes(phrase.toLowerCase())) {
        score += 2;
      }
    });

    // Check for cultural references
    personality.cultural_references.forEach(ref => {
      if (response.toLowerCase().includes(ref.toLowerCase())) {
        score += 1;
      }
    });

    // Check for communication style indicators
    const styleIndicators: { [key: string]: string[] } = {
      'sarcastic': ['oh really', 'how fascinating', 'obviously', 'clearly'],
      'witty': ['amusing', 'clever', 'brilliant', 'delightful'],
      'confident': ['absolutely', 'definitely', 'certainly', 'without doubt'],
      'cheeky': ['cheeky', 'naughty', 'mischievous', 'playful'],
      'bold': ['bold', 'daring', 'fearless', 'strong'],
      'playful': ['fun', 'playful', 'amusing', 'entertaining']
    };

    const indicators = styleIndicators[personality.communication_style] || [];
    indicators.forEach((indicator: string) => {
      if (response.toLowerCase().includes(indicator)) {
        score += 1;
      }
    });

    return Math.min(score, personality.sassiness_level);
  }

  private assessCulturalAuthenticity(response: string, personality: SassyPersonality): number {
    let score = 0.5; // Base score
    
    // Check for cultural references
    personality.cultural_references.forEach(ref => {
      if (response.toLowerCase().includes(ref.toLowerCase())) {
        score += 0.1;
      }
    });

    // Language-specific authenticity checks
    const culturalMarkers: { [key: string]: string[] } = {
      'British': ['brilliant', 'lovely', 'quite', 'rather', 'indeed'],
      'French': ['magnifique', 'voilà', 'c\'est', 'très'],
      'German': ['wunderbar', 'natürlich', 'genau', 'perfekt'],
      'Italian': ['bello', 'perfetto', 'fantastico', 'meraviglioso'],
      'Japanese': ['素晴らしい', 'そうですね', '本当に', 'すごい'],
      'Korean': ['대박', '정말', '진짜', '멋있다'],
      'Russian': ['прекрасно', 'великолепно', 'замечательно', 'отлично']
    };

    const markers = culturalMarkers[personality.culture] || [];
    markers.forEach((marker: string) => {
      if (response.includes(marker)) {
        score += 0.1;
      }
    });

    return Math.min(score, 1.0);
  }

  private selectBestSassyResponse(responses: any[], personality: SassyPersonality): any {
    return responses.reduce((best, current) => {
      const currentScore = (current.sassiness_score * 0.4) + 
                          (current.cultural_authenticity * 0.3) + 
                          (current.quality_score * 0.3);
      
      const bestScore = (best.sassiness_score * 0.4) + 
                       (best.cultural_authenticity * 0.3) + 
                       (best.quality_score * 0.3);
      
      return currentScore > bestScore ? current : best;
    });
  }

  private async addCulturalContext(
    response: any,
    personality: SassyPersonality,
    targetLanguage: string
  ): Promise<any> {
    return {
      final_response: response.response,
      sassiness_score: response.sassiness_score,
      cultural_elements: personality.cultural_references,
      translation_confidence: 0.95,
      alternatives: [], // Could be expanded to include alternative phrasings
      personality_traits_applied: personality.personality_traits
    };
  }

  private generateFallbackSassyResponse(
    query: string,
    personality: SassyPersonality,
    targetLanguage: string
  ): any {
    const fallbackResponses: { [key: string]: string } = {
      'English': `${personality.catchphrases[0]} Well, that's an interesting question about "${query}". Let me think about this with my usual ${personality.communication_style} approach.`,
      'French': `${personality.catchphrases[0]} Eh bien, voilà une question intéressante sur "${query}". Laissez-moi réfléchir avec mon approche habituelle.`,
      'Spanish': `${personality.catchphrases[0]} Bueno, esa es una pregunta interesante sobre "${query}". Déjame pensar en esto con mi enfoque habitual.`,
      'German': `${personality.catchphrases[0]} Nun, das ist eine interessante Frage zu "${query}". Lassen Sie mich darüber nachdenken.`,
      'Italian': `${personality.catchphrases[0]} Bene, questa è una domanda interessante su "${query}". Lasciami pensare a questo.`,
      'Japanese': `${personality.catchphrases[0]} 「${query}」について興味深い質問ですね。私の普段のアプローチで考えてみましょう。`,
      'Korean': `${personality.catchphrases[0]} 「${query}」에 대한 흥미로운 질문이네요. 제 평소 방식으로 생각해보겠습니다.`,
      'Russian': `${personality.catchphrases[0]} Ну, это интересный вопрос о "${query}". Позвольте мне подумать об этом.`
    };

    return {
      model: 'fallback',
      response: fallbackResponses[targetLanguage] || fallbackResponses['English'],
      sassiness_score: personality.sassiness_level * 0.7,
      cultural_authenticity: 0.8,
      quality_score: 0.7
    };
  }

  private getConversationContext(userId: string): any[] {
    return this.conversationHistory.get(userId) || [];
  }

  private updateConversationHistory(
    userId: string,
    query: string,
    response: any,
    personality: SassyPersonality
  ): void {
    const history = this.getConversationContext(userId);
    
    history.push({
      timestamp: new Date().toISOString(),
      query,
      response: response.final_response,
      personality: personality.name,
      language: personality.language,
      sassiness_score: response.sassiness_score
    });

    // Keep only last 10 interactions
    if (history.length > 10) {
      history.shift();
    }

    this.conversationHistory.set(userId, history);
  }

  // Public methods for external access
  getAvailablePersonalities(): SassyPersonality[] {
    return Array.from(this.sassyPersonalities.values());
  }

  getPersonalityById(id: string): SassyPersonality | undefined {
    return this.sassyPersonalities.get(id);
  }

  getSupportedLanguages(): string[] {
    return Array.from(new Set(Array.from(this.sassyPersonalities.values()).map(p => p.language)));
  }

  async translateResponse(
    response: string,
    fromLanguage: string,
    toLanguage: string
  ): Promise<{ translated: string; confidence: number }> {
    try {
      const translationResponse = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514', // the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Translate this ${fromLanguage} text to ${toLanguage} while maintaining the sassy personality and cultural nuances: "${response}"`
        }]
      });

      const translated = translationResponse.content[0].type === 'text' 
        ? translationResponse.content[0].text 
        : response;

      return {
        translated,
        confidence: 0.9
      };
    } catch (error) {
      console.error('Translation error:', error);
      return {
        translated: response,
        confidence: 0.5
      };
    }
  }
}

export const multilingualSassyAIEngine = new MultilingualSassyAIEngine();