// ...existing code will be moved here...
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PodiumImg from '../../assets/images/podium.png';

interface RankingModalProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function RankingModal({
  visible = false,
  onClose,
}: RankingModalProps) {
  const router = useRouter();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="p-2">
            <Text className="text-[#e11d48] text-[16px] font-outfit">
              Fechar
            </Text>
          </TouchableOpacity>
          <Text className="text-[18px] text-black font-outfit">Ranking</Text>
          <View className="w-16" />
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <Image
            style={{ width: 300, height: 300 }}
            source={PodiumImg}
            contentFit="contain"
          />

          <Text className="text-[32px] font-medium text-[#222] text-center mb-4 mt-8 font-outfit">
            Ranking de Doadores {'\n'} de Sangue
          </Text>
          <Text className="text-[18px] text-[#A0A0A0] text-center mb-9 leading-7 font-dmsans">
            Acompanhe sua posição, celebre sua solidariedade e inspire outras
            pessoas a salvar vidas junto com a FSPH e o Saúde+.{' '}
          </Text>
        </View>

        <View className="px-6 pb-6">
          <TouchableOpacity
            className="bg-[#e11d48] rounded-lg py-[14px] px-8 mb-4 w-full items-center"
            onPress={() => {
              onClose?.();
              router.push('/ranking/ranking-view');
            }}
          >
            <Text className="text-white font-medium text-[18px] font-outfit">
              Continuar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-lg border border-[#E5E5E5] py-[14px] px-8 w-full items-center"
            onPress={onClose}
          >
            <Text className="text-[#222] font-normal text-[18px] font-outfit">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
