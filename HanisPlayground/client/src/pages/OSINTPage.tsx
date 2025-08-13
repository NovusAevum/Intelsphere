/**
 * OSINT Intelligence Page - Open Source Intelligence gathering interface
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  Search, Globe, Shield, Activity, Database, Eye, 
  TrendingUp, Users, Target, AlertTriangle 
} from 'lucide-react';

export default function OSINTPage() {
  const osintModules = [
    {
      id: 'reconnaissance',
      name: 'Digital Reconnaissance',
      icon: Search,
      description: 'Advanced digital footprinting and reconnaissance',
      status: 'Active',
      path: '/osint/reconnaissance'
    },
    {
      id: 'social-intel',
      name: 'Social Intelligence',
      icon: Users,
      description: 'Social media intelligence and monitoring',
      status: 'Active', 
      path: '/social'
    },
    {
      id: 'threat-intel',
      name: 'Threat Intelligence',
      icon: Shield,
      description: 'Threat detection and analysis',
      status: 'Active',
      path: '/threats'
    },
    {
      id: 'market-intel',
      name: 'Market Intelligence',
      icon: TrendingUp,
      description: 'Competitive intelligence and market analysis',
      status: 'Active',
      path: '/research'
    }
  ];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            OSINT Intelligence Center
          </h1>
          <p className="text-gray-400 text-lg">
            Open Source Intelligence gathering and analysis platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {osintModules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-blue-400" />
                      <span>{module.name}</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {module.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{module.description}</p>
                  <Link href={module.path}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Access Module
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-purple-400" />
              <span>OSINT Capabilities Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">47</div>
                <div className="text-sm text-gray-400">Data Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">1,247</div>
                <div className="text-sm text-gray-400">Intelligence Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">89</div>
                <div className="text-sm text-gray-400">Active Monitors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Surveillance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}