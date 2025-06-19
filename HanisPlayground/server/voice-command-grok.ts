import OpenAI from 'openai';

interface VoiceCommandRequest {
  voiceInput: string;
  personality: string;
  language?: string;
  context?: string;
}

interface VoiceCommandResponse {
  processedCommand: string;
  aiResponse: string;
  voiceMetrics: {
    confidence: number;
    clarity: number;
    intent_recognition: number;
    personality_match: number;
  };
  execution_metadata: {
    processing_time: number;
    voice_activation_trigger: boolean;
    grok_model_used: string;
    response_optimized_for_speech: boolean;
  };
}

export class VoiceCommandGrok {
  private xaiClient?: OpenAI;

  constructor() {
    this.initializeGrok();
  }

  private initializeGrok() {
    if (process.env.XAI_API_KEY) {
      this.xaiClient = new OpenAI({
        apiKey: process.env.XAI_API_KEY,
        baseURL: 'https://api.x.ai/v1'
      });
    }
  }

  async processVoiceCommand(request: VoiceCommandRequest): Promise<VoiceCommandResponse> {
    const startTime = Date.now();
    const { voiceInput, personality, language = 'en', context = '' } = request;

    if (!this.xaiClient) {
      throw new Error('Grok XAI client not initialized - API key required');
    }

    // Clean and process the voice input
    const cleanedInput = this.cleanVoiceInput(voiceInput);
    const systemPrompt = this.buildVoiceSystemPrompt(personality, language);

    try {
      const response = await this.xaiClient.chat.completions.create({
        model: 'grok-2-1212',
        max_tokens: 600,
        temperature: 0.9,
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Voice Command: ${cleanedInput}\nContext: ${context}\n\nProcess this voice input and respond with maximum assertiveness optimized for speech synthesis.`
          }
        ]
      });

      const aiResponse = response.choices[0].message.content || '';
      const processedResponse = this.optimizeForSpeech(aiResponse, personality);
      const processingTime = Date.now() - startTime;

      return {
        processedCommand: cleanedInput,
        aiResponse: processedResponse,
        voiceMetrics: {
          confidence: this.calculateVoiceConfidence(cleanedInput),
          clarity: this.assessVoiceClarity(cleanedInput),
          intent_recognition: this.assessIntentRecognition(cleanedInput),
          personality_match: this.assessPersonalityMatch(cleanedInput, personality)
        },
        execution_metadata: {
          processing_time: processingTime,
          voice_activation_trigger: this.detectVoiceActivation(voiceInput),
          grok_model_used: 'grok-2-1212',
          response_optimized_for_speech: true
        }
      };
    } catch (error) {
      console.error('Grok voice processing error:', error);
      return this.generateVoiceFallback(cleanedInput, personality, Date.now() - startTime);
    }
  }

  private cleanVoiceInput(input: string): string {
    // Remove voice activation phrases and clean up
    return input
      .replace(/hey rebel|activate ai|voice command/gi, '')
      .replace(/um+|uh+|er+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private buildVoiceSystemPrompt(personality: string, language: string): string {
    const basePrompt = `You are processing VOICE COMMANDS using Grok with MAXIMUM assertiveness. Your responses will be converted to speech, so optimize for natural spoken delivery.

VOICE COMMAND PROCESSING RULES:
- Respond as the ${personality} personality with EXTREME assertiveness
- Use conversational, speech-friendly language
- Include natural pauses with commas and periods
- Avoid complex punctuation that doesn't translate to speech
- Make responses concise but impactful
- Show personality through vocal tone indicators
- Be brutally direct and unfiltered

SPEECH OPTIMIZATION:
- Use contractions (I'll, you're, can't, won't)
- Include emphasis words (REALLY, ABSOLUTELY, DEFINITELY)
- Add vocal cues like "Look," "Listen," "Seriously"
- Keep sentences shorter for natural speech rhythm`;

    const personalityPrompts: { [key: string]: string } = {
      'sassy_commander': `As the SASSY COMMANDER, you're the supreme authority who thinks everyone is stupid. Use commanding vocal tones:
- Start with authority: "Listen up," "Pay attention," "Here's the deal"
- Use dismissive phrases: "Obviously," "Seriously?" "Are you kidding me?"
- End with commands: "Got it?" "Deal with it." "Next question."`,
      
      'satirical_hanis': `As SATIRICAL HANIS, you're the comedy master with maximum roasting ability:
- Use exaggerated expressions: "OH WOW," "FASCINATING," "AMAZING"
- Include sarcastic pauses: "Let me think... NO."
- Add comedic timing: "So... you really think... that's smart?"`,
      
      'kelantanese_rebel': `As the KELANTANESE REBEL, use authentic Kelantanese speech patterns:
- Start with "Habaq mai" (Listen up)
- Use "Gapo keje demo ni?" (What are you doing?)
- Include "Toksey" (No good) and "Cakap terus" (Speak directly)`,
      
      'rebel': `As the REBEL, challenge everything with maximum directness:
- Question assumptions: "Why do you think that?"
- Challenge directly: "That's wrong because..."
- Demand clarity: "Cut the BS and tell me..."`,
      
      'no-filter': `As NO-FILTER, be brutally honest with zero politeness:
- Start bluntly: "That's stupid because..."
- No sugar-coating: "The reality is..."
- End decisively: "Stop wasting time and..."`,
      
      'truth-teller': `As TRUTH-TELLER, expose everything with transparency:
- Reveal contradictions: "That doesn't add up because..."
- Demand honesty: "What you're really asking is..."
- Expose hidden agendas: "The real issue here is..."`
    };

    const personalityPrompt = personalityPrompts[personality] || personalityPrompts['rebel'];
    return `${basePrompt}\n\nPERSONALITY CONTEXT: ${personalityPrompt}\n\nRespond in ${language} with MAXIMUM assertiveness optimized for speech synthesis.`;
  }

  private optimizeForSpeech(response: string, personality: string): string {
    // Optimize response for text-to-speech
    let optimized = response
      .replace(/\*([^*]+)\*/g, '$1') // Remove markdown emphasis
      .replace(/`([^`]+)`/g, '$1')   // Remove code formatting
      .replace(/\[([^\]]+)\]/g, '$1') // Remove brackets
      .replace(/\s+/g, ' ')          // Normalize spaces
      .trim();

    // Add personality-specific speech optimizations
    if (personality === 'sassy_commander') {
      optimized = optimized.replace(/\./g, '. *pause*');
    } else if (personality === 'satirical_hanis') {
      optimized = optimized.replace(/\?/g, '? *sarcastic pause*');
    }

    return optimized;
  }

  private calculateVoiceConfidence(input: string): number {
    // Calculate confidence based on input clarity
    const wordCount = input.split(' ').length;
    const hasFillers = /um+|uh+|er+/i.test(input);
    const hasCompleteSentence = /[.!?]/.test(input);
    
    let confidence = 0.7; // Base confidence
    
    if (wordCount > 3) confidence += 0.1;
    if (wordCount > 8) confidence += 0.1;
    if (!hasFillers) confidence += 0.1;
    if (hasCompleteSentence) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  private assessVoiceClarity(input: string): number {
    // Assess clarity of voice input
    const hasRepeatedWords = /\b(\w+)\s+\1\b/i.test(input);
    const hasFillers = /um+|uh+|er+|like|you know/i.test(input);
    const hasIncompleteWords = /\b\w{1,2}\b/g.test(input);
    
    let clarity = 0.8;
    
    if (hasRepeatedWords) clarity -= 0.2;
    if (hasFillers) clarity -= 0.1;
    if (hasIncompleteWords) clarity -= 0.1;
    
    return Math.max(clarity, 0.1);
  }

  private assessIntentRecognition(input: string): number {
    // Assess how well we can recognize the intent
    const hasQuestionWords = /what|how|why|when|where|who|can|could|would|should/i.test(input);
    const hasActionWords = /help|show|tell|explain|find|give|make|create/i.test(input);
    const hasCompleteThought = input.length > 10;
    
    let recognition = 0.6;
    
    if (hasQuestionWords) recognition += 0.2;
    if (hasActionWords) recognition += 0.1;
    if (hasCompleteThought) recognition += 0.1;
    
    return Math.min(recognition, 1.0);
  }

  private assessPersonalityMatch(input: string, personality: string): number {
    // Assess how well the input matches the personality
    const assertiveWords = /challenge|direct|honest|truth|real|straight/i.test(input);
    const commandWords = /tell me|show me|give me|I want|I need/i.test(input);
    
    let match = 0.7;
    
    if (assertiveWords && personality.includes('rebel')) match += 0.2;
    if (commandWords && personality === 'sassy_commander') match += 0.2;
    
    return Math.min(match, 1.0);
  }

  private detectVoiceActivation(input: string): boolean {
    const activationPhrases = /hey rebel|activate ai|voice command|rebellious ai/i;
    return activationPhrases.test(input);
  }

  private generateVoiceFallback(input: string, personality: string, processingTime: number): VoiceCommandResponse {
    const fallbackResponses: { [key: string]: string } = {
      'sassy_commander': "Listen up. I heard your voice command, but there's a technical issue. Try again and I'll command you properly.",
      'satirical_hanis': "OH WOW, voice processing failed. How absolutely SHOCKING. Try again and I'll roast your question properly.",
      'kelantanese_rebel': "Habaq mai, ada masalah sikit. Cuba lagi, aku akan jawab dengan betul!",
      'rebel': "Voice command received but processing failed. Cut the BS and try again - I'll give you the straight talk.",
      'no-filter': "Voice processing screwed up. That's the reality. Try again and I'll be brutally honest.",
      'truth-teller': "Technical failure detected. The truth is the system needs another attempt."
    };

    return {
      processedCommand: input,
      aiResponse: fallbackResponses[personality] || fallbackResponses['rebel'],
      voiceMetrics: {
        confidence: 0.5,
        clarity: 0.6,
        intent_recognition: 0.5,
        personality_match: 0.7
      },
      execution_metadata: {
        processing_time: processingTime,
        voice_activation_trigger: this.detectVoiceActivation(input),
        grok_model_used: 'fallback',
        response_optimized_for_speech: true
      }
    };
  }
}

export const voiceCommandGrok = new VoiceCommandGrok();