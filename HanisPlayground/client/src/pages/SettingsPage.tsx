/**
 * Settings Page - Platform configuration interface
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🔧</span>
              <span>Platform Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Configuration options coming soon</p>
              <p className="text-sm text-gray-500">
                This module will provide system configuration and user preferences
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}