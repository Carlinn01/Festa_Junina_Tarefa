// constants/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    flexGrow: 1, // Para permitir ScrollView em algumas telas
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
});
