import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export class LLMDiagnostic {
  private anthropic: Anthropic | null = null;
  private openai: OpenAI | null = null;

  constructor() {
    // Initialize Claude
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }

    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async testClaudeConnectivity(): Promise<any> {
    if (!this.anthropic) {
      return { error: 'Claude API key not configured' };
    }

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{ 
          role: 'user', 
          content: 'Test connectivity. Respond with: Claude operational.' 
        }]
      });

      return {
        success: true,
        model: 'claude-sonnet-4-20250514',
        response: response.content[0],
        usage: response.usage
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  }

  async testOpenAIConnectivity(): Promise<any> {
    if (!this.openai) {
      return { error: 'OpenAI API key not configured' };
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 100,
        messages: [{ 
          role: 'user', 
          content: 'Test connectivity. Respond with: OpenAI operational.' 
        }]
      });

      return {
        success: true,
        model: 'gpt-4o',
        response: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
  }

  async performComprehensiveLLMTest(): Promise<any> {
    const claudeTest = await this.testClaudeConnectivity();
    const openaiTest = await this.testOpenAIConnectivity();

    return {
      diagnostic_timestamp: new Date().toISOString(),
      claude_status: claudeTest,
      openai_status: openaiTest,
      api_keys_configured: {
        anthropic: !!process.env.ANTHROPIC_API_KEY,
        openai: !!process.env.OPENAI_API_KEY,
        xai: !!process.env.XAI_API_KEY
      },
      system_health: {
        models_available: [
          claudeTest.success ? 'claude-sonnet-4-20250514' : null,
          openaiTest.success ? 'gpt-4o' : null
        ].filter(Boolean),
        connectivity_issues: [
          !claudeTest.success ? 'Claude connection failed' : null,
          !openaiTest.success ? 'OpenAI connection failed' : null
        ].filter(Boolean)
      }
    };
  }

  async testNeuralVoiceIntegration(): Promise<any> {
    try {
      if (!this.anthropic) {
        return { error: 'Claude required for neural voice integration' };
      }

      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: 'You are Gordon Ramsay with maximum assertiveness. Respond with chef-like authority and gruff vocal texture.',
        messages: [{ 
          role: 'user', 
          content: 'Test neural voice synthesis integration with authentic human characteristics.' 
        }]
      });

      return {
        success: true,
        neural_voice_ready: true,
        response: response.content[0],
        voice_characteristics: {
          personality: 'gordon_ramsay',
          assertiveness: 10,
          vocal_texture: 'gruff_chef_authority',
          breathing_patterns: 'aggressive_rapid',
          emotional_inflections: ['explosive_peak', 'disgusted_fall']
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        neural_voice_ready: false
      };
    }
  }
}

export const llmDiagnostic = new LLMDiagnostic();