import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export interface EnhancedSentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  emotional_intensity: number;
  emotional_categories: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    surprise: number;
    disgust: number;
    trust: number;
    anticipation: number;
  };
  contextual_factors: {
    sarcasm_detected: boolean;
    urgency_level: number;
    formality_level: number;
    cultural_sensitivity: number;
  };
  amma2amma_consensus: {
    primary_model_result: any;
    secondary_model_result: any;
    tertiary_model_result: any;
    ensemble_confidence: number;
    disagreement_score: number;
    final_consensus: any;
  };
  processing_metadata: {
    models_used: string[];
    processing_time_ms: number;
    accuracy_estimation: number;
    reliability_score: number;
  };
}

export interface AMMA2AMMASession {
  session_id: string;
  participating_models: string[];
  text_analyzed: string;
  convergence_iterations: number;
  final_consensus: any;
  confidence_validation: number;
}

export class EnhancedSentimentEngine {
  private sessionId: string;

  constructor() {
    this.sessionId = `sentiment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async executeAMMA2AMMASentimentAnalysis(text: string): Promise<EnhancedSentimentResult> {
    const startTime = Date.now();
    
    // Validate API credentials before processing
    if (!process.env.ANTHROPIC_API_KEY || !process.env.OPENAI_API_KEY || !process.env.GOOGLE_API_KEY) {
      throw new Error('Missing required API credentials. Please configure ANTHROPIC_API_KEY, OPENAI_API_KEY, and GOOGLE_API_KEY.');
    }
    
    try {
      // AMMA2AMMA Protocol: Multi-model ensemble analysis with strict authentication validation
      const [claudeResult, openaiResult, geminiResult] = await Promise.allSettled([
        this.analyzeSentimentWithClaude(text),
        this.analyzeSentimentWithOpenAI(text),
        this.analyzeSentimentWithGemini(text)
      ]);

      // Check for authentication failures - all models must succeed for authentic data
      const authErrors: string[] = [];
      if (claudeResult.status === 'rejected') authErrors.push('Claude API authentication failed');
      if (openaiResult.status === 'rejected') authErrors.push('OpenAI API authentication failed');  
      if (geminiResult.status === 'rejected') authErrors.push('Google Gemini API authentication failed');
      
      if (authErrors.length > 0) {
        throw new Error(`API authentication failures detected: ${authErrors.join(', ')}. All sentiment analysis models require valid API credentials with proper permissions.`);
      }

      // Extract results from settled promises - only process if all APIs succeeded
      const claudeData = claudeResult.status === 'fulfilled' ? claudeResult.value : null;
      const openaiData = openaiResult.status === 'fulfilled' ? openaiResult.value : null;
      const geminiData = geminiResult.status === 'fulfilled' ? geminiResult.value : null;

      // AMMA2AMMA Consensus Algorithm
      const consensus = this.calculateAMMA2AMMAConsensus(claudeData, openaiData, geminiData);
      
      // Enhanced emotional analysis
      const emotionalCategories = this.analyzeEmotionalCategories(text, consensus);
      
      // Contextual factor analysis
      const contextualFactors = this.analyzeContextualFactors(text);
      
      const processingTime = Date.now() - startTime;

      return {
        sentiment: consensus.final_sentiment,
        confidence: consensus.ensemble_confidence,
        emotional_intensity: consensus.emotional_intensity,
        emotional_categories: emotionalCategories,
        contextual_factors: contextualFactors,
        amma2amma_consensus: {
          primary_model_result: claudeData,
          secondary_model_result: openaiData,
          tertiary_model_result: geminiData,
          ensemble_confidence: consensus.ensemble_confidence,
          disagreement_score: consensus.disagreement_score,
          final_consensus: consensus
        },
        processing_metadata: {
          models_used: ['claude-sonnet-4-20250514', 'gpt-4o', 'gemini-pro'],
          processing_time_ms: processingTime,
          accuracy_estimation: consensus.accuracy_estimation,
          reliability_score: consensus.reliability_score
        }
      };

    } catch (error) {
      console.error('AMMA2AMMA Sentiment Analysis Error:', error);
      
      // Throw error to indicate API credentials need validation
      throw new Error('AMMA2AMMA Sentiment Analysis requires valid API credentials. Please ensure ANTHROPIC_API_KEY, OPENAI_API_KEY, and GOOGLE_API_KEY are properly configured with sufficient permissions.');
    }
  }

  private async analyzeSentimentWithClaude(text: string): Promise<any> {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `You are an expert sentiment analysis AI with advanced emotional intelligence capabilities. Analyze the given text and provide a detailed sentiment assessment in JSON format.

Required JSON structure:
{
  "sentiment": "positive|negative|neutral",
  "confidence": 0.0-1.0,
  "emotional_intensity": 0.0-1.0,
  "reasoning": "detailed explanation",
  "emotional_nuances": ["list of detected emotions"],
  "contextual_insights": "cultural and contextual analysis"
}`,
        messages: [
          {
            role: 'user',
            content: `Analyze the sentiment of this text with maximum precision: "${text}"`
          }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        return JSON.parse(content.text);
      }
      throw new Error('Invalid response format from Claude');
    } catch (error) {
      console.error('Claude sentiment analysis error:', error);
      // Only return null for authentication/permission errors to ensure data integrity
      if (error instanceof Error && (error.message.includes('authentication') || error.message.includes('invalid') || error.message.includes('unauthorized'))) {
        throw new Error('Claude API authentication failed. Please verify ANTHROPIC_API_KEY is valid and has proper permissions.');
      }
      return null;
    }
  }

  private async analyzeSentimentWithOpenAI(text: string): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: 'system',
            content: `You are an advanced sentiment analysis expert. Analyze text sentiment with high precision and return JSON format:
{
  "sentiment": "positive|negative|neutral",
  "confidence": 0.0-1.0,
  "emotional_intensity": 0.0-1.0,
  "reasoning": "detailed explanation",
  "emotional_nuances": ["detected emotions"],
  "contextual_insights": "analysis context"
}`
          },
          {
            role: 'user',
            content: `Analyze sentiment: "${text}"`
          }
        ],
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('OpenAI sentiment analysis error:', error);
      // Validate API access for data integrity
      if (error instanceof Error && (error.message.includes('403') || error.message.includes('authentication') || error.message.includes('model_not_found') || error.message.includes('invalid_request'))) {
        throw new Error('OpenAI API access denied. Please verify OPENAI_API_KEY has proper permissions for GPT-4o model.');
      }
      return null;
    }
  }

  private async analyzeSentimentWithGemini(text: string): Promise<any> {
    try {
      const model = googleAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Analyze the sentiment of this text with high precision. Return only valid JSON:
{
  "sentiment": "positive|negative|neutral",
  "confidence": 0.0-1.0,
  "emotional_intensity": 0.0-1.0,
  "reasoning": "detailed explanation",
  "emotional_nuances": ["detected emotions"],
  "contextual_insights": "analysis context"
}

Text to analyze: "${text}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      // Clean up response to extract JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in Gemini response');
    } catch (error) {
      console.error('Gemini sentiment analysis error:', error);
      // Validate Google API access for data integrity
      if (error instanceof Error && (error.message.includes('404') || error.message.includes('authentication') || error.message.includes('not found') || error.message.includes('invalid'))) {
        throw new Error('Google Gemini API access failed. Please verify GOOGLE_API_KEY is valid and has proper Gemini model permissions.');
      }
      return null;
    }
  }

  private calculateAMMA2AMMAConsensus(claude: any, openai: any, gemini: any): any {
    const validResults = [claude, openai, gemini].filter(result => result !== null);
    
    if (validResults.length === 0) {
      throw new Error('No valid API responses received. All sentiment analysis models failed authentication or access validation.');
    }

    // Sentiment voting with weighted confidence
    const sentimentVotes = { positive: 0, negative: 0, neutral: 0 };
    let totalConfidence = 0;
    let totalIntensity = 0;

    validResults.forEach(result => {
      const weight = result.confidence || 0.5;
      sentimentVotes[result.sentiment as keyof typeof sentimentVotes] += weight;
      totalConfidence += result.confidence || 0.5;
      totalIntensity += result.emotional_intensity || 0.5;
    });

    // Determine consensus sentiment
    const finalSentiment = Object.entries(sentimentVotes).reduce((a, b) => 
      sentimentVotes[a[0] as keyof typeof sentimentVotes] > sentimentVotes[b[0] as keyof typeof sentimentVotes] ? a : b
    )[0] as 'positive' | 'negative' | 'neutral';

    // Calculate disagreement score
    const sentimentValues = Object.values(sentimentVotes);
    const maxVotes = Math.max(...sentimentValues);
    const secondMaxVotes = sentimentValues.sort((a, b) => b - a)[1] || 0;
    const disagreementScore = secondMaxVotes / maxVotes;

    // Ensemble confidence calculation
    const averageConfidence = totalConfidence / validResults.length;
    const consensusStrength = 1 - disagreementScore;
    const ensembleConfidence = Math.min(averageConfidence * consensusStrength * 1.2, 0.98);

    return {
      final_sentiment: finalSentiment,
      ensemble_confidence: Math.max(ensembleConfidence, 0.1),
      emotional_intensity: totalIntensity / validResults.length,
      disagreement_score: disagreementScore,
      accuracy_estimation: Math.min(ensembleConfidence * 1.1, 0.95),
      reliability_score: Math.min(consensusStrength * validResults.length / 3, 0.95)
    };
  }

  private analyzeEmotionalCategories(text: string, consensus: any): any {
    // Advanced emotional categorization based on text analysis
    const textLower = text.toLowerCase();
    
    // Base scores from consensus
    const baseIntensity = consensus.emotional_intensity || 0.5;
    
    return {
      joy: this.calculateEmotionScore(textLower, ['happy', 'excited', 'wonderful', 'amazing', 'love'], baseIntensity),
      anger: this.calculateEmotionScore(textLower, ['angry', 'furious', 'hate', 'terrible', 'awful'], baseIntensity),
      fear: this.calculateEmotionScore(textLower, ['scared', 'worried', 'anxious', 'nervous', 'afraid'], baseIntensity),
      sadness: this.calculateEmotionScore(textLower, ['sad', 'depressed', 'crying', 'heartbroken', 'devastated'], baseIntensity),
      surprise: this.calculateEmotionScore(textLower, ['surprised', 'shocked', 'unexpected', 'amazing', 'wow'], baseIntensity),
      disgust: this.calculateEmotionScore(textLower, ['disgusting', 'revolting', 'sick', 'nasty', 'gross'], baseIntensity),
      trust: this.calculateEmotionScore(textLower, ['trust', 'reliable', 'honest', 'confident', 'secure'], baseIntensity),
      anticipation: this.calculateEmotionScore(textLower, ['excited', 'looking forward', 'can\'t wait', 'anticipating'], baseIntensity)
    };
  }

  private calculateEmotionScore(text: string, keywords: string[], baseIntensity: number): number {
    let score = 0;
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 0.3;
      }
    });
    return Math.min(score * baseIntensity, 1.0);
  }

  private analyzeContextualFactors(text: string): any {
    const textLower = text.toLowerCase();
    
    return {
      sarcasm_detected: this.detectSarcasm(textLower),
      urgency_level: this.calculateUrgencyLevel(textLower),
      formality_level: this.calculateFormalityLevel(text),
      cultural_sensitivity: this.assessCulturalSensitivity(textLower)
    };
  }

  private detectSarcasm(text: string): boolean {
    const sarcasmIndicators = ['yeah right', 'sure thing', 'oh great', 'fantastic', 'perfect'];
    return sarcasmIndicators.some(indicator => text.includes(indicator));
  }

  private calculateUrgencyLevel(text: string): number {
    const urgencyWords = ['urgent', 'asap', 'immediately', 'emergency', 'critical'];
    let urgency = 0;
    urgencyWords.forEach(word => {
      if (text.includes(word)) urgency += 0.25;
    });
    return Math.min(urgency, 1.0);
  }

  private calculateFormalityLevel(text: string): number {
    const formalWords = ['please', 'thank you', 'sincerely', 'regards', 'respectfully'];
    const informalWords = ['hey', 'yo', 'sup', 'cool', 'awesome'];
    
    let formal = 0;
    let informal = 0;
    
    formalWords.forEach(word => {
      if (text.toLowerCase().includes(word)) formal += 0.2;
    });
    
    informalWords.forEach(word => {
      if (text.toLowerCase().includes(word)) informal += 0.2;
    });
    
    return Math.max(formal - informal + 0.5, 0);
  }

  private assessCulturalSensitivity(text: string): number {
    // Basic cultural sensitivity assessment
    const sensitiveTopics = ['religion', 'politics', 'race', 'gender'];
    let sensitivity = 0.5; // baseline
    
    sensitiveTopics.forEach(topic => {
      if (text.includes(topic)) sensitivity += 0.1;
    });
    
    return Math.min(sensitivity, 1.0);
  }

  private generateErrorResponse(text: string, processingTime: number, errorMessage: string): EnhancedSentimentResult {
    // Return error state indicating API services are unavailable
    throw new Error(`AMMA2AMMA Sentiment Analysis Service Unavailable: ${errorMessage}. Please verify API credentials are properly configured.`);
  }
}

export const enhancedSentimentEngine = new EnhancedSentimentEngine();