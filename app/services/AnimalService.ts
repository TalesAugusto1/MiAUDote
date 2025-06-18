import { api } from '../config/api';

export interface AnimalFromAPI {
  id: number;
  nome: string;
  tipo: string;
  sexo: string;
  idade: number;
  porte: string;
  raca: string;
  idOng: number;
}

export interface Animal {
  id: number;
  name: string;
  type: string;
  age: string;
  gender: string;
  ongId: number;
  size: string;
  breed: string;
  image: { uri: string };
}

export const animalService = {
  async getAllAnimals(): Promise<Animal[]> {
    try {
      console.log('🐾 Buscando animais da API...');
      const response = await api.get<AnimalFromAPI[]>('/animal');
      
      // Converter os dados da API para o formato esperado pelo frontend
      const animals: Animal[] = response.data.map((animal) => ({
        id: animal.id,
        name: animal.nome,
        type: animal.tipo === 'cachorro' ? 'Cachorro' : animal.tipo === 'gato' ? 'Gato' : animal.tipo,
        age: `${animal.idade} ${animal.idade === 1 ? 'ano' : 'anos'}`,
        gender: animal.sexo === 'macho' ? 'Macho' : animal.sexo === 'fêmea' ? 'Fêmea' : animal.sexo,
        ongId: animal.idOng,
        size: animal.porte,
        breed: animal.raca,
        // Usar imagens placeholder baseadas no tipo
        image: { 
          uri: animal.tipo.toLowerCase() === 'cachorro' 
            ? `https://placedog.net/500/500?random=${animal.id}` 
            : `https://placekitten.com/500/500?random=${animal.id}` 
        }
      }));
      
      console.log('✅ Animais carregados:', animals.length);
      return animals;
    } catch (error) {
      console.error('❌ Erro ao buscar animais:', error);
      throw error;
    }
  },

  async getAnimalById(id: number): Promise<Animal | null> {
    try {
      console.log(`🐾 Buscando animal ${id} da lista de animais...`);
      
      // Buscar diretamente da lista de todos os animais
      const allAnimals = await this.getAllAnimals();
      const animal = allAnimals.find(a => a.id === id);
      
      if (animal) {
        console.log('✅ Animal encontrado:', animal);
        return animal;
      } else {
        console.log('❌ Animal não encontrado na lista');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar animal:', error);
      return null;
    }
  }
}; 