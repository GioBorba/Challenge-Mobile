import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 
import Header from '../components/header';


interface Lembrete {
  id: string;
  texto: string;
  horario: Date;
}

const Lembretes: React.FC = () => {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [texto, setTexto] = useState(''); 
  const [horario, setHorario] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [lembreteEditando, setLembreteEditando] = useState<Lembrete | null>(null); 

  
  const agendarLembrete = (texto: string, horario: Date) => {
    const agora = new Date().getTime(); 
    const horarioTimestamp = horario.getTime(); 
    const intervalo = horarioTimestamp - agora; 

    if (intervalo <= 0) {
      alert('A data e horário selecionados já passaram. Escolha um horário futuro.');
      return;
    }

    
    setTimeout(() => {
      Alert.alert('Lembrete', texto, [{ text: 'OK' }]);
    }, intervalo);
  };

  
  const salvarLembrete = () => {
    if (!texto.trim()) {
      alert('Por favor, insira um texto para o lembrete.');
      return;
    }

    if (lembreteEditando) {
      
      const novosLembretes = lembretes.map((lembrete) =>
        lembrete.id === lembreteEditando.id ? { ...lembrete, texto, horario } : lembrete
      );
      setLembretes(novosLembretes);
    } else {
      
      const novoLembrete = { id: Date.now().toString(), texto, horario };
      setLembretes([...lembretes, novoLembrete]);
    }

    agendarLembrete(texto, horario); 
    setModalVisible(false); 
    setTexto(''); 
    setHorario(new Date()); 
    setLembreteEditando(null); 
  };

  const excluirLembrete = (id: string) => {
    setLembretes(lembretes.filter((lembrete) => lembrete.id !== id));
  };

  
  const editarLembrete = (lembrete: Lembrete) => {
    setLembreteEditando(lembrete);
    setTexto(lembrete.texto);
    setHorario(lembrete.horario);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Lembretes</Text>

      {lembretes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum lembrete cadastrado.</Text>
      ) : (
        <FlatList
          data={lembretes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lembreteCard}>
              <TouchableOpacity onPress={() => editarLembrete(item)}>
                <Text style={styles.lembreteTexto}>{item.texto}</Text>
                <Text style={styles.lembreteHorario}>
                  Data e Horário: {item.horario.toLocaleString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => excluirLembrete(item.id)}
              >
                <Ionicons name="trash" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Criar Lembrete</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {lembreteEditando ? 'Editar Lembrete' : 'Criar Lembrete'}
            </Text>

            
            <Text style={styles.label}>Texto do Lembrete</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Escovar os dentes"
              value={texto}
              onChangeText={setTexto}
            />
            <Text style={styles.label}>Data e Horário</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{horario.toLocaleString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={horario}
                mode="datetime" 
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setHorario(selectedDate);
                  }
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setLembreteEditando(null);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={salvarLembrete}
              >
                <Text style={styles.buttonText}>
                  {lembreteEditando ? 'Salvar Alterações' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
    padding: 30,
  },
  lembreteCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lembreteTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lembreteHorario: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  deleteButton: {
    padding: 5,
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
  buttonCreate: {
    backgroundColor: '#A5DAD2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 32,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#A5DAD2',
    flex: 1,
  },
});

export default Lembretes;