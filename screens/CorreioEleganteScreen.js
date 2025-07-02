// screens/CorreioEleganteScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Dimensions, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { commonStyles } from '../constants/styles'; // Importa estilos comuns

const { width } = Dimensions.get('window');

export default function CorreioEleganteScreen() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const sendMessage = () => {
    if (recipient.trim() === '' || message.trim() === '') {
      Alert.alert('Ops!', 'Por favor, preencha o destinatário e a mensagem.');
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      recipient: recipient.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
    };
    setSentMessages([...sentMessages, newMessage]);
    setRecipient('');
    setMessage('');
    Alert.alert('Sucesso!', 'Sua mensagem elegante foi enviada! 🎉');
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <StatusBar style="light" />
      <Text style={commonStyles.title}>💌 Correio Elegante Digital 💌</Text>
      <Text style={commonStyles.subtitle}>Envie um recado para aquele "alguém" especial!</Text>

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

        <TouchableOpacity style={commonStyles.button} onPress={sendMessage}>
          <Text style={commonStyles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Mensagens Recebidas</Text>
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

const styles = StyleSheet.create({
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
});
