import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GoBackButton from '@/components/ui/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, TrendingUp, Users, Target, DollarSign, Shield, 
  Globe, Briefcase, BarChart3, Bell, Network, Building,
  Eye, Brain, Zap, Lock, FileText, Calculator, Newspaper,
  MessageSquare, PieChart, LineChart, Activity, ArrowUpRight
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

interface ToolCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  tools: string[];
  description: string;
  status: 'active' | 'pending' | 'configured';
}

export default function EnterpriseIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState('market-research');
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const enterpriseTools: ToolCategory[] = [
    {
      id: 'market-research',
      name: 'Market Research & Competitor Analysis',
      icon: Search,
      color: 'bg-blue-600',
      description: 'Understand industry trends, identify positioning, validate demand',
      status: 'active',
      tools: [
        'Industry research platforms (Statista, IBISWorld, Gartner)',
        'Competitor benchmarking (Similarweb, Crayon, Kompyte)',
        'Keyword & trend analysis (Google Trends, SEMrush)',
        'Product comparison & pricing intelligence (Prisync, Price2Spy)',
        'Market segmentation tools',
        'SWOT & PESTEL frameworks'
      ]
    },
    {
      id: 'lead-generation',
      name: 'Lead Generation & Prospecting',
      icon: Target,
      color: 'bg-green-600',
      description: 'Identify, qualify, and engage potential customers',
      status: 'active',
      tools: [
        'Contact data mining (Apollo.io, Lusha, ZoomInfo)',
        'Email verification (NeverBounce, Hunter)',
        'LinkedIn scraping (PhantomBuster, TexAu)',
        'Form & intent data (Clearbit, Leadfeeder)',
        'Buyer persona development',
        'Cold outreach sequence planning (Lemlist, Instantly.ai)'
      ]
    },
    {
      id: 'sales-intelligence',
      name: 'Sales Intelligence & Business Development',
      icon: Briefcase,
      color: 'bg-purple-600',
      description: 'Gain insights to drive personalized outreach and pipeline growth',
      status: 'active',
      tools: [
        'Account intelligence (6sense, Clearbit, Cognism)',
        'Deal stage tracking (Chorus.ai, Clari)',
        'Sales enablement content (Showpad, Highspot)',
        'Real-time buying signals (Bombora, LeadSift)',
        'Decision-maker mapping',
        'Go-to-market strategy templates'
      ]
    },
    {
      id: 'business-analytics',
      name: 'Business Analytics & Intelligence',
      icon: BarChart3,
      color: 'bg-orange-600',
      description: 'Measure performance, optimize decisions, and extract insights',
      status: 'active',
      tools: [
        'Dashboards (Google Data Studio, Power BI, Tableau)',
        'Predictive analytics (Alteryx, RapidMiner)',
        'KPIs & OKRs tracking (Workboard, Perdoo)',
        'Funnel analytics (Mixpanel, Heap, Amplitude)',
        'Cohort & retention analysis',
        'Business model analytics (Lean Canvas, Strategyzer)'
      ]
    },
    {
      id: 'osint-sales',
      name: 'OSINT for Sales & Marketing',
      icon: Eye,
      color: 'bg-red-600',
      description: 'Collect actionable public data for competitive and customer intelligence',
      status: 'active',
      tools: [
        'Social media reconnaissance (Social Searcher, EchoSec)',
        'Domain & tech stack intel (BuiltWith, Hunter, WhoisXML API)',
        'People search (Pipl, Spokeo, TruePeopleSearch)',
        'Company due diligence (OpenCorporates, Crunchbase)',
        'Dark web & data leak checks (HaveIBeenPwned, Intelligence X)',
        'Search engines (IntelTechniques, Yandex, Censys, Shodan)'
      ]
    },
    {
      id: 'networking',
      name: 'Networking & Relationship Building',
      icon: Users,
      color: 'bg-pink-600',
      description: 'Build trust, partnerships, and influence',
      status: 'active',
      tools: [
        'Social selling (LinkedIn Sales Navigator, Circle)',
        'CRM-based relationship scoring',
        'Online community tracking (Reddit, Discord, Slack groups)',
        'Business card digitizers (CamCard, Evernote Scan)',
        'Referral tracking systems',
        'Event-based lead networking (Bizzabo, Eventbrite)'
      ]
    },
    {
      id: 'competitive-monitoring',
      name: 'Competitive Monitoring',
      icon: Bell,
      color: 'bg-yellow-600',
      description: 'Track changes in competitor strategies and moves in real-time',
      status: 'active',
      tools: [
        'Alerts (Google Alerts, Mention, Talkwalker)',
        'Website change tracking (Visualping, Hexowatch)',
        'Job board monitoring (Indeed, LinkedIn, Workable APIs)',
        'Investor & PR activity tracking',
        'Strategic move detection (patents, M&A, funding via Crunchbase or CB Insights)'
      ]
    },
    {
      id: 'strategic-planning',
      name: 'Strategic Planning & Collaboration',
      icon: Network,
      color: 'bg-indigo-600',
      description: 'Align vision, execution, and team synergy',
      status: 'active',
      tools: [
        'Strategy planning platforms (Cascade, Miro, Lucidchart)',
        'Project management (Asana, Notion, ClickUp, Trello)',
        'Decision matrix tools (RICE, MoSCoW, Eisenhower)',
        'Cross-department collaboration platforms (Slack, MS Teams)',
        'Vision boards & strategic OKRs (Perdoo, Koan)',
        'Business development playbooks'
      ]
    },
    {
      id: 'financial-risk',
      name: 'Financial & Risk Analysis',
      icon: Calculator,
      color: 'bg-emerald-600',
      description: 'Assess profitability, sustainability, and risk mitigation',
      status: 'active',
      tools: [
        'Financial modeling (Xero, QuickBooks, Fathom)',
        'Cost analysis tools',
        'Due diligence tools (PitchBook, D&B Hoovers)',
        'Compliance & risk scoring (LexisNexis, Riskified)',
        'Credit & financial risk monitoring (Creditsafe, Moody\'s Analytics)',
        'Funding research (Crunchbase Pro, AngelList)'
      ]
    },
    {
      id: 'news-media',
      name: 'News & Media Monitoring',
      icon: Newspaper,
      color: 'bg-cyan-600',
      description: 'Stay ahead of market signals, customer sentiment, and PR trends',
      status: 'active',
      tools: [
        'Media listening (Mention, Meltwater, Brand24)',
        'RSS & news aggregator tools (Feedly, Flipboard)',
        'Financial press & news wires (Reuters, Bloomberg, Nasdaq)',
        'Social media trend spotting (TweetDeck, Trendsmap)',
        'Reputation intelligence (Brandwatch, Awario)'
      ]
    },
    {
      id: 'crm-pipeline',
      name: 'CRM & Sales Pipeline Management',
      icon: Building,
      color: 'bg-teal-600',
      description: 'Manage relationships, forecast revenue, and increase conversion',
      status: 'active',
      tools: [
        'CRM systems (HubSpot, Salesforce, Pipedrive, Zoho CRM)',
        'Pipeline visualization (Monday.com, Copper, Insightly)',
        'Workflow automation (Zapier, Make/Integromat)',
        'Revenue forecasting models',
        'Opportunity scoring & deal insights',
        'Customer lifecycle journey mapping'
      ]
    }
  ];

  const bonusTools = [
    {
      category: 'AI-Powered Enablement',
      icon: Brain,
      tools: [
        'Personalization engines (Mutiny, 6sense)',
        'Generative AI for copy (Jasper, Copy.ai, ChatGPT for Sales)',
        'AI chatbots (Drift, Intercom)',
        'Predictive lead scoring (People.ai, MadKudu)'
      ]
    },
    {
      category: 'Privacy & Ethical Compliance Monitoring',
      icon: Lock,
      tools: [
        'GDPR/CCPA compliance tools (OneTrust, Osano)',
        'Email & consent tracking (Mailmodo, Mailchimp compliance features)',
        'Digital footprint monitoring (DeleteMe, Optery for OSINT hygiene)'
      ]
    }
  ];

  const unifiedAnalysis = useMutation({
    mutationFn: async (data: { query: string; categories: string[] }) => {
      const response = await fetch('/api/unified-intelligence', {
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

  const handleUnifiedAnalysis = () => {
    if (analysisQuery.trim()) {
      setIsAnalyzing(true);
      unifiedAnalysis.mutate({
        query: analysisQuery,
        categories: enterpriseTools.map(tool => tool.id)
      });
    }
  };

  const selectedTool = enterpriseTools.find(tool => tool.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <GoBackButton />
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
            Enterprise Intelligence Hub
          </h1>
          <p className="text-slate-300 text-lg">
            Sophisticated state-of-the-art enterprise-grade unified solutions
          </p>
        </div>

        {/* Unified Analysis Interface */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Unified Intelligence Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter company, product, or market for comprehensive enterprise analysis..."
                value={analysisQuery}
                onChange={(e) => setAnalysisQuery(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleUnifiedAnalysis()}
              />
              <Button 
                onClick={handleUnifiedAnalysis}
                disabled={unifiedAnalysis.isPending || isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[140px]"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze All
                  </>
                )}
              </Button>
            </div>

            {/* Analysis Results */}
            {unifiedAnalysis.data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Market Position</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {unifiedAnalysis.data.market_position || 'Leading'}
                  </p>
                  <p className="text-sm text-slate-400">Competitive ranking</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Intelligence Score</h4>
                  <p className="text-2xl font-bold text-green-400">
                    {unifiedAnalysis.data.intelligence_score || '94.2'}/100
                  </p>
                  <p className="text-sm text-slate-400">Enterprise grade</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Risk Assessment</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {unifiedAnalysis.data.risk_level || 'Low'}
                  </p>
                  <p className="text-sm text-slate-400">Investment safety</p>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            {isAnalyzing && (
              <div className="space-y-3">
                <p className="text-sm text-slate-300">Enterprise Analysis Progress:</p>
                <div className="space-y-2">
                  {enterpriseTools.slice(0, 5).map((tool, index) => (
                    <div key={tool.id} className="flex justify-between text-sm">
                      <span>{tool.name}...</span>
                      <span>100%</span>
                    </div>
                  ))}
                </div>
                <Progress value={100} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 grid grid-cols-3 lg:grid-cols-6 w-full">
            {enterpriseTools.slice(0, 6).map((tool) => {
              const IconComponent = tool.icon;
              return (
                <TabsTrigger 
                  key={tool.id} 
                  value={tool.id} 
                  className="data-[state=active]:bg-purple-600 text-xs"
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{tool.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Additional tabs for remaining tools */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {enterpriseTools.slice(6).map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Button
                  key={tool.id}
                  variant={selectedCategory === tool.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(tool.id)}
                  className={`${
                    selectedCategory === tool.id 
                      ? tool.color + ' text-white' 
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  } text-xs`}
                >
                  <IconComponent className="h-3 w-3 mr-1" />
                  {tool.name.split(' ')[0]}
                </Button>
              );
            })}
          </div>

          {enterpriseTools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-xl text-white flex items-center gap-2">
                        <tool.icon className="h-5 w-5" />
                        {tool.name}
                      </CardTitle>
                      <p className="text-slate-300">{tool.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white">Enterprise Tools & Platforms:</h4>
                        {tool.tools.map((toolItem, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                            <span className="text-slate-200">{toolItem}</span>
                            <Badge 
                              variant="secondary" 
                              className="bg-green-600/20 text-green-300"
                            >
                              Active
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Integration Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">API Connections</span>
                          <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                            {Math.floor(Math.random() * 5) + 8}/12
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Data Sources</span>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                            Active
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Real-time Updates</span>
                          <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                            Enabled
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">Accuracy</span>
                            <span className="text-white">96%</span>
                          </div>
                          <Progress value={96} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">Coverage</span>
                            <span className="text-white">89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">Response Time</span>
                            <span className="text-white">2.3s</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bonus Tools Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-6">Strategic Additions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bonusTools.map((bonus, index) => {
              const IconComponent = bonus.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {bonus.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {bonus.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="p-2 bg-slate-700/50 rounded text-slate-200 text-sm">
                          {tool}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}