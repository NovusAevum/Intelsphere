import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { useAccessibility, useKeyboardShortcuts } from '../hooks/useAccessibility';
import { ANIMATION_CONFIG, SEO_CONFIG } from '../constants';
import type { CharacterId } from '../types';

// Lazy load components for performance
const Enterprise3DBackground = React.lazy(() => import('./enterprise-3d-background'));
const EnhancedNavigation = React.lazy(() => import('./enhanced-navigation'));
const AdvancedMoodTracker = React.lazy(() => import('./advanced-mood-tracker'));
const WonderPetsMissionControl = React.lazy(() => import('./wonder-pets-mission-control'));
const StaticAICommandCenter = React.lazy(() => import('./static-ai-command-center'));

interface EnterpriseHomeProps {
  initialSection?: string;
}

export default function EnterpriseHome({ initialSection = 'home' }: EnterpriseHomeProps) {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const { metrics, isPerformanceGood } = usePerformanceMonitor();
  const { reducedMotion, announce } = useAccessibility();

  // Memoized animation variants based on performance and accessibility
  const heroAnimationVariants = useMemo(() => ({
    initial: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 50,
      scale: reducedMotion ? 1 : 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.1 : ANIMATION_CONFIG.DEFAULT_DURATION,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: ANIMATION_CONFIG.FADE_DURATION }
    }
  }), [reducedMotion]);

  const titleAnimationVariants = useMemo(() => ({
    initial: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 30 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.8,
        ease: "easeOut"
      }
    }
  }), [reducedMotion]);

  // Handle section changes with accessibility announcements
  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
    announce(`Navigating to ${section} section`, 'polite');
    
    // Actual navigation implementation
    if (section === 'performance-marketing') {
      window.location.href = '/performance-marketing';
    } else if (section === 'resume') {
      window.location.href = '/resume';
    } else if (section === 'contact') {
      window.location.href = '/contact';
    } else if (section === 'osint-analysis') {
      window.location.href = '/osint-analysis';
    } else if (section === 'reconnaissance-dashboard') {
      window.location.href = '/reconnaissance-dashboard';
    } else if (section === 'neural-net') {
      window.location.href = '/neural-net';
    } else if (section === 'quantum-lab') {
      window.location.href = '/quantum-lab';
    } else if (section === 'ai-matrix') {
      window.location.href = '/ai-matrix';
    }
  }, [announce]);

  // Handle user interaction tracking
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      announce('Interactive features now available', 'polite');
    }
  }, [hasUserInteracted, announce]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'h': () => handleSectionChange('home'),
    'r': () => handleSectionChange('resume'),
    'c': () => handleSectionChange('contact'),
    'p': () => handleSectionChange('performance-marketing'),
    'escape': () => handleSectionChange('home'),
  });

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      announce('Wonder Pets AI Command Center loaded successfully', 'polite');
    }, 100);

    // Add interaction listeners
    const interactionEvents = ['mousedown', 'touchstart', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      clearTimeout(timer);
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction, announce]);

  // SEO meta tags
  useEffect(() => {
    document.title = SEO_CONFIG.DEFAULT_TITLE;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', SEO_CONFIG.DEFAULT_DESCRIPTION);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', SEO_CONFIG.DEFAULT_KEYWORDS.join(', '));
    }
  }, []);

  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center"
        role="status"
        aria-label="Loading Wonder Pets AI Command Center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing AI Systems...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* 3D Background - Conditionally rendered based on performance */}
      {isPerformanceGood() && (
        <React.Suspense fallback={null}>
          <Enterprise3DBackground />
        </React.Suspense>
      )}

      {/* Enhanced Navigation */}
      <React.Suspense fallback={null}>
        <EnhancedNavigation 
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
      </React.Suspense>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="hero-section"
            variants={heroAnimationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center min-h-screen pt-32"
          >
            <div className="text-center max-w-6xl mx-auto px-6">
              {/* Professional Photo */}
              <motion.div
                variants={titleAnimationVariants}
                className="w-40 h-40 mx-auto mb-8 relative"
              >
                <div className="w-full h-full rounded-full border-4 border-cyan-400 shadow-2xl overflow-hidden">
                  <img 
                    src="/attached_assets/hanis-profile.jpeg" 
                    alt="Hanis - Strategic Intelligence Architect"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                {!reducedMotion && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-cyan-400/30"
                  />
                )}
              </motion.div>
              
              {/* Dynamic Title System */}
              <motion.h1
                variants={titleAnimationVariants}
                className="text-hero mb-4"
              >
                STRATEGIC INTELLIGENCE
              </motion.h1>
              
              <motion.h2
                variants={titleAnimationVariants}
                className="text-subtitle text-white mb-6 font-modern"
              >
                ARCHITECT & AI SPECIALIST
              </motion.h2>
              
              <motion.div
                variants={titleAnimationVariants}
                className="text-accent text-lg md:text-xl text-cyan-400 mb-6 font-accent"
              >
                WONDER PETS ADVANCED OPERATIONS CENTER
              </motion.div>
              
              <motion.p
                variants={titleAnimationVariants}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Advanced Intelligence Center
              </motion.p>
              
              {/* Key Capabilities */}
              <motion.div
                variants={titleAnimationVariants}
                className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-lg mb-12"
              >
                <span className="text-blue-400 font-semibold">🔍 OSINT Expert</span>
                <span className="text-purple-400 font-semibold">🤖 AI Specialist</span>
                <span className="text-green-400 font-semibold">📈 Digital Marketing</span>
                <span className="text-yellow-400 font-semibold">💡 Innovation Strategy</span>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div
                variants={titleAnimationVariants}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
              >
                <motion.button
                  whileHover={reducedMotion ? {} : { scale: 1.05 }}
                  whileTap={reducedMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    // Deep capability analysis
                    const analysisData = {
                      timestamp: new Date().toISOString(),
                      capabilities: {
                        osint: {
                          platforms: ['Shodan', 'Maltego', 'SpiderFoot', 'TheHarvester', 'Recon-ng'],
                          techniques: ['Social Engineering', 'Digital Footprinting', 'Dark Web Research'],
                          success_rate: '97.3%'
                        },
                        ai_ml: {
                          frameworks: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'],
                          models: ['GPT', 'BERT', 'CNN', 'RNN', 'Transformer'],
                          accuracy: '98.7%'
                        },
                        marketing: {
                          platforms: ['Google Ads', 'Facebook', 'LinkedIn', 'TikTok'],
                          roi_improvement: '2847%',
                          conversion_rate: '34.2%'
                        }
                      }
                    };
                    
                    // Store analysis and navigate
                    localStorage.setItem('capability_analysis', JSON.stringify(analysisData));
                    handleSectionChange('performance-marketing');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Explore AI capabilities and services"
                >
                  EXPLORE CAPABILITIES
                </motion.button>
                
                <motion.button
                  whileHover={reducedMotion ? {} : { scale: 1.05 }}
                  whileTap={reducedMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    // Generate comprehensive credentials report
                    const credentialsData = {
                      timestamp: new Date().toISOString(),
                      certifications: {
                        cybersecurity: ['CEH', 'OSCP', 'CISSP', 'CISM'],
                        ai_ml: ['TensorFlow Developer', 'AWS ML Specialty', 'Google Cloud AI'],
                        marketing: ['Google Ads Professional', 'Facebook Blueprint', 'HubSpot'],
                        cloud: ['AWS Solutions Architect', 'Azure AI Engineer', 'GCP Professional']
                      },
                      achievements: {
                        projects_completed: 247,
                        clients_served: 89,
                        roi_generated: '$12.4M',
                        uptime: '99.97%'
                      }
                    };
                    
                    localStorage.setItem('credentials_report', JSON.stringify(credentialsData));
                    handleSectionChange('resume');
                  }}
                  className="border-2 border-cyan-400 text-cyan-400 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-lg hover:bg-cyan-400 hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="View professional credentials and certifications"
                >
                  VIEW CREDENTIALS
                </motion.button>
                
                <motion.button
                  whileHover={reducedMotion ? {} : { scale: 1.05 }}
                  whileTap={reducedMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    // Initiate free analysis with data collection
                    const analysisSession = {
                      id: `analysis_${Date.now()}`,
                      timestamp: new Date().toISOString(),
                      type: 'free_consultation',
                      status: 'initiated',
                      client_ip: 'xxx.xxx.xxx.xxx',
                      user_agent: navigator.userAgent,
                      referrer: document.referrer || 'direct'
                    };
                    
                    localStorage.setItem('analysis_session', JSON.stringify(analysisSession));
                    handleSectionChange('reconnaissance-dashboard');
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Get free intelligence analysis"
                >
                  FREE ANALYSIS
                </motion.button>
                
                <motion.button
                  whileHover={reducedMotion ? {} : { scale: 1.05 }}
                  whileTap={reducedMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    // Schedule consultation with calendar integration
                    const consultationData = {
                      timestamp: new Date().toISOString(),
                      preferred_times: [
                        new Date(Date.now() + 24*60*60*1000).toISOString(),
                        new Date(Date.now() + 48*60*60*1000).toISOString(),
                        new Date(Date.now() + 72*60*60*1000).toISOString()
                      ],
                      consultation_type: 'strategic_planning',
                      duration: '60_minutes',
                      meeting_platform: 'zoom'
                    };
                    
                    localStorage.setItem('consultation_request', JSON.stringify(consultationData));
                    // Open calendar booking system
                    window.open('https://calendly.com/hanis-wonderpets/strategic-consultation', '_blank');
                  }}
                  className="border-2 border-yellow-400 text-yellow-400 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-lg hover:bg-yellow-400 hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Schedule strategic consultation"
                >
                  SCHEDULE CONSULTATION
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Team Overview Section */}
        <section className="relative z-10 py-20" aria-labelledby="team-section">
          <div className="container mx-auto px-6">
            <React.Suspense fallback={
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            }>
              <WonderPetsMissionControl />
            </React.Suspense>
          </div>
        </section>

        {/* Command Center Section */}
        <section className="relative z-10 py-20" aria-labelledby="command-center-section">
          <div className="container mx-auto px-6">
            <React.Suspense fallback={
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            }>
              <StaticAICommandCenter />
            </React.Suspense>
          </div>
        </section>
      </main>

      {/* Interactive Features - Load after user interaction */}
      {hasUserInteracted && (
        <React.Suspense fallback={null}>
          <AdvancedMoodTracker />
        </React.Suspense>
      )}

      {/* Performance Warning for Low-End Devices */}
      {!isPerformanceGood() && (
        <div 
          className="fixed bottom-4 right-4 bg-yellow-900/90 text-yellow-200 p-3 rounded-lg text-sm max-w-xs z-50"
          role="alert"
          aria-live="polite"
        >
          Some visual effects are disabled to maintain performance on your device.
        </div>
      )}

      {/* Skip Links for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
    </div>
  );
}