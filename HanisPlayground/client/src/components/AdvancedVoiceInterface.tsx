import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  personality: string;
  assertiveness_level: number;
  realism_score: number;
}

interface AdvancedVoiceSettings {
  voiceProfile: string;
  emotionIntensity: number;
  speechRate: number;
  pitchVariation: number;
  realTimeProcessing: boolean;
  humanLikeBreathing: boolean;
  naturalHesitations: boolean;
  emotionalInflections: boolean;
}

interface AdvancedVoiceInterfaceProps {
  onVoiceSettingsChange: (settings: AdvancedVoiceSettings) => void;
  onSpeakText: (text: string, settings: AdvancedVoiceSettings) => void;
  isProcessing: boolean;
}

export function AdvancedVoiceInterface({ 
  onVoiceSettingsChange, 
  onSpeakText, 
  isProcessing 
}: AdvancedVoiceInterfaceProps) {
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [settings, setSettings] = useState<AdvancedVoiceSettings>({
    voiceProfile: '',
    emotionIntensity: 0.9,
    speechRate: 1.0,
    pitchVariation: 0.3,
    realTimeProcessing: true,
    humanLikeBreathing: true,
    naturalHesitations: true,
    emotionalInflections: true
  });
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize Web Audio API for advanced processing
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    loadVoiceProfiles();
  }, []);

  const loadVoiceProfiles = async () => {
    try {
      const response = await fetch('/api/neural-voice-profiles');
      const data = await response.json();
      if (data.success) {
        setVoiceProfiles(data.profiles);
        if (data.profiles.length > 0) {
          const defaultProfile = data.profiles[0].id;
          setSelectedProfile(defaultProfile);
          updateSettings({ voiceProfile: defaultProfile });
        }
      }
    } catch (error) {
      console.log('Loading default voice profiles');
      // Fallback to default profiles
      const defaultProfiles: VoiceProfile[] = [
        {
          id: 'gordon_neural',
          name: 'Gordon "The Destroyer" Ramsay',
          gender: 'male',
          accent: 'British',
          personality: 'Explosive chef with maximum rudeness',
          assertiveness_level: 10,
          realism_score: 0.97
        },
        {
          id: 'sasha_neural',
          name: 'Sasha "No Filter" Williams',
          gender: 'female',
          accent: 'Urban American',
          personality: 'Sassy queen with attitude',
          assertiveness_level: 10,
          realism_score: 0.95
        }
      ];
      setVoiceProfiles(defaultProfiles);
      setSelectedProfile('gordon_neural');
      updateSettings({ voiceProfile: 'gordon_neural' });
    }
  };

  const updateSettings = (newSettings: Partial<AdvancedVoiceSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    onVoiceSettingsChange(updatedSettings);
  };

  const processAdvancedSpeech = async (text: string) => {
    if (!selectedProfile) return;

    setIsPlaying(true);
    
    try {
      // Get real-time voice processing
      const response = await fetch('/api/real-time-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          actor_id: selectedProfile,
          emotion_intensity: settings.emotionIntensity,
          context: 'advanced_synthesis'
        })
      });

      const data = await response.json();
      
      if (data.success && data.real_time_data) {
        setPerformanceMetrics(data.performance_metrics);
        await synthesizeWithAdvancedFeatures(text, data.real_time_data);
      } else {
        // Fallback to standard synthesis
        await fallbackSynthesis(text);
      }
    } catch (error) {
      console.log('Using fallback synthesis');
      await fallbackSynthesis(text);
    } finally {
      setIsPlaying(false);
    }
  };

  const synthesizeWithAdvancedFeatures = async (text: string, voiceData: any) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance();
    
    // Process text with breathing markers
    const processedText = voiceData.processed_audio?.text_with_breathing || text;
    utterance.text = processedText.replace(/\[BREATH\]/g, '');

    // Apply voice settings from neural processing
    const voiceSettings = voiceData.processed_audio?.voice_settings;
    if (voiceSettings) {
      utterance.pitch = voiceSettings.base_pitch || 1.0;
      utterance.rate = (voiceSettings.rate_changes?.[0] || 1.0) * settings.speechRate;
      utterance.volume = voiceSettings.volume_modulation?.[0] || 0.9;
    }

    // Select optimal voice based on profile
    const voices = synthRef.current.getVoices();
    const currentProfile = voiceProfiles.find(p => p.id === selectedProfile);
    
    if (currentProfile) {
      let targetVoice;
      
      // Advanced voice matching based on accent and gender
      switch (currentProfile.accent) {
        case 'British':
          targetVoice = voices.find(v => 
            v.lang.includes('en-GB') && 
            (currentProfile.gender === 'male' ? v.name.includes('Male') || v.name.includes('Daniel') : v.name.includes('Female') || v.name.includes('Kate'))
          );
          break;
        case 'Urban American':
          targetVoice = voices.find(v => 
            v.lang.includes('en-US') && 
            (currentProfile.gender === 'female' ? v.name.includes('Samantha') || v.name.includes('Victoria') : v.name.includes('Alex'))
          );
          break;
        case 'French':
          targetVoice = voices.find(v => 
            v.lang.includes('fr') && 
            (currentProfile.gender === 'female' ? v.name.includes('Amélie') : v.name.includes('Thomas'))
          );
          break;
        case 'Australian':
          targetVoice = voices.find(v => 
            v.lang.includes('en-AU') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('lee')
          );
          break;
        case 'Russian':
          targetVoice = voices.find(v => 
            v.lang.includes('ru') || v.name.toLowerCase().includes('milena') || v.name.toLowerCase().includes('yuri')
          );
          break;
        default:
          targetVoice = voices.find(v => v.lang.includes('en-US'));
      }
      
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
    }

    // Apply emotion-based modulation
    if (settings.emotionIntensity > 0.7) {
      utterance.pitch += settings.pitchVariation * 0.3;
      utterance.rate += 0.2;
    }

    // Add advanced event handling for breathing and pauses
    const breathingPoints = voiceData.processed_audio?.speech_markers?.breath_points || [];
    const pauseMarkers = voiceData.processed_audio?.speech_markers?.pause_markers || [];
    
    utterance.onboundary = (event) => {
      // Insert natural breathing sounds at specified points
      if (settings.humanLikeBreathing && breathingPoints.includes(event.charIndex)) {
        // Brief pause for breathing effect
        synthRef.current?.pause();
        setTimeout(() => synthRef.current?.resume(), 150);
      }
      
      // Add natural hesitations
      if (settings.naturalHesitations && pauseMarkers.includes(event.charIndex)) {
        synthRef.current?.pause();
        setTimeout(() => synthRef.current?.resume(), 100);
      }
    };

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  const fallbackSynthesis = async (text: string) => {
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const currentProfile = voiceProfiles.find(p => p.id === selectedProfile);
    
    if (currentProfile) {
      // Apply basic settings based on profile
      utterance.pitch = currentProfile.gender === 'female' ? 1.2 : 0.8;
      utterance.rate = settings.speechRate;
      utterance.volume = 0.9;
      
      // Apply assertiveness effect
      if (currentProfile.assertiveness_level >= 9) {
        utterance.pitch += 0.1;
        utterance.rate += 0.2;
      }
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  const currentProfile = voiceProfiles.find(p => p.id === selectedProfile);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-slate-900 border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          🎭 Neural Voice Synthesis Engine
          <Badge variant="secondary" className="bg-purple-600 text-white">
            Ultra Realistic
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Voice Profile Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300">Voice Actor Profile</label>
          <Select value={selectedProfile} onValueChange={(value) => {
            setSelectedProfile(value);
            updateSettings({ voiceProfile: value });
          }}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select voice actor" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {voiceProfiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id} className="text-white hover:bg-slate-700">
                  <div className="flex flex-col">
                    <span>{profile.name}</span>
                    <span className="text-xs text-slate-400">
                      {profile.accent} • {profile.gender} • Assertiveness: {profile.assertiveness_level}/10
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {currentProfile && (
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-sm text-slate-300">{currentProfile.personality}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Realism: {(currentProfile.realism_score * 100).toFixed(1)}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {currentProfile.accent}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Emotion Intensity: {settings.emotionIntensity.toFixed(1)}
            </label>
            <Slider
              value={[settings.emotionIntensity]}
              onValueChange={([value]) => updateSettings({ emotionIntensity: value })}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Speech Rate: {settings.speechRate.toFixed(1)}x
            </label>
            <Slider
              value={[settings.speechRate]}
              onValueChange={([value]) => updateSettings({ speechRate: value })}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Pitch Variation: {settings.pitchVariation.toFixed(1)}
          </label>
          <Slider
            value={[settings.pitchVariation]}
            onValueChange={([value]) => updateSettings({ pitchVariation: value })}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Human-Like Features */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300">Human-Like Features</label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={settings.realTimeProcessing ? "default" : "outline"}
              onClick={() => updateSettings({ realTimeProcessing: !settings.realTimeProcessing })}
              className="text-xs"
            >
              Real-Time Processing
            </Button>
            <Button
              variant={settings.humanLikeBreathing ? "default" : "outline"}
              onClick={() => updateSettings({ humanLikeBreathing: !settings.humanLikeBreathing })}
              className="text-xs"
            >
              Natural Breathing
            </Button>
            <Button
              variant={settings.naturalHesitations ? "default" : "outline"}
              onClick={() => updateSettings({ naturalHesitations: !settings.naturalHesitations })}
              className="text-xs"
            >
              Natural Hesitations
            </Button>
            <Button
              variant={settings.emotionalInflections ? "default" : "outline"}
              onClick={() => updateSettings({ emotionalInflections: !settings.emotionalInflections })}
              className="text-xs"
            >
              Emotional Inflections
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        {performanceMetrics && (
          <div className="bg-slate-800 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Realism Score:</span>
                <span className="text-green-400">{(performanceMetrics.realism_score * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emotion Accuracy:</span>
                <span className="text-blue-400">{(performanceMetrics.emotion_accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accent Authenticity:</span>
                <span className="text-purple-400">{(performanceMetrics.accent_authenticity * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Human Likeness:</span>
                <span className="text-yellow-400">{(performanceMetrics.human_likeness * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Test Controls */}
        <div className="flex gap-2">
          <Button
            onClick={() => processAdvancedSpeech("This is a test of the ultra-realistic neural voice synthesis system. I'm brutally honest and completely authentic.")}
            disabled={isPlaying || isProcessing}
            className="flex-1"
          >
            {isPlaying ? 'Speaking...' : 'Test Voice'}
          </Button>
          <Button
            onClick={stopSpeech}
            variant="outline"
            disabled={!isPlaying}
          >
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}