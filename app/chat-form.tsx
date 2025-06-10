import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
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
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

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
}

export default function ChatForm() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [userData, setUserData] = useState<Record<string, string>>({
    name: params.name as string,
    email: params.email as string,
    password: params.password as string,
    userType: params.userType as string,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  const questions: Question[] = [
    { id: 1, text: `Olá ${params.name}! Vamos conhecer um pouco mais sobre você. Qual é a sua idade?`, key: "idade" },
    { id: 2, text: "Você mora em casa ou apartamento?", key: "tipoMoradia" },
    { id: 3, text: "Você tem outros animais em casa?", key: "outrosAnimais" },
    { id: 4, text: "Quantas pessoas moram com você?", key: "pessoasCasa" },
    { id: 5, text: "Você tem experiência com animais?", key: "experiencia" },
  ];

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      simulateTyping(questions[0].text);
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

  const handleSend = () => {
    if (!userInput.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const newMessage: Message = {
      id: Date.now(),
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setUserData(prev => ({
      ...prev,
      [currentQuestion.key]: userInput
    }));

    setUserInput('');

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        simulateTyping(questions[currentQuestionIndex + 1].text);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    } else {
      // Aqui você pode fazer o cadastro final com todos os dados
      setTimeout(() => {
        // TODO: Implementar o cadastro final com todos os dados
        console.log('Dados completos:', userData);
      }, 1000);
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

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Digite sua resposta..."
              placeholderTextColor="#999"
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
}); 