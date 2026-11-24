import { apiRequest } from "./api";

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city: string;
  neighborhood: string;
  age?: number;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: UserProfile;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("yg_jwt", data.token);
      localStorage.setItem("yg_authenticated", "true");
      localStorage.setItem("yg_username", data.user.firstName + " " + (data.user.lastName ? data.user.lastName[0] + "." : ""));
      localStorage.setItem("yg_user_email", data.user.email);
    }
    return data;
  },

  async register(formData: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    neighborhood: string;
    phone?: string;
    age?: number;
    bio?: string;
  }): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("yg_jwt", data.token);
      localStorage.setItem("yg_authenticated", "true");
      localStorage.setItem("yg_username", data.user.firstName);
      localStorage.setItem("yg_user_email", data.user.email);
    }
    return data;
  },

  async getMe(): Promise<UserProfile> {
    return apiRequest<UserProfile>("/auth/me");
  },

  //  NOUVELLE FONCTION ICI
  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiRequest<UserProfile>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("yg_jwt");
      localStorage.removeItem("yg_authenticated");
      localStorage.removeItem("yg_username");
      localStorage.removeItem("yg_user_email");
    }
  },
};
