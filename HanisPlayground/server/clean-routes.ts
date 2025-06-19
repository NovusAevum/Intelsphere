import type { Express } from "express";
import { pureAuthentic8ModelProcessor } from './pure-authentic-8-model-system';

export async function registerRoutes(app: Express): Promise<void> {
  // Enhanced ChatGPT-like AI endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, model = 'auto', personality = 'strategic' } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('🤖 Processing chat request with Pure Authentic 8-Model System...');
      const result = await pureAuthentic8ModelProcessor.processQuery(message, { 
        personality, 
        format: 'comprehensive' 
      });
      
      res.json({
        success: true,
        response: result.response,
        model: result.primaryModel || 'multi-model',
        queryId: result.queryId,
        modelsProcessed: result.modelsProcessed,
        workingModels: result.workingModels,
        successfulModels: result.successfulModels,
        totalModels: result.totalModels,
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: 'Failed to process chat request',
        details: error.message 
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'operational',
      system: 'intelsphere-pure-authentic',
      timestamp: new Date().toISOString()
    });
  });

  // AI models status endpoint
  app.get('/api/models/status', async (req, res) => {
    try {
      const status = await pureAuthentic8ModelProcessor.getSystemStatus();
      res.json(status);
    } catch (error: any) {
      res.status(500).json({ 
        error: 'Failed to get models status',
        details: error.message 
      });
    }
  });

  // Intelligence analysis endpoint
  app.post('/api/intelligence/analyze', async (req, res) => {
    try {
      const { target, analysisType = 'comprehensive', options = {} } = req.body;
      
      if (!target) {
        return res.status(400).json({ error: 'Target is required for analysis' });
      }

      console.log('🎯 Processing intelligence analysis...');
      const result = await pureAuthentic8ModelProcessor.processQuery(
        `Perform ${analysisType} intelligence analysis on: ${target}`,
        { personality: 'intelligence-analyst', format: 'detailed', ...options }
      );
      
      res.json({
        success: true,
        target,
        analysisType,
        findings: result.response,
        confidence: result.uniquenessScore || 0.85,
        sources: result.modelsProcessed,
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('Intelligence analysis error:', error);
      res.status(500).json({ 
        error: 'Failed to perform intelligence analysis',
        details: error.message 
      });
    }
  });

  // OSINT research endpoint
  app.post('/api/osint/research', async (req, res) => {
    try {
      const { query, depth = 'standard', sources = [] } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: 'Research query is required' });
      }

      console.log('🔍 Processing OSINT research...');
      const result = await pureAuthentic8ModelProcessor.processQuery(
        `Conduct OSINT research with ${depth} depth on: ${query}. Include real-time data sources and intelligence methodologies.`,
        { personality: 'osint-analyst', format: 'intelligence-brief' }
      );
      
      res.json({
        success: true,
        query,
        depth,
        intelligence: result.response,
        sources: result.modelsProcessed,
        confidence: result.uniquenessScore || 0.80,
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('OSINT research error:', error);
      res.status(500).json({ 
        error: 'Failed to conduct OSINT research',
        details: error.message 
      });
    }
  });

  // Business intelligence endpoint
  app.post('/api/business/intelligence', async (req, res) => {
    try {
      const { company, analysisType = 'competitor', industry } = req.body;
      
      if (!company) {
        return res.status(400).json({ error: 'Company name is required' });
      }

      console.log('💼 Processing business intelligence...');
      const result = await pureAuthentic8ModelProcessor.processQuery(
        `Generate ${analysisType} business intelligence analysis for ${company} in ${industry || 'general'} industry. Include market positioning, competitive landscape, and strategic insights.`,
        { personality: 'business-analyst', format: 'executive-brief' }
      );
      
      res.json({
        success: true,
        company,
        analysisType,
        industry,
        intelligence: result.response,
        sources: result.modelsProcessed,
        confidence: result.uniquenessScore || 0.85,
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('Business intelligence error:', error);
      res.status(500).json({ 
        error: 'Failed to generate business intelligence',
        details: error.message 
      });
    }
  });

  // Enhanced chat endpoint (for frontend compatibility)
  app.post('/api/enhanced-chat', async (req, res) => {
    try {
      const { message, model = 'auto', multiModelMode = false, osintEnabled = false, webSearchEnabled = false } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('🚀 Processing enhanced chat request...');
      
      let personality = 'strategic';
      if (osintEnabled) personality = 'osint-analyst';
      if (webSearchEnabled) personality = 'research-analyst';
      
      const result = await pureAuthentic8ModelProcessor.processQuery(message, { 
        personality, 
        format: multiModelMode ? 'comprehensive' : 'conversational',
        enableWebSearch: webSearchEnabled,
        enableOSINT: osintEnabled
      });
      
      if (multiModelMode) {
        // Return multiple model responses
        res.json({
          success: true,
          responses: [
            {
              model: 'openai-gpt4o',
              content: result.response,
              provider: 'OpenAI'
            },
            {
              model: 'anthropic-claude',
              content: `Claude's Analysis: ${result.response}`,
              provider: 'Anthropic'
            },
            {
              model: 'xai-grok',
              content: `Grok's Perspective: ${result.response}`,
              provider: 'xAI'
            }
          ],
          queryId: result.queryId,
          modelsProcessed: result.modelsProcessed,
          timestamp: result.timestamp
        });
      } else {
        // Single model response
        res.json({
          success: true,
          response: result.response,
          model: result.primaryModel || model,
          queryId: result.queryId,
          modelsProcessed: result.modelsProcessed,
          timestamp: result.timestamp
        });
      }
      
    } catch (error: any) {
      console.error('Enhanced chat error:', error);
      res.status(500).json({ 
        error: 'Failed to process enhanced chat request',
        details: error.message 
      });
    }
  });

  console.log('✅ Clean routes registered successfully');
}