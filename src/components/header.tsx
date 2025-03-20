import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  showBackButton?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ showBackButton = true }) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/image.png')} 
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 30,
    backgroundColor: '#86A0A6', 
  },
  backButton: {
    zIndex: 1,
  },
  logoContainer: {
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default Header;