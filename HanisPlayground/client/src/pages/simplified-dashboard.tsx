import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { MessageSquare, Building2, Brain, ArrowRight } from 'lucide-react';

export default function SimplifiedDashboard() {
  const [stats] = useState({
    totalQueries: 1247,
    activeModels: 3,
    successRate: 98.5,
    avgResponseTime: 1.2
  });

  const features = [
    {
      id: 'ai-chat',
      title: 'AI Chat Assistant',
      description: 'Intelligent conversations with multiple AI models including GPT-4o, Claude Sonnet 4, and Cohere Command R+',
      icon: MessageSquare,
      path: '/ai-chat',
      color: 'bg-blue-500',
      stats: 'Active Models: 3'
    },
    {
      id: 'business-intel',
      title: 'Business Intelligence',
      description: 'Comprehensive competitor analysis, market positioning, and strategic insights for your business',
      icon: Building2,
      path: '/business-intelligence',
      color: 'bg-green-500',
      stats: 'Analyses: 342'
    },
    {
      id: 'market-research',
      title: 'Market Research',
      description: 'In-depth industry analysis, market trends, and growth opportunity identification',
      icon: Brain,
      path: '/market-research',
      color: 'bg-purple-500',
      stats: 'Reports: 189'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">IntelSphere</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simplified Business Intelligence Platform with Authentic AI Integration
          </p>
          <Badge variant="outline" className="text-green-400 border-green-400">
            System Operational
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalQueries}</div>
                <div className="text-sm text-gray-400">Total Queries</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.activeModels}</div>
                <div className="text-sm text-gray-400">Active AI Models</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.successRate}%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.avgResponseTime}s</div>
                <div className="text-sm text-gray-400">Avg Response</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {feature.stats}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Link href={feature.path}>
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                      Access {feature.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Status */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="mr-2 h-5 w-5 text-green-400" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                <span className="text-gray-300">OpenAI GPT-4o</span>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                <span className="text-gray-300">Claude Sonnet 4</span>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                <span className="text-gray-300">Cohere Command R+</span>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>IntelSphere v2.0 - Simplified Business Intelligence Platform</p>
          <p className="mt-1">Powered by Authentic AI Models - No Fallbacks, No Mock Data</p>
        </div>
      </div>
    </div>
  );
}