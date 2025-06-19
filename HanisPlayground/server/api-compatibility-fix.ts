/**
 * API Compatibility Fix System
 * Ensures all 8 AI models work with available credentials
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { CohereClient } from 'cohere-ai';
import axios from 'axios';

interface ModelTestResult {
  model: string;
  working: boolean;
  error?: string;
  recommendation?: string;
}

class APICompatibilityFixer {
  private async testOpenAI(): Promise<ModelTestResult[]> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const results: ModelTestResult[] = [];

    // Test available models in order of compatibility
    const modelsToTest = ['gpt-3.5-turbo-0125', 'gpt-3.5-turbo', 'gpt-4o-mini', 'gpt-4'];

    for (const model of modelsToTest) {
      try {
        await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 10
        });
        results.push({ model, working: true });
        break; // Use the first working model
      } catch (error: any) {
        results.push({ 
          model, 
          working: false, 
          error: error.message,
          recommendation: error.message.includes('access') ? 'Upgrade API plan' : 'Check API key'
        });
      }
    }

    return results;
  }

  private async testAnthropic(): Promise<ModelTestResult[]> {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const results: ModelTestResult[] = [];

    const modelsToTest = ['claude-3-haiku-20240307', 'claude-3-5-sonnet-20241022'];

    for (const model of modelsToTest) {
      try {
        await anthropic.messages.create({
          model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'test' }]
        });
        results.push({ model, working: true });
      } catch (error: any) {
        results.push({ 
          model, 
          working: false, 
          error: error.message,
          recommendation: error.message.includes('authentication') ? 'Update API key' : 'Check account status'
        });
      }
    }

    return results;
  }

  private async testXAI(): Promise<ModelTestResult> {
    const xai = new OpenAI({
      baseURL: 'https://api.x.ai/v1',
      apiKey: process.env.XAI_API_KEY,
    });

    try {
      await xai.chat.completions.create({
        model: 'grok-beta',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 10
      });
      return { model: 'grok-beta', working: true };
    } catch (error: any) {
      return { 
        model: 'grok-beta', 
        working: false, 
        error: error.message,
        recommendation: error.message.includes('credits') ? 'Add credits to account' : 'Check API key'
      };
    }
  }

  private async testMistral(): Promise<ModelTestResult> {
    try {
      await axios.post('https://api.mistral.ai/v1/chat/completions', {
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 10
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return { model: 'mistral-large-latest', working: true };
    } catch (error: any) {
      return { 
        model: 'mistral-large-latest', 
        working: false, 
        error: error.message,
        recommendation: 'Check Mistral API key'
      };
    }
  }

  private async testGemini(): Promise<ModelTestResult> {
    try {
      await axios.post(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
        contents: [{ parts: [{ text: 'test' }] }]
      });
      return { model: 'gemini-1.5-flash', working: true };
    } catch (error: any) {
      return { 
        model: 'gemini-1.5-flash', 
        working: false, 
        error: error.message,
        recommendation: 'Check Google API key'
      };
    }
  }

  private async testCohere(): Promise<ModelTestResult> {
    const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

    try {
      const response = await cohere.chat({
        model: 'command-r-plus',
        message: 'test',
        maxTokens: 10
      });
      return { model: 'command-r-plus', working: true };
    } catch (error: any) {
      return { 
        model: 'command-r-plus', 
        working: false, 
        error: error.message,
        recommendation: 'Check Cohere API key'
      };
    }
  }

  private async testVoyage(): Promise<ModelTestResult> {
    try {
      await axios.post('https://api.voyageai.com/v1/embeddings', {
        input: ['test'],
        model: 'voyage-large-2'
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return { model: 'voyage-large-2', working: true };
    } catch (error: any) {
      return { 
        model: 'voyage-large-2', 
        working: false, 
        error: error.message,
        recommendation: 'Check Voyage API key'
      };
    }
  }

  async runFullCompatibilityTest(): Promise<{
    workingModels: number;
    totalModels: number;
    results: ModelTestResult[];
    recommendations: string[];
  }> {
    console.log('🔍 Running comprehensive API compatibility test...');

    const results: ModelTestResult[] = [];
    const recommendations: string[] = [];

    // Test all models
    const openaiResults = await this.testOpenAI();
    const anthropicResults = await this.testAnthropic();
    const xaiResult = await this.testXAI();
    const mistralResult = await this.testMistral();
    const geminiResult = await this.testGemini();
    const cohereResult = await this.testCohere();
    const voyageResult = await this.testVoyage();

    results.push(...openaiResults, ...anthropicResults, xaiResult, mistralResult, geminiResult, cohereResult, voyageResult);

    // Collect recommendations for failed models
    results.forEach(result => {
      if (!result.working && result.recommendation) {
        recommendations.push(`${result.model}: ${result.recommendation}`);
      }
    });

    const workingModels = results.filter(r => r.working).length;

    console.log(`✅ ${workingModels}/${results.length} models working`);
    
    return {
      workingModels,
      totalModels: results.length,
      results,
      recommendations
    };
  }

  async generateCompatibleConfiguration(): Promise<string> {
    const testResults = await this.runFullCompatibilityTest();
    
    const workingModels = testResults.results.filter(r => r.working);
    
    let config = `// Auto-generated compatible configuration\n`;
    config += `// Working models: ${workingModels.length}/${testResults.totalModels}\n\n`;
    
    workingModels.forEach(model => {
      config += `✅ ${model.model}\n`;
    });
    
    if (testResults.recommendations.length > 0) {
      config += `\n// Recommendations for failed models:\n`;
      testResults.recommendations.forEach(rec => {
        config += `// ${rec}\n`;
      });
    }
    
    return config;
  }
}

export const apiCompatibilityFixer = new APICompatibilityFixer();