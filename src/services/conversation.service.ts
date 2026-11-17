import { apiRequest } from "./api";

export interface ConversationItem {
  id: number;
  donationId: number;
  donationTitle: string;
  donationStatus: string;
  contact: {
    id: number;
    username: string;
    firstName: string;
    city: string;
    neighborhood: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface MessageItem {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  content: string;
  sentAt: string;
  isMine: boolean;
}

export const conversationService = {
  async getMyConversations(): Promise<ConversationItem[]> {
    return apiRequest<ConversationItem[]>("/conversations");
  },

  async getMessages(conversationId: number | string): Promise<MessageItem[]> {
    return apiRequest<MessageItem[]>(`/conversations/${conversationId}/messages`);
  },

  async sendMessage(conversationId: number | string, content: string): Promise<MessageItem> {
    return apiRequest<MessageItem>(`/conversations/${conversationId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
};
