import Badge from '@/components/badge';
import {
  CaretRightIcon,
  DropIcon,
  FileTextIcon,
  GearIcon,
  HandPalmIcon,
  QuestionIcon,
  SignOutIcon,
  UsersIcon,
} from 'phosphor-react-native';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="py-6 items-center">
        <Text className="text-xl font-semibold text-black font-outfit">
          Perfil
        </Text>
      </View>

      <View className="flex-row items-center justify-between px-1 mb-6">
        <View className="flex-row items-center">
          <View className="relative mr-4">
            <View className="w-20 h-20 bg-black rounded-full items-center justify-center">
              <Text className="text-white text-5xl font-outfit">G</Text>
            </View>

            <Badge
              level="diamond"
              size={36}
              className="absolute -bottom-2 -right-2"
            />
          </View>

          <View>
            <Text className="text-3xl font-outfit">Guilherme</Text>
            <Text className="text-gray-400 mt-1">Cidadão</Text>
          </View>
        </View>
      </View>

      <View className="border-t border-gray-100" />

      <View className="mt-4">
        {[
          { label: 'Configurações da conta', Icon: GearIcon },
          { label: 'Farmácia Popular', Icon: DropIcon },
          { label: 'Privacidade', Icon: HandPalmIcon },
          { label: 'Receber ajuda', Icon: QuestionIcon },
          { label: 'Indicar para um amigo', Icon: UsersIcon },
          { label: 'Juridico', Icon: FileTextIcon },
          { label: 'Sair da conta', Icon: SignOutIcon },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            className="flex-row items-center justify-between py-5"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              {item.Icon ? (
                <View className="mr-4">
                  <item.Icon size={28} color="#111" weight="regular" />
                </View>
              ) : (
                <Text className="text-2xl mr-4">⚙️</Text>
              )}
              <Text className="text-base font-outfit">{item.label}</Text>
            </View>

            <Text className="text-gray-300">
              <CaretRightIcon size={16} />
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
