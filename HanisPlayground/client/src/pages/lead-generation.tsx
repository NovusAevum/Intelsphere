import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Users, Mail, Phone, MapPin, Building, 
  CheckCircle, AlertCircle, Download, Search, Zap
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function LeadGeneration() {
  const [prospectQuery, setProspectQuery] = useState('');
  const [isProspecting, setIsProspecting] = useState(false);

  const leadGeneration = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/lead-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsProspecting(false);
    }
  });

  const handleLeadGeneration = () => {
    if (prospectQuery.trim()) {
      setIsProspecting(true);
      leadGeneration.mutate({ query: prospectQuery });
    }
  };

  const prospectingTools = [
    {
      category: 'Contact Data Mining',
      tools: ['Apollo.io', 'Lusha', 'ZoomInfo'],
      status: 'active',
      description: 'Extract verified contact information from professional databases'
    },
    {
      category: 'Email Verification',
      tools: ['NeverBounce', 'Hunter'],
      status: 'configured',
      description: 'Validate email addresses and reduce bounce rates'
    },
    {
      category: 'LinkedIn Scraping',
      tools: ['PhantomBuster', 'TexAu'],
      status: 'pending',
      description: 'Automated LinkedIn prospecting and data extraction'
    },
    {
      category: 'Form & Intent Data',
      tools: ['Clearbit', 'Leadfeeder'],
      status: 'active',
      description: 'Track website visitors and identify buying intent'
    },
    {
      category: 'Buyer Persona Development',
      tools: ['Persona Builder', 'Customer Analytics'],
      status: 'active',
      description: 'Create detailed buyer personas and ideal customer profiles'
    },
    {
      category: 'Cold Outreach Sequences',
      tools: ['Lemlist', 'Instantly.ai'],
      status: 'configured',
      description: 'Automated email sequences and follow-up campaigns'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <GoBackButton />
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent mb-4">
            Lead Generation & Prospecting
          </h1>
          <p className="text-slate-300 text-lg">
            Identify, qualify, and engage potential customers
          </p>
        </div>

        {/* Lead Generation Interface */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              Prospect Discovery Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter company, industry, or job title to find qualified prospects..."
                value={prospectQuery}
                onChange={(e) => setProspectQuery(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleLeadGeneration()}
              />
              <Button 
                onClick={handleLeadGeneration}
                disabled={leadGeneration.isPending || isProspecting}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-w-[140px]"
              >
                {isProspecting ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Prospecting...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Leads
                  </>
                )}
              </Button>
            </div>

            {/* Lead Generation Results */}
            {leadGeneration.data && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Total Prospects</h4>
                  <p className="text-2xl font-bold text-green-400">
                    {leadGeneration.data.total_prospects || '1,247'}
                  </p>
                  <p className="text-sm text-slate-400">Qualified leads found</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Email Verified</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {leadGeneration.data.verified_emails || '89%'}
                  </p>
                  <p className="text-sm text-slate-400">Deliverable rate</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Phone Numbers</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {leadGeneration.data.phone_numbers || '72%'}
                  </p>
                  <p className="text-sm text-slate-400">Contact coverage</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Lead Score</h4>
                  <p className="text-2xl font-bold text-orange-400">
                    {leadGeneration.data.average_score || '8.4'}/10
                  </p>
                  <p className="text-sm text-slate-400">Quality rating</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="tools" className="data-[state=active]:bg-green-600">Prospecting Tools</TabsTrigger>
            <TabsTrigger value="prospects" className="data-[state=active]:bg-green-600">Live Prospects</TabsTrigger>
            <TabsTrigger value="sequences" className="data-[state=active]:bg-green-600">Outreach Sequences</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tools">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {prospectingTools.map((tool, index) => (
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
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prospects">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recently Discovered Prospects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Sarah Johnson',
                      title: 'VP of Marketing',
                      company: 'TechCorp Solutions',
                      email: 'sarah.johnson@techcorp.com',
                      phone: '+1 (555) 123-4567',
                      score: 9.2,
                      status: 'verified'
                    },
                    {
                      name: 'Michael Chen',
                      title: 'Director of Sales',
                      company: 'Innovation Labs',
                      email: 'michael.chen@innovlabs.com',
                      phone: '+1 (555) 234-5678',
                      score: 8.7,
                      status: 'verified'
                    },
                    {
                      name: 'Emily Rodriguez',
                      title: 'Chief Technology Officer',
                      company: 'Digital Dynamics',
                      email: 'emily.r@digitaldyn.com',
                      phone: '+1 (555) 345-6789',
                      score: 9.5,
                      status: 'pending'
                    },
                    {
                      name: 'David Kim',
                      title: 'Head of Operations',
                      company: 'ScaleUp Ventures',
                      email: 'david.kim@scaleup.co',
                      phone: '+1 (555) 456-7890',
                      score: 8.3,
                      status: 'verified'
                    }
                  ].map((prospect, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{prospect.name}</h4>
                          <p className="text-slate-300">{prospect.title} at {prospect.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={prospect.status === 'verified' ? 'default' : 'secondary'}
                            className={prospect.status === 'verified' ? 'bg-green-600/20 text-green-300' : 'bg-yellow-600/20 text-yellow-300'}
                          >
                            {prospect.status === 'verified' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {prospect.status}
                          </Badge>
                          <span className="text-orange-400 font-bold">{prospect.score}/10</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          <span className="text-slate-300">{prospect.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{prospect.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-purple-400" />
                          <span className="text-slate-300">{prospect.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sequences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Email Sequences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Technology Decision Makers', contacts: 245, open_rate: 34, reply_rate: 12 },
                      { name: 'Marketing Directors', contacts: 189, open_rate: 41, reply_rate: 18 },
                      { name: 'Sales Leaders', contacts: 156, open_rate: 38, reply_rate: 15 },
                      { name: 'C-Suite Executives', contacts: 92, open_rate: 28, reply_rate: 8 }
                    ].map((sequence, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{sequence.name}</span>
                          <span className="text-slate-400 text-sm">{sequence.contacts} contacts</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-slate-400 text-xs">Open Rate</p>
                            <div className="flex items-center gap-2">
                              <Progress value={sequence.open_rate} className="flex-1 h-2" />
                              <span className="text-blue-400 text-sm">{sequence.open_rate}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Reply Rate</p>
                            <div className="flex items-center gap-2">
                              <Progress value={sequence.reply_rate * 2} className="flex-1 h-2" />
                              <span className="text-green-400 text-sm">{sequence.reply_rate}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Sequence Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Introduction & Value Proposition', emails: 3, conversion: '24%' },
                      { name: 'Follow-up & Social Proof', emails: 4, conversion: '18%' },
                      { name: 'Decision Maker Outreach', emails: 5, conversion: '31%' },
                      { name: 'Re-engagement Campaign', emails: 3, conversion: '12%' }
                    ].map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div>
                          <span className="text-white font-medium">{template.name}</span>
                          <p className="text-slate-400 text-sm">{template.emails} email sequence</p>
                        </div>
                        <div className="text-right">
                          <span className="text-green-400 font-bold">{template.conversion}</span>
                          <p className="text-slate-400 text-xs">conversion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Lead Generation Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Weekly Lead Volume</span>
                      <span className="text-green-400 font-bold">+23%</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Email Deliverability</span>
                      <span className="text-blue-400 font-bold">94.2%</span>
                    </div>
                    <Progress value={94} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Response Rate</span>
                      <span className="text-purple-400 font-bold">18.7%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Conversion to Opportunity</span>
                      <span className="text-orange-400 font-bold">12.4%</span>
                    </div>
                    <Progress value={62} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { industry: 'Technology & Software', leads: 342, conversion: 28 },
                      { industry: 'Financial Services', leads: 289, conversion: 24 },
                      { industry: 'Healthcare & Medical', leads: 256, conversion: 22 },
                      { industry: 'Manufacturing', leads: 198, conversion: 19 },
                      { industry: 'Professional Services', leads: 167, conversion: 31 }
                    ].map((industry, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{industry.industry}</span>
                          <span className="text-slate-400 text-sm">{industry.leads} leads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={industry.conversion} className="flex-1 h-2" />
                          <span className="text-green-400 text-sm">{industry.conversion}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Lead Generation Report
          </Button>
        </div>
      </div>
    </div>
  );
}