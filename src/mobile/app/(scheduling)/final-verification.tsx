import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import { ArrowsClockwiseIcon, DropIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FinalVerificationScreen() {
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const canSubmit = acceptedTerms && captchaAnswer === '8';

  const handleSubmit = () => {
    if (canSubmit) {
      router.replace('/(tabs)');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <AppHeader title="Agendamento" onBack={() => router.back()} />

        <View className="flex-1 px-6 py-8">
          <Text className="text-[28px] font-semibold text-black mb-4 font-outfit leading-9">
            Verificações Finais
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Complete as verificações finais para confirmar seu agendamento.
          </Text>

          <View className="mb-6 p-5 bg-gray-50 rounded-xl">
            <TouchableOpacity
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              className="flex-row items-start"
            >
              <View
                className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center mt-0.5 ${
                  acceptedTerms
                    ? 'bg-[#e11d48] border-[#e11d48]'
                    : 'border-gray-300'
                }`}
              >
                {acceptedTerms && (
                  <Text className="text-white text-[14px] font-bold">✓</Text>
                )}
              </View>
              <Text className="flex-1 text-[14px] text-gray-700 leading-5 font-dmsans">
                Li e aceito os{' '}
                <Text className="text-[#e11d48] underline">
                  termos de privacidade e proteção de dados
                </Text>{' '}
                para processar minhas informações pessoais relacionadas à doação
                de sangue.
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-8 p-5 bg-gray-50 rounded-xl">
            <Text className="text-[16px] font-medium text-black mb-4 font-outfit">
              Resolva a verificação:
            </Text>
            <View className="flex-row items-center gap-4">
              <View className="bg-white border border-gray-300 rounded-lg px-6 py-4 flex-1">
                <Text className="text-[24px] font-semibold text-center text-black font-outfit">
                  10 - 2 =
                </Text>
              </View>
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-6 py-4 text-[24px] text-center w-24 font-outfit"
                placeholder="?"
                placeholderTextColor="#9CA3AF"
                value={captchaAnswer}
                onChangeText={setCaptchaAnswer}
                keyboardType="numeric"
                maxLength={2}
              />
              <TouchableOpacity className="w-12 h-12 items-center justify-center bg-gray-200 rounded-lg">
                <ArrowsClockwiseIcon size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6 border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-lg flex-row justify-center gap-2 py-4 px-8 mb-3 w-full items-center ${
            canSubmit ? 'bg-[#e11d48]' : 'bg-gray-300'
          }`}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          <DropIcon size={20} color="#FFF" />
          <Text className="text-white font-medium text-[18px] font-outfit">
            Agendar Doação
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-lg border border-gray-200 py-4 px-8 w-full items-center"
          onPress={handleGoBack}
        >
          <Text className="text-black font-normal text-[18px] font-outfit">
            Voltar ao início
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
