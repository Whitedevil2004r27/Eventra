
import { Event, TicketType } from '../types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'The biggest summer music festival featuring top artists from around the world. Experience three days of non-stop music across multiple stages.',
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
    description: 'Leading tech conference with industry experts and innovative startups. Discover the future of technology and network with professionals.',
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
    description: 'Culinary experience featuring renowned chefs and premium wines. Taste exceptional dishes and discover new flavors.',
    date: '2024-09-10',
    time: '12:00',
    venue: 'Grand Hotel Ballroom',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    categories: ['Food', 'Wine', 'Culinary'],
    organizer: 'Gourmet Events',
    featured: false
  },
  {
    id: '4',
    title: 'Digital Art Exhibition',
    description: 'Immersive digital art showcase featuring contemporary artists and interactive installations. Experience art in a new dimension.',
    date: '2024-08-05',
    time: '14:00',
    venue: 'Modern Art Gallery',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
    categories: ['Art', 'Digital', 'Exhibition'],
    organizer: 'Digital Arts Collective',
    featured: true
  },
  {
    id: '5',
    title: 'Business Leadership Summit',
    description: 'Connect with industry leaders and learn cutting-edge business strategies. Perfect for entrepreneurs and executives.',
    date: '2024-09-18',
    time: '08:30',
    venue: 'Business Center Auditorium',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
    categories: ['Business', 'Leadership', 'Summit'],
    organizer: 'Business Leaders Network',
    featured: false
  },
  {
    id: '6',
    title: 'Outdoor Adventure Festival',
    description: 'Celebrate the great outdoors with hiking, climbing, and adventure sports demonstrations. Fun for the whole family.',
    date: '2024-07-28',
    time: '10:00',
    venue: 'Riverside Park',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    categories: ['Outdoor', 'Adventure', 'Sports'],
    organizer: 'Adventure Sports Co.',
    featured: false
  },
  {
    id: '7',
    title: 'Jazz Night Under Stars',
    description: 'Intimate jazz performance under the open sky featuring local and international jazz artists.',
    date: '2024-08-12',
    time: '20:00',
    venue: 'Rooftop Terrace Lounge',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    categories: ['Music', 'Jazz', 'Evening'],
    organizer: 'Jazz Society',
    featured: true
  },
  {
    id: '8',
    title: 'Startup Pitch Competition',
    description: 'Watch emerging startups pitch their innovative ideas to top investors and industry experts.',
    date: '2024-09-25',
    time: '13:00',
    venue: 'Innovation Hub',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    categories: ['Business', 'Startup', 'Competition'],
    organizer: 'Startup Accelerator',
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
  ],
  '4': [
    {
      id: 'standard-4',
      name: 'Exhibition Access',
      price: 45,
      description: 'Full access to digital art installations',
      features: ['All exhibitions', 'Audio guide', 'Digital catalog'],
      available: 150
    },
    {
      id: 'premium-4',
      name: 'Artist Meet & Greet',
      price: 95,
      description: 'Exclusive access with artist interactions',
      features: ['All exhibitions', 'Artist meet & greet', 'Limited edition print'],
      available: 30,
      isVip: true
    }
  ],
  '5': [
    {
      id: 'regular-5',
      name: 'Regular Admission',
      price: 180,
      description: 'Access to all summit sessions',
      features: ['All sessions', 'Networking breaks', 'Summit materials'],
      available: 250
    },
    {
      id: 'executive-5',
      name: 'Executive Package',
      price: 350,
      description: 'Premium experience for senior executives',
      features: ['All sessions', 'Executive lounge', 'Private networking', 'One-on-one meetings'],
      available: 50,
      isVip: true
    }
  ],
  '6': [
    {
      id: 'family-6',
      name: 'Family Pass',
      price: 120,
      description: 'Perfect for families with children',
      features: ['All activities', 'Kids zone access', 'Family photo session'],
      available: 100
    },
    {
      id: 'adventure-6',
      name: 'Adventure Package',
      price: 200,
      description: 'Includes guided adventure activities',
      features: ['All activities', 'Guided tours', 'Equipment rental', 'Professional photos'],
      available: 60,
      isVip: true
    }
  ],
  '7': [
    {
      id: 'standard-7',
      name: 'General Seating',
      price: 65,
      description: 'Standard seating with great acoustics',
      features: ['Concert access', 'Complimentary drink', 'Program'],
      available: 80
    },
    {
      id: 'premium-7',
      name: 'Premium Table',
      price: 120,
      description: 'Reserved table with premium service',
      features: ['Reserved table', 'Premium service', 'Appetizer plate', 'Meet the artists'],
      available: 20,
      isVip: true
    }
  ],
  '8': [
    {
      id: 'general-8',
      name: 'General Admission',
      price: 35,
      description: 'Access to all pitch presentations',
      features: ['All pitches', 'Networking session', 'Startup directory'],
      available: 200
    },
    {
      id: 'investor-8',
      name: 'Investor Access',
      price: 150,
      description: 'Special access for potential investors',
      features: ['All pitches', 'Private investor lounge', 'Direct startup contact', 'Investment materials'],
      available: 25,
      isVip: true
    }
  ]
};
