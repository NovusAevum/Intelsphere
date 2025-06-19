import React from 'react';
import AIControlPanel from './components/AIControlPanel';
import ReconLab from './components/ReconLab';
import MarketingIntel from './components/MarketingIntel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Business Intelligence Platform</h1>
      </header>
      <main>
        <AIControlPanel />
        <ReconLab />
        <MarketingIntel />
      </main>
    </div>
  );
}

export default App;import React, { useState } from 'react';

const AIControlPanel = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/agents/test_agent/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="AIControlPanel">
      <h2>AI Control Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AIControlPanel;