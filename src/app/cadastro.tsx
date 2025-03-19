import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CadastroScreen = () => {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image2.png')}
        style={styles.image}
      />
      <Text style={styles.title}>DentalCare</Text>
      <Text style={styles.subtitle}>Preencha os dados para cadastro</Text>

      <Text style={styles.label}>Digite seu e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Digite seu nome de usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Digite sua senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Confirme sua senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={"#aaa"}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        />

      <TouchableOpacity style={styles.buttonCadastrar}>
        <Text style={styles.buttonTextCadastrar}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.logarUser}>Já possui uma conta? <Link style={styles.logarLink} href="/login">Logar</Link></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    borderRadius: 10,
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  buttonCadastrar: {
    width: '100%',
    backgroundColor: '#A5DAD2',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 25
  },
  buttonTextCadastrar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logarUser: {
    marginTop: 10,
    color: '#fff',
    fontSize: 12
  },
  logarLink: {
    color: '#A5DAD2'
  }
});

export default CadastroScreen;