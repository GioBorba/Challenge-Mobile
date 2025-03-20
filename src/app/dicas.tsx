import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import Footer from '../components/footer';

type IconName = 'water' | 'brush' | 'flask' | 'medkit' | 'nutrition';


interface Dica {
  id: string;
  icone: IconName; 
  texto: string;
}

const Dicas: React.FC = () => {
  
  const dicas: Dica[] = [
    { id: '1', icone: 'water', texto: 'Beba água para manter a boca hidratada.' },
    { id: '2', icone: 'brush', texto: 'Escove os dentes pelo menos 3 vezes ao dia.' },
    { id: '3', icone: 'flask', texto: 'Use enxaguante bucal para prevenir cáries.' },
    { id: '4', icone: 'medkit', texto: 'Visite o dentista a cada 6 meses.' },
    { id: '5', icone: 'nutrition', texto: 'Evite alimentos açucarados.' },
  ];

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/dashboard')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/image.png')} 
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Dicas de Saúde Bucal</Text>

      <FlatList
        data={dicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dicaCard}>
            <Ionicons name={item.icone} size={40} color="#A5DAD2" style={styles.dicaIcone} />
            <Text style={styles.dicaTexto}>{item.texto}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6',
    padding: 50
    
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 100, 
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
    marginBottom: 50,
    
  },
  dicaCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15, 
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    width: '100%', 
    height: 150, 
  },
  dicaIcone: {
    marginBottom: 10, 
  },
  dicaTexto: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default Dicas;