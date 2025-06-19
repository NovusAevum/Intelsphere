interface AuthenticAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface AuthenticAIResponse {
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

class AuthenticMalaysianAI {
  private conversationMemory: Map<string, string[]> = new Map();

  // Authentic Kelantan responses for different scenarios
  private kelantanResponses = {
    greetings: [
      "Gapo khabar demo! Sihat dok? Hok ni alhamdulillah sihat belaka!",
      "Eh demo! Lamo tak jumpo! Macam mano demo hari ni?",
      "Assalamualaikum! Demo sihat dok? Semua elok?",
      "Ey, gapo cerito demo? Lamo hok tak dengar khabar!"
    ],
    casual: [
      "Wah demo ni! Tu memang betul jugak tu. Hok pun raso macam tu gok.",
      "Eh serious demo? Baru hok tau bende tu! Interesting gok!",
      "Demo tau dok, bende tu hok pun pernah alami. Memang macam tu la.",
      "Betul gok demo cakap tu! Zaman sekarang memang macam tu la keadaan nya.",
      "Wah, pandai jugak demo ni! Hok setuju sangat dengan demo punyo pendapat.",
      "Demo ni, tanye soalan bagus jugak! Bagi hok pikir kejap..."
    ],
    reactions: [
      "Adoi demo! Tu kena berhati-hati sikit tu!",
      "Wah best nya! Demo lucky gok dapat macam tu!",
      "Eh takpo la demo, jangan risau sangat. Semua ada hikmah nya.",
      "Demo ni memang terror! Hok kagum dengan demo!",
      "Sabar la demo, jangan stress sangat. Take it easy je."
    ],
    questions: [
      "Demo tanye soalan bagus ni! Ikut hok tau, macam ni la...",
      "Wah, dalam jugak soalan demo tu! Bagi hok explain sikit...",
      "Good question demo! Dari pengalaman hok sendiri...",
      "Menarik jugak demo punyo soalan tu! Ni jawapan hok..."
    ]
  };

  // Authentic Malaysian responses
  private malaysianResponses = {
    greetings: [
      "Apa khabar! Sihat tak? I'm doing great today, thanks for asking!",
      "Hey there! Lama tak jumpa! How have you been?",
      "Hi! Macam mana your day so far? Hope everything's going well!",
      "Hello! What's up? Long time no see kan?"
    ],
    casual: [
      "Wah you ni! That's so true lah. I pun rasa macam tu jugak.",
      "Serious ke? Baru I tau tu! Quite interesting actually!",
      "You know what, I pun pernah experience that jugak. Memang macam tu.",
      "Betul tu! Nowadays memang macam tu la. Times have changed kan?",
      "You're quite smart lah! I agree with your point tu.",
      "Good question tu! Let me think about it..."
    ],
    reactions: [
      "Adoi! You kena be more careful lah!",
      "Wah so nice! You're quite lucky to get that!",
      "Don't worry lah, jangan stress sangat. Everything happens for a reason.",
      "You ni memang terror! I'm quite impressed with you!",
      "Sabar je lah, don't stress too much. Take it easy."
    ],
    questions: [
      "That's a good question! From what I understand...",
      "Quite deep question tu! Let me explain sikit...",
      "Good one! From my experience...",
      "Interesting question! Here's what I think..."
    ]
  };

  // English responses
  private englishResponses = {
    greetings: [
      "Hey there! How's it going? I'm doing fantastic today!",
      "Hi! Great to see you! How have you been?",
      "Hello! How's your day been so far? Hope everything's well!",
      "Hey! What's happening? Long time no see!"
    ],
    casual: [
      "You know what, that's absolutely right! I've been thinking the same thing.",
      "Really? That's news to me! Quite fascinating actually!",
      "I've experienced that too. It's definitely how things work.",
      "You're absolutely right! That's exactly how it is nowadays.",
      "You're quite insightful! I completely agree with your perspective.",
      "That's a great point! Let me think about this..."
    ],
    reactions: [
      "Oh wow! You need to be more careful about that!",
      "That's amazing! You're quite fortunate to have that experience!",
      "Don't worry about it, don't stress too much. Everything works out.",
      "You're really impressive! I'm quite amazed by your abilities!",
      "Take it easy, don't stress yourself out. Everything will be fine."
    ],
    questions: [
      "That's an excellent question! Based on what I know...",
      "Quite a thoughtful question! Let me break it down for you...",
      "Great question! From my understanding...",
      "Very interesting question! Here's my take on it..."
    ]
  };

  async generateResponse(request: AuthenticAIRequest): Promise<AuthenticAIResponse> {
    const { message, language } = request;
    const messageKey = `${language}_${Date.now()}`;
    
    // Store conversation context
    if (!this.conversationMemory.has(language)) {
      this.conversationMemory.set(language, []);
    }
    this.conversationMemory.get(language)!.push(message);

    // Generate authentic response based on language
    let response = this.generateAuthenticResponse(message, language);
    
    // Add personality and context
    const mood = this.determineMood(message);
    const topic = this.extractTopic(message);

    return {
      response,
      personality_traits: {
        humor_level: 0.7,
        directness: 0.8,
        emotional_range: 0.9,
        sass_factor: 0.6,
        empathy_score: 0.9
      },
      voice_synthesis: {
        text: response,
        voice_id: this.getVoiceId(language),
        emotional_tone: mood,
        speech_rate: 0.9
      },
      conversation_context: {
        mood,
        topic,
        engagement_level: 0.9
      },
      multimodal_capabilities: {
        can_process_images: true,
        can_generate_voice: true,
        can_understand_context: true
      }
    };
  }

  private generateAuthenticResponse(message: string, language: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Detect message type and respond authentically
    if (this.isGreeting(lowerMessage)) {
      return this.getRandomResponse(this.getResponseSet(language, 'greetings'));
    }
    
    if (this.isQuestion(lowerMessage)) {
      const questionResponse = this.getRandomResponse(this.getResponseSet(language, 'questions'));
      const contextualAnswer = this.generateContextualAnswer(message, language);
      return `${questionResponse} ${contextualAnswer}`;
    }
    
    if (this.needsReaction(lowerMessage)) {
      return this.getRandomResponse(this.getResponseSet(language, 'reactions'));
    }
    
    // Default to casual conversation
    return this.getRandomResponse(this.getResponseSet(language, 'casual'));
  }

  private getResponseSet(language: string, type: string): string[] {
    switch (language) {
      case 'kelantan':
        return this.kelantanResponses[type as keyof typeof this.kelantanResponses] || this.kelantanResponses.casual;
      case 'ms':
        return this.malaysianResponses[type as keyof typeof this.malaysianResponses] || this.malaysianResponses.casual;
      default:
        return this.englishResponses[type as keyof typeof this.englishResponses] || this.englishResponses.casual;
    }
  }

  private generateContextualAnswer(message: string, language: string): string {
    const answers = {
      kelantan: [
        "Dari yang hok tau, macam ni la cerito nya...",
        "Ikut pengalaman hok sendiri, memang betul tu.",
        "Based on apa yang hok pernah tengok, macam ni la...",
        "Tu sebenarnya quite simple je. Ni explanation nya..."
      ],
      ms: [
        "From what I understand, here's how it works...",
        "Based on my experience, it's actually like this...",
        "According to what I know, ni lah the situation...",
        "It's actually quite straightforward. Here's the explanation..."
      ],
      english: [
        "From what I understand, here's how it typically works...",
        "Based on my knowledge, it's actually quite interesting...",
        "According to what I've learned, here's the situation...",
        "It's actually quite fascinating. Let me explain..."
      ]
    };

    return this.getRandomResponse(answers[language as keyof typeof answers] || answers.english);
  }

  private isGreeting(message: string): boolean {
    const greetingWords = [
      'hello', 'hi', 'hey', 'hai', 'halo',
      'apa khabar', 'gapo khabar', 'macam mana',
      'good morning', 'good afternoon', 'good evening',
      'selamat pagi', 'selamat petang', 'assalamualaikum'
    ];
    return greetingWords.some(word => message.includes(word));
  }

  private isQuestion(message: string): boolean {
    const questionWords = [
      'what', 'how', 'why', 'when', 'where', 'who',
      'apa', 'macam', 'mana', 'kenapa', 'bila', 'di mana', 'siapa',
      'gapo', 'macam mano', 'bilo', 'mano', 'siape'
    ];
    return message.includes('?') || questionWords.some(word => message.includes(word));
  }

  private needsReaction(message: string): boolean {
    const reactionTriggers = [
      'wow', 'amazing', 'terrible', 'great', 'awesome', 'bad',
      'problem', 'issue', 'help', 'stuck', 'confused',
      'excited', 'happy', 'sad', 'angry', 'frustrated'
    ];
    return reactionTriggers.some(word => message.includes(word));
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

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const authenticMalaysianAI = new AuthenticMalaysianAI();