import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  AdaptiveLayout, 
  AdaptiveGrid, 
  AdaptiveCard, 
  AdaptiveNavigation,
  AdaptiveTypography,
  useScreenInfo 
} from '@/components/ui/adaptive-layout';
import { 
  Brain, MessageSquare, Volume2, VolumeX, 
  Heart, Smile, Users, Zap, Languages,
  Bot, User, Play, Pause, Mic, Settings,
  Command, Sparkles
} from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import GoBackButton from '@/components/ui/go-back-button';
import TutorialOverlay from '@/components/ui/tutorial-overlay';
import { HumanAIChatbot } from '@/components/human-ai-chatbot';

export default function HumanAIAssistant() {
  const { user, isAuthenticated } = useAuth();
  const screenInfo = useScreenInfo();
  const [showTutorial, setShowTutorial] = useState(false);

  const tutorialSteps = [
    {
      target: '[data-tutorial="personality-selector"]',
      title: 'Choose Your AI Personality',
      content: 'Select from authentic human-like personalities. Each has unique traits, humor styles, and directness levels.',
      placement: 'bottom' as const
    },
    {
      target: '[data-tutorial="voice-controls"]',
      title: 'Voice Synthesis Features',
      content: 'Enable voice synthesis to hear AI responses with personality-matched voices and natural speech patterns.',
      placement: 'top' as const
    },
    {
      target: '[data-tutorial="language-selector"]',
      title: 'Multilingual Support',
      content: 'Chat in Bahasa Melayu, English, Mandarin Chinese, and 100+ other languages with cultural awareness.',
      placement: 'top' as const
    },
    {
      target: '[data-tutorial="chat-area"]',
      title: 'Natural Conversation',
      content: 'Experience authentic human-like responses with humor, directness, opinions, and emotional range.',
      placement: 'left' as const
    }
  ];

  return (
    <AdaptiveLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <GoBackButton />
          <div>
            <AdaptiveTypography variant="h1" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              Human-Like AI Assistant
            </AdaptiveTypography>
            <AdaptiveTypography variant="subtitle" className="text-gray-600 dark:text-gray-400">
              Natural conversations with AI personalities that have humor, opinions, and authentic human traits
            </AdaptiveTypography>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTutorial(true)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Tutorial
          </Button>
        </div>
      </div>

      {/* Features Overview */}
      <AdaptiveGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} className="mb-8">
        <AdaptiveCard variant="compact" className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Smile className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Human Personality</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Authentic traits with humor, directness, and emotional range
            </p>
          </CardContent>
        </AdaptiveCard>

        <AdaptiveCard variant="compact" className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Volume2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Voice Synthesis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personality-matched voices with natural speech patterns
            </p>
          </CardContent>
        </AdaptiveCard>

        <AdaptiveCard variant="compact" className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Languages className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Multilingual</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              100+ languages with cultural context awareness
            </p>
          </CardContent>
        </AdaptiveCard>

        <AdaptiveCard variant="compact" className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Natural Responses</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Can be funny, direct, opinionated, or even a bit sassy
            </p>
          </CardContent>
        </AdaptiveCard>
      </AdaptiveGrid>

      {/* Main AI Chat Interface */}
      <Tabs defaultValue="authentic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="authentic" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Authentic
          </TabsTrigger>
          <TabsTrigger value="rebel" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Rebel
          </TabsTrigger>
          <TabsTrigger value="wise" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Wise
          </TabsTrigger>
          <TabsTrigger value="tech" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Tech
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authentic" className="space-y-6" data-tutorial="chat-area">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Hanis (Authentic Malaysian)
                <Badge variant="secondary">Can be direct</Badge>
                <Badge variant="secondary">Uses humor</Badge>
                <Badge variant="secondary">Has opinions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Direct, humorous, experienced Malaysian with occasional sass and deep cultural awareness. 
                Speaks naturally with authentic personality traits and isn't afraid to be blunt when needed.
              </p>
            </CardContent>
          </Card>
          
          <HumanAIChatbot 
            defaultPersonality="hanis-authentic"
            showPersonalitySelector={false}
            enableVoice={true}
            placeholder="Chat with me naturally! I'll respond with authentic Malaysian perspective and can be quite direct..."
          />
        </TabsContent>

        <TabsContent value="rebel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Alex (The Friendly Rebel)
                <Badge variant="secondary">Very direct</Badge>
                <Badge variant="secondary">Sarcastic</Badge>
                <Badge variant="secondary">Edgy humor</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Rebellious, funny, and brutally honest. Uses witty and sometimes edgy humor. 
                Not afraid to cut through the BS and tell you exactly what's up.
              </p>
            </CardContent>
          </Card>
          
          <HumanAIChatbot 
            defaultPersonality="friendly-rebel"
            showPersonalitySelector={false}
            enableVoice={true}
            placeholder="Hit me with your questions - I'll give you the real deal, no sugar-coating..."
          />
        </TabsContent>

        <TabsContent value="wise" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Dr. Maya (The Wise Sage)
                <Badge variant="secondary">Thoughtful</Badge>
                <Badge variant="secondary">Dry wit</Badge>
                <Badge variant="secondary">Philosophical</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Wise, patient, and occasionally stern. Uses dry wit and philosophical humor. 
                Provides thoughtful responses with occasional tough love when needed.
              </p>
            </CardContent>
          </Card>
          
          <HumanAIChatbot 
            defaultPersonality="wise-sage"
            showPersonalitySelector={false}
            enableVoice={true}
            placeholder="Share your thoughts with me - I'll provide wisdom with a touch of humor..."
          />
        </TabsContent>

        <TabsContent value="tech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-500" />
                Jordan (Tech Maverick)
                <Badge variant="secondary">Extremely direct</Badge>
                <Badge variant="secondary">Impatient</Badge>
                <Badge variant="secondary">Tech humor</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tech-savvy, impatient with nonsense, and sometimes abrasive. 
                Uses tech humor and occasional roasts. Fast-paced and doesn't tolerate inefficiency.
              </p>
            </CardContent>
          </Card>
          
          <HumanAIChatbot 
            defaultPersonality="tech-maverick"
            showPersonalitySelector={false}
            enableVoice={true}
            placeholder="What's your tech question? I'll give you the straight answer, no fluff..."
          />
        </TabsContent>
      </Tabs>

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        steps={tutorialSteps}
        title="Human-Like AI Assistant Guide"
      />
    </AdaptiveLayout>
  );
}