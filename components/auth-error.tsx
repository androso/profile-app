import { Text, View } from 'react-native';

type AuthErrorProps = {
  message: string | null;
};

export function AuthError({ message }: AuthErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <View className="mb-5 rounded-lg border border-[#FC5A5A] bg-[#FEF2F2] p-3">
      <Text className="text-center text-[15px] font-medium text-red-600">{message}</Text>
    </View>
  );
}
