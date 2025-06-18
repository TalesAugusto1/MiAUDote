import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
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
  View
} from "react-native";
import { api } from "./config/api";
import { UserProfile } from "./services/UserService";

interface AnimalFormData {
  nome: string;
  tipo: string;
  sexo: string;
  idade: string;
  porte: string;
  raca: string;
}

export default function NovoAnimalScreen() {
  const [formData, setFormData] = useState<AnimalFormData>({
    nome: '',
    tipo: '',
    sexo: '',
    idade: '',
    porte: '',
    raca: ''
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Opções para os dropdowns
  const tipoOptions = [
    { label: 'Selecione o tipo', value: '' },
    { label: 'Gato', value: 'Gato' },
    { label: 'Cachorro', value: 'Cachorro' }
  ];

  const sexoOptions = [
    { label: 'Selecione o sexo', value: '' },
    { label: 'Macho', value: 'Macho' },
    { label: 'Fêmea', value: 'Fêmea' },
    { label: 'Indiferente', value: 'Indiferente' }
  ];

  const porteOptions = [
    { label: 'Selecione o porte', value: '' },
    { label: 'Pequeno', value: 'Pequeno' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Grande', value: 'Grande' }
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@MiAuDote:user');
      if (userData) {
        const parsedUser = JSON.parse(userData) as UserProfile;
        setUserProfile(parsedUser);
        console.log('[NOVO-ANIMAL] Usuário carregado:', parsedUser);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        router.back();
      }
    } catch (error) {
      console.error('[NOVO-ANIMAL] Erro ao carregar usuário:', error);
      Alert.alert('Erro', 'Erro ao carregar dados do usuário.');
      router.back();
    } finally {
      setLoadingUser(false);
    }
  };

  const handleInputChange = (field: keyof AnimalFormData, value: string) => {
    // Para o campo idade, permitir apenas números
    if (field === 'idade') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [field]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Nome do animal é obrigatório');
      return false;
    }
    if (!formData.tipo) {
      Alert.alert('Erro', 'Tipo do animal é obrigatório');
      return false;
    }
    if (!formData.sexo) {
      Alert.alert('Erro', 'Sexo do animal é obrigatório');
      return false;
    }
    if (!formData.idade.trim() || isNaN(Number(formData.idade)) || Number(formData.idade) <= 0) {
      Alert.alert('Erro', 'Idade deve ser um número válido maior que 0');
      return false;
    }
    if (!formData.porte) {
      Alert.alert('Erro', 'Porte do animal é obrigatório');
      return false;
    }
    if (!formData.raca.trim()) {
      Alert.alert('Erro', 'Raça do animal é obrigatória');
      return false;
    }
    if (!userProfile || userProfile.type !== 'ong') {
      Alert.alert('Erro', 'Apenas ONGs podem cadastrar animais');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const animalData = {
        nome: formData.nome.trim(),
        tipo: formData.tipo,
        sexo: formData.sexo,
        idade: parseInt(formData.idade), // Convertendo para número
        porte: formData.porte,
        raca: formData.raca.trim(),
        idOng: userProfile!.id
      };

      console.log('[NOVO-ANIMAL] Enviando dados:', animalData);

      const response = await api.post('/animal', animalData);
      
      console.log('[NOVO-ANIMAL] Animal cadastrado com sucesso:', response.data);
      
      Alert.alert(
        'Sucesso!', 
        `${formData.nome} foi cadastrado com sucesso!`,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error: any) {
      console.error('[NOVO-ANIMAL] Erro ao cadastrar animal:', error);
      
      let errorMessage = 'Erro ao cadastrar animal. Tente novamente.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CC9F0" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Animal</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Animal *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Luna, Rex, Mia..."
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.tipo}
                onValueChange={(value) => handleInputChange('tipo', value)}
                enabled={!loading}
                style={styles.picker}
              >
                {tipoOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.sexo}
                onValueChange={(value) => handleInputChange('sexo', value)}
                enabled={!loading}
                style={styles.picker}
              >
                {sexoOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Idade (anos) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2, 3, 4..."
              value={formData.idade}
              onChangeText={(value) => handleInputChange('idade', value)}
              keyboardType="numeric"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Porte *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.porte}
                onValueChange={(value) => handleInputChange('porte', value)}
                enabled={!loading}
                style={styles.picker}
              >
                {porteOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Raça *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Labrador, Vira-lata, Persa..."
              value={formData.raca}
              onChangeText={(value) => handleInputChange('raca', value)}
              editable={!loading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>Cadastrar Animal</Text>
                <Ionicons name="paw" size={20} color="white" style={styles.pawIcon} />
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.infoText}>
            * Campos obrigatórios
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5EB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4CC9F0",
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CC9F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  pawIcon: {
    marginLeft: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
}); 