// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

// Obter as dimensões da tela para layout responsivo
const { width, height } = Dimensions.get('window');

// 1. Tela Inicial (Home Screen)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{ uri: 'https://placehold.co/400x200/FFD700/8B4513?text=Festa+Junina+Escola' }}
        style={styles.headerImage}
        onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
      />
      <Text style={styles.title}>🎉 Viva a Festa Junina! 🎉</Text>
      <Text style={styles.subtitle}>Sua Escola te convida para a melhor festa do ano!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cardápio Junino')}
      >
        <Text style={styles.buttonText}>🌽 Cardápio Junino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cabine de Fotos')}
      >
        <Text style={styles.buttonText}>📸 Cabine de Fotos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quiz Junino')}
      >
        <Text style={styles.buttonText}>🤔 Quiz Junino</Text>
      </TouchableOpacity>
    </View>
  );
}

// 2. Tela de Cardápio (Menu Screen)
const menuItems = [
  { id: '1', name: 'Pipoca', price: 'R$ 5', icon: '🍿' },
  { id: '2', name: 'Canjica', price: 'R$ 7', icon: '🥣' },
  { id: '3', name: 'Maçã do Amor', price: 'R$ 4', icon: '🍎' },
  { id: '4', name: 'Pamonha', price: 'R$ 6', icon: '🌽' },
  { id: '5', name: 'Quentão (sem álcool)', price: 'R$ 8', icon: '🍷' },
  { id: '6', name: 'Cachorro Quente', price: 'R$ 9', icon: '🌭' },
  { id: '7', name: 'Milho Cozido', price: 'R$ 6', icon: '🌽' },
  { id: '8', name: 'Paçoca', price: 'R$ 3', icon: '🥜' },
];

function MenuItem({ item }) {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemIcon}>{item.icon}</Text>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      {/* Exemplo de informação extra (pode ser um modal, etc.) */}
      <TouchableOpacity onPress={() => Alert.alert('Ingredientes', `Detalhes para ${item.name}`)}>
        <Text style={styles.infoButton}>ℹ️</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cardápio da Roça! 😋</Text>
      <Text style={styles.subtitle}>Delícias para você se esbaldar!</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

// 3. Tela de Cabine de Fotos (Photo Booth Screen)
function PhotoBoothScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setCapturedPhoto(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Solicitando permissão da câmera...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>Acesso à câmera negado. Vá para as configurações do seu dispositivo para permitir.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>📸 Cabine de Fotos Juninas 📸</Text>
      <Text style={styles.subtitle}>Capture o momento caipira!</Text>

      {capturedPhoto ? (
        <View style={styles.photoPreviewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.photoPreview} />
          {/* Adicionando uma "moldura" com emojis */}
          <View style={styles.photoFrameOverlay}>
            <Text style={styles.frameEmojiTop}>✨🌽</Text>
            <Text style={styles.frameEmojiBottom}>🥳🤠</Text>
          </View>
          <TouchableOpacity style={styles.retakeButton} onPress={() => setCapturedPhoto(null)}>
            <Text style={styles.buttonText}>Tirar Outra Foto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}>Virar Câmera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.text}>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
}

// 4. Tela de Quiz (Quiz Screen)
const quizQuestions = [
  {
    question: 'Qual o nome da dança típica da Festa Junina?',
    options: ['Samba', 'Quadrilha', 'Forró', 'Frevo'],
    answer: 'Quadrilha',
  },
  {
    question: 'Qual doce típico é feito de amendoim?',
    options: ['Pé de Moleque', 'Canjica', 'Pamonha', 'Maçã do Amor'],
    answer: 'Pé de Moleque',
  },
  {
    question: 'Em que mês geralmente acontece a Festa Junina?',
    options: ['Maio', 'Julho', 'Junho', 'Agosto'],
    answer: 'Junho',
  },
  {
    question: 'Qual desses itens não é comum em uma fogueira de Festa Junina?',
    options: ['Milho', 'Madeira', 'Fósforo', 'Água'],
    answer: 'Água',
  },
  {
    question: 'Qual o nome do santo padroeiro das festas juninas?',
    options: ['São Pedro', 'São João', 'Santo Antônio', 'Todos os anteriores'],
    answer: 'Todos os anteriores',
  },
];

