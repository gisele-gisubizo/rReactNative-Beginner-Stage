import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const { initial } = useGlobalSearchParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('RootLayout auth check:', { token, initialRoute: router.pathname });
        if (initial && !token) {
          router.replace('/splashScreen');
        } else if (token) {
          router.replace('/(tabs)');
        } else {
          router.replace('/splashScreen');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/splashScreen');
      } finally {
        setIsReady(true);
      }
    };
    if (initial !== undefined) checkAuth();
  }, [initial, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6A0DAD" />
      </View>
    );
  }

  return null;
}
