import { useEffect, useRef, useCallback, useMemo } from 'react';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { useAccessibility } from '../hooks/useAccessibility';
import { throttle, createObjectPool, measureExecutionTime } from '../utils/performance';
import { PERFORMANCE_CONFIG, ANIMATION_CONFIG } from '../constants';
import type { Particle3D, Vector3D, NeuralConnection, WaveField, TrailPoint } from '../types';

interface EnterpriseParticle {
  readonly id: string;
  position: Vector3D;
  velocity: Vector3D;
  readonly size: number;
  readonly baseSize: number;
  alpha: number;
  readonly color: string;
  readonly hue: number;
  life: number;
  readonly maxLife: number;
  rotation: number;
  readonly rotationSpeed: number;
  pulse: number;
  readonly type: 'neural' | 'quantum' | 'star';
  trail: TrailPoint[];
  energy: number;
  readonly magneticField: number;
}

interface RenderContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  devicePixelRatio: number;
}

export default function Enterprise3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderContextRef = useRef<RenderContext | null>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<EnterpriseParticle[]>([]);
  const connectionsRef = useRef<NeuralConnection[]>([]);
  const waveFieldsRef = useRef<WaveField[]>([]);
  const mousePositionRef = useRef<Vector3D>({ x: 0, y: 0, z: 0 });
  const timeRef = useRef(0);

  const { 
    metrics, 
    capabilities, 
    updateFrameMetrics, 
    updateRenderMetrics, 
    getOptimizedSettings,
    isPerformanceGood 
  } = usePerformanceMonitor();

  const { reducedMotion, announce } = useAccessibility();

  // Object pools for performance optimization
  const particlePool = useMemo(() => createObjectPool<EnterpriseParticle>(
    () => createParticle('0', { x: 0, y: 0, z: 0 }),
    (particle) => {
      particle.life = 0;
      particle.energy = 0;
      particle.trail.length = 0;
    },
    50
  ), []);

  const trailPointPool = useMemo(() => createObjectPool<TrailPoint>(
    () => ({ x: 0, y: 0, alpha: 0 }),
    (point) => {
      point.x = 0;
      point.y = 0;
      point.alpha = 0;
    },
    200
  ), []);

  // Optimized settings based on device capabilities
  const optimizedSettings = useMemo(() => {
    const settings = getOptimizedSettings();
    if (!settings) return null;

    return {
      ...settings,
      particleCount: reducedMotion ? Math.floor(settings.particleCount * 0.5) : settings.particleCount,
      enableTrails: !reducedMotion && settings.enableTrails,
      animationSpeed: reducedMotion ? 0.3 : 1.0,
    };
  }, [getOptimizedSettings, reducedMotion]);

  const createParticle = useCallback((id: string, position: Vector3D): EnterpriseParticle => {
    const types: Array<'neural' | 'quantum' | 'star'> = ['neural', 'quantum', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id,
      position: { ...position },
      velocity: {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
        z: (Math.random() - 0.5) * 0.4
      },
      size: Math.random() * 4 + 2,
      baseSize: Math.random() * 4 + 2,
      alpha: Math.random() * 0.7 + 0.3,
      color: `hsl(${180 + Math.random() * 80}, 75%, 65%)`,
      hue: 180 + Math.random() * 80,
      life: Math.random() * 1000,
      maxLife: 1500 + Math.random() * 2500,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      pulse: Math.random() * Math.PI * 2,
      type,
      trail: [],
      energy: Math.random() * 100,
      magneticField: Math.random() * 0.15
    };
  }, []);

  const initializeRenderContext = useCallback((canvas: HTMLCanvasElement): RenderContext | null => {
    const context = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true,
      willReadFrequently: false 
    });
    
    if (!context) {
      announce('WebGL context initialization failed', 'assertive');
      return null;
    }

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    context.scale(devicePixelRatio, devicePixelRatio);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    return {
      canvas,
      context,
      width: rect.width,
      height: rect.height,
      devicePixelRatio
    };
  }, [announce]);

  const initializeParticles = useCallback((settings: any, renderContext: RenderContext) => {
    const particles: EnterpriseParticle[] = [];
    
    for (let i = 0; i < settings.particleCount; i++) {
      const particle = createParticle(
        `particle-${i}`,
        {
          x: Math.random() * renderContext.width,
          y: Math.random() * renderContext.height,
          z: Math.random() * 1000 - 500
        }
      );
      particles.push(particle);
    }
    
    particlesRef.current = particles;
  }, [createParticle]);

  const initializeWaveFields = useCallback((renderContext: RenderContext) => {
    const waveFields: WaveField[] = [];
    
    for (let i = 0; i < 6; i++) {
      waveFields.push({
        position: {
          x: Math.random() * renderContext.width,
          y: Math.random() * renderContext.height,
          z: 0
        },
        amplitude: Math.random() * 25 + 15,
        frequency: Math.random() * 0.025 + 0.015,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    waveFieldsRef.current = waveFields;
  }, []);

  const updateParticlePhysics = useCallback((particle: EnterpriseParticle, deltaTime: number, settings: any) => {
    const animationSpeed = settings.animationSpeed || 1.0;
    
    // Physics update
    particle.position.x += particle.velocity.x * deltaTime * animationSpeed;
    particle.position.y += particle.velocity.y * deltaTime * animationSpeed;
    particle.position.z += particle.velocity.z * deltaTime * animationSpeed;

    // Boundary wrapping
    const renderContext = renderContextRef.current;
    if (!renderContext) return;
    
    if (particle.position.x < -100) particle.position.x = renderContext.width + 100;
    if (particle.position.x > renderContext.width + 100) particle.position.x = -100;
    if (particle.position.y < -100) particle.position.y = renderContext.height + 100;
    if (particle.position.y > renderContext.height + 100) particle.position.y = -100;

    // Z-depth cycling
    if (particle.position.z < -600) particle.position.z = 600;
    if (particle.position.z > 600) particle.position.z = -600;

    // Mouse interaction
    const mouseDistance = Math.sqrt(
      Math.pow(particle.position.x - mousePositionRef.current.x, 2) +
      Math.pow(particle.position.y - mousePositionRef.current.y, 2)
    );

    if (mouseDistance < 250) {
      const attraction = 0.0002 * (250 - mouseDistance) * deltaTime * animationSpeed;
      const forceX = (mousePositionRef.current.x - particle.position.x) * attraction;
      const forceY = (mousePositionRef.current.y - particle.position.y) * attraction;
      
      particle.velocity.x += forceX;
      particle.velocity.y += forceY;
      particle.energy = Math.min(particle.energy + 0.5, 100);
    }

    // Apply friction
    particle.velocity.x *= 0.998;
    particle.velocity.y *= 0.998;
    particle.velocity.z *= 0.999;

    // Life cycle management
    particle.life += deltaTime;
    if (particle.life > particle.maxLife) {
      particle.life = 0;
      particle.energy = Math.random() * 100;
      particle.hue = 180 + Math.random() * 80;
    }

    // Dynamic properties
    particle.pulse += 0.08 * deltaTime * animationSpeed;
    particle.rotation += particle.rotationSpeed * deltaTime * animationSpeed;
    
    const pulseScale = 1 + Math.sin(particle.pulse) * 0.4;
    particle.size = particle.baseSize * pulseScale;
    particle.alpha = 0.4 + Math.sin(particle.pulse * 0.7) * 0.3;

    // Trail system
    if (settings.enableTrails && particle.trail.length < 12) {
      const trailPoint = trailPointPool.acquire();
      trailPoint.x = particle.position.x;
      trailPoint.y = particle.position.y;
      trailPoint.alpha = particle.alpha * 0.6;
      
      particle.trail.unshift(trailPoint);
      
      if (particle.trail.length > 12) {
        const oldPoint = particle.trail.pop();
        if (oldPoint) trailPointPool.release(oldPoint);
      }
    }
  }, [trailPointPool]);

  const updateNeuralConnections = useCallback((particles: EnterpriseParticle[], maxConnections: number) => {
    const connections: NeuralConnection[] = [];
    
    for (let i = 0; i < particles.length && connections.length < maxConnections; i++) {
      for (let j = i + 1; j < particles.length && connections.length < maxConnections; j++) {
        const dx = particles[i].position.x - particles[j].position.x;
        const dy = particles[i].position.y - particles[j].position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 180) {
          connections.push({
            particle1: particles[i] as any,
            particle2: particles[j] as any,
            strength: 1 - distance / 180,
            pulsePhase: Math.random() * Math.PI * 2,
            data: Math.random()
          });
        }
      }
    }
    
    connectionsRef.current = connections;
  }, []);

  const renderParticle = useCallback((context: CanvasRenderingContext2D, particle: EnterpriseParticle) => {
    const depthScale = 1 - Math.abs(particle.position.z) / 600 * 0.6;
    const renderSize = particle.size * depthScale;
    
    if (renderSize < 0.8) return;

    // Render trail
    particle.trail.forEach((point, index) => {
      const trailAlpha = (1 - index / particle.trail.length) * 0.4 * depthScale;
      const trailSize = renderSize * (1 - index / particle.trail.length) * 0.6;
      
      context.globalAlpha = trailAlpha;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
      context.fill();
    });

    // Main particle
    context.globalAlpha = particle.alpha * depthScale;
    
    if (particle.type === 'neural') {
      // Neural node with glow
      const gradient = context.createRadialGradient(
        particle.position.x, particle.position.y, 0,
        particle.position.x, particle.position.y, renderSize * 3
      );
      gradient.addColorStop(0, `hsl(${particle.hue}, 90%, 75%)`);
      gradient.addColorStop(0.6, `hsl(${particle.hue}, 70%, 50%)`);
      gradient.addColorStop(1, 'transparent');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.position.x, particle.position.y, renderSize * 3, 0, Math.PI * 2);
      context.fill();
      
      // Core
      context.fillStyle = `hsl(${particle.hue}, 100%, 85%)`;
      context.beginPath();
      context.arc(particle.position.x, particle.position.y, renderSize, 0, Math.PI * 2);
      context.fill();
      
    } else if (particle.type === 'quantum') {
      // Quantum particle
      context.save();
      context.translate(particle.position.x, particle.position.y);
      context.rotate(particle.rotation);
      
      const uncertainty = Math.sin(particle.pulse * 3) * 0.5 + 0.5;
      for (let i = 0; i < 8; i++) {
        context.rotate(Math.PI / 4);
        const brightness = 40 + uncertainty * 40;
        context.fillStyle = `hsl(${particle.hue + i * 8}, 80%, ${brightness}%)`;
        context.fillRect(-renderSize * 0.6, -renderSize * 0.6, renderSize * 1.2, renderSize * 0.3);
      }
      context.restore();
      
    } else {
      // Star particle
      context.save();
      context.translate(particle.position.x, particle.position.y);
      context.rotate(particle.rotation);
      
      context.fillStyle = particle.color;
      context.beginPath();
      
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const radius = i % 2 === 0 ? renderSize * 2 : renderSize * 0.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      
      context.closePath();
      context.fill();
      context.restore();
    }
  }, []);

  const render = useCallback((currentTime: number) => {
    if (!renderContextRef.current || !optimizedSettings) {
      animationFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const { result: renderResult, executionTime } = measureExecutionTime(() => {
      const { context, width, height } = renderContextRef.current!;
      const particles = particlesRef.current;
      const connections = connectionsRef.current;
      const waveFields = waveFieldsRef.current;
      
      // Clear canvas
      context.fillStyle = 'rgba(0, 0, 0, 0.08)';
      context.fillRect(0, 0, width, height);

      const deltaTime = Math.min((currentTime - timeRef.current) / 16, 2);
      timeRef.current = currentTime;

      // Update wave fields
      waveFields.forEach(wave => {
        wave.phase += wave.frequency * deltaTime;
      });

      // Update particles
      particles.forEach(particle => {
        updateParticlePhysics(particle, deltaTime, optimizedSettings);
      });

      // Update connections periodically
      if (Math.floor(currentTime / 1000) % 2 === 0) {
        updateNeuralConnections(particles, optimizedSettings.maxConnections);
      }

      // Render connections
      context.strokeStyle = 'rgba(100, 200, 255, 0.4)';
      context.lineWidth = 1.5;
      
      connections.forEach(conn => {
        const pulse = Math.sin(currentTime * 0.006 + conn.pulsePhase) * 0.5 + 0.5;
        context.globalAlpha = conn.strength * pulse * 0.7;
        
        context.beginPath();
        context.moveTo(conn.particle1.position.x, conn.particle1.position.y);
        context.lineTo(conn.particle2.position.x, conn.particle2.position.y);
        context.stroke();

        // Data pulse
        const progress = (currentTime * 0.003 + conn.data) % 1;
        const pulseX = conn.particle1.position.x + (conn.particle2.position.x - conn.particle1.position.x) * progress;
        const pulseY = conn.particle1.position.y + (conn.particle2.position.y - conn.particle1.position.y) * progress;
        
        context.fillStyle = `hsl(200, 100%, ${70 + pulse * 30}%)`;
        context.globalAlpha = pulse * 0.8;
        context.beginPath();
        context.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        context.fill();
      });

      // Render particles
      particles.forEach(particle => {
        renderParticle(context, particle);
      });

      // Ambient wave effects
      context.globalAlpha = 0.15;
      waveFields.forEach(wave => {
        const waveValue = Math.sin(wave.phase) * wave.amplitude;
        const radius = Math.abs(waveValue) * 4;
        
        const gradient = context.createRadialGradient(
          wave.position.x, wave.position.y, 0,
          wave.position.x, wave.position.y, radius
        );
        gradient.addColorStop(0, 'rgba(100, 220, 255, 0.4)');
        gradient.addColorStop(0.7, 'rgba(100, 220, 255, 0.1)');
        gradient.addColorStop(1, 'transparent');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(wave.position.x, wave.position.y, radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
    });

    // Update performance metrics
    updateFrameMetrics(currentTime);
    updateRenderMetrics(executionTime, particlesRef.current.length, connectionsRef.current.length);

    animationFrameRef.current = requestAnimationFrame(render);
  }, [optimizedSettings, updateParticlePhysics, updateNeuralConnections, renderParticle, updateFrameMetrics, updateRenderMetrics]);

  // Throttled mouse move handler
  const handleMouseMove = useMemo(
    () => throttle((e: MouseEvent) => {
      if (!renderContextRef.current) return;
      
      const rect = renderContextRef.current.canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        z: 0
      };
    }, 16),
    []
  );

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    
    const newContext = initializeRenderContext(canvasRef.current);
    if (newContext) {
      renderContextRef.current = newContext;
      if (optimizedSettings) {
        initializeWaveFields(newContext);
      }
    }
  }, [initializeRenderContext, initializeWaveFields, optimizedSettings]);

  // Initialize everything
  useEffect(() => {
    if (!canvasRef.current || !capabilities || !optimizedSettings) return;

    const renderContext = initializeRenderContext(canvasRef.current);
    if (!renderContext) return;

    renderContextRef.current = renderContext;
    initializeParticles(optimizedSettings, renderContext);
    initializeWaveFields(renderContext);

    // Start rendering
    animationFrameRef.current = requestAnimationFrame(render);

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    announce('3D background system initialized', 'polite');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [capabilities, optimizedSettings, initializeRenderContext, initializeParticles, initializeWaveFields, render, handleMouseMove, handleResize, announce]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0f 25%, #000810 50%, #000000 100%)',
        willChange: 'transform'
      }}
      aria-label="Interactive 3D background with neural network visualization"
      role="img"
    />
  );
}