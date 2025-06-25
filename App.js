// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView, // Adicionado para permitir scroll na tela inicial
  FlatList,
  Alert,
  Dimensions,
  TextInput,
  Animated
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location'; // Adicionado para o Mapa da Festa
// import { Audio } from 'expo-av'; // Removido para tirar as músicas

// Obter as dimensões da tela para layout responsivo
const { width, height } = Dimensions.get('window');

// 1. Tela Inicial (Home Screen)
function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Adicionado ScrollView aqui */}
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Correio Elegante')}
      >
        <Text style={styles.buttonText}>💌 Correio Elegante</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Mapa da Festa')}
      >
        <Text style={styles.buttonText}>🗺️ Mapa da Festa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Jogo da Pescaria')}
      >
        <Text style={styles.buttonText}>🎣 Jogo da Pescaria</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 2. Tela de Cardápio (Menu Screen)
const initialMenuItems = [
  { id: '1', name: 'Pipoca', price: 'R$ 5', icon: '🍿', isFavorite: false },
  { id: '2', name: 'Canjica', price: 'R$ 7', icon: '🥣', isFavorite: false },
  { id: '3', name: 'Maçã do Amor', price: 'R$ 4', icon: '🍎', isFavorite: false },
  { id: '4', name: 'Pamonha', price: 'R$ 6', icon: '🌽', isFavorite: false },
  { id: '5', name: 'Quentão (sem álcool)', price: 'R$ 8', icon: '🍷', isFavorite: false },
  { id: '6', name: 'Cachorro Quente', price: 'R$ 9', icon: '🌭', isFavorite: false },
  { id: '7', name: 'Milho Cozido', price: 'R$ 6', icon: '🌽', isFavorite: false },
  { id: '8', name: 'Paçoca', price: 'R$ 3', icon: '🥜', isFavorite: false },
];

function MenuItem({ item, toggleFavorite }) {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemIcon}>{item.icon}</Text>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      {/* Botão de informações */}
      <TouchableOpacity onPress={() => Alert.alert('Ingredientes', `Detalhes para ${item.name}`)}>
        <Text style={styles.infoButton}>ℹ️</Text>
      </TouchableOpacity>
      {/* Botão de favorito */}
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text style={styles.favoriteButton}>{item.isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function MenuScreen() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const toggleFavorite = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Cardápio da Roça! 😋</Text>
      <Text style={styles.subtitle}>Delícias para você se esbaldar!</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} toggleFavorite={toggleFavorite} />}
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

// 5. Tela de Correio Elegante Digital (Digital Secret Mail Screen)
function CorreioEleganteScreen() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const sendMessage = () => {
    if (recipient.trim() === '' || message.trim() === '') {
      Alert.alert('Ops!', 'Por favor, preencha o destinatário e a mensagem.');
      return;
    }
    const newMessage = {
      id: Date.now().toString(), // ID único
      recipient: recipient.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(), // Data e hora do envio
    };
    setSentMessages([...sentMessages, newMessage]);
    setRecipient('');
    setMessage('');
    Alert.alert('Sucesso!', 'Sua mensagem elegante foi enviada! 🎉');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>💌 Correio Elegante Digital 💌</Text>
      <Text style={styles.subtitle}>Envie um recado para aquele "alguém" especial!</Text>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Para quem?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do destinatário"
          placeholderTextColor="#A0522D"
          value={recipient}
          onChangeText={setRecipient}
        />

        <Text style={styles.inputLabel}>Sua mensagem:</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Escreva sua mensagem secreta aqui..."
          placeholderTextColor="#A0522D"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Mensagens Recebidas (Exemplo)</Text>
      {sentMessages.length === 0 ? (
        <Text style={styles.noMessagesText}>Nenhuma mensagem enviada ainda. Que tal ser o primeiro? 😉</Text>
      ) : (
        <FlatList
          data={sentMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageCard}>
              <Text style={styles.messageRecipient}>Para: {item.recipient} ✨</Text>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
        />
      )}
    </ScrollView>
  );
}

