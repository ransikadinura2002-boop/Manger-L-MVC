import { create } from 'zustand';

export interface Property {
  id: number;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  rent: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  tenant?: string;
  description?: string;
  photos?: string[];
  powerOfAttorney?: string;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: number;
  property: string;
  issue: string;
  description: string;
  status: 'pending' | 'quotation_pending' | 'quotation_submitted' | 'paid' | 'completed' | 'processing';
  date: string;
  cost?: number;
  documents?: string[];
}

export interface Inquiry {
  id: number;
  propertyId: number;
  property: string;
  tenant: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'pending' | 'active' | 'rejected';
}

export interface Payment {
  id: string;
  date: string;
  type: 'rent_received' | 'maintenance_paid';
  amount: number;
  property: string;
  status: 'paid' | 'processing' | 'failed';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'inquiry' | 'maintenance' | 'payment' | 'admin';
  date: string;
  read: boolean;
}

interface AppState {
  properties: Property[];
  maintenanceRequests: MaintenanceRequest[];
  inquiries: Inquiry[];
  payments: Payment[];
  notifications: Notification[];
  
  // Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: number, updates: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
  addMaintenanceRequest: (request: Omit<MaintenanceRequest, 'id'>) => void;
  updateMaintenanceRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id'>) => void;
  updateInquiry: (id: number, updates: Partial<Inquiry>) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  properties: [
    {
      id: 1,
      address: "123 Sunset Boulevard, Beverly Hills",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      size: "1,200 sq ft",
      rent: 2500,
      status: "occupied",
      tenant: "Sarah Johnson",
      description: "Beautiful apartment with stunning city views",
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      address: "456 Downtown Street, City Center",
      type: "Loft",
      bedrooms: 1,
      bathrooms: 1,
      size: "800 sq ft",
      rent: 1800,
      status: "vacant",
      description: "Modern loft in the heart of downtown",
      createdAt: "2024-01-02"
    },
    {
      id: 3,
      address: "789 Garden View Lane, Suburban",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      size: "2,500 sq ft",
      rent: 3200,
      status: "maintenance",
      tenant: "Mike Chen",
      description: "Spacious family home with garden",
      createdAt: "2024-01-03"
    },
    {
      id: 4,
      address: "321 Park Avenue, Uptown",
      type: "Condo",
      bedrooms: 3,
      bathrooms: 2,
      size: "1,800 sq ft",
      rent: 2800,
      status: "occupied",
      tenant: "Emily Davis",
      description: "Luxury condo with park views",
      createdAt: "2024-01-04"
    }
  ],
  
  maintenanceRequests: [
    {
      id: "MR-001",
      propertyId: 1,
      property: "Sunset Apartment",
      issue: "Plumbing Leak",
      description: "Kitchen sink is leaking",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "MR-002",
      propertyId: 2,
      property: "Downtown Loft",
      issue: "AC Repair",
      description: "Air conditioning not working",
      status: "completed",
      date: "2024-01-12",
      cost: 250
    },
    {
      id: "MR-003",
      propertyId: 3,
      property: "Garden View House",
      issue: "Electrical",
      description: "Power outlet not working in bedroom",
      status: "processing",
      date: "2024-01-10",
      cost: 150
    }
  ],
  
  inquiries: [
    {
      id: 1,
      propertyId: 1,
      property: "Sunset Apartment",
      tenant: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "555-0101",
      message: "Interested in viewing the apartment",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      propertyId: 2,
      property: "Downtown Loft",
      tenant: "Mike Chen",
      email: "mike@email.com",
      phone: "555-0102",
      message: "Looking for a downtown location",
      date: "2024-01-14",
      status: "active"
    }
  ],
  
  payments: [
    {
      id: "PAY-001",
      date: "2024-01-15",
      type: "rent_received",
      amount: 2500,
      property: "Sunset Apartment",
      status: "paid",
      description: "Monthly rent payment"
    },
    {
      id: "PAY-002",
      date: "2024-01-12",
      type: "maintenance_paid",
      amount: 250,
      property: "Downtown Loft",
      status: "paid",
      description: "AC repair service"
    }
  ],
  
  notifications: [
    {
      id: "NOT-001",
      title: "New Inquiry",
      message: "Sarah Johnson inquired about Sunset Apartment",
      type: "inquiry",
      date: "2024-01-15",
      read: false
    },
    {
      id: "NOT-002",
      title: "Maintenance Completed",
      message: "AC repair at Downtown Loft completed",
      type: "maintenance",
      date: "2024-01-12",
      read: true
    }
  ],
  
  addProperty: (property) =>
    set((state) => ({
      properties: [
        ...state.properties,
        { ...property, id: Date.now(), createdAt: new Date().toISOString() }
      ]
    })),
    
  updateProperty: (id, updates) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      )
    })),
    
  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id)
    })),
    
  addMaintenanceRequest: (request) =>
    set((state) => ({
      maintenanceRequests: [
        ...state.maintenanceRequests,
        { ...request, id: `MR-${Date.now()}` }
      ]
    })),
    
  updateMaintenanceRequest: (id, updates) =>
    set((state) => ({
      maintenanceRequests: state.maintenanceRequests.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      )
    })),
    
  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [...state.inquiries, { ...inquiry, id: Date.now() }]
    })),
    
  updateInquiry: (id, updates) =>
    set((state) => ({
      inquiries: state.inquiries.map((i) =>
        i.id === id ? { ...i, ...updates } : i
      )
    })),
    
  addPayment: (payment) =>
    set((state) => ({
      payments: [...state.payments, { ...payment, id: `PAY-${Date.now()}` }]
    })),
    
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { ...notification, id: `NOT-${Date.now()}` },
        ...state.notifications
      ]
    })),
    
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    }))
}));