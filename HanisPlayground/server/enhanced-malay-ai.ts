import { Request, Response } from 'express';

interface MalayAIRequest {
  message: string;
  dialect: 'kelantan' | 'standard' | 'terengganu' | 'kedah';
  assertiveness: number; // 1-10
  context: string;
}

interface MalayAIResponse {
  response: string;
  original_dialect: string;
  standard_translation: string;
  dialect_analysis: {
    authenticity_score: number;
    dialect_markers: string[];
    cultural_references: string[];
    assertiveness_indicators: string[];
  };
  voice_synthesis: {
    pronunciation_guide: string[];
    accent_markers: string[];
    rhythm_patterns: string[];
    emotional_inflections: string[];
  };
}

export class EnhancedMalayAI {
  private kelantaneseExpressions: Map<string, string> = new Map();
  private standardTranslations: Map<string, string> = new Map();
  private culturalContext: Map<string, any> = new Map();

  constructor() {
    this.initializeKelantaneseDatabase();
    this.initializeCulturalContext();
  }

  private initializeKelantaneseDatabase() {
    // Core Kelantanese expressions with proper pronunciation
    const expressions = [
      // Greetings and Basic
      ['apa khabar', 'gapo khabar', 'What news/How are you'],
      ['sihat', 'sihat', 'Healthy/well'],
      ['terima kasih', 'terimo kasih', 'Thank you'],
      ['sama-sama', 'semo-semo', 'You\'re welcome'],
      
      // Common Questions
      ['apa', 'gapo', 'What'],
      ['kenapa', 'bakpe', 'Why'],
      ['bila', 'bilo', 'When'],
      ['mana', 'mano', 'Where'],
      ['macam mana', 'gano', 'How'],
      
      // Pronouns
      ['saya', 'aku', 'I/me'],
      ['awak/anda', 'demo', 'You'],
      ['dia', 'dio', 'He/she'],
      ['kita', 'kito', 'We (inclusive)'],
      ['kami', 'kami', 'We (exclusive)'],
      
      // Assertive Expressions
      ['betul', 'betul', 'Correct/right'],
      ['salah', 'saloh', 'Wrong/mistake'],
      ['bagus', 'baguh', 'Good'],
      ['teruk', 'teruk', 'Bad/terrible'],
      ['bodoh', 'bodoh', 'Stupid'],
      ['pandai', 'pandai', 'Smart/clever'],
      
      // Kelantanese Specific
      ['tidak baik', 'toksey', 'Not good/useless'],
      ['degil', 'kejung', 'Stubborn'],
      ['bagitahu', 'habaq mai', 'Tell me'],
      ['macam tu', 'ghoyanyo', 'Like that'],
      ['boleh tahan', 'buleh tahan', 'Can endure/quite something'],
      
      // Emotional Expressions
      ['marah', 'geram', 'Angry'],
      ['gembira', 'suke', 'Happy'],
      ['sedih', 'sedey', 'Sad'],
      ['takut', 'takut', 'Afraid'],
      ['malu', 'malu', 'Embarrassed'],
      
      // Action Words
      ['pergi', 'gi', 'Go'],
      ['datang', 'mari/demo', 'Come'],
      ['makan', 'makan', 'Eat'],
      ['minum', 'minum', 'Drink'],
      ['tidur', 'tidoq', 'Sleep'],
      ['bangun', 'bangung', 'Wake up'],
      
      // Time Expressions
      ['sekarang', 'ning ni', 'Now'],
      ['tadi', 'tadik', 'Just now'],
      ['nanti', 'lagi', 'Later'],
      ['semalam', 'malam tadik', 'Yesterday'],
      ['esok', 'esok', 'Tomorrow']
    ];

    expressions.forEach(([standard, kelantan, english]) => {
      this.kelantaneseExpressions.set(standard, kelantan);
      this.standardTranslations.set(kelantan, standard);
    });
  }

  private initializeCulturalContext() {
    this.culturalContext.set('food', [
      'nasi kerabu', 'ayam percik', 'laksam', 'solok lada', 'budu'
    ]);
    
    this.culturalContext.set('places', [
      'Kota Bharu', 'Tumpat', 'Pasir Mas', 'Bachok', 'Kuala Krai'
    ]);
    
    this.culturalContext.set('customs', [
      'main wau', 'rebana ubi', 'wayang kulit', 'silat', 'dikir barat'
    ]);
    
    this.culturalContext.set('assertive_phrases', [
      'Demo ni gapo keje?', 'Toksey demo ni!', 'Kejung betul!', 
      'Bakpe demo buat gitu?', 'Habaq mai betul-betul!', 'Ghoyanyo lah!'
    ]);
  }

