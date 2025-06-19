import { useState, useEffect, useRef } from "react";

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  type: 'ambient' | 'neural' | 'quantum' | 'matrix';
}

const audioTracks: AudioTrack[] = [
  {
    id: 'ambient-space',
    name: 'Deep Space Ambient',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmsmCE2n5fG2ZBwBNY/W8s92KwUme8n6z4c0ABxx0vP8kUAODl+p5fK0ZxoKTa3l8bVlHAQ5kdj03YszAAN30unX',
    type: 'ambient'
  },
  {
    id: 'neural-pulse',
    name: 'Neural Network Pulse',
    url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmsmCE2n5fG2ZBwBNY/W8s92KwUme8n6z4c0ABxx0vP8kUAODl+p5fK0ZxoKTa3l8bVlHAQ5kdj03YszAAN30unX',
    type: 'neural'
  }
];

export default function AudioSystem() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API for procedural sound generation
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const generateAmbientSound = () => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    
    // Create multiple oscillators for layered ambient sound
    const createOscillator = (frequency: number, type: OscillatorType, gain: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(gain * volume, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Add subtle frequency modulation
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
      lfoGain.gain.setValueAtTime(2, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      oscillator.start();
      lfo.start();
      
      return oscillator;
    };

    // Create layered ambient soundscape
    createOscillator(60, 'sine', 0.1);    // Deep bass
    createOscillator(120, 'triangle', 0.05); // Sub harmonic
    createOscillator(220, 'sawtooth', 0.02); // Texture layer
    createOscillator(440, 'sine', 0.01);     // High shimmer
  };

  const toggleAudio = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      generateAmbientSound();
    } else {
      setIsEnabled(false);
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
    }
  };

  const playNotification = (type: 'success' | 'warning' | 'error' | 'info') => {
    if (!audioContextRef.current || !isEnabled) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    const frequencies = {
      success: [523.25, 659.25, 783.99], // C5, E5, G5
      warning: [440, 554.37],            // A4, C#5
      error: [329.63, 293.66],           // E4, D4
      info: [523.25, 783.99]             // C5, G5
    };

    const freq = frequencies[type];
    oscillator.frequency.setValueAtTime(freq[0], audioContext.currentTime);
    
    if (freq[1]) {
      oscillator.frequency.exponentialRampToValueAtTime(freq[1], audioContext.currentTime + 0.1);
    }
    if (freq[2]) {
      oscillator.frequency.exponentialRampToValueAtTime(freq[2], audioContext.currentTime + 0.2);
    }

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Expose audio functions globally
  useEffect(() => {
    (window as any).audioSystem = {
      playNotification,
      toggleAudio,
      setVolume
    };
  }, [isEnabled, volume]);

  return (
    <>
      {/* Hidden audio element for future track playback */}
      <audio
        ref={audioRef}
        loop
        volume={volume}
        style={{ display: 'none' }}
      />
      
      {/* Audio visualizer overlay */}
      {isEnabled && (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-mono">AUDIO ACTIVE</span>
            </div>
            
            {/* Simple audio bars visualization */}
            <div className="flex items-end space-x-1 mt-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-cyan-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 16 + 4}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}