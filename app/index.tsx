import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Link, Redirect } from 'expo-router';
import { Text, View } from 'react-native';

function Home() { const { signOut } = useAuth(); const { user } = useUser(); return <View className="flex-1 items-center justify-center gap-4 bg-slate-950 px-6"><Text className="text-3xl font-bold text-white">Welcome to Recurrly</Text><Text className="text-slate-300">{user?.primaryEmailAddress?.emailAddress}</Text><Link href="/sign-in" onPress={() => signOut()} className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white">Sign out</Link></View>; }
export default function Index() { return <><SignedIn><Home /></SignedIn><SignedOut><Redirect href="/sign-in" /></SignedOut></>; }
