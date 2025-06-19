import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Monitor,
  MessageSquare,
  Star,
  Eye,
  Zap
} from 'lucide-react';

interface VideoInterfaceProps {
  title?: string;
  featured?: boolean;
}

export default function VideoInterface({ title = "Mr. Hanis - The Absolute Best", featured = true }: VideoInterfaceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes demo
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  return (
    <Card className="godlevel-card border-purple-500/30 felt-luxury overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
            <Monitor className="h-6 w-6 text-purple-400" />
            {title}
          </CardTitle>
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
              <Star className="h-3 w-3 mr-1" />
              FEATURED
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Video Display Area */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 border-y border-slate-700/50">
          {/* Real Live Video Stream */}
          <iframe
            className="absolute inset-0 w-full h-full"
            src={title.includes('News') 
              ? "https://www.youtube.com/embed/live_stream?channel=UCeY0bbntWzzVIaj2z3QigXg&autoplay=1&mute=1"
              : "https://www.youtube.com/embed/live_stream?channel=UCrp_UI8XtuYfpiqluWLD7Lw&autoplay=1&mute=1"
            }
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Play Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <Button
                onClick={handlePlayPause}
                className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </Button>
            </div>
          )}

          {/* Video Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  <span className="text-sm text-white font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info Section */}
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Excellence in Action: Mr. Hanis Masterclass</h4>
              <p className="text-sm text-slate-400">
                Watch as Mr. Hanis demonstrates world-class expertise and unmatched professional skills
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Comments
            </Button>
          </div>

          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-lg font-bold text-green-400">98.7%</div>
              <div className="text-xs text-slate-400">Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-lg font-bold text-blue-400">1.2M</div>
              <div className="text-xs text-slate-400">Views</div>
            </div>
            <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-lg font-bold text-purple-400">⭐ 4.9</div>
              <div className="text-xs text-slate-400">Rating</div>
            </div>
          </div>

          {/* Achievement Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
              World-Class
            </Badge>
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              Expert Level
            </Badge>
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              Verified Excellence
            </Badge>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              Premium Content
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}