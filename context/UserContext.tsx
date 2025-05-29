import { router } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { AuthResponse, User, UserService } from "../services/userService";

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    cpf: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (updatedData: Partial<User>) => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  toggleFavorite: (animalId: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize user data on app start
    const initializeUser = async () => {
      try {
        await UserService.initializeStorage();
        const currentUser = await UserService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Add a function to handle navigation with a delay to allow state to update
  const navigateWithDelay = useCallback((route: any) => {
    // Short delay to let the UI update before navigation, preventing flicker
    setTimeout(() => {
      router.replace(route);
    }, 50);
  }, []);

  /**
   * Log in user
   */
  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await UserService.login(email, password);
      if (response.success && response.user) {
        setUser(response.user);
        // Use delayed navigation to prevent UI glitching
        navigateWithDelay("/(tabs)");
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Erro ao fazer login. Por favor, tente novamente.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (
    name: string,
    email: string,
    cpf: string,
    password: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await UserService.register(name, email, cpf, password);
      if (response.success && response.user) {
        setUser(response.user);

        Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
          {
            text: "OK",
            // Use delayed navigation to prevent UI glitching
            onPress: () => navigateWithDelay("/(tabs)"),
          },
        ]);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Erro ao registrar usuário. Por favor, tente novamente.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out user
   */
  const logout = async (): Promise<void> => {
    try {
      await UserService.logout();
      setUser(null);
      // Use delayed navigation for logout as well
      navigateWithDelay("/login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (
    updatedData: Partial<User>
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await UserService.updateProfile(updatedData);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "Erro ao atualizar perfil. Por favor, tente novamente.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await UserService.resetPassword(email);
      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: "Erro ao recuperar senha. Por favor, tente novamente.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle favorite animal
   */
  const toggleFavorite = async (animalId: string): Promise<boolean> => {
    try {
      const success = await UserService.toggleFavorite(animalId);

      if (success) {
        // Refresh user data
        const currentUser = await UserService.getCurrentUser();
        setUser(currentUser);
      }

      return success;
    } catch (error) {
      console.error("Toggle favorite error:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
        toggleFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
