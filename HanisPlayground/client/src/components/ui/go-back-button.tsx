import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';

interface GoBackButtonProps {
  className?: string;
  showHomeButton?: boolean;
}

export function GoBackButton({ className = "", showHomeButton = true }: GoBackButtonProps) {
  const [location, setLocation] = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if we can actually go back
    setCanGoBack(window.history.length > 1);
  }, [location]);

  const handleGoBack = () => {
    try {
      if (canGoBack && window.history.length > 1) {
        window.history.back();
      } else {
        // Fallback to dashboard if can't go back
        setLocation('/clean-premium-dashboard');
      }
    } catch (error) {
      // Error handling - go to dashboard
      setLocation('/clean-premium-dashboard');
    }
  };

  const handleGoHome = () => {
    setLocation('/clean-premium-dashboard');
  };

  return (
    <div className={`flex flex-wrap items-center gap-1 sm:gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleGoBack}
        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 
                   hover:bg-blue-50 dark:hover:bg-blue-950 
                   border-blue-200 dark:border-blue-800 
                   text-blue-700 dark:text-blue-300
                   transition-all duration-200 hover:scale-105"
      >
        <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden xs:inline">Go Back</span>
        <span className="xs:hidden">Back</span>
      </Button>
      
      {showHomeButton && location !== '/' && location !== '/clean-premium-dashboard' && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoHome}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                     hover:bg-green-50 dark:hover:bg-green-950 
                     border-green-200 dark:border-green-800 
                     text-green-700 dark:text-green-300
                     transition-all duration-200 hover:scale-105"
        >
          <Home className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Dashboard</span>
          <span className="xs:hidden">Home</span>
        </Button>
      )}
    </div>
  );
}

export default GoBackButton;