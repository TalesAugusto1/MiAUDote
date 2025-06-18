import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animal, animalService } from "../services/AnimalService";

export default function AnimalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadAnimal(Number(id));
    }
  }, [id]);

  const loadAnimal = async (animalId: number) => {
    try {
      setLoading(true);
      console.log('🐾 Carregando animal ID:', animalId);
      const animalData = await animalService.getAnimalById(animalId);
      
      if (!animalData) {
        console.log('❌ Animal não encontrado');
        Alert.alert(
          'Animal não encontrado',
          'O animal que você está procurando não foi encontrado ou não existe mais.',
          [
            {
              text: 'Voltar',
              onPress: () => router.back()
            }
          ]
        );
        return;
      }
      
      setAnimal(animalData);
    } catch (error) {
      console.error('❌ Erro ao carregar animal:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados do animal. Verifique sua conexão e tente novamente.',
        [
          {
            text: 'Tentar novamente',
            onPress: () => loadAnimal(animalId)
          },
          {
            text: 'Voltar',
            onPress: () => router.back()
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{animal?.name || "Carregando..."}</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CC9F0" />
          <Text style={styles.loadingText}>Carregando animal...</Text>
        </View>
      ) : animal ? (
        <ScrollView style={styles.content}>
          <Image source={animal.image} style={styles.image} />
          
          <View style={styles.infoContainer}>
            <View style={styles.basicInfo}>
              <Text style={styles.name}>{animal.name}</Text>
              <View style={styles.tags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{animal.type}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{animal.gender}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{animal.age}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre</Text>
              <Text style={styles.description}>
                {animal.name} é um {animal.type.toLowerCase()} de {animal.age}, da raça {animal.breed}. 
                É um animal de porte {animal.size?.toLowerCase()} que está procurando um lar cheio de amor e carinho.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características</Text>
              <View style={styles.characteristics}>
                <View style={styles.characteristic}>
                  <Ionicons name="resize" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Porte: {animal.size}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="paw" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Raça: {animal.breed}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="calendar" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Idade: {animal.age}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="male-female" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Sexo: {animal.gender}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.adoptButton}>
              <Text style={styles.adoptButtonText}>Quero Adotar</Text>
              <Ionicons name="heart" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.notFoundContainer}>
          <Ionicons name="sad-outline" size={50} color="#CCC" />
          <Text style={styles.notFoundText}>Animal não encontrado</Text>
          <TouchableOpacity 
            style={styles.backToHomeButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.backToHomeText}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4CC9F0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
  },
  basicInfo: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    backgroundColor: "#E6F7FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: "#4CC9F0",
    fontWeight: "500",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  characteristics: {
    gap: 15,
  },
  characteristic: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  characteristicText: {
    fontSize: 16,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backToHomeButton: {
    backgroundColor: "#4CC9F0",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  backToHomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  adoptButton: {
    backgroundColor: "#4CC9F0",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  adoptButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
}); 