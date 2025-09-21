import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Onboarding2Screen() {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('/loading');
  };

  const handleLogin = () => {
    router.push('/loading');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Ilustração principal */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/images/img-onboarding2.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Plataforma Integrada para{'\n'}
          doadores de sangue.
        </Text>
        
        <Text style={styles.subtitle}>
          Buscar e doar sangue agora ficou mais{'\n'}
          fácil com o aplicativo da FSPH.
        </Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
          <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  illustration: {
    width: width * 0.8,
    height: height * 0.4,
  },
  content: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 50,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#C53030',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C53030',
  },
  secondaryButtonText: {
    color: '#C53030',
    fontSize: 18,
    fontWeight: '600',
  },
});
