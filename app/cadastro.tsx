import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

type UserType = "ADOTANTE" | "ONG";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("ADOTANTE");

  // Campos específicos para Adotante
  const [cpf, setCpf] = useState("");

  // Campos específicos para ONG
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, digite seu nome completo");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Erro", "Por favor, digite um e-mail válido");
      return false;
    }

    if (email !== confirmEmail) {
      Alert.alert("Erro", "Os e-mails não coincidem");
      return false;
    }

    if (!password.trim() || password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return false;
    }

    if (userType === "ADOTANTE") {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpf.trim() || !cpfRegex.test(cpf)) {
        Alert.alert("Erro", "Por favor, digite um CPF válido");
        return false;
      }
    } else {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      if (!cnpj.trim() || !cnpjRegex.test(cnpj)) {
        Alert.alert("Erro", "Por favor, digite um CNPJ válido");
        return false;
      }

      if (!phone.trim()) {
        Alert.alert("Erro", "Por favor, digite um número de telefone");
        return false;
      }

      if (!address.trim()) {
        Alert.alert("Erro", "Por favor, digite um endereço");
        return false;
      }
    }

    return true;
  };

  const handleSignup = () => {
    const userData = {
      name,
      email,
      password,
      userType,
      profilePicture: undefined,
    };

    router.push({
      pathname: "/chat-form",
      params: userData
    });

    // if (validateForm()) {
    //   setIsLoading(true);

    //   const userData = {
    //     name,
    //     email,
    //     password,
    //     userType,
    //     profilePicture: undefined,
    //   };

    //   // Redireciona para a tela de chat com os dados já preenchidos
    //   router.push({
    //     pathname: "/chat-form",
    //     params: userData
    //   });

    //   setIsLoading(false);
    // }
  };

  const goToLogin = () => {
    router.replace("/login");
  };

  // Format CPF as user types (XXX.XXX.XXX-XX)
  const formatCPF = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    const maxCpf = cleaned.substring(0, 11);
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

  // Format CNPJ as user types (XX.XXX.XXX/XXXX-XX)
  const formatCNPJ = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    const maxCnpj = cleaned.substring(0, 14);
    let formatted = maxCnpj;
    if (maxCnpj.length > 2) {
      formatted = maxCnpj.substring(0, 2) + "." + maxCnpj.substring(2);
    }
    if (maxCnpj.length > 6) {
      formatted = formatted.substring(0, 6) + "." + maxCnpj.substring(6, 9);
    }
    if (maxCnpj.length > 10) {
      formatted = formatted.substring(0, 10) + "/" + maxCnpj.substring(10, 14);
    }
    if (maxCnpj.length > 14) {
      formatted = formatted.substring(0, 15) + "-" + maxCnpj.substring(14, 16);
    }
    return formatted;
  };

  // Format phone number (XX) XXXXX-XXXX
  const formatPhone = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    const maxPhone = cleaned.substring(0, 11);
    let formatted = maxPhone;
    if (maxPhone.length > 2) {
      formatted = "(" + maxPhone.substring(0, 2) + ") " + maxPhone.substring(2);
    }
    if (maxPhone.length > 7) {
      formatted = formatted.substring(0, 10) + "-" + maxPhone.substring(7, 11);
    }
    return formatted;
  };

  const handleCPFChange = (text: string): void => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleCNPJChange = (text: string): void => {
    const formatted = formatCNPJ(text);
    setCnpj(formatted);
  };

  const handlePhoneChange = (text: string): void => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Cadastro",
          headerStyle: {
            backgroundColor: '#4CC9F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <SafeAreaViewRN style={styles.container} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
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
              {/* Campos comuns */}
              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={20} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome Completo"
                  placeholderTextColor="#777"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="#777" style={styles.inputIcon} />
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
                <Ionicons name="mail" size={20} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirme seu E-mail"
                  placeholderTextColor="#777"
                  value={confirmEmail}
                  onChangeText={setConfirmEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#777" style={styles.inputIcon} />
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

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirme sua Senha"
                  placeholderTextColor="#777"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#777"
                  />
                </TouchableOpacity>
              </View>

              {/* Seletor de tipo de usuário */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={userType}
                  onValueChange={(value: UserType) => setUserType(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Adotante" value="ADOTANTE" />
                  <Picker.Item label="ONG" value="ONG" />
                </Picker>
              </View>

              {/* Campos específicos para Adotante */}
              {userType === "ADOTANTE" && (
                <View style={styles.inputWrapper}>
                  <Ionicons name="card" size={20} color="#777" style={styles.inputIcon} />
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
              )}

              {/* Campos específicos para ONG */}
              {userType === "ONG" && (
                <>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="business" size={20} color="#777" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="CNPJ"
                      placeholderTextColor="#777"
                      value={cnpj}
                      onChangeText={handleCNPJChange}
                      keyboardType="numeric"
                      maxLength={18}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Ionicons name="call" size={20} color="#777" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Telefone"
                      placeholderTextColor="#777"
                      value={phone}
                      onChangeText={handlePhoneChange}
                      keyboardType="numeric"
                      maxLength={15}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Ionicons name="location" size={20} color="#777" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Endereço"
                      placeholderTextColor="#777"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                </>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.signupButton, isLoading && styles.signupButtonDisabled]} 
                onPress={handleSignup}
                disabled={isLoading}
              >
                <Text style={styles.signupButtonText}>
                  {isLoading ? "Cadastrando..." : "Finalizar cadastro"}
                </Text>
                <Ionicons
                  name="paw"
                  size={20}
                  color="white"
                  style={styles.pawIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginLink} onPress={goToLogin}>
              <Text style={styles.loginLinkText}>Já possui conta? Faça login</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaViewRN>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFF5EB",
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 30,
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "white",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 15,
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
  signupButtonDisabled: {
    backgroundColor: "#A0A0A0",
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
    marginTop: 15,
    marginBottom: 30,
  },
  loginLinkText: {
    color: "#4CC9F0",
    fontSize: 14,
  },
});
