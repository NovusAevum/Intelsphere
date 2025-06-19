import express from 'express';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { CohereClientV2 } from 'cohere-ai';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('dist'));

// Initialize AI clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'operational',
    system: 'simplified-intelsphere',
    timestamp: new Date().toISOString()
  });
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'openai' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let response = '';
    let actualModel = '';

    switch (model) {
      case 'openai':
        if (process.env.OPENAI_API_KEY) {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: message }],
            max_tokens: 1000
          });
          response = completion.choices[0].message.content || 'No response generated';
          actualModel = 'OpenAI GPT-4o';
        }
        break;

      case 'anthropic':
        if (process.env.ANTHROPIC_API_KEY) {
          const completion = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{ role: 'user', content: message }]
          });
          response = completion.content[0].type === 'text' ? completion.content[0].text : 'No text response';
          actualModel = 'Claude Sonnet 4';
        }
        break;

      case 'cohere':
        if (process.env.COHERE_API_KEY) {
          const completion = await cohere.chat({
            model: 'command-r-plus',
            message: message,
            maxTokens: 1000
          });
          response = completion.message.content[0].text;
          actualModel = 'Cohere Command R+';
        }
        break;

      default:
        return res.status(400).json({ error: 'Invalid model specified' });
    }

    if (!response) {
      return res.status(500).json({ error: 'No API key available for selected model' });
    }

    res.json({
      success: true,
      response,
      model: actualModel,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
});

// Business Intelligence endpoint
app.post('/api/business-analysis', async (req, res) => {
  try {
    const { company, analysisType = 'competitor' } = req.body;
    
    if (!company) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    const prompt = `Provide a professional ${analysisType} analysis for ${company}. Include:
1. Market position and competitive landscape
2. Key strengths and opportunities
3. Potential risks and challenges
4. Strategic recommendations

Format the response as a structured business report.`;

    let response = '';
    let model = '';

    // Try OpenAI first
    if (process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500
      });
      response = completion.choices[0].message.content || '';
      model = 'OpenAI GPT-4o';
    } else if (process.env.ANTHROPIC_API_KEY) {
      const completion = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      });
      response = completion.content[0].text;
      model = 'Claude Sonnet 4';
    }

    if (!response) {
      return res.status(500).json({ error: 'No API keys available' });
    }

    res.json({
      success: true,
      analysis: response,
      company,
      analysisType,
      model,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Business analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to generate analysis',
      details: error.message 
    });
  }
});

// Market Research endpoint
app.post('/api/market-research', async (req, res) => {
  try {
    const { industry, region = 'global', focus = 'trends' } = req.body;
    
    if (!industry) {
      return res.status(400).json({ error: 'Industry is required' });
    }

    const prompt = `Conduct comprehensive market research for the ${industry} industry in ${region}. Focus on ${focus}. Include:
1. Market size and growth projections
2. Key trends and drivers
3. Major players and market share
4. Emerging opportunities
5. Regulatory considerations

Provide data-driven insights with actionable recommendations.`;

    let response = '';
    let model = '';

    // Try Anthropic for market research
    if (process.env.ANTHROPIC_API_KEY) {
      const completion = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });
      response = completion.content[0].text;
      model = 'Claude Sonnet 4';
    } else if (process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000
      });
      response = completion.choices[0].message.content || '';
      model = 'OpenAI GPT-4o';
    }

    if (!response) {
      return res.status(500).json({ error: 'No API keys available' });
    }

    res.json({
      success: true,
      research: response,
      industry,
      region,
      focus,
      model,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Market research error:', error);
    res.status(500).json({ 
      error: 'Failed to generate research',
      details: error.message 
    });
  }
});

// Catch all route for SPA
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simplified IntelSphere running on port ${PORT}`);
  console.log(`🔗 Access at: http://localhost:${PORT}`);
});