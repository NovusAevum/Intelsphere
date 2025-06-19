import { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdaptiveLayoutProps {
  children: ReactNode;
  className?: string;
}

interface ScreenInfo {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  aspectRatio: number;
}

export function useScreenInfo(): ScreenInfo {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        orientation: 'landscape',
        breakpoint: 'lg',
        deviceType: 'desktop',
        aspectRatio: 1.33
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      orientation: width > height ? 'landscape' : 'portrait',
      breakpoint: getBreakpoint(width),
      deviceType: getDeviceType(width),
      aspectRatio: width / height
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenInfo({
        width,
        height,
        orientation: width > height ? 'landscape' : 'portrait',
        breakpoint: getBreakpoint(width),
        deviceType: getDeviceType(width),
        aspectRatio: width / height
      });
    };

    const handleOrientationChange = () => {
      // Delay to get accurate dimensions after orientation change
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return screenInfo;
}

function getBreakpoint(width: number): ScreenInfo['breakpoint'] {
  if (width < 480) return 'xs';
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  return '2xl';
}

function getDeviceType(width: number): ScreenInfo['deviceType'] {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function AdaptiveLayout({ children, className }: AdaptiveLayoutProps) {
  const screenInfo = useScreenInfo();

  return (
    <div 
      className={cn(
        'min-h-screen transition-all duration-300',
        {
          // Mobile-first adaptive padding
          'px-2 py-2': screenInfo.breakpoint === 'xs',
          'px-3 py-3': screenInfo.breakpoint === 'sm',
          'px-4 py-4': screenInfo.breakpoint === 'md',
          'px-6 py-6': screenInfo.breakpoint === 'lg',
          'px-8 py-8': screenInfo.breakpoint === 'xl' || screenInfo.breakpoint === '2xl',
          
          // Orientation-specific adjustments
          'landscape:px-6 landscape:py-4': screenInfo.deviceType === 'mobile',
          'portrait:px-4 portrait:py-6': screenInfo.deviceType === 'mobile',
          
          // Device-specific optimizations
          'touch-manipulation': screenInfo.deviceType === 'mobile',
          'select-none': screenInfo.deviceType === 'mobile',
        },
        className
      )}
      data-screen-breakpoint={screenInfo.breakpoint}
      data-device-type={screenInfo.deviceType}
      data-orientation={screenInfo.orientation}
    >
      {children}
    </div>
  );
}

interface AdaptiveGridProps {
  children: ReactNode;
  className?: string;
  minItemWidth?: number;
  maxColumns?: number;
}

export function AdaptiveGrid({ 
  children, 
  className, 
  minItemWidth = 280,
  maxColumns = 4 
}: AdaptiveGridProps) {
  const screenInfo = useScreenInfo();
  
  const getGridColumns = () => {
    const availableWidth = screenInfo.width - (screenInfo.deviceType === 'mobile' ? 32 : 64);
    const possibleColumns = Math.floor(availableWidth / minItemWidth);
    
    // Orientation-based adjustments
    if (screenInfo.deviceType === 'mobile') {
      if (screenInfo.orientation === 'portrait') {
        return Math.min(possibleColumns, 1);
      } else {
        return Math.min(possibleColumns, 2);
      }
    }
    
    if (screenInfo.deviceType === 'tablet') {
      if (screenInfo.orientation === 'portrait') {
        return Math.min(possibleColumns, 2);
      } else {
        return Math.min(possibleColumns, 3);
      }
    }
    
    return Math.min(possibleColumns, maxColumns);
  };

  const columns = getGridColumns();

  return (
    <div 
      className={cn(
        'grid gap-4 auto-rows-fr',
        {
          'gap-2': screenInfo.deviceType === 'mobile',
          'gap-3': screenInfo.deviceType === 'tablet',
          'gap-4': screenInfo.deviceType === 'desktop',
        },
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  );
}

interface AdaptiveCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export function AdaptiveCard({ children, className, variant = 'default' }: AdaptiveCardProps) {
  const screenInfo = useScreenInfo();
  
  return (
    <div 
      className={cn(
        'bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg transition-all duration-300',
        {
          // Mobile optimizations
          'p-3 text-sm': screenInfo.deviceType === 'mobile' && variant === 'compact',
          'p-4': (screenInfo.deviceType === 'mobile' && variant === 'default') || (screenInfo.deviceType === 'tablet' && variant === 'compact'),
          'p-5': (screenInfo.deviceType === 'mobile' && variant === 'detailed') || (screenInfo.deviceType === 'tablet' && variant === 'default') || (screenInfo.deviceType === 'desktop' && variant === 'compact'),
          
          // Tablet and Desktop optimizations
          'p-6': (screenInfo.deviceType === 'tablet' && variant === 'detailed') || (screenInfo.deviceType === 'desktop' && variant === 'default'),
          'p-8': screenInfo.deviceType === 'desktop' && variant === 'detailed',
          
          // Touch optimizations
          'hover:shadow-lg hover:border-slate-600/50': screenInfo.deviceType !== 'mobile',
          'active:scale-[0.98]': screenInfo.deviceType === 'mobile',
          'transform-gpu': true,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

interface AdaptiveNavigationProps {
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
}

export function AdaptiveNavigation({ 
  children, 
  className, 
  collapsible = true 
}: AdaptiveNavigationProps) {
  const screenInfo = useScreenInfo();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Auto-collapse on mobile portrait mode
    if (screenInfo.deviceType === 'mobile' && screenInfo.orientation === 'portrait') {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [screenInfo.deviceType, screenInfo.orientation]);

  return (
    <nav 
      className={cn(
        'transition-all duration-300',
        {
          // Mobile navigation styles
          'flex flex-col space-y-2': screenInfo.deviceType === 'mobile',
          'flex flex-row flex-wrap gap-2': screenInfo.deviceType === 'tablet' || screenInfo.deviceType === 'desktop',
          
          // Orientation-specific adjustments
          'landscape:flex-row landscape:space-y-0 landscape:space-x-2': 
            screenInfo.deviceType === 'mobile' && screenInfo.orientation === 'landscape',
          
          // Collapsed state
          'hidden': isCollapsed && collapsible && screenInfo.deviceType === 'mobile',
        },
        className
      )}
    >
      {children}
    </nav>
  );
}

interface AdaptiveTypographyProps {
  children: ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  className?: string;
}

export function AdaptiveTypography({ 
  children, 
  variant, 
  className 
}: AdaptiveTypographyProps) {
  const screenInfo = useScreenInfo();
  
  const getTypographyClasses = () => {
    const baseClasses = {
      h1: {
        xs: 'text-2xl font-bold',
        sm: 'text-3xl font-bold',
        md: 'text-4xl font-bold',
        lg: 'text-5xl font-bold',
        xl: 'text-6xl font-bold'
      },
      h2: {
        xs: 'text-xl font-semibold',
        sm: 'text-2xl font-semibold',
        md: 'text-3xl font-semibold',
        lg: 'text-4xl font-semibold',
        xl: 'text-5xl font-semibold'
      },
      h3: {
        xs: 'text-lg font-semibold',
        sm: 'text-xl font-semibold',
        md: 'text-2xl font-semibold',
        lg: 'text-3xl font-semibold',
        xl: 'text-4xl font-semibold'
      },
      h4: {
        xs: 'text-base font-medium',
        sm: 'text-lg font-medium',
        md: 'text-xl font-medium',
        lg: 'text-2xl font-medium',
        xl: 'text-3xl font-medium'
      },
      body: {
        xs: 'text-sm',
        sm: 'text-base',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-lg'
      },
      caption: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base'
      }
    };

    const breakpointKey = screenInfo?.breakpoint === '2xl' ? 'xl' : (screenInfo?.breakpoint || 'md');
    return baseClasses[variant]?.[breakpointKey] || baseClasses[variant]?.md || 'text-base';
  };

  const Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';

  return (
    <Component 
      className={cn(
        getTypographyClasses(),
        {
          'leading-tight': variant.startsWith('h'),
          'leading-relaxed': variant === 'body',
          'leading-normal': variant === 'caption',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}

// Hook for detecting safe areas (iOS notch, Android navigation, etc.)
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      
      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
        right: parseInt(computedStyle.getPropertyValue('--sar') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
        left: parseInt(computedStyle.getPropertyValue('--sal') || '0')
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    window.addEventListener('orientationchange', updateSafeArea);

    return () => {
      window.removeEventListener('resize', updateSafeArea);
      window.removeEventListener('orientationchange', updateSafeArea);
    };
  }, []);

  return safeArea;
}