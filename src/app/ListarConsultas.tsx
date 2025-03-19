import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Footer from '../components/footer'; 
import Header from '../components/header'; 

interface Consulta {
  id: string;
  tipo: string;
  descricao: string;
  data: string;
}

const ListarConsultas: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([
    { id: '1', tipo: 'Limpeza', descricao: 'Limpeza completa', data: '2023-10-25' },
    { id: '2', tipo: 'Clareamento', descricao: 'Sessão 1 de 3', data: '2023-10-30' },
  ]);

  return (
    <View style={styles.container}>
  
      <Header showBackButton={true} />

      <Text style={styles.title}>Minhas Consultas</Text>

      {consultas.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma consulta registrada.</Text>
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.consultaCard}>
              <Text style={styles.consultaTipo}>{item.tipo}</Text>
              <Text style={styles.consultaDescricao}>{item.descricao}</Text>
              <Text style={styles.consultaData}>Data: {item.data}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/registrar-consulta')}>
        <Text style={styles.buttonText}>Registrar Nova Consulta</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20, 
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
    padding: 20
  },
  consultaCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  consultaTipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  consultaDescricao: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  consultaData: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#A5DAD2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListarConsultas;