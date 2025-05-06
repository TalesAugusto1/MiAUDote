import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Erro", "Por favor, digite um e-mail válido");
      return false;
    }
    return true;
  };

  const handleSendEmail = () => {
    if (validateEmail()) {
      setEmailSent(true);

      Alert.alert(
        "E-mail enviado",
        "Enviamos instruções para redefinir sua senha para " + email,
        [{ text: "OK" }]
      );
    }
  };

  const goToLogin = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Esqueceu a senha?</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail aqui"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.infoText}>
            *Você receberá uma mensagem para acessar sua senha.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
            <Text style={styles.sendButtonText}>Enviar</Text>
            <Ionicons
              name="paw"
              size={20}
              color="white"
              style={styles.pawIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginLink} onPress={goToLogin}>
          <Text style={styles.loginLinkText}>Voltar para login</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 80,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
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
  infoText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
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
  pawIcon: {
    marginLeft: 8,
  },
  loginLink: {
    alignItems: "center",
    marginTop: 15,
  },
  loginLinkText: {
    color: "#4CC9F0",
    fontSize: 14,
  },
});
