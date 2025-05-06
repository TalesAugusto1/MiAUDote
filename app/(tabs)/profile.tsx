import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const handleLogout = () => {
    router.replace("/login");
  };

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
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={100} color="#4CC9F0" />
          </View>
          <Text style={styles.userName}>Usuário MiAUDote</Text>
          <Text style={styles.userEmail}>usuario@email.com</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Adoções</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Configurações</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="heart-outline" size={24} color="#555" />
              <Text style={styles.menuItemText}>Favoritos</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
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
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
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
});