// 6. Tela do Mapa da Festa / Guia de Barracas (Party Map / Stall Guide Screen)
function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const soundRef = useRef(new Audio.Sound()); // Removido para tirar a música

  // Coordenadas simuladas para a escola (Rio de Janeiro, por exemplo)
  const schoolLocation = { latitude: -22.9068, longitude: -43.1729 }; // Exemplo: Rio de Janeiro

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso à localização negada.');
        return;
      }

      // Simula a localização atual
      let currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc);

      // Carregar e tocar som - Removido para tirar a música
      /*
      try {
        await soundRef.current.loadAsync(require('./assets/party_sound.mp3'));
        await soundRef.current.playAsync();
      } catch (error) {
        console.log('Erro ao carregar ou tocar o som:', error);
        Alert.alert('Erro de Áudio', 'Não foi possível carregar o som da festa. Verifique se o arquivo "party_sound.mp3" existe na pasta assets.');
      }
      */
    })();

    return () => {
      // Descarregar o som quando a tela for desmontada - Removido para tirar a música
      /*
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      */
    };
  }, []);

  let text = 'Aguardando sua localização...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Sua localização simulada: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>🗺️ Mapa da Festa Junina 🗺️</Text>
      <Text style={styles.subtitle}>Encontre as barracas e a diversão!</Text>
      <Text style={styles.locationText}>{text}</Text>

      <View style={styles.mapContainer}>
        {/* Simulação visual do mapa */}
        <Image
          source={{ uri: 'https://placehold.co/300x300/8B4513/FFD700?text=Mapa+da+Festa' }}
          style={styles.mapImage}
          onError={(e) => console.log('Erro ao carregar imagem do mapa:', e.nativeEvent.error)}
        />
        {/* Ícones de barracas e locais importantes (posicionamento absoluto para simular) */}
        <View style={[styles.mapIcon, { top: '20%', left: '20%' }]}>
          <Text style={styles.mapIconText}>🍿</Text>
          <Text style={styles.mapIconLabel}>Comidas</Text>
        </View>
        <View style={[styles.mapIcon, { top: '50%', left: '70%' }]}>
          <Text style={styles.mapIconText}>🚽</Text>
          <Text style={styles.mapIconLabel}>Banheiros</Text>
        </View>
        <View style={[styles.mapIcon, { top: '75%', left: '30%' }]}>
          <Text style={styles.mapIconText}>🎤</Text>
          <Text style={styles.mapIconLabel}>Palco</Text>
        </View>
        {/* Marcador da escola (local da festa) */}
        <View style={[styles.mapIcon, { top: '40%', left: '45%', borderColor: 'red' }]}>
          <Text style={styles.mapIconText}>📍</Text>
          <Text style={styles.mapIconLabel}>Escola (Você está aqui!)</Text>
        </View>
      </View>
      <Text style={styles.mapLegend}>Toque para detalhes (não funcional nesta versão)</Text>
    </View>
  );
}

