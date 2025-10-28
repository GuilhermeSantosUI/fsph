import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);
      router.replace('/(tabs)');

      //   await signIn(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Erro ao entrar', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (e: any) {
      Alert.alert('Erro Google', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenTemplate className="flex-1 bg-white p-6">
      <View className="mt-10">
        <Text className="mb-2 text-3xl font-outfit text-gray-900">
          Bem-vindo
        </Text>
        <Text className="text-gray-600 font-dmsans">
          Entre com sua conta para continuar
        </Text>
      </View>

      <View className="mt-8 gap-4">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          className="rounded-lg border border-gray-300 p-4 font-dmsans"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
          className="rounded-lg border border-gray-300 p-4 font-dmsans"
        />

        <TouchableOpacity
          onPress={onSubmit}
          disabled={loading}
          className="rounded-lg bg-red-500 p-4"
        >
          <Text className="text-center font-outfit font-semibold text-white">
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onGoogle}
          disabled={loading}
          className="rounded-lg border border-gray-300 p-4"
        >
          <Text className="text-center font-outfit font-semibold text-gray-800">
            Continuar com Google
          </Text>
        </TouchableOpacity>

        <View className="mt-2 flex-row items-center justify-between">
          <Link href="/forgot-password" className="text-red-500">
            Esqueci minha senha
          </Link>
          <Link href="/sign-up" className="text-gray-700">
            Criar conta
          </Link>
        </View>
        <View className="mt-4 items-center">
          <Link href="/otp" className="text-gray-700">
            Entrar com código (OTP)
          </Link>
        </View>
      </View>
    </ScreenTemplate>
  );
}
