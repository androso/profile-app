import { Link } from 'expo-router';
import { Text, View } from 'react-native';
export default function SignUp() { return <View className="flex-1 items-center justify-center bg-slate-950 px-6"><Text className="text-2xl font-bold text-white">Sign-up flow ready</Text><Text className="mt-3 text-center text-slate-300">Add your Clerk sign-up fields here.</Text><Link href="/sign-in" className="mt-6 text-indigo-300">Back to sign in</Link></View>; }
