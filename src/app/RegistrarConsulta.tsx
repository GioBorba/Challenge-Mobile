import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Footer from '../components/footer';
import Header from '../components/header';

const RegistrarConsulta: React.FC = () => {
  const [tipoTratamento, setTipoTratamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegistrar = () => {
    if (!tipoTratamento.trim() || !descricao.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaConsulta = {
      id: Date.now().toString(), 
      tipo: tipoTratamento,
      descricao: descricao,
      data: data.toLocaleDateString(),
    };

    
    router.push({
      pathname: '/ListarConsultas',
      params: { novaConsulta: JSON.stringify(novaConsulta) },
    });
  };

  const handleCancelar = () => {
    router.push('/dashboard');
  };

  const onChangeData = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>Registrar Consulta</Text>

      <Text style={styles.label}>Tipo de Tratamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Limpeza, Clareamento"
        value={tipoTratamento}
        onChangeText={setTipoTratamento}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Observações sobre a consulta"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Data da Consulta</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onChangeData}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelar}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegistrar} onPress={handleRegistrar}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 7,
    padding: 13,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonCancelar: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonRegistrar: {
    backgroundColor: '#A5DAD2',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegistrarConsulta;