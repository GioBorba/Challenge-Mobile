import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
      async function requestNotificationPermission() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permissão para notificações negada!');
        }
      }
  
      requestNotificationPermission();
    }, []);



  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image2.png')} 
        style={styles.logo}
      />

    
      <Text style={styles.welcomeText}>Bem-vindo ao DentalCare!</Text>
      <Text style={styles.subtitle}>Sua saúde bucal em primeiro lugar</Text>

      
      <View style={styles.linksContainer}>
        <Link href="/login" style={styles.link}>Logar</Link>
        <Link href="/dashboard" style={styles.link}>Cadastrar</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120, 
    height: 120,
    borderRadius: 20, 
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', 
  },
  link: {
    backgroundColor: '#A5DAD2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15, 
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    textDecorationLine: 'none', 
  },
});