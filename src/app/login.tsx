import { Link, router } from 'expo-router'; 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email.trim() && senha.trim()) {
      router.push('/dashboard');
    } else {
      alert('Por favor, preencha o e-mail e a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image2.png')} style={styles.image} />
      <Text style={styles.title}>DentalCare</Text>
      <Text style={styles.subtitle}>Preencha os dados para login</Text>

      <Text style={styles.label}>Digite seu e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCadastro}>
          <Link href="/cadastro">
            <Text style={styles.buttonTextCadastro}>Cadastro</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogar} onPress={handleLogin}>
          <Text style={styles.buttonTextLogar}>Logar</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonCadastro: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A5DAD2',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonTextCadastro: {
    color: '#A5DAD2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonLogar: {
    flex: 1,
    backgroundColor: '#A5DAD2',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonTextLogar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;