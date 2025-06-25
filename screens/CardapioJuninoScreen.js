// screens/CardapioJuninoScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { commonStyles } from '../constants/styles'; // Importa estilos comuns

const { width } = Dimensions.get('window');

const initialMenuItems = [
  { id: '1', name: 'Pipoca', price: 'R$ 5', icon: '🍿',ingrediente:'milho de pipoca, óleo e sal.', isFavorite: false },
  { id: '3', name: 'Maçã do Amor', price: 'R$ 4', icon: '🍎',ingrediente:'maçã, açúcar, corante vermelho, vinagre e palitos de madeira.', isFavorite: false },
  { id: '4', name: 'Pamonha', price: 'R$ 6', icon: '🌽',ingrediente:'milho verde, leite, açúcar (ou sal, se for salgada), manteiga e palha de milho.', isFavorite: false },
  { id: '5', name: 'Quentão (sem álcool)', price: 'R$ 8', icon: '🍷',ingrediente:'cachaça, gengibre, açúcar, cravo, canela e casca de laranja.', isFavorite: false },
  { id: '6', name: 'Cachorro Quente', price: 'R$ 9', icon: '🌭',ingrediente:'pão, salsicha, molho de tomate, cebola e batata palha (opcional).', isFavorite: false },
  { id: '7', name: 'Milho Cozido', price: 'R$ 6', icon: '🌽',ingrediente:'espigas de milho e sal.', isFavorite: false },
  { id: '8', name: 'Paçoca', price: 'R$ 3', icon: '🥜',ingrediente:'amendoim torrado, açúcar e farinha de mandioca (ou farinha de milho).', isFavorite: false },
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
      <TouchableOpacity onPress={() => Alert.alert('Ingredientes', ` ${item.ingrediente}`)}>
        <Text style={styles.infoButton}>ℹ️</Text>
      </TouchableOpacity>
      {/* Botão de favorito */}
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text style={styles.favoriteButton}>{item.isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
}



export default function CardapioJuninoScreen() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const toggleFavorite = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar style="light" />
      <Text style={commonStyles.title}>Cardápio da Roça! 😋</Text>
      <Text style={commonStyles.subtitle}>Delícias para você se esbaldar!</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} toggleFavorite={toggleFavorite} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  favoriteButton: {
    fontSize: width * 0.06,
    marginLeft: 10,
  },
});
