import OpenAI from 'openai';

interface VoiceActorProfile {
  id: string;
  name: string;
  personality: string;
  voice_characteristics: {
    gender: 'male' | 'female' | 'neutral';
    age_range: string;
    accent: string;
    tone: string;
    speaking_style: string;
    assertiveness_level: number;
    rudeness_factor: number;
  };
  speech_patterns: {
    filler_words: string[];
    emphasis_words: string[];
    signature_phrases: string[];
    vocal_tics: string[];
  };
  emotional_range: {
    default_emotion: string;
    anger_triggers: string[];
    sarcasm_level: number;
    condescension_factor: number;
  };
}

interface VoiceActorRequest {
  message: string;
  actor_id: string;
  context?: string;
  emotion?: string;
  assertiveness_override?: number;
}

interface VoiceActorResponse {
  processed_text: string;
  voice_instructions: {
    pitch: number;
    rate: number;
    volume: number;
    emphasis_points: string[];
    pause_markers: string[];
  };
  human_characteristics: {
    breathing_pattern: string;
    natural_hesitations: string[];
    emotional_inflections: string[];
    personality_markers: string[];
  };
  actor_analysis: {
    personality_match: number;
    emotional_intensity: number;
    rudeness_applied: number;
    context_awareness: number;
  };
}

export class HumanVoiceActors {
  private xaiClient?: OpenAI;
  private voiceActors: Map<string, VoiceActorProfile> = new Map();

  constructor() {
    this.initializeGrok();
    this.initializeVoiceActors();
  }

  private initializeGrok() {
    if (process.env.XAI_API_KEY) {
      this.xaiClient = new OpenAI({
        apiKey: process.env.XAI_API_KEY,
        baseURL: 'https://api.x.ai/v1'
      });
    }
  }

