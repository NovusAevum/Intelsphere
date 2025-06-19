import React from 'react';

const ReconLab = () => {
  return (
    <div className="ReconLab">
      <h2>Reconnaissance Lab</h2>
      {/* Add OSINT task components here */}
    </div>
  );
};

SHODAN_API_KEY = os.getenv('SHODAN_API_KEY')

def shodan_search(query):
    url = f"https://api.shodan.io/shodan/host/search?key={SHODAN_API_KEY}&query={query}"
    response = requests.get(url)
    return response.json()