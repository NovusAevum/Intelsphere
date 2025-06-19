import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  FileText, 
  Image, 
  Mic, 
  Volume2, 
  Users, 
  Sparkles, 
  Settings,
  Upload,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

interface AIResponse {
  response: string;
  model: string;
  agent: string;
  format: string;
  personality: string;
  multiAgent?: boolean;
  capabilities: string[];
  processingTime?: string;
  timestamp: string;
}

export default function EnhancedAIInterface() {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
  const [format, setFormat] = useState('conversational');
  const [personality, setPersonality] = useState('strategic');
  const [length, setLength] = useState('medium');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [multiAgent, setMultiAgent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [imageData, setImageData] = useState<string | null>(null);
  const [previousContext, setPreviousContext] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const responseFormats = [
    { value: 'conversational', label: '💬 Conversational', icon: MessageSquare },
    { value: 'article', label: '📰 Article Style', icon: FileText },
    { value: 'bullet_points', label: '📋 Bullet Points', icon: BarChart3 },
    { value: 'comprehensive', label: '🔍 Comprehensive', icon: Target },
    { value: 'technical', label: '⚙️ Technical', icon: Settings },
    { value: 'creative', label: '🎨 Creative', icon: Lightbulb }
  ];

  const personalities = [
    { value: 'strategic', label: '🎯 Strategic', desc: 'Forward-thinking, analytical' },
    { value: 'technical', label: '⚡ Technical', desc: 'Precise, methodical' },
    { value: 'analytical', label: '📊 Analytical', desc: 'Data-driven, logical' },
    { value: 'creative', label: '✨ Creative', desc: 'Innovative, engaging' },
    { value: 'empathetic', label: '🤝 Empathetic', desc: 'Understanding, supportive' },
    { value: 'assertive', label: '💪 Assertive', desc: 'Confident, direct' }
  ];

  const lengthOptions = [
    { value: 'brief', label: 'Brief' },
    { value: 'medium', label: 'Medium' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'comprehensive', label: 'Comprehensive' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        const base64Data = base64String.split(',')[1];
        setImageData(base64Data);
        toast({
          title: "Image Uploaded",
          description: "Image ready for multimodal analysis"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message for AI analysis",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const requestBody = {
        message,
        context,
        format,
        personality,
        length,
        includeEmojis,
        multiAgent,
        contentType: imageData ? 'multimodal' : 'text',
        imageData,
        previousContext
      };

      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          personality: personality,
          format: format,
          domainContext: 'unlimited'
        }),
      });

      if (!response.ok) {
        throw new Error('AI processing failed');
      }

      const data: AIResponse = await response.json();
      
      setResponses(prev => [data, ...prev]);
      setPreviousContext(prev => [...prev, message].slice(-5)); // Keep last 5 for context
      setMessage('');
      setImageData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      toast({
        title: "Analysis Complete",
        description: `Response generated using ${data.model} with ${data.agent}`,
      });

    } catch (error) {
      console.error('Enhanced AI error:', error);
      toast({
        title: "Analysis Error",
        description: "Unable to process request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSpeechToText = () => {
    toast({
      title: "Speech-to-Text",
      description: "Speech recognition ready for implementation with Anthropic API key",
    });
  };

  const handleTextToSpeech = (text: string) => {
    toast({
      title: "Text-to-Speech",
      description: "Voice synthesis ready for implementation",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            Enhanced Multimodal AI System
            <Badge variant="secondary" className="ml-2">7 AI Models</Badge>
            <Badge variant="outline" className="ml-1">MultiAgent-to-MultiAgent</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compose" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="responses">Responses</TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Enter your message for AI analysis... 🧠"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <Label>Context (Optional)</Label>
                    <Input
                      placeholder="Additional context for better understanding..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSpeechToText}
                      className="flex items-center gap-2"
                    >
                      <Mic className="h-4 w-4" />
                      Speech
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {imageData && (
                    <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                      <Image className="h-4 w-4" />
                      Image Ready for Analysis
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Response Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {responseFormats.map(fmt => (
                          <SelectItem key={fmt.value} value={fmt.value}>
                            {fmt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>AI Personality</Label>
                    <Select value={personality} onValueChange={setPersonality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {personalities.map(p => (
                          <SelectItem key={p.value} value={p.value}>
                            <div>
                              <div>{p.label}</div>
                              <div className="text-xs text-muted-foreground">{p.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Response Length</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map(len => (
                          <SelectItem key={len.value} value={len.value}>
                            {len.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={includeEmojis}
                      onCheckedChange={setIncludeEmojis}
                    />
                    <Label>Include Emojis 😊</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={multiAgent}
                      onCheckedChange={setMultiAgent}
                    />
                    <Label className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Multi-Agent Analysis
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || !message.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">Text Analysis</Badge>
                    <Badge variant="outline">Image Processing</Badge>
                    <Badge variant="outline">Document Intelligence</Badge>
                    <Badge variant="outline">Context Awareness</Badge>
                    <Badge variant="outline">Emotional Intelligence</Badge>
                    <Badge variant="outline">Millisecond Reasoning</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Models</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Claude Sonnet 4.0</Badge>
                      <span className="text-sm text-muted-foreground">Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">GPT-4o</Badge>
                      <span className="text-sm text-muted-foreground">Fallback</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      + 5 specialized intelligence agents
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="responses" className="space-y-4">
              {responses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No responses yet. Start a conversation to see AI analysis results.
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {responses.map((response, index) => (
                    <Card key={index} className="border-blue-500/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{response.agent}</Badge>
                            <Badge variant="outline">{response.model}</Badge>
                            <Badge>{response.format}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTextToSpeech(response.response)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              {new Date(response.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div className="whitespace-pre-wrap">{response.response}</div>
                        </div>
                        <div className="flex gap-1 mt-3 flex-wrap">
                          {response.capabilities.map(cap => (
                            <Badge key={cap} variant="outline" className="text-xs">
                              {cap.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}