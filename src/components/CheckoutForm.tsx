
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Tag } from 'lucide-react';
import { PaymentFormData, CartItem } from '../types';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  cartItems: CartItem[];
  onCheckout: (formData: PaymentFormData) => void;
  isProcessing: boolean;
}

export const CheckoutForm = ({ cartItems, onCheckout, isProcessing }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    email: '',
    fullName: '',
    phone: '',
    promoCode: ''
  });
  const [promoApplied, setPromoApplied] = useState(false);
  const { toast } = useToast();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const total = subtotal - discount;

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyPromoCode = () => {
    if (formData.promoCode?.toLowerCase() === 'fest2024') {
      setPromoApplied(true);
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    onCheckout(formData);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card className="lg:order-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{item.eventTitle}</h4>
                <p className="text-sm text-muted-foreground">{item.ticketTypeName}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-festival-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="lg:order-1">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Promo Code */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Promo Code
              </h3>
              
              <div className="flex gap-2">
                <Input
                  value={formData.promoCode}
                  onChange={(e) => handleInputChange('promoCode', e.target.value)}
                  placeholder="Enter promo code"
                  disabled={promoApplied}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={applyPromoCode}
                  disabled={promoApplied || !formData.promoCode}
                >
                  Apply
                </Button>
              </div>
              
              {promoApplied && (
                <Badge className="bg-green-100 text-green-800">
                  Promo code applied: FEST2024
                </Badge>
              )}
              
              <p className="text-xs text-muted-foreground">
                Try: <code className="bg-gray-100 px-1 rounded">FEST2024</code> for 10% off
              </p>
            </div>

            <Separator />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-festival-500 to-festival-600 hover:from-festival-600 hover:to-festival-700 text-white font-semibold py-3 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
