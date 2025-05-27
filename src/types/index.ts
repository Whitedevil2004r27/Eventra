
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  categories: string[];
  organizer: string;
  featured: boolean;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  available: number;
  isVip?: boolean;
  isEarlyAccess?: boolean;
}

export interface CartItem {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  price: number;
  eventTitle: string;
  ticketTypeName: string;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  qrCode?: string;
  ticketNumber: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  usageLimit: number;
  usedCount: number;
}

export interface PaymentFormData {
  email: string;
  fullName: string;
  phone: string;
  promoCode?: string;
}
