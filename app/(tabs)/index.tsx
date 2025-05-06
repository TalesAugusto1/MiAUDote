import { Animal } from "@/components/AnimalCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const cardWidth = (width - 50) / 2;

const animals = [
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

interface EnhancedAnimalCardProps {
  animal: Animal;
}

const EnhancedAnimalCard: React.FC<EnhancedAnimalCardProps> = ({ animal }) => {
  const router = useRouter();

  const handlePress = () => {
    let imageUri = "";
    if (typeof animal.image === "object" && animal.image !== null) {
      if ("uri" in animal.image && typeof animal.image.uri === "string") {
        imageUri = animal.image.uri;
      }
    }

    router.push({
      pathname: "/animal-details",
      params: {
        id: animal.id,
        name: animal.name,
        type: animal.type,
        age: animal.age,
        gender: animal.gender,
        image: imageUri,
      },
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={handlePress}
    >
      <View style={styles.cardImageContainer}>
        <Image source={animal.image} style={styles.cardImage} />
        <View style={styles.cardTypeTag}>
          <Text style={styles.cardTypeText}>{animal.type}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{animal.name}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetail}>{animal.age}</Text>
          <Text style={styles.cardDetailDot}>•</Text>
          <Text style={styles.cardDetail}>{animal.gender}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FilterTab = ({
  filter,
  active,
  onPress,
}: {
  filter: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.filterButton, active && styles.activeFilterButton]}
    onPress={onPress}
  >
    {filter === "Cachorro" && (
      <Ionicons
        name="paw"
        size={16}
        color={active ? "#4CC9F0" : "#FFFFFF"}
        style={styles.filterIcon}
      />
    )}
    {filter === "Gato" && (
      <Ionicons
        name="fish"
        size={16}
        color={active ? "#4CC9F0" : "#FFFFFF"}
        style={styles.filterIcon}
      />
    )}
    {filter === "Todos" && (
      <Ionicons
        name="grid"
        size={16}
        color={active ? "#4CC9F0" : "#FFFFFF"}
        style={styles.filterIcon}
      />
    )}
    <Text style={[styles.filterText, active && styles.activeFilterText]}>
      {filter}
    </Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "Todos" || animal.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setLoading(true);

    setTimeout(() => setLoading(false), 300);
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.mainContainer}>
            <View style={styles.fixedTopSection}>
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#777"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar animais"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery("")}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close-circle" size={18} color="#999" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.filterContainerWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.filterContainer}
                  contentContainerStyle={styles.filterContent}
                >
                  {["Todos", "Cachorro", "Gato"].map((filter) => (
                    <FilterTab
                      key={filter}
                      filter={filter}
                      active={activeFilter === filter}
                      onPress={() => setActiveFilter(filter)}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.headerTitle}>Adoção de animais</Text>
                  <Text style={styles.headerSubtitle}>
                    Encontre seu novo amigo
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.resultsCountContainer}>
                <Text style={styles.resultsCount}>
                  {filteredAnimals.length}{" "}
                  {filteredAnimals.length === 1
                    ? "animal encontrado"
                    : "animais encontrados"}
                </Text>
              </View>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4CC9F0" />
                </View>
              ) : (
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.animalGrid}
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                >
                  {filteredAnimals.map((animal) => (
                    <EnhancedAnimalCard key={animal.id} animal={animal} />
                  ))}
                  {filteredAnimals.length === 0 && !loading && (
                    <View style={styles.noResultsContainer}>
                      <Ionicons name="search-outline" size={50} color="#CCC" />
                      <Text style={styles.noResultsText}>
                        Nenhum animal encontrado
                      </Text>
                      <Text style={styles.noResultsSubtext}>
                        Tente uma busca diferente
                      </Text>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  fixedTopSection: {
    paddingBottom: 35,
    paddingTop: 10,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  filterContainerWrapper: {
    marginTop: 12,
    marginBottom: 5,
  },
  filterContainer: {
    marginLeft: 0,
    paddingVertical: 3,
  },
  filterContent: {
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginHorizontal: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    height: 40,
    justifyContent: "center",
  },
  activeFilterButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
    transform: [{ translateY: -2 }],
    borderColor: "rgba(255,255,255,0.8)",
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontWeight: "600",
    color: "#FFFFFF",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#4CC9F0",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFF5EB",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 70,
    height: 45,
  },
  resultsCountContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  resultsCount: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  animalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTypeTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(76, 201, 240, 0.9)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  cardTypeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  cardDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDetail: {
    fontSize: 13,
    color: "#666",
  },
  cardDetailDot: {
    fontSize: 10,
    color: "#999",
    marginHorizontal: 4,
  },
  noResultsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
    marginTop: 10,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
});
