import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Onboarding1Screen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/schedule');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Imagem de fundo */}
      <ImageBackground
        source={require('../assets/images/img-onboarding1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay escuro para melhor legibilidade */}
        <View style={styles.darkOverlay} />

        {/* Texto */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Encontre{'\n'}
            coragem. Doe{'\n'}
            sangue. Salve{'\n'}
            vidas.
          </Text>
        </View>

        {/* Botão de ação */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.35,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 44,
    textAlign: 'left',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#C53030',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
