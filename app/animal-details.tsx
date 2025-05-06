import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function AnimalDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, type, age, gender, image } = params;

  // These would come from backend in a real app, using hardcoded for demo
  const description =
    "Precioso e energético. Gosta de brincar ao ar livre e seu local favorito é o jardim. " +
    `${name} foi resgatado das ruas, mas nunca perdeu seu espírito alegre. Ele adora correr pelo quintal, brincar de buscar bolinhas e receber carinho na barriga. Seu olhar doce e sua energia contagiante fazem qualquer um se apaixonar!`;

  const additionalInfo = `Convive bem com: Crianças, outros cães e até gatos!
Saúde: Vacinado, castrado e vermifugado.
O que ele mais ama? Passeios ao ar livre e cochilar no sofá depois de uma tarde cheia de aventuras.
${name} está pronto para encontrar um lar cheio de amor!
Será que é o seu? ❤️`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image as string }}
            style={styles.animalImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.animalName}>{name}</Text>

          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{type}</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>{gender}</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>SRD</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>Filhote</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Sobre o pet</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <Text style={styles.descriptionText}>{additionalInfo}</Text>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#777" />
              <Text style={styles.actionButtonText}>Mensagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#777" />
              <Text style={styles.actionButtonText}>Curtidas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={20} color="#777" />
              <Text style={styles.actionButtonText}>Compartilhar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.adoptButton}>
            <Text style={styles.adoptButtonText}>Adotar</Text>
            <Ionicons
              name="paw"
              size={20}
              color="white"
              style={styles.adoptButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEED9",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#4CC9F0",
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 40,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
  },
  animalImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFEED9",
    marginTop: -20,
  },
  animalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
  },
  tagText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingVertical: 15,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  actionButtonText: {
    color: "#777",
    fontSize: 12,
    marginTop: 5,
  },
  adoptButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  adoptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  adoptButtonIcon: {
    marginLeft: 10,
  },
});
