// screens/JogoDaPescariaScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { commonStyles } from '../constants/styles'; // Importa estilos comuns

const { width, height } = Dimensions.get('window');

export default function JogoDaPescariaScreen() {
  const [score, setScore] = useState(0);
  const [fishes, setFishes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const gameInterval = useRef(null);

  const fishEmojis = ['🐠', '🐟', '🐡', '🐙', '🦀']; // Peixes e itens para pescar

  useEffect(() => {
    return () => {
      clearInterval(gameInterval.current);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setFishes([]);
    setGameStarted(true);

    gameInterval.current = setInterval(() => {
      const newFish = {
        id: Date.now(),
        emoji: fishEmojis[Math.floor(Math.random() * fishEmojis.length)],
        x: Math.random() * (width - 50), // Posição X aleatória
        y: new Animated.Value(-50), // Começa acima da tela
      };
      setFishes(prevFishes => [...prevFishes, newFish]);

      Animated.timing(newFish.y, {
        toValue: height + 50, // Cai para fora da tela
        duration: 5000, // Tempo de queda
        useNativeDriver: true,
      }).start(() => {
        setFishes(prevFishes => prevFishes.filter(f => f.id !== newFish.id));
      });
    }, 1500); // Gera um novo peixe a cada 1.5 segundos
  };

  const stopGame = () => {
    setGameStarted(false);
    clearInterval(gameInterval.current);
    Alert.alert('Fim de Jogo!', `Sua pontuação final: ${score}`);
  };

  const catchFish = (id) => {
    setScore(score + 1);
    setFishes(prevFishes => prevFishes.filter(fish => fish.id !== id));
  };

  return (
    <View style={styles.gameContainer}>
      <StatusBar style="light" />
      <Text style={commonStyles.title}>🎣 Jogo da Pescaria Junina 🎣</Text>
      <Text style={commonStyles.subtitle}>Toque nos peixes para pescar!</Text>
      <Text style={styles.scoreText}>Pontuação: {score}</Text>

      {gameStarted ? (
        <TouchableOpacity style={styles.stopButton} onPress={stopGame}>
          <Text style={commonStyles.buttonText}>Parar Jogo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={commonStyles.buttonText}>Iniciar Jogo</Text>
        </TouchableOpacity>
      )}

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

const styles = StyleSheet.create({
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
  scoreText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
  },
});
