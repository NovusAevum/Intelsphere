import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Globe, Database, Shield, Eye, Radar, 
  Network, Map, Users, Building, Phone, Mail, 
  BarChart3, Clock, Zap, Filter, Settings, 
  Play, Pause, RefreshCw, Info, Activity, Signal
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import GoBackButton from '@/components/ui/go-back-button';

interface OSINTSource {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'limited';
  reliability: number;
  accessibility: 'free' | 'paid' | 'premium';
  dataTypes: string[];
  apiEndpoint?: string;
  responseTime: number;
  lastChecked: string;
}

interface NetworkStats {
  totalSources: number;
  activeSources: number;
  averageReliability: number;
  categoryDistribution: Record<string, number>;
}

export default function WorkingOSINTSourceMap() {
  const [selectedSource, setSelectedSource] = useState<OSINTSource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [monitoringSource, setMonitoringSource] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch OSINT network data
  const { data: networkData, isLoading, error } = useQuery({
    queryKey: ['/api/osint-network'],
    refetchInterval: 30000 // Auto-refresh every 30 seconds
  });

  // Fetch network statistics
  const { data: networkStats } = useQuery({
    queryKey: ['/api/osint-network/stats'],
    refetchInterval: 60000
  });

  // Monitor source mutation
  const monitorMutation = useMutation({
    mutationFn: async (sourceId: string) => {
      const response = await fetch(`/api/osint-network/monitor/${sourceId}`, {
        method: 'POST'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/osint-network'] });
      setMonitoringSource(null);
    }
  });

  const sources: OSINTSource[] = (networkData as any)?.nodes?.map((node: any) => ({
    id: node.id,
    name: node.name,
    category: node.category,
    status: node.metadata.status,
    reliability: node.metadata.reliability,
    accessibility: node.metadata.accessibility,
    dataTypes: node.metadata.dataTypes,
    apiEndpoint: node.metadata.apiEndpoint,
    responseTime: node.metadata.responseTime,
    lastChecked: node.metadata.lastUpdated
  })) || [];

  const categories = ['all', ...Array.from(new Set(sources.map(s => s.category)))];

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMonitorSource = async (sourceId: string) => {
    setMonitoringSource(sourceId);
    monitorMutation.mutate(sourceId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web_search': return <Globe className="h-4 w-4" />;
      case 'social_media': return <Users className="h-4 w-4" />;
      case 'infrastructure': return <Database className="h-4 w-4" />;
      case 'dark_web': return <Shield className="h-4 w-4" />;
      case 'government': return <Building className="h-4 w-4" />;
      case 'news_media': return <Mail className="h-4 w-4" />;
      case 'commercial': return <BarChart3 className="h-4 w-4" />;
      case 'academic': return <Search className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3">Loading OSINT Network...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white p-6">
        <div className="text-center text-red-400">
          <p>Failed to load OSINT network</p>
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/osint-network'] })}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <GoBackButton />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                OSINT Source Map
              </h1>
              <p className="text-gray-400 mt-2">
                Interactive Intelligence Network Visualization
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Signal className="h-3 w-3 mr-1" />
              Live Network
            </Badge>
          </div>
        </div>

        {/* Network Statistics */}
        {networkStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Sources</p>
                    <p className="text-2xl font-bold text-white">{(networkStats as any).totalSources}</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Sources</p>
                    <p className="text-2xl font-bold text-green-400">{(networkStats as any).activeSources}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Reliability</p>
                    <p className="text-2xl font-bold text-purple-400">{(networkStats as any).averageReliability}%</p>
                  </div>
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Coverage</p>
                    <p className="text-2xl font-bold text-yellow-400">85%</p>
                  </div>
                  <Map className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search OSINT sources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map((source) => (
            <Card 
              key={source.id} 
              className="bg-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedSource(source)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getCategoryIcon(source.category)}
                    {source.name}
                  </CardTitle>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(source.status)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Reliability</span>
                    <span className="text-sm font-medium">{source.reliability}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Response Time</span>
                    <span className="text-sm font-medium">{source.responseTime}ms</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Access</span>
                    <Badge variant="outline" className="text-xs">
                      {source.accessibility}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {source.dataTypes.slice(0, 3).map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {source.dataTypes.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{source.dataTypes.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMonitorSource(source.id);
                    }}
                    disabled={monitoringSource === source.id}
                  >
                    {monitoringSource === source.id ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                        Monitoring...
                      </>
                    ) : (
                      <>
                        <Activity className="h-3 w-3 mr-2" />
                        Monitor Source
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Source Detail Modal */}
        {selectedSource && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-900 border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {getCategoryIcon(selectedSource.category)}
                    {selectedSource.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSource(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge className={getStatusColor(selectedSource.status)}>
                        {selectedSource.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Category</p>
                      <p className="font-medium capitalize">{selectedSource.category.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Reliability</p>
                      <p className="font-medium">{selectedSource.reliability}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Access Level</p>
                      <p className="font-medium capitalize">{selectedSource.accessibility}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Data Types</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSource.dataTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedSource.apiEndpoint && (
                    <div>
                      <p className="text-sm text-gray-400">API Endpoint</p>
                      <p className="font-mono text-sm bg-gray-800 p-2 rounded">
                        {selectedSource.apiEndpoint}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-400">Last Checked</p>
                    <p className="font-medium">
                      {new Date(selectedSource.lastChecked).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}