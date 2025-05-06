import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/UserContext";

export default function EditProfileScreen() {
  const { user, updateProfile, isLoading } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setBio(user.bio || "");
    }
  }, [user]);

  // Format phone as user types (XX) XXXXX-XXXX
  const formatPhone = (text: string): string => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");

    // Format with parentheses and dash
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    }
    if (cleaned.length > 7) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(
        2,
        7
      )}-${cleaned.substring(7, 11)}`;
    }

    return formatted;
  };

  const handlePhoneChange = (text: string): void => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, digite seu nome");
      return;
    }

    try {
      const result = await updateProfile({
        name,
        phone,
        address,
        bio,
      });

      if (result.success) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Erro", result.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil");
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) {
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
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={styles.headerRight} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Ionicons name="person" size={80} color="#4CC9F0" />
              </View>
              <TouchableOpacity style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>Mudar foto</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome completo *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#777"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Seu nome completo"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#777"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    value={email}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
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
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Endereço</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="home-outline"
                    size={20}
                    color="#777"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Seu endereço completo"
                    placeholderTextColor="#999"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Sobre mim</Text>
                <View style={[styles.inputWrapper, styles.textareaWrapper]}>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Conte um pouco sobre você..."
                    placeholderTextColor="#999"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color="white"
                      style={styles.buttonIcon}
                    />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom spacer to avoid the tab bar */}
            <View style={{ height: 90 }} />
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#4CC9F0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: "relative",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerRight: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#E0E0E0",
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#4CC9F0",
    borderRadius: 20,
  },
  changePhotoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  formContainer: {
    marginBottom: 20,
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
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "white",
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textareaWrapper: {
    height: 120,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#F9F9F9",
    color: "#999",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cancelButtonText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
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
