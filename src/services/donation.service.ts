import { apiRequest } from "./api";

export interface DonationItem {
  id: number;
  title: string;
  description: string;
  condition: "NEUF" | "COMME_NEUF" | "TRES_BON" | "BON" | "POUR_PIECES";
  status: "AVAILABLE" | "RESERVED" | "GIVEN" | "SUSPENDED";
  city: string;
  neighborhood: string;
  quantity: number;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  donor: {
    id: number;
    username: string;
    firstName: string;
    city: string;
    neighborhood: string;
    bio?: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  imageUrls: string[];
  waitingRequestsCount: number;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 🛠️ Fonction utilitaire pour corriger l'URL des images
const formatImageUrl = (url: string) => {
  if (!url) return "/images/default_objet.png";
  if (url.startsWith("http")) return url;
  // Si l'image est sur le serveur Spring Boot (ex: /uploads/donations/xxx.jpg)
  return `${API_BASE_URL.replace('/api/v1', '')}${url}`;
};

export const donationService = {
  async getDonations(params?: {
    categoryId?: number;
    neighborhood?: string;
    q?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<DonationItem>> {
    const response = await apiRequest<PageResponse<DonationItem>>("/donations", {
      params: params as Record<string, string | number>,
    });

    // On corrige les URLs des images avant de renvoyer au composant
    if (response && response.content) {
      response.content = response.content.map(d => ({
        ...d,
        imageUrls: d.imageUrls && d.imageUrls.length > 0 
          ? d.imageUrls.map(formatImageUrl) 
          : ["/images/default_objet.png"]
      }));
    }
    return response;
  },

  async getDonationById(id: number | string): Promise<DonationItem> {
    const donation = await apiRequest<DonationItem>(`/donations/${id}`);
    if (donation && donation.imageUrls) {
      donation.imageUrls = donation.imageUrls.map(formatImageUrl);
    }
    return donation;
  },

  async createDonation(data: {
    title: string;
    description: string;
    condition: string;
    categoryId: number;
    neighborhood: string;
    quantity?: number;
  }): Promise<DonationItem> {
    return apiRequest<DonationItem>("/donations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async uploadImages(donationId: number | string, files: File[]): Promise<DonationItem> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return apiRequest<DonationItem>(`/donations/${donationId}/images`, {
      method: "POST",
      body: formData,
    });
  },
};