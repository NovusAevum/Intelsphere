interface LocalAIRequest {
  message: string;
  personality: string;
  language: string;
  voiceEnabled: boolean;
  context?: string;
}

interface LocalAIResponse {
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

class EnhancedLocalAI {
  private malayResponses: Record<string, Record<string, string[]>> = {
    greeting: {
      'ms': [
        "Apa khabar! Sihat tak? I'm doing great today, alhamdulillah!",
        "Hai! Apa yang boleh I tolong hari ni? Anything you nak tanya?",
        "Hello there! Macam mana your day so far? Hope semua okay je!",
        "Ey, what's up! Lama tak jumpa... well, virtually lah kan!"
      ],
      'kelantan': [
        "Gapo khabar! Demo sihat dok? Hok ni alhamdulillah sihat belaka!",
        "Eh demo! Gapo yang buleh hok tubik tolong hari ni?",
        "Salam! Macam mano demo hari ni? Moga-moga elok belaka!",
        "Ey, gapo cerito? Lamo tak jumpo... virtually la dok kan!"
      ],
      'english': [
        "Hey there! How's it going? I'm doing fantastic today!",
        "Hi! What can I help you with today? Anything on your mind?",
        "Hello! How's your day been so far? Hope everything's going well!",
        "Hey! What's happening? Long time no see... virtually speaking!"
      ]
    },
    questions: {
      'ms': [
        "Wah, that's a really good question! Let me think about it properly...",
        "Interesting question tu! Based on what I know, here's what I think...",
        "Bagus punya question! From my understanding, ni lah jawapannya...",
        "Good one! I've been thinking about this myself actually..."
      ],
      'kelantan': [
        "Wah, soklan tu bagus tul! Bagi hok pikir dulu...",
        "Menarik soklan demo tu! Ikut yang hok tau, ni lah jawapannya...",
        "Bagus gak soklan demo! Dari yang hok faham, macam ni lah...",
        "Elok jugak tu! Hok ni pun pernah pikir pasal bende ni..."
      ],
      'english': [
        "That's a really thoughtful question! Let me break it down for you...",
        "Great question! From what I understand, here's my take...",
        "Interesting point! I've actually given this some thought before...",
        "Good question! Based on my knowledge, here's what I think..."
      ]
    },
    thanks: {
      'ms': [
        "You're most welcome! Anytime you need help, just holler okay!",
        "No problem at all! That's what friends are for kan?",
        "My pleasure! Always happy to help whenever you need!",
        "Don't mention it! Feel free to ask anything else!"
      ],
      'kelantan': [
        "Demo welcome sangat! Bilo-bilo demo perlukan tolong, bagitau je!",
        "Takpo punyo! Kawan untuk tolong-menolong kan?",
        "Senang hati hok tubik tolong! Anytime demo perlukan je!",
        "Takpo la! Demo raso nak tanye gapo lagi pun buleh!"
      ],
      'english': [
        "You're absolutely welcome! Feel free to ask me anything anytime!",
        "No worries at all! That's what I'm here for!",
        "My pleasure! Always happy to help however I can!",
        "Don't mention it! Ask me anything else you'd like to know!"
      ]
    },
    help: {
      'ms': [
        "Sure! I can help with lots of things - dari simple questions sampai complex analysis!",
        "Of course! Whether it's research, analysis, atau just casual chat, I'm here!",
        "Absolutely! I'm good with information, problem-solving, creative stuff... you name it!",
        "Definitely! From technical questions to daily life advice, just let me know!"
      ],
      'kelantan': [
        "Buleh je! Hok buleh tolong macam-macam - dari soklan senang sampai analisis susah!",
        "Mesti buleh! Samo ado research, analisis, ke borak-borak biaso, hok ado!",
        "Konfom buleh! Hok pandai dengan maklumat, selesai masalah, bende kreatif... gapo pun!",
        "Mesti la! Dari soklan teknikal sampai nasihat hidup, bagitau je!"
      ],
      'english': [
        "Absolutely! I can help with research, analysis, creative projects, and much more!",
        "Of course! Whether it's technical questions or casual conversation, I'm here!",
        "Definitely! I'm good with information, problem-solving, brainstorming... whatever you need!",
        "Sure thing! From complex analysis to simple daily questions, just ask away!"
      ]
    }
  };

  private personalityTraits: Record<string, {
    humor_level: number;
    directness: number;
    emotional_range: number;
    sass_factor: number;
    empathy_score: number;
  }> = {
    'hanis-authentic': {
      humor_level: 0.8,
      directness: 0.7,
      emotional_range: 0.85,
      sass_factor: 0.6,
      empathy_score: 0.9
    },
    'alex': {
      humor_level: 0.9,
      directness: 0.8,
      emotional_range: 0.7,
      sass_factor: 0.8,
      empathy_score: 0.7
    },
    'maya': {
      humor_level: 0.5,
      directness: 0.9,
      emotional_range: 0.6,
      sass_factor: 0.3,
      empathy_score: 0.9
    },
    'jordan': {
      humor_level: 0.7,
      directness: 0.6,
      emotional_range: 0.8,
      sass_factor: 0.5,
      empathy_score: 0.8
    }
  };

