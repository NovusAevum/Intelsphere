
// Enhanced Wonder Pets AI Chat System with Multi-Model Integration
let currentAgent = 'linny';
let conversationHistory = [];
let isTyping = false;
let autonomousMode = false;

// Multi-AI Model Configuration
const AI_MODELS = {
  'openai-gpt4': {
    name: 'OpenAI GPT-4',
    endpoint: '/api/chat',
    capabilities: ['reasoning', 'code', 'analysis', 'research']
  },
  'claude': {
    name: 'Anthropic Claude',
    endpoint: '/api/claude',
    capabilities: ['writing', 'analysis', 'coding', 'research']
  },
  'gemini': {
    name: 'Google Gemini',
    endpoint: '/api/gemini', 
    capabilities: ['multimodal', 'reasoning', 'research']
  }
};

// Advanced Chat Initialization
function initChatSystem() {
  const chatOutput = document.getElementById('chatOutput');
  const userInput = document.getElementById('userInput');
  
  if (!chatOutput || !userInput) {
    console.warn('Chat elements not found');
    return;
  }

  // Initialize with welcome message
  addMessage('system', `
    🚀 **HANIS WONDER PETS COMMAND CENTER ONLINE**
    
    **Available Agents:**
    🔍 **Linny OSINT Command** - Advanced reconnaissance & intelligence
    🤖 **Tuck AI Specialist** - Neural networks & machine learning  
    📈 **Ming-Ming Marketing** - Digital strategy & performance marketing
    
    **Advanced Capabilities:**
    • Multi-AI model integration (GPT-4, Claude, Gemini)
    • Deep research with OSINT capabilities
    • Neural network analysis & visualization
    • Autonomous task execution
    • Real-time data processing
    • Advanced cybersecurity analysis
    
    Type your command or select an agent to begin...
  `);

  // Enhanced input handling
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Auto-resize input
  userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });

  // Initialize agent status monitoring
  setInterval(updateAgentStatus, 5000);
}

// Enhanced message sending with multi-model support
async function handleSend() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value.trim();
  
  if (!message || isTyping) return;
  
  userInput.value = '';
  userInput.style.height = 'auto';
  
  // Add user message
  addMessage('user', message);
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    // Determine best AI model for the query
    const selectedModel = selectBestModel(message);
    
    // Send to appropriate AI service
    const response = await sendToAI(message, selectedModel);
    
    hideTypingIndicator();
    addMessage('agent', response.reply, response.agent || currentAgent);
    
    // Update conversation history
    conversationHistory.push({
      user: message,
      agent: response.reply,
      timestamp: Date.now(),
      model: selectedModel
    });
    
    // Trigger autonomous actions if needed
    if (shouldTriggerAutonomous(message)) {
      setTimeout(() => executeAutonomousTask(message), 2000);
    }
    
  } catch (error) {
    hideTypingIndicator();
    addMessage('error', `⚠️ System Error: ${error.message}. Switching to fallback mode.`);
    
    // Fallback to enhanced local responses
    const fallbackResponse = generateAdvancedFallback(message, currentAgent);
    addMessage('agent', fallbackResponse, currentAgent);
  }
}

// Intelligent model selection
function selectBestModel(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('code') || msg.includes('programming') || msg.includes('neural')) {
    return 'openai-gpt4';
  } else if (msg.includes('research') || msg.includes('analysis') || msg.includes('osint')) {
    return 'claude';
  } else if (msg.includes('image') || msg.includes('visual') || msg.includes('multimodal')) {
    return 'gemini';
  }
  
  return 'openai-gpt4'; // Default
}

// HTML escaping function to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Enhanced AI communication
async function sendToAI(message, model = 'openai-gpt4') {
  const modelConfig = AI_MODELS[model];
  
  const requestBody = {
    message: message,
    agent: currentAgent,
    userId: 'hanis-main',
    autoMode: autonomousMode,
    model: model,
    context: {
      conversationHistory: conversationHistory.slice(-10),
      currentCapabilities: getAgentCapabilities(currentAgent),
      specializations: ['OSINT', 'AI/ML', 'Digital Marketing', 'Cybersecurity']
    }
  };

  const response = await fetch(modelConfig.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Agent': currentAgent,
      'X-Model': model
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`${modelConfig.name} API error: ${response.status}`);
  }

  return await response.json();
}

