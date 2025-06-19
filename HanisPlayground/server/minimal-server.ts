import express from 'express';
import { createServer } from 'http';
import { pureAuthentic8ModelProcessor } from './pure-authentic-8-model-system';

async function startMinimalServer() {
  const app = express();
  
  // Middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.static('dist'));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'operational',
      system: 'pure-authentic-8-model',
      timestamp: new Date().toISOString()
    });
  });

  // Pure Authentic 8-Model AI endpoint
  app.post('/api/revolutionary-ai', async (req, res) => {
    try {
      const { message, personality = 'strategic', format = 'comprehensive' } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      console.log('🚀 Processing with Pure Authentic 8-Model System...');
      const result = await pureAuthentic8ModelProcessor.processQuery(message, { personality, format });
      
      res.json({
        success: true,
        queryId: result.queryId,
        response: result.response,
        modelsProcessed: result.modelsProcessed,
        workingModels: result.workingModels,
        successfulModels: result.successfulModels,
        totalModels: result.totalModels,
        uniquenessScore: result.uniquenessScore,
        architecture: result.architecture,
        processingMetrics: result.processingMetrics,
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('Pure Authentic AI error:', error);
      
      if (error.message.includes('AUTHENTIC DATA VIOLATION')) {
        res.status(503).json({ 
          error: 'Authentic API models unavailable - system requires working API keys',
          details: error.message,
          solution: 'Please provide valid API keys for at least one AI model'
        });
      } else {
        res.status(500).json({ 
          error: 'Revolutionary AI system error',
          details: error.message 
        });
      }
    }
  });

  // Enhanced chat endpoint
  app.post('/api/enhanced-chat', async (req, res) => {
    try {
      const { message, model = 'auto' } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const result = await pureAuthentic8ModelProcessor.processQuery(message, { 
        personality: 'conversational',
        format: 'chat'
      });
      
      res.json({
        success: true,
        response: result.response,
        model: result.workingModels[0] || 'system',
        timestamp: result.timestamp
      });
      
    } catch (error: any) {
      console.error('Enhanced chat error:', error);
      res.status(500).json({ 
        error: 'Chat system error',
        details: error.message 
      });
    }
  });

  // Try multiple ports starting from 3001
  const tryPort = async (port: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const server = createServer(app);
      server.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Pure Authentic 8-Model System running on port ${port}`);
        console.log(`🚫 ZERO FALLBACKS - 100% Authentic API responses only`);
        resolve(port);
      }).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE' && port < 3010) {
          resolve(tryPort(port + 1));
        } else {
          reject(err);
        }
      });
    });
  };

  await tryPort(3001);
}

startMinimalServer().catch(console.error);