import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, User, Crown, Zap, Brain, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  role: string;
  level: string;
  achievements: string[];
  currentStreak: number;
  totalAnalyses: number;
}

export default function PersonalizedWelcome() {
  const [profile] = useState<UserProfile>({
    name: "Intelligence Analyst",
    role: "Strategic Operations Commander",
    level: "Elite Operator",
    achievements: ["OSINT Specialist", "Threat Hunter", "Data Architect"],
    currentStreak: 12,
    totalAnalyses: 1247
  });

  const [timeGreeting, setTimeGreeting] = useState("");
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const motivationalQuotes = [
    "Your analytical mind shapes the future of intelligence.",
    "Every insight you uncover strengthens our strategic advantage.",
    "Excellence in intelligence begins with your dedication.",
    "Your expertise transforms data into decisive action.",
    "In the realm of intelligence, you are the architect of clarity."
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeGreeting("Good morning");
    } else if (hour < 17) {
      setTimeGreeting("Good afternoon");
    } else {
      setTimeGreeting("Good evening");
    }

    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setMotivationalQuote(randomQuote);
  }, []);

  const handleBeginAnalysis = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Begin comprehensive intelligence analysis for Malaysia and ASEAN markets. Provide current market insights, business intelligence trends, and strategic recommendations.',
          personality: 'strategic'
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis request failed');
      }

      const data = await response.json();
      
      toast({
        title: "Analysis Complete",
        description: "Strategic intelligence analysis has been generated. Check the AI Assistant for detailed insights.",
      });

      // Log the analysis to console for development
      console.log('Intelligence Analysis:', data.response);
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Unable to complete analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 border-blue-500/30 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {timeGreeting}, {profile.name}
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  <Crown className="h-3 w-3 mr-1" />
                  {profile.level}
                </Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  {profile.role}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>{profile.currentStreak} day streak</span>
            </div>
            <div className="text-xs text-slate-400">
              {profile.totalAnalyses.toLocaleString()} total analyses
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-slate-300 italic mb-3">
            "{motivationalQuote}"
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.achievements.map((achievement, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="border-amber-500/30 text-amber-400"
              >
                <Target className="h-3 w-3 mr-1" />
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Operational Status: <span className="text-green-400 font-medium">Active</span>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleBeginAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            <Brain className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Begin Analysis'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}