  async processRequest(request: MalayAIRequest): Promise<MalayAIResponse> {
    const dialectResponse = await this.generateDialectResponse(request);
    const voiceSynthesis = this.generateVoiceSynthesis(dialectResponse, request.dialect);
    const dialectAnalysis = this.analyzeDialect(dialectResponse);
    
    return {
      response: dialectResponse,
      original_dialect: dialectResponse,
      standard_translation: this.translateToStandard(dialectResponse),
      dialect_analysis: dialectAnalysis,
      voice_synthesis: voiceSynthesis
    };
  }

  private async generateDialectResponse(request: MalayAIRequest): Promise<string> {
    const { message, dialect, assertiveness, context } = request;
    
    // Analyze user message for cultural context
    const culturalElements = this.detectCulturalElements(message);
    
    // Generate base response based on assertiveness level
    let response = '';
    
    if (assertiveness >= 8) {
      // High assertiveness - direct and confrontational
      response = this.generateHighAssertiveResponse(message, dialect, culturalElements);
    } else if (assertiveness >= 5) {
      // Medium assertiveness - firm but polite
      response = this.generateMediumAssertiveResponse(message, dialect, culturalElements);
    } else {
      // Low assertiveness - gentle and respectful
      response = this.generateLowAssertiveResponse(message, dialect, culturalElements);
    }
    
    return this.convertToDialect(response, dialect);
  }

  private generateHighAssertiveResponse(message: string, dialect: string, cultural: any): string {
    const assertivePhrases = this.culturalContext.get('assertive_phrases') || [];
    const randomPhrase = assertivePhrases[Math.floor(Math.random() * assertivePhrases.length)];
    
    if (message.toLowerCase().includes('apa khabar') || message.toLowerCase().includes('gapo khabar')) {
      return `Gapo khabar? Aku sihat je. ${randomPhrase} Demo ni nok tanyo gapo pulok?`;
    }
    
    if (message.toLowerCase().includes('macam mana') || message.toLowerCase().includes('gano')) {
      return `Gano? Senang je! ${randomPhrase} Demo ni takdok pikir ke? Habaq mai betul-betul apa demo nok tau!`;
    }
    
    if (message.toLowerCase().includes('tolong') || message.toLowerCase().includes('help')) {
      return `Nok tolong? Buleh, tapi demo kena habaq betul-betul gapo masaloh demo. Toksey demo menggedek kat sini!`;
    }
    
    return `${randomPhrase} Aku faham gapo demo nok, tapi demo kena terang betul-betul. Jange dok menggedek!`;
  }

  private generateMediumAssertiveResponse(message: string, dialect: string, cultural: any): string {
    if (message.toLowerCase().includes('apa khabar') || message.toLowerCase().includes('gapo khabar')) {
      return `Gapo khabar demo? Aku sihat, alhamdulillah. Demo gano? Ada gapo keje ke?`;
    }
    
    if (message.toLowerCase().includes('macam mana') || message.toLowerCase().includes('gano')) {
      return `Gano eh? Demo tanyo pasal gapo ni? Habaq mai, aku buleh bantu insyaAllah.`;
    }
    
    if (message.toLowerCase().includes('tolong') || message.toLowerCase().includes('help')) {
      return `Buleh je aku tolong demo. Habaq mai betul-betul gapo masaloh demo tu.`;
    }
    
    return `Baiklah, aku faham gapo demo maksud. Ni cara nok buat - habaq mai dulu gapo demo nok sangat.`;
  }

  private generateLowAssertiveResponse(message: string, dialect: string, cultural: any): string {
    if (message.toLowerCase().includes('apa khabar') || message.toLowerCase().includes('gapo khabar')) {
      return `Gapo khabar demo? Alhamdulillah, aku sihat. Semoga demo pun sihat selalu.`;
    }
    
    if (message.toLowerCase().includes('macam mana') || message.toLowerCase().includes('gano')) {
      return `Gano ye? InsyaAllah aku buleh bantu demo. Habaq je gapo yang demo nok tau.`;
    }
    
    if (message.toLowerCase().includes('tolong') || message.toLowerCase().includes('help')) {
      return `Buleh, insyaAllah aku tolong demo. Habaq je gapo masaloh demo, kito try selesai sekali.`;
    }
    
    return `Baiklah demo, aku dengar gapo demo cakap. InsyaAllah aku try bantu demo sebait-bait.`;
  }

  private convertToDialect(text: string, dialect: string): string {
    if (dialect !== 'kelantan') return text;
    
    let converted = text;
    
    // Apply Kelantanese phonetic changes
    this.kelantaneseExpressions.forEach((kelantanese, standard) => {
      const regex = new RegExp(`\\b${standard}\\b`, 'gi');
      converted = converted.replace(regex, kelantanese);
    });
    
    // Apply common sound changes
    converted = converted
      .replace(/er([aeiou])/g, 'e$1')  // 'era' -> 'ea'
      .replace(/ai$/g, 'ey')          // 'pandai' -> 'pandey'
      .replace(/au/g, 'o')            // 'atau' -> 'ato'
      .replace(/ong$/g, 'ung')        // 'tolong' -> 'tollung'
      .replace(/ah$/g, 'oh');         // 'rumah' -> 'rumoh'
    
    return converted;
  }

