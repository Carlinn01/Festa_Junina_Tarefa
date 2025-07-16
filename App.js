import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CardapioJuninoScreen from './screens/CardapioJuninoScreen';
import QuizJuninoScreen from './screens/QuizJuninoScreen';
import SobreScreen from './screens/SobreScreen';  // Importando a tela Sobre

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="light" />
      <Image
        source={{ uri: 'https://www.estadao.com.br/resizer/v2/ERQABUGGY5GEJJMXPNOAE6DTHQ.jpeg?quality=80&auth=41f8ca8e7306a611389ce44665daec5105a127f4f4f3ecd113615e5b09da5cf0&width=1075&height=527&focal=3164,2278' }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>🎉 Viva a Festa Junina! </Text>
      <Text style={styles.subtitle}>O IFC-Videira te convida para a melhor festa do ano!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cardápio Junino')}
      >
        <Text style={styles.buttonText}>🌽 Cardápio Junino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quiz Junino')}
      >
        <Text style={styles.buttonText}>🤔 Quiz Junino</Text>
      </TouchableOpacity>

      {/* Adicionando o botão "Sobre" */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Sobre')}
      >
        <Text style={styles.buttonText}>ℹ️ Sobre</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#8B4513' },
          headerTintColor: '#FFD700',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Festa Junina do Ifc' }} />
        <Stack.Screen name="Cardápio Junino" component={CardapioJuninoScreen} options={{ title: 'Nosso Cardápio 🌽' }} />
        <Stack.Screen name="Quiz Junino" component={QuizJuninoScreen} options={{ title: 'Teste seus Conhecimentos! 🤔' }} />
        <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre a Festa Junina' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    color: '#A0522D',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#A0522D',
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
