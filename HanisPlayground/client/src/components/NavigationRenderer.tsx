/**
 * NavigationRenderer - Dynamic navigation component based on JSON config
 * Renders navigation elements from configuration instead of hardcoded components
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  component: string;
  description: string;
  active: boolean;
  order: number;
}

interface NavigationConfig {
  primary: NavigationItem[];
  secondary: NavigationItem[];
  admin: NavigationItem[];
}

export function NavigationRenderer() {
  const [location] = useLocation();
  const [navigationConfig, setNavigationConfig] = useState<NavigationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNavigationConfig();
  }, []);

  const fetchNavigationConfig = async () => {
    try {
      const response = await fetch('/api/navigation-config');
      const data = await response.json();
      setNavigationConfig(data.navigation);
      setError(null);
    } catch (error) {
      console.error('Failed to load navigation config:', error);
      // Fallback to basic navigation
      setNavigationConfig({
        primary: [
          {
            id: 'ai-chat',
            label: 'AI Chat',
            path: '/chat',
            icon: '🤖',
            component: 'AIChatPage',
            description: 'AI Chat Interface',
            active: true,
            order: 1
          }
        ],
        secondary: [],
        admin: []
      });
      setError('Navigation unavailable: Backend API is not reachable. Showing minimal navigation.');
    } finally {
      setLoading(false);
    }
  };

  const renderNavigationSection = (items: NavigationItem[], title: string) => {
    const activeItems = items
      .filter(item => item.active)
      .sort((a, b) => a.order - b.order);

    if (activeItems.length === 0) return null;

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-3">
          {title}
        </h3>
        {activeItems.map(item => (
          <NavigationLink
            key={item.id}
            item={item}
            isActive={location === item.path}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-64 bg-gray-800 p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">IntelSphere</h2>
        {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
      </div>
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navigationConfig && renderNavigationSection(navigationConfig.primary, 'Core Modules')}
        {navigationConfig && renderNavigationSection(navigationConfig.secondary, 'Advanced')}
        {navigationConfig && renderNavigationSection(navigationConfig.admin, 'System')}
      </div>
    </nav>
  );
}

function NavigationLink({ item, isActive }: { item: NavigationItem; isActive: boolean }) {
  return (
    <Link href={item.path}>
      <a
        className={`
          flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
          ${isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
      >
        <span className="text-lg">{item.icon}</span>
        <span className="font-medium">{item.label}</span>
      </a>
    </Link>
  );
}