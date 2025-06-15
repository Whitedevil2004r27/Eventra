
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`animate-spin rounded-full border-b-2 border-purple-500 ${sizeClasses[size]}`}
      />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );
};
