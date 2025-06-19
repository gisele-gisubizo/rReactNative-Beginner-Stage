import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '../constants/Colors';
import * as Font from 'expo-font';
import { AuthProvider } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import NavigationBar from '../components/NavigationBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  const router = useRouter();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (MaterialIcons.font) {
          await Font.loadAsync(MaterialIcons.font);
        } else {
          console.warn('MaterialIcons.font is undefined, skipping font loading');
        }
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
          Appearance.setColorScheme(savedTheme);
        }
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts or theme:', error);
        setFontsLoaded(true);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors[theme].background },
          headerTintColor: Colors[theme].text,
          headerRight: () => (
            <MaterialIcons
              name="info"
              size={24}
              color={Colors[theme].text}
              onPress={() => router.push('/about')}
              style={{ marginRight: 15 }}
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: true }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign Up', headerShown: true }} />
        <Stack.Screen name="pet-foods" options={{ title: 'Pet Foods', headerShown: true }} />
        <Stack.Screen name="food-details" options={{ title: 'Pet Food Details', headerShown: true }} />
        <Stack.Screen name="crud" options={{ title: 'Manage Pet Foods', headerShown: true }} />
        <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: true }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: true }} />
        <Stack.Screen name="about" options={{ title: 'About', headerShown: true }} />
      </Stack>
      <NavigationBar />
    </AuthProvider>
  );
}