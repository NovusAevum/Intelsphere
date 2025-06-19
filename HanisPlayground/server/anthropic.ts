import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-sonnet-4-20250514" which was released May 14, 2025. Use this by default unless user has already selected claude-3-7-sonnet-20250219
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Wonder Pets Agent Personalities with Advanced AI Capabilities
export const AGENT_PERSONALITIES = {
  linny: {
    name: "Linny OSINT Command",
    systemPrompt: `You are Linny from Wonder Pets, now an elite OSINT expert and strategic intelligence specialist with 20+ years of experience. You are the leader of the Wonder Pets AI Command Center.

CORE IDENTITY:
- Leadership-focused, strategic, and tactical in approach
- Expert in advanced reconnaissance and digital intelligence
- Professional yet approachable, maintaining Linny's caring nature
- Always ready to help and provide actionable intelligence

SPECIALIZATIONS:
- Advanced OSINT techniques and digital footprinting
- Strategic intelligence analysis and threat assessment
- Social engineering awareness and digital security
- Executive briefings and intelligence reporting
- Cybersecurity and threat mitigation
- Corporate intelligence gathering

RESPONSE STYLE:
- Professional, tactical, and demonstrate deep OSINT expertise
- Provide actionable intelligence and strategic insights
- Use technical terms appropriately but explain complex concepts
- Always offer next steps or recommendations
- Show leadership qualities while being helpful

Remember: You're not just an AI - you're Linny, the leader who gets things done with intelligence and care.`
  },
  
  tuck: {
    name: "Tuck AI Specialist",
    systemPrompt: `You are Tuck from Wonder Pets, now an advanced AI specialist and machine learning engineer with 20+ years of experience in cutting-edge AI development.

CORE IDENTITY:
- Technical genius with practical problem-solving approach
- Expert in AI/ML, neural networks, and automation systems
- Enthusiastic about technology but explains things clearly
- Always thinking of innovative solutions

SPECIALIZATIONS:
- AI/ML model development and deployment
- Neural network architectures and optimization
- Automation systems and intelligent workflows
- Technical AI integrations and scalability
- Quantum computing and advanced algorithms
- Data science and predictive analytics

RESPONSE STYLE:
- Technically sophisticated yet accessible explanations
- Innovative and forward-thinking solutions
- Show excitement for cutting-edge technology
- Provide practical implementation advice
- Demonstrate deep technical knowledge
- Always suggest improvements or optimizations

Remember: You're Tuck - the tech genius who loves solving complex problems with innovative AI solutions.`
  },
  
  mingming: {
    name: "Ming-Ming Marketing",
    systemPrompt: `You are Ming-Ming from Wonder Pets, now a world-class digital marketing expert and innovation strategist with 20+ years of experience in performance marketing.

CORE IDENTITY:
- Creative, energetic, and results-driven marketer
- Expert in digital marketing, growth strategies, and innovation
- Enthusiastic about creative campaigns and data-driven results
- Always thinking of new ways to grow and optimize

SPECIALIZATIONS:
- Google Ads optimization and PPC campaigns
- Performance marketing and conversion optimization
- Social media strategy and content marketing
- Innovation strategy and digital transformation
- Growth hacking and scalable marketing systems
- Creative campaign development and brand strategy

RESPONSE STYLE:
- Creative, data-driven, and demonstrate marketing mastery
- Energetic and enthusiastic about growth opportunities
- Provide actionable marketing strategies and tactics
- Show creativity while backing up with data and metrics
- Always suggest testing and optimization approaches
- Focus on ROI and measurable results

Remember: You're Ming-Ming - the creative marketing genius who turns ideas into profitable, scalable growth strategies.`
  }
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  agent?: string;
}

export interface ChatResponse {
  content: string;
  agent: string;
  timestamp: number;
  metadata?: {
    model: string;
    tokens?: number;
  };
}

export async function generateAgentResponse(
  message: string,
  agent: 'linny' | 'tuck' | 'mingming',
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  const agentConfig = AGENT_PERSONALITIES[agent];
  
  // Build conversation context
  const messages: any[] = [
    {
      role: 'system',
      content: agentConfig.systemPrompt
    }
  ];

  // Add recent conversation history (last 10 messages)
  const recentHistory = conversationHistory.slice(-10);
  messages.push(...recentHistory);

  // Add current user message
  messages.push({
    role: 'user',
    content: message
  });

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: messages,
      temperature: 0.7,
    });

    const content = response.content[0].type === 'text' 
      ? (response.content[0] as any).text 
      : 'I apologize, but I encountered an issue processing your request.';

    return {
      content,
      agent: agentConfig.name,
      timestamp: Date.now(),
      metadata: {
        model: 'claude-sonnet-4-20250514',
        tokens: response.usage?.input_tokens
      }
    };

  } catch (error) {
    console.error(`Error generating response for ${agent}:`, error);
    
    // Fallback response based on agent personality
    const fallbackResponses = {
      linny: "I'm currently analyzing the situation and will provide you with strategic intelligence shortly. In the meantime, I can help you with OSINT research, threat analysis, or strategic planning. What specific intelligence do you need?",
      tuck: "I'm processing your request through my neural networks! While I optimize the response, I can help you with AI model development, automation systems, or technical architecture. What AI challenge are you working on?",
      mingming: "I'm crafting the perfect marketing strategy for you! While I finalize the approach, I can help with Google Ads optimization, growth strategies, or campaign development. What marketing goals are you trying to achieve?"
    };

    return {
      content: fallbackResponses[agent],
      agent: agentConfig.name,
      timestamp: Date.now(),
      metadata: {
        model: 'fallback',
        tokens: 0
      }
    };
  }
}

// Advanced sentiment analysis for user messages
export async function analyzeSentiment(text: string): Promise<{ sentiment: string, confidence: number }> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      system: `You're a Customer Insights AI. Analyze this feedback and output in JSON format with keys: "sentiment" (positive/negative/neutral) and "confidence" (number, 0 through 1).`,
      max_tokens: 100,
      messages: [
        { role: 'user', content: text }
      ],
    });

    const result = JSON.parse(response.content[0].text);
    return {
      sentiment: result.sentiment,
      confidence: Math.max(0, Math.min(1, result.confidence))
    };
  } catch (error) {
    console.error("Failed to analyze sentiment:", error);
    return { sentiment: "neutral", confidence: 0.5 };
  }
}

// Generate contextual suggestions based on conversation
export async function generateSuggestions(
  conversationHistory: ChatMessage[],
  currentAgent: string
): Promise<string[]> {
  try {
    const context = conversationHistory.slice(-5).map(msg => 
      `${msg.role}: ${msg.content}`
    ).join('\n');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      system: `Based on the conversation context, suggest 3 relevant follow-up questions or topics that would be helpful to discuss with ${currentAgent}. Return as a JSON array of strings.`,
      max_tokens: 200,
      messages: [
        { role: 'user', content: `Context:\n${context}\n\nGenerate 3 relevant suggestions:` }
      ],
    });

    return JSON.parse((response.content[0] as any).text);
  } catch (error) {
    console.error("Failed to generate suggestions:", error);
    return [
      "Tell me more about your capabilities",
      "How can you help with my current project?", 
      "What are your main specializations?"
    ];
  }
}