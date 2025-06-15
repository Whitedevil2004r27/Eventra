
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

export const BackButton = ({ fallbackPath = '/', className = '' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to a specific path if no history
      navigate(fallbackPath);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleBack}
      className={`hover:scale-105 transition-transform duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
};
