import { apiRequest } from "./api";

export interface RequestItem {
  id: number;
  donationId: number;
  donationTitle: string;
  beneficiaryId: number;
  beneficiary: {
    id: number;
    username: string;
    firstName: string;
    city: string;
    neighborhood: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  status: "WAITING" | "PRIORITY" | "CANCELLED" | "EXPIRED" | "COMPLETED";
  positionInQueue: number;
  requestedAt: string;
  expiresAt?: string;
  createdAt: string;
}

export const requestService = {
  async joinQueue(donationId: number | string): Promise<RequestItem> {
    return apiRequest<RequestItem>(`/donations/${donationId}/requests`, {
      method: "POST",
    });
  },

  async getQueueForDonation(donationId: number | string): Promise<RequestItem[]> {
    return apiRequest<RequestItem[]>(`/donations/${donationId}/requests`);
  },

  async cancelRequest(requestId: number | string): Promise<void> {
    return apiRequest<void>(`/requests/${requestId}`, {
      method: "DELETE",
    });
  },

  async getMyRequests(): Promise<RequestItem[]> {
    return apiRequest<RequestItem[]>("/users/me/requests");
  },
};
