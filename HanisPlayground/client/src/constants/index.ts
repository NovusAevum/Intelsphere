import type { Character, MoodType, EventCategory } from '../types';

// Application Constants
export const APP_CONFIG = {
  NAME: 'Wonder Pets AI Command Center',
  VERSION: '2.0.0',
  BUILD_DATE: new Date().toISOString(),
  ENVIRONMENT: import.meta.env.MODE,
} as const;

// Performance Constants
export const PERFORMANCE_CONFIG = {
  TARGET_FPS: 60,
  MAX_PARTICLES: 150,
  MIN_PARTICLES: 50,
  PARTICLE_UPDATE_INTERVAL: 16, // 60fps
  MOOD_UPDATE_INTERVAL: 5000,
  BIOMETRIC_UPDATE_INTERVAL: 3000,
  EVENT_GENERATION_INTERVAL: 15000,
  MEMORY_WARNING_THRESHOLD: 100 * 1024 * 1024, // 100MB
} as const;

// Device Capability Thresholds
export const DEVICE_THRESHOLDS = {
  HIGH_PERFORMANCE_CORES: 4,
  MIN_WEBGL_VERSION: 1,
  RETINA_DPR_THRESHOLD: 2,
  LOW_MEMORY_THRESHOLD: 2 * 1024 * 1024 * 1024, // 2GB
} as const;

// Wonder Pets Characters
export const CHARACTERS: readonly Character[] = [
  {
    id: 'linny',
    name: 'Linny',
    role: 'Leader & OSINT Specialist',
    avatar: '/attached_assets/linny.jpg',
    traits: ['analytical', 'responsible', 'protective'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'tuck',
    name: 'Tuck',
    role: 'AI Specialist & Tech Expert',
    avatar: '/attached_assets/tuck.jpeg',
    traits: ['innovative', 'logical', 'curious'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'mingming',
    name: 'Ming-Ming',
    role: 'Marketing & Communications',
    avatar: '/attached_assets/mingming.jpeg',
    traits: ['energetic', 'social', 'creative'],
    color: 'from-yellow-500 to-orange-500'
  }
] as const;

// Mood System Constants
export const MOOD_TYPES: readonly MoodType[] = [
  'happy',
  'excited', 
  'focused',
  'curious',
  'calm',
  'concerned',
  'determined'
] as const;

export const MOOD_COLORS: Record<MoodType, string> = {
  happy: '#fbbf24',
  excited: '#f97316', 
  focused: '#3b82f6',
  curious: '#8b5cf6',
  calm: '#10b981',
  concerned: '#f59e0b',
  determined: '#ef4444'
} as const;

// Event Categories and Templates
export const EVENT_CATEGORIES: readonly EventCategory[] = [
  'interaction',
  'mission', 
  'environment',
  'system'
] as const;

export const EVENT_TEMPLATES: Record<EventCategory, readonly string[]> = {
  interaction: [
    'Positive team collaboration detected',
    'Successful problem solving session',
    'Received appreciation from teammate',
    'Helped resolve conflict',
    'Shared knowledge effectively',
    'Mentored junior team member',
    'Participated in code review',
    'Led successful meeting'
  ],
  mission: [
    'Mission objective completed',
    'Complex challenge encountered',
    'Strategic breakthrough achieved',
    'Technical innovation discovered',
    'Critical decision point reached',
    'Performance milestone achieved',
    'Risk successfully mitigated',
    'Customer satisfaction improved'
  ],
  environment: [
    'Optimal workspace conditions',
    'New tools discovered',
    'System performance improved',
    'Interface efficiency enhanced',
    'Data quality verified',
    'Security protocols updated',
    'Infrastructure optimized',
    'Monitoring systems enhanced'
  ],
  system: [
    'Neural network optimization',
    'Pattern recognition success',
    'Anomaly detection triggered',
    'Performance metrics improved',
    'Security protocols verified',
    'Algorithm efficiency gained',
    'Data processing optimized',
    'Machine learning model updated'
  ]
} as const;

// Animation Constants
export const ANIMATION_CONFIG = {
  DEFAULT_DURATION: 0.3,
  SPRING_STIFFNESS: 300,
  SPRING_DAMPING: 25,
  BOUNCE_STRENGTH: 0.3,
  FADE_DURATION: 0.2,
  SLIDE_DISTANCE: 20,
  SCALE_FACTOR: 1.05,
} as const;

// Accessibility Constants
export const A11Y_CONFIG = {
  FOCUS_VISIBLE_OUTLINE: '2px solid #3b82f6',
  HIGH_CONTRAST_RATIO: 7, // WCAG AAA standard
  REDUCED_MOTION_MEDIA: '(prefers-reduced-motion: reduce)',
  LARGE_TEXT_SIZE: '18px',
  TOUCH_TARGET_MIN_SIZE: 44, // pixels
} as const;

// API Constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'wonderpets_user_preferences',
  THEME: 'wonderpets_theme',
  LANGUAGE: 'wonderpets_language',
  PERFORMANCE_SETTINGS: 'wonderpets_performance',
  ANALYTICS_CONSENT: 'wonderpets_analytics_consent',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  PERMISSION_DENIED: 'Access denied. Please check your permissions.',
  VALIDATION_ERROR: 'Invalid input. Please check your data and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  WEBGL_NOT_SUPPORTED: 'WebGL is not supported on this device. Some features may be limited.',
  QUOTA_EXCEEDED: 'Storage quota exceeded. Please clear some data.',
} as const;

// Security Constants
export const SECURITY_CONFIG = {
  CSP_NONCE_LENGTH: 16,
  CSRF_TOKEN_LENGTH: 32,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// SEO Constants
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Wonder Pets AI Command Center - Advanced Intelligence Platform',
  DEFAULT_DESCRIPTION: 'Professional AI-powered intelligence platform featuring advanced OSINT capabilities, machine learning, and digital marketing automation.',
  DEFAULT_KEYWORDS: ['AI', 'OSINT', 'Intelligence', 'Machine Learning', 'Digital Marketing'],
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://wonderpets.ai',
  TWITTER_HANDLE: '@wonderpetsai',
} as const;