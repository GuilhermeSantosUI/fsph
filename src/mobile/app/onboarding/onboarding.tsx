import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type MiniIcon = keyof typeof MaterialCommunityIcons.glyphMap;

type Slide = {
  key: string;
  title: string;
  description: string;
  icon: MiniIcon;

  accent: string;
  bg: string;
  cards: { icon: MiniIcon; text: string }[];
  variant: 'donors' | 'places' | 'tracking';
  extras?: {
    nearby?: string;
    center?: string;
    donors?: string[];
  };
};

export default function Onboarding() {
  const shadow = {
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  } as const;

  const slides: Slide[] = useMemo(
    () => [
      {
        key: '1',
        title: 'Doe sangue, salve vidas',
        description:
          'Descubra como é simples fazer a diferença. Conecte-se a campanhas e bancos de sangue perto de você.',
        icon: 'blood-bag',
        accent: '#ef4444',
        bg: '#fef2f2',
        cards: [
          { icon: 'account-heart', text: '+1 vida impactada' },
          { icon: 'hospital-building', text: 'Hemocentro próximo' },
        ],
        variant: 'donors',
        extras: { donors: ['Ana', 'Paulo', 'Lia'] },
      },
      {
        key: '2',
        title: 'Encontre campanhas',
        description:
          'Receba avisos sobre eventos e postos de doação conforme seu perfil e localização.',
        icon: 'hospital-marker',
        accent: '#f59e0b',
        bg: '#fffbeb',
        cards: [
          { icon: 'calendar-clock', text: 'Campanhas hoje' },
          { icon: 'map-marker-radius', text: 'Perto de você' },
        ],
        variant: 'places',
        extras: {
          nearby: 'Hemocentro Central • 1,2 km',
          center: 'Santa Casa • 2,4 km',
        },
      },
      {
        key: '3',
        title: 'Acompanhe suas doações',
        description:
          'Monitore o histórico, elegibilidade e lembretes no período certo para sua próxima doação.',
        icon: 'calendar-heart',
        accent: '#10b981',
        bg: '#ecfdf5',
        cards: [
          { icon: 'check-decagram', text: 'Próxima elegibilidade' },
          { icon: 'bell-badge-outline', text: 'Lembrete ativado' },
        ],
        variant: 'tracking',
        extras: {
          nearby: 'Ponto de coleta • 1,1 km',
          center: 'Campanha sábado • 10:00',
        },
      },
    ],
    []
  );

  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const floatA = useRef(new Animated.Value(0)).current;
  const floatB = useRef(new Animated.Value(1)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloat = (value: Animated.Value, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 2600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad) as any,
            delay,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 2600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.quad) as any,
          }),
        ])
      );

    const loopA = createFloat(floatA);
    const loopB = createFloat(floatB, 600);
    loopA.start();
    loopB.start();
    return () => {
      loopA.stop();
      loopB.stop();
    };
  }, [floatA, floatB]);

  useEffect(() => {
    contentAnim.setValue(0);
    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic) as any,
    }).start();
  }, [index, contentAnim]);

  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      if (viewableItems?.length) {
        const next = viewableItems[0].index;
        if (typeof next === 'number') setIndex(next);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goNext = () => {
    if (index < slides.length - 1) {
      Haptics.selectionAsync();
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.replace('/sign-in');
    }
  };

  const skip = () => {
    Haptics.selectionAsync();
    router.replace('/sign-in');
  };

  const Hero = ({
    icon,
    accent,
    bg,
    i,
    cards,
    variant,
    extras,
  }: {
    icon: Slide['icon'];
    accent: string;
    bg: string;
    i: number;
    cards: Slide['cards'];
    variant: Slide['variant'];
    extras?: Slide['extras'];
  }) => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [40, 0, -40],
      extrapolate: 'clamp',
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const floatUp = floatA.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6],
    });
    const floatDown = floatB.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 6],
    });

    const DonorStack = () => (
      <Animated.View
        className="absolute -top-2 -left-8"
        style={{ transform: [{ translateY: floatUp }] }}
      >
        <View className="flex-row items-center">
          {[0, 1, 2].map((idx) => (
            <View
              key={idx}
              className="-ml-2 h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: accent + '22' }}
            >
              <MaterialCommunityIcons
                name="account-heart"
                size={16}
                color={accent}
              />
            </View>
          ))}
        </View>
        <Text className="mt-1 text-[10px] font-dmsans text-gray-700">
          {extras?.donors?.join(', ') || 'Doadores ativos'}
        </Text>
      </Animated.View>
    );

    const NearbyPill = ({ label }: { label?: string }) => (
      <Animated.View
        className="absolute top-20 -right-16 rounded-full bg-white px-3 py-1"
        style={[shadow, { transform: [{ translateY: floatDown }] }]}
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons name="map-marker" size={16} color={accent} />
          <Text className="text-xs font-dmsans text-gray-700">
            {label || 'Perto de você'}
          </Text>
        </View>
      </Animated.View>
    );

    const CenterCard = ({ label }: { label?: string }) => (
      <Animated.View
        className="absolute -bottom-3 -right-8 rounded-2xl bg-white px-3 py-2"
        style={[
          shadow,
          { transform: [{ rotate: '-2deg' }, { translateY: floatUp }] },
        ]}
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="hospital-building"
            size={18}
            color={accent}
          />
          <Text className="font-dmsans text-xs text-gray-700">
            {label || 'Hemocentro'}
          </Text>
        </View>
      </Animated.View>
    );

    return (
      <Animated.View
        style={{ transform: [{ translateX }, { scale }] }}
        className="items-center justify-center"
      >
        <View
          className="relative mb-8 h-48 w-48 items-center justify-center rounded-full"
          style={[shadow, { backgroundColor: bg }]}
        >
          <MaterialCommunityIcons name={icon} size={88} color={accent} />

          <Animated.View
            style={{
              transform: [{ rotate: '-6deg' }, { translateY: floatUp }],
            }}
            className="absolute -right-6 -top-3 rounded-2xl bg-white px-3 py-2"
          >
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name={cards[0]?.icon || 'information'}
                size={18}
                color={accent}
              />
              <Text className="font-dmsans text-xs text-gray-700">
                {cards[0]?.text}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              transform: [{ rotate: '7deg' }, { translateY: floatDown }],
            }}
            className="absolute -bottom-3 -left-6 rounded-2xl bg-white px-3 py-2"
          >
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name={cards[1]?.icon || 'information'}
                size={18}
                color={accent}
              />
              <Text className="font-dmsans text-xs text-gray-700">
                {cards[1]?.text}
              </Text>
            </View>
          </Animated.View>

          {variant === 'donors' && <DonorStack />}
          {variant !== 'donors' && <NearbyPill label={extras?.nearby} />}
          {variant !== 'donors' && <CenterCard label={extras?.center} />}
        </View>
      </Animated.View>
    );
  };

  const renderItem = ({ item, index: i }: ListRenderItemInfo<Slide>) => {
    const translateY = contentAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    });
    const opacity = contentAnim;

    return (
      <View style={{ width }} className="flex-1 px-6">
        <View className="flex-1 items-center justify-center">
          <Hero
            icon={item.icon}
            accent={item.accent}
            bg={item.bg}
            i={i}
            cards={item.cards}
            variant={item.variant}
            extras={item.extras}
          />

          <Animated.Text
            style={{ opacity, transform: [{ translateY }] }}
            className="mb-2 mt-2 text-center text-3xl font-outfit font-semibold text-gray-900"
          >
            {item.title}
          </Animated.Text>
          <Animated.Text
            style={{ opacity, transform: [{ translateY }] }}
            className="text-center text-base font-dmsans leading-6 text-gray-600"
          >
            {item.description}
          </Animated.Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Animated.FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <View className="mb-4 mt-2 flex-row items-center justify-center gap-2">
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                width: dotWidth,
                opacity,
                backgroundColor:
                  i === index ? slides[index]?.accent : '#D1D5DB',
              }}
              className="h-2 rounded-full"
            />
          );
        })}
      </View>

      <View className="mb-6 flex-row items-center justify-between px-6">
        <TouchableOpacity onPress={skip} accessibilityRole="button">
          <Text className="text-base font-dmsans text-gray-500">Pular</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goNext}
          className="rounded-full px-6 py-3"
          style={{ backgroundColor: slides[index]?.accent || '#ef4444' }}
          accessibilityRole="button"
        >
          <Text className="font-outfit font-semibold text-white">
            {index === slides.length - 1 ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
