import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import mingmingImage from '@assets/mingming.jpeg';

interface Message {
  type: 'mingming' | 'user';
  content: string;
  timestamp: number;
}

export default function FlyingMingMing() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
  const [isHovering, setIsHovering] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Ming Ming only appears after mouse idle
  const [isLeaving, setIsLeaving] = useState(false); // Track if Ming Ming is leaving
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'mingming',
      content: "Hi! I'm Ming-Ming! 🐸 I noticed you're exploring HANIS DIGITAL UNIVERSE. Need any help navigating this amazing intelligence center?",
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const animationRef = useRef<number>();
  const chatInputRef = useRef<HTMLInputElement>(null);
  const mouseIdleTimerRef = useRef<NodeJS.Timeout>();
  const leaveDelayTimerRef = useRef<NodeJS.Timeout>();

  // Smooth position interpolation
  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.05,
        y: prev.y + (targetPosition.y - prev.y) * 0.05
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition]);

  // Enhanced mouse idle detection and Ming Ming activation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Clear existing timers
      if (mouseIdleTimerRef.current) {
        clearTimeout(mouseIdleTimerRef.current);
      }
      if (leaveDelayTimerRef.current) {
        clearTimeout(leaveDelayTimerRef.current);
      }
      
      // If Ming Ming is visible and mouse becomes active, start leave delay
      if (isVisible && !isLeaving) {
        setIsLeaving(true);
        
        // Wait 1 second before actually hiding Ming Ming (unless user clicks chat)
        leaveDelayTimerRef.current = setTimeout(() => {
          if (!showChat) { // Only leave if chat is not opened
            setIsVisible(false);
            setIsLeaving(false);
          }
        }, 1000);
      }
      
      // Set new timer for 3 seconds to show Ming Ming again
      mouseIdleTimerRef.current = setTimeout(() => {
        setIsVisible(true);
        setIsLeaving(false);
        
        // Position Ming Ming near mouse but with offset
        const offset = 80;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const angle = Math.random() * Math.PI * 2;
        const newX = Math.max(50, Math.min(window.innerWidth - 100, mouseX + Math.cos(angle) * offset));
        const newY = Math.max(50, Math.min(window.innerHeight - 100, mouseY + Math.sin(angle) * offset));
        
        setTargetPosition({ x: newX, y: newY });
      }, 3000);
    };

    const handleMouseMoveForFollowing = (e: MouseEvent) => {
      if (isVisible && !isLeaving) {
        // Only follow mouse if Ming Ming is visible and not leaving
        const offset = 60;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const angle = Math.random() * Math.PI * 2;
        const newX = Math.max(50, Math.min(window.innerWidth - 100, mouseX + Math.cos(angle) * offset));
        const newY = Math.max(50, Math.min(window.innerHeight - 100, mouseY + Math.sin(angle) * offset));
        
        setTargetPosition({ x: newX, y: newY });
      }
    };

    // Handle clicks to cancel leaving if chat is opened
    const handleClick = (e: MouseEvent) => {
      if (isLeaving && leaveDelayTimerRef.current) {
        clearTimeout(leaveDelayTimerRef.current);
        setIsLeaving(false);
      }
    };

    // Start idle timer on initial load
    mouseIdleTimerRef.current = setTimeout(() => {
      setIsVisible(true);
      setTargetPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    if (isVisible && !isLeaving) {
      window.addEventListener('mousemove', handleMouseMoveForFollowing);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMoveForFollowing);
      window.removeEventListener('click', handleClick);
      if (mouseIdleTimerRef.current) {
        clearTimeout(mouseIdleTimerRef.current);
      }
      if (leaveDelayTimerRef.current) {
        clearTimeout(leaveDelayTimerRef.current);
      }
    };
  }, [isVisible, isLeaving, showChat]);

  // Auto-show chat after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showChat) {
        setShowChat(true);
        setTimeout(() => setShowChat(false), 8000); // Auto-hide after 8 seconds
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [showChat]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat/mingming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      
      setTimeout(() => {
        setIsTyping(false);
        const mingmingResponse: Message = {
          type: 'mingming',
          content: data.response || "I'm here to help you explore this amazing digital universe! What would you like to know?",
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, mingmingResponse]);
      }, 1500);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      const fallbackResponse: Message = {
        type: 'mingming',
        content: "Oops! I'm having a little technical hiccup, but I'm still here to help! What can I assist you with?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Flying MingMing - Only visible after 3 seconds of mouse idle */}
      {isVisible && (
        <div
          className="fixed z-50 pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: position.x,
            top: position.y,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
            opacity: isVisible ? 1 : 0
          }}
        >
        <div
          className="relative group cursor-pointer pointer-events-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setShowChat(!showChat)}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-md opacity-60 animate-pulse"></div>
          
          {/* MingMing Image */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-pink-400 shadow-lg hover:shadow-pink-400/50 transition-all duration-300">
            <img 
              src={mingmingImage} 
              alt="MingMing AI Assistant" 
              className="w-full h-full object-cover animate-bounce"
            />
          </div>

          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          </div>
          
          {/* Chat indicator */}
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
          
          {/* Hover tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Hi! Need help? Click me! 💫
          </div>
        </div>
        </div>
      )}

      {/* Baby Elephant Game Icon - Bottom Right Corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          className="group bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          onClick={() => window.open('https://elephant-game.com', '_blank')}
        >
          <div className="text-3xl animate-bounce">🐘</div>
          <div className="absolute -top-12 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Baby Elephant Game!
          </div>
        </button>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed top-4 right-4 w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 z-40 pointer-events-auto">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-400">
                <img src={mingmingImage} alt="MingMing" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-pink-400 font-bold text-sm">Ming-Ming AI</h3>
                <p className="text-gray-400 text-xs">Marketing & Intelligence Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-gray-100 border border-pink-500/30'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 px-3 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex space-x-2">
              <input
                ref={chatInputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Ming-Ming anything..."
                className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}