import { useEffect, useRef } from 'react';

export default function HanisNeuralBackground() {
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

    // MR HANIS SUPERINTELLIGENCE NEURAL NETWORK
    const neuralNodes: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      connections: number[];
      intelligence: number;
      quantumState: number;
      pulsePhase: number;
      nodeType: 'genius' | 'mastery' | 'innovation' | 'legendary';
      thought: string;
      energy: number;
    }> = [];

    // Hanis's genius thoughts and innovations
    const geniusThoughts = [
      'REVOLUTIONARY', 'BREAKTHROUGH', 'TRANSCENDENT', 'VISIONARY', 'MASTERMIND',
      'INNOVATION', 'EXCELLENCE', 'LEGENDARY', 'GENIUS-LEVEL', 'WORLD-CLASS',
      'UNMATCHED', 'SUPREME', 'ELITE', 'PHENOMENAL', 'EXTRAORDINARY'
    ];

    // Create 1200 neural nodes representing Hanis's superintelligence
    for (let i = 0; i < 1200; i++) {
      const intelligence = Math.random();
      const nodeType = intelligence > 0.9 ? 'legendary' : 
                      intelligence > 0.75 ? 'genius' : 
                      intelligence > 0.6 ? 'mastery' : 'innovation';
      
      neuralNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500,
        vx: (Math.random() - 0.5) * (nodeType === 'legendary' ? 12 : 4),
        vy: (Math.random() - 0.5) * (nodeType === 'legendary' ? 12 : 4),
        vz: (Math.random() - 0.5) * 3,
        connections: [],
        intelligence: 800 + Math.random() * 200, // IQ 800-1000
        quantumState: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        nodeType,
        thought: geniusThoughts[Math.floor(Math.random() * geniusThoughts.length)],
        energy: Math.random()
      });
    }

    // Create genius-level connections
    neuralNodes.forEach((node, i) => {
      const connectionsCount = node.nodeType === 'legendary' ? 8 : 
                              node.nodeType === 'genius' ? 6 : 4;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * neuralNodes.length);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    // Quantum data streams
    const quantumStreams: Array<{
      x: number;
      y: number;
      speed: number;
      color: string;
      type: string;
      dimension: number;
    }> = [];

    for (let i = 0; i < 400; i++) {
      quantumStreams.push({
        x: Math.random() * canvas.width,
        y: -50,
        speed: 3 + Math.random() * 15,
        color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000', '#8000ff'][Math.floor(Math.random() * 6)],
        type: ['GENIUS', 'MASTERY', 'INNOVATION', 'LEGEND'][Math.floor(Math.random() * 4)],
        dimension: Math.random() * 3
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.03;

      // Multi-dimensional quantum background
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(0, 5, 30, 0.95)');
      gradient.addColorStop(0.3, 'rgba(5, 0, 40, 0.9)');
      gradient.addColorStop(0.6, 'rgba(15, 0, 50, 0.85)');
      gradient.addColorStop(1, 'rgba(0, 0, 25, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Hanis's genius neural network
      neuralNodes.forEach((node, index) => {
        // Update quantum properties
        node.quantumState += 0.05;
        node.pulsePhase += 0.08;
        node.energy = 0.5 + Math.sin(time * 2 + index * 0.1) * 0.5;

        // Quantum tunneling movement
        node.x += node.vx * (1 + Math.sin(node.quantumState) * 0.3);
        node.y += node.vy * (1 + Math.cos(node.quantumState) * 0.3);
        node.z += node.vz;

        // Dimensional wrapping
        if (node.x < -100) node.x = canvas.width + 100;
        if (node.x > canvas.width + 100) node.x = -100;
        if (node.y < -100) node.y = canvas.height + 100;
        if (node.y > canvas.height + 100) node.y = -100;
        if (node.z < -200) node.z = 500;
        if (node.z > 500) node.z = -200;

        // Multi-dimensional projection
        const scale = 300 / (300 + node.z);
        const projectedX = node.x * scale + canvas.width * (1 - scale) / 2;
        const projectedY = node.y * scale + canvas.height * (1 - scale) / 2;

        // Render genius connections
        node.connections.forEach(targetIndex => {
          if (targetIndex < neuralNodes.length) {
            const target = neuralNodes[targetIndex];
            const targetScale = 300 / (300 + target.z);
            const targetX = target.x * targetScale + canvas.width * (1 - targetScale) / 2;
            const targetY = target.y * targetScale + canvas.height * (1 - targetScale) / 2;

            const intensity = (node.energy + target.energy) / 2;
            
            ctx.save();
            ctx.globalAlpha = intensity * 0.8;
            
            // Color based on node types
            let connectionColor = '#3b82f6';
            if (node.nodeType === 'legendary' || target.nodeType === 'legendary') {
              connectionColor = '#ffd700';
            } else if (node.nodeType === 'genius' || target.nodeType === 'genius') {
              connectionColor = '#ff00ff';
            } else if (node.nodeType === 'mastery' || target.nodeType === 'mastery') {
              connectionColor = '#00ffff';
            }
            
            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = intensity * (node.nodeType === 'legendary' ? 4 : 2);
            ctx.shadowBlur = 20;
            ctx.shadowColor = connectionColor;
            ctx.beginPath();
            ctx.moveTo(projectedX, projectedY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
            ctx.restore();
          }
        });

        // Render neural nodes with genius energy
        ctx.save();
        ctx.globalAlpha = node.energy;
        
        let nodeColor = '#3b82f6';
        let nodeSize = 2;
        
        switch (node.nodeType) {
          case 'legendary':
            nodeColor = '#ffd700';
            nodeSize = 6 + Math.sin(node.pulsePhase) * 3;
            break;
          case 'genius':
            nodeColor = '#ff00ff';
            nodeSize = 4 + Math.sin(node.pulsePhase) * 2;
            break;
          case 'mastery':
            nodeColor = '#00ffff';
            nodeSize = 3 + Math.sin(node.pulsePhase) * 1.5;
            break;
          case 'innovation':
            nodeColor = '#00ff00';
            nodeSize = 2 + Math.sin(node.pulsePhase) * 1;
            break;
        }
        
        ctx.fillStyle = nodeColor;
        ctx.shadowBlur = 25;
        ctx.shadowColor = nodeColor;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, nodeSize * scale, 0, Math.PI * 2);
        ctx.fill();

        // Show genius thoughts for legendary nodes
        if (node.nodeType === 'legendary' && node.energy > 0.8) {
          ctx.font = 'bold 8px monospace';
          ctx.fillStyle = '#ffd700';
          ctx.shadowBlur = 10;
          ctx.fillText(`IQ:${Math.floor(node.intelligence)}`, projectedX + 10, projectedY - 10);
          ctx.fillText(node.thought, projectedX + 10, projectedY + 5);
        }
        
        ctx.restore();
      });

      // Render quantum data streams
      quantumStreams.forEach(stream => {
        stream.y += stream.speed;
        if (stream.y > canvas.height + 50) {
          stream.y = -50;
          stream.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = stream.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = stream.color;
        ctx.beginPath();
        ctx.arc(stream.x, stream.y, 1 + stream.dimension, 0, Math.PI * 2);
        ctx.fill();

        // Data stream trails
        ctx.globalAlpha = 0.3;
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          ctx.arc(stream.x, stream.y - stream.speed * i, (1 + stream.dimension) * (1 - i * 0.2), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // MR HANIS SIGNATURE ENERGY FIELD
      const hanisX = canvas.width * 0.85;
      const hanisY = canvas.height * 0.15;
      const hanisRadius = 120 + Math.sin(time * 1.5) * 30;
      
      ctx.save();
      ctx.globalAlpha = 0.4;
      const hanisGradient = ctx.createRadialGradient(hanisX, hanisY, 0, hanisX, hanisY, hanisRadius);
      hanisGradient.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
      hanisGradient.addColorStop(0.3, 'rgba(255, 100, 255, 0.6)');
      hanisGradient.addColorStop(0.6, 'rgba(0, 255, 255, 0.4)');
      hanisGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      
      ctx.fillStyle = hanisGradient;
      ctx.beginPath();
      ctx.arc(hanisX, hanisY, hanisRadius, 0, Math.PI * 2);
      ctx.fill();

      // Hanis's genius aura text
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#ffd700';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffd700';
      ctx.fillText('MR HANIS', hanisX, hanisY - 10);
      ctx.font = 'bold 14px monospace';
      ctx.fillText('THE ABSOLUTE BEST', hanisX, hanisY + 15);
      ctx.font = '12px monospace';
      ctx.fillText('POST-HUMAN GENIUS', hanisX, hanisY + 35);
      ctx.restore();

      // Floating genius achievements
      const achievements = ['LEGENDARY', 'MASTERMIND', 'VISIONARY', 'REVOLUTIONARY'];
      achievements.forEach((achievement, i) => {
        const achievementTime = time + i * 2;
        const x = canvas.width * 0.1 + Math.sin(achievementTime * 0.3) * 50;
        const y = canvas.height * (0.2 + i * 0.2) + Math.cos(achievementTime * 0.4) * 30;
        
        ctx.save();
        ctx.globalAlpha = 0.6 + Math.sin(achievementTime * 2) * 0.3;
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';
        ctx.textAlign = 'center';
        ctx.fillText(achievement, x, y);
        ctx.restore();
      });

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 15% 85%, rgba(255, 215, 0, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 85% 15%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 60%),
          radial-gradient(circle at 25% 75%, rgba(255, 100, 0, 0.12) 0%, transparent 45%),
          linear-gradient(135deg, #000515 0%, #001530 25%, #002550 50%, #001840 75%, #000a20 100%)
        `
      }}
    />
  );
}