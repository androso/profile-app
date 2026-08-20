import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthError } from '@/components/auth-error';
import { AuthField } from '@/components/auth-field';
import { useLogin } from '@/src/auth/viewmodels/use-login';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errorMessage,
    isPasswordVisible,
    togglePasswordVisibility,
    handleLogin,
  } = useLogin();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F4]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center p-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6 items-center">
            <View className="mb-1 h-[50px] w-[50px] items-center justify-center rounded-2xl bg-[#00B074]">
              <Feather name="shopping-bag" size={22} color="#FFFFFF" />
            </View>
            <Text className="text-[32px] font-bold text-[#006C47]">Recurrly</Text>
            <Text className="text-[15px] text-gray-500">
              Welcome back! Please enter your details
            </Text>
          </View>

          <View
            className="rounded-[14px] border border-gray-100 bg-white p-6"
            style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            <AuthError message={errorMessage} />

            <AuthField
              label="Email Address"
              icon="mail"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <AuthField
              label="Password"
              icon="lock"
              placeholder="*************"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              labelRight={
                <TouchableOpacity>
                  <Text className="font-semibold text-[#006C47]">Forgot Password?</Text>
                </TouchableOpacity>
              }
              accessory={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Feather
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              }
            />

            {isLoading ? (
              <ActivityIndicator size="large" color="#006C47" />
            ) : (
              <TouchableOpacity
                className="h-12 items-center justify-center rounded-lg bg-[#006C47]"
                onPress={handleLogin}
              >
                <Text className="text-base font-bold text-white">Login</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="mt-8 flex-row justify-center gap-2">
            <Text className="text-sm text-gray-500">Don&apos;t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(public)/register')}>
              <Text className="text-sm font-bold text-[#006C47]">Sign up for free</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
