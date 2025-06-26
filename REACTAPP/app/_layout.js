import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="screens/EditProfileScreen"
        options={{ title: 'Community Survey' }}
      />
    </Stack>
  );
}