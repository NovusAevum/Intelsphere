import { useEffect, useRef } from 'react';

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ULTIMATE NEURAL NETWORK NODES WITH QUANTUM PROPERTIES
    const nodes: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      connections: number[];
      energy: number;
      quantumState: number;
      pulsePhase: number;
      dimensionalShift: number;
      nodeType: string;
    }> = [];

    // Create massive quantum node network - 1000+ elements
    for (let i = 0; i < 1000; i++) {
      const nodeType = Math.random();
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 200, // Increased depth
        vx: (Math.random() - 0.5) * (nodeType > 0.8 ? 8 : 3), // Fast movers
        vy: (Math.random() - 0.5) * (nodeType > 0.8 ? 8 : 3),
        vz: (Math.random() - 0.5) * 2,
        connections: [],
        energy: Math.random(),
        quantumState: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        dimensionalShift: Math.random() * (nodeType > 0.9 ? 2 : 0.8), // Extreme shifters
        nodeType: nodeType > 0.95 ? 'supernode' : nodeType > 0.8 ? 'fastnode' : 'regular'
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    // REAL-TIME DATA STREAMS
    const dataStreams: Array<{
      x: number;
      y: number;
      speed: number;
      intensity: number;
      type: 'financial' | 'social' | 'threat' | 'network';
    }> = [];
    
    for (let i = 0; i < 200; i++) {
      dataStreams.push({
        x: Math.random() * canvas.width,
        y: -20,
        speed: 2 + Math.random() * 8,
        intensity: Math.random(),
        type: ['financial', 'social', 'threat', 'network'][Math.floor(Math.random() * 4)] as any
      });
    }

    const animate = () => {
      // Dynamic background with data intensity
      const intensity = Math.sin(Date.now() * 0.001) * 0.05 + 0.05;
      ctx.fillStyle = `rgba(15, 23, 42, ${0.1 + intensity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // SPECTACULAR DATA STREAM VISUALIZATION
      dataStreams.forEach(stream => {
        stream.y += stream.speed;
        if (stream.y > canvas.height + 20) {
          stream.y = -20;
          stream.x = Math.random() * canvas.width;
        }
        
        const colors = {
          financial: [0, 255, 100],
          social: [100, 150, 255],
          threat: [255, 50, 50],
          network: [255, 200, 0]
        };
        
        const [r, g, b] = colors[stream.type];
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${stream.intensity * 0.8})`;
        ctx.fillRect(stream.x, stream.y, 2, 10 + stream.intensity * 15);
        
        // Data pulse effect
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${stream.intensity * 0.3})`;
        ctx.fillRect(stream.x - 1, stream.y - 5, 4, 20 + stream.intensity * 25);
      });

      // Update quantum-enhanced nodes
      const time = Date.now() * 0.001;
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        // QUANTUM STATE EVOLUTION
        node.quantumState += 0.02;
        node.pulsePhase += 0.03;
        node.dimensionalShift = Math.sin(time * 0.5 + node.quantumState) * 0.3;
        
        // ENHANCED ENERGY CALCULATION
        node.energy = (
          Math.sin(time + node.x * 0.01) * 0.3 +
          Math.cos(time * 1.5 + node.pulsePhase) * 0.3 +
          Math.sin(node.quantumState) * 0.4 + 0.5
        );

        // Enhanced physics with spectacular effects
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          // Explosion effect on boundary hit
          for (let j = 0; j < 5; j++) {
            const sparkle = {
              x: node.x,
              y: node.y,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              life: 30
            };
          }
        }
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        if (node.z < 0 || node.z > 200) node.vz *= -1;

        // Keep in bounds with dimensional wrapping for supernodes
        if (node.nodeType === 'supernode') {
          // Supernodes can wrap around dimensions
          node.x = node.x < 0 ? canvas.width : node.x > canvas.width ? 0 : node.x;
          node.y = node.y < 0 ? canvas.height : node.y > canvas.height ? 0 : node.y;
        } else {
          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }
        node.z = Math.max(0, Math.min(200, node.z));
      });

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          if (target) {
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + 
              Math.pow(node.y - target.y, 2)
            );
            
            if (distance < 200) {
              const opacity = Math.max(0, 1 - distance / 200) * node.energy;
              const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
              
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.8})`);
              gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.6})`);
              gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * 0.4})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = opacity * 2;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            }
          }
        });
      });

      // SPECTACULAR RENDERING WITH DRAMATIC EFFECTS
      nodes.forEach((node, index) => {
        const baseSize = node.nodeType === 'supernode' ? 8 + node.z * 0.2 + node.energy * 6 :
                        node.nodeType === 'fastnode' ? 4 + node.z * 0.15 + node.energy * 4 :
                        2 + node.z * 0.1 + node.energy * 3;
        const quantumSize = baseSize * (1 + node.dimensionalShift);
        const opacity = node.nodeType === 'supernode' ? 0.8 + node.energy * 0.2 : 0.3 + node.energy * 0.7;
        
        // QUANTUM DIMENSIONAL OFFSET
        const offsetX = node.x + Math.sin(node.quantumState) * node.dimensionalShift * 10;
        const offsetY = node.y + Math.cos(node.pulsePhase) * node.dimensionalShift * 8;
        
        // REVOLUTIONARY MULTI-LAYER GRADIENT
        const gradient = ctx.createRadialGradient(
          offsetX, offsetY, 0,
          offsetX, offsetY, quantumSize * 1.5
        );
        
        // QUANTUM STATE COLOR MAPPING
        const hue = (node.quantumState * 180 / Math.PI + time * 30) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${opacity})`);
        gradient.addColorStop(0.3, `hsla(${hue + 60}, 70%, 50%, ${opacity * 0.8})`);
        gradient.addColorStop(0.7, `hsla(${hue + 120}, 60%, 40%, ${opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

        // MAIN QUANTUM NODE
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, quantumSize, 0, Math.PI * 2);
        ctx.fill();

        // DIMENSIONAL ECHO EFFECT
        ctx.fillStyle = `hsla(${hue + 180}, 60%, 70%, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, baseSize * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // PULSING QUANTUM CORE
        const coreIntensity = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${node.energy * coreIntensity * 0.9})`;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, quantumSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // ENERGY RING EFFECT
        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, ${opacity * 0.6})`;
        ctx.lineWidth = 1 + node.energy * 2;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, quantumSize * 1.3, 0, Math.PI * 2);
        ctx.stroke();
        
        // SUPERNODE SPECTACULAR EFFECTS
        if (node.nodeType === 'supernode') {
          // Massive energy burst effect
          for (let burst = 0; burst < 8; burst++) {
            const angle = (burst / 8) * Math.PI * 2 + time;
            const burstX = offsetX + Math.cos(angle) * quantumSize * 2;
            const burstY = offsetY + Math.sin(angle) * quantumSize * 2;
            
            ctx.fillStyle = `hsla(${hue + burst * 45}, 100%, 70%, ${opacity * 0.4})`;
            ctx.beginPath();
            ctx.arc(burstX, burstY, quantumSize * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Quantum field distortion
          ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${opacity * 0.8})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let i = 0; i < 16; i++) {
            const fieldAngle = (i / 16) * Math.PI * 2 + time * 2;
            const fieldRadius = quantumSize * (2 + Math.sin(time * 3 + i) * 0.5);
            const fieldX = offsetX + Math.cos(fieldAngle) * fieldRadius;
            const fieldY = offsetY + Math.sin(fieldAngle) * fieldRadius;
            
            if (i === 0) ctx.moveTo(fieldX, fieldY);
            else ctx.lineTo(fieldX, fieldY);
          }
          ctx.closePath();
          ctx.stroke();
        }
      });

      // MASSIVE REAL-TIME DATA METRICS OVERLAY
      const metricsX = canvas.width - 220;
      const metricsY = 20;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(metricsX, metricsY, 200, 150);
      
      ctx.fillStyle = '#00ff88';
      ctx.font = '12px monospace';
      ctx.fillText('LIVE INTEL STREAM', metricsX + 10, metricsY + 20);
      ctx.fillText(`Active Nodes: ${nodes.length}`, metricsX + 10, metricsY + 40);
      ctx.fillText(`Data Streams: ${dataStreams.length}`, metricsX + 10, metricsY + 60);
      ctx.fillText(`Supernodes: ${nodes.filter(n => n.nodeType === 'supernode').length}`, metricsX + 10, metricsY + 80);
      ctx.fillText(`Network Load: ${Math.floor(Math.random() * 100)}%`, metricsX + 10, metricsY + 100);
      ctx.fillText(`Threat Level: ${Math.floor(Math.random() * 10)}/10`, metricsX + 10, metricsY + 120);
      ctx.fillText(`Quantum State: ACTIVE`, metricsX + 10, metricsY + 140);

      // MASSIVE ENERGY WAVES ACROSS SCREEN
      for (let wave = 0; wave < 5; wave++) {
        const waveY = (time * 100 + wave * 200) % (canvas.height + 100);
        const gradient = ctx.createLinearGradient(0, waveY - 10, 0, waveY + 10);
        gradient.addColorStop(0, 'rgba(0, 255, 200, 0)');
        gradient.addColorStop(0.5, `rgba(0, 255, 200, ${0.3 + Math.sin(time * 2) * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 255, 200, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, waveY - 10, canvas.width, 20);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
    />
  );
}