import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Globe, Shield, Eye, Network, Target, Database, Satellite, Activity, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface OSINTSource {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  url?: string;
  reliability: number;
  accessibility: 'free' | 'paid' | 'restricted';
  coordinates: { x: number; y: number };
  connections: string[];
  tags: string[];
  lastUpdated: string;
  dataTypes: string[];
}

interface NetworkConnection {
  source: string;
  target: string;
  strength: number;
  type: string;
}

export default function OSINTSourceMap() {
  const [selectedSource, setSelectedSource] = useState<OSINTSource | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mapView, setMapView] = useState("network");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [highlightedConnections, setHighlightedConnections] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const { data: osintSources, isLoading } = useQuery({
    queryKey: ["/api/osint-sources"],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const { data: networkData } = useQuery({
    queryKey: ["/api/osint-network"],
    refetchInterval: 30000
  });

  const { data: sourceAnalysis, refetch: refetchAnalysis } = useQuery({
    queryKey: ["/api/osint-source", selectedSource?.id, "analyze"],
    enabled: !!selectedSource,
    refetchInterval: 15000
  });

  const analyzeSourceMutation = useMutation({
    mutationFn: async (sourceId: string) => 
      apiRequest(`/api/osint-source/${sourceId}/analyze`, {
        method: "POST",
        body: JSON.stringify({ analysisType: "comprehensive" })
      }),
    onSuccess: () => {
      refetchAnalysis();
    }
  });

  // Mock data for demonstration
  const mockSources: OSINTSource[] = [
    {
      id: "social-intel-1",
      name: "Social Media Intelligence Hub",
      category: "social",
      type: "aggregator",
      description: "Real-time social media monitoring and sentiment analysis across major platforms",
      reliability: 0.85,
      accessibility: "free",
      coordinates: { x: 200, y: 150 },
      connections: ["web-intel-1", "dark-web-1"],
      tags: ["Twitter", "Facebook", "Instagram", "TikTok"],
      lastUpdated: "2024-01-06",
      dataTypes: ["posts", "profiles", "trends", "sentiment"]
    },
    {
      id: "web-intel-1",
      name: "Web Intelligence Scanner",
      category: "web",
      type: "crawler",
      description: "Comprehensive web crawling and content analysis for public information gathering",
      reliability: 0.92,
      accessibility: "free",
      coordinates: { x: 400, y: 100 },
      connections: ["social-intel-1", "geo-intel-1"],
      tags: ["websites", "domains", "DNS", "WHOIS"],
      lastUpdated: "2024-01-06",
      dataTypes: ["domains", "websites", "metadata", "certificates"]
    },
    {
      id: "dark-web-1",
      name: "Dark Web Monitor",
      category: "darkweb",
      type: "monitor",
      description: "Secure monitoring of dark web activities and threat intelligence",
      reliability: 0.78,
      accessibility: "restricted",
      coordinates: { x: 100, y: 300 },
      connections: ["social-intel-1"],
      tags: ["Tor", "onion", "threats", "cybercrime"],
      lastUpdated: "2024-01-05",
      dataTypes: ["marketplaces", "forums", "threats", "leaks"]
    },
    {
      id: "geo-intel-1",
      name: "Geospatial Intelligence",
      category: "geospatial",
      type: "satellite",
      description: "Satellite imagery and geospatial analysis for location intelligence",
      reliability: 0.95,
      accessibility: "paid",
      coordinates: { x: 600, y: 200 },
      connections: ["web-intel-1", "signal-intel-1"],
      tags: ["satellite", "imagery", "GPS", "mapping"],
      lastUpdated: "2024-01-06",
      dataTypes: ["imagery", "coordinates", "terrain", "infrastructure"]
    },
    {
      id: "signal-intel-1",
      name: "Signal Intelligence Network",
      category: "signals",
      type: "interceptor",
      description: "Communications intelligence and signal analysis capabilities",
      reliability: 0.88,
      accessibility: "restricted",
      coordinates: { x: 500, y: 350 },
      connections: ["geo-intel-1"],
      tags: ["RF", "communications", "spectrum", "intercept"],
      lastUpdated: "2024-01-05",
      dataTypes: ["signals", "communications", "frequencies", "traffic"]
    },
    {
      id: "financial-intel-1",
      name: "Financial Intelligence Center",
      category: "financial",
      type: "database",
      description: "Financial records, transactions, and economic intelligence analysis",
      reliability: 0.90,
      accessibility: "paid",
      coordinates: { x: 300, y: 400 },
      connections: ["web-intel-1"],
      tags: ["banking", "transactions", "crypto", "AML"],
      lastUpdated: "2024-01-06",
      dataTypes: ["transactions", "accounts", "entities", "sanctions"]
    }
  ];

  const categories = [
    { id: "all", name: "All Sources", icon: Globe, color: "bg-blue-500" },
    { id: "social", name: "Social Media", icon: Network, color: "bg-purple-500" },
    { id: "web", name: "Web Intelligence", icon: Search, color: "bg-green-500" },
    { id: "darkweb", name: "Dark Web", icon: Shield, color: "bg-red-500" },
    { id: "geospatial", name: "Geospatial", icon: Satellite, color: "bg-orange-500" },
    { id: "signals", name: "Signals", icon: Target, color: "bg-yellow-500" },
    { id: "financial", name: "Financial", icon: Database, color: "bg-indigo-500" }
  ];

  const filteredSources = mockSources.filter(source => {
    const matchesCategory = activeCategory === "all" || source.category === activeCategory;
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 0.9) return "text-green-600";
    if (reliability >= 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccessibilityBadge = (accessibility: string) => {
    const colors = {
      free: "bg-green-100 text-green-800",
      paid: "bg-blue-100 text-blue-800",
      restricted: "bg-red-100 text-red-800"
    };
    return colors[accessibility as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const drawNetworkConnections = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const connections: JSX.Element[] = [];

    filteredSources.forEach(source => {
      source.connections.forEach(connectionId => {
        const targetSource = mockSources.find(s => s.id === connectionId);
        if (targetSource && filteredSources.includes(targetSource)) {
          const isHighlighted = hoveredNode === source.id || hoveredNode === connectionId || 
                               highlightedConnections.includes(connectionId) || 
                               highlightedConnections.includes(source.id);
          const isSelected = selectedSource?.id === source.id || selectedSource?.id === connectionId;
          
          connections.push(
            <line
              key={`${source.id}-${connectionId}`}
              x1={source.coordinates.x}
              y1={source.coordinates.y}
              x2={targetSource.coordinates.x}
              y2={targetSource.coordinates.y}
              stroke={isSelected ? "#3b82f6" : isHighlighted ? "#10b981" : "#6366f1"}
              strokeWidth={isSelected ? "4" : isHighlighted ? "3" : "2"}
              strokeOpacity={isSelected || isHighlighted ? "1.0" : "0.4"}
              className="connection-line transition-all duration-300"
            />
          );
        }
      });
    });

    return connections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Eye className="h-10 w-10 text-blue-400" />
            OSINT Intelligence Network Map
          </h1>
          <p className="text-lg text-blue-200">
            Interactive visualization of open source intelligence sources and their interconnections
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search sources, descriptions, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className={`${activeCategory === category.id 
                        ? category.color + " text-white" 
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={mapView} onValueChange={setMapView} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="network" className="text-white">Network View</TabsTrigger>
            <TabsTrigger value="list" className="text-white">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="network">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Network Visualization */}
              <Card className="xl:col-span-2 bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Network className="h-5 w-5 text-blue-400" />
                    Intelligence Network Topology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-slate-900 rounded-lg p-4 min-h-[500px]">
                    <svg
                      ref={svgRef}
                      width="100%"
                      height="500"
                      viewBox="0 0 700 500"
                      className="w-full h-full"
                    >
                      {/* Draw connections */}
                      {drawNetworkConnections()}
                      
                      {/* Draw nodes */}
                      {filteredSources.map(source => {
                        const category = categories.find(c => c.id === source.category);
                        const IconComponent = category?.icon || Globe;
                        
                        return (
                          <g key={source.id}>
                            {/* Node circle */}
                            <circle
                              cx={source.coordinates.x}
                              cy={source.coordinates.y}
                              r={hoveredNode === source.id ? "24" : "20"}
                              fill={selectedSource?.id === source.id ? "#3b82f6" : hoveredNode === source.id ? "#10b981" : "#1e293b"}
                              stroke={category?.color.replace('bg-', '#') || "#6366f1"}
                              strokeWidth={selectedSource?.id === source.id ? "4" : hoveredNode === source.id ? "3" : "2"}
                              className="cursor-pointer transition-all duration-300"
                              onClick={() => setSelectedSource(source)}
                              onMouseEnter={() => {
                                setHoveredNode(source.id);
                                setHighlightedConnections(source.connections);
                              }}
                              onMouseLeave={() => {
                                setHoveredNode(null);
                                setHighlightedConnections([]);
                              }}
                            />
                            
                            {/* Node label */}
                            <text
                              x={source.coordinates.x}
                              y={source.coordinates.y - 30}
                              textAnchor="middle"
                              className="fill-white text-xs font-medium cursor-pointer"
                              onClick={() => setSelectedSource(source)}
                            >
                              {source.name.substring(0, 20)}...
                            </text>
                            
                            {/* Reliability indicator */}
                            <circle
                              cx={source.coordinates.x + 15}
                              cy={source.coordinates.y - 15}
                              r="5"
                              fill={source.reliability >= 0.9 ? "#10b981" : source.reliability >= 0.8 ? "#f59e0b" : "#ef4444"}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Source Details */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Source Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSource ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{selectedSource.name}</h3>
                        <p className="text-sm text-slate-300">{selectedSource.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Reliability</p>
                          <div className="flex items-center gap-2">
                            <Progress value={selectedSource.reliability * 100} className="flex-1 h-2" />
                            <span className={`text-sm font-semibold ${getReliabilityColor(selectedSource.reliability)}`}>
                              {(selectedSource.reliability * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Access</p>
                          <Badge className={getAccessibilityBadge(selectedSource.accessibility)}>
                            {selectedSource.accessibility}
                          </Badge>
                        </div>
                      </div>

                      {/* Real-time Analysis Section */}
                      {sourceAnalysis?.data && (
                        <div className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <Activity className="h-4 w-4 text-blue-400" />
                              Live Analytics
                            </h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => analyzeSourceMutation.mutate(selectedSource.id)}
                              disabled={analyzeSourceMutation.isPending}
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              {analyzeSourceMutation.isPending ? (
                                <Activity className="h-3 w-3 animate-spin" />
                              ) : (
                                <Zap className="h-3 w-3" />
                              )}
                              Analyze
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400">Data Quality:</span>
                              <div className="flex items-center gap-1">
                                <Progress value={sourceAnalysis.data.results.dataQuality * 100} className="flex-1 h-1" />
                                <span className="text-white">{(sourceAnalysis.data.results.dataQuality * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400">Response Time:</span>
                              <span className="text-white ml-2">{sourceAnalysis.data.results.responseTime}ms</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Availability:</span>
                              <div className="flex items-center gap-1">
                                <Progress value={sourceAnalysis.data.performanceMetrics.availability * 100} className="flex-1 h-1" />
                                <span className="text-white">{(sourceAnalysis.data.performanceMetrics.availability * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-400">Error Rate:</span>
                              <span className={`ml-2 ${sourceAnalysis.data.results.errorRate < 0.05 ? 'text-green-400' : 'text-yellow-400'}`}>
                                {(sourceAnalysis.data.results.errorRate * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          {sourceAnalysis.data.results.errorRate > 0.05 && (
                            <Alert className="mt-3 border-yellow-600 bg-yellow-900/20">
                              <AlertTriangle className="h-4 w-4 text-yellow-400" />
                              <AlertDescription className="text-yellow-200">
                                High error rate detected. Consider reviewing source configuration.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-slate-400 uppercase mb-2">Data Types</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedSource.dataTypes.map(type => (
                            <Badge key={type} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400 uppercase mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedSource.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Connections</p>
                          <p className="text-slate-300 flex items-center gap-1">
                            <Network className="h-3 w-3" />
                            {selectedSource.connections.length} active
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Last Updated</p>
                          <p className="text-slate-300">{selectedSource.lastUpdated}</p>
                        </div>
                      </div>

                      {/* Connection Health Indicators */}
                      <div>
                        <p className="text-xs text-slate-400 uppercase mb-2">Connection Health</p>
                        <div className="space-y-1">
                          {selectedSource.connections.map(connectionId => {
                            const targetSource = mockSources.find(s => s.id === connectionId);
                            const connectionStrength = Math.random() * 0.4 + 0.6; // 0.6-1.0
                            return targetSource ? (
                              <div key={connectionId} className="flex items-center justify-between text-xs">
                                <span className="text-slate-300">{targetSource.name.substring(0, 20)}...</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={connectionStrength * 100} className="w-12 h-1" />
                                  <span className={`${connectionStrength > 0.8 ? 'text-green-400' : connectionStrength > 0.6 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {(connectionStrength * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 py-8">
                      <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Click on a node to view source details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSources.map(source => {
                const category = categories.find(c => c.id === source.category);
                const IconComponent = category?.icon || Globe;
                
                return (
                  <Card
                    key={source.id}
                    className="bg-slate-800/50 border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setSelectedSource(source)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center gap-2 text-lg">
                        <IconComponent className="h-5 w-5 text-blue-400" />
                        {source.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-slate-300">{source.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <Badge className={getAccessibilityBadge(source.accessibility)}>
                          {source.accessibility}
                        </Badge>
                        <span className={`text-sm font-semibold ${getReliabilityColor(source.reliability)}`}>
                          {(source.reliability * 100).toFixed(0)}% reliable
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {source.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                            {tag}
                          </Badge>
                        ))}
                        {source.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                            +{source.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-slate-400">
                        {source.connections.length} connections • Updated {source.lastUpdated}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{mockSources.length}</div>
              <div className="text-sm text-slate-400">Total Sources</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {mockSources.filter(s => s.accessibility === 'free').length}
              </div>
              <div className="text-sm text-slate-400">Free Sources</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {mockSources.reduce((sum, s) => sum + s.connections.length, 0)}
              </div>
              <div className="text-sm text-slate-400">Total Connections</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(mockSources.reduce((sum, s) => sum + s.reliability, 0) / mockSources.length * 100)}%
              </div>
              <div className="text-sm text-slate-400">Avg Reliability</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}