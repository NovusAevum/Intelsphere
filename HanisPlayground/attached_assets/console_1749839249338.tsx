import React, { useEffect, useState } from 'react';

const Console: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('Loading AI Control Deck...');

  useEffect(() => {
    fetch('/AI_CONTROL_DECK.md')
      .then(res => res.text())
      .then(setMarkdown)
      .catch(() => setMarkdown('⚠️ Failed to load AI Control Deck. Ensure the file exists at project root.'));
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen font-mono overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">🧠 INTELSPHERE APEX – AI Control Deck Console</h1>
      <div className="bg-gray-800 p-4 rounded shadow-lg text-sm whitespace-pre-wrap">
        {markdown}
      </div>
    </div>
  );
};

export default Console;
