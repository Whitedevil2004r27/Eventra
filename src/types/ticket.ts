
export interface Ticket {
  id: string;
  type: string;
  price: number;
  quantity: number;
  benefits: string[];
}

export interface TicketSelection {
  [ticketId: string]: number;
}
