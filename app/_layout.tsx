import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import '../global.css';
import { AuthProvider, useAuth } from './src/context/AuthContext';

function NavigationGuard() {
  const { token, isLoadingSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    const inProtectedScreen = segments[0] === '(protected)';

    if (token) {
      if (!inProtectedScreen) {
        router.replace('/dashboard');
      }
      return;
    }

    if (inProtectedScreen) {
      router.replace('/');
    }
  }, [token, isLoadingSession, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(protected)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
    </AuthProvider>
  );
}
