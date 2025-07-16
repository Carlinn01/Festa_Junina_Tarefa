import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const initialMenuItems = [
  { name: 'Pipoca', price: 'R$ 5', icon: '🍿', ingrediente:'milho de pipoca, óleo e sal.'},
  { name: 'Maçã do Amor', price: 'R$ 4', icon: '🍎', ingrediente:'maçã, açúcar, corante vermelho, vinagre e palitos de madeira.' },
  { name: 'Quentão (sem álcool)', price: 'R$ 8', icon: '🍷', ingrediente:'cachaça, gengibre, açúcar, cravo, canela e casca de laranja.' },
  { name: 'Cachorro Quente', price: 'R$ 9', icon: '🌭', ingrediente:'pão, salsicha, molho de tomate, cebola e batata palha (opcional).' },
  { name: 'Milho Cozido', price: 'R$ 6', icon: '🌽', ingrediente:'espigas de milho e sal.' },
  { name: 'Paçoca', price: 'R$ 3', icon: '🥜', ingrediente:'amendoim torrado, açúcar e farinha de mandioca (ou farinha de milho).' },
];

function MenuItem({ item }) {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemIcon}>{item.icon}</Text>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Ingredientes', ` ${item.ingrediente}`)}>
        <Text style={styles.infoButton}>ℹ️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CardapioJuninoScreen() {
  const [menuItems] = useState(initialMenuItems);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.titulo}>Cardápio da Festa Junina</Text>
            <Text style={styles.subtitulo}>Experimente:</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD700', 
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 22,
    color: '#A0522D',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
    width: width * 0.9, //mantem o tamanho padrão dependendo da tela
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
  },
  menuItemIcon: {
    fontSize: 50,
    marginRight: 15,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  menuItemPrice: {
    fontSize: 20,
    color: '#A0522D',
  },
  infoButton: {
    fontSize: 30,
    color: '#4682B4', 
    marginLeft: 10,
  },
});
