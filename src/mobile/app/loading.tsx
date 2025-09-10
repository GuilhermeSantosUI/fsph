import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simula carregamento por 3 segundos e depois navega para a tela principal
    const timer = setTimeout(() => {
      router.replace('/(tabs)/main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      
      {/* Logo centralizada */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/icon-blood.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // Usar tamanho natural da imagem
  },
});
