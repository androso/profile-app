import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { PostHogProvider } from 'posthog-react-native';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
  if (!clerkKey || !posthogKey) throw new Error('Set Clerk and PostHog environment variables');
  return <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}><PostHogProvider apiKey={posthogKey} options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com' }}><Stack screenOptions={{ headerShown: false }} /></PostHogProvider></ClerkProvider>;
}
