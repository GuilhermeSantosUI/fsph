import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DonorDataScreen() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const canContinue =
    cpf.length > 0 &&
    fullName.length > 0 &&
    birthDate.length > 0 &&
    email.length > 0 &&
    phone.length > 0;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(scheduling)/donation-location');
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
            Dados do Doador
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Preencha seus dados pessoais para continuarmos com o agendamento.
          </Text>

          <View className="mb-4">
            <Text className="text-[14px] font-medium text-black mb-2 font-outfit">
              CPF
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-[16px] font-dmsans"
              placeholder="Digite seu CPF"
              placeholderTextColor="#9CA3AF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4">
            <Text className="text-[14px] font-medium text-black mb-2 font-outfit">
              Nome Completo
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-[16px] font-dmsans"
              placeholder="Digite seu nome completo"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-[14px] font-medium text-black mb-2 font-outfit">
              Data de Nascimento
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-[16px] font-dmsans"
              placeholder="dd/mm/aaaa"
              placeholderTextColor="#9CA3AF"
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>

          <View className="mb-4">
            <Text className="text-[14px] font-medium text-black mb-2 font-outfit">
              E-mail
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-[16px] font-dmsans"
              placeholder="seuemail@email.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-8">
            <Text className="text-[14px] font-medium text-black mb-2 font-outfit">
              Telefone
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-[16px] font-dmsans"
              placeholder="Digite seu telefone"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-6 border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-lg py-4 px-8 mb-3 w-full items-center ${
            canContinue ? 'bg-[#e11d48]' : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <Text className="text-white font-medium text-[18px] font-outfit">
            Continuar
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
