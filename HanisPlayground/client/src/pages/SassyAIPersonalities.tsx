import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Globe, Sparkles, Crown, Flame, Snowflake, Star } from "lucide-react";

interface SassyPersonality {
  id: string;
  name: string;
  language: string;
  culture: string;
  sassiness_level: number;
  communication_style: string;
  expertise_areas: string[];
  sample_catchphrase: string;
}

interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  personality?: string;
  language?: string;
  timestamp: Date;
}

const personalityIcons = {
  'sassy_english_queen': Crown,
  'sassy_french_rebel': Star,
  'sassy_spanish_fire': Flame,
  'sassy_japanese_cool': Snowflake,
  'sassy_german_direct': MessageCircle,
  'sassy_korean_sharp': Sparkles,
  'sassy_italian_dramatic': Globe,
  'sassy_russian_ice': Snowflake
};

export default function SassyAIPersonalities() {
  const [personalities, setPersonalities] = useState<SassyPersonality[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('');
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sassLevel, setSassLevel] = useState<number>(5);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonalities();
    loadSupportedLanguages();
  }, []);

  const loadPersonalities = async () => {
    try {
      const response = await fetch('/api/sassy-ai/personalities');
      const data = await response.json();
      
      if (data.success) {
        setPersonalities(data.personalities);
        if (data.personalities.length > 0) {
          setSelectedPersonality(data.personalities[0].id);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personalities",
        variant: "destructive"
      });
    }
  };

  const loadSupportedLanguages = async () => {
    try {
      const response = await fetch('/api/sassy-ai/languages');
      const data = await response.json();
      
      if (data.success) {
        setSupportedLanguages(data.supported_languages);
        if (data.supported_languages.length > 0) {
          setPreferredLanguage(data.supported_languages[0]);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load supported languages",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !selectedPersonality) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/sassy-ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: currentMessage,
          preferredLanguage,
          personalityId: selectedPersonality,
          sassLevel,
          userId: 'user-001'
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: ChatMessage = {
          type: 'ai',
          content: data.data.response,
          personality: data.data.personality_used,
          language: data.data.language,
          timestamp: new Date()
        };

        setChatMessages(prev => [...prev, aiMessage]);

        toast({
          title: "Response Generated",
          description: `${data.data.personality_used} responded with ${data.data.sassiness_applied}/10 sassiness`
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to get response",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const getPersonalityIcon = (personalityId: string) => {
    const IconComponent = personalityIcons[personalityId as keyof typeof personalityIcons] || MessageCircle;
    return <IconComponent className="h-5 w-5" />;
  };

  const getSassinessColor = (level: number) => {
    if (level <= 3) return "bg-green-500";
    if (level <= 6) return "bg-yellow-500";
    if (level <= 8) return "bg-orange-500";
    return "bg-red-500";
  };

  const selectedPersonalityData = personalities.find(p => p.id === selectedPersonality);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Multi-language Sassy AI Personality Expansion Pack
        </h1>
        <p className="text-muted-foreground text-lg">
          Chat with culturally-aware AI personalities across 8 languages with dynamic sassiness levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personality Selection Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Personality Selection
              </CardTitle>
              <CardDescription>
                Choose your AI personality and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personality">AI Personality</Label>
                <Select value={selectedPersonality} onValueChange={setSelectedPersonality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    {personalities.map((personality) => (
                      <SelectItem key={personality.id} value={personality.id}>
                        <div className="flex items-center gap-2">
                          {getPersonalityIcon(personality.id)}
                          {personality.name} ({personality.language})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sass-level">Sassiness Level: {sassLevel}/10</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sassLevel}
                    onChange={(e) => setSassLevel(Number(e.target.value))}
                    className="flex-1"
                  />
                  <div className={`w-3 h-3 rounded-full ${getSassinessColor(sassLevel)}`}></div>
                </div>
              </div>

              {selectedPersonalityData && (
                <div className="space-y-3 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    {getPersonalityIcon(selectedPersonalityData.id)}
                    <span className="font-semibold">{selectedPersonalityData.name}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedPersonalityData.culture}</Badge>
                      <Badge variant="outline">{selectedPersonalityData.communication_style}</Badge>
                    </div>
                    <div>
                      <strong>Expertise:</strong> {selectedPersonalityData.expertise_areas.join(', ')}
                    </div>
                    <div>
                      <strong>Sample:</strong> "{selectedPersonalityData.sample_catchphrase}"
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personality Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{personalities.length}</div>
                  <div className="text-sm text-muted-foreground">Personalities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{supportedLanguages.length}</div>
                  <div className="text-sm text-muted-foreground">Languages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{chatMessages.length}</div>
                  <div className="text-sm text-muted-foreground">Messages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{sassLevel}</div>
                  <div className="text-sm text-muted-foreground">Sass Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Sassy AI Chat
                </CardTitle>
                <CardDescription>
                  Experience culturally-aware AI personalities
                </CardDescription>
              </div>
              <Button variant="outline" onClick={clearChat} disabled={chatMessages.length === 0}>
                Clear Chat
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg">
                {chatMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Start a conversation with your chosen AI personality!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-muted'
                        }`}>
                          <div className="font-medium text-sm mb-1">
                            {message.type === 'user' ? 'You' : message.personality}
                            {message.language && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {message.language}
                              </Badge>
                            )}
                          </div>
                          <div>{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="space-y-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="min-h-[80px]"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                  <Button 
                    onClick={sendMessage} 
                    disabled={!currentMessage.trim() || !selectedPersonality || isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Personality Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Available AI Personalities</CardTitle>
          <CardDescription>
            Explore our diverse collection of culturally-aware AI personalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalities.map((personality) => (
              <Card 
                key={personality.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPersonality === personality.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedPersonality(personality.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {getPersonalityIcon(personality.id)}
                    <CardTitle className="text-lg">{personality.name}</CardTitle>
                  </div>
                  <CardDescription>{personality.culture}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{personality.language}</Badge>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getSassinessColor(personality.sassiness_level)}`}></div>
                        <span className="text-sm">{personality.sassiness_level}/10</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      "{personality.sample_catchphrase}"
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {personality.expertise_areas.slice(0, 2).map((area, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      {personality.expertise_areas.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{personality.expertise_areas.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}