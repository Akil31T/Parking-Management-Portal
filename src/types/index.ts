export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ParkingArea {
  features: any[];
  vehicle_types_allowed: string | number | readonly string[];
  photos: any;
  address: any;
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

export interface UserData {
  statusCode: number;
    name: string;
    email: string;
    phone: {
      code: number;
      number: number;
    };
    gender: string;
    addresses: any[];
  
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: {
    number: number;
    code: number;
  };
  password?: string;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  about?: string;
  user_type: 'admin' | 'super_admin';
  addresses: Array<{
    type: 'primary' | 'secondary';
    city: string;
    country: string;
    pinCode: string;
    location: [number, number];
  }>;
  status: 'active' | 'inactive';
}

export const countryCodes = [
  { code: 1, name: 'USA' },
  { code: 44, name: 'UK' },
  { code: 91, name: 'India' },
  { code: 86, name: 'China' },
  { code: 81, name: 'Japan' },
  // Add more as needed
];

export interface User {
  _id:string;
  name: string;
  email: string;
  phone: {
    number: number;
    code: number;
  };
  password: string;
  gender: "male" | "female" | "other";
  photo: string;
  about: string;
  user_type: "admin" | "user" | "moderator"; // Adjust as needed
  addresses: Address[];
  status: "active" | "inactive";
}

interface Address {
  type: "primary" | "secondary";
  city: string;
  country: string;
  pinCode: string;
  location: [number, number]; // Latitude and Longitude
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone: {
    number: number;
    code: number;
  };
  photo: string;
  status: 'active' | 'inactive'; // if only these two are valid
  createdAt: string; // or `Date` if you convert it
  updatedAt: string;
}

export interface ApiCallOptions {
  method: string;
  endpoint: string;
  body?: any;
  headers?: Record<string, string>;
  // 👇 Add this line
  params?: Record<string, any>;
}