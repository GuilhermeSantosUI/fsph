import Badge from '@/components/badge';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PodiumImg from '../../assets/images/podium.png';

const ranking = [
  { name: 'Guilherme Santos', lives: 32, initial: 'G' },
  { name: 'Eduarda Moreira', lives: 24, initial: 'E' },
  { name: 'Julia Fernandes', lives: 21, initial: 'J' },
  { name: 'Marta Morante', lives: 20, initial: 'M' },
  { name: 'João Matheus', lives: 13, initial: 'J' },
  { name: 'Dorante Marlon', lives: 6, initial: 'D' },
  { name: 'Gloria Martins', lives: 2, initial: 'G' },
];

function getBadgeLevel(lives: number) {
  if (lives >= 30) return 'champion';
  if (lives >= 21) return 'diamond';
  if (lives >= 16) return 'platinum';
  if (lives >= 11) return 'gold';
  if (lives >= 6) return 'silver';
  return 'bronze';
}

export default function RankingView() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="py-6 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 flex items-center justify-center"
        >
          <CaretLeftIcon size={18} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-black font-outfit">
          Ranking
        </Text>
        <View className="w-8 h-8 opacity-0">
          <CaretLeftIcon size={18} />
        </View>
      </View>

      <Image
        style={{ width: 100, height: 100, marginBottom: 'auto' }}
        source={PodiumImg}
        contentFit="contain"
      />

      <Text className="text-[34px] text-black leading-none mb-4 font-outfit">
        Vidas!
      </Text>

      <Text className="text-[18px] text-[#A0A0A0] mb-6 font-dmsans">
        Essa é a gamificação da nossa plataforma para interagir os usuários que
        mais realizaram doações de sangue.
      </Text>

      <View className="flex-1">
        {ranking.map((item, idx) => (
          <TouchableOpacity
            key={item.name}
            className="flex-row items-center py-2 px-1 mb-1 active:bg-gray-100 rounded-xl"
            activeOpacity={0.8}
          >
            <View className="relative mr-3">
              <View className="w-14 h-14 rounded-full bg-black items-center justify-center">
                <Text className="text-white text-[22px] font-outfit">
                  {item.initial}
                </Text>
              </View>
              <Badge
                level={getBadgeLevel(item.lives)}
                size={24}
                className="absolute -bottom-1 -right-2"
              />
            </View>
            <View className="flex-1 pb-2 flex-row items-center justify-between">
              <View>
                <Text className="text-[20px] text-black leading-tight font-outfit">
                  {item.name}
                </Text>
                <Text className="text-[16px] text-[#A0A0A0] font-dmsans">
                  {item.lives} Vidas
                </Text>
              </View>
            </View>
            <Text className="text-[#A0A0A0] text-[22px] ml-2">›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
