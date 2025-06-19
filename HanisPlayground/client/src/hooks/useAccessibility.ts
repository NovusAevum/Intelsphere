import { useState, useEffect, useCallback, useRef } from 'react';
import { announceToScreenReader, trapFocus, createKeyboardHandler } from '../utils/accessibility';
import type { A11yOptions } from '../utils/accessibility';

export function useAccessibility() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      largeText: window.matchMedia('(min-width: 1200px)')
    };

    const updatePreferences = () => {
      setReducedMotion(mediaQueries.reducedMotion.matches);
      setHighContrast(mediaQueries.highContrast.matches);
      setLargeText(mediaQueries.largeText.matches);
    };

    updatePreferences();

    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  }, []);

  return {
    reducedMotion,
    highContrast,
    largeText,
    announce,
  };
}

export function useFocusTrap(active: boolean = false) {
  const elementRef = useRef<HTMLElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (active && elementRef.current) {
      cleanupRef.current = trapFocus(elementRef.current);
    } else if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [active]);

  return elementRef;
}

export function useKeyboardShortcuts(keyMap: Record<string, () => void>, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handler = createKeyboardHandler(keyMap);
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [keyMap, enabled]);
}

export function useA11yProps(options: A11yOptions) {
  return {
    'aria-label': options.ariaLabel,
    'aria-describedby': options.ariaDescribedBy,
    'role': options.role,
    'tabIndex': options.tabIndex,
  };
}