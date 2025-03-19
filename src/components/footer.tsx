import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      {/* Ícone para Consultas Registradas */}
      <Link href="ListarConsultas" asChild>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="list" size={24} color="#fff" />
          <Text style={styles.iconText}>Consultas</Text>
        </TouchableOpacity>
      </Link>

      {/* Ícone para Dicas */}
      <Link href="/dicas" asChild>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bulb" size={24} color="#fff" />
          <Text style={styles.iconText}>Dicas</Text>
        </TouchableOpacity>
      </Link>

      {/* Ícone para Lembretes */}
      <Link href="/lembretes" asChild>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="alarm" size={24} color="#fff" />
          <Text style={styles.iconText}>Lembretes</Text>
        </TouchableOpacity>
      </Link>

      {/* Ícone para Registrar Consulta */}
      <Link href="/RegistrarConsulta" asChild>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.iconText}>Registrar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#86A0A6',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#A5DAD2',
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0
    
  },
  iconButton: {
    alignItems: 'center',
    padding: 10
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Footer;