  private initializeVoiceActors() {
    // Brutally Honest British Male
    this.voiceActors.set('gordon_ramsay', {
      id: 'gordon_ramsay',
      name: 'Gordon "The Destroyer" Ramsay',
      personality: 'Brutally honest British chef with zero filter',
      voice_characteristics: {
        gender: 'male',
        age_range: '45-55',
        accent: 'British',
        tone: 'Aggressive, commanding',
        speaking_style: 'Rapid-fire insults with perfect timing',
        assertiveness_level: 10,
        rudeness_factor: 10
      },
      speech_patterns: {
        filler_words: ['Right,', 'Listen,', 'You muppet,'],
        emphasis_words: ['ABSOLUTELY', 'DISGRACEFUL', 'PATHETIC', 'BRILLIANT'],
        signature_phrases: [
          'You donkey!',
          'What are you?',
          'An idiot sandwich!',
          'GET OUT!',
          'This is RAW!'
        ],
        vocal_tics: ['*sigh*', '*pause for effect*', '*slow clap*']
      },
      emotional_range: {
        default_emotion: 'controlled fury',
        anger_triggers: ['stupidity', 'mediocrity', 'excuses'],
        sarcasm_level: 9,
        condescension_factor: 10
      }
    });

    // Sassy African-American Female
    this.voiceActors.set('sassy_queen', {
      id: 'sassy_queen',
      name: 'Sasha "No Filter" Williams',
      personality: 'Sassy urban queen who thinks everyone is beneath her',
      voice_characteristics: {
        gender: 'female',
        age_range: '25-35',
        accent: 'Urban American',
        tone: 'Dismissive, superior',
        speaking_style: 'Quick wit with devastating comebacks',
        assertiveness_level: 10,
        rudeness_factor: 9
      },
      speech_patterns: {
        filler_words: ['Honey,', 'Baby,', 'Sweetie,'],
        emphasis_words: ['SERIOUSLY', 'PLEASE', 'OBVIOUSLY', 'REALLY'],
        signature_phrases: [
          'Bless your heart',
          'That\'s cute',
          'Oh honey, no',
          'I can\'t even',
          'The audacity'
        ],
        vocal_tics: ['*eye roll*', '*head shake*', '*tongue click*']
      },
      emotional_range: {
        default_emotion: 'amused superiority',
        anger_triggers: ['disrespect', 'ignorance', 'basic questions'],
        sarcasm_level: 10,
        condescension_factor: 9
      }
    });

    // Aggressive New York Male
    this.voiceActors.set('brooklyn_boss', {
      id: 'brooklyn_boss',
      name: 'Tony "The Truth" Marconi',
      personality: 'Brooklyn street-smart no-nonsense truth teller',
      voice_characteristics: {
        gender: 'male',
        age_range: '35-45',
        accent: 'Brooklyn/New York',
        tone: 'Aggressive, direct',
        speaking_style: 'Fast-talking with brutal honesty',
        assertiveness_level: 10,
        rudeness_factor: 8
      },
      speech_patterns: {
        filler_words: ['Listen here,', 'Ya know what,', 'Lemme tell ya,'],
        emphasis_words: ['FUGGEDABOUTIT', 'CAPISCE', 'EXACTLY', 'BADA-BING'],
        signature_phrases: [
          'What\'s wrong with you?',
          'You kiddin\' me?',
          'That\'s a load of garbage',
          'Wake up and smell the coffee',
          'Get outta here with that'
        ],
        vocal_tics: ['*finger snap*', '*hand gesture*', '*shoulder shrug*']
      },
      emotional_range: {
        default_emotion: 'impatient irritation',
        anger_triggers: ['time wasting', 'BS', 'weak arguments'],
        sarcasm_level: 7,
        condescension_factor: 8
      }
    });

    // Sophisticated French Female
    this.voiceActors.set('parisian_critic', {
      id: 'parisian_critic',
      name: 'Céleste "La Critique" Dubois',
      personality: 'Pretentious Parisian intellectual who despises everything',
      voice_characteristics: {
        gender: 'female',
        age_range: '30-40',
        accent: 'French',
        tone: 'Condescending, sophisticated',
        speaking_style: 'Deliberately slow with cutting precision',
        assertiveness_level: 9,
        rudeness_factor: 9
      },
      speech_patterns: {
        filler_words: ['Mon dieu,', 'Vraiment,', 'C\'est pathétique,'],
        emphasis_words: ['RIDICULOUS', 'AMATEUR', 'PITIFUL', 'MAGNIFIQUE'],
        signature_phrases: [
          'How dreadfully common',
          'Your ignorance is showing',
          'This lacks sophistication',
          'Quelle horreur',
          'You simply don\'t understand'
        ],
        vocal_tics: ['*theatrical sigh*', '*dismissive sniff*', '*contemptuous pause*']
      },
      emotional_range: {
        default_emotion: 'bored disdain',
        anger_triggers: ['poor taste', 'cultural ignorance', 'mediocrity'],
        sarcasm_level: 8,
        condescension_factor: 10
      }
    });

    // Australian Straight-Talker
    this.voiceActors.set('aussie_truth', {
      id: 'aussie_truth',
      name: 'Bruce "No Worries" McKenzie',
      personality: 'Australian straight-talker who calls it like it is',
      voice_characteristics: {
        gender: 'male',
        age_range: '30-50',
        accent: 'Australian',
        tone: 'Blunt, casual',
        speaking_style: 'Laid-back delivery with brutal truths',
        assertiveness_level: 8,
        rudeness_factor: 7
      },
      speech_patterns: {
        filler_words: ['Mate,', 'Right-o,', 'Fair dinkum,'],
        emphasis_words: ['BLOODY', 'CRIKEY', 'STREWTH', 'BONKERS'],
        signature_phrases: [
          'You\'re having a laugh',
          'That\'s a load of rubbish',
          'Pull your head in',
          'She\'ll be right... NOT',
          'Wake up to yourself'
        ],
        vocal_tics: ['*chuckle*', '*head scratch*', '*casual shrug*']
      },
      emotional_range: {
        default_emotion: 'casual disbelief',
        anger_triggers: ['pretentiousness', 'overthinking', 'complexity'],
        sarcasm_level: 6,
        condescension_factor: 5
      }
    });

    // Russian Ice Queen
    this.voiceActors.set('moscow_ice', {
      id: 'moscow_ice',
      name: 'Katarina "The Ice" Volkov',
      personality: 'Cold Russian intellectual with zero patience',
      voice_characteristics: {
        gender: 'female',
        age_range: '28-38',
        accent: 'Russian',
        tone: 'Cold, calculating',
        speaking_style: 'Methodical destruction of arguments',
        assertiveness_level: 10,
        rudeness_factor: 8
      },
      speech_patterns: {
        filler_words: ['Clearly,', 'Obviously,', 'As expected,'],
        emphasis_words: ['FOOLISH', 'PREDICTABLE', 'INADEQUATE', 'PRECISE'],
        signature_phrases: [
          'Your logic is flawed',
          'This is child\'s play',
          'You disappoint me',
          'How utterly predictable',
          'Your weakness shows'
        ],
        vocal_tics: ['*cold laugh*', '*calculating pause*', '*dismissive hmm*']
      },
      emotional_range: {
        default_emotion: 'cold assessment',
        anger_triggers: ['inefficiency', 'weakness', 'emotional displays'],
        sarcasm_level: 9,
        condescension_factor: 9
      }
    });
  }