// 7. Tela do Jogo da Pescaria (Fishing Game Screen)
function FishingGameScreen() {
  const [score, setScore] = useState(0);
  const [fishes, setFishes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const gameInterval = useRef(null);
  const fishFallInterval = useRef(null);
  // const soundRef = useRef(new Audio.Sound()); // Removido para tirar a música
  // const catchSoundRef = useRef(new Audio.Sound()); // Removido para tirar a música

  const fishEmojis = ['🐠', '🐟', '🐡', '🐙', '🦀']; // Peixes e itens para pescar

  useEffect(() => {
    // Carregar sons - Removido para tirar a música
    /*
    const loadSounds = async () => {
      try {
        await soundRef.current.loadAsync(require('./assets/background_music.mp3'));
        await soundRef.current.setVolumeAsync(0.5);
        await soundRef.current.setIsLoopingAsync(true);
        await catchSoundRef.current.loadAsync(require('./assets/catch_sound.mp3'));
        await catchSoundRef.current.setVolumeAsync(0.8);
      } catch (error) {
        console.log('Erro ao carregar sons do jogo:', error);
        Alert.alert('Erro de Áudio', 'Não foi possível carregar os sons do jogo. Verifique os arquivos na pasta assets.');
      }
    };
    loadSounds();
    */

    return () => {
      // Descarregar sons ao sair da tela - Removido para tirar a música
      /*
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (catchSoundRef.current) {
        catchSoundRef.current.unloadAsync();
      }
      */
      clearInterval(gameInterval.current);
      clearInterval(fishFallInterval.current);
    };
  }, []);

  const startGame = async () => {
    setScore(0);
    setFishes([]);
    setGameStarted(true);

    // Tocar música de fundo - Removido para tirar a música
    /*
    try {
      await soundRef.current.playAsync();
    } catch (error) {
      console.log('Erro ao iniciar música:', error);
    }
    */

    // Gerar peixes a cada 1.5 segundos
    gameInterval.current = setInterval(() => {
      const newFish = {
        id: Date.now(),
        emoji: fishEmojis[Math.floor(Math.random() * fishEmojis.length)],
        x: Math.random() * (width - 50), // Posição X aleatória
        y: new Animated.Value(-50), // Começa acima da tela
      };
      setFishes(prevFishes => [...prevFishes, newFish]);

      // Animação de queda do peixe
      Animated.timing(newFish.y, {
        toValue: height + 50, // Cai para fora da tela
        duration: 5000, // Tempo de queda
        useNativeDriver: true,
      }).start(() => {
        // Remover peixe da lista se não for pego e cair
        setFishes(prevFishes => prevFishes.filter(f => f.id !== newFish.id));
      });
    }, 1500);

    // Isso é para simular uma "chuva" de peixes, mas o setInterval acima já faz isso.
    // O Animated.timing é aplicado por peixe individualmente.
  };

  const stopGame = () => {
    setGameStarted(false);
    clearInterval(gameInterval.current);
    clearInterval(fishFallInterval.current); // Garante que o intervalo de queda também seja limpo
    // Parar música de fundo - Removido para tirar a música
    /*
    if (soundRef.current) {
      soundRef.current.stopAsync();
    }
    */
  };

  const catchFish = async (id) => {
    setScore(score + 1);
    setFishes(prevFishes => prevFishes.filter(fish => fish.id !== id));
    // Tocar som de pegar - Removido para tirar a música
    /*
    try {
      await catchSoundRef.current.replayAsync();
    } catch (error) {
      console.log('Erro ao tocar som de captura:', error);
    }
    */
  };

  return (
    <View style={styles.gameContainer}>
      <StatusBar style="light" />
      <Text style={styles.title}>🎣 Jogo da Pescaria Junina 🎣</Text>
      <Text style={styles.subtitle}>Toque nos peixes para pescar!</Text>
      <Text style={styles.scoreText}>Pontuação: {score}</Text>

      {gameStarted ? (
        <TouchableOpacity style={styles.stopButton} onPress={stopGame}>
          <Text style={styles.buttonText}>Parar Jogo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Iniciar Jogo</Text>
        </TouchableOpacity>
      )}

      {/* Área do Jogo */}
      <View style={styles.fishingArea}>
        {fishes.map(fish => (
          <Animated.View
            key={fish.id}
            style={{
              position: 'absolute',
              left: fish.x,
              top: fish.y,
            }}
          >
            <TouchableOpacity onPress={() => catchFish(fish.id)}>
              <Text style={styles.fishEmoji}>{fish.emoji}</Text>
            </TouchableOpacity>
          </Animated.View>
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
        <Stack.Screen
          name="Correio Elegante"
          component={CorreioEleganteScreen}
          options={{ title: 'Seu Recado Junino! 💌' }}
        />
        <Stack.Screen
          name="Mapa da Festa"
          component={MapScreen}
          options={{ title: 'Explore a Festa! 🗺️' }}
        />
        <Stack.Screen
          name="Jogo da Pescaria"
          component={FishingGameScreen}
          options={{ title: 'Pegue os Peixes! 🎣' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos do Aplicativo
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Para permitir ScrollView
    backgroundColor: '#FFD700', // Fundo amarelo claro/dourado
    alignItems: 'center',
    justifyContent: 'flex-start', // Começa do topo para permitir scroll
    paddingVertical: 20,
    paddingHorizontal: 20,
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
  favoriteButton: { // Novo estilo para o botão de favorito
    fontSize: width * 0.06,
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
  // Estilos do Correio Elegante
  inputCard: {
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
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: width * 0.045,
    color: '#8B4513',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFACD', // Amarelo bem claro
    borderWidth: 1,
    borderColor: '#D2B48C',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    fontSize: width * 0.04,
    color: '#A0522D',
  },
  messageInput: {
    height: 100, // Maior altura para a mensagem
    textAlignVertical: 'top', // Texto começa no topo
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  messagesList: {
    width: '90%',
    paddingBottom: 20,
  },
  messageCard: {
    backgroundColor: '#FFFAF0', // Branco sujo
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#D2B48C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  messageRecipient: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#A0522D',
    marginBottom: 5,
  },
  messageText: {
    fontSize: width * 0.04,
    color: '#8B4513',
    marginBottom: 5,
  },
  messageTimestamp: {
    fontSize: width * 0.035,
    color: '#708090', // Cinza
    textAlign: 'right',
  },
  noMessagesText: {
    fontSize: width * 0.04,
    color: '#A0522D',
    textAlign: 'center',
    marginTop: 10,
  },
  // Estilos do Mapa da Festa
  locationText: {
    fontSize: width * 0.035,
    color: '#A0522D',
    marginBottom: 15,
    textAlign: 'center',
  },
  mapContainer: {
    width: width * 0.9,
    height: width * 0.9, // Mapa quadrado
    backgroundColor: '#D2B48C', // Cor de terra
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  mapIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  mapIconText: {
    fontSize: width * 0.06,
  },
  mapIconLabel: {
    fontSize: width * 0.03,
    color: '#8B4513',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapLegend: {
    fontSize: width * 0.035,
    color: '#A0522D',
    marginTop: 15,
    textAlign: 'center',
  },
  // Estilos do Jogo da Pescaria
  gameContainer: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  fishingArea: {
    width: width * 0.9,
    height: height * 0.6, // Área para os peixes
    backgroundColor: '#ADD8E6', // Azul claro para a "água"
    borderRadius: 15,
    marginTop: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#4682B4', // Borda azul mais escura
  },
  fishEmoji: {
    fontSize: width * 0.1,
  },
  startButton: {
    backgroundColor: '#3CB371', // Verde médio
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#2E8B57', // Verde escuro
  },
  stopButton: {
    backgroundColor: '#FF6347', // Tomate
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#DC143C', // Vermelho forte
  },
});
