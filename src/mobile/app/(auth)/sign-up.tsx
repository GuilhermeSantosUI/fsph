import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await signUp(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Erro ao criar conta', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mt-10">
        <Text className="mb-2 text-3xl font-outfit text-gray-900">
          Criar conta
        </Text>
        <Text className="text-gray-600 font-dmsans">
          Use seu e-mail para se cadastrar
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
            Cadastrar
          </Text>
        </TouchableOpacity>

        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-gray-600 font-dmsans">Já tem uma conta? </Text>
          <Link href="/sign-in" className="text-red-500">
            Entrar
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
