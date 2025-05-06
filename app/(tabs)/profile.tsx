import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/UserContext";

export default function ProfileScreen() {
  const { user, logout, isLoading } = useUser();

  const handleLogout = async () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    router.push("/(tabs)/edit-profile");
  };

  const handleSettings = () => {
    Alert.alert(
      "Configurações",
      "Esta funcionalidade será implementada em breve!"
    );
  };

  const handleFavorites = () => {
    Alert.alert("Favoritos", "Esta funcionalidade será implementada em breve!");
  };

  const handleHelp = () => {
    Alert.alert("Ajuda", "Esta funcionalidade será implementada em breve!");
  };

  if (isLoading || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CC9F0" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.profileImageContainer}
          >
            <Ionicons name="person-circle" size={100} color="#4CC9F0" />
            <View style={styles.editIconContainer}>
              <Ionicons name="pencil" size={14} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          {user.bio ? <Text style={styles.userBio}>{user.bio}</Text> : null}

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.adoptions}</Text>
              <Text style={styles.statLabel}>Adoções</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {user.favorites?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleEditProfile}
            >
              <Ionicons name="person-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Editar Perfil</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
              <Ionicons name="settings-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Configurações</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
              <Ionicons name="heart-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Favoritos</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
              <Ionicons name="help-circle-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Ajuda</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
            <Ionicons
              name="exit-outline"
              size={20}
              color="white"
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4CC9F0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 40,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
  },
  profileImageContainer: {
    marginBottom: 15,
    position: "relative",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#4CC9F0",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  userBio: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CC9F0",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  menuContainer: {
    width: "100%",
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutIcon: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
});
