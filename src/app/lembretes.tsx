import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';

interface Lembrete {
  id: string;
  texto: string;
  data: Date;
  hora: Date;
}

const Lembretes: React.FC = () => {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [texto, setTexto] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [lembreteEditando, setLembreteEditando] = useState<Lembrete | null>(null);

  // Carrega lembretes do AsyncStorage ao iniciar
  useEffect(() => {
    const carregarLembretes = async () => {
      try {
        const lembretesSalvos = await AsyncStorage.getItem('@lembretes');
        if (lembretesSalvos) {
          const lembretesParseados = JSON.parse(lembretesSalvos);
          const lembretesFormatados = lembretesParseados.map((lembrete: any) => ({
            ...lembrete,
            data: new Date(lembrete.data),
            hora: new Date(lembrete.hora)
          }));
          setLembretes(lembretesFormatados);
        }
      } catch (error) {
        console.error('Erro ao carregar lembretes:', error);
      }
    };

    carregarLembretes();
  }, []);

  // Salva lembretes no AsyncStorage sempre que a lista muda
  useEffect(() => {
    const salvarLembretes = async () => {
      try {
        await AsyncStorage.setItem('@lembretes', JSON.stringify(lembretes));
      } catch (error) {
        console.error('Erro ao salvar lembretes:', error);
      }
    };

    salvarLembretes();
  }, [lembretes]);

  const selecionarData = () => setShowDatePicker(true);
  const selecionarHora = () => setShowTimePicker(true);

  const combinarDataHora = () => {
    const novaDataHora = new Date(data);
    novaDataHora.setHours(hora.getHours(), hora.getMinutes());
    return novaDataHora;
  };

  const salvarLembrete = () => {
    if (!texto.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um texto para o lembrete.');
      return;
    }

    const dataHoraFinal = combinarDataHora();
    const agora = new Date();

    if (dataHoraFinal <= agora) {
      Alert.alert('Atenção', 'A data e horário devem ser no futuro.');
      return;
    }

    if (lembreteEditando) {
      setLembretes(lembretes.map((lembrete) =>
        lembrete.id === lembreteEditando.id ? { ...lembrete, texto, data, hora } : lembrete
      ));
    } else {
      const novoLembrete = {
        id: Date.now().toString(),
        texto,
        data,
        hora
      };
      setLembretes([...lembretes, novoLembrete]);
    }

    setModalVisible(false);
    setTexto('');
    setData(new Date());
    setHora(new Date());
    setLembreteEditando(null);
  };

  const excluirLembrete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este lembrete?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            setLembretes(lembretes.filter((lembrete) => lembrete.id !== id));
          },
        },
      ]
    );
  };

  const editarLembrete = (lembrete: Lembrete) => {
    setLembreteEditando(lembrete);
    setTexto(lembrete.texto);
    setData(new Date(lembrete.data));
    setHora(new Date(lembrete.hora));
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lembretes</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            setLembreteEditando(null);
            setTexto('');
            setData(new Date());
            setHora(new Date());
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={lembretes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.lembreteCard}>
            <View style={styles.lembreteContent}>
              <Text style={styles.lembreteTexto}>{item.texto}</Text>
              <Text style={styles.lembreteHorario}>
                {item.data.toLocaleDateString()} às {item.hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <View style={styles.lembreteActions}>
              <TouchableOpacity onPress={() => editarLembrete(item)}>
                <Ionicons name="pencil" size={20} color="#86A0A6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirLembrete(item.id)}>
                <Ionicons name="trash" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum lembrete cadastrado</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {lembreteEditando ? 'Editar Lembrete' : 'Criar Lembrete'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Texto do Lembrete"
              value={texto}
              onChangeText={setTexto}
              multiline
            />
            
            <TouchableOpacity style={styles.dateButton} onPress={selecionarData}>
              <Text>Data: {data.toLocaleDateString()}</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setData(selectedDate);
                }}
              />
            )}
            
            <TouchableOpacity style={styles.dateButton} onPress={selecionarHora}>
              <Text>Hora: {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            
            {showTimePicker && (
              <DateTimePicker
                value={hora}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setHora(selectedTime);
                }}
              />
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={salvarLembrete}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333',
  },
  addButton: {
    backgroundColor: '#A5DAD2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  lembreteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lembreteContent: {
    flex: 1,
  },
  lembreteTexto: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  lembreteHorario: { 
    fontSize: 14, 
    color: '#666' 
  },
  lembreteActions: {
    flexDirection: 'row',
    gap: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16
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
    padding: 20, 
    borderRadius: 10 
  },
  modalTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center'
  },
  input: { 
    backgroundColor: '#f0f0f0', 
    padding: 12, 
    borderRadius: 6, 
    marginBottom: 15,
    fontSize: 16
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    flex: 1,
    marginRight: 10,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#86A0A6',
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});

export default Lembretes;