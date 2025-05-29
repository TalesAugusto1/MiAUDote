import { Animal } from "@/components/AnimalCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { memo, useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
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

// Memoize the animal card component to prevent unnecessary re-renders
const EnhancedAnimalCard = memo(({ animal }: EnhancedAnimalCardProps) => {
  const router = useRouter();

  // Use useCallback to memoize the handler function
  const handlePress = useCallback(() => {
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
  }, [animal, router]);

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
});

// Memoize the filter tab component
const FilterTab = memo(
  ({
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
  )
);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Use useMemo to avoid recalculating filtered animals on every render
  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const matchesSearch =
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "Todos" || animal.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Optimize search handler with debounce effect
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  // Memoize the filter tab press handlers
  const handleFilterPress = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          {/* Header with curved bottom edge */}
          <View style={styles.headerSection}>
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
                    onPress={() => handleFilterPress(filter)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Curved connector - this element creates the curve without using complex shadows */}
          <View style={styles.curvedConnector}>
            <View style={styles.curveFiller} />
          </View>

          {/* Content section with curved top corners */}
          <View style={styles.contentSection}>
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

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.animalGrid}
              showsVerticalScrollIndicator={false}
              bounces={true}
              removeClippedSubviews={Platform.OS === "android"}
            >
              {filteredAnimals.map((animal) => (
                <EnhancedAnimalCard key={animal.id} animal={animal} />
              ))}
              {filteredAnimals.length === 0 && (
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
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  headerSection: {
    backgroundColor: "#4CC9F0",
    paddingBottom: 10,
    paddingTop: 10,
    zIndex: 5,
  },
  // New component to create curved effect safely
  curvedConnector: {
    height: 30,
    backgroundColor: "#4CC9F0",
    zIndex: 1,
    position: "relative",
    marginBottom: -30, // Overlap with content section
  },
  curveFiller: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "#FFF5EB",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentSection: {
    flex: 1,
    backgroundColor: "#FFF5EB",
    zIndex: 2,
    paddingTop: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    // Remove transform that was causing flickering
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
    // Adjust shadow to be less intensive on performance
    shadowColor: Platform.OS === "ios" ? "#000" : "transparent",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: Platform.OS === "android" ? 2 : 0,
    // Hardware acceleration for smoother rounded corners on Android
    ...Platform.select({
      android: {
        overflow: "hidden",
      },
    }),
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
