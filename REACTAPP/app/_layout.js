import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack >
      <Stack.Screen
        name="screens/register"
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="OTPVerificationScreen"
        options={{ title: 'Verify OTP' }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Sign In' }}
      />
    </Stack>
  );
}