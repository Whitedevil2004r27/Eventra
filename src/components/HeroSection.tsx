
import { Card } from '@/components/ui/card';

export const HeroSection = () => {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-bold gradient-text animate-fade-in">
          Discover Amazing Events
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Book tickets for concerts, conferences, festivals, and more. Secure payments, instant confirmations.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
        <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">1000+</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">25+</div>
            <div className="text-sm text-muted-foreground">Cities</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur border-festival-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-festival-600 dark:text-festival-400">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
