import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="screens/register"
        options={{ title: 'Community Survey' }}
      />
    </Stack>
  );
}