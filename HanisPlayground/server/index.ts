/**
 * INTELSPHERE APEX - Unified Intelligence Command Center
 * Enterprise-grade multi-domain intelligence platform
 */

import express from 'express';
import path from 'path';
import { Pool } from '@neondatabase/serverless';

// Initialize database connection (optional)
let db: Pool | null = null;
try {
  if (process.env.DATABASE_URL) {
    db = new Pool({ 
      connectionString: process.env.DATABASE_URL 
    });
    console.log('✅ Database connection initialized');
  } else {
    console.log('⚠️  No DATABASE_URL provided, running in demo mode');
  }
} catch (error) {
  console.log('⚠️  Database connection failed, running in demo mode');
}

// Initialize APEX Command Center (optional)
let apexCommandCenter: any = null;
let apexValidator: any = null;

try {
  if (db) {
    const { ApexUnifiedCommandCenter } = await import('./apex-unified-command-center');
    const { ApexDeploymentValidator } = await import('./apex-deployment-validator');
    apexCommandCenter = new ApexUnifiedCommandCenter(db);
    apexValidator = new ApexDeploymentValidator(db);
    console.log('✅ APEX Command Center initialized');
  }
} catch (error) {
  console.log('⚠️  APEX Command Center initialization failed, running in basic mode');
}

// Initialize AI services (optional)
let enhanced8ModelAPIManager: any = null;

try {
  if (process.env.OPENAI_API_KEY || process.env.COHERE_API_KEY) {
    const { enhanced8ModelAPIManager: manager } = await import('./enhanced-8-model-api-manager');
    enhanced8ModelAPIManager = manager;
    console.log('✅ AI services initialized');
  } else {
    console.log('⚠️  No AI API keys provided, running in demo mode');
  }
} catch (error) {
  console.log('⚠️  AI services initialization failed, running in demo mode');
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('dist/public'));

