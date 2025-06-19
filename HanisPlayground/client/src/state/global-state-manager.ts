/**
 * Global State Manager - Centralized state without circular dependencies
 * Manages all cross-component state including spy-mode, navigation, and AI interfaces
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

// === SPY MODE STATE ===
export interface SpyModeSettings {
  scanlineIntensity: number;
  glitchEffect: boolean;
  dataStreamSpeed: number;
  enhancementLevel: 'subtle' | 'moderate' | 'full';
  networkVisualization: boolean;
  soundEffects: boolean;
}

interface SpyModeState {
  isActive: boolean;
  isTransitioning: boolean;
  settings: SpyModeSettings;
  showMetrics: boolean;
  showConnections: boolean;
}

// === NAVIGATION STATE ===
interface NavigationState {
  currentPath: string;
  sidebarOpen: boolean;
  breadcrumbs: string[];
  navigationConfig: any;
}

// === AI INTERFACE STATE ===
interface AIInterfaceState {
  selectedModel: string;
  isProcessing: boolean;
  connectionStatus: Record<string, boolean>;
  conversations: Record<string, any[]>;
}

// === WIDGET STATE ===
interface WidgetState {
  activeWidgets: string[];
  refreshIntervals: Record<string, number>;
  widgetData: Record<string, any>;
}

// === GLOBAL STATE INTERFACE ===
interface GlobalState {
  spyMode: SpyModeState;
  navigation: NavigationState;
  aiInterface: AIInterfaceState;
  widgets: WidgetState;
}

// === ACTION TYPES ===
type GlobalAction =
  // Spy Mode Actions
  | { type: 'SPY_MODE_SET_ACTIVE'; payload: boolean }
  | { type: 'SPY_MODE_SET_TRANSITIONING'; payload: boolean }
  | { type: 'SPY_MODE_UPDATE_SETTINGS'; payload: Partial<SpyModeSettings> }
  | { type: 'SPY_MODE_SET_UI_VISIBILITY'; payload: { metrics: boolean; connections: boolean } }
  
  // Navigation Actions
  | { type: 'NAV_SET_PATH'; payload: string }
  | { type: 'NAV_TOGGLE_SIDEBAR'; payload?: boolean }
  | { type: 'NAV_SET_BREADCRUMBS'; payload: string[] }
  | { type: 'NAV_SET_CONFIG'; payload: any }
  
  // AI Interface Actions
  | { type: 'AI_SET_MODEL'; payload: string }
  | { type: 'AI_SET_PROCESSING'; payload: boolean }
  | { type: 'AI_UPDATE_CONNECTION_STATUS'; payload: Record<string, boolean> }
  | { type: 'AI_ADD_MESSAGE'; payload: { conversationId: string; message: any } }
  
  // Widget Actions
  | { type: 'WIDGET_ACTIVATE'; payload: string }
  | { type: 'WIDGET_DEACTIVATE'; payload: string }
  | { type: 'WIDGET_UPDATE_DATA'; payload: { widgetId: string; data: any } }
  | { type: 'WIDGET_SET_REFRESH_INTERVAL'; payload: { widgetId: string; interval: number } }
  
  // Global Actions
  | { type: 'RESET_ALL' };

// === INITIAL STATE ===
const initialState: GlobalState = {
  spyMode: {
    isActive: false,
    isTransitioning: false,
    settings: {
      scanlineIntensity: 0.3,
      glitchEffect: true,
      dataStreamSpeed: 1.0,
      enhancementLevel: 'moderate',
      networkVisualization: true,
      soundEffects: false,
    },
    showMetrics: false,
    showConnections: false,
  },
  navigation: {
    currentPath: '/',
    sidebarOpen: true,
    breadcrumbs: [],
    navigationConfig: null,
  },
  aiInterface: {
    selectedModel: 'mistral',
    isProcessing: false,
    connectionStatus: {},
    conversations: {},
  },
  widgets: {
    activeWidgets: [],
    refreshIntervals: {},
    widgetData: {},
  },
};

// === REDUCER ===
function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    // Spy Mode Cases
    case 'SPY_MODE_SET_ACTIVE':
      return { ...state, spyMode: { ...state.spyMode, isActive: action.payload } };
    case 'SPY_MODE_SET_TRANSITIONING':
      return { ...state, spyMode: { ...state.spyMode, isTransitioning: action.payload } };
    case 'SPY_MODE_UPDATE_SETTINGS':
      return { 
        ...state, 
        spyMode: { 
          ...state.spyMode, 
          settings: { ...state.spyMode.settings, ...action.payload } 
        } 
      };
    case 'SPY_MODE_SET_UI_VISIBILITY':
      return { 
        ...state, 
        spyMode: { 
          ...state.spyMode, 
          showMetrics: action.payload.metrics,
          showConnections: action.payload.connections
        } 
      };
    
    // Navigation Cases
    case 'NAV_SET_PATH':
      return { ...state, navigation: { ...state.navigation, currentPath: action.payload } };
    case 'NAV_TOGGLE_SIDEBAR':
      return { 
        ...state, 
        navigation: { 
          ...state.navigation, 
          sidebarOpen: action.payload ?? !state.navigation.sidebarOpen 
        } 
      };
    case 'NAV_SET_BREADCRUMBS':
      return { ...state, navigation: { ...state.navigation, breadcrumbs: action.payload } };
    case 'NAV_SET_CONFIG':
      return { ...state, navigation: { ...state.navigation, navigationConfig: action.payload } };
    
    // AI Interface Cases
    case 'AI_SET_MODEL':
      return { ...state, aiInterface: { ...state.aiInterface, selectedModel: action.payload } };
    case 'AI_SET_PROCESSING':
      return { ...state, aiInterface: { ...state.aiInterface, isProcessing: action.payload } };
    case 'AI_UPDATE_CONNECTION_STATUS':
      return { ...state, aiInterface: { ...state.aiInterface, connectionStatus: action.payload } };
    case 'AI_ADD_MESSAGE':
      const { conversationId, message } = action.payload;
      return {
        ...state,
        aiInterface: {
          ...state.aiInterface,
          conversations: {
            ...state.aiInterface.conversations,
            [conversationId]: [...(state.aiInterface.conversations[conversationId] || []), message]
          }
        }
      };
    
    // Widget Cases
    case 'WIDGET_ACTIVATE':
      return {
        ...state,
        widgets: {
          ...state.widgets,
          activeWidgets: [...state.widgets.activeWidgets, action.payload]
        }
      };
    case 'WIDGET_DEACTIVATE':
      return {
        ...state,
        widgets: {
          ...state.widgets,
          activeWidgets: state.widgets.activeWidgets.filter(id => id !== action.payload)
        }
      };
    case 'WIDGET_UPDATE_DATA':
      return {
        ...state,
        widgets: {
          ...state.widgets,
          widgetData: {
            ...state.widgets.widgetData,
            [action.payload.widgetId]: action.payload.data
          }
        }
      };
    case 'WIDGET_SET_REFRESH_INTERVAL':
      return {
        ...state,
        widgets: {
          ...state.widgets,
          refreshIntervals: {
            ...state.widgets.refreshIntervals,
            [action.payload.widgetId]: action.payload.interval
          }
        }
      };
    
    // Global Cases
    case 'RESET_ALL':
      return initialState;
    
    default:
      return state;
  }
}

// === CONTEXT INTERFACE ===
interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
  
  // Spy Mode Actions
  spyModeActivate: () => Promise<void>;
  spyModeDeactivate: () => Promise<void>;
  spyModeToggle: () => Promise<void>;
  spyModeUpdateSettings: (settings: Partial<SpyModeSettings>) => void;
  
  // Navigation Actions
  navigateToPath: (path: string) => void;
  toggleSidebar: (open?: boolean) => void;
  setBreadcrumbs: (breadcrumbs: string[]) => void;
  
  // AI Interface Actions
  setAIModel: (model: string) => void;
  addAIMessage: (conversationId: string, message: any) => void;
  updateConnectionStatus: (status: Record<string, boolean>) => void;
  
  // Widget Actions
  activateWidget: (widgetId: string) => void;
  deactivateWidget: (widgetId: string) => void;
  updateWidgetData: (widgetId: string, data: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// === PROVIDER COMPONENT ===
interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalStateProvider({ children }: GlobalProviderProps) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Spy Mode Actions
  const spyModeActivate = useCallback(async () => {
    if (state.spyMode.isActive || state.spyMode.isTransitioning) return;
    
    dispatch({ type: 'SPY_MODE_SET_TRANSITIONING', payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: 'SPY_MODE_SET_ACTIVE', payload: true });
    dispatch({ type: 'SPY_MODE_SET_TRANSITIONING', payload: false });
    dispatch({ type: 'SPY_MODE_SET_UI_VISIBILITY', payload: { metrics: true, connections: true } });
  }, [state.spyMode.isActive, state.spyMode.isTransitioning]);

  const spyModeDeactivate = useCallback(async () => {
    if (!state.spyMode.isActive || state.spyMode.isTransitioning) return;
    
    dispatch({ type: 'SPY_MODE_SET_TRANSITIONING', payload: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: 'SPY_MODE_SET_ACTIVE', payload: false });
    dispatch({ type: 'SPY_MODE_SET_TRANSITIONING', payload: false });
    dispatch({ type: 'SPY_MODE_SET_UI_VISIBILITY', payload: { metrics: false, connections: false } });
  }, [state.spyMode.isActive, state.spyMode.isTransitioning]);

  const spyModeToggle = useCallback(async () => {
    if (state.spyMode.isActive) {
      await spyModeDeactivate();
    } else {
      await spyModeActivate();
    }
  }, [state.spyMode.isActive, spyModeActivate, spyModeDeactivate]);

  const spyModeUpdateSettings = useCallback((settings: Partial<SpyModeSettings>) => {
    dispatch({ type: 'SPY_MODE_UPDATE_SETTINGS', payload: settings });
  }, []);

  // Navigation Actions
  const navigateToPath = useCallback((path: string) => {
    dispatch({ type: 'NAV_SET_PATH', payload: path });
  }, []);

  const toggleSidebar = useCallback((open?: boolean) => {
    dispatch({ type: 'NAV_TOGGLE_SIDEBAR', payload: open });
  }, []);

  const setBreadcrumbs = useCallback((breadcrumbs: string[]) => {
    dispatch({ type: 'NAV_SET_BREADCRUMBS', payload: breadcrumbs });
  }, []);

  // AI Interface Actions
  const setAIModel = useCallback((model: string) => {
    dispatch({ type: 'AI_SET_MODEL', payload: model });
  }, []);

  const addAIMessage = useCallback((conversationId: string, message: any) => {
    dispatch({ type: 'AI_ADD_MESSAGE', payload: { conversationId, message } });
  }, []);

  const updateConnectionStatus = useCallback((status: Record<string, boolean>) => {
    dispatch({ type: 'AI_UPDATE_CONNECTION_STATUS', payload: status });
  }, []);

  // Widget Actions
  const activateWidget = useCallback((widgetId: string) => {
    dispatch({ type: 'WIDGET_ACTIVATE', payload: widgetId });
  }, []);

  const deactivateWidget = useCallback((widgetId: string) => {
    dispatch({ type: 'WIDGET_DEACTIVATE', payload: widgetId });
  }, []);

  const updateWidgetData = useCallback((widgetId: string, data: any) => {
    dispatch({ type: 'WIDGET_UPDATE_DATA', payload: { widgetId, data } });
  }, []);

  const contextValue: GlobalContextType = {
    state,
    dispatch,
    spyModeActivate,
    spyModeDeactivate,
    spyModeToggle,
    spyModeUpdateSettings,
    navigateToPath,
    toggleSidebar,
    setBreadcrumbs,
    setAIModel,
    addAIMessage,
    updateConnectionStatus,
    activateWidget,
    deactivateWidget,
    updateWidgetData,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

// === CUSTOM HOOKS FOR ACCESSING STATE ===
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalStateProvider');
  }
  return context;
}

// Spy Mode Hooks
export function useSpyMode() {
  const { state, spyModeActivate, spyModeDeactivate, spyModeToggle, spyModeUpdateSettings } = useGlobalContext();
  return {
    isActive: state.spyMode.isActive,
    isTransitioning: state.spyMode.isTransitioning,
    settings: state.spyMode.settings,
    showMetrics: state.spyMode.showMetrics,
    showConnections: state.spyMode.showConnections,
    activate: spyModeActivate,
    deactivate: spyModeDeactivate,
    toggle: spyModeToggle,
    updateSettings: spyModeUpdateSettings,
  };
}

// Navigation Hooks
export function useNavigation() {
  const { state, navigateToPath, toggleSidebar, setBreadcrumbs } = useGlobalContext();
  return {
    currentPath: state.navigation.currentPath,
    sidebarOpen: state.navigation.sidebarOpen,
    breadcrumbs: state.navigation.breadcrumbs,
    navigationConfig: state.navigation.navigationConfig,
    navigateToPath,
    toggleSidebar,
    setBreadcrumbs,
  };
}

// AI Interface Hooks
export function useAIInterface() {
  const { state, setAIModel, addAIMessage, updateConnectionStatus } = useGlobalContext();
  return {
    selectedModel: state.aiInterface.selectedModel,
    isProcessing: state.aiInterface.isProcessing,
    connectionStatus: state.aiInterface.connectionStatus,
    conversations: state.aiInterface.conversations,
    setModel: setAIModel,
    addMessage: addAIMessage,
    updateConnectionStatus,
  };
}

// Widget Hooks
export function useWidgets() {
  const { state, activateWidget, deactivateWidget, updateWidgetData } = useGlobalContext();
  return {
    activeWidgets: state.widgets.activeWidgets,
    refreshIntervals: state.widgets.refreshIntervals,
    widgetData: state.widgets.widgetData,
    activateWidget,
    deactivateWidget,
    updateWidgetData,
  };
}