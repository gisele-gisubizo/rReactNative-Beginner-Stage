import { Stack, Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkInitialRoute = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log('AppLayout check:', { path: router.pathname, token });
      if (!token && !['/login', '/splashScreen', '/register', '/OTPVerificationScreen'].includes(router.pathname)) {
        router.replace('/login');
      }
    };
    checkInitialRoute();
  }, [router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splashScreen" />
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="register" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="OTPVerificationScreen" options={{ title: 'Verify OTP' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('TabLayout auth check:', { token, currentPath: router.pathname });
        if (!token) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6a11cb',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          borderTopWidth: 1,
          height: 60,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pollsScreen"
        options={{
          title: 'Polls',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// ⬅️ Export TabLayout for Expo Router to recognize it!
export { TabLayout };
