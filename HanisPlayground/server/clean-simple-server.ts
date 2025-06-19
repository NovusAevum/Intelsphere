import express from 'express';
import cors from 'cors';
import path from 'path';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// AI Client Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'openai' } = req.body;

    let response = '';

    if (model === 'anthropic') {
      const completion = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: message }],
      });
      
      const content = completion.content[0];
      response = content.type === 'text' ? content.text : 'Response generated successfully';
    } else {
      // Default to OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: message }],
        max_tokens: 1000,
      });
      
      response = completion.choices[0].message.content || 'Response generated successfully';
    }

    res.json({ response, model });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Business Intelligence Analysis endpoint
app.post('/api/business-analysis', async (req, res) => {
  try {
    const { company, analysisType, model = 'openai' } = req.body;

    const prompt = `Provide a comprehensive ${analysisType} analysis for ${company}. Include:
    - Market position and competitive landscape
    - Key strengths and opportunities
    - Risk factors and challenges
    - Strategic recommendations
    - Financial outlook (if applicable)
    
    Please provide detailed, actionable insights.`;

    let analysis = '';

    if (model === 'anthropic') {
      const completion = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });
      
      const content = completion.content[0];
      analysis = content.type === 'text' ? content.text : 'Analysis completed successfully';
    } else {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      });
      
      analysis = completion.choices[0].message.content || 'Analysis completed successfully';
    }

    res.json({
      success: true,
      analysis,
      company,
      analysisType,
      model,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Business analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate business analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Market Research endpoint
app.post('/api/market-research', async (req, res) => {
  try {
    const { industry, region, focus, model = 'openai' } = req.body;

    const prompt = `Conduct comprehensive market research for the ${industry} industry in ${region} with focus on ${focus}. Include:
    - Market size and growth trends
    - Key players and competitive dynamics
    - Consumer behavior and preferences
    - Emerging opportunities and threats
    - Technology and innovation trends
    - Regulatory considerations
    - Market entry strategies
    
    Provide data-driven insights with actionable recommendations.`;

    let research = '';

    if (model === 'anthropic') {
      const completion = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });
      
      const content = completion.content[0];
      research = content.type === 'text' ? content.text : 'Research completed successfully';
    } else {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      });
      
      research = completion.choices[0].message.content || 'Research completed successfully';
    }

    res.json({
      success: true,
      research,
      industry,
      region,
      focus,
      model,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Market research error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate market research',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY
    }
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 IntelSphere running on port ${PORT}`);
  console.log(`🔗 Access at: http://localhost:${PORT}`);
  console.log(`🤖 AI Services: OpenAI=${!!process.env.OPENAI_API_KEY}, Anthropic=${!!process.env.ANTHROPIC_API_KEY}`);
});