  async generateResponse(request: LocalAIRequest): Promise<LocalAIResponse> {
    const message = request.message.toLowerCase();
    const language = request.language === 'auto' ? this.detectLanguage(message) : request.language;
    
    let response = this.generateContextualResponse(message, language);
    let mood = this.analyzeMood(message);
    let topic = this.extractTopic(message);
    
    const personality = this.personalityTraits[request.personality] || this.personalityTraits['hanis-authentic'];

    return {
      response,
      personality_traits: personality,
      voice_synthesis: {
        text: response,
        voice_id: this.getVoiceId(request.personality),
        emotional_tone: mood,
        speech_rate: 1.0
      },
      conversation_context: {
        mood,
        topic,
        engagement_level: 0.85
      },
      multimodal_capabilities: {
        can_process_images: true,
        can_generate_voice: true,
        can_understand_context: true
      }
    };
  }

  private detectLanguage(message: string): string {
    const kelantanWords = ['gapo', 'demo', 'hok', 'dok', 'tubik', 'buleh', 'tanye', 'khabar'];
    const malayWords = ['apa', 'macam', 'mana', 'boleh', 'saya', 'awak', 'kamu', 'tak', 'tidak'];
    
    if (kelantanWords.some(word => message.includes(word))) {
      return 'kelantan';
    }
    if (malayWords.some(word => message.includes(word))) {
      return 'ms';
    }
    return 'english';
  }

  private generateContextualResponse(message: string, language: string): string {
    // Greeting patterns
    if (this.isGreeting(message)) {
      return this.getRandomResponse(this.malayResponses.greeting[language]);
    }
    
    // Thank you patterns
    if (this.isThanking(message)) {
      return this.getRandomResponse(this.malayResponses.thanks[language]);
    }
    
    // Help/assistance patterns
    if (this.isAskingForHelp(message)) {
      return this.getRandomResponse(this.malayResponses.help[language]);
    }
    
    // Question patterns
    if (this.isQuestion(message)) {
      return this.getRandomResponse(this.malayResponses.questions[language]) + " " + this.generateTopicSpecificResponse(message, language);
    }
    
    // Default conversational response
    return this.generateConversationalResponse(message, language);
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'hallo', 'hai', 'apa khabar', 'gapo khabar', 'good morning', 'good afternoon', 'selamat'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isThanking(message: string): boolean {
    const thanks = ['thank', 'thanks', 'terima kasih', 'tq', 'appreciate', 'grateful'];
    return thanks.some(thank => message.includes(thank));
  }

  private isAskingForHelp(message: string): boolean {
    const helpWords = ['help', 'tolong', 'assist', 'support', 'can you', 'boleh', 'buleh'];
    return helpWords.some(word => message.includes(word));
  }

  private isQuestion(message: string): boolean {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'apa', 'macam', 'mana', 'bila', 'di mana', 'siapa', 'kenapa', 'gapo', 'bilo', 'mano'];
    return message.includes('?') || questionWords.some(word => message.includes(word));
  }

  private generateTopicSpecificResponse(message: string, language: string): string {
    const responses: Record<string, string> = {
      'ms': "Ni based on what I understand and my experience lah. Hope it helps!",
      'kelantan': "Ni ikut yang hok faham dan pengalaman hok lah. Moga-moga membantu!",
      'english': "This is based on my understanding and experience. Hope this helps!"
    };
    return responses[language] || responses['english'];
  }

  private generateConversationalResponse(message: string, language: string): string {
    const responses: Record<string, string[]> = {
      'ms': [
        "That's interesting! Tell me more about it.",
        "I see what you mean. What do you think about that?",
        "Hmm, that's a good point. How do you feel about it?",
        "Interesting perspective! I'd love to hear more."
      ],
      'kelantan': [
        "Menarik tu! Cerito lagi sikit.",
        "Hok faham gapo demo maksudkan. Demo pikir macam mano?",
        "Hmm, betul jugak tu. Demo raso macam mano?",
        "Pandangan yang menarik! Hok nak dengar lagi."
      ],
      'english': [
        "That's really interesting! I'd love to know more about your thoughts on this.",
        "I see what you're getting at. What's your take on the situation?",
        "That's a fascinating point. How do you see it playing out?",
        "Interesting perspective! I'm curious to hear more about your experience."
      ]
    };
    return this.getRandomResponse(responses[language] || responses['english']);
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private analyzeMood(message: string): string {
    if (message.includes('!') || message.includes('excited') || message.includes('great')) return 'excited';
    if (message.includes('help') || message.includes('problem') || message.includes('issue')) return 'helpful';
    if (message.includes('thank') || message.includes('appreciate')) return 'grateful';
    return 'friendly';
  }

  private extractTopic(message: string): string {
    if (message.includes('work') || message.includes('kerja') || message.includes('business')) return 'work';
    if (message.includes('tech') || message.includes('computer') || message.includes('teknologi')) return 'technology';
    if (message.includes('food') || message.includes('makan') || message.includes('makanan')) return 'food';
    if (message.includes('travel') || message.includes('jalan') || message.includes('pergi')) return 'travel';
    return 'general';
  }

  private getVoiceId(personality: string): string {
    const voiceMap: Record<string, string> = {
      'hanis-authentic': 'female-warm',
      'alex': 'male-casual',
      'maya': 'female-professional',
      'jordan': 'male-creative'
    };
    return voiceMap[personality] || 'female-warm';
  }
}

export const enhancedLocalAI = new EnhancedLocalAI();