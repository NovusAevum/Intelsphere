exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      navigation: {
        primary: [
          { id: 'dashboard', label: 'Dashboard', path: '/', icon: '🏠', component: 'IntelSphere', description: 'Main dashboard', active: true, order: 1 },
          { id: 'ai-chat', label: 'AI Chat', path: '/chat', icon: '🤖', component: 'AIChatPage', description: 'AI Chat Interface', active: true, order: 2 }
        ],
        secondary: [],
        admin: []
      }
    })
  };
}; 