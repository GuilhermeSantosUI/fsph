import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CaretLeftIcon, DropIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BgCardImg from '../../assets/images/bg-card.png';
import CalendarImg from '../../assets/images/calendar.png';
import FSPHImg from '../../assets/images/fsph.png';
import PodiumImg from '../../assets/images/podium.png';
import SocialImg from '../../assets/images/social.png';
import SupportImg from '../../assets/images/support.png';
import AddToWalletModal from '../../components/add-to-wallet-modal';
import RankingModal from '../ranking/ranking-modal';

export default function HomeScreen() {
  const router = useRouter();
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [rankingModalVisible, setRankingModalVisible] = useState(false);

  const handleOpenWalletModal = () => {
    setWalletModalVisible(true);
  };

  const handleCloseWalletModal = () => {
    setWalletModalVisible(false);
  };

  const handleOpenRankingModal = () => {
    setRankingModalVisible(true);
  };

  const handleCloseRankingModal = () => {
    setRankingModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="px-6">
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <View className="py-6 flex-row items-center justify-between">
          <TouchableOpacity className="w-10 h-10 flex items-center justify-center">
            <CaretLeftIcon size={18} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-black font-outfit">
            Doações
          </Text>
          <View className="w-8 h-8 opacity-0">
            <CaretLeftIcon size={18} />
          </View>
        </View>

        <View className="rounded-2xl border-2 border-red-300 h-[230px] relative overflow-hidden bg-[#e11d48] px-6 py-6 mt-2 mb-8 w-full self-center shadow-md shadow-black/10">
          <Image
            source={BgCardImg}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 400,
              height: 230,
            }}
            contentFit="fill"
            pointerEvents="none"
          />
          <View
            className="flex-row justify-between items-start"
            style={{ zIndex: 1 }}
          >
            <View className="flex-row items-center space-x-2">
              <View>
                <Text className="text-white text-[24px] tracking-wide font-outfit font-bold">
                  FSPH
                </Text>
                <Text className="text-white text-[7px] mt-0 leading-tight font-dmsans">
                  Fundação de Saúde{'\n'}Parreiras Horta
                </Text>
              </View>

              <Image
                source={FSPHImg}
                style={{ width: 48, height: 48, marginRight: 8 }}
                contentFit="contain"
              />
            </View>
            <Text className="text-white text-[22px] mt-0.5 font-outfit">
              A+
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-7">
            <View className="flex-row w-full items-center justify-between">
              <Text className="text-white text-[16px] tracking-wide font-outfit">
                GUILHERME SANTOS
              </Text>
              <Text className="text-white text-[14px] opacity-70 mt-0.5 font-dmsans">
                ***.424.945-**
              </Text>
            </View>
          </View>
          <View className="mt-auto">
            <Text className="text-white text-[15px] opacity-90 font-dmsans">
              Você poderá doar em:
            </Text>
            <Text className="text-white text-[36px] mt-0.5 font-outfit font-bold">
              33 dias
            </Text>
          </View>

          <TouchableOpacity
            className="bg-white rounded-lg bottom-6 right-6 py-4 px-5 items-center justify-center absolute"
            activeOpacity={0.8}
            onPress={handleOpenWalletModal}
          >
            <Text className="text-[#e11d48] text-[14px] font-outfit">
              CARTEIRA
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex w-full justify-end rounded-xl">
          <Text
            style={[{ fontSize: 18, color: '#8C8C8C' }]}
            className="font-outfit"
          >
            Funções
          </Text>
        </View>

        <View className="py-5 pb-3">
          <View className="flex flex-row justify-between">
            <MenuButton
              label="Agendar"
              image={CalendarImg}
              onPress={() => router.push('/(scheduling)/appointment-type')}
            />

            <MenuButton
              label="Ranking"
              image={PodiumImg}
              onPress={handleOpenRankingModal}
            />

            <MenuButton label="Suporte" image={SupportImg} />

            <MenuButton
              label="Social"
              image={SocialImg}
              onPress={() => {
                router.push('/community/community');
              }}
            />
          </View>
        </View>

        <View className="flex-row w-full items-center justify-between rounded-xl py-6">
          <Text
            style={[{ fontSize: 18, color: '#8C8C8C' }]}
            className="font-outfit"
          >
            Histórico de doações
          </Text>

          <DropIcon size={20} color="#e11d48" />
        </View>

        <View className="w-full mb-2">
          <Text className="text-[16px] text-[#A0A0A0] mb-6 font-dmsans">
            Segunda-Feira 07/04/2025
          </Text>

          <View className="ml-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[18px] text-black font-outfit">
                E.M.E.F. José Conrado de Araújo
              </Text>
              <Text className="text-[16px] text-[#A0A0A0] font-dmsans">
                19:49
              </Text>
            </View>
            <Text className="text-[16px] text-[#E11D48] mt-1 font-dmsans">
              Rua Senador Rollemberg, 396 - São José, Aracaju - SE, 49015-120 ·
              Escola de ensino fundamental · 800,0 m
            </Text>
          </View>
        </View>

        <TouchableOpacity className="mt-5 bg-gray-100 p-3 rounded-lg">
          <Text className="text-center text-[#e11d48] font-outfit">
            Limpar bloodDonationModalSeen
          </Text>
        </TouchableOpacity>

        <AddToWalletModal
          visible={walletModalVisible}
          onClose={handleCloseWalletModal}
        />
        <RankingModal
          visible={rankingModalVisible}
          onClose={handleCloseRankingModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type MenuButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  label: string;
  image?: any;
  badge?: string;
  enabled?: boolean;
};

export function MenuButton({
  label,
  image,
  badge,
  enabled = true,
  className,
  disabled,
  activeOpacity,
  ...rest
}: MenuButtonProps) {
  const computedDisabled = disabled ?? !enabled;
  const computedActiveOpacity = activeOpacity ?? (enabled ? 0.7 : 1);
  const mergedClassName =
    `${className ?? ''} items-center w-full max-w-[76px] relative ${
      !enabled ? 'opacity-50' : ''
    }`.trim();

  return (
    <TouchableOpacity
      className={mergedClassName}
      activeOpacity={computedActiveOpacity}
      disabled={computedDisabled}
      {...rest}
    >
      <View className="bg-[#efefef] rounded-xl w-full py-3 flex items-center relative">
        <Image source={image} style={{ width: 44, height: 44 }} />
        {badge && (
          <View className="flex px-4 py-1 bg-[#0E82FD] rounded-full absolute -top-2">
            <Text
              style={{
                fontSize: 12,
                color: '#ffffff',
                marginTop: 3,
              }}
            >
              {badge}
            </Text>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 14, marginTop: 6 }} className="font-outfit">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
