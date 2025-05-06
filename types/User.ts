export interface User {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteAnimalTypes?: string[];
  notifications: boolean;
  locationSharing: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}
