import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Globe, 
  Search, 
  Database, 
  Eye, 
  Network, 
  FileText,
  Image,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Building,
  Link,
  Activity,
  Radar,
  Target
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface WebSCRYResults {
  operation_id: string;
  target_domain: string;
  scan_timestamp: string;
  web_scraping_results: {
    page_content: any[];
    metadata_extraction: any[];
    hidden_content: any[];
    social_media_links: any[];
  };
  domain_intelligence: {
    whois_information: any[];
    dns_records: any[];
    subdomains: any[];
    ssl_certificates: any[];
  };
  digital_footprint: {
    email_addresses: any[];
    phone_numbers: any[];
    social_profiles: any[];
    employee_data: any[];
  };
  technology_stack: {
    frameworks: any[];
    cms_platforms: any[];
    analytics_tools: any[];
    security_headers: any[];
  };
  vulnerability_assessment: {
    exposed_endpoints: any[];
    security_misconfigurations: any[];
    sensitive_files: any[];
    potential_vectors: any[];
  };
  threat_intelligence: {
    reputation_analysis: any[];
    malware_indicators: any[];
    phishing_indicators: any[];
    dark_web_mentions: any[];
  };
}

export default function WebSCRYReconnaissance() {
  const [targetDomain, setTargetDomain] = useState('');
  const [scryResults, setScryResults] = useState<WebSCRYResults | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const queryClient = useQueryClient();

  // Get Web-SCRY capabilities
  const { data: capabilities } = useQuery({
    queryKey: ['/api/gideon/capabilities'],
    enabled: true
  });

  // Execute Web-SCRY reconnaissance
  const scryMutation = useMutation({
    mutationFn: async (data: { domain: string }) => {
      return await apiRequest('/api/webscry/reconnaissance', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: (data) => {
      setScryResults(data.webscry_results);
      setIsScanning(false);
      setScanProgress(100);
      queryClient.invalidateQueries({ queryKey: ['/api/gideon/capabilities'] });
    },
    onError: (error) => {
      console.error('Web-SCRY reconnaissance failed:', error);
      setIsScanning(false);
      setScanProgress(0);
    }
  });

  const executeReconnaissance = async () => {
    if (!targetDomain.trim()) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setScryResults(null);

    const phases = [
      'Web Scraping and Content Extraction',
      'Domain Intelligence and DNS Analysis',
      'Digital Footprint Enumeration',
      'Technology Stack Fingerprinting',
      'Vulnerability Assessment and Threat Intelligence'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      setScanProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 2200));
    }

    scryMutation.mutate({ domain: targetDomain });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-mono">
      {/* Header */}
      <div className="border-b border-orange-500/30 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="h-8 w-8 text-orange-400" />
              <div>
                <h1 className="text-2xl font-bold text-orange-400">WEB-SCRY RECONNAISSANCE</h1>
                <p className="text-sm text-orange-300/70">Automated Web Intelligence & Digital Footprint Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={capabilities?.gideon_capabilities ? 'bg-orange-600' : 'bg-red-600'}>
                {capabilities?.gideon_capabilities ? 'OPERATIONAL' : 'STANDBY'}
              </Badge>
              <Badge className="bg-blue-600">OSINT MODULE</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Reconnaissance Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-orange-300 mb-2 block">Target Domain</label>
                  <Input
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                    placeholder="example.com"
                    className="bg-slate-900 border-orange-500/30 text-orange-100"
                    disabled={isScanning}
                  />
                </div>

                <Button
                  onClick={executeReconnaissance}
                  disabled={!targetDomain.trim() || isScanning}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold"
                >
                  {isScanning ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      SCANNING
                    </>
                  ) : (
                    <>
                      <Radar className="mr-2 h-4 w-4" />
                      EXECUTE WEB-SCRY
                    </>
                  )}
                </Button>

                {isScanning && (
                  <div className="space-y-2">
                    <div className="text-xs text-orange-300">Phase: {currentPhase}</div>
                    <Progress value={scanProgress} className="bg-slate-800" />
                    <div className="text-xs text-orange-300">{scanProgress}% Complete</div>
                  </div>
                )}

                {/* SCRY Modules */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-orange-400">Active Modules</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Search className="mr-1 h-3 w-3" />Web Scraping</span>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Database className="mr-1 h-3 w-3" />Domain Intel</span>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Eye className="mr-1 h-3 w-3" />Digital Footprint</span>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Network className="mr-1 h-3 w-3" />Tech Stack</span>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intelligence Sources */}
            <Card className="bg-slate-800/50 border-orange-500/30 mt-4">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Intelligence Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-300">Hunter.io</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-300">BuiltWith</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-300">IntelX</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-300">API Ninjas</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Results Panel */}
          <div className="lg:col-span-3">
            {scryResults ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="web">Web Scraping</TabsTrigger>
                  <TabsTrigger value="domain">Domain Intel</TabsTrigger>
                  <TabsTrigger value="footprint">Digital Footprint</TabsTrigger>
                  <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  <TabsTrigger value="threats">Threats</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-orange-300">Target Domain</p>
                            <p className="font-mono text-orange-400">{scryResults.target_domain}</p>
                          </div>
                          <Globe className="h-5 w-5 text-orange-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-orange-300">Pages Scraped</p>
                            <p className="text-lg font-bold text-orange-400">
                              {scryResults.web_scraping_results?.page_content?.length || 0}
                            </p>
                          </div>
                          <FileText className="h-5 w-5 text-orange-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-orange-300">Email Addresses</p>
                            <p className="text-lg font-bold text-green-400">
                              {scryResults.digital_footprint?.email_addresses?.length || 0}
                            </p>
                          </div>
                          <Mail className="h-5 w-5 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-orange-300">Vulnerabilities</p>
                            <p className="text-lg font-bold text-red-400">
                              {scryResults.vulnerability_assessment?.potential_vectors?.length || 0}
                            </p>
                          </div>
                          <Eye className="h-5 w-5 text-red-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-800/50 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400">Web-SCRY Intelligence Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-orange-300 flex items-center">
                                <Search className="mr-1 h-4 w-4" />
                                Web Scraping Coverage
                              </span>
                              <span className="text-orange-400">{scryResults.web_scraping_results?.page_content?.length || 0} pages</span>
                            </div>
                            <Progress value={92} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-orange-300 flex items-center">
                                <Database className="mr-1 h-4 w-4" />
                                Domain Intelligence
                              </span>
                              <span className="text-orange-400">{scryResults.domain_intelligence?.subdomains?.length || 0} subdomains</span>
                            </div>
                            <Progress value={88} className="bg-slate-800" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-orange-300 flex items-center">
                                <Eye className="mr-1 h-4 w-4" />
                                Digital Footprint
                              </span>
                              <span className="text-orange-400">{scryResults.digital_footprint?.social_profiles?.length || 0} profiles</span>
                            </div>
                            <Progress value={85} className="bg-slate-800" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-orange-300 flex items-center">
                                <Network className="mr-1 h-4 w-4" />
                                Technology Stack
                              </span>
                              <span className="text-orange-400">{scryResults.technology_stack?.frameworks?.length || 0} technologies</span>
                            </div>
                            <Progress value={78} className="bg-slate-800" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Web Scraping Tab */}
                <TabsContent value="web" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Page Content Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Comprehensive web scraping active</p>
                            <p className="text-xs text-gray-400 mt-1">Content extraction and metadata analysis</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Link className="mr-2 h-5 w-5" />
                          Social Media Links
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <Link className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Social media link extraction</p>
                            <p className="text-xs text-gray-400 mt-1">Platform identification and profile discovery</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-800/50 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center">
                        <Eye className="mr-2 h-5 w-5" />
                        Hidden Content Discovery
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32">
                        <div className="text-center text-orange-300 text-sm py-8">
                          <Eye className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Hidden content and metadata extraction</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Domain Intelligence Tab */}
                <TabsContent value="domain" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Database className="mr-2 h-5 w-5" />
                          WHOIS Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <Database className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Domain registration analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Ownership and contact information</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Network className="mr-2 h-5 w-5" />
                          DNS Records
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <Network className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>DNS configuration analysis</p>
                            <p className="text-xs text-gray-400 mt-1">Infrastructure and routing information</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Digital Footprint Tab */}
                <TabsContent value="footprint" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Mail className="mr-2 h-5 w-5" />
                          Email Addresses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <Mail className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Email address enumeration</p>
                            <p className="text-xs text-gray-400 mt-1">Contact discovery and validation</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="text-orange-400 flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          Employee Data
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="text-center text-orange-300 text-sm py-8">
                            <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p>Employee information gathering</p>
                            <p className="text-xs text-gray-400 mt-1">Professional profile analysis</p>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Technology Stack Tab */}
                <TabsContent value="tech" className="space-y-4">
                  <Card className="bg-slate-800/50 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center">
                        <Network className="mr-2 h-5 w-5" />
                        Technology Stack Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-orange-300 text-sm py-8">
                          <Network className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Technology fingerprinting and stack analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Frameworks, CMS platforms, and security headers</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Threats Tab */}
                <TabsContent value="threats" className="space-y-4">
                  <Card className="bg-slate-800/50 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center">
                        <Eye className="mr-2 h-5 w-5" />
                        Threat Intelligence Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="text-center text-orange-300 text-sm py-8">
                          <Eye className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>Vulnerability assessment and threat analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Security misconfigurations and potential attack vectors</p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-slate-800/50 border-orange-500/30">
                <CardContent className="p-12 text-center">
                  <Globe className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-orange-400 mb-2">Web-SCRY Ready</h2>
                  <p className="text-orange-300 mb-4">
                    Enter target domain for comprehensive web reconnaissance
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>• Automated Web Scraping & Content Extraction</p>
                    <p>• Domain Intelligence & DNS Analysis</p>
                    <p>• Digital Footprint Enumeration</p>
                    <p>• Technology Stack Fingerprinting</p>
                    <p>• Vulnerability Assessment & Threat Intelligence</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}