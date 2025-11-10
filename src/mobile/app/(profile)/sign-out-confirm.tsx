import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignOutConfirm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    try {
      setLoading(true);
      // try to sign out from supabase if available
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore if not configured
        console.warn('supabase signOut error', e);
      }

      await AsyncStorage.removeItem('authToken');
      router.replace('/sign-in');
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Não foi possível sair da conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6">
        <View>
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-lg">‹</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-outfit font-semibold mb-4">
            Tem certeza que deseja sair?
          </Text>
          <Text className="text-gray-600 mb-6">
            Ao sair, você terá que realizar login novamente para acessar sua
            conta.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={loading}
            className="rounded-lg border border-gray-300 p-4 mb-3"
          >
            <Text className="text-center">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignOut}
            disabled={loading}
            className="rounded-lg bg-red-500 p-4"
          >
            <Text className="text-center text-white">Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
