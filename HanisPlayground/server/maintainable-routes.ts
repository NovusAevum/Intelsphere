/**
 * Maintainable Routes - Uses separated API handlers and config-based navigation
 */

import express from 'express';
import { apiHandlers } from '../routes/api-handlers';
import { dashboardEngine } from '../core/dashboard-engine';
import navigationConfig from '../config/navigation.json';

export function setupMaintainableRoutes(app: express.Application) {
  // API routes using separated handlers
  app.post('/api/chat', apiHandlers.handleChat.bind(apiHandlers));
  app.post('/api/business-analysis', apiHandlers.handleBusinessAnalysis.bind(apiHandlers));
  app.post('/api/market-research', apiHandlers.handleMarketResearch.bind(apiHandlers));
  app.get('/api/status', apiHandlers.handleSystemStatus.bind(apiHandlers));
  app.get('/api/health', apiHandlers.handleHealthCheck.bind(apiHandlers));
  app.get('/api/navigation-config', apiHandlers.handleNavigationConfig.bind(apiHandlers));
  app.post('/api/module-management', apiHandlers.handleModuleActivation.bind(apiHandlers));

  // Dynamic navigation endpoint - serves config-based navigation
  app.get('/api/navigation', (req, res) => {
    try {
      const activeNavigation = {
        primary: navigationConfig.navigation.primary.filter(item => item.active),
        secondary: navigationConfig.navigation.secondary.filter(item => item.active),
        admin: navigationConfig.navigation.admin.filter(item => item.active)
      };
      
      res.json({
        navigation: activeNavigation,
        capabilities: navigationConfig.capabilities,
        apiEndpoints: navigationConfig.apiEndpoints
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load navigation configuration' });
    }
  });

  // Config-based module status
  app.get('/api/modules', (req, res) => {
    try {
      const modules = dashboardEngine.getAllModules();
      const moduleStatus = modules.map(module => ({
        id: module.id,
        name: module.name,
        active: module.active,
        capabilities: module.capabilities,
        endpoints: module.apiEndpoints
      }));
      
      res.json({ modules: moduleStatus });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load module status' });
    }
  });

  return app;
}