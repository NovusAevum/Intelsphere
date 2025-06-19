/**
 * Spy Mode Global State Store
 * React Context-based state management without circular dependencies
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

export interface SpyModeSettings {
  scanlineIntensity: number;
  glitchEffect: boolean;
  dataStreamSpeed: number;
  enhancementLevel: 'subtle' | 'moderate' | 'full';
  networkVisualization: boolean;
  soundEffects: boolean;
}

export interface SpyModeState {
  isActive: boolean;
  isTransitioning: boolean;
  settings: SpyModeSettings;
  showMetrics: boolean;
  showConnections: boolean;
}

type SpyModeAction =
  | { type: 'SET_ACTIVE'; payload: boolean }
  | { type: 'SET_TRANSITIONING'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SpyModeSettings> }
  | { type: 'SET_UI_VISIBILITY'; payload: { metrics: boolean; connections: boolean } }
  | { type: 'RESET' };

const defaultSettings: SpyModeSettings = {
  scanlineIntensity: 0.3,
  glitchEffect: true,
  dataStreamSpeed: 1.0,
  enhancementLevel: 'moderate',
  networkVisualization: true,
  soundEffects: false,
};

const initialState: SpyModeState = {
  isActive: false,
  isTransitioning: false,
  settings: defaultSettings,
  showMetrics: false,
  showConnections: false,
};

function spyModeReducer(state: SpyModeState, action: SpyModeAction): SpyModeState {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload };
    case 'SET_TRANSITIONING':
      return { ...state, isTransitioning: action.payload };
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: { ...state.settings, ...action.payload } 
      };
    case 'SET_UI_VISIBILITY':
      return { 
        ...state, 
        showMetrics: action.payload.metrics,
        showConnections: action.payload.connections
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface SpyModeContextType {
  state: SpyModeState;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
  toggle: () => Promise<void>;
  updateSettings: (settings: Partial<SpyModeSettings>) => void;
  setUIVisibility: (metrics: boolean, connections: boolean) => void;
  reset: () => void;
}

const SpyModeContext = createContext<SpyModeContextType | undefined>(undefined);

interface SpyModeProviderProps {
  children: ReactNode;
}

export function SpyModeProvider({ children }: SpyModeProviderProps) {
  const [state, dispatch] = useReducer(spyModeReducer, initialState);

  const activate = useCallback(async () => {
    if (state.isActive || state.isTransitioning) return;

    dispatch({ type: 'SET_TRANSITIONING', payload: true });
    
    // Cinematic transition delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch({ type: 'SET_ACTIVE', payload: true });
    dispatch({ type: 'SET_TRANSITIONING', payload: false });
    dispatch({ type: 'SET_UI_VISIBILITY', payload: { metrics: true, connections: true } });
  }, [state.isActive, state.isTransitioning]);

  const deactivate = useCallback(async () => {
    if (!state.isActive || state.isTransitioning) return;

    dispatch({ type: 'SET_TRANSITIONING', payload: true });
    
    // Transition delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    dispatch({ type: 'SET_ACTIVE', payload: false });
    dispatch({ type: 'SET_TRANSITIONING', payload: false });
    dispatch({ type: 'SET_UI_VISIBILITY', payload: { metrics: false, connections: false } });
  }, [state.isActive, state.isTransitioning]);

  const toggle = useCallback(async () => {
    if (state.isActive) {
      await deactivate();
    } else {
      await activate();
    }
  }, [state.isActive, activate, deactivate]);

  const updateSettings = useCallback((settings: Partial<SpyModeSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const setUIVisibility = useCallback((metrics: boolean, connections: boolean) => {
    dispatch({ type: 'SET_UI_VISIBILITY', payload: { metrics, connections } });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const contextValue: SpyModeContextType = {
    state,
    activate,
    deactivate,
    toggle,
    updateSettings,
    setUIVisibility,
    reset,
  };

  return (
    <SpyModeContext.Provider value={contextValue}>
      {children}
    </SpyModeContext.Provider>
  );
}

// Custom hooks for accessing specific state parts
export function useSpyModeContext(): SpyModeContextType {
  const context = useContext(SpyModeContext);
  if (!context) {
    throw new Error('useSpyModeContext must be used within a SpyModeProvider');
  }
  return context;
}

export function useSpyModeActive(): boolean {
  const { state } = useSpyModeContext();
  return state.isActive;
}

export function useSpyModeTransitioning(): boolean {
  const { state } = useSpyModeContext();
  return state.isTransitioning;
}

export function useSpyModeSettings(): SpyModeSettings {
  const { state } = useSpyModeContext();
  return state.settings;
}

export function useSpyModeUI(): { showMetrics: boolean; showConnections: boolean } {
  const { state } = useSpyModeContext();
  return { 
    showMetrics: state.showMetrics, 
    showConnections: state.showConnections 
  };
}

export function useSpyModeActions() {
  const { activate, deactivate, toggle, updateSettings, setUIVisibility, reset } = useSpyModeContext();
  return { activate, deactivate, toggle, updateSettings, setUIVisibility, reset };
}