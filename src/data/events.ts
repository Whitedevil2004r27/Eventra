
import { Event, TicketType } from '../types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'The biggest summer music festival featuring top artists from around the world.',
    date: '2024-07-15',
    time: '18:00',
    venue: 'Central Park Amphitheater',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    categories: ['Music', 'Outdoor', 'Festival'],
    organizer: 'FestEvents Co.',
    featured: true
  },
  {
    id: '2',
    title: 'Tech Innovation Conference',
    description: 'Leading tech conference with industry experts and innovative startups.',
    date: '2024-08-22',
    time: '09:00',
    venue: 'Convention Center',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    categories: ['Technology', 'Conference', 'Innovation'],
    organizer: 'TechEvents Ltd.',
    featured: true
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    description: 'Culinary experience featuring renowned chefs and premium wines.',
    date: '2024-09-10',
    time: '12:00',
    venue: 'Grand Hotel Ballroom',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    categories: ['Food', 'Wine', 'Culinary'],
    organizer: 'Gourmet Events',
    featured: false
  }
];

export const ticketTypes: Record<string, TicketType[]> = {
  '1': [
    {
      id: 'general-1',
      name: 'General Admission',
      price: 75,
      description: 'Standard access to all festival areas',
      features: ['Festival access', 'Food court access', 'Merchandise discounts'],
      available: 500
    },
    {
      id: 'vip-1',
      name: 'VIP Pass',
      price: 150,
      description: 'Premium experience with exclusive access',
      features: ['VIP lounge access', 'Premium restrooms', 'Fast track entry', 'Complimentary drinks'],
      available: 100,
      isVip: true
    },
    {
      id: 'early-1',
      name: 'Early Bird',
      price: 60,
      description: 'Limited time offer for early supporters',
      features: ['Festival access', 'Early entry', 'Special early bird merchandise'],
      available: 50,
      isEarlyAccess: true
    }
  ],
  '2': [
    {
      id: 'standard-2',
      name: 'Standard Ticket',
      price: 125,
      description: 'Full conference access with networking',
      features: ['All sessions', 'Networking lunch', 'Digital resources'],
      available: 300
    },
    {
      id: 'premium-2',
      name: 'Premium Pass',
      price: 250,
      description: 'Enhanced experience with exclusive workshops',
      features: ['All sessions', 'Exclusive workshops', 'VIP networking', 'Swag bag'],
      available: 75,
      isVip: true
    }
  ],
  '3': [
    {
      id: 'tasting-3',
      name: 'Tasting Pass',
      price: 85,
      description: 'Access to food tastings and demonstrations',
      features: ['Food tastings', 'Cooking demos', 'Recipe book'],
      available: 200
    },
    {
      id: 'sommelier-3',
      name: 'Sommelier Experience',
      price: 165,
      description: 'Premium wine tasting with expert guidance',
      features: ['Premium wine tastings', 'Sommelier guidance', 'Wine pairing dinner'],
      available: 50,
      isVip: true
    }
  ]
};
