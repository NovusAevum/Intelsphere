import { useState, useEffect, useCallback, useRef } from 'react';
import type { PerformanceMetrics, DeviceCapabilities } from '../types';
import { performanceMonitor, detectDeviceCapabilities, optimizeForDevice } from '../utils/performance';

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(() => performanceMonitor.getMetrics());
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const detectedCapabilities = detectDeviceCapabilities();
    setCapabilities(detectedCapabilities);

    intervalRef.current = setInterval(() => {
      performanceMonitor.updateMemoryUsage();
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const updateFrameMetrics = useCallback((currentTime: number) => {
    performanceMonitor.updateFrameMetrics(currentTime);
  }, []);

  const updateRenderMetrics = useCallback((renderTime: number, particleCount: number, connectionCount: number) => {
    performanceMonitor.updateRenderMetrics(renderTime, particleCount, connectionCount);
  }, []);

  const getOptimizedSettings = useCallback(() => {
    if (!capabilities) return null;
    return optimizeForDevice(capabilities);
  }, [capabilities]);

  const isPerformanceGood = useCallback(() => {
    return performanceMonitor.isPerformanceGood();
  }, []);

  return {
    metrics,
    capabilities,
    updateFrameMetrics,
    updateRenderMetrics,
    getOptimizedSettings,
    isPerformanceGood,
  };
}