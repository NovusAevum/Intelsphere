import type { DeviceCapabilities, PerformanceMetrics } from '../types';
import { DEVICE_THRESHOLDS, PERFORMANCE_CONFIG } from '../constants';

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    renderTime: 0,
    particleCount: 0,
    connectionCount: 0,
  };

  private frameCount = 0;
  private lastTime = 0;
  private frameTimes: number[] = [];

  public updateFrameMetrics(currentTime: number): void {
    if (this.lastTime === 0) {
      this.lastTime = currentTime;
      return;
    }

    const deltaTime = currentTime - this.lastTime;
    this.frameTimes.push(deltaTime);

    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }

    this.frameCount++;
    if (currentTime - this.lastTime >= 1000) {
      this.metrics.fps = this.frameCount;
      this.metrics.frameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  public updateRenderMetrics(renderTime: number, particleCount: number, connectionCount: number): void {
    this.metrics.renderTime = renderTime;
    this.metrics.particleCount = particleCount;
    this.metrics.connectionCount = connectionCount;
  }

  public updateMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = memory.usedJSHeapSize;
    }
  }

  public getMetrics(): Readonly<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public isPerformanceGood(): boolean {
    return this.metrics.fps >= PERFORMANCE_CONFIG.TARGET_FPS * 0.8 &&
           this.metrics.frameTime <= 20;
  }
}

export const performanceMonitor = new PerformanceMonitor();

export function detectDeviceCapabilities(): DeviceCapabilities {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  let maxTextureSize = 0;
  if (gl) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  }

  const capabilities: DeviceCapabilities = {
    isHighPerformance: navigator.hardwareConcurrency >= DEVICE_THRESHOLDS.HIGH_PERFORMANCE_CORES,
    supportsWebGL: !!gl,
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    hardwareConcurrency: navigator.hardwareConcurrency || 2,
    maxTextureSize,
  };

  return capabilities;
}

export function optimizeForDevice(capabilities: DeviceCapabilities) {
  const particleCount = capabilities.isHighPerformance 
    ? PERFORMANCE_CONFIG.MAX_PARTICLES 
    : PERFORMANCE_CONFIG.MIN_PARTICLES;

  const updateInterval = capabilities.isHighPerformance 
    ? PERFORMANCE_CONFIG.PARTICLE_UPDATE_INTERVAL 
    : PERFORMANCE_CONFIG.PARTICLE_UPDATE_INTERVAL * 2;

  return {
    particleCount,
    updateInterval,
    enableTrails: capabilities.isHighPerformance,
    enableComplexShapes: capabilities.isHighPerformance,
    maxConnections: capabilities.isHighPerformance ? 10 : 5,
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function measureExecutionTime<T>(
  fn: () => T,
  label?: string
): { result: T; executionTime: number } {
  const start = performance.now();
  const result = fn();
  const executionTime = performance.now() - start;
  
  if (label && import.meta.env.DEV) {
    console.log(`${label}: ${executionTime.toFixed(2)}ms`);
  }
  
  return { result, executionTime };
}

export function createObjectPool<T>(
  createFn: () => T,
  resetFn: (obj: T) => void,
  initialSize: number = 10
) {
  const pool: T[] = [];
  
  // Pre-populate pool
  for (let i = 0; i < initialSize; i++) {
    pool.push(createFn());
  }
  
  return {
    acquire(): T {
      return pool.pop() || createFn();
    },
    release(obj: T): void {
      resetFn(obj);
      pool.push(obj);
    },
    size(): number {
      return pool.length;
    }
  };
}