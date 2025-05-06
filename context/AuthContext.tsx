import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authService, { IAuthService } from "../services/auth/authService";
import { AuthState, User } from "../types/User";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  resetPassword: async () => false,
  clearError: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  authService?: IAuthService;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authService: injectedAuthService = authService,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (injectedAuthService.isAuthenticated()) {
          const user = injectedAuthService.getCurrentUser();

          setState({
            user,
            isAuthenticated: true,
            token: injectedAuthService.getToken(),
            loading: false,
            error: null,
          });
        } else {
          setState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
          token: null,
          loading: false,
          error: "Failed to load auth state",
        });
      }
    };

    initializeAuth();
  }, [injectedAuthService]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const authState = await injectedAuthService.login(email, password);
      setState(authState);

      return authState.isAuthenticated;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      setState({
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const authState = await injectedAuthService.register(
        name,
        email,
        password
      );
      setState(authState);

      return authState.isAuthenticated;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";

      setState({
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: errorMessage,
      });

      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      await injectedAuthService.logout();

      setState({
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null,
      });

      router.replace("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await injectedAuthService.resetPassword(email);

      setState((prev) => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Password reset failed";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return false;
    }
  };

  const clearError = (): void => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
