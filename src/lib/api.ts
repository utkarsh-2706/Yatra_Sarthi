import axios from 'axios';

// Mock data for development since we can't access the real APIs directly from the browser
const mockHotels = [
  {
    id: 'h1',
    name: 'Grand Resort & Spa',
    location: 'Maldives',
    price: 450,
    rating: 4.8
  },
  {
    id: 'h2',
    name: 'Luxury Palace Hotel',
    location: 'Dubai',
    price: 380,
    rating: 4.6
  },
  {
    id: 'h3',
    name: 'Marina Bay Hotel',
    location: 'Singapore',
    price: 320,
    rating: 4.5
  }
];

const mockDestinations = [
  "1. Bali, Indonesia - Perfect blend of beaches, culture, and relaxation. Known for its pristine beaches, ancient temples, and vibrant arts scene.",
  "2. Swiss Alps - Ideal for nature lovers and adventure seekers. Offering breathtaking mountain views, hiking trails, and luxury resorts.",
  "3. Kyoto, Japan - Rich in cultural heritage with beautiful temples, traditional gardens, and authentic Japanese experiences.",
  "4. Santorini, Greece - Stunning island views, white-washed buildings, and romantic sunsets. Perfect for couples and photography enthusiasts."
].join('\n\n');

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface GptMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Safe error logging helper
const logError = (message: string, error: unknown) => {
  if (error instanceof Error) {
    console.error(message, {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  } else {
    console.error(message, String(error));
  }
};

export const api = {
  hotels: {
    search: async (params: HotelSearchParams) => {
      try {
        // Filter mock hotels based on location
        const filteredHotels = mockHotels.filter(hotel => 
          hotel.location.toLowerCase().includes(params.location.toLowerCase())
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return filteredHotels;
      } catch (error) {
        logError('Error searching hotels:', error);
        throw new Error('Failed to search hotels. Please try again.');
      }
    },
    
    getDetails: async (hotelId: string) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const hotel = mockHotels.find(h => h.id === hotelId);
        if (!hotel) {
          throw new Error('Hotel not found');
        }
        
        return hotel;
      } catch (error) {
        logError('Error getting hotel details:', error);
        throw new Error('Failed to get hotel details. Please try again.');
      }
    }
  },

  gpt: {
    chat: async (messages: GptMessage[]) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return a mock response based on the last user message
        const userMessage = messages.findLast(m => m.role === 'user')?.content.toLowerCase() || '';
        
        if (userMessage.includes('hotel')) {
          return "I can help you find the perfect hotel! Please let me know your destination and dates.";
        } else if (userMessage.includes('flight')) {
          return "I'd be happy to help you find flights. Where would you like to travel to?";
        } else {
          return "I'm here to help plan your perfect trip. Would you like to search for hotels or get destination recommendations?";
        }
      } catch (error) {
        logError('Error getting GPT response:', error);
        throw new Error('Failed to process your request. Please try again.');
      }
    },

    getDestinationSuggestions: async (preferences: string) => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return mock destination suggestions
        return mockDestinations;
      } catch (error) {
        logError('Error getting destination suggestions:', error);
        throw new Error('Failed to get destination suggestions. Please try again.');
      }
    }
  }
};