// Client API centralisé pour Yow Gifter Frontend <-> Backend Spring Boot 3

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined | null>;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const CREDENTIALS_MESSAGE = "Email ou mot de passe incorrect.";

function isAuthEndpoint(endpoint: string): boolean {
  return endpoint.includes("/auth/login") || endpoint.includes("/auth/register");
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let url = `${API_BASE_URL}${endpoint}`;

  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = new Headers(options.headers || {});

  // Ne pas forcer Content-Type JSON si c'est du FormData (ex: upload multipart)
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Injection automatique du token JWT stocké après login
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("yg_jwt");
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Erreur HTTP ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch {
      // Pas de JSON d'erreur
    }
    if (
      isAuthEndpoint(endpoint) &&
      (response.status === 401 || response.status === 403) &&
      errorMessage.startsWith("Erreur HTTP")
    ) {
      errorMessage = CREDENTIALS_MESSAGE;
    }
    throw new ApiError(response.status, errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
