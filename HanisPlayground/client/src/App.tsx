/**
 * Main App Component - Unified routing with dynamic catch-all
 */

import { Route, Switch } from 'wouter';
import EnhancedGlobalNavigation from '@/components/enhanced-global-navigation';
import IntelSphere from './pages/intelsphere';
import DynamicFileRoute from '@/components/DynamicFileRoute';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <EnhancedGlobalNavigation />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={IntelSphere} />
          {/* Catch-all: map "/foo" -> "/src/pages/foo.tsx" if exists */}
          <Route>
            <DynamicFileRoute />
          </Route>
        </Switch>
      </main>
    </div>
  );
}