import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  LinkedinIcon,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Database,
  Globe,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface LeadProfile {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry: string;
  companySize: string;
  location: string;
  revenue?: string;
  leadScore: number;
  sources: string[];
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
  };
  companyData: {
    website: string;
    description: string;
    employees: number;
    founded?: number;
    technologies: string[];
  };
  enrichmentData: {
    emailValidation: 'valid' | 'invalid' | 'unknown';
    phoneValidation: 'valid' | 'invalid' | 'unknown';
    socialPresence: number;
    digitalFootprint: number;
  };
}

interface SalesOpportunity {
  id: string;
  type: 'cold_outreach' | 'warm_referral' | 'inbound_lead' | 'event_contact';
  priority: 'high' | 'medium' | 'low';
  estimatedValue: number;
  probability: number;
  timeframe: string;
  nextAction: string;
  contact: LeadProfile;
  context: string;
  recommendedApproach: string;
}

interface MarketIntelligence {
  industry: string;
  marketSize: string;
  growthRate: number;
  keyPlayers: string[];
  marketTrends: string[];
  competitorAnalysis: {
    name: string;
    marketShare: number;
    strengths: string[];
    weaknesses: string[];
  }[];
  opportunities: string[];
  threats: string[];
  geographicData: {
    region: string;
    marketPenetration: number;
    growthPotential: number;
  }[];
}

