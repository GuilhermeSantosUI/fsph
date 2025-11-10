import AppHeader from '@/components/app-header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PreScreeningScreen() {
  const router = useRouter();
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const [weighsOver50, setWeighsOver50] = useState<boolean | null>(null);
  const [hasTattoo, setHasTattoo] = useState<boolean | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const canContinue =
    firstTime !== null &&
    weighsOver50 !== null &&
    hasTattoo !== null &&
    gender !== null;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(scheduling)/donor-data');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  // CardOption substitui RadioOption para melhor usabilidade mobile
  const CardOption = ({
    label,
    selected,
    onPress,
    icon,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
    icon?: React.ReactNode;
  }) => (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center mb-3 px-4 py-4 rounded-lg border ${
        selected ? 'border-[#e11d48] bg-[#fbe7ee]' : 'border-gray-200 bg-white'
      }`}
      style={{ elevation: selected ? 2 : 0 }}
    >
      {icon && <View className="mr-3">{icon}</View>}
      <Text
        className={`text-[16px] font-dmsans ${selected ? 'text-[#e11d48] font-bold' : 'text-black'}`}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="px-6">
        <AppHeader title="Agendamento" onBack={() => router.back()} />

        <View className="flex-1 py-8">
          <Text className="text-[28px] font-semibold text-black mb-4 font-outfit leading-9">
            Pré-triagem
          </Text>
          <Text className="text-[16px] text-gray-500 mb-8 font-dmsans leading-6">
            Responda às perguntas abaixo para verificar sua elegibilidade para
            doação de sangue.
          </Text>

          <View className="mb-6">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Primeira vez doando sangue?
            </Text>
            <CardOption
              label="Sim"
              selected={firstTime === true}
              onPress={() => setFirstTime(true)}
            />
            <CardOption
              label="Não"
              selected={firstTime === false}
              onPress={() => setFirstTime(false)}
            />
          </View>

          <View className="mb-6">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Você pesa mais de 50 kg?
            </Text>
            <CardOption
              label="Sim"
              selected={weighsOver50 === true}
              onPress={() => setWeighsOver50(true)}
            />
            <CardOption
              label="Não"
              selected={weighsOver50 === false}
              onPress={() => setWeighsOver50(false)}
            />
          </View>

          <View className="mb-6">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Fez tatuagem/piercing em local não certificado pela ANVISA nos
              últimos 12 meses?
            </Text>
            <CardOption
              label="Sim"
              selected={hasTattoo === true}
              onPress={() => setHasTattoo(true)}
            />
            <CardOption
              label="Não"
              selected={hasTattoo === false}
              onPress={() => setHasTattoo(false)}
            />
          </View>

          <View className="mb-8">
            <Text className="text-[16px] font-medium text-black mb-3 font-outfit">
              Sexo
            </Text>
            <CardOption
              label="Masculino"
              selected={gender === 'male'}
              onPress={() => setGender('male')}
            />
            <CardOption
              label="Feminino"
              selected={gender === 'female'}
              onPress={() => setGender('female')}
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
