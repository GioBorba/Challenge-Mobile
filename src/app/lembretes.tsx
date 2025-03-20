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
import Header from '../components/header';
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
  const [dataHoraAtual, setDataHoraAtual] = useState<Date | null>(null);

  // API que busca a data e hora atuais 
  useEffect(() => {
    const buscarDataHoraAtual = async () => {
      try {
        const response = await fetch(
          'https://www.timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo'
        );
        const data = await response.json();
        const dataHora = new Date(data.dateTime); 
        setDataHoraAtual(dataHora);
      } catch (error) {
        console.error('Erro ao buscar data e hora:', error);
        setDataHoraAtual(new Date()); 
      }
    };

    buscarDataHoraAtual();
  }, []);

  const selecionarData = () => setShowDatePicker(true);
  const selecionarHora = () => setShowTimePicker(true);

  const combinarDataHora = () => {
    const novaDataHora = new Date(data);
    novaDataHora.setHours(hora.getHours(), hora.getMinutes());
    return novaDataHora;
  };

  const salvarLembrete = () => {
    if (!texto.trim()) {
      alert('Por favor, insira um texto para o lembrete.');
      return;
    }

    const dataHoraFinal = combinarDataHora();

    if (dataHoraAtual && dataHoraFinal <= dataHoraAtual) {
      alert('A data e horário devem ser no futuro.');
      return;
    }

    if (lembreteEditando) {
      const novosLembretes = lembretes.map((lembrete) =>
        lembrete.id === lembreteEditando.id ? { ...lembrete, texto, data, hora } : lembrete
      );
      setLembretes(novosLembretes);
    } else {
      const novoLembrete = { id: Date.now().toString(), texto, data, hora };
      setLembretes([...lembretes, novoLembrete]);
    }

    setModalVisible(false);
    setTexto('');
    setData(new Date());
    setHora(new Date());
    setLembreteEditando(null);
  };

  const excluirLembrete = (id: string) => {
    setLembretes((prevLembretes) => prevLembretes.filter((lembrete) => lembrete.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Lembretes</Text>
      <FlatList
        data={lembretes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.lembreteCard}>
            <Text style={styles.lembreteTexto}>{item.texto}</Text>
            <Text style={styles.lembreteHorario}>Data: {item.data.toLocaleDateString()}</Text>
            <Text style={styles.lembreteHorario}>Hora: {item.hora.toLocaleTimeString()}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => excluirLembrete(item.id)}
            >
              <Ionicons name="trash" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonCreate} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Criar Lembrete</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{lembreteEditando ? 'Editar Lembrete' : 'Criar Lembrete'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Texto do Lembrete"
              value={texto}
              onChangeText={setTexto}
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
              <Text>Hora: {hora.toLocaleTimeString()}</Text>
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={salvarLembrete}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#86A0A6' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  lembreteCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lembreteTexto: { fontSize: 16, fontWeight: 'bold' },
  lembreteHorario: { fontSize: 14, color: '#555' },
  buttonCreate: {
    backgroundColor: '#A5DAD2',
    padding: 15,
    borderRadius: 5,
    margin: 50,
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { color: 'black' },
  input: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, marginBottom: 15 },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    flex: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#A5DAD2',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: { padding: 5 },
});

export default Lembretes;