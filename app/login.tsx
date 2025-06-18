import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { userService } from "./services/UserService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Verificação mockada com as credenciais específicas
    const MOCK_CREDENTIALS = [
      { email: "protecaoanimal@email.com", password: "senha456" },
      { email: "joao.adotante@gmail.com", password: "123456" }
    ];
    
    const validCredential = MOCK_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (validCredential) {
      setIsLoading(true);
      console.log("[LOGIN] Login mockado realizado com sucesso");
      
      try {
        // Buscar dados reais do usuário no banco
        console.log("[LOGIN] Buscando dados do usuário no banco...");
        const userData = await userService.getUserByEmail(email);
        
        if (userData) {
          // Salvar dados do usuário no AsyncStorage
          await AsyncStorage.setItem('@MiAuDote:user', JSON.stringify(userData));
          console.log("[LOGIN] Dados do usuário salvos:", userData);
          
          // Redirecionar diretamente sem popup
          router.replace("/(tabs)");
        } else {
          // Se não encontrar o usuário no banco, ainda permite o login mas sem dados
          console.log("[LOGIN] Usuário não encontrado no banco, continuando sem dados");
          
          // Redirecionar diretamente sem popup
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("[LOGIN] Erro ao buscar dados do usuário:", error);
        
        // Em caso de erro, ainda permite o login e redireciona diretamente
        router.replace("/(tabs)");
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Erro", "Email ou senha inválidos");
    }
  };

  const handleRegister = () => {
    router.push("/cadastro");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <SafeAreaViewContext style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
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
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
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
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Login</Text>
                <Ionicons
                  name="paw-outline"
                  size={20}
                  color="white"
                  style={styles.pawIcon}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>Cadastre-se</Text>
            <Ionicons
              name="paw-outline"
              size={20}
              color="#4CC9F0"
              style={styles.pawIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaViewContext>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 180,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4CC9F0",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  loginButton: {
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
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CC9F0",
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  registerButtonText: {
    color: "#4CC9F0",
    fontSize: 16,
    fontWeight: "bold",
  },
  pawIcon: {
    marginLeft: 8,
  },
});
