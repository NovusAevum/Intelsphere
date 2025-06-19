import { Router } from 'express';

const router = Router();

interface UserProfile {
  name: string;
  role: string;
  timezone: string;
  lastLogin: string;
  totalSessions: number;
  preferredModules: string[];
  achievementLevel: string;
  weeklyGoals: {
    completed: number;
    total: number;
  };
}

interface WelcomeData {
  greeting: string;
  timeOfDay: string;
  personalizedInsight: string;
  recommendedActions: string[];
  motivationalQuote: string;
}

// Mock user profile data - in production this would come from a user database
const getUserProfile = (): UserProfile => {
  return {
    name: "Intelligence Analyst",
    role: "Senior Business Intelligence Specialist",
    timezone: "UTC",
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    totalSessions: 847,
    preferredModules: [
      'market-research',
      'sales-intelligence', 
      'business-analytics',
      'osint-sales',
      'competitive-monitoring'
    ],
    achievementLevel: "Expert Analyst",
    weeklyGoals: {
      completed: 12,
      total: 15
    }
  };
};

// Generate personalized welcome data based on user profile and current time
const generateWelcomeData = (userProfile: UserProfile): WelcomeData => {
  const hour = new Date().getHours();
  
  const timeOfDay = hour >= 5 && hour < 12 ? 'morning' :
                   hour >= 12 && hour < 17 ? 'afternoon' :
                   hour >= 17 && hour < 20 ? 'evening' : 'night';
  
  const greetings = {
    morning: `Good morning, ${userProfile.name}! Ready to uncover new intelligence?`,
    afternoon: `Good afternoon, ${userProfile.name}! Let's dive into strategic analysis.`,
    evening: `Good evening, ${userProfile.name}! Time for advanced intelligence gathering.`,
    night: `Working late, ${userProfile.name}? Your dedication to intelligence is admirable.`
  };

  const insights = [
    "Your consistent market research has identified 3 emerging opportunities this week",
    "Recent competitive analysis shows significant shifts in your industry landscape", 
    "Your OSINT capabilities have improved 23% based on recent query complexity",
    "Weekly intelligence gathering goals are 80% complete - excellent progress",
    "Your analytical patterns suggest high-value insights in financial risk analysis"
  ];

  const quotes = [
    "Intelligence is not about knowing everything, but knowing where to find everything",
    "The best intelligence comes from connecting seemingly unrelated data points",
    "Strategic advantage belongs to those who see patterns before others",
    "In the age of information, intelligence is the ultimate competitive edge",
    "Every data point tells a story - your job is to listen carefully"
  ];

  const actions = [
    "Review overnight competitive intelligence alerts",
    "Analyze quarterly market trend shifts in your sector",
    "Process new lead intelligence from European markets",
    "Update risk assessment models with latest financial data",
    "Cross-reference OSINT findings with sales pipeline data"
  ];

  const randomIndex = Math.floor(Date.now() / (1000 * 60 * 60)) % insights.length;
  const quoteIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length;

  return {
    greeting: greetings[timeOfDay as keyof typeof greetings],
    timeOfDay,
    personalizedInsight: insights[randomIndex],
    recommendedActions: actions.slice(0, 3),
    motivationalQuote: quotes[quoteIndex]
  };
};

// Get user profile endpoint
router.get('/user-profile', async (req, res) => {
  try {
    const userProfile = getUserProfile();
    
    res.json({
      success: true,
      data: userProfile,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
      timestamp: new Date().toISOString()
    });
  }
});

// Get personalized welcome data endpoint
router.get('/personalized-welcome', async (req, res) => {
  try {
    const userProfile = getUserProfile();
    const welcomeData = generateWelcomeData(userProfile);
    
    res.json({
      success: true,
      data: welcomeData,
      timestamp: new Date().toISOString(),
      userContext: {
        sessionCount: userProfile.totalSessions,
        achievementLevel: userProfile.achievementLevel,
        weeklyProgress: Math.round((userProfile.weeklyGoals.completed / userProfile.weeklyGoals.total) * 100)
      }
    });
  } catch (error) {
    console.error('Error generating personalized welcome:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate personalized welcome data',
      timestamp: new Date().toISOString()
    });
  }
});

// Update user preferences endpoint
router.post('/user-preferences', async (req, res) => {
  try {
    const { preferredModules, weeklyGoals } = req.body;
    
    // In production, this would update the user database
    const updatedProfile = {
      ...getUserProfile(),
      preferredModules: preferredModules || getUserProfile().preferredModules,
      weeklyGoals: weeklyGoals || getUserProfile().weeklyGoals,
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'User preferences updated successfully',
      data: updatedProfile,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user preferences',
      timestamp: new Date().toISOString()
    });
  }
});

// Get personalized insights based on user activity
router.get('/personalized-insights', async (req, res) => {
  try {
    const userProfile = getUserProfile();
    
    const insights = {
      productivity: {
        score: 94.7,
        trend: 'increasing',
        suggestion: 'Your analysis efficiency has improved 15% this month'
      },
      expertise: {
        areas: ['Market Analysis', 'Competitive Intelligence', 'OSINT Research'],
        nextLevel: 'Advanced Financial Risk Modeling',
        progress: 73
      },
      recommendations: [
        {
          type: 'skill_development',
          title: 'Advanced OSINT Techniques',
          description: 'Enhance your intelligence gathering with deep web analysis'
        },
        {
          type: 'workflow_optimization',
          title: 'Automated Competitive Monitoring',
          description: 'Set up intelligent alerts for competitor activities'
        },
        {
          type: 'strategic_focus',
          title: 'Emerging Market Analysis',
          description: 'Identify opportunities in developing market segments'
        }
      ]
    };
    
    res.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating personalized insights:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate personalized insights',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;