function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
    if (selected === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    // Pequeno atraso para mostrar a resposta antes de ir para a próxima
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Resetar seleção
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>🎉 Quiz Junino Finalizado! 🎉</Text>
        <Text style={styles.scoreText}>Sua pontuação: {score} de {quizQuestions.length}</Text>
        <Text style={styles.subtitle}>
          {score === quizQuestions.length
            ? 'Arrasou! Você é um verdadeiro caipira! 🤠'
            : score >= quizQuestions.length / 2
            ? 'Muito bem! Quase lá! 😊'
            : 'Continue tentando para se tornar um expert junino! 🤔'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={resetQuiz}>
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>🤔 Quiz Junino 🤔</Text>
      <Text style={styles.questionNumber}>Pergunta {currentQuestionIndex + 1}/{quizQuestions.length}</Text>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (option === currentQuestion.answer ? styles.correctOption : styles.incorrectOption),
              selectedOption !== null && option === currentQuestion.answer && styles.correctOption
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedOption !== null} // Desabilita após selecionar uma opção
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Configuração do Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8B4513', // Cor de madeira
          },
          headerTintColor: '#FFD700', // Cor dourada/amarela
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center', // Centraliza o título no cabeçalho
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Festa Junina da Escola' }}
        />
        <Stack.Screen
          name="Cardápio Junino"
          component={MenuScreen}
          options={{ title: 'Nosso Cardápio 🌽' }}
        />
        <Stack.Screen
          name="Cabine de Fotos"
          component={PhotoBoothScreen}
          options={{ title: 'Sua Foto Junina! 📸' }}
        />
        <Stack.Screen
          name="Quiz Junino"
          component={QuizScreen}
          options={{ title: 'Teste seus Conhecimentos! 🤔' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos do Aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Fundo amarelo claro/dourado
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerImage: {
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#8B4513', // Marrom escuro
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#A0522D', // Marrom médio
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513', // Marrom escuro
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#A0522D', // Borda mais clara
  },
  buttonText: {
    color: '#FFD700', // Dourado
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  // Estilos do Cardápio
  flatListContent: {
    paddingBottom: 20,
    width: width * 0.9,
  },
  menuItem: {
    backgroundColor: '#F5DEB3', // Palha
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  menuItemIcon: {
    fontSize: width * 0.08,
    marginRight: 15,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  menuItemPrice: {
    fontSize: width * 0.04,
    color: '#A0522D',
  },
  infoButton: {
    fontSize: width * 0.06,
    color: '#4682B4', // Azul
    marginLeft: 10,
  },
  // Estilos da Câmera
  cameraContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden', // Para a borda arredondada
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end', // Botões na parte inferior
    alignItems: 'center',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  flipButton: {
    flex: 0.5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  captureButton: {
    flex: 0.5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Tomate
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  text: {
    fontSize: width * 0.04,
    color: 'white',
    fontWeight: 'bold',
  },
  photoPreviewContainer: {
    width: width * 0.8,
    height: width * 0.8, // Imagem quadrada
    marginBottom: 20,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoFrameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  frameEmojiTop: {
    fontSize: width * 0.08,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  frameEmojiBottom: {
    fontSize: width * 0.08,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  retakeButton: {
    backgroundColor: '#A0522D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  // Estilos do Quiz
  questionNumber: {
    fontSize: width * 0.04,
    color: '#A0522D',
    marginBottom: 15,
  },
  questionCard: {
    backgroundColor: '#F5DEB3',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  questionText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFAF0', // Branco sujo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  optionText: {
    fontSize: width * 0.045,
    color: '#A0522D',
    fontWeight: '500',
  },
  correctOption: {
    backgroundColor: '#90EE90', // Verde claro
    borderColor: '#3CB371', // Verde médio
  },
  incorrectOption: {
    backgroundColor: '#FFB6C1', // Rosa claro
    borderColor: '#DC143C', // Vermelho forte
  },
  scoreText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
  },
});
