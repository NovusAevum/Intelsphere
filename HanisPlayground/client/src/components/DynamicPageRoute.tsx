import React from 'react';
import { Route } from 'wouter';

// Eagerly import all page modules to enable static code-splitting by Vite
const pageModules = import.meta.glob('../pages/*.tsx', { eager: true }) as Record<string, any>;

function resolveComponentBySlug(slug: string): React.ComponentType | null {
  // Construct candidate file keys
  const candidates = [
    `../pages/${slug}.tsx`,
    `../pages/${slug.toLowerCase()}.tsx`,
  ];

  for (const key of candidates) {
    if (pageModules[key]?.default) {
      return pageModules[key].default as React.ComponentType;
    }
  }

  return null;
}

function AnyPage({ params }: { params: { page: string } }) {
  const Comp = resolveComponentBySlug(params.page);
  if (!Comp) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Page Not Found</h2>
          <p className="text-gray-400">No page component for "/{params.page}"</p>
        </div>
      </div>
    );
  }
  return <Comp />;
}

export default function DynamicPageRoute() {
  return <Route path="/:page" component={AnyPage} />;
}