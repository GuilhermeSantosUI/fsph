import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  CaretLeftIcon,
  DotsThreeOutlineIcon,
  HeartIcon,
  PaperPlaneTiltIcon,
} from 'phosphor-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FSPHImg from '../../assets/images/fsph.png';

const posts = [
  {
    user: {
      name: 'euguilhermelima',
      initial: 'G',
      verified: false,
      time: '2h atrás',
    },
    image: null,
    text: 'Salvando vidas! Primeira doação do ano. ',
    hashtag: '#doarsalvavidas',
    likes: '8.4K',
    shares: '1.4K',
  },
  {
    user: {
      name: 'FSPH',
      initial: 'F',
      verified: true,
      time: '2h atrás',
      logo: FSPHImg,
    },
    image: null,
    text: 'Nosso horário de funcionamento: De segunda a sexta-feira das 7h30 às 17h.',
    hashtag: '',
    likes: '8.4K',
    shares: '1.4K',
  },
];

export default function Community() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="px-6">
        <View className="py-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 flex items-center justify-center"
          >
            <CaretLeftIcon size={18} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-black font-outfit">
            Comunidade
          </Text>
          <View className="w-8 h-8 opacity-0">
            <CaretLeftIcon size={18} />
          </View>
        </View>

        <View className="flex-1">
          {posts.map((post, idx) => (
            <View key={idx} className="mb-8">
              <View className="flex-row items-center mb-2">
                {post.user.logo ? (
                  <Image
                    source={post.user.logo}
                    className="w-10 h-10 rounded-full bg-white mr-3"
                    contentFit="contain"
                  />
                ) : (
                  <View className="w-14 h-14 rounded-full bg-black items-center justify-center mr-3">
                    <Text className="text-white text-[22px] font-outfit">
                      {post.user.initial}
                    </Text>
                  </View>
                )}
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-black text-[18px] mr-1 font-outfit">
                      {post.user.name}
                    </Text>
                    {post.user.verified && (
                      <Text className="ml-1 text-[16px]">✔️</Text>
                    )}
                  </View>
                  <Text className="text-[#A0A0A0] text-[14px] font-dmsans">
                    {post.user.time}
                  </Text>
                </View>
                <DotsThreeOutlineIcon size={24} color="#A0A0A0" weight="bold" />
              </View>

              <View className="rounded-2xl overflow-hidden mb-2 w-full h-64 bg-gray-200" />

              <Text className="text-[18px] text-black mb-1 font-dmsans">
                {post.text}
                {post.hashtag && (
                  <Text className="text-[#e11d48] underline font-outfit">
                    {post.hashtag}
                  </Text>
                )}
              </Text>

              <View className="flex-row items-center mt-2">
                <TouchableOpacity className="flex-row items-center mr-6 active:opacity-60">
                  <HeartIcon size={24} color="#e11d48" weight="fill" />
                  <Text className="text-[16px] text-[#222] ml-1 font-dmsans">
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center active:opacity-60">
                  <PaperPlaneTiltIcon size={22} color="#8C8C8C" weight="bold" />
                  <Text className="text-[16px] text-[#222] ml-1 font-dmsans">
                    {post.shares}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
