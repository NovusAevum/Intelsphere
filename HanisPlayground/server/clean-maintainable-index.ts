/**
 * Clean Maintainable IntelSphere Server
 * Separated logic, config-based navigation, smart port allocation
 */

import express from 'express';
import path from 'path';
import { enhanced8ModelAPIManager } from './enhanced-8-model-api-manager';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Core API endpoints using clean separation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'cohere' } = req.body;
    const result = await enhanced8ModelAPIManager.chatCompletion(message, model);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Chat service error' });
  }
});

app.post('/api/business-analysis', async (req, res) => {
  try {
    const { company, analysisType, model = 'cohere' } = req.body;
    const result = await enhanced8ModelAPIManager.businessAnalysis(company, analysisType, model);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Business analysis service error' });
  }
});

app.post('/api/market-research', async (req, res) => {
  try {
    const { industry, region, focus, model = 'cohere' } = req.body;
    const result = await enhanced8ModelAPIManager.marketResearch(industry, region, focus, model);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Market research service error' });
  }
});

// Navigation configuration endpoint
app.get('/api/navigation-config', (req, res) => {
  const navigationConfig = {
    navigation: {
      primary: [
        {
          id: 'ai-chat',
          label: 'AI Chat',
          path: '/chat',
          icon: '🤖',
          component: 'AIChatPage',
          description: 'Engage with advanced AI models',
          active: true,
          order: 1
        },
        {
          id: 'business-intelligence',
          label: 'Business Intelligence',
          path: '/business',
          icon: '📊',
          component: 'BusinessIntelligencePage',
          description: 'Comprehensive business analysis',
          active: true,
          order: 2
        },
        {
          id: 'market-research',
          label: 'Market Research',
          path: '/research',
          icon: '🔍',
          component: 'MarketResearchPage',
          description: 'In-depth market analysis',
          active: true,
          order: 3
        }
      ],
      secondary: [
        {
          id: 'osint-intelligence',
          label: 'OSINT Intelligence',
          path: '/osint',
          icon: '🕵️',
          component: 'OSINTPage',
          description: 'Open Source Intelligence gathering',
          active: false,
          order: 4
        }
      ],
      admin: [
        {
          id: 'system-status',
          label: 'System Status',
          path: '/status',
          icon: '⚙️',
          component: 'SystemStatusPage',
          description: 'System health and diagnostics',
          active: true,
          order: 98
        }
      ]
    }
  };
  
  res.json(navigationConfig);
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
  const activeServices = Object.values(serviceStatus).filter(Boolean).length;
  
  res.json({
    status: activeServices > 0 ? 'healthy' : 'degraded',
    services: {
      active: activeServices,
      total: 8,
      details: serviceStatus
    },
    modules: {
      active: 3,
      total: 5
    },
    issues: activeServices === 0 ? ['No AI services active'] : [],
    timestamp: new Date().toISOString()
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Smart port allocation
function startServer() {
  let port = 3005;
  
  function tryPort() {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log('🚀 IntelSphere running on port', port);
      console.log('🔗 Access at: http://localhost:' + port);
      console.log('🤖 AI Services: OpenAI=true, Anthropic=true');
      
      // Initialize and log service status
      enhanced8ModelAPIManager.refreshAllServices().then(() => {
        const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
        const activeCount = Object.values(serviceStatus).filter(Boolean).length;
        console.log(`🤖 AI Services Status: ${activeCount}/8 active`);
        console.log('📊 Service Details:', serviceStatus);
      });
    });
    
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying next port...`);
        port++;
        if (port > 3020) {
          console.error('No available ports found');
          process.exit(1);
        }
        tryPort();
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  }
  
  tryPort();
}

startServer();