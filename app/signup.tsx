import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { useModal } from "../contexts/ModalContext";

export default function SignupScreen() {
  const { register, isLoading } = useUser();
  const { showError, showSuccess } = useModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      showError("Erro", "Por favor, digite seu nome completo");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      showError("Erro", "Por favor, digite um e-mail válido");
      return false;
    }

    // Check for CPF with formatting (should be XXX.XXX.XXX-XX)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.trim() || !cpfRegex.test(cpf)) {
      showError("Erro", "Por favor, digite um CPF válido");
      return false;
    }

    if (!password.trim() || password.length < 6) {
      showError("Erro", "A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await register(name, email, cpf, password);

        if (!response.success) {
          showError("Erro", response.message);
        } else {
          showSuccess("Sucesso", "Cadastro realizado com sucesso!", goToLogin);
        }
      } catch (error) {
        console.error("Signup error:", error);
        showError("Erro", "Ocorreu um erro ao registrar. Tente novamente.");
      }
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  // Format CPF as user types (XXX.XXX.XXX-XX)
  const formatCPF = (text: string): string => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");

    // Limit to 11 digits (CPF length)
    const maxCpf = cleaned.substring(0, 11);

    // Format with dots and dash
    let formatted = maxCpf;
    if (maxCpf.length > 3) {
      formatted = maxCpf.substring(0, 3) + "." + maxCpf.substring(3);
    }
    if (maxCpf.length > 6) {
      formatted = formatted.substring(0, 7) + "." + maxCpf.substring(6, 9);
    }
    if (maxCpf.length > 9) {
      formatted = formatted.substring(0, 11) + "-" + maxCpf.substring(9, 11);
    }

    return formatted;
  };

  const handleCPFChange = (text: string): void => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Realize seu cadastro</Text>
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
              name="person"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#777"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="card"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#777"
              value={cpf}
              onChangeText={handleCPFChange}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed"
              size={20}
              color="#777"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#777"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text style={styles.signupButtonText}>Finalizar cadastro</Text>
                <Ionicons
                  name="paw"
                  size={20}
                  color="white"
                  style={styles.pawIcon}
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginLink} onPress={goToLogin}>
          <Text style={styles.loginLinkText}>Já possui conta? Faça login</Text>
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
  passwordToggle: {
    padding: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  signupButton: {
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
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pawIcon: {
    marginLeft: 8,
  },
  loginLink: {
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 15,
    color: "#4CC9F0",
  },
});
