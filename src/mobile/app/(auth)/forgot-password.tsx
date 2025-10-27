import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await resetPassword(email.trim());
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mt-10">
        <Text className="mb-2 text-3xl font-outfit text-gray-900">
          Recuperar senha
        </Text>
        <Text className="text-gray-600 font-dmsans">
          Informe seu e-mail para receber as instruções
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
        <TouchableOpacity
          onPress={onSubmit}
          disabled={loading}
          className="rounded-lg bg-red-500 p-4"
        >
          <Text className="text-center font-outfit font-semibold text-white">
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
