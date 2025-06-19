// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export type UserRole = 'admin' | 'user' | 'guest';

// Wonder Pets Characters
export interface Character {
  readonly id: CharacterId;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly traits: readonly string[];
  readonly color: string;
}

export type CharacterId = 'linny' | 'tuck' | 'mingming';

// Mood System
export interface MoodState {
  readonly character: CharacterId;
  readonly primaryMood: MoodType;
  readonly intensity: IntensityLevel;
  readonly stability: StabilityLevel;
  readonly triggers: readonly string[];
  readonly timestamp: number;
  readonly duration: number;
  readonly socialContext: SocialContext;
}

export type MoodType = 
  | 'happy' 
  | 'excited' 
  | 'focused' 
  | 'curious' 
  | 'calm' 
  | 'concerned' 
  | 'determined';

export type IntensityLevel = number; // 0-100
export type StabilityLevel = number; // 0-100
export type SocialContext = 'solo' | 'team' | 'mission' | 'rest';

export interface EmotionalEvent {
  readonly id: string;
  readonly character: CharacterId;
  readonly event: string;
  readonly impact: number; // -100 to 100
  readonly timestamp: number;
  readonly category: EventCategory;
}

export type EventCategory = 'interaction' | 'mission' | 'environment' | 'system';

export interface BiometricData {
  readonly character: CharacterId;
  readonly heartRate: number;
  readonly brainActivity: number;
  readonly energyLevel: number;
  readonly stressLevel: number;
  readonly timestamp: number;
}

// 3D Background System
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export type ParticleType = 'star' | 'cube' | 'sphere' | 'neural' | 'quantum' | 'diamond';

export interface Particle3D {
  readonly id: string;
  position: Vector3D;
  velocity: Vector3D;
  size: number;
  readonly baseSize: number;
  alpha: number;
  readonly color: string;
  hue: number;
  life: number;
  readonly maxLife: number;
  rotation: number;
  readonly rotationSpeed: number;
  pulse: number;
  readonly type: ParticleType;
  trail: TrailPoint[];
  energy: number;
  readonly magneticField: number;
}

export interface NeuralConnection {
  readonly particle1: Particle3D;
  readonly particle2: Particle3D;
  readonly strength: number;
  readonly pulsePhase: number;
  readonly data: number;
}

export interface WaveField {
  position: Vector3D;
  readonly amplitude: number;
  readonly frequency: number;
  phase: number;
}

// Performance Monitoring
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  renderTime: number;
  particleCount: number;
  connectionCount: number;
}

export interface DeviceCapabilities {
  readonly isHighPerformance: boolean;
  readonly supportsWebGL: boolean;
  readonly devicePixelRatio: number;
  readonly hardwareConcurrency: number;
  readonly maxTextureSize: number;
}