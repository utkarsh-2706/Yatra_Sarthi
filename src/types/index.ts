export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
}

export interface Booking {
  id: number;
  customerId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalAmount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  bookingHistory: Booking[];
}