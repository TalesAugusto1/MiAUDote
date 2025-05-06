import { Animal, AnimalFilter } from "../../types/Animal";

export interface IAnimalService {
  getAnimals(): Promise<Animal[]>;
  getAnimalById(id: number): Promise<Animal>;
  searchAnimals(query: string, filter?: AnimalFilter): Promise<Animal[]>;
  addAnimal(animal: Omit<Animal, "id">): Promise<Animal>;
  updateAnimal(id: number, animal: Partial<Animal>): Promise<Animal>;
  deleteAnimal(id: number): Promise<boolean>;
}

class AnimalService implements IAnimalService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  private mockAnimals: Animal[] = [
    {
      id: 1,
      name: "Fred",
      type: "Cachorro",
      image: { uri: "https://placedog.net/500/500" },
      age: "2 anos",
      gender: "Macho",
    },
    {
      id: 2,
      name: "Amora",
      type: "Gato",
      image: { uri: "https://placekitten.com/500/500" },
      age: "1 ano",
      gender: "Fêmea",
    },
    {
      id: 3,
      name: "Max",
      type: "Cachorro",
      image: { uri: "https://placedog.net/501/501" },
      age: "3 anos",
      gender: "Macho",
    },
    {
      id: 4,
      name: "Luna",
      type: "Gato",
      image: { uri: "https://placekitten.com/501/501" },
      age: "7 meses",
      gender: "Fêmea",
    },
    {
      id: 5,
      name: "Rex",
      type: "Cachorro",
      image: { uri: "https://placedog.net/502/502" },
      age: "5 anos",
      gender: "Macho",
    },
    {
      id: 6,
      name: "Mia",
      type: "Gato",
      image: { uri: "https://placekitten.com/502/502" },
      age: "2 anos",
      gender: "Fêmea",
    },
  ];

  async getAnimals(): Promise<Animal[]> {
    try {
      const cacheKey = "all_animals";
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached as Animal[];

      const animals = this.mockAnimals;

      this.setInCache(cacheKey, animals);

      return animals;
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error;
    }
  }

  async getAnimalById(id: number): Promise<Animal> {
    try {
      const cacheKey = `animal_${id}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached as Animal;

      const animal = this.mockAnimals.find((a) => a.id === id);

      if (!animal) {
        throw new Error(`Animal with ID ${id} not found`);
      }

      this.setInCache(cacheKey, animal);

      return animal;
    } catch (error) {
      console.error(`Error fetching animal with ID ${id}:`, error);
      throw error;
    }
  }

  async searchAnimals(
    query: string,
    filter: AnimalFilter = "Todos"
  ): Promise<Animal[]> {
    try {
      const animals = this.mockAnimals.filter((animal) => {
        const matchesSearch =
          animal.name.toLowerCase().includes(query.toLowerCase()) ||
          animal.type.toLowerCase().includes(query.toLowerCase());

        const matchesFilter = filter === "Todos" || animal.type === filter;

        return matchesSearch && matchesFilter;
      });

      return animals;
    } catch (error) {
      console.error("Error searching animals:", error);
      throw error;
    }
  }

  async addAnimal(animal: Omit<Animal, "id">): Promise<Animal> {
    try {
      const newAnimal: Animal = {
        ...animal,
        id: this.mockAnimals.length + 1,
      };

      this.mockAnimals.push(newAnimal);

      this.clearCache();

      return newAnimal;
    } catch (error) {
      console.error("Error adding animal:", error);
      throw error;
    }
  }

  async updateAnimal(id: number, animal: Partial<Animal>): Promise<Animal> {
    try {
      const index = this.mockAnimals.findIndex((a) => a.id === id);
      if (index === -1) {
        throw new Error(`Animal with ID ${id} not found`);
      }

      const updatedAnimal = {
        ...this.mockAnimals[index],
        ...animal,
      };

      this.mockAnimals[index] = updatedAnimal;

      this.clearCache();

      return updatedAnimal;
    } catch (error) {
      console.error(`Error updating animal with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteAnimal(id: number): Promise<boolean> {
    try {
      const index = this.mockAnimals.findIndex((a) => a.id === id);
      if (index === -1) {
        throw new Error(`Animal with ID ${id} not found`);
      }

      this.mockAnimals = this.mockAnimals.filter((a) => a.id !== id);

      this.clearCache();

      return true;
    } catch (error) {
      console.error(`Error deleting animal with ID ${id}:`, error);
      throw error;
    }
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setInCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private clearCache(): void {
    this.cache.clear();
  }
}

export const animalService = new AnimalService();

export default animalService;
