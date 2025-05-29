
import { XCircle, RotateCcw, Home, AlertTriangle, Phone, Mail, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentFailureProps {
  error: string;
  onRetry: () => void;
  onBackToEvents: () => void;
}

export const PaymentFailure = ({ error, onRetry, onBackToEvents }: PaymentFailureProps) => {
  return (
    <div className="max-w-md mx-auto p-6 animate-fade-in">
      <Card className="text-center border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 shadow-xl">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-3xl text-red-800 dark:text-red-300 mb-2">Payment Failed</CardTitle>
          <p className="text-red-600 dark:text-red-400 text-lg">We couldn't process your payment</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-300 text-left">
              {error || "Your payment could not be processed. Please check your payment details and try again."}
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-left">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">Common reasons for payment failure:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Incorrect card details or expired card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Card blocked by bank security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Network connectivity issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Transaction limits exceeded</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <Button 
              onClick={onRetry}
              className="bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700 text-white font-semibold py-3 hover:scale-105 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={onBackToEvents}
              className="border-festival-200 dark:border-festival-700 hover:bg-festival-50 dark:hover:bg-festival-950 hover:scale-105 transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Events
            </Button>
          </div>

          {/* Enhanced Support Section */}
          <div className="pt-6 border-t border-red-200 dark:border-red-800 space-y-4">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200">Need help? We're here for you!</h5>
            
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" size="sm" className="justify-start hover:scale-105 transition-transform duration-200">
                <Mail className="w-4 h-4 mr-2 text-festival-500" />
                support@festbook.com
              </Button>
              <Button variant="outline" size="sm" className="justify-start hover:scale-105 transition-transform duration-200">
                <Phone className="w-4 h-4 mr-2 text-festival-500" />
                1-800-FESTBOOK
              </Button>
              <Button variant="outline" size="sm" className="justify-start hover:scale-105 transition-transform duration-200">
                <MessageCircle className="w-4 h-4 mr-2 text-festival-500" />
                Live Chat Support
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Our support team is available 24/7 to help you with any payment issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
