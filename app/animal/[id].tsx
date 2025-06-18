import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data - em produção isso viria de uma API
const animals = [
  {
    id: 1,
    name: "Fred",
    type: "Cachorro",
    image: { uri: "https://placedog.net/500/500" },
    age: "2 anos",
    gender: "Macho",
    ongId: 1,
    description: "Fred é um cachorro muito brincalhão e carinhoso. Adora passear e brincar com bolinhas. Está castrado e com todas as vacinas em dia.",
    size: "Médio",
    temperament: "Brincalhão",
    health: "Vacinado e castrado",
    location: "São Paulo, SP"
  },
  {
    id: 2,
    name: "Amora",
    type: "Gato",
    image: { uri: "https://placekitten.com/500/500" },
    age: "1 ano",
    gender: "Fêmea",
    ongId: 1,
    description: "Amora é uma gata muito tranquila e carinhosa. Se dá bem com outros animais e crianças. Está castrada e com todas as vacinas em dia.",
    size: "Pequeno",
    temperament: "Tranquilo",
    health: "Vacinada e castrada",
    location: "São Paulo, SP"
  },
  // ... outros animais
];

export default function AnimalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const animal = animals.find(a => a.id === Number(id));

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
        <Text style={styles.headerTitle}>{animal?.name || "Animal não encontrado"}</Text>
        <View style={styles.placeholder} />
      </View>

      {animal ? (
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
              <Text style={styles.description}>{animal.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características</Text>
              <View style={styles.characteristics}>
                <View style={styles.characteristic}>
                  <Ionicons name="resize" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Porte: {animal.size}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="heart" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Temperamento: {animal.temperament}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="medkit" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Saúde: {animal.health}</Text>
                </View>
                <View style={styles.characteristic}>
                  <Ionicons name="location" size={20} color="#4CC9F0" />
                  <Text style={styles.characteristicText}>Localização: {animal.location}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Animal não encontrado</Text>
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
}); 