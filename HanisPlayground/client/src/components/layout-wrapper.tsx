import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Brain, Home, ArrowLeft } from 'lucide-react';
import EnhancedGlobalNavigation from '@/components/enhanced-global-navigation';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [location] = useLocation();
  const isMainDashboard = location === '/' || location === '/dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      <EnhancedGlobalNavigation />
      
      {/* Quick Navigation Bar - Only show on non-dashboard pages */}
      {!isMainDashboard && (
        <div className="lg:ml-80 bg-slate-900/80 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 transition-colors"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    IntelSphere Dashboard
                  </Button>
                </Link>
                <div className="text-slate-400 text-sm">
                  Return to GOD LEVEL Intelligence Platform
                </div>
              </div>
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Main
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <main className="lg:ml-80 min-h-screen">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}