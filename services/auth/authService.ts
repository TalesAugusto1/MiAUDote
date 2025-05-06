import { AuthState, User } from "../../types/User";
import apiClient from "../api/apiClient";

// Interface for the Auth Service (Interface Segregation Principle)
export interface IAuthService {
  login(email: string, password: string): Promise<AuthState>;
  register(name: string, email: string, password: string): Promise<AuthState>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  getToken(): string | null;
  refreshToken(): Promise<string | null>;
}

// Storage service for auth data (Single Responsibility Principle)
class AuthStorage {
  private readonly TOKEN_KEY = "@MiauDote:auth_token";
  private readonly USER_KEY = "@MiauDote:user";

  async saveToken(token: string): Promise<void> {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving auth token:", error);
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error("Error removing auth token:", error);
    }
  }

  async saveUser(user: User): Promise<void> {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }

  async getUser(): Promise<User | null> {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  async removeUser(): Promise<void> {
    try {
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  }

  async clearAll(): Promise<void> {
    await Promise.all([this.removeToken(), this.removeUser()]);
  }
}

class AuthService implements IAuthService {
  private storage: AuthStorage;
  private currentUser: User | null = null;
  private authToken: string | null = null;

  constructor() {
    this.storage = new AuthStorage();
    this.loadFromStorage();
  }

  private async loadFromStorage(): Promise<void> {
    this.authToken = await this.storage.getToken();
    this.currentUser = await this.storage.getUser();

    if (this.authToken) {
      apiClient.setAuthToken(this.authToken);
    }
  }

  async login(email: string, password: string): Promise<AuthState> {
    try {
      const mockResponse = {
        user: {
          id: 1,
          name: "User Test",
          email: email,
          profilePicture: "https://i.pravatar.cc/300",
          preferences: {
            favoriteAnimalTypes: ["Cachorro", "Gato"],
            notifications: true,
            locationSharing: false,
          },
        },
        token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
      };

      await this.storage.saveToken(mockResponse.token);
      await this.storage.saveUser(mockResponse.user);

      this.authToken = mockResponse.token;
      this.currentUser = mockResponse.user;

      apiClient.setAuthToken(this.authToken);

      return {
        user: this.currentUser,
        isAuthenticated: true,
        token: this.authToken,
        loading: false,
        error: null,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      console.error("Login error:", error);

      return {
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: errorMessage,
      };
    }
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthState> {
    try {
      const mockResponse = {
        user: {
          id: Math.floor(Math.random() * 1000),
          name,
          email,
          profilePicture: "https://i.pravatar.cc/300",
          preferences: {
            favoriteAnimalTypes: [],
            notifications: true,
            locationSharing: false,
          },
        },
        token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
      };

      await this.storage.saveToken(mockResponse.token);
      await this.storage.saveUser(mockResponse.user);

      this.authToken = mockResponse.token;
      this.currentUser = mockResponse.user;

      apiClient.setAuthToken(this.authToken);

      return {
        user: this.currentUser,
        isAuthenticated: true,
        token: this.authToken,
        loading: false,
        error: null,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      console.error("Registration error:", error);

      return {
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: errorMessage,
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.storage.clearAll();

      this.authToken = null;
      this.currentUser = null;

      apiClient.setAuthToken(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.authToken && !!this.currentUser;
  }

  getToken(): string | null {
    return this.authToken;
  }

  async refreshToken(): Promise<string | null> {
    try {
      const mockToken =
        "mock_refreshed_jwt_token_" + Math.random().toString(36).substring(2);

      await this.storage.saveToken(mockToken);
      this.authToken = mockToken;

      apiClient.setAuthToken(this.authToken);

      return this.authToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      return null;
    }
  }
}

export const authService = new AuthService();

export default authService;