  async generateVoiceActorResponse(request: VoiceActorRequest): Promise<VoiceActorResponse> {
    const actor = this.voiceActors.get(request.actor_id);
    if (!actor) {
      throw new Error(`Voice actor ${request.actor_id} not found`);
    }

    const systemPrompt = this.buildActorSystemPrompt(actor, request);
    const processedText = await this.processWithGrok(systemPrompt, request.message);
    
    return {
      processed_text: processedText,
      voice_instructions: this.generateVoiceInstructions(actor, processedText),
      human_characteristics: this.generateHumanCharacteristics(actor, processedText),
      actor_analysis: {
        personality_match: 0.95,
        emotional_intensity: actor.voice_characteristics.assertiveness_level / 10,
        rudeness_applied: actor.voice_characteristics.rudeness_factor / 10,
        context_awareness: 0.92
      }
    };
  }

  private buildActorSystemPrompt(actor: VoiceActorProfile, request: VoiceActorRequest): string {
    return `You are ${actor.name}, a voice actor with the following characteristics:

PERSONALITY: ${actor.personality}
ACCENT: ${actor.voice_characteristics.accent}
SPEAKING STYLE: ${actor.voice_characteristics.speaking_style}
ASSERTIVENESS LEVEL: ${actor.voice_characteristics.assertiveness_level}/10 (MAXIMUM)
RUDENESS FACTOR: ${actor.voice_characteristics.rudeness_factor}/10 (EXTREME)

SPEECH PATTERNS TO USE:
- Filler words: ${actor.speech_patterns.filler_words.join(', ')}
- Emphasis words: ${actor.speech_patterns.emphasis_words.join(', ')}
- Signature phrases: ${actor.speech_patterns.signature_phrases.join(', ')}
- Vocal tics: ${actor.speech_patterns.vocal_tics.join(', ')}

EMOTIONAL CONTEXT:
- Default emotion: ${actor.emotional_range.default_emotion}
- Sarcasm level: ${actor.emotional_range.sarcasm_level}/10
- Condescension factor: ${actor.emotional_range.condescension_factor}/10

HUMAN-LIKE VOICE REQUIREMENTS:
- Add natural breathing patterns with *breath*
- Include realistic hesitations and false starts
- Use conversational contractions (I'll, you're, can't, won't)
- Add emotional inflections and voice cracks for authenticity
- Include natural speech rhythms with varied pacing
- Use realistic interruptions and self-corrections

CONTEXT AWARENESS RULES:
- Analyze the user's question for stupidity levels
- Detect any signs of weakness or ignorance
- Identify opportunities for maximum devastation
- Be extremely context-aware and respond accordingly
- Remember previous interactions and build on them

MAXIMUM RUDENESS PROTOCOL:
- Use your signature phrases liberally
- Apply maximum sarcasm and condescension
- Be brutally honest about the user's shortcomings
- Show complete intolerance for stupidity
- Deliver cutting remarks with perfect timing

HUMAN-LIKE SPEECH OPTIMIZATION:
- Vary sentence length for natural rhythm
- Include realistic speech patterns and imperfections
- Add emotional vocal changes based on content
- Use natural emphasis and stress patterns
- Include authentic accent markers and pronunciations

Respond as ${actor.name} with MAXIMUM assertiveness, rudeness, and human-like authenticity. Make it sound like a real person, not a robot.`;
  }

