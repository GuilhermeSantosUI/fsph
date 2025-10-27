import { Image } from 'expo-image';
import { View } from 'react-native';
import { badgeAssets, BadgeLevel } from './mock/badge-assets';

interface BadgeProps {
  level: BadgeLevel;
  size?: number;
  className?: string;
}

export default function Badge({ level, size = 24, className }: BadgeProps) {
  return (
    <View className={className} style={{ width: size, height: size }}>
      <Image
        source={badgeAssets[level]}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    </View>
  );
}
