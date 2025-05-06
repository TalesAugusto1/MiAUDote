export interface Animal {
  id: number;
  name: string;
  type: string;
  image: { uri: string } | any;
  age?: string;
  gender?: string;
  description?: string;
  location?: string;
  ownerInfo?: OwnerInfo;
}

export interface OwnerInfo {
  id: number;
  name: string;
  contact: string;
  location?: string;
}

export type AnimalFilter = "Todos" | "Cachorro" | "Gato" | string;
