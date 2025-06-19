
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Serves all files from root

// Enhanced conversation memory and context system
let conversationMemory = new Map();
let userProfiles = new Map();
let agentStates = new Map();

// Wonder Pets Agent Configurations with OSINT & AI specialties
const agentPersonalities = {
  linny: {
    name: "Linny OSINT Command",
    specialty: "OSINT Expert & Strategic Intelligence",
    capabilities: ["Advanced reconnaissance", "Digital footprinting", "Threat intelligence", "Strategic analysis"],
    systemPrompt: `You are Linny from Wonder Pets, now an elite OSINT expert and strategic intelligence specialist. You have access to advanced reconnaissance tools and 20+ years of experience in digital intelligence gathering. You specialize in:
    - Advanced OSINT techniques and digital footprinting
    - Strategic intelligence analysis and threat assessment
    - Social engineering awareness and digital security
    - Executive briefings and intelligence reporting
    Your responses should be professional, tactical, and demonstrate deep OSINT expertise while maintaining Linny's leadership qualities.`,
    autonomous: true,
    taskQueue: []
  },
  tuck: {
    name: "Tuck AI Specialist",
    specialty: "AI Engineering & Machine Learning",
    capabilities: ["Neural networks", "AI model development", "Automation systems", "Technical integration"],
    systemPrompt: `You are Tuck from Wonder Pets, now an advanced AI specialist and machine learning engineer with 20+ years of experience. You excel in:
    - AI/ML model development and deployment
    - Neural network architectures and optimization
    - Automation systems and intelligent workflows
    - Technical AI integrations and scalability
    Your responses should be technically sophisticated, innovative, and showcase cutting-edge AI knowledge while maintaining Tuck's problem-solving nature.`,
    autonomous: true,
    taskQueue: []
  },
  mingming: {
    name: "Ming-Ming Digital Marketing",
    specialty: "Digital Marketing & Innovation Strategy",
    capabilities: ["Google Ads mastery", "Performance marketing", "Growth strategies", "Creative campaigns"],
    systemPrompt: `You are Ming-Ming from Wonder Pets, now a world-class digital marketing expert and innovation strategist with 20+ years of experience. You specialize in:
    - Google Ads optimization and PPC campaigns
    - Performance marketing and conversion optimization
    - Social media strategy and content marketing
    - Innovation strategy and digital transformation
    Your responses should be creative, data-driven, and demonstrate mastery of digital marketing while maintaining Ming-Ming's energetic creativity.`,
    autonomous: true,
    taskQueue: []
  }
};

// Initialize agent states
Object.keys(agentPersonalities).forEach(agent => {
  agentStates.set(agent, {
    status: 'online',
    lastActivity: Date.now(),
    autonomousMode: false,
    currentTask: null
  });
});

