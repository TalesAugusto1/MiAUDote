import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const handleLogout = () => {
    console.log("[PROFILE] Fazendo logout...");
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

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Ionicons name="person-circle" size={100} color="#4CC9F0" />
              <TouchableOpacity style={styles.editImageButton}>
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>Nome do Usuário</Text>
            <Text style={styles.userEmail}>email@exemplo.com</Text>
            <Text style={styles.userType}>Tipo: Usuário</Text>

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
                <Ionicons name="person-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Editar Perfil</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="heart-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Favoritos</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="paw-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Meus Animais</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="settings-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Configurações</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="help-circle-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Ajuda e Suporte</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="document-text-outline" size={24} color="#555" />
                <Text style={styles.menuItemText}>Termos de Uso</Text>
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
        </ScrollView>
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
  content: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CC9F0",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  userType: {
    fontSize: 16,
    color: "#4CC9F0",
    marginBottom: 30,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    marginBottom: 40,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CC9F0",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  menuContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
