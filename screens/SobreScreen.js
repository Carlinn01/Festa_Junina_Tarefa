import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.titulo}>Sobre este App</Text>
      <Text style={styles.subtitulo}>Informações:</Text>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemName}>Desenvolvedores:</Text>
        <Text style={styles.menuItemDetails}>André Felipe e Carlos Eduardo</Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemName}>Turma:</Text>
        <Text style={styles.menuItemDetails}>Info 3B</Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemName}>Disciplina:</Text>
        <Text style={styles.menuItemDetails}>Programação Mobile</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD700',
    flex: 1, 
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 15,  
  },
  subtitulo: {
    fontSize: 22,
    color: '#A0522D',
    textAlign: 'center',
    marginVertical: 10,
  },
  menuItem: {
    backgroundColor: '#F5DEB3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D2B48C',
    width: width * 0.9, 
    flexWrap: 'wrap', 
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    flex: 1,  
  },
  menuItemDetails: {
    fontSize: 20,
    color: '#A0522D',
    marginLeft: 10,
    flexWrap: 'wrap', 
  },
  infoButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoButtonText: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