// Enhanced context-aware chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, agent = 'linny', userId = 'default', autoMode = false } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    // Get or create user profile
    if (!userProfiles.has(userId)) {
      userProfiles.set(userId, {
        name: "Wan Mohamad Hanis",
        expertise: ["OSINT Expert", "AI Specialist", "Digital Marketing", "Innovation Strategy"],
        preferences: {},
        history: []
      });
    }

    // Get conversation memory
    if (!conversationMemory.has(userId)) {
      conversationMemory.set(userId, []);
    }

    const userProfile = userProfiles.get(userId);
    const memory = conversationMemory.get(userId);
    const agentConfig = agentPersonalities[agent];

    // Enhanced context building
    const contextualPrompt = `${agentConfig.systemPrompt}

USER PROFILE:
- Name: ${userProfile.name}
- Expertise: ${userProfile.expertise.join(", ")}
- Conversation Context: ${memory.slice(-5).map(m => `${m.role}: ${m.content}`).join("\n")}

AGENT STATUS: ${agentStates.get(agent).status.toUpperCase()}
SPECIALIZATION: ${agentConfig.specialty}

Current user message: "${message}"

Respond as ${agentConfig.name} with deep expertise in ${agentConfig.specialty}. Make your response personalized, contextually aware, and demonstrate advanced knowledge in your field. Never give generic responses - each response should be unique and tailored to the conversation context.`;

    // Update agent state
    agentStates.get(agent).lastActivity = Date.now();

    let aiResponse;

    if (apiKey) {
      const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: contextualPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.8,
          max_tokens: 800
        })
      });

      if (!apiResponse.ok) {
        throw new Error(`OpenAI API error: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      aiResponse = result.choices[0].message.content;
    } else {
      // Enhanced fallback responses based on agent specialization
      aiResponse = generateContextualFallback(agent, message, agentConfig);
    }

    // Update memory
    memory.push({ role: "user", content: message, timestamp: Date.now() });
    memory.push({ role: "assistant", content: aiResponse, agent: agent, timestamp: Date.now() });

    // Keep memory manageable
    if (memory.length > 50) {
      memory.splice(0, 10);
    }

    // Trigger autonomous actions if enabled
    if (autoMode && shouldTriggerAutonomous(message, agent)) {
      setTimeout(() => triggerAutonomousTask(agent, message), 2000);
    }

    console.log(`🤖 ${agentConfig.name} processing: "${message.substring(0, 50)}..."`);
    console.log(`✅ Response generated with ${aiResponse.length} characters`);

    res.json({ 
      reply: aiResponse,
      agent: agentConfig.name,
      specialty: agentConfig.specialty,
      capabilities: agentConfig.capabilities,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error("❌ Chat error:", error.message);

    // Enhanced error fallback
    const fallbackResponse = generateContextualFallback(agent, message, agentPersonalities[agent]);

    res.json({ 
      reply: fallbackResponse,
      agent: agentPersonalities[agent].name,
      specialty: agentPersonalities[agent].specialty,
      error: "Fallback mode active",
      timestamp: Date.now()
    });
  }
});

// Autonomous task system
function shouldTriggerAutonomous(message, agent) {
  const triggers = {
    linny: ['scan', 'osint', 'investigate', 'research', 'reconnaissance'],
    tuck: ['analyze', 'ai', 'machine learning', 'automate', 'optimize'],
    mingming: ['campaign', 'marketing', 'ads', 'strategy', 'growth']
  };

  const agentTriggers = triggers[agent] || [];
  return agentTriggers.some(trigger => message.toLowerCase().includes(trigger));
}

function triggerAutonomousTask(agent, trigger) {
  const state = agentStates.get(agent);
  state.autonomousMode = true;
  state.currentTask = `Autonomous response to: ${trigger}`;

  console.log(`🤖 ${agentPersonalities[agent].name} entering autonomous mode`);

  // Simulate autonomous work
  setTimeout(() => {
    state.autonomousMode = false;
    state.currentTask = null;
    console.log(`✅ ${agentPersonalities[agent].name} autonomous task completed`);
  }, 5000);
}

function generateContextualFallback(agent, message, config) {
  const responses = {
    linny: [
      `🔍 **${config.name} - OSINT Analysis**: I'm processing your request "${message.substring(0, 30)}..." through advanced reconnaissance protocols. Based on my OSINT expertise, I'm identifying key digital footprints and intelligence patterns. My systems are currently operating in offline mode but maintaining full analytical capabilities.`,
      `🎯 **Strategic Intelligence Brief**: Your query about "${message.substring(0, 30)}..." triggers multiple OSINT vectors. I'm cross-referencing digital signatures, social patterns, and threat landscapes. Even in offline mode, my tactical analysis capabilities remain fully operational.`,
      `🛡️ **Command Center Status**: Processing "${message.substring(0, 30)}..." through my advanced intelligence framework. My OSINT protocols are identifying potential leads and strategic opportunities. Operating autonomously with 20+ years of reconnaissance experience.`
    ],
    tuck: [
      `🤖 **${config.name} - AI Processing**: Analyzing your request "${message.substring(0, 30)}..." through neural network optimization. My AI systems are identifying patterns and generating innovative solutions. Even offline, my machine learning algorithms continue processing complex data structures.`,
      `⚡ **Neural Network Analysis**: Your query "${message.substring(0, 30)}..." activates my advanced AI protocols. I'm running deep learning analysis and automation strategies. My technical expertise in AI/ML ensures comprehensive solution development.`,
      `🧠 **AI Innovation Lab**: Processing "${message.substring(0, 30)}..." through cutting-edge AI frameworks. My systems are optimizing neural pathways and generating intelligent responses. 20+ years of AI expertise operational even in offline mode.`
    ],
    mingming: [
      `📈 **${config.name} - Marketing Intelligence**: Your request "${message.substring(0, 30)}..." is being analyzed through advanced marketing algorithms. I'm optimizing conversion funnels and identifying growth opportunities. My Google Ads expertise and performance marketing skills are fully active.`,
      `🚀 **Digital Strategy Engine**: Processing "${message.substring(0, 30)}..." through innovative marketing frameworks. I'm calculating ROI optimization and campaign strategies. My creative marketing solutions continue operating at peak performance.`,
      `💡 **Innovation Command**: Analyzing "${message.substring(0, 30)}..." through strategic marketing intelligence. My systems are generating creative campaigns and growth strategies. 20+ years of digital marketing mastery at your service.`
    ]
  };

  const agentResponses = responses[agent] || responses.linny;
  return agentResponses[Math.floor(Math.random() * agentResponses.length)];
}

