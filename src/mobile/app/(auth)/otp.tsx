import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function Otp() {
  const { signInWithOtp, verifyOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      await signInWithOtp(email.trim());
      setSent(true);
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async () => {
    try {
      setLoading(true);
      await verifyOtp(email.trim(), token.trim());
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
          Entrar com código
        </Text>
        <Text className="text-gray-600 font-dmsans">
          Receba um código por e-mail
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
        {sent && (
          <TextInput
            value={token}
            onChangeText={setToken}
            placeholder="Código"
            autoCapitalize="none"
            className="rounded-lg border border-gray-300 p-4 font-dmsans"
          />
        )}
        {!sent ? (
          <TouchableOpacity
            onPress={sendOtp}
            disabled={loading}
            className="rounded-lg bg-red-500 p-4"
          >
            <Text className="text-center font-outfit font-semibold text-white">
              Enviar código
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onVerify}
            disabled={loading}
            className="rounded-lg bg-red-500 p-4"
          >
            <Text className="text-center font-outfit font-semibold text-white">
              Verificar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
