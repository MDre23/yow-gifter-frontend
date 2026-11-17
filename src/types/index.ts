export type CategoryType =
  | 'Livres & Manuels'
  | 'Vêtements & Textiles'
  | 'Mobilier & Logement'
  | 'Informatique & Tech'
  | 'Équipements domestiques'
  | 'Autres';

export type ConditionType =
  | 'NEUF'
  | 'COMME_NEUF'
  | 'TRES_BON'
  | 'BON'
  | 'POUR_PIECES';

export type DonationStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'GIVEN'
  | 'SUSPENDED';

export type RequestStatus =
  | 'WAITING'
  | 'PRIORITY'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'COMPLETED';

export interface Donation {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  condition: ConditionType;
  status: DonationStatus;
  city: string;
  neighborhood: string;
  quantity: number;
  images: string[]; // Strict Max 2 (REQ-F04)
  createdAt: string;
  donor: {
    id: string;
    username: string;
    city: string;
    neighborhood: string;
    campusBadge?: string;
  };
  queueCount?: number;
  currentPriorityExpiresAt?: string;
}

// Compatibilité avec Product existant
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  imageAlt?: string;
  condition?: string;
  status?: DonationStatus;
  createdAt?: string;
  quantity?: number;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  count: string;
  icon: string;
  href: string;
}

export interface DonationRequest {
  id: string;
  donationId: string;
  donationTitle: string;
  donationImage: string;
  userId: string;
  status: RequestStatus;
  position: number;
  requestedAt: string;
  expiresAt?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Conversation {
  id: string;
  donationId: string;
  donationTitle: string;
  donationImage: string;
  donorId: string;
  donorName: string;
  beneficiaryId: string;
  beneficiaryName: string;
  status: 'ACTIVE' | 'CONCLUDED';
  messages: ChatMessage[];
  appointment?: {
    date: string;
    time: string;
    location: string;
    confirmed: boolean;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  fullName?: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  age?: number;
  gender?: string;
  campusBadge?: string;
  bio?: string;
  donationsCount: number;
  receivedCount: number;
}
