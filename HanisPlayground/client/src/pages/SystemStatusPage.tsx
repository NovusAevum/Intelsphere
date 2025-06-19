/**
 * System Status Page - Health monitoring and diagnostics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceStatus {
  name: string;
  active: boolean;
  model?: string;
  responseTime?: number;
  lastCheck: Date;
}

interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'critical';
  services: number;
  modules: number;
  issues: string[];
}

export default function SystemStatusPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [services, setServices] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealthStatus(data);
      setServices(data.services?.details || {});
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">System Status</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Status</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Health</span>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(healthStatus?.overall || 'unknown')}`}></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize mb-2">
                {healthStatus?.overall || 'Unknown'}
              </div>
              <p className="text-gray-400 text-sm">
                System operational status
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {healthStatus?.services || 0} / 8
              </div>
              <p className="text-gray-400 text-sm">
                AI services connected
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Active Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {healthStatus?.modules || 0}
              </div>
              <p className="text-gray-400 text-sm">
                Platform modules available
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>AI Services Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(services).map(([service, active]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="capitalize">{service}</span>
                    <Badge variant={active ? "default" : "secondary"}>
                      {active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>System Issues</CardTitle>
            </CardHeader>
            <CardContent>
              {healthStatus?.issues && healthStatus.issues.length > 0 ? (
                <div className="space-y-2">
                  {healthStatus.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-green-400 text-center py-4">
                  No critical issues detected
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}