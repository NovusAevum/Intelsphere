import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Brain, Eye, Target } from 'lucide-react';
import hanisProfile from '@assets/hanis-profile.jpeg';

interface ParticleEffect {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function InteractiveProfile() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<ParticleEffect[]>([]);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const profileRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Eye tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(8, Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)) / 20);
        
        setEyePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        });

        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const animate = () => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vy: particle.vy + 0.1, // gravity
          }))
          .filter(particle => particle.life < particle.maxLife);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isHovered || isClicked) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isClicked]);

  const createParticles = (x: number, y: number, count: number = 15) => {
    const newParticles: ParticleEffect[] = [];
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080'];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 5,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true);
    const rect = e.currentTarget.getBoundingClientRect();
    createParticles(
      e.clientX - rect.left,
      e.clientY - rect.top,
      25
    );
    
    setTimeout(() => setIsClicked(false), 300);
  };

  const handleHover = (e: React.MouseEvent) => {
    if (!isHovered) {
      const rect = e.currentTarget.getBoundingClientRect();
      createParticles(
        rect.width / 2,
        rect.height / 2,
        10
      );
    }
    setIsHovered(true);
  };

  return (
    <div className="relative flex flex-col items-center space-y-6">
      {/* Profile Container */}
      <div
        ref={profileRef}
        className="relative group cursor-pointer"
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Particle Canvas */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                opacity: 1 - (particle.life / particle.maxLife),
                transform: `scale(${1 - (particle.life / particle.maxLife) * 0.5})`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          ))}
        </div>

        {/* Holographic Frame */}
        <div className={`
          relative w-48 h-48 rounded-full overflow-hidden
          transition-all duration-500 ease-out
          ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100'}
          ${isClicked ? 'scale-95' : ''}
        `}>
          {/* Animated Border */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
            ${isHovered ? 'animate-spin' : ''}
            transition-all duration-300
          `} style={{ padding: '3px' }}>
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>

          {/* Glow Effect */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20
            blur-xl scale-150
            ${isHovered ? 'opacity-100' : 'opacity-60'}
            transition-opacity duration-300
          `}></div>

          {/* Profile Image */}
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <img
              src={hanisProfile}
              alt="WAN MOHAMAD HANIS - Strategic Intelligence Architect"
              className={`
                w-full h-full object-cover
                transition-all duration-500
                ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}
                ${isClicked ? 'hue-rotate-90' : ''}
              `}
            />
            
            {/* Eye Tracking Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
                style={{
                  left: `${50 + eyePosition.x}%`,
                  top: `${35 + eyePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
              <div 
                className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
                style={{
                  left: `${65 + eyePosition.x}%`,
                  top: `${35 + eyePosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Scanning Lines */}
          <div className={`
            absolute inset-0 rounded-full overflow-hidden
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-300
          `}>
            <div className="absolute w-full h-0.5 bg-cyan-400/80 animate-pulse" 
                 style={{ top: '20%', animationDelay: '0s' }}></div>
            <div className="absolute w-full h-0.5 bg-purple-400/80 animate-pulse" 
                 style={{ top: '50%', animationDelay: '0.5s' }}></div>
            <div className="absolute w-full h-0.5 bg-pink-400/80 animate-pulse" 
                 style={{ top: '80%', animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className={`
          absolute inset-0 pointer-events-none
          ${isHovered ? 'opacity-100' : 'opacity-0'}
          transition-all duration-500
        `}>
          <Brain className="absolute -top-4 -left-4 w-6 h-6 text-cyan-400 animate-bounce" 
                 style={{ animationDelay: '0s' }} />
          <Zap className="absolute -top-4 -right-4 w-6 h-6 text-yellow-400 animate-bounce" 
               style={{ animationDelay: '0.2s' }} />
          <Target className="absolute -bottom-4 -left-4 w-6 h-6 text-green-400 animate-bounce" 
                  style={{ animationDelay: '0.4s' }} />
          <Eye className="absolute -bottom-4 -right-4 w-6 h-6 text-purple-400 animate-bounce" 
               style={{ animationDelay: '0.6s' }} />
        </div>
      </div>

      {/* Enhanced Identity Card */}
      <div className={`
        bg-gradient-to-br from-gray-900/90 to-gray-800/90 
        backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20
        transition-all duration-500 max-w-md
        ${isHovered ? 'scale-105 shadow-2xl shadow-cyan-500/20' : 'scale-100'}
      `}>
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            WAN MOHAMAD HANIS
          </h1>
          <p className="text-cyan-400 text-lg font-semibold mb-4">
            Strategic Intelligence Architect
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">Neural Pattern:</span>
              </div>
              <span className="text-cyan-400 font-mono">Advanced Strategic Thinking</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Cognitive Load:</span>
              </div>
              <span className="text-yellow-400 font-mono">Multi-Domain Expert</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Network Status:</span>
              </div>
              <span className="text-green-400 font-mono">Global Intelligence Grid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="text-center text-gray-400 text-sm">
        <Sparkles className="w-4 h-4 inline mr-1" />
        Hover and click to interact with the intelligence matrix
      </div>
    </div>
  );
}