export const MOCK_USERS = {
  adotante: {
    email: "adotante@gmail.com",
    password: "123456",
    type: "adotante",
    name: "João Silva",
    profilePicture: undefined,
    stats: {
      adoptions: 2,
      favorites: 5
    }
  },
  ong: {
    id: 1,
    email: "ong@gmail.com",
    password: "123456",
    type: "ong",
    name: "ONG Amigos dos Animais",
    profilePicture: undefined,
    stats: {
      adoptions: 15,
      favorites: 8
    }
  }
} as const;

export type UserType = keyof typeof MOCK_USERS;
export type User = typeof MOCK_USERS[UserType];

// Estado global para o usuário logado
let currentUser: User | null = null;

export const setCurrentUser = (user: User | null) => {
  console.log("[MOCK_DATA] Definindo usuário atual:", user);
  currentUser = user;
};

export const getCurrentUser = () => {
  console.log("[MOCK_DATA] Obtendo usuário atual:", currentUser);
  return currentUser;
}; 