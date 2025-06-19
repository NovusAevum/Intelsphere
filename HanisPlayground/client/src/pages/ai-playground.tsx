import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, Cpu, Sparkles } from 'lucide-react';

// Import AI Assistant Components
import { HumanAIChatbot } from '@/components/human-ai-chatbot';

export default function AIPlayground() {
  const [activeTab, setActiveTab] = useState('human-ai');

  const assistants = [
    {
      id: 'human-ai',
      name: 'Human AI Assistant',
      description: 'Natural conversations with distinct personalities in Malaysian languages',
      icon: <Bot className="h-5 w-5" />,
      features: ['Kelantan Dialect', 'Manglish', '7 Personalities', 'Voice Synthesis'],
      status: 'Active',
      component: <HumanAIChatbot />
    },
    {
      id: 'smart-ai',
      name: 'Smart AI Assistant',
      description: 'Advanced intelligence with professional capabilities',
      icon: <Brain className="h-5 w-5" />,
      features: ['Deep Analysis', 'Professional Responses', 'Context Awareness', 'Multi-Modal'],
      status: 'Coming Soon',
      component: <div className="p-8 text-center text-muted-foreground">Smart AI Assistant - Coming Soon</div>
    },
    {
      id: 'smart-ai-v2',
      name: 'Smart AI Assistant V2',
      description: 'Next-generation AI with enhanced reasoning and creativity',
      icon: <Cpu className="h-5 w-5" />,
      features: ['Enhanced Reasoning', 'Creative Output', 'Advanced RAG', 'Consciousness Simulation'],
      status: 'Coming Soon',
      component: <div className="p-8 text-center text-muted-foreground">Smart AI Assistant V2 - Coming Soon</div>
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Playground
              </h1>
              <p className="text-muted-foreground">
                Explore and interact with our advanced AI assistant collection
              </p>
            </div>
          </div>
        </div>

        {/* Assistant Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {assistants.map((assistant) => (
            <Card 
              key={assistant.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeTab === assistant.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveTab(assistant.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {assistant.icon}
                    <CardTitle className="text-lg">{assistant.name}</CardTitle>
                  </div>
                  <Badge 
                    variant={assistant.status === 'Active' ? 'default' : 'secondary'}
                    className={assistant.status === 'Active' ? 'bg-green-500' : ''}
                  >
                    {assistant.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {assistant.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {assistant.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Assistant Interface */}
        <Card className="w-full">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {assistants.map((assistant) => (
                  <TabsTrigger 
                    key={assistant.id} 
                    value={assistant.id}
                    className="flex items-center gap-2"
                  >
                    {assistant.icon}
                    <span className="hidden sm:inline">{assistant.name}</span>
                    <span className="sm:hidden">{assistant.name.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {assistants.map((assistant) => (
                <TabsContent key={assistant.id} value={assistant.id} className="mt-0">
                  <div className="min-h-[600px]">
                    {assistant.component}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>AI Playground - Part of NexusIntel 2.0v Intelligence Platform</p>
          <p>Powered by Claude (Anthropic) • Advanced Malaysian Language Processing</p>
        </div>
      </div>
    </div>
  );
}