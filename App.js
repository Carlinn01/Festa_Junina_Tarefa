import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Importa os estilos comuns padrão do App
import { commonStyles } from './constants/styles';

// Importa as telas
import CardapioJuninoScreen from './screens/CardapioJuninoScreen';
import QuizJuninoScreen from './screens/QuizJuninoScreen';
import CorreioEleganteScreen from './screens/CorreioEleganteScreen';
import JogoDaPescariaScreen from './screens/JogoDaPescariaScreen';

// 1. Tela Inicial (Home Screen)
function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <StatusBar style="light" />
      <Image
        source={{ uri: 'https://www.estadao.com.br/resizer/v2/ERQABUGGY5GEJJMXPNOAE6DTHQ.jpeg?quality=80&auth=41f8ca8e7306a611389ce44665daec5105a127f4f4f3ecd113615e5b09da5cf0&width=1075&height=527&focal=3164,2278' }}
        style={commonStyles.headerImage}
      />
      <Text style={commonStyles.title}>🎉 Viva a Festa Junina! 🎉</Text>
      <Text style={commonStyles.subtitle}>O IFC-Videira te convida para a melhor festa do ano!</Text>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Cardápio Junino')}
      >
        <Text style={commonStyles.buttonText}>🌽 Cardápio Junino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Quiz Junino')}
      >
        <Text style={commonStyles.buttonText}>🤔 Quiz Junino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Correio Elegante')}
      >
        <Text style={commonStyles.buttonText}>💌 Correio Elegante</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Jogo da Pescaria')}
      >
        <Text style={commonStyles.buttonText}>🎣 Jogo da Pescaria</Text>
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
          headerStyle: {
            backgroundColor: '#8B4513', // Cor de madeira
          },
          headerTintColor: '#FFD700', // Cor dourada/amarela
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Festa Junina da Escola' }}
        />
        <Stack.Screen
          name="Cardápio Junino"
          component={CardapioJuninoScreen}
          options={{ title: 'Nosso Cardápio 🌽' }}
        />
        <Stack.Screen
          name="Quiz Junino"
          component={QuizJuninoScreen}
          options={{ title: 'Teste seus Conhecimentos! 🤔' }}
        />
        <Stack.Screen
          name="Correio Elegante"
          component={CorreioEleganteScreen}
          options={{ title: 'Seu Recado Junino! 💌' }}
        />
        <Stack.Screen
          name="Jogo da Pescaria"
          component={JogoDaPescariaScreen}
          options={{ title: 'Pegue os Peixes! 🎣' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
