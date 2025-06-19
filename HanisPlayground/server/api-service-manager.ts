import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { CohereClient } from 'cohere-ai';

export class APIServiceManager {
  private openai: OpenAI;
  private anthropic: Anthropic;
  private cohere: CohereClient;
  private xai: OpenAI;
  private grok: OpenAI;
  private serviceStatus: { 
    openai: boolean; 
    anthropic: boolean; 
    cohere: boolean;
    xai: boolean;
    google: boolean;
    mistral: boolean;
    voyage: boolean;
    weatherstack: boolean;
  } = { 
    openai: false, 
    anthropic: false, 
    cohere: false,
    xai: false,
    google: false,
    mistral: false,
    voyage: false,
    weatherstack: false
  };

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    this.xai = new OpenAI({
      baseURL: "https://api.x.ai/v1",
      apiKey: process.env.XAI_API_KEY,
    });

    this.grok = new OpenAI({
      baseURL: "https://api.x.ai/v1", 
      apiKey: process.env.XAI_API_KEY,
    });

    this.initializeServices();
  }

  private async initializeServices() {
    await Promise.allSettled([
      this.checkOpenAIAccess(),
      this.checkAnthropicAccess(),
      this.checkCohereAccess(),
      this.checkXAIAccess(),
      this.checkGoogleAccess(),
      this.checkMistralAccess(),
      this.checkVoyageAccess(),
      this.checkWeatherStackAccess()
    ]);
  }

  private async checkOpenAIAccess(): Promise<boolean> {
    try {
      // Test with a simple completion instead of models.list()
      const testCompletion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5,
      });
      
      if (testCompletion.choices && testCompletion.choices.length > 0) {
        this.serviceStatus.openai = true;
        console.log('✅ OpenAI API: Connected and accessible');
        return true;
      }
      
      this.serviceStatus.openai = false;
      console.log('⚠️  OpenAI API: Response format unexpected');
      return false;
    } catch (error: any) {
      // Check for specific error types
      if (error?.status === 403 || error?.code === 'model_not_found') {
        // Try with gpt-4o-mini which might be available
        try {
          await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'test' }],
            max_tokens: 5,
          });
          this.serviceStatus.openai = true;
          console.log('✅ OpenAI API: Connected with gpt-4o-mini');
          return true;
        } catch (secondError) {
          this.serviceStatus.openai = false;
          console.log('⚠️  OpenAI API: Access limited - insufficient permissions or credits');
          return false;
        }
      }
      
      this.serviceStatus.openai = false;
      console.log('⚠️  OpenAI API: Connection failed');
      return false;
    }
  }

  private async checkAnthropicAccess(): Promise<boolean> {
    try {
      await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }],
      });
      this.serviceStatus.anthropic = true;
      console.log('✅ Anthropic API: Connected and accessible');
      return true;
    } catch (error) {
      this.serviceStatus.anthropic = false;
      console.log('⚠️  Anthropic API: Access limited or credit insufficient');
      return false;
    }
  }

  private async checkCohereAccess(): Promise<boolean> {
    try {
      await this.cohere.generate({
        model: 'command-light',
        prompt: 'test',
        maxTokens: 5,
      });
      this.serviceStatus.cohere = true;
      console.log('✅ Cohere API: Connected and accessible');
      return true;
    } catch (error) {
      this.serviceStatus.cohere = false;
      console.log('⚠️  Cohere API: Access limited or credit insufficient');
      return false;
    }
  }

  private async checkXAIAccess(): Promise<boolean> {
    try {
      await this.xai.chat.completions.create({
        model: 'grok-beta',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5,
      });
      this.serviceStatus.xai = true;
      console.log('✅ xAI API: Connected and accessible');
      return true;
    } catch (error) {
      this.serviceStatus.xai = false;
      console.log('⚠️  xAI API: Access limited or credit insufficient');
      return false;
    }
  }

  private async checkGoogleAccess(): Promise<boolean> {
    try {
      // Test Google API with a simple request
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_API_KEY}`);
      if (response.ok) {
        this.serviceStatus.google = true;
        console.log('✅ Google API: Connected and accessible');
        return true;
      } else {
        this.serviceStatus.google = false;
        console.log('⚠️  Google API: Access limited or invalid key');
        return false;
      }
    } catch (error) {
      this.serviceStatus.google = false;
      console.log('⚠️  Google API: Connection failed');
      return false;
    }
  }

  private async checkMistralAccess(): Promise<boolean> {
    try {
      // Test Mistral API
      const response = await fetch('https://api.mistral.ai/v1/models', {
        headers: {
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        this.serviceStatus.mistral = true;
        console.log('✅ Mistral API: Connected and accessible');
        return true;
      } else {
        this.serviceStatus.mistral = false;
        console.log('⚠️  Mistral API: Access limited or invalid key');
        return false;
      }
    } catch (error) {
      this.serviceStatus.mistral = false;
      console.log('⚠️  Mistral API: Connection failed');
      return false;
    }
  }

  private async checkVoyageAccess(): Promise<boolean> {
    try {
      // Test Voyage API
      const response = await fetch('https://api.voyageai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        this.serviceStatus.voyage = true;
        console.log('✅ Voyage API: Connected and accessible');
        return true;
      } else {
        this.serviceStatus.voyage = false;
        console.log('⚠️  Voyage API: Access limited or invalid key');
        return false;
      }
    } catch (error) {
      this.serviceStatus.voyage = false;
      console.log('⚠️  Voyage API: Connection failed');
      return false;
    }
  }

  private async checkWeatherStackAccess(): Promise<boolean> {
    try {
      // Test WeatherStack API
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=New York`);
      if (response.ok) {
        const data = await response.json();
        if (data.current) {
          this.serviceStatus.weatherstack = true;
          console.log('✅ WeatherStack API: Connected and accessible');
          return true;
        }
      }
      this.serviceStatus.weatherstack = false;
      console.log('⚠️  WeatherStack API: Access limited or invalid key');
      return false;
    } catch (error) {
      this.serviceStatus.weatherstack = false;
      console.log('⚠️  WeatherStack API: Connection failed');
      return false;
    }
  }

  async chatCompletion(message: string, model: 'openai' | 'anthropic' = 'openai'): Promise<{
    response: string;
    model: string;
    isLive: boolean;
  }> {
    if (model === 'anthropic') {
      if (this.serviceStatus.anthropic) {
        try {
          const completion = await this.anthropic.messages.create({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1000,
            messages: [{ role: 'user', content: message }],
          });
          
          const content = completion.content[0];
          const response = content.type === 'text' ? content.text : 'Response generated successfully';
          
          return {
            response,
            model: 'anthropic-claude-3-sonnet',
            isLive: true
          };
        } catch (error) {
          console.log('Anthropic API error, service may need credits');
          this.serviceStatus.anthropic = false;
        }
      }
      
      return {
        response: `I'm Claude, an AI assistant created by Anthropic. I can help you with a wide range of tasks including analysis, writing, math, coding, and general conversation. 

However, I'm currently running in demonstration mode because the API service requires additional credits or configuration. 

Your message: "${message}"

To enable full functionality, please ensure your Anthropic account has sufficient credits and proper API access configured.`,
        model: 'anthropic-demo',
        isLive: false
      };
    } else {
      if (this.serviceStatus.openai) {
        try {
          const completion = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            max_tokens: 1000,
          });
          
          const response = completion.choices[0].message.content || 'Response generated successfully';
          
          return {
            response,
            model: 'openai-gpt-3.5-turbo',
            isLive: true
          };
        } catch (error) {
          console.log('OpenAI API error, checking access permissions');
          this.serviceStatus.openai = false;
        }
      }
      
      return {
        response: `I'm ChatGPT, an AI assistant developed by OpenAI. I can help with various tasks including answering questions, writing assistance, analysis, coding help, and creative projects.

Currently running in demonstration mode due to API access limitations. 

Your message: "${message}"

To enable live AI responses, please verify that your OpenAI account has proper access permissions and sufficient usage credits.`,
        model: 'openai-demo',
        isLive: false
      };
    }
  }

  async businessAnalysis(company: string, analysisType: string, model: 'openai' | 'anthropic' = 'openai'): Promise<{
    analysis: string;
    model: string;
    isLive: boolean;
  }> {
    const prompt = `Provide a comprehensive ${analysisType} analysis for ${company}. Include:
    - Market position and competitive landscape
    - Key strengths and opportunities
    - Risk factors and challenges
    - Strategic recommendations
    - Financial outlook (if applicable)
    
    Please provide detailed, actionable insights.`;

    const result = await this.chatCompletion(prompt, model);
    
    if (!result.isLive) {
      return {
        analysis: `**${analysisType.toUpperCase()} ANALYSIS FOR ${company.toUpperCase()}**

**Executive Summary:**
This business intelligence framework demonstrates comprehensive analysis capabilities. When configured with live API access, this system provides real-time business insights using current market data and financial information.

**Market Position & Competitive Landscape:**
• Industry positioning assessment
• Competitive advantage evaluation
• Market share analysis
• Strategic differentiation factors

**Key Strengths & Opportunities:**
• Operational excellence indicators
• Growth potential assessment
• Innovation pipeline evaluation
• Market expansion opportunities

**Risk Factors & Challenges:**
• Market volatility exposure
• Competitive threat analysis
• Regulatory compliance requirements
• Financial stability assessment

**Strategic Recommendations:**
1. Enable live data integrations for real-time analysis
2. Configure financial data sources for accurate metrics
3. Implement competitive monitoring systems
4. Establish automated reporting workflows

**Financial Outlook:**
Comprehensive financial analysis requires live API access to current market data and financial databases.

*Note: This demonstrates the analysis framework. For live business intelligence with current data, please ensure API services are properly configured.*`,
        model: result.model,
        isLive: false
      };
    }

    return {
      analysis: result.response,
      model: result.model,
      isLive: true
    };
  }

  async marketResearch(industry: string, region: string, focus: string, model: 'openai' | 'anthropic' = 'openai'): Promise<{
    research: string;
    model: string;
    isLive: boolean;
  }> {
    const prompt = `Conduct comprehensive market research for the ${industry} industry in ${region} with focus on ${focus}. Include:
    - Market size and growth trends
    - Key players and competitive dynamics
    - Consumer behavior and preferences
    - Emerging opportunities and threats
    - Technology and innovation trends
    - Regulatory considerations
    - Market entry strategies
    
    Provide data-driven insights with actionable recommendations.`;

    const result = await this.chatCompletion(prompt, model);
    
    if (!result.isLive) {
      return {
        research: `**${industry?.toUpperCase() || 'INDUSTRY'} MARKET RESEARCH - ${region?.toUpperCase() || 'GLOBAL'}**
*Focus: ${(focus || 'comprehensive_analysis').replace(/[-_]/g, ' ').toUpperCase()}*

**Market Overview:**
This market research framework showcases comprehensive industry analysis capabilities. When fully configured with live data sources, this system provides current market intelligence and competitive insights.

**Market Size & Growth Trends:**
• Industry valuation and growth projections
• Historical performance analysis
• Market segmentation breakdown
• Regional performance variations

**Key Players & Competitive Dynamics:**
• Market leader identification and profiling
• Competitive positioning analysis
• Strategic alliance mapping
• Innovation leadership assessment

**Consumer Behavior & Preferences:**
• Demographic analysis frameworks
• Purchase decision factors
• Brand loyalty patterns
• Price sensitivity evaluation

**Emerging Opportunities & Threats:**
• Technology disruption indicators
• Regulatory change impacts
• Market entry barriers
• Economic factor influences

**Technology & Innovation Trends:**
• Digital transformation drivers
• Emerging technology adoption
• R&D investment patterns
• Innovation pipeline assessment

**Strategic Recommendations:**
1. Configure live market data integrations
2. Enable consumer behavior tracking systems
3. Implement competitive intelligence monitoring
4. Establish trend analysis automation

*Note: This demonstrates research capabilities. Live market intelligence requires API access to current industry databases and market data sources.*`,
        model: result.model,
        isLive: false
      };
    }

    return {
      research: result.response,
      model: result.model,
      isLive: true
    };
  }

  getServiceStatus() {
    return {
      ...this.serviceStatus,
      hasLiveAccess: this.serviceStatus.openai || this.serviceStatus.anthropic
    };
  }

  async refreshServiceStatus() {
    await this.checkOpenAIAccess();
    await this.checkAnthropicAccess();
    return this.getServiceStatus();
  }
}

export const apiServiceManager = new APIServiceManager();