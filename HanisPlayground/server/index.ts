/**
 * INTELSPHERE APEX - Unified Intelligence Command Center
 * Enterprise-grade multi-domain intelligence platform
 */

import express from 'express';
import path from 'path';
// Add CORS support
import cors from 'cors';
import { Pool } from '@neondatabase/serverless';
import { enhanced8ModelAPIManager } from './enhanced-8-model-api-manager';
import { ApexUnifiedCommandCenter } from './apex-unified-command-center';
import { ApexDeploymentValidator } from './apex-deployment-validator';

const app = express();

// Initialize database connection
const db = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Initialize APEX Command Center
const apexCommandCenter = new ApexUnifiedCommandCenter(db);
const apexValidator = new ApexDeploymentValidator(db);

// Middleware
app.use(express.json());
// Enable CORS for local development / cross-origin deployment
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3005').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.static(path.join(process.cwd(), 'dist')));

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

// === IntelSphere Landing-Page API stubs ===
// Returns simple success confirmation for unified analysis
app.post('/api/intelsphere-unified', async (req, res) => {
  const { query, modules } = req.body ?? {};
  // In production this would trigger multi-module analysis. For now, respond with mock payload.
  res.json({
    status: 'ok',
    query,
    modules,
    insights_generated: Math.floor(Math.random() * 100) + 50,
    timestamp: new Date().toISOString(),
  });
});

// Provides real-time metrics used by the dashboard
app.get('/api/intelsphere-metrics', (req, res) => {
  res.json({
    totalAnalyses: 1200 + Math.floor(Math.random() * 50),
    activeUsers: 80 + Math.floor(Math.random() * 20),
    systemLoad: 30 + Math.floor(Math.random() * 20),
    uptime: '99.9%',
    timestamp: new Date().toISOString(),
  });
});

// Simple AI assistant echo – replace with real LLM integration later
app.post('/api/ai-assistant', async (req, res) => {
  const { message } = req.body ?? {};
  res.json({
    response: `🤖 Echo from mock AI assistant: ${message}`,
    model: 'mock-gpt',
    timestamp: new Date().toISOString(),
  });
});
// === End API stubs ===

// Register APEX unified command center routes
apexCommandCenter.registerUnifiedCommandRoutes(app);

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

// APEX Deployment Validation
app.get('/api/apex/validation', async (req, res) => {
  try {
    const validation_result = await apexValidator.validateCompleteDeployment();
    res.json({
      timestamp: new Date().toISOString(),
      validation_result
    });
  } catch (error) {
    console.error('APEX validation error:', error);
    res.status(500).json({ 
      error: 'Validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// APEX Enterprise Status Summary
app.get('/api/apex/enterprise-status', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ 
      error: 'Enterprise status unavailable',
      details: error instanceof Error ? error.message : 'Status check failed'
    });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
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
      
      // Initialize APEX Command Center
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