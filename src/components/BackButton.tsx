
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

export const BackButton = ({ fallbackPath = '/', className = '' }: BackButtonProps) => {
  // Back button is completely disabled - returning null to remove it entirely
  return null;
};
