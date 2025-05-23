import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../components/footer';
import Header from '../components/header';

interface Consulta {
  id: string;
  tipo: string;
  descricao: string;
  data: string;
}

const ListarConsultas: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const carregarConsultas = async () => {
    try {
      const consultasSalvas = await AsyncStorage.getItem('consultas');
      const lista = consultasSalvas ? JSON.parse(consultasSalvas) : [];
      setConsultas(lista);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  const excluirConsulta = (id: string) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir esta consulta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              const novasConsultas = consultas.filter(c => c.id !== id);
              setConsultas(novasConsultas);
              await AsyncStorage.setItem('consultas', JSON.stringify(novasConsultas));
            } catch (error) {
              console.error('Erro ao excluir consulta:', error);
              Alert.alert('Erro', 'Não foi possível excluir a consulta');
            }
          }
        }
      ]
    );
  };


  useFocusEffect(
    React.useCallback(() => {
      carregarConsultas();
    }, [])
  );

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

              <View style={styles.actionsContainer}>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => excluirConsulta(item.id)}
                >
                  <Text style={styles.actionText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/RegistrarConsulta')}>
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
    padding: 20,
  },
  consultaCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50', // verde
  },
  deleteButton: {
    backgroundColor: '#F44336', // vermelho
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListarConsultas;
