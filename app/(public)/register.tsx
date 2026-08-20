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
import { useRegister } from '@/src/auth/viewmodels/use-register';

export default function RegisterScreen() {
  const router = useRouter();
  const {
    fullName,
    setFullName,
    lastname,
    setLastname,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    errorMessage,
    handleRegister,
  } = useRegister();

  const submitRegistration = async () => {
    const registered = await handleRegister();

    if (registered) {
      router.replace('/(public)');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center p-6 pt-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            className="rounded-[14px] border border-gray-100 bg-white p-6"
            style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            <Text className="mb-5 text-center text-2xl font-bold text-gray-800">
              Create an account
            </Text>

            <AuthError message={errorMessage} />

            <AuthField
              label="Full Name"
              icon="user"
              placeholder="John Doe"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />

            <AuthField
              label="Last Name"
              icon="user"
              placeholder="Smith"
              autoCapitalize="words"
              value={lastname}
              onChangeText={setLastname}
            />

            <AuthField
              label="Phone"
              icon="phone"
              placeholder="555 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <AuthField
              label="Confirm Password"
              icon="shield"
              placeholder="*************"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color="#006C47" />
            ) : (
              <TouchableOpacity
                className="h-12 items-center justify-center rounded-lg bg-[#006C47]"
                onPress={submitRegistration}
              >
                <Text className="text-base font-bold text-white">Register</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm text-gray-500">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(public)')}>
              <Text className="ml-1 text-sm font-bold text-[#006C47]">Login Here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
