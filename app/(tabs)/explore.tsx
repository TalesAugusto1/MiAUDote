import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hasAnimals, setHasAnimals] = useState(false);
  const [reason, setReason] = useState("");
  const [salary, setSalary] = useState("");
  const [hasYard, setHasYard] = useState("");
  const [otherAnimals, setOtherAnimals] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !reason.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
      return;
    }

    Alert.alert(
      "Formulário Enviado",
      "Obrigado pelo seu interesse! Entraremos em contato em breve.",
      [{ text: "OK" }]
    );

    setName("");
    setPhone("");
    setAddress("");
    setHasAnimals(false);
    setReason("");
    setSalary("");
    setHasYard("");
    setOtherAnimals("");
    setExperience("");
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Formulário de Adoção</Text>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formHeaderContainer}>
            <Text style={styles.formTitle}>Preencha o formulário</Text>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.centerLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefone *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Endereço *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="home-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite seu endereço completo"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Média salarial</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="cash-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Informe sua média salarial"
                placeholderTextColor="#999"
                value={salary}
                onChangeText={setSalary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tem quintal?</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="home-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Possui quintal em casa?"
                placeholderTextColor="#999"
                value={hasYard}
                onChangeText={setHasYard}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Já possui outros animais?</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {hasAnimals ? "Sim" : "Não"}
              </Text>
              <Switch
                value={hasAnimals}
                onValueChange={setHasAnimals}
                trackColor={{ false: "#D9D9D9", true: "#4CC9F0" }}
                thumbColor={"#FFFFFF"}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Detalhes sobre outros animais</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="paw-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Que outros animais você possui?"
                placeholderTextColor="#999"
                value={otherAnimals}
                onChangeText={setOtherAnimals}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Experiência com animais</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Possui alguma experiência com animais?"
                placeholderTextColor="#999"
                value={experience}
                onChangeText={setExperience}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Por que deseja adotar? *</Text>
            <View style={[styles.inputWrapper, styles.textareaWrapper]}>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Conte-nos o motivo da adoção..."
                placeholderTextColor="#999"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleSubmit}
            >
              <Text style={styles.finishButtonText}>Finalizar Formulário</Text>
              <Ionicons
                name="paw"
                size={20}
                color="white"
                style={styles.submitIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.requiredNote}>* Campos obrigatórios</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CC9F0",
  },
  headerWrapper: {
    backgroundColor: "#4CC9F0",
    paddingBottom: 35,
    paddingTop: 10,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 40,
  },
  centerLogo: {
    width: 120,
    height: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFEED9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  formContent: {
    padding: 25,
    paddingBottom: 40,
  },
  formHeaderContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  formDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textareaWrapper: {
    paddingVertical: 10,
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
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  finishButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitIcon: {
    marginLeft: 10,
  },
  requiredNote: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
});
