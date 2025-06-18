import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView as SafeAreaViewRN, useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Question {
  id: number;
  text: string;
  key: string;
  type: 'text' | 'option';
  options?: string[];
  inputType?: 'currency' | 'numeric';
}

export default function ChatForm() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userData, setUserData] = useState<Record<string, string | number>>({
    name: params.name as string,
    email: params.email as string,
    password: params.password as string,
    userType: params.userType as string,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  const questions: Question[] = [
    { 
      id: 1, 
      text: `Olá ${params.name}! 😊 Vamos conhecer um pouco mais sobre você para encontrar o pet perfeito! Qual é o seu número de telefone?`, 
      key: "telefone",
      type: "text",
      inputType: "numeric"
    },
    { 
      id: 2, 
      text: "🏠 Que tipo de moradia você tem?\n\n1 - Casa\n2 - Apartamento", 
      key: "moradia",
      type: "option",
      options: ["Casa", "Apartamento"]
    },
    { 
      id: 3, 
      text: "", // Será definida dinamicamente baseada na resposta anterior
      key: "espacoExterno",
      type: "option",
      options: [] // Será definida dinamicamente
    },
    { 
      id: 4, 
      text: "🐾 Qual tipo de animal você gostaria de adotar?\n\n1 - Gato\n2 - Cachorro\n3 - Ambos (não tenho preferência)", 
      key: "preferencia",
      type: "option",
      options: ["Gato", "Cachorro", "Ambos"]
    },
    { 
      id: 5, 
      text: "🎂 Qual faixa etária do animal você prefere?\n\n1 - Filhote-Jovem\n2 - Jovem-Adulto\n3 - Adulto-Idoso\n4 - Indiferente", 
      key: "idadeAnimal",
      type: "option",
      options: ["Filhote-Jovem", "Jovem-Adulto", "Adulto-Idoso", "Indiferente"]
    },
    { 
      id: 6, 
      text: "✨ Como você gostaria que fosse a personalidade do seu futuro pet? Descreva as características que você prefere (ex: calmo, brincalhão, carinhoso, independente...)", 
      key: "caracteristicas",
      type: "text"
    },
    { 
      id: 7, 
      text: "🐕🐱 Você já possui outros animais em casa?\n\n1 - Sim, tenho outros pets\n2 - Não, seria meu primeiro pet", 
      key: "possuiAnimais",
      type: "option",
      options: ["Sim, tenho outros pets", "Não, seria meu primeiro pet"]
    },
    { 
      id: 8, 
      text: "", // Será definida dinamicamente baseada na resposta anterior
      key: "experienciaDetalhes",
      type: "text"
    },
    { 
      id: 9, 
      text: "💰 Qual é aproximadamente sua renda mensal? (Esta informação nos ajuda a garantir que você possa cuidar bem do pet)", 
      key: "rendaMensal",
      type: "text",
      inputType: "currency"
    },
    { 
      id: 10, 
      text: "❤️ Por último, conte-nos: por que você deseja adotar um animal? O que te motivou a tomar essa decisão?", 
      key: "motivacao",
      type: "text"
    },
  ];

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      const firstQuestion = getDynamicQuestion(0);
      simulateTyping(firstQuestion.text);
    }
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOffset(Platform.OS === 'ios' ? 90 : 90);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const simulateTyping = (text: string) => {
    setIsTyping(true);

    // Mostra "Digitando..." por 2 segundos
    setTimeout(() => {
      setIsTyping(false);
      // Adiciona a mensagem completa após o "Digitando..." desaparecer
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: text,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  const validateOption = (input: string, options: string[]): boolean => {
    const num = parseInt(input.trim());
    return num >= 1 && num <= options.length;
  };

  const getOptionText = (input: string, options: string[]): string => {
    const num = parseInt(input.trim());
    return options[num - 1];
  };

  const getDynamicQuestionWithData = (questionIndex: number, data: Record<string, string | number>): Question => {
    const question = questions[questionIndex];
    
    if (questionIndex === 2) { // Pergunta sobre quintal/varanda (agora é índice 2)
      const moradiaOption = data.moradia as number;
      console.log('Verificando moradia para pergunta dinâmica:', moradiaOption, typeof moradiaOption);
      
      if (moradiaOption === 1) { // Casa
        console.log('Escolhendo pergunta de QUINTAL (Casa)');
        return {
          ...question,
          text: "🌳 Sua casa possui quintal?\n\n1 - Sim, tenho quintal\n2 - Não, não tenho quintal",
          options: ["Sim, tenho quintal", "Não, não tenho quintal"]
        };
      } else { // Apartamento
        console.log('Escolhendo pergunta de VARANDA (Apartamento)');
        return {
          ...question,
          text: "🏢 Seu apartamento possui varanda?\n\n1 - Sim, tenho varanda\n2 - Não, não tenho varanda",
          options: ["Sim, tenho varanda", "Não, não tenho varanda"]
        };
      }
    }
    
    if (questionIndex === 7) { // Pergunta sobre experiência (agora é índice 7)
      const possuiAnimaisOption = data.possuiAnimais as number;
      if (possuiAnimaisOption === 1) { // Sim, tenho outros pets
        return {
          ...question,
          text: "🐾 Que tipo de animais você já tem? Conte-me sobre eles!",
          type: "text"
        };
      } else { // Não, seria meu primeiro pet
        const preferenciaOption = data.preferencia as number;
        let tipoAnimal = "";
        if (preferenciaOption === 1) tipoAnimal = "gatos";
        else if (preferenciaOption === 2) tipoAnimal = "cachorros";
        else tipoAnimal = "pets";
        
        return {
          ...question,
          text: `🤔 Mesmo não tendo pets atualmente, você já teve experiência com ${tipoAnimal} antes? Conte-me sobre isso!`,
          type: "text"
        };
      }
    }
    
    return question;
  };

  const getDynamicQuestion = (questionIndex: number): Question => {
    return getDynamicQuestionWithData(questionIndex, userData);
  };

  // Função para obter valor limpo (sem formatação) para salvar
  const getCleanValue = (value: string, inputType?: string): string => {
    if (inputType === 'currency' || inputType === 'numeric') {
      return value.replace(/\D/g, ''); // Remove tudo que não é número
    }
    return value;
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const currentQuestion = getDynamicQuestion(currentQuestionIndex);
    
    // Validação para perguntas de opção
    if (currentQuestion.type === 'option' && currentQuestion.options) {
      if (!validateOption(userInput, currentQuestion.options)) {
        // Mostra mensagem de erro
        const errorMessage: Message = {
          id: Date.now(),
          text: `❌ Por favor, digite um número válido entre 1 e ${currentQuestion.options.length}.`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setUserInput('');
        return;
      }
    }

    const newMessage: Message = {
      id: Date.now(),
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Salva a resposta processada
    let processedAnswer: string | number = userInput;
    if (currentQuestion.type === 'option' && currentQuestion.options) {
      // Para opções, salvamos o número da opção escolhida
      processedAnswer = parseInt(userInput.trim());
      console.log(`Convertendo "${userInput}" para número:`, processedAnswer, typeof processedAnswer);
    } else if (currentQuestion.inputType) {
      // Para inputs com formatação, salvamos o valor limpo
      processedAnswer = getCleanValue(userInput, currentQuestion.inputType);
      console.log(`Salvando valor limpo para ${currentQuestion.key}:`, processedAnswer);
    }
    
    setUserInput('');

    if (currentQuestionIndex < questions.length - 1) {
      // Atualiza o userData primeiro, depois gera a próxima pergunta
      setUserData(prev => {
        const updatedData = {
          ...prev,
          [currentQuestion.key]: processedAnswer
        };
        console.log('Dados atualizados:', updatedData);
        console.log(`Salvando ${currentQuestion.key}:`, processedAnswer, typeof processedAnswer);
        
        // Gera a próxima pergunta com os dados atualizados após um delay
        setTimeout(() => {
          const nextQuestion = getDynamicQuestionWithData(currentQuestionIndex + 1, updatedData);
          simulateTyping(nextQuestion.text);
          setCurrentQuestionIndex(prev => prev + 1);
        }, 1000);
        
        return updatedData;
      });
    } else {
      // Finaliza o cadastro
      setUserData(prev => {
        const finalData = {
          ...prev,
          [currentQuestion.key]: processedAnswer
        };
        console.log('Dados finais completos:', finalData);
        
        // Mostra mensagem de conclusão e redireciona para login
        setTimeout(() => {
          const finalMessage = "🎉 Perfeito! Coletamos todas as informações necessárias. Agora você será redirecionado para fazer login no sistema!";
          simulateTyping(finalMessage);
          
          // Marca como completo após mostrar a mensagem final
          setTimeout(() => {
            setIsCompleted(true);
          }, 3000);
        }, 1000);
        
        return finalData;
      });
    }
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (!numbers) return '';
    
    // Converte para número e divide por 100 para ter centavos
    const amount = parseInt(numbers) / 100;
    
    // Formata com separadores brasileiros
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  // Função para formatar telefone
  const formatPhone = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (limitedNumbers.length <= 10) {
      return limitedNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    } else {
      return limitedNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  };

  // Função para lidar com mudança no input
  const handleInputChange = (text: string) => {
    const currentQuestion = getDynamicQuestion(currentQuestionIndex);
    
    if (currentQuestion.inputType === 'currency') {
      setUserInput(formatCurrency(text));
    } else if (currentQuestion.inputType === 'numeric') {
      setUserInput(formatPhone(text));
    } else {
      setUserInput(text);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Formulário de adoção",
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
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardOffset}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
            {isTyping && (
              <View style={[styles.messageBubble, styles.botMessage]}>
                <Text style={styles.messageText}>Digitando...</Text>
              </View>
            )}
          </ScrollView>

          <View style={[styles.inputContainer, isCompleted && { paddingBottom: Math.max(insets.bottom, 16) }]}>
            {!isCompleted ? (
              <>
                <TextInput
                  style={styles.input}
                  value={userInput}
                  onChangeText={handleInputChange}
                  placeholder={
                    currentQuestionIndex < questions.length && 
                    getDynamicQuestion(currentQuestionIndex).type === 'option' 
                      ? "Digite o número da opção..." 
                      : currentQuestionIndex < questions.length && 
                        getDynamicQuestion(currentQuestionIndex).inputType === 'currency'
                        ? "Ex: R$ 2.500,00"
                        : currentQuestionIndex < questions.length && 
                          getDynamicQuestion(currentQuestionIndex).inputType === 'numeric'
                          ? "Ex: (11) 99999-9999"
                          : "Digite sua resposta..."
                  }
                  placeholderTextColor="#999"
                  keyboardType={
                    currentQuestionIndex < questions.length && 
                    (getDynamicQuestion(currentQuestionIndex).inputType === 'currency' || 
                     getDynamicQuestion(currentQuestionIndex).inputType === 'numeric')
                      ? 'numeric' 
                      : 'default'
                  }
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                  disabled={!userInput.trim()}
                >
                  <Ionicons
                    name="send"
                    size={24}
                    color={userInput.trim() ? '#4CC9F0' : '#ccc'}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.finishButton}
                onPress={() => router.replace('/login')}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.finishButtonIcon} />
                <Text style={styles.finishButtonText}>Finalizar e Fazer Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaViewRN>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  botMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#4CC9F0',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingBottom: Platform.OS === 'android' ? 16 : 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#4CC9F0',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4CC9F0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginHorizontal: 4,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  finishButtonIcon: {
    marginRight: 4,
  },
}); 