// Core API endpoints with fallback
app.post('/api/chat', async (req, res) => {
  try {
    if (enhanced8ModelAPIManager) {
      const { message, model = 'cohere' } = req.body;
      const result = await enhanced8ModelAPIManager.chatCompletion(message, model);
      res.json(result);
    } else {
      // Fallback demo response
      res.json({
        response: `Demo mode: I'm a simulated AI assistant. You said: "${req.body.message}". In production, this would connect to real AI services.`,
        model: 'demo',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Chat service error' });
  }
});

app.post('/api/business-analysis', async (req, res) => {
  try {
    if (enhanced8ModelAPIManager) {
      const { company, analysisType, model = 'cohere' } = req.body;
      const result = await enhanced8ModelAPIManager.businessAnalysis(company, analysisType, model);
      res.json(result);
    } else {
      // Fallback demo response
      res.json({
        analysis: `Demo mode: Business analysis for ${req.body.company} (${req.body.analysisType}). In production, this would provide real AI-powered insights.`,
        model: 'demo',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Business analysis service error' });
  }
});

app.post('/api/market-research', async (req, res) => {
  try {
    if (enhanced8ModelAPIManager) {
      const { industry, region, focus, model = 'cohere' } = req.body;
      const result = await enhanced8ModelAPIManager.marketResearch(industry, region, focus, model);
      res.json(result);
    } else {
      // Fallback demo response
      res.json({
        research: `Demo mode: Market research for ${req.body.industry} in ${req.body.region} focusing on ${req.body.focus}. In production, this would provide real market intelligence.`,
        model: 'demo',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Market research service error' });
  }
});

// Register APEX unified command center routes (if available)
if (apexCommandCenter) {
  try {
    apexCommandCenter.registerUnifiedCommandRoutes(app);
  } catch (error) {
    console.log('⚠️  APEX routes registration failed');
  }
}

// Navigation configuration endpoint (config-based)
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
        },
        {
          id: 'osint-intelligence',
          label: 'OSINT Intelligence',
          path: '/osint',
          icon: '🕵️',
          component: 'OSINTPage',
          description: 'Open Source Intelligence gathering',
          active: true,
          order: 4
        },
        {
          id: 'neural-network',
          label: 'Neural Network',
          path: '/neural-network',
          icon: '🧠',
          component: 'NeuralNetwork',
          description: 'AI neural network visualization',
          active: true,
          order: 5
        }
      ],
      secondary: [
        {
          id: 'sales-intelligence',
          label: 'Sales Intelligence',
          path: '/sales-intelligence',
          icon: '💰',
          component: 'SalesIntelligence',
          description: 'Advanced sales analytics',
          active: true,
          order: 6
        },
        {
          id: 'social-media-intel',
          label: 'Social Media Intel',
          path: '/social-media-intel',
          icon: '📱',
          component: 'SocialMediaIntelligence',
          description: 'Social media intelligence',
          active: true,
          order: 7
        }
      ],
      admin: [
        {
          id: 'ai-control-deck',
          label: 'AI Control Deck',
          path: '/console',
          icon: '🧠',
          component: 'AIControlDeck',
          description: 'AI system architecture and operational control',
          active: true,
          order: 97
        },
        {
          id: 'apex-dashboard',
          label: 'APEX Command Center',
          path: '/apex',
          icon: '⚡',
          component: 'ApexIntelligenceDashboard',
          description: 'Unified intelligence command center',
          active: true,
          order: 96
        },
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
  const serviceStatus = enhanced8ModelAPIManager ? enhanced8ModelAPIManager.getServiceStatus() : null;
  const activeServices = serviceStatus ? Object.values(serviceStatus).filter(Boolean).length : 0;
  
  res.json({
    status: enhanced8ModelAPIManager ? (activeServices > 0 ? 'healthy' : 'degraded') : 'demo',
    mode: enhanced8ModelAPIManager ? 'production' : 'demo',
    services: {
      active: activeServices,
      total: 8,
      details: serviceStatus || 'Demo mode - no external services'
    },
    modules: {
      active: 3,
      total: 5
    },
    issues: enhanced8ModelAPIManager ? (activeServices === 0 ? ['No AI services active'] : []) : ['Running in demo mode'],
    timestamp: new Date().toISOString()
  });
});

// APEX Deployment Validation (if available)
app.get('/api/apex/validation', async (req, res) => {
  try {
    if (apexValidator) {
      const validation_result = await apexValidator.validateCompleteDeployment();
      res.json({
        timestamp: new Date().toISOString(),
        validation_result
      });
    } else {
      res.json({
        timestamp: new Date().toISOString(),
        validation_result: 'Demo mode - APEX validation not available'
      });
    }
  } catch (error) {
    console.error('APEX validation error:', error);
    res.status(500).json({ 
      error: 'Validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// APEX Enterprise Status Summary (if available)
app.get('/api/apex/enterprise-status', async (req, res) => {
  try {
    if (apexCommandCenter) {
      const command_status = await apexCommandCenter.getCommandCenterStatus();
      const domains = await apexCommandCenter.getAvailableDomains();
      const sources = await apexCommandCenter.getIntelligenceSources();
      
      res.json({
        enterprise_readiness: {
          operational_status: command_status.operational_readiness > 0.8 ? 'ready' : 'partial',
          command_center: command_status,
          active_domains: domains.domains.filter((d: any) => d.status === 'active').length,
          total_domains: domains.domains.length,
          intelligence_sources: sources.total_sources,
          last_updated: new Date().toISOString()
        }
      });
    } else {
      res.json({
        enterprise_readiness: {
          operational_status: 'demo',
          command_center: 'Demo mode - APEX not available',
          active_domains: 0,
          total_domains: 0,
          intelligence_sources: 0,
          last_updated: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Enterprise status unavailable',
      details: error instanceof Error ? error.message : 'Status check failed'
    });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
});

// Smart port allocation with stability improvements
function startServer() {
  let port = 3005;
  let serverInstance: any = null;
  
  // Cleanup any existing server instances
  process.on('SIGTERM', () => {
    if (serverInstance) {
      serverInstance.close();
    }
  });
  
  function tryPort() {
    serverInstance = app.listen(port, '0.0.0.0', () => {
      console.log('🚀 IntelSphere APEX running on port', port);
      console.log('🔗 Platform URL: http://localhost:' + port);
      console.log('🔗 AI Control Deck: http://localhost:' + port + '/console');
      
      if (enhanced8ModelAPIManager) {
        console.log('🔍 INTELSPHERE APEX Command Center operational');
        console.log('📊 Multi-domain intelligence coordination active');
        console.log('🎯 Enterprise-grade operational intelligence ready');
        
        // Initialize service status check (non-blocking)
        setTimeout(() => {
          enhanced8ModelAPIManager.refreshAllServices().then(() => {
            const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
            const activeCount = Object.values(serviceStatus).filter(Boolean).length;
            console.log(`🤖 AI Services Status: ${activeCount}/8 active`);
          }).catch(err => {
            console.log('⚠️  Service status check deferred');
          });
        }, 2000);
      } else {
        console.log('🎭 INTELSPHERE APEX running in DEMO MODE');
        console.log('📊 All features available with simulated data');
        console.log('🎯 No external API keys required for basic functionality');
      }
    });
    
    serverInstance.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying port ${port + 1}...`);
        port++;
        if (port > 3020) {
          console.error('❌ No available ports found in range 3005-3020');
          process.exit(1);
        }
        tryPort();
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });
  }
  
  tryPort();
}

startServer();