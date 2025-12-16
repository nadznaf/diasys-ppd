import { api } from "./api";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_DATA_KEY = "user_data";

export interface StoredUserData {
  user_id: number;
  name: string;
  email: string;
}

// Token Management
export const tokenManager = {
  // Save tokens
  saveTokens(accessToken: string, refreshToken: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  // Get access token
  getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },

  // Get refresh token
  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  },

  // Remove tokens
  removeTokens() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
    }
  },

  // Save user data
  saveUserData(userData: StoredUserData) {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", userData.name);
    }
  },

  // Get user data
  getUserData(): StoredUserData | null {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  },

  // Refresh access token
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await api.refreshToken(refreshToken);
      const newAccessToken = response.data.access_token;

      if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      }

      return newAccessToken;
    } catch (error) {
      // If refresh fails, clear all tokens
      this.removeTokens();
      return null;
    }
  },
};
