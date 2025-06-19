/**
 * Maintainable Server Architecture
 * Implements separated logic, config-based navigation, and proper port management
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { enhanced8ModelAPIManager } from './enhanced-8-model-api-manager';
import { apiHandlers } from '../routes/api-handlers';
import { dashboardEngine } from '../core/dashboard-engine';
import navigationConfig from '../config/navigation.json';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Initialize dashboard engine with service statuses
async function initializePlatform() {
  console.log('🔄 Initializing IntelSphere platform...');
  
  // Get service status from API manager
  const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
  
  // Update dashboard engine with service statuses
  Object.entries(serviceStatus).forEach(([service, active]) => {
    dashboardEngine.updateServiceStatus(service, {
      name: service,
      active: active as boolean,
      lastCheck: new Date()
    });
  });
  
  console.log('✅ Platform initialization complete');
}

// Config-based API routes using separated handlers
function setupAPIRoutes() {
  // Core AI functionality
  app.post('/api/chat', apiHandlers.handleChat.bind(apiHandlers));
  app.post('/api/business-analysis', apiHandlers.handleBusinessAnalysis.bind(apiHandlers));
  app.post('/api/market-research', apiHandlers.handleMarketResearch.bind(apiHandlers));
  
  // System monitoring
  app.get('/api/status', apiHandlers.handleSystemStatus.bind(apiHandlers));
  app.get('/api/health', apiHandlers.handleHealthCheck.bind(apiHandlers));
  
  // Config-based navigation
  app.get('/api/navigation-config', (req, res) => {
    try {
      res.json({
        navigation: navigationConfig.navigation,
        capabilities: navigationConfig.capabilities,
        apiEndpoints: navigationConfig.apiEndpoints
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load navigation configuration' });
    }
  });
  
  // Dynamic module management
  app.get('/api/modules', (req, res) => {
    try {
      const modules = dashboardEngine.getAllModules();
      res.json({ modules });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load modules' });
    }
  });
  
  app.post('/api/module-management', apiHandlers.handleModuleActivation.bind(apiHandlers));
}

// Serve React app for all non-API routes
function setupClientRoutes() {
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });
}

// Smart port allocation to avoid conflicts
async function findAvailablePort(startPort: number = 3005): Promise<number> {
  const net = await import('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = (server.address() as any)?.port;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      if (startPort < 3020) {
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(new Error('No available ports found'));
      }
    });
  });
}

// Start server with proper error handling
async function startMaintainableServer() {
  try {
    await initializePlatform();
    setupAPIRoutes();
    setupClientRoutes();
    
    const port = await findAvailablePort();
    
    app.listen(port, '0.0.0.0', () => {
      console.log('🚀 IntelSphere running on port', port);
      console.log('🔗 Access at: http://localhost:' + port);
      
      // Log service status
      const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
      const activeServices = Object.values(serviceStatus).filter(Boolean).length;
      console.log(`🤖 AI Services Status: ${activeServices}/8 active`);
      console.log('📊 Service Details:', serviceStatus);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Server shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🔄 Server shutting down gracefully...');
  process.exit(0);
});

// Start the server
startMaintainableServer();

export { app };