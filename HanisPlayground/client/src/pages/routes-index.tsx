import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Search, ExternalLink, Grid3x3, List, Filter } from 'lucide-react';

interface RouteEntry {
  path: string;
  title: string;
  category: string;
}

interface AIIndex {
  routes: RouteEntry[];
}

const RoutesIndex: React.FC = () => {
  const [routes, setRoutes] = useState<RouteEntry[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<RouteEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/ai-routes-index.json')
      .then((res) => res.json())
      .then((data: AIIndex) => {
        setRoutes(data.routes || []);
        setFilteredRoutes(data.routes || []);
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to load AI Routes Index");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = routes;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(route => route.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(route =>
        route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRoutes(filtered);
  }, [routes, searchTerm, selectedCategory]);

  const categories = Array.from(new Set(routes.map(route => route.category))).sort();
  const grouped = filteredRoutes.reduce((acc: Record<string, RouteEntry[]>, route) => {
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {});

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'Core Command Center': return '🎯';
      case 'AI Intelligence': return '🤖';
      case 'Agent Management': return '👥';
      case 'OSINT Intelligence': return '🕵️';
      case 'GIDEON Framework': return '⚔️';
      case 'Business Intelligence': return '📊';
      case 'Market Intelligence': return '📈';
      case 'Financial Intelligence': return '💰';
      case 'Social Intelligence': return '🌐';
      case 'Threat Intelligence': return '🛡️';
      case 'Industry Intelligence': return '🏭';
      case 'Research & Development': return '🔬';
      case 'System Management': return '⚙️';
      case 'Premium Features': return '⭐';
      case 'Platform Core': return '🚀';
      case 'AI Personalities': return '🎭';
      case 'Communication': return '💬';
      case 'Professional': return '👔';
      case 'Navigation': return '🧭';
      case 'Authentication': return '🔐';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-xl font-semibold">Loading IntelSphere Route Index...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white font-sans">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                📡 INTELSPHERE Route Index
              </h1>
              <p className="text-gray-300 mt-2">Comprehensive navigation directory for all platform capabilities</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
                ← Return to Dashboard
              </Link>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search routes, titles, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none min-w-[200px]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg border border-cyan-500/30">
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-l-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-r-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredRoutes.length} of {routes.length} routes
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No routes found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(grouped).sort().map((category) => (
              <div key={category} className="bg-white/5 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 px-6 py-4 border-b border-cyan-500/30">
                  <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
                    <span className="mr-3 text-2xl">{getCategoryIcon(category)}</span>
                    {category}
                    <span className="ml-auto text-sm bg-cyan-600/30 px-3 py-1 rounded-full">
                      {grouped[category].length} routes
                    </span>
                  </h2>
                </div>

                <div className="p-6">
                  {viewMode === 'list' ? (
                    <div className="space-y-3">
                      {grouped[category].map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform"></div>
                            <div>
                              <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                {route.title}
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">{route.path}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {grouped[category].map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          className="group p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full group-hover:scale-125 transition-transform"></div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </div>
                          <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors mb-2">
                            {route.title}
                          </h3>
                          <p className="text-sm text-gray-400">{route.path}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesIndex;