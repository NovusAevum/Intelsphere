import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, Search, Globe, Shield, Database, Users,
  Download, Zap, AlertTriangle, Lock, ExternalLink
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function OSINTSalesMarketing() {
  const [osintQuery, setOsintQuery] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);

  const osintAnalysis = useMutation({
    mutationFn: async (data: { query: string, type: string }) => {
      const response = await fetch('/api/osint-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsInvestigating(false);
    }
  });

  const handleOSINTAnalysis = () => {
    if (osintQuery.trim()) {
      setIsInvestigating(true);
      osintAnalysis.mutate({ 
        query: osintQuery,
        type: 'comprehensive'
      });
    }
  };

  const osintTools = [
    {
      category: 'Social Media Reconnaissance',
      tools: ['Social Searcher', 'EchoSec'],
      status: 'active',
      description: 'Monitor social platforms for customer and competitor intelligence'
    },
    {
      category: 'Domain & Tech Stack Intel',
      tools: ['BuiltWith', 'Hunter', 'WhoisXML API'],
      status: 'configured',
      description: 'Analyze website technologies and domain information'
    },
    {
      category: 'People Search',
      tools: ['Pipl', 'Spokeo', 'TruePeopleSearch'],
      status: 'pending',
      description: 'Professional background and contact information research'
    },
    {
      category: 'Company Due Diligence',
      tools: ['OpenCorporates', 'Crunchbase'],
      status: 'active',
      description: 'Corporate structure and financial intelligence'
    },
    {
      category: 'Data Leak & Security Checks',
      tools: ['HaveIBeenPwned', 'Intelligence X'],
      status: 'active',
      description: 'Security breach monitoring and data exposure analysis'
    },
    {
      category: 'Advanced Search Engines',
      tools: ['IntelTechniques', 'Yandex', 'Censys', 'Shodan'],
      status: 'configured',
      description: 'Specialized search engines for deep intelligence gathering'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <GoBackButton className="mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent mb-4">
            OSINT for Sales & Marketing
          </h1>
          <p className="text-slate-300 text-lg">
            Collect actionable public data for competitive and customer intelligence
          </p>
        </div>

        {/* OSINT Command Center */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-red-400" />
              Intelligence Gathering Command Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter company, person, or domain for comprehensive OSINT investigation..."
                value={osintQuery}
                onChange={(e) => setOsintQuery(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleOSINTAnalysis()}
              />
              <Button 
                onClick={handleOSINTAnalysis}
                disabled={osintAnalysis.isPending || isInvestigating}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 min-w-[140px]"
              >
                {isInvestigating ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Investigating...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Investigate
                  </>
                )}
              </Button>
            </div>

            {/* OSINT Results */}
            {osintAnalysis.data && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Data Sources</h4>
                  <p className="text-2xl font-bold text-green-400">
                    {osintAnalysis.data.sources_found || '47'}
                  </p>
                  <p className="text-sm text-slate-400">Intelligence sources</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Risk Level</h4>
                  <p className="text-2xl font-bold text-yellow-400">
                    {osintAnalysis.data.risk_level || 'Medium'}
                  </p>
                  <p className="text-sm text-slate-400">Security assessment</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Digital Footprint</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {osintAnalysis.data.footprint_score || '8.3'}/10
                  </p>
                  <p className="text-sm text-slate-400">Online presence</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Intelligence Score</h4>
                  <p className="text-2xl font-bold text-orange-400">
                    {osintAnalysis.data.intelligence_score || '92'}/100
                  </p>
                  <p className="text-sm text-slate-400">Data quality</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="reconnaissance" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="reconnaissance" className="data-[state=active]:bg-red-600">Social Reconnaissance</TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-red-600">Technical Intelligence</TabsTrigger>
            <TabsTrigger value="people" className="data-[state=active]:bg-red-600">People Search</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-600">Security Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="reconnaissance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Social Media Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        platform: 'LinkedIn',
                        profiles: 156,
                        mentions: 342,
                        sentiment: 'Positive',
                        engagement: '8.7%'
                      },
                      {
                        platform: 'Twitter',
                        profiles: 89,
                        mentions: 1247,
                        sentiment: 'Mixed',
                        engagement: '4.2%'
                      },
                      {
                        platform: 'Facebook',
                        profiles: 234,
                        mentions: 578,
                        sentiment: 'Positive',
                        engagement: '6.1%'
                      },
                      {
                        platform: 'Instagram',
                        profiles: 67,
                        mentions: 289,
                        sentiment: 'Positive',
                        engagement: '12.3%'
                      }
                    ].map((platform, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">{platform.platform}</h4>
                          <Badge 
                            variant={platform.sentiment === 'Positive' ? 'default' : 'secondary'}
                            className={platform.sentiment === 'Positive' ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}
                          >
                            {platform.sentiment}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Profiles</p>
                            <p className="text-white font-semibold">{platform.profiles}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Mentions</p>
                            <p className="text-white font-semibold">{platform.mentions}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Engagement</p>
                            <p className="text-white font-semibold">{platform.engagement}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Competitor Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        company: 'TechCorp Solutions',
                        employees: '2,500+',
                        funding: '$45M Series B',
                        technology: 'React, AWS, MongoDB',
                        threat_level: 'High'
                      },
                      {
                        company: 'Innovation Labs',
                        employees: '850+',
                        funding: '$12M Series A',
                        technology: 'Vue.js, GCP, PostgreSQL',
                        threat_level: 'Medium'
                      },
                      {
                        company: 'Digital Dynamics',
                        employees: '1,200+',
                        funding: '$28M Series B',
                        technology: 'Angular, Azure, MySQL',
                        threat_level: 'High'
                      }
                    ].map((competitor, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">{competitor.company}</h4>
                          <Badge 
                            variant={competitor.threat_level === 'High' ? 'destructive' : 'secondary'}
                            className={competitor.threat_level === 'High' ? 'bg-red-600/20 text-red-300' : 'bg-yellow-600/20 text-yellow-300'}
                          >
                            {competitor.threat_level} Threat
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                          <p><span className="text-slate-400">Employees:</span> {competitor.employees}</p>
                          <p><span className="text-slate-400">Funding:</span> {competitor.funding}</p>
                          <p className="col-span-2"><span className="text-slate-400">Tech Stack:</span> {competitor.technology}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Domain Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded">
                      <h4 className="text-white font-semibold mb-3">Domain Analysis</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Domain Age</p>
                          <p className="text-white">8 years, 3 months</p>
                        </div>
                        <div>
                          <p className="text-slate-400">SSL Certificate</p>
                          <p className="text-green-400">Valid (Let's Encrypt)</p>
                        </div>
                        <div>
                          <p className="text-slate-400">DNS Records</p>
                          <p className="text-white">23 records found</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Subdomains</p>
                          <p className="text-white">17 discovered</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-700/50 rounded">
                      <h4 className="text-white font-semibold mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'PostgreSQL', 'AWS', 'Cloudflare', 'Stripe'].map((tech, index) => (
                          <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-700/50 rounded">
                      <h4 className="text-white font-semibold mb-3">Server Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Server Location</span>
                          <span className="text-white">Virginia, USA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hosting Provider</span>
                          <span className="text-white">Amazon Web Services</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Response Time</span>
                          <span className="text-green-400">142ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded">
                      <h5 className="text-white font-medium mb-2">Open Ports & Services</h5>
                      <div className="space-y-2 text-sm">
                        {[
                          { port: '22', service: 'SSH', status: 'Open', risk: 'Medium' },
                          { port: '80', service: 'HTTP', status: 'Open', risk: 'Low' },
                          { port: '443', service: 'HTTPS', status: 'Open', risk: 'Low' },
                          { port: '3306', service: 'MySQL', status: 'Filtered', risk: 'Low' }
                        ].map((port, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-slate-300">Port {port.port} ({port.service})</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={port.status === 'Open' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                              >
                                {port.status}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={port.risk === 'Medium' ? 'border-yellow-500 text-yellow-300' : 'border-green-500 text-green-300'}
                              >
                                {port.risk}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-700/50 rounded">
                      <h5 className="text-white font-medium mb-2">Security Headers</h5>
                      <div className="space-y-2 text-sm">
                        {[
                          { header: 'X-Frame-Options', status: 'Present', grade: 'A' },
                          { header: 'X-Content-Type-Options', status: 'Present', grade: 'A' },
                          { header: 'X-XSS-Protection', status: 'Missing', grade: 'C' },
                          { header: 'Strict-Transport-Security', status: 'Present', grade: 'A' }
                        ].map((header, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-slate-300">{header.header}</span>
                            <div className="flex items-center gap-2">
                              <span className={header.status === 'Present' ? 'text-green-400' : 'text-red-400'}>
                                {header.status}
                              </span>
                              <Badge 
                                variant="outline" 
                                className={
                                  header.grade === 'A' ? 'border-green-500 text-green-300' : 
                                  header.grade === 'C' ? 'border-red-500 text-red-300' : 
                                  'border-yellow-500 text-yellow-300'
                                }
                              >
                                {header.grade}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="people">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">People Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Sarah Mitchell',
                      title: 'Chief Technology Officer',
                      company: 'TechCorp Solutions',
                      email: 'sarah.mitchell@techcorp.com',
                      linkedin: 'linkedin.com/in/sarahmitchell',
                      location: 'San Francisco, CA',
                      confidence: 95
                    },
                    {
                      name: 'Michael Zhang',
                      title: 'VP of Sales',
                      company: 'Innovation Labs',
                      email: 'michael.zhang@innovlabs.com',
                      linkedin: 'linkedin.com/in/michaelzhang',
                      location: 'New York, NY',
                      confidence: 88
                    },
                    {
                      name: 'Emily Rodriguez',
                      title: 'Director of Marketing',
                      company: 'Digital Dynamics',
                      email: 'emily.r@digitaldyn.com',
                      linkedin: 'linkedin.com/in/emilyrodriguez',
                      location: 'Austin, TX',
                      confidence: 92
                    }
                  ].map((person, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{person.name}</h4>
                          <p className="text-slate-300">{person.title} at {person.company}</p>
                          <p className="text-slate-400 text-sm">{person.location}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="bg-green-600/20 text-green-300 border-green-600"
                        >
                          {person.confidence}% Confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Email:</span>
                          <span className="text-blue-400">{person.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">LinkedIn:</span>
                          <span className="text-blue-400 truncate">{person.linkedin}</span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {osintTools.map((tool, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center justify-between">
                      {tool.category}
                      <Badge 
                        variant={tool.status === 'active' ? 'default' : tool.status === 'configured' ? 'secondary' : 'outline'}
                        className={
                          tool.status === 'active' ? 'bg-green-600/20 text-green-300' :
                          tool.status === 'configured' ? 'bg-blue-600/20 text-blue-300' :
                          'bg-yellow-600/20 text-yellow-300'
                        }
                      >
                        {tool.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      {tool.tools.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-slate-200">{item}</span>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            Configure
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
            <Download className="h-4 w-4 mr-2" />
            Export OSINT Intelligence Report
          </Button>
        </div>
      </div>
    </div>
  );
}