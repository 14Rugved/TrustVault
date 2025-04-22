import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="Upload" options={{ headerShown: false }} />
      <Stack.Screen name="UploadDoc" options={{ headerShown: false }} />
    </Stack>
  );
} 