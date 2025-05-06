import AsyncStorage from "@react-native-async-storage/async-storage";

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  adoptions: number;
  favorites: string[];
}

// Simple auth response
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Keys for AsyncStorage
const USER_STORAGE_KEY = "@MiAUDote:user";
const USERS_STORAGE_KEY = "@MiAUDote:users";

// Default user for demo
const DEFAULT_USER: User = {
  id: "1",
  name: "Usuário MiAUDote",
  email: "usuario@email.com",
  cpf: "123.456.789-00",
  phone: "(11) 98765-4321",
  address: "Av. Paulista, 1000, São Paulo - SP",
  bio: "Amante de animais e adepto da adoção responsável.",
  createdAt: new Date().toISOString(),
  adoptions: 0,
  favorites: [],
};

/**
 * User Service for managing authentication and user data
 */
export class UserService {
  /**
   * Register a new user
   */
  static async register(
    name: string,
    email: string,
    cpf: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      // Check if email already exists
      const users = await this.getUsers();
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        return {
          success: false,
          message:
            "Este e-mail já está em uso. Por favor, utilize outro e-mail.",
        };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        cpf,
        createdAt: new Date().toISOString(),
        adoptions: 0,
        favorites: [],
      };

      // Add to users list
      users.push(newUser);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Set as current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

      return {
        success: true,
        message: "Usuário registrado com sucesso!",
        user: newUser,
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: "Erro ao registrar usuário. Por favor, tente novamente.",
      };
    }
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // In a real app, we would verify credentials against a backend
      // For this demo, we're simplifying and just checking if the email exists

      const users = await this.getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        return {
          success: false,
          message: "E-mail ou senha incorretos.",
        };
      }

      // Set as current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      return {
        success: true,
        message: "Login realizado com sucesso!",
        user,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Erro ao fazer login. Por favor, tente novamente.",
      };
    }
  }

  /**
   * Logout the current user
   */
  static async logout(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }

  /**
   * Get current logged in user
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (userData) {
        return JSON.parse(userData);
      }

      return null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    updatedUser: Partial<User>
  ): Promise<AuthResponse> {
    try {
      const currentUser = await this.getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          message: "Usuário não encontrado. Por favor, faça login novamente.",
        };
      }

      // Update user data
      const updatedUserData: User = {
        ...currentUser,
        ...updatedUser,
      };

      // Update in users list
      const users = await this.getUsers();
      const updatedUsers = users.map((u) =>
        u.id === currentUser.id ? updatedUserData : u
      );

      await AsyncStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(updatedUsers)
      );

      // Update current user
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(updatedUserData)
      );

      return {
        success: true,
        message: "Perfil atualizado com sucesso!",
        user: updatedUserData,
      };
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "Erro ao atualizar perfil. Por favor, tente novamente.",
      };
    }
  }

  /**
   * Reset password (simplified for demo)
   */
  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      const userExists = users.some((u) => u.email === email);

      if (!userExists) {
        return {
          success: false,
          message: "E-mail não encontrado.",
        };
      }

      // In a real app, we would send an email with a reset link
      // For this demo, we'll just return success

      return {
        success: true,
        message: "Instruções de recuperação de senha enviadas para seu e-mail.",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: "Erro ao recuperar senha. Por favor, tente novamente.",
      };
    }
  }

  /**
   * Toggle favorite animal
   */
  static async toggleFavorite(animalId: string): Promise<boolean> {
    try {
      const currentUser = await this.getCurrentUser();

      if (!currentUser) {
        return false;
      }

      // Check if already in favorites
      const isFavorite = currentUser.favorites.includes(animalId);

      let updatedFavorites: string[];
      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = currentUser.favorites.filter(
          (id) => id !== animalId
        );
      } else {
        // Add to favorites
        updatedFavorites = [...currentUser.favorites, animalId];
      }

      // Update user
      await this.updateProfile({ favorites: updatedFavorites });

      return true;
    } catch (error) {
      console.error("Toggle favorite error:", error);
      return false;
    }
  }

  /**
   * Initialize the app with a default user if none exists
   */
  static async initializeStorage(): Promise<void> {
    try {
      const users = await this.getUsers();

      if (users.length === 0) {
        // Add default user
        await AsyncStorage.setItem(
          USERS_STORAGE_KEY,
          JSON.stringify([DEFAULT_USER])
        );
      }
    } catch (error) {
      console.error("Initialize storage error:", error);
    }
  }

  /**
   * Get all users (for demo purposes)
   */
  private static async getUsers(): Promise<User[]> {
    try {
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);

      if (usersData) {
        return JSON.parse(usersData);
      }

      return [];
    } catch (error) {
      console.error("Get users error:", error);
      return [];
    }
  }
}
