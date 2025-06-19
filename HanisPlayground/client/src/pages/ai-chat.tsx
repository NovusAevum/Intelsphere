import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader, MessageSquare, Bot, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  model?: string;
  timestamp: string;
}

export default function AIChat() {
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('openai');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; model: string }) => {
      const response = await apiRequest('POST', '/api/chat', data);
      return response.json();
    },
    onSuccess: (data) => {
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '_ai',
        type: 'ai',
        content: data.response,
        model: data.model,
        timestamp: data.timestamp
      };
      setMessages(prev => [...prev, aiMessage]);
      toast({
        title: "Response Received",
        description: `Processed by ${data.model}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Chat Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '_user',
      type: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    chatMutation.mutate({
      message: message.trim(),
      model: selectedModel
    });

    setMessage('');
  };

  const modelOptions = [
    { value: 'openai', label: 'OpenAI GPT-4o', color: 'bg-green-500' },
    { value: 'anthropic', label: 'Claude Sonnet 4', color: 'bg-orange-500' },
    { value: 'cohere', label: 'Cohere Command R+', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="text-white border-gray-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">AI Chat Assistant</h1>
            </div>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400">
            {modelOptions.find(m => m.value === selectedModel)?.label}
          </Badge>
        </div>

        {/* Chat Container */}
        <Card className="bg-gray-900/50 border-gray-700 h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Conversation</CardTitle>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {modelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${option.color}`} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Start a conversation with AI</p>
                <p className="text-sm mt-2">Choose your preferred AI model and ask anything</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {msg.type === 'user' ? (
                        <div className="h-5 w-5 mt-0.5 bg-blue-500 rounded-full" />
                      ) : (
                        <Bot className="h-5 w-5 mt-0.5 text-blue-400" />
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        {msg.model && (
                          <div className="text-xs text-gray-400 mt-2">
                            {msg.model} • {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-blue-400" />
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-gray-800 border-gray-600 text-white resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                disabled={!message.trim() || chatMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                {chatMutation.isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <>Send</>
                )}
              </Button>
            </form>
            <div className="text-xs text-gray-400 mt-2">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}