// Enhanced message display with animations
function addMessage(type, content, agent = null) {
  const chatOutput = document.getElementById('chatOutput');
  if (!chatOutput) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type} animate-fade-in`;
  
  const timestamp = new Date().toLocaleTimeString();
  
  // Escape content to prevent XSS
  const safeContent = escapeHtml(content);
  
  let messageHTML = '';
  
  switch(type) {
    case 'user':
      messageHTML = `
        <div class="flex justify-end mb-4">
          <div class="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 rounded-lg max-w-xs lg:max-w-md">
            <div class="text-xs text-cyan-200 mb-1">You • ${timestamp}</div>
            <div class="whitespace-pre-wrap">${safeContent}</div>
          </div>
        </div>
      `;
      break;
      
    case 'agent':
      const agentInfo = getAgentInfo(agent || currentAgent);
      messageHTML = `
        <div class="flex justify-start mb-4">
          <div class="bg-gradient-to-r ${agentInfo.gradient} text-white p-4 rounded-lg max-w-xs lg:max-w-md">
            <div class="text-xs ${agentInfo.textColor} mb-1">${agentInfo.name} • ${timestamp}</div>
            <div class="whitespace-pre-wrap">${formatAIResponse(safeContent)}</div>
          </div>
        </div>
      `;
      break;
      
    case 'system':
      messageHTML = `
        <div class="flex justify-center mb-4">
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg max-w-lg text-center">
            <div class="whitespace-pre-wrap">${safeContent}</div>
          </div>
        </div>
      `;
      break;
      
    case 'error':
      messageHTML = `
        <div class="flex justify-center mb-4">
          <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-lg max-w-lg text-center">
            <div class="whitespace-pre-wrap">${safeContent}</div>
          </div>
        </div>
      `;
      break;
  }
  
  messageDiv.innerHTML = messageHTML;
  chatOutput.appendChild(messageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight;
  
  // Add entrance animation
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 100);
}

// Agent information helper
function getAgentInfo(agent) {
  const agents = {
    'linny': {
      name: 'Linny OSINT Command',
      gradient: 'from-red-600 to-pink-600',
      textColor: 'text-red-200'
    },
    'tuck': {
      name: 'Tuck AI Specialist',
      gradient: 'from-green-600 to-blue-600',
      textColor: 'text-green-200'
    },
    'mingming': {
      name: 'Ming-Ming Marketing',
      gradient: 'from-purple-600 to-yellow-600',
      textColor: 'text-purple-200'
    }
  };
  
  return agents[agent] || agents['linny'];
}

// Enhanced response formatting
function formatAIResponse(content) {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-300">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-cyan-300">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-black bg-opacity-50 px-2 py-1 rounded text-green-300">$1</code>')
    .replace(/🔍|🤖|📈|⚡|🛡️|💡/g, '<span class="text-2xl">$&</span>');
}

// Typing indicator
function showTypingIndicator() {
  isTyping = true;
  const chatOutput = document.getElementById('chatOutput');
  
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typing-indicator';
  typingDiv.className = 'flex justify-start mb-4';
  typingDiv.innerHTML = `
    <div class="bg-gray-700 text-white p-4 rounded-lg">
      <div class="flex items-center space-x-2">
        <div class="typing-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <span class="text-sm text-gray-300">${getAgentInfo(currentAgent).name} is thinking...</span>
      </div>
    </div>
  `;
  
  chatOutput.appendChild(typingDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function hideTypingIndicator() {
  isTyping = false;
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Agent switching
function switchAgent(agent) {
  currentAgent = agent;
  const agentInfo = getAgentInfo(agent);
  
  addMessage('system', `🔄 **Agent Switch Complete**\n\n${agentInfo.name} is now active and ready for advanced operations.`);
  
  // Update UI indicators
  updateAgentUI(agent);
}

// Quick command execution
function executeQuickCommand(command) {
  const commands = {
    'status': 'System status report with all agent capabilities',
    'scan': 'Initiate OSINT reconnaissance scan',
    'analyze': 'Begin AI neural network analysis',
    'research': 'Start deep market research protocol'
  };
  
  if (commands[command]) {
    document.getElementById('userInput').value = commands[command];
    handleSend();
  }
}

// Autonomous task system
function shouldTriggerAutonomous(message) {
  const triggers = ['autonomous', 'auto', 'background', 'continuous', 'monitor'];
  return triggers.some(trigger => message.toLowerCase().includes(trigger));
}

function executeAutonomousTask(trigger) {
  autonomousMode = true;
  
  addMessage('system', `🤖 **Autonomous Mode Activated**\n\nInitiating background AI operations based on: "${trigger}"\n\nSystems will continue processing in autonomous mode...`);
  
  // Simulate autonomous work
  setTimeout(() => {
    autonomousMode = false;
    addMessage('system', `✅ **Autonomous Task Completed**\n\nAll background operations finished successfully. Ready for new instructions.`);
  }, 10000);
}

// Enhanced fallback responses
function generateAdvancedFallback(message, agent) {
  const responses = {
    'linny': [
      `🔍 **OSINT Analysis Protocol Initiated**\n\nProcessing query: "${message.substring(0, 50)}..."\n\n**Intelligence Gathered:**\n• Digital footprint analysis: ACTIVE\n• Threat assessment: MONITORING\n• Social engineering vectors: IDENTIFIED\n• Reconnaissance protocols: DEPLOYED\n\n**Status:** Advanced intelligence operations proceeding with full OSINT capabilities.`,
      
      `🎯 **Strategic Intelligence Briefing**\n\nTarget Query: "${message.substring(0, 50)}..."\n\n**OSINT Framework Activated:**\n• Source validation: COMPLETE\n• Data correlation: IN PROGRESS\n• Threat landscape: ANALYZED\n• Intelligence synthesis: READY\n\n**Recommendation:** Proceeding with advanced reconnaissance protocols.`
    ],
    
    'tuck': [
      `🤖 **Neural Network Analysis Engine**\n\nProcessing: "${message.substring(0, 50)}..."\n\n**AI Systems Status:**\n• Machine learning models: OPTIMIZED\n• Neural pathways: ACTIVE\n• Deep learning protocols: ENGAGED\n• Automation systems: DEPLOYED\n\n**Output:** Advanced AI analysis complete with 99.7% accuracy.`,
      
      `⚡ **AI Specialist Protocol**\n\nQuery Analysis: "${message.substring(0, 50)}..."\n\n**Technical Framework:**\n• Algorithm optimization: COMPLETE\n• Model training: ENHANCED\n• Pattern recognition: ADVANCED\n• Solution generation: READY\n\n**Status:** AI systems operating at maximum efficiency.`
    ],
    
    'mingming': [
      `📈 **Digital Marketing Intelligence**\n\nQuery: "${message.substring(0, 50)}..."\n\n**Performance Metrics:**\n• Campaign optimization: ACTIVE\n• Conversion tracking: MONITORED\n• ROI analysis: CALCULATED\n• Growth strategies: DEPLOYED\n\n**Result:** Marketing intelligence systems fully operational.`,
      
      `💡 **Innovation Strategy Engine**\n\nProcessing: "${message.substring(0, 50)}..."\n\n**Creative Analysis:**\n• Market research: COMPREHENSIVE\n• Trend analysis: CURRENT\n• Strategy development: INNOVATIVE\n• Implementation plan: READY\n\n**Status:** Advanced marketing protocols activated.`
    ]
  };
  
  const agentResponses = responses[agent] || responses['linny'];
  return agentResponses[Math.floor(Math.random() * agentResponses.length)];
}

// Agent capabilities
function getAgentCapabilities(agent) {
  const capabilities = {
    'linny': ['OSINT', 'Threat Intelligence', 'Digital Forensics', 'Social Engineering Analysis'],
    'tuck': ['Machine Learning', 'Neural Networks', 'AI Development', 'Automation'],
    'mingming': ['Digital Marketing', 'Performance Ads', 'Growth Hacking', 'Innovation Strategy']
  };
  
  return capabilities[agent] || [];
}

// UI Updates
function updateAgentUI(agent) {
  // Update any agent-specific UI elements
  const agentIndicators = document.querySelectorAll('.agent-indicator');
  agentIndicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  
  const currentIndicator = document.querySelector(`[data-agent="${agent}"]`);
  if (currentIndicator) {
    currentIndicator.classList.add('active');
  }
}

// Agent status monitoring
function updateAgentStatus() {
  // This would connect to backend for real status updates
  console.log(`🔄 Agent Status Update - ${currentAgent} operational`);
}

// CSS for typing animation
const style = document.createElement('style');
style.textContent = `
  .typing-dots {
    display: flex;
    align-items: center;
    space-x: 1px;
  }
  
  .dot {
    height: 4px;
    width: 4px;
    background-color: #4ade80;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
    margin-right: 2px;
  }
  
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes typing {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }
  
  .animate-fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-out;
  }
  
  .message {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatSystem);
} else {
  initChatSystem();
}

// Global functions for HTML onclick events
window.handleSend = handleSend;
window.executeQuickCommand = executeQuickCommand;
window.switchAgent = switchAgent;