export default function SalesIntelligence() {
  const [activeTab, setActiveTab] = useState("leads");
  const [leadCriteria, setLeadCriteria] = useState({
    industry: "",
    location: "",
    companySize: "",
    keywords: ""
  });
  const [marketCriteria, setMarketCriteria] = useState({
    industry: "",
    region: ""
  });

  const generateLeadsMutation = useMutation({
    mutationFn: async (criteria: any) => 
      apiRequest('/api/sales/generate-leads', {
        method: 'POST',
        body: JSON.stringify({
          ...criteria,
          keywords: criteria.keywords ? criteria.keywords.split(',').map((k: string) => k.trim()) : []
        })
      })
  });

  const generateOpportunitiesMutation = useMutation({
    mutationFn: async (criteria: any) => 
      apiRequest('/api/sales/opportunities', {
        method: 'POST',
        body: JSON.stringify(criteria)
      })
  });

  const marketAnalysisMutation = useMutation({
    mutationFn: async (criteria: any) => 
      apiRequest('/api/sales/market-analysis', {
        method: 'POST',
        body: JSON.stringify(criteria)
      })
  });

  const syncHubSpotMutation = useMutation({
    mutationFn: async (leads: LeadProfile[]) => 
      apiRequest('/api/sales/sync-hubspot', {
        method: 'POST',
        body: JSON.stringify({ leads })
      })
  });

  const handleGenerateLeads = () => {
    generateLeadsMutation.mutate(leadCriteria);
  };

  const handleGenerateOpportunities = () => {
    generateOpportunitiesMutation.mutate(leadCriteria);
  };

  const handleMarketAnalysis = () => {
    marketAnalysisMutation.mutate(marketCriteria);
  };

  const handleSyncHubSpot = (leads: LeadProfile[]) => {
    syncHubSpotMutation.mutate(leads);
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getValidationIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'invalid': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-blue-400" />
            Sales Intelligence & Business Development
          </h1>
          <p className="text-lg text-blue-200">
            AI-powered lead generation, market analysis, and opportunity identification
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="leads" className="text-white">Lead Generation</TabsTrigger>
            <TabsTrigger value="opportunities" className="text-white">Opportunities</TabsTrigger>
            <TabsTrigger value="market" className="text-white">Market Analysis</TabsTrigger>
            <TabsTrigger value="dashboard" className="text-white">Dashboard</TabsTrigger>
          </TabsList>

          {/* Lead Generation Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Lead Generation Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-400" />
                    Lead Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-slate-300">Industry</Label>
                    <Select value={leadCriteria.industry} onValueChange={(value) => setLeadCriteria({...leadCriteria, industry: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information-technology">Information Technology</SelectItem>
                        <SelectItem value="software-development">Software Development</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="e-commerce">E-commerce</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="aerospace">Aerospace</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="legal-services">Legal Services</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="retail-trade">Retail Trade</SelectItem>
                        <SelectItem value="fashion-apparel">Fashion & Apparel</SelectItem>
                        <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                        <SelectItem value="palm-oil">Palm Oil</SelectItem>
                        <SelectItem value="rubber-industry">Rubber Industry</SelectItem>
                        <SelectItem value="halal-food-processing">Halal Food Processing</SelectItem>
                        <SelectItem value="islamic-banking">Islamic Banking</SelectItem>
                        <SelectItem value="medical-tourism">Medical Tourism</SelectItem>
                        <SelectItem value="electrical-electronics">Electrical & Electronics</SelectItem>
                        <SelectItem value="petrochemicals">Petrochemicals</SelectItem>
                        <SelectItem value="tourism-hospitality">Tourism & Hospitality</SelectItem>
                        <SelectItem value="green-technology">Green Technology</SelectItem>
                        <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                        <SelectItem value="biotechnology">Biotechnology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-300">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, NY"
                      value={leadCriteria.location}
                      onChange={(e) => setLeadCriteria({...leadCriteria, location: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-slate-300">Company Size</Label>
                    <Select value={leadCriteria.companySize} onValueChange={(value) => setLeadCriteria({...leadCriteria, companySize: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords" className="text-slate-300">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="e.g., SaaS, AI, Enterprise"
                      value={leadCriteria.keywords}
                      onChange={(e) => setLeadCriteria({...leadCriteria, keywords: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-400">Separate multiple keywords with commas</p>
                  </div>

                  <Button 
                    onClick={handleGenerateLeads}
                    disabled={generateLeadsMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {generateLeadsMutation.isPending ? (
                      <Activity className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Zap className="h-4 w-4 mr-2" />
                    )}
                    Generate Leads
                  </Button>
                </CardContent>
              </Card>

              {/* Lead Results */}
              <div className="xl:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        Generated Leads
                      </CardTitle>
                      {generateLeadsMutation.data?.data && (
                        <Button
                          size="sm"
                          onClick={() => handleSyncHubSpot(generateLeadsMutation.data.data)}
                          disabled={syncHubSpotMutation.isPending}
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          {syncHubSpotMutation.isPending ? (
                            <Activity className="h-3 w-3 animate-spin mr-1" />
                          ) : (
                            <Database className="h-3 w-3 mr-1" />
                          )}
                          Sync to HubSpot
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {generateLeadsMutation.isPending && (
                      <div className="text-center py-8">
                        <Activity className="h-8 w-8 animate-spin mx-auto text-blue-400 mb-4" />
                        <p className="text-slate-300">Generating qualified leads...</p>
                      </div>
                    )}

                    {generateLeadsMutation.data?.data && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-slate-300">
                            Found {generateLeadsMutation.data.data.length} qualified leads
                          </p>
                        </div>
                        
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {generateLeadsMutation.data.data.map((lead: LeadProfile) => (
                            <Card key={lead.id} className="bg-slate-700/50 border-slate-600">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h4 className="font-semibold text-white">{lead.companyName}</h4>
                                    <p className="text-sm text-slate-300">{lead.contactName}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className={`text-lg font-bold ${getLeadScoreColor(lead.leadScore)}`}>
                                      {lead.leadScore}%
                                    </div>
                                    <p className="text-xs text-slate-400">Lead Score</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Building2 className="h-4 w-4" />
                                    {lead.industry}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <MapPin className="h-4 w-4" />
                                    {lead.location}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Users className="h-4 w-4" />
                                    {lead.companySize} employees
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Globe className="h-4 w-4" />
                                    {lead.companyData.employees} staff
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 mb-3">
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    {getValidationIcon(lead.enrichmentData.emailValidation)}
                                    <span className="text-xs text-slate-400">Email</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <LinkedinIcon className="h-4 w-4 text-slate-400" />
                                    <Progress value={lead.enrichmentData.socialPresence} className="w-16 h-2" />
                                    <span className="text-xs text-slate-400">{lead.enrichmentData.socialPresence}%</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                  {lead.companyData.technologies.map((tech, index) => (
                                    <Badge key={index} variant="outline" className="text-xs border-slate-500 text-slate-300">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {generateLeadsMutation.isError && (
                      <Alert className="border-red-600 bg-red-900/20">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertDescription className="text-red-200">
                          Failed to generate leads. Please check your criteria and try again.
                        </AlertDescription>
                      </Alert>
                    )}

                    {!generateLeadsMutation.data && !generateLeadsMutation.isPending && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400">Configure criteria and generate leads to get started</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Sales Opportunities
                  </CardTitle>
                  <Button
                    onClick={handleGenerateOpportunities}
                    disabled={generateOpportunitiesMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {generateOpportunitiesMutation.isPending ? (
                      <Activity className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Target className="h-4 w-4 mr-2" />
                    )}
                    Generate Opportunities
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {generateOpportunitiesMutation.isPending && (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 animate-spin mx-auto text-blue-400 mb-4" />
                    <p className="text-slate-300">Analyzing sales opportunities...</p>
                  </div>
                )}

                {generateOpportunitiesMutation.data?.data && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {generateOpportunitiesMutation.data.data.map((opportunity: SalesOpportunity) => (
                        <Card key={opportunity.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-white">{opportunity.contact.companyName}</h4>
                                <p className="text-sm text-slate-300">{opportunity.contact.contactName}</p>
                              </div>
                              <Badge className={getPriorityBadge(opportunity.priority)}>
                                {opportunity.priority}
                              </Badge>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Estimated Value:</span>
                                <span className="text-green-400 font-semibold">
                                  ${opportunity.estimatedValue.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Probability:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={opportunity.probability} className="w-16 h-2" />
                                  <span className="text-white">{opportunity.probability}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Timeframe:</span>
                                <span className="text-slate-300">{opportunity.timeframe}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-xs text-slate-400 uppercase">Next Action</p>
                              <p className="text-sm text-slate-300">{opportunity.nextAction}</p>
                              
                              <p className="text-xs text-slate-400 uppercase mt-3">Recommended Approach</p>
                              <p className="text-sm text-slate-300">{opportunity.recommendedApproach}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {!generateOpportunitiesMutation.data && !generateOpportunitiesMutation.isPending && (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400">Generate opportunities based on your lead criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Analysis Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Market Analysis Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Market Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="marketIndustry" className="text-slate-300">Industry</Label>
                    <Select value={marketCriteria.industry} onValueChange={(value) => setMarketCriteria({...marketCriteria, industry: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-slate-300">Region</Label>
                    <Select value={marketCriteria.region} onValueChange={(value) => setMarketCriteria({...marketCriteria, region: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north-america">North America</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                        <SelectItem value="latin-america">Latin America</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleMarketAnalysis}
                    disabled={marketAnalysisMutation.isPending}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {marketAnalysisMutation.isPending ? (
                      <Activity className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <BarChart3 className="h-4 w-4 mr-2" />
                    )}
                    Analyze Market
                  </Button>
                </CardContent>
              </Card>

              {/* Market Analysis Results */}
              <div className="xl:col-span-3">
                {marketAnalysisMutation.data?.data && (
                  <div className="space-y-6">
                    {/* Market Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-8 w-8 text-green-400" />
                            <div>
                              <p className="text-2xl font-bold text-white">
                                {marketAnalysisMutation.data.data.marketSize}
                              </p>
                              <p className="text-sm text-slate-400">Market Size</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-8 w-8 text-blue-400" />
                            <div>
                              <p className="text-2xl font-bold text-white">
                                {marketAnalysisMutation.data.data.growthRate.toFixed(1)}%
                              </p>
                              <p className="text-sm text-slate-400">Growth Rate</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Building2 className="h-8 w-8 text-purple-400" />
                            <div>
                              <p className="text-2xl font-bold text-white">
                                {marketAnalysisMutation.data.data.keyPlayers.length}
                              </p>
                              <p className="text-sm text-slate-400">Key Players</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Market Intelligence Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Opportunities & Threats */}
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                          <CardTitle className="text-white">Market Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {marketAnalysisMutation.data.data.opportunities.map((opportunity: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                                {opportunity}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                          <CardTitle className="text-white">Market Threats</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {marketAnalysisMutation.data.data.threats.map((threat: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                {threat}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Geographic Data */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">Geographic Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {marketAnalysisMutation.data.data.geographicData.map((region: any, index: number) => (
                            <div key={index} className="space-y-2 p-3 bg-slate-700/50 rounded-lg">
                              <h4 className="font-semibold text-white">{region.region}</h4>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Market Penetration:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={region.marketPenetration} className="w-16 h-2" />
                                  <span className="text-white">{region.marketPenetration}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Growth Potential:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={region.growthPotential} className="w-16 h-2" />
                                  <span className="text-white">{region.growthPotential}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {marketAnalysisMutation.isPending && (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 animate-spin mx-auto text-blue-400 mb-4" />
                    <p className="text-slate-300">Analyzing market conditions...</p>
                  </div>
                )}

                {!marketAnalysisMutation.data && !marketAnalysisMutation.isPending && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="text-center py-8">
                      <PieChart className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-400">Select industry and region to analyze market conditions</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {generateLeadsMutation.data?.data?.length || 0}
                      </p>
                      <p className="text-sm text-slate-400">Total Leads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {generateOpportunitiesMutation.data?.data?.length || 0}
                      </p>
                      <p className="text-sm text-slate-400">Opportunities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        ${generateOpportunitiesMutation.data?.data?.reduce((sum: number, opp: SalesOpportunity) => sum + opp.estimatedValue, 0)?.toLocaleString() || 0}
                      </p>
                      <p className="text-sm text-slate-400">Pipeline Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {generateLeadsMutation.data?.data?.filter((lead: LeadProfile) => lead.leadScore >= 80).length || 0}
                      </p>
                      <p className="text-sm text-slate-400">High-Quality Leads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generateLeadsMutation.data && (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Generated {generateLeadsMutation.data.data.length} new leads</p>
                        <p className="text-xs text-slate-400">Lead generation completed</p>
                      </div>
                    </div>
                  )}
                  
                  {generateOpportunitiesMutation.data && (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Identified {generateOpportunitiesMutation.data.data.length} sales opportunities</p>
                        <p className="text-xs text-slate-400">Opportunity analysis completed</p>
                      </div>
                    </div>
                  )}

                  {marketAnalysisMutation.data && (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Market analysis for {marketAnalysisMutation.data.data.industry} completed</p>
                        <p className="text-xs text-slate-400">Market intelligence updated</p>
                      </div>
                    </div>
                  )}

                  {syncHubSpotMutation.data && (
                    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white">Leads synchronized with HubSpot CRM</p>
                        <p className="text-xs text-slate-400">CRM integration completed</p>
                      </div>
                    </div>
                  )}

                  {!generateLeadsMutation.data && !generateOpportunitiesMutation.data && !marketAnalysisMutation.data && (
                    <div className="text-center py-8">
                      <Activity className="h-8 w-8 mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-400">No recent activity. Start by generating leads or analyzing markets.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}