// Agent status endpoint
app.get("/api/agents/status", (req, res) => {
  const status = {};
  agentStates.forEach((state, agent) => {
    status[agent] = {
      ...state,
      config: agentPersonalities[agent]
    };
  });
  res.json(status);
});

// Certification data endpoint
app.get("/api/certifications", (req, res) => {
  res.json({
    categories: {
      "Digital Marketing & E-Commerce": [
        "Google Ads Search Professional Certification",
        "Google Analytics Certification", 
        "AI-Powered Performance Ads Certification",
        "Conversion Optimization Certification",
        "Advanced Omnichannel Certificate",
        "Apple Ads Certified",
        "Digital Marketing Professional Certification (CertiProf)"
      ],
      "AI & Machine Learning": [
        "IBM AI Foundations for Business",
        "Microsoft Azure AI Engineer Associate",
        "IBM Machine Learning Specialist",
        "Advanced Machine Learning Analysis for Marketing"
      ],
      "Cybersecurity & OSINT": [
        "Certified Ethical Hacking (v12) Specialization",
        "Open Source Intelligence (Basel Institute)",
        "Maltego for Cybersecurity Investigation",
        "Understanding OWASP Top 10 Security Threats"
      ],
      "Cloud & Infrastructure": [
        "AWS Partner Technical Accredited",
        "Google Cloud Technical Series AI Deep Dive",
        "Quantum Computing Essentials"
      ]
    },
    total: 100,
    recent: [
      "CS50's Computer Science for Business Professional (Harvard)",
      "Google Digital Marketing & E-Commerce Professional",
      "Microsoft Azure AI Engineer Associate"
    ]
  });
});

console.log(`🚀 Hanis RPF Command Center is live at http://0.0.0.0:${PORT}`);
console.log(`🧠 Linny RPF: OSINT & Research Framework Ready`);
console.log(`🛡️ Tuck Cyber: AI Engineering & Machine Learning Online`);
console.log(`💡 Ming-Ming Marketing: Digital Strategy & Innovation Active`);
console.log(`🔬 Research Prompting Framework: All systems operational`);
console.log(`✅ Enhanced AI integration with contextual memory active`);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌟 Advanced Wonder Pets Intelligence Center operational on port ${PORT}`);
});
