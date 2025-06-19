import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoBackButton from '@/components/ui/go-back-button';
import { 
  Users, MessageSquare, Calendar, Phone, Mail, 
  Download, Search, TrendingUp, Building, Star, ExternalLink
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function NetworkingRelationships() {
  const [contactSearch, setContactSearch] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const relationshipAnalysis = useMutation({
    mutationFn: async (data: { contact: string }) => {
      const response = await fetch('/api/relationship-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsAnalyzing(false);
    }
  });

  const handleRelationshipAnalysis = () => {
    if (contactSearch.trim()) {
      setIsAnalyzing(true);
      relationshipAnalysis.mutate({ contact: contactSearch });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <GoBackButton className="text-indigo-400 hover:text-indigo-300" />
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent mb-4">
              Networking & Relationship Building
            </h1>
            <p className="text-slate-300 text-lg">
              Build trust, partnerships, and influence with advanced CRM integration
            </p>
          </div>
          <div></div>
        </div>

        {/* Networking Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Contacts</p>
                  <p className="text-2xl font-bold text-blue-400">2,847</p>
                  <p className="text-green-400 text-xs">+47 this week</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Connections</p>
                  <p className="text-2xl font-bold text-green-400">1,234</p>
                  <p className="text-green-400 text-xs">89% engagement rate</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Meetings Scheduled</p>
                  <p className="text-2xl font-bold text-purple-400">67</p>
                  <p className="text-purple-400 text-xs">Next 30 days</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Relationship Score</p>
                  <p className="text-2xl font-bold text-orange-400">8.7/10</p>
                  <p className="text-orange-400 text-xs">Network strength</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-indigo-600">Contact Management</TabsTrigger>
            <TabsTrigger value="relationships" className="data-[state=active]:bg-indigo-600">Relationship Mapping</TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-indigo-600">Partnership Opportunities</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-indigo-600">Network Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-400" />
                  Contact Intelligence Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Search contacts by name, company, or role..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleRelationshipAnalysis()}
                  />
                  <Button 
                    onClick={handleRelationshipAnalysis}
                    disabled={relationshipAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Contact
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: 'Sarah Johnson',
                      title: 'VP of Marketing',
                      company: 'TechCorp Solutions',
                      relationship: 'Strong',
                      lastContact: '2 days ago',
                      score: 9.2,
                      email: 'sarah.johnson@techcorp.com',
                      phone: '+1 (555) 123-4567'
                    },
                    {
                      name: 'Michael Chen',
                      title: 'CEO',
                      company: 'Innovation Labs',
                      relationship: 'Developing',
                      lastContact: '1 week ago',
                      score: 7.8,
                      email: 'michael.chen@innovlabs.com',
                      phone: '+1 (555) 987-6543'
                    },
                    {
                      name: 'Emily Rodriguez',
                      title: 'Director of Sales',
                      company: 'Growth Partners',
                      relationship: 'New',
                      lastContact: '3 weeks ago',
                      score: 6.4,
                      email: 'emily.r@growthpartners.com',
                      phone: '+1 (555) 456-7890'
                    }
                  ].map((contact, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{contact.name}</h4>
                          <p className="text-slate-300">{contact.title} at {contact.company}</p>
                          <p className="text-slate-400 text-sm">Last contact: {contact.lastContact}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={
                              contact.relationship === 'Strong' ? 'border-green-500 text-green-300' :
                              contact.relationship === 'Developing' ? 'border-yellow-500 text-yellow-300' :
                              'border-blue-500 text-blue-300'
                            }
                          >
                            {contact.relationship}
                          </Badge>
                          <p className="text-white font-semibold mt-1">Score: {contact.score}/10</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-blue-400">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-300">{contact.phone}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Relationship Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'C-Suite Executives', count: 23, strength: 85 },
                      { category: 'Department Heads', count: 67, strength: 78 },
                      { category: 'Key Decision Makers', count: 145, strength: 72 },
                      { category: 'Industry Influencers', count: 89, strength: 68 },
                      { category: 'Potential Partners', count: 234, strength: 45 }
                    ].map((rel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{rel.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-300">{rel.count} contacts</span>
                            <span className="text-indigo-400">{rel.strength}%</span>
                          </div>
                        </div>
                        <Progress value={rel.strength} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">New Connections</p>
                        <p className="text-2xl font-bold text-green-400">47</p>
                        <p className="text-green-400 text-xs">This month</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Meetings Held</p>
                        <p className="text-2xl font-bold text-blue-400">134</p>
                        <p className="text-blue-400 text-xs">This quarter</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Recent Activities</h5>
                      {[
                        'Connected with 3 new prospects at Tech Summit',
                        'Scheduled follow-up meeting with Innovation Labs',
                        'Sent proposal to TechCorp Solutions',
                        'Attended networking event: 12 new connections',
                        'Partnership discussion with Growth Partners'
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-700/50 rounded">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Partnership Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      company: 'Digital Transformation Inc.',
                      opportunity: 'Strategic Partnership',
                      potential: 'High',
                      value: '$2.4M',
                      timeline: '3-6 months',
                      contact: 'Jennifer Walsh, VP Business Development'
                    },
                    {
                      company: 'Cloud Solutions Pro',
                      opportunity: 'Joint Venture',
                      potential: 'Medium',
                      value: '$800K',
                      timeline: '6-12 months',
                      contact: 'Robert Kim, CEO'
                    },
                    {
                      company: 'AI Innovations Hub',
                      opportunity: 'Technology Integration',
                      potential: 'High',
                      value: '$1.8M',
                      timeline: '2-4 months',
                      contact: 'Dr. Maria Santos, CTO'
                    }
                  ].map((opp, index) => (
                    <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {opp.company}
                          </h4>
                          <p className="text-slate-300">{opp.opportunity}</p>
                          <p className="text-slate-400 text-sm">Contact: {opp.contact}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={opp.potential === 'High' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                        >
                          {opp.potential} Potential
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Estimated Value</p>
                          <p className="text-white font-semibold">{opp.value}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Timeline</p>
                          <p className="text-white font-semibold">{opp.timeline}</p>
                        </div>
                        <div>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Explore
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Response Rate', value: '78%', change: '+12%', trend: 'up' },
                      { metric: 'Meeting Conversion', value: '34%', change: '+8%', trend: 'up' },
                      { metric: 'Relationship Depth', value: '7.2/10', change: '+0.8', trend: 'up' },
                      { metric: 'Network Reach', value: '12,450', change: '+1,234', trend: 'up' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div>
                          <p className="text-white font-medium">{metric.metric}</p>
                          <p className="text-slate-400 text-sm">{metric.value}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm">{metric.change}</span>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Johnson', score: 9.8, interactions: 47, deals: 3 },
                      { name: 'Michael Chen', score: 9.2, interactions: 23, deals: 2 },
                      { name: 'Jennifer Walsh', score: 8.9, interactions: 34, deals: 4 },
                      { name: 'Robert Kim', score: 8.6, interactions: 19, deals: 1 },
                      { name: 'Dr. Maria Santos', score: 8.3, interactions: 28, deals: 2 }
                    ].map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-white font-medium">{performer.name}</span>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-indigo-400 font-semibold">{performer.score}/10</p>
                          <p className="text-slate-400">{performer.interactions} interactions</p>
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
          <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Network Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}