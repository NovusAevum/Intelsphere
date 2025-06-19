import { useEffect, useRef, useCallback } from 'react';

interface Advanced3DParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  baseSize: number;
  alpha: number;
  color: string;
  hue: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  pulse: number;
  type: 'star' | 'cube' | 'sphere' | 'neural' | 'quantum' | 'diamond';
  trail: Array<{ x: number; y: number; alpha: number }>;
  energy: number;
  magneticField: number;
}

interface NeuralConnection {
  particle1: Advanced3DParticle;
  particle2: Advanced3DParticle;
  strength: number;
  pulsePhase: number;
  data: number;
}

interface WaveField {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

export default function Advanced3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Advanced3DParticle[]>([]);
  const connectionsRef = useRef<NeuralConnection[]>([]);
  const waveFieldsRef = useRef<WaveField[]>([]);
  const performanceRef = useRef({ fps: 60, frameCount: 0, lastTime: 0 });

  const isHighPerformanceDevice = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return false;
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return !renderer.toLowerCase().includes('intel') || navigator.hardwareConcurrency >= 4;
      }
      return navigator.hardwareConcurrency >= 4;
    } catch {
      return navigator.hardwareConcurrency >= 2;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!context) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const isHighPerf = isHighPerformanceDevice();
    const totalParticles = isHighPerf ? 120 : 60;
    const maxNeuralConnections = isHighPerf ? 10 : 5;

    // Canvas setup with retina display support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      context.scale(devicePixelRatio, devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particle system
    const particles: Advanced3DParticle[] = [];
    for (let i = 0; i < totalParticles; i++) {
      const particle: Advanced3DParticle = {
        x: Math.random() * canvas.width / devicePixelRatio,
        y: Math.random() * canvas.height / devicePixelRatio,
        z: Math.random() * 1000 - 500,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.4,
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
        type: (['neural', 'quantum', 'star'] as const)[Math.floor(Math.random() * 3)],
        trail: [],
        energy: Math.random() * 100,
        magneticField: Math.random() * 0.15
      };
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Neural connection system
    const connections: NeuralConnection[] = [];
    const updateNeuralConnections = () => {
      connections.length = 0;
      for (let i = 0; i < particles.length && connections.length < maxNeuralConnections; i++) {
        for (let j = i + 1; j < particles.length && connections.length < maxNeuralConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) {
            connections.push({
              particle1: particles[i],
              particle2: particles[j],
              strength: 1 - distance / 180,
              pulsePhase: Math.random() * Math.PI * 2,
              data: Math.random()
            });
          }
        }
      }
    };

    connectionsRef.current = connections;

    // Wave field system
    const waveFields: WaveField[] = [];
    for (let i = 0; i < 6; i++) {
      waveFields.push({
        x: Math.random() * canvas.width / devicePixelRatio,
        y: Math.random() * canvas.height / devicePixelRatio,
        amplitude: Math.random() * 25 + 15,
        frequency: Math.random() * 0.025 + 0.015,
        phase: Math.random() * Math.PI * 2
      });
    }

    waveFieldsRef.current = waveFields;

    // Optimized mouse interaction
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left),
          y: (e.clientY - rect.top)
        };
        lastMouseUpdate = now;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Particle physics engine
    const updateParticle = (particle: Advanced3DParticle, deltaTime: number) => {
      // Core physics
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.z += particle.vz * deltaTime;

      // Boundary conditions with smooth wrapping
      const width = canvas.width / devicePixelRatio;
      const height = canvas.height / devicePixelRatio;
      
      if (particle.x < -100) particle.x = width + 100;
      if (particle.x > width + 100) particle.x = -100;
      if (particle.y < -100) particle.y = height + 100;
      if (particle.y > height + 100) particle.y = -100;

      // Z-depth cycling for 3D effect
      if (particle.z < -600) particle.z = 600;
      if (particle.z > 600) particle.z = -600;

      // Advanced mouse interaction
      const mouseDistance = Math.sqrt(
        Math.pow(particle.x - mouseRef.current.x, 2) +
        Math.pow(particle.y - mouseRef.current.y, 2)
      );

      if (mouseDistance < 250) {
        const attraction = 0.0002 * (250 - mouseDistance) * deltaTime;
        const forceX = (mouseRef.current.x - particle.x) * attraction;
        const forceY = (mouseRef.current.y - particle.y) * attraction;
        
        particle.vx += forceX;
        particle.vy += forceY;
        
        // Add energy to nearby particles
        particle.energy = Math.min(particle.energy + 0.5, 100);
      }

      // Apply friction for stability
      particle.vx *= 0.998;
      particle.vy *= 0.998;
      particle.vz *= 0.999;

      // Life cycle management
      particle.life += deltaTime;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.energy = Math.random() * 100;
        particle.hue = 180 + Math.random() * 80;
        particle.color = `hsl(${particle.hue}, 75%, 65%)`;
      }

      // Dynamic visual properties
      particle.pulse += 0.08 * deltaTime;
      particle.rotation += particle.rotationSpeed * deltaTime;
      
      const pulseScale = 1 + Math.sin(particle.pulse) * 0.4;
      particle.size = particle.baseSize * pulseScale;
      particle.alpha = 0.4 + Math.sin(particle.pulse * 0.7) * 0.3;

      // Trail system for motion blur
      particle.trail.unshift({ 
        x: particle.x, 
        y: particle.y, 
        alpha: particle.alpha * 0.6 
      });
      
      if (particle.trail.length > 12) {
        particle.trail.pop();
      }
    };

    // High-performance rendering engine
    const render = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - (performanceRef.current.lastTime || currentTime)) / 16, 2);
      performanceRef.current.lastTime = currentTime;

      // Clear with fade effect
      context.fillStyle = 'rgba(0, 0, 0, 0.08)';
      context.fillRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);

      const time = timeRef.current;

      // Update wave fields
      waveFields.forEach(wave => {
        wave.phase += wave.frequency * deltaTime;
      });

      // Update all particles
      particles.forEach(particle => updateParticle(particle, deltaTime));

      // Update neural connections periodically
      if (time % 45 === 0) {
        updateNeuralConnections();
      }

      // Render neural network connections
      context.strokeStyle = 'rgba(100, 200, 255, 0.4)';
      context.lineWidth = 1.5;
      
      connections.forEach(conn => {
        const pulse = Math.sin(time * 0.06 + conn.pulsePhase) * 0.5 + 0.5;
        context.globalAlpha = conn.strength * pulse * 0.7;
        
        // Main connection line
        context.beginPath();
        context.moveTo(conn.particle1.x, conn.particle1.y);
        context.lineTo(conn.particle2.x, conn.particle2.y);
        context.stroke();

        // Data pulse along connection
        const progress = (time * 0.03 + conn.data) % 1;
        const pulseX = conn.particle1.x + (conn.particle2.x - conn.particle1.x) * progress;
        const pulseY = conn.particle1.y + (conn.particle2.y - conn.particle1.y) * progress;
        
        context.fillStyle = `hsl(200, 100%, ${70 + pulse * 30}%)`;
        context.globalAlpha = pulse * 0.8;
        context.beginPath();
        context.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        context.fill();
      });

      // Render particles with advanced visual effects
      particles.forEach(particle => {
        const depthScale = 1 - Math.abs(particle.z) / 600 * 0.6;
        const renderSize = particle.size * depthScale;
        
        if (renderSize > 0.8) {
          // Render particle trail
          particle.trail.forEach((point, index) => {
            const trailAlpha = (1 - index / particle.trail.length) * 0.4 * depthScale;
            const trailSize = renderSize * (1 - index / particle.trail.length) * 0.6;
            
            context.globalAlpha = trailAlpha;
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            context.fill();
          });

          // Main particle rendering
          context.globalAlpha = particle.alpha * depthScale;
          
          if (particle.type === 'neural') {
            // Neural node with glow effect
            const gradient = context.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, renderSize * 3
            );
            gradient.addColorStop(0, `hsl(${particle.hue}, 90%, 75%)`);
            gradient.addColorStop(0.6, `hsl(${particle.hue}, 70%, 50%)`);
            gradient.addColorStop(1, 'transparent');
            
            context.fillStyle = gradient;
            context.beginPath();
            context.arc(particle.x, particle.y, renderSize * 3, 0, Math.PI * 2);
            context.fill();
            
            // Core node
            context.fillStyle = `hsl(${particle.hue}, 100%, 85%)`;
            context.beginPath();
            context.arc(particle.x, particle.y, renderSize, 0, Math.PI * 2);
            context.fill();
            
          } else if (particle.type === 'quantum') {
            // Quantum particle with uncertainty principle visualization
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation);
            
            const uncertainty = Math.sin(particle.pulse * 3) * 0.5 + 0.5;
            const segments = 8;
            
            for (let i = 0; i < segments; i++) {
              context.rotate(Math.PI * 2 / segments);
              const segmentBrightness = 40 + uncertainty * 40;
              context.fillStyle = `hsl(${particle.hue + i * 8}, 80%, ${segmentBrightness}%)`;
              context.fillRect(-renderSize * 0.6, -renderSize * 0.6, renderSize * 1.2, renderSize * 0.3);
            }
            context.restore();
            
          } else {
            // Star particle with dynamic spikes
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate(particle.rotation);
            
            context.fillStyle = particle.color;
            context.beginPath();
            
            const spikes = 10;
            for (let i = 0; i < spikes; i++) {
              const angle = (i / spikes) * Math.PI * 2;
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
        }
      });

      // Ambient wave field effects
      context.globalAlpha = 0.15;
      waveFields.forEach(wave => {
        const waveValue = Math.sin(wave.phase) * wave.amplitude;
        const radius = Math.abs(waveValue) * 4;
        
        const gradient = context.createRadialGradient(
          wave.x, wave.y, 0,
          wave.x, wave.y, radius
        );
        gradient.addColorStop(0, 'rgba(100, 220, 255, 0.4)');
        gradient.addColorStop(0.7, 'rgba(100, 220, 255, 0.1)');
        gradient.addColorStop(1, 'transparent');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(wave.x, wave.y, radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      timeRef.current++;

      // Performance monitoring
      performanceRef.current.frameCount++;
      if (currentTime - (performanceRef.current.lastTime || 0) > 1000) {
        performanceRef.current.fps = performanceRef.current.frameCount;
        performanceRef.current.frameCount = 0;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    // Start the rendering loop
    animationRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHighPerformanceDevice]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0f 25%, #000810 50%, #000000 100%)',
        willChange: 'transform'
      }}
    />
  );
}