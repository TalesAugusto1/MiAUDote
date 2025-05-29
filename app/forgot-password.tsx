import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../context/UserContext";
import React from "react";

export default function ForgotPasswordScreen() {
  const { resetPassword, isLoading } = useUser();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Erro", "Por favor, digite um e-mail válido");
      return;
    }

    const response = await resetPassword(email);

    if (response.success) {
      Alert.alert(
        "E-mail enviado",
        "Enviamos instruções para recuperar sua senha para o e-mail informado.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } else {
      Alert.alert("Erro", response.message);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#4CC9F0" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>
          Digite seu e-mail e enviaremos instruções para recuperar sua senha.
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text style={styles.sendButtonText}>Enviar</Text>
                <Ionicons
                  name="send-outline"
                  size={20}
                  color="white"
                  style={styles.buttonIcon}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToLoginButton}
            onPress={handleGoBack}
          >
            <Text style={styles.backToLoginText}>Voltar para Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  formContainer: {
    width: "100%",
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "white",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginLeft: 8,
  },
  backToLoginButton: {
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 15,
    color: "#4CC9F0",
  },
});