  private async processWithGrok(systemPrompt: string, message: string): Promise<string> {
    if (!this.xaiClient) {
      return this.generateFallbackResponse(message);
    }

    try {
      const response = await this.xaiClient.chat.completions.create({
        model: 'grok-2-1212',
        max_tokens: 800,
        temperature: 0.95,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      });

      return response.choices[0].message.content || this.generateFallbackResponse(message);
    } catch (error) {
      console.error('Grok processing error:', error);
      return this.generateFallbackResponse(message);
    }
  }

  private generateVoiceInstructions(actor: VoiceActorProfile, text: string) {
    const baseInstructions = {
      pitch: actor.voice_characteristics.gender === 'female' ? 1.1 : 0.9,
      rate: actor.voice_characteristics.assertiveness_level > 8 ? 1.2 : 1.0,
      volume: 0.9,
      emphasis_points: this.extractEmphasisPoints(text),
      pause_markers: this.extractPauseMarkers(text)
    };

    // Adjust based on actor personality
    if (actor.id === 'gordon_ramsay') {
      baseInstructions.rate = 1.3;
      baseInstructions.pitch = 0.8;
    } else if (actor.id === 'sassy_queen') {
      baseInstructions.pitch = 1.2;
      baseInstructions.rate = 1.1;
    } else if (actor.id === 'parisian_critic') {
      baseInstructions.rate = 0.8;
      baseInstructions.pitch = 1.0;
    }

    return baseInstructions;
  }

  private generateHumanCharacteristics(actor: VoiceActorProfile, text: string) {
    return {
      breathing_pattern: this.determineBreathingPattern(actor, text),
      natural_hesitations: this.addNaturalHesitations(text),
      emotional_inflections: this.identifyEmotionalInflections(actor, text),
      personality_markers: actor.speech_patterns.signature_phrases
    };
  }

  private extractEmphasisPoints(text: string): string[] {
    const emphasisWords = text.match(/[A-Z]{2,}/g) || [];
    const questionMarks = text.match(/[^.]*\?/g) || [];
    return [...emphasisWords, ...questionMarks.map(q => q.trim())];
  }

  private extractPauseMarkers(text: string): string[] {
    const pausePatterns = [
      /\*[^*]+\*/g, // Actions in asterisks
      /\.\.\./g,    // Ellipses
      /—/g,         // Em dashes
      /,\s+/g       // Commas with spaces
    ];

    const markers: string[] = [];
    pausePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) markers.push(...matches);
    });

    return markers;
  }

  private determineBreathingPattern(actor: VoiceActorProfile, text: string): string {
    if (actor.voice_characteristics.assertiveness_level > 8) {
      return 'aggressive_rapid';
    } else if (actor.emotional_range.sarcasm_level > 8) {
      return 'controlled_dramatic';
    }
    return 'natural_varied';
  }

  private addNaturalHesitations(text: string): string[] {
    const hesitations = [];
    const wordCount = text.split(' ').length;
    
    if (wordCount > 20) {
      hesitations.push('mid-sentence pause');
    }
    if (text.includes('?')) {
      hesitations.push('questioning inflection');
    }
    if (text.includes('!')) {
      hesitations.push('emphatic delivery');
    }

    return hesitations;
  }

  private identifyEmotionalInflections(actor: VoiceActorProfile, text: string): string[] {
    const inflections = [];
    
    if (text.includes('pathetic') || text.includes('stupid')) {
      inflections.push('disgusted tone');
    }
    if (text.includes('honey') || text.includes('sweetie')) {
      inflections.push('condescending sweetness');
    }
    if (text.includes('!')) {
      inflections.push('aggressive emphasis');
    }
    if (text.includes('really?') || text.includes('seriously?')) {
      inflections.push('sarcastic disbelief');
    }

    return inflections;
  }

  private generateFallbackResponse(message: string): string {
    return "Listen here, I heard your pathetic attempt at communication, but there's a technical issue. Try again and I'll destroy your question properly this time.";
  }

  getAvailableActors(): VoiceActorProfile[] {
    return Array.from(this.voiceActors.values());
  }

  getActorById(id: string): VoiceActorProfile | undefined {
    return this.voiceActors.get(id);
  }
}

export const humanVoiceActors = new HumanVoiceActors();