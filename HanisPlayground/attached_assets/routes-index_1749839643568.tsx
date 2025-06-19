import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch('/ai-routes-index.json')
      .then((res) => res.json())
      .then((data: AIIndex) => setRoutes(data.routes || []))
      .catch(() => console.error("Failed to load AI Routes Index"));
  }, []);

  const grouped = routes.reduce((acc: Record<string, RouteEntry[]>, route) => {
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen overflow-y-scroll font-sans">
      <h1 className="text-3xl font-bold mb-6 text-teal-400">📡 INTELSPHERE Route Index</h1>
      {Object.keys(grouped).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">{category}</h2>
          <ul className="list-disc ml-6 space-y-1">
            {grouped[category].map((route) => (
              <li key={route.path}>
                <a href={route.path} className="text-blue-400 hover:underline">{route.title}</a>
                <span className="ml-2 text-gray-500 text-xs">({route.path})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoutesIndex;
