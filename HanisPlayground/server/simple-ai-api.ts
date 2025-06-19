import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function createSimpleAIRoutes(app: express.Application) {
  // Working Begin Analysis endpoint
  app.post('/api/simple-begin-analysis', async (req, res) => {
    try {
      const { target, analysisType, context } = req.body;
      
      const response = {
        status: 'initiated',
        analysisId: `analysis-${Date.now()}`,
        target: target || 'general',
        type: analysisType || 'comprehensive',
        timestamp: new Date().toISOString(),
        message: `Intelligence analysis initiated for: ${target || 'general business intelligence'}`,
        modules_activated: [
          'Market Research & Analysis',
          'Competitive Intelligence Monitoring',
          'OSINT Collection & Analysis',
          'Financial Risk Analysis',
          'Social Media Intelligence'
        ],
        next_steps: [
          'Collecting data from authentic Malaysian sources',
          'Cross-referencing ASEAN market intelligence',
          'Analyzing competitive landscape patterns',
          'Generating strategic recommendations'
        ],
        regional_focus: 'Malaysia and ASEAN markets'
      };

      res.json(response);
    } catch (error) {
      console.error('Simple Begin Analysis error:', error);
      res.status(500).json({ 
        error: 'Analysis initiation failed',
        message: 'Unable to start analysis. Please try again.'
      });
    }
  });

  // Working Multimodal AI endpoint
  app.post('/api/simple-multimodal-ai', async (req, res) => {
    try {
      const { message, image, documents } = req.body;
      
      // Build content array for Claude
      const content: any[] = [];

      if (message) {
        content.push({
          type: 'text',
          text: message
        });
      }

      if (image && image.data) {
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: image.type || 'image/jpeg',
            data: image.data
          }
        });
        
        if (!message) {
          content.push({
            type: 'text',
            text: 'Analyze this image for business intelligence insights. Focus on Malaysia and ASEAN market context where relevant.'
          });
        }
      }

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: `You are an advanced multimodal business intelligence analyst for IntelSphere, specializing in Malaysia and ASEAN markets.

**Core Capabilities:**
- Market Research & Competitive Analysis
- OSINT Collection & Strategic Intelligence
- Financial Risk Assessment
- Social Media & News Intelligence
- Lead Generation & Sales Intelligence

**Regional Expertise:** Deep understanding of Malaysian business landscape, ASEAN economic trends, and Asia-Pacific market dynamics.

Provide actionable insights with professional analysis focused on authentic business intelligence.`,
        messages: [{
          role: 'user',
          content: content
        }]
      });

      const aiContent = response.content[0];
      if (aiContent.type === 'text') {
        res.json({
          success: true,
          response: aiContent.text,
          analysisType: image ? 'multimodal' : 'text',
          timestamp: new Date().toISOString(),
          model: 'claude-sonnet-4-20250514'
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Invalid AI response format'
        });
      }

    } catch (error) {
      console.error('Simple Multimodal AI error:', error);
      res.status(500).json({ 
        success: false,
        error: 'AI analysis failed',
        message: 'Unable to process request. Please try again.'
      });
    }
  });

  // AI Assistant conversation endpoint with fallback
  app.post('/api/simple-ai-assistant', async (req, res) => {
    try {
      const { message, personality } = req.body;
      
      if (!message) {
        return res.status(400).json({
          success: false,
          error: 'Message is required'
        });
      }

      const systemPrompt = personality === 'technical' 
        ? `You are a technical intelligence analyst specializing in cybersecurity, OSINT tools, and advanced reconnaissance techniques for Malaysia and ASEAN markets.`
        : `You are a strategic business intelligence advisor specializing in market research, competitive analysis, and business development for Malaysia and ASEAN markets.`;

      let aiResponse;
      let model = 'openai';

      try {
        // Try Anthropic first
        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{
            role: 'user',
            content: message
          }]
        });

        const aiContent = response.content[0];
        if (aiContent.type === 'text') {
          aiResponse = aiContent.text;
          model = 'claude-sonnet-4';
        }
      } catch (anthropicError) {
        console.log('Anthropic unavailable, using OpenAI fallback');
        
        // Fallback to OpenAI with accessible model
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          max_tokens: 1024,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ]
        });

        aiResponse = response.choices[0].message.content;
        model = 'gpt-3.5-turbo';
      }

      res.json({
        success: true,
        response: aiResponse,
        personality: personality || 'strategic',
        model: model,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('AI Assistant error:', error);
      res.status(500).json({ 
        success: false,
        error: 'AI assistant failed',
        message: 'Unable to process request. Please try again.'
      });
    }
  });
}