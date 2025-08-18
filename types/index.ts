export interface TherapyService {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  duration: string;
  price: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface Dependent {
  id: string;
  name: string;
  relationship: string;
  age: string;
  notes?: string;
}

export interface BookingDetails {
  serviceId: string;
  serviceName: string;
  clientType: 'self' | 'dependent';
  dependent?: Dependent;
  preferredTime: 'now' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    additionalInfo?: string;
  };
  specialRequests?: string;
  paymentMethod?: string;
  transactionId?: string;
  paymentAmount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dependents: Dependent[];
}