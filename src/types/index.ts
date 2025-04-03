export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ParkingArea {
  id: string;
  name: string;
  location: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
}

export interface Booking {
  id: string;
  parkingAreaId: string;
  driverId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}