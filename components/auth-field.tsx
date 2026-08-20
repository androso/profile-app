import { Feather } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type AuthFieldProps = TextInputProps & {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  labelRight?: ReactNode;
  accessory?: ReactNode;
};

export function AuthField({
  label,
  icon,
  labelRight,
  accessory,
  ...inputProps
}: AuthFieldProps) {
  return (
    <View className="mb-[15px]">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm text-gray-700">{label}</Text>
        {labelRight}
      </View>
      <View className="h-12 flex-row items-center rounded-lg border border-[#D1D5D8] px-3">
        <Feather name={icon} size={20} color="#9CA3AF" />
        <TextInput
          className="ml-2 h-full flex-1 text-sm text-gray-900"
          placeholderTextColor="#B4B7BD"
          {...inputProps}
        />
        {accessory}
      </View>
    </View>
  );
}
