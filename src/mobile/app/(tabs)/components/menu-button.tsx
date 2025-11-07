import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

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
            <Text className="text-[12px] text-white font-dmsans mt-1">
              {badge}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-[14px] mt-1 font-outfit">{label}</Text>
    </TouchableOpacity>
  );
}
