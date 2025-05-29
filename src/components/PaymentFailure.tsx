
import { XCircle, RotateCcw, Home, AlertTriangle } from 'lucide-react';
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
    <div className="max-w-md mx-auto p-6">
      <Card className="text-center border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-800">Payment Failed</CardTitle>
          <p className="text-red-600">We couldn't process your payment</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {error || "Your payment could not be processed. Please check your payment details and try again."}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Common reasons for payment failure:</h4>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details</li>
              <li>• Card expired or blocked</li>
              <li>• Network connectivity issues</li>
              <li>• Bank security restrictions</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={onRetry}
              className="bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={onBackToEvents}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t">
            <p>Need help? Contact our support team:</p>
            <p className="font-medium">support@festbook.com | 1-800-FESTBOOK</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
