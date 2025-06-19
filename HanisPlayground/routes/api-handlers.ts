/**
 * API Route Handlers - Separated from main server logic
 * Handles all API endpoint routing and request processing
 */

import { Request, Response } from 'express';
import { dashboardEngine } from '../core/dashboard-engine';
import { enhanced8ModelAPIManager } from '../server/enhanced-8-model-api-manager';

export class APIHandlers {
  
  // Chat endpoint handler
  async handleChat(req: Request, res: Response) {
    try {
      const { message, model = 'cohere' } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          error: 'Message is required and must be a string' 
        });
      }

      const result = await enhanced8ModelAPIManager.chatCompletion(message, model);
      
      // Update service status
      dashboardEngine.updateServiceStatus(model, {
        name: model,
        active: result.serviceActive || false,
        model: result.model,
        responseTime: 0
      });

      res.json(result);
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        serviceActive: false 
      });
    }
  }

  // Business analysis endpoint handler
  async handleBusinessAnalysis(req: Request, res: Response) {
    try {
      const { company, analysisType, model = 'cohere' } = req.body;
      
      if (!company || !analysisType) {
        return res.status(400).json({ 
          error: 'Company and analysis type are required' 
        });
      }

      const result = await enhanced8ModelAPIManager.businessAnalysis(
        company, 
        analysisType, 
        model
      );
      
      res.json(result);
    } catch (error) {
      console.error('Business analysis API error:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  // Market research endpoint handler
  async handleMarketResearch(req: Request, res: Response) {
    try {
      const { industry, region, focus, model = 'cohere' } = req.body;
      
      if (!industry || !region) {
        return res.status(400).json({ 
          error: 'Industry and region are required' 
        });
      }

      const result = await enhanced8ModelAPIManager.marketResearch(
        industry, 
        region, 
        focus || 'general-analysis', 
        model
      );
      
      res.json(result);
    } catch (error) {
      console.error('Market research API error:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  // System status endpoint handler
  async handleSystemStatus(req: Request, res: Response) {
    try {
      const dashboardConfig = dashboardEngine.generateDashboardConfig();
      const healthCheck = await dashboardEngine.performHealthCheck();
      const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();

      res.json({
        dashboard: dashboardConfig,
        health: healthCheck,
        services: serviceStatus,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Status API error:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  // Navigation configuration endpoint
  async handleNavigationConfig(req: Request, res: Response) {
    try {
      const config = dashboardEngine.generateDashboardConfig();
      res.json({
        navigation: config.navigation,
        modules: config.modules,
        capabilities: config.capabilities
      });
    } catch (error) {
      console.error('Navigation config API error:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }

  // Health check endpoint
  async handleHealthCheck(req: Request, res: Response) {
    try {
      const health = await dashboardEngine.performHealthCheck();
      const serviceStatus = enhanced8ModelAPIManager.getServiceStatus();
      
      res.json({
        status: health.overall,
        services: {
          active: health.services,
          total: Object.keys(serviceStatus).length,
          details: serviceStatus
        },
        modules: {
          active: health.modules,
          total: dashboardEngine.getAllModules().length
        },
        issues: health.issues,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Health check API error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        status: 'critical'
      });
    }
  }

  // Module management endpoints
  async handleModuleActivation(req: Request, res: Response) {
    try {
      const { moduleId, action } = req.body;
      
      if (!moduleId || !action) {
        return res.status(400).json({ 
          error: 'Module ID and action are required' 
        });
      }

      let success = false;
      if (action === 'activate') {
        success = dashboardEngine.activateModule(moduleId);
      } else if (action === 'deactivate') {
        success = dashboardEngine.deactivateModule(moduleId);
      }

      if (success) {
        res.json({ 
          success: true, 
          message: `Module ${moduleId} ${action}d successfully` 
        });
      } else {
        res.status(404).json({ 
          error: 'Module not found' 
        });
      }
    } catch (error) {
      console.error('Module management API error:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
  }
}

export const apiHandlers = new APIHandlers();