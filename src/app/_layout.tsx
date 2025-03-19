import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="index" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dashboard" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="cadastro" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="lembretes" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="login" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="ListarConsultas" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="RegistrarConsulta" options= {{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dicas" options= {{headerShown: false}}></Stack.Screen>
        
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86A0A6',
  },
});