  private translateToStandard(kelantaneseText: string): string {
    let translated = kelantaneseText;
    
    this.standardTranslations.forEach((standard, kelantanese) => {
      const regex = new RegExp(`\\b${kelantanese}\\b`, 'gi');
      translated = translated.replace(regex, standard);
    });
    
    // Reverse phonetic changes
    translated = translated
      .replace(/ey$/g, 'ai')
      .replace(/o(?=ng)/g, 'au')
      .replace(/oh$/g, 'ah')
      .replace(/ung$/g, 'ong');
    
    return translated;
  }

  private detectCulturalElements(message: string): any {
    const cultural = {
      food_references: [],
      place_references: [],
      custom_references: []
    };
    
    const foods = this.culturalContext.get('food') || [];
    const places = this.culturalContext.get('places') || [];
    const customs = this.culturalContext.get('customs') || [];
    
    foods.forEach(food => {
      if (message.toLowerCase().includes(food)) {
        cultural.food_references.push(food);
      }
    });
    
    places.forEach(place => {
      if (message.toLowerCase().includes(place.toLowerCase())) {
        cultural.place_references.push(place);
      }
    });
    
    customs.forEach(custom => {
      if (message.toLowerCase().includes(custom)) {
        cultural.custom_references.push(custom);
      }
    });
    
    return cultural;
  }

  private analyzeDialect(text: string): any {
    const kelantaneseMarkers = ['demo', 'gapo', 'gano', 'bakpe', 'ghoyanyo', 'toksey', 'kejung'];
    const foundMarkers = kelantaneseMarkers.filter(marker => 
      text.toLowerCase().includes(marker)
    );
    
    const authenticity = Math.min(100, (foundMarkers.length / kelantaneseMarkers.length) * 100 + 20);
    
    return {
      authenticity_score: authenticity / 100,
      dialect_markers: foundMarkers,
      cultural_references: this.extractCulturalReferences(text),
      assertiveness_indicators: this.extractAssertivenessMarkers(text)
    };
  }

  private generateVoiceSynthesis(text: string, dialect: string): any {
    return {
      pronunciation_guide: [
        'kelantanese_r_rolling',
        'soft_consonants', 
        'nasal_vowels',
        'tonal_variations'
      ],
      accent_markers: [
        'east_coast_intonation',
        'kelantanese_rhythm',
        'cultural_emphasis'
      ],
      rhythm_patterns: [
        'relaxed_pace',
        'natural_pauses',
        'cultural_timing'
      ],
      emotional_inflections: [
        'confident_assertion',
        'cultural_pride',
        'direct_communication'
      ]
    };
  }

  private extractCulturalReferences(text: string): string[] {
    const references = [];
    const allCultural = [
      ...this.culturalContext.get('food') || [],
      ...this.culturalContext.get('places') || [],
      ...this.culturalContext.get('customs') || []
    ];
    
    allCultural.forEach(item => {
      if (text.toLowerCase().includes(item.toLowerCase())) {
        references.push(item);
      }
    });
    
    return references;
  }

  private extractAssertivenessMarkers(text: string): string[] {
    const markers = ['demo ni', 'toksey', 'kejung', 'bakpe', 'habaq mai', 'ghoyanyo'];
    return markers.filter(marker => text.toLowerCase().includes(marker));
  }

  // Test specific Kelantanese phrases and responses
  async testKelantaneseResponses(): Promise<any> {
    const testCases = [
      {
        input: "Gapo khabar? Gano demo hari ni?",
        expected_response: "High authenticity Kelantanese response"
      },
      {
        input: "Bakpe demo buat gitu? Toksey betul!",
        expected_response: "Assertive confrontational response"
      },
      {
        input: "Aku nok gi Kota Bharu, buleh ke?",
        expected_response: "Cultural context aware response"
      }
    ];
    
    const results = [];
    
    for (const testCase of testCases) {
      const response = await this.processRequest({
        message: testCase.input,
        dialect: 'kelantan',
        assertiveness: 8,
        context: 'casual'
      });
      
      results.push({
        input: testCase.input,
        output: response.response,
        authenticity: response.dialect_analysis.authenticity_score,
        markers: response.dialect_analysis.dialect_markers
      });
    }
    
    return {
      test_results: results,
      overall_performance: {
        average_authenticity: results.reduce((sum, r) => sum + r.authenticity, 0) / results.length,
        dialect_coverage: results.flatMap(r => r.markers).length,
        system_status: 'operational'
      }
    };
  }
}

export const enhancedMalayAI = new EnhancedMalayAI();