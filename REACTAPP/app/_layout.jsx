import { Stack, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AuthProvider, useAuth } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

const AuthenticatedTabs = ({ theme }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name={focused ? 'dashboard' : 'dashboard'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crud"
        options={{
          title: 'Manage Pets',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name={focused ? 'edit' : 'edit'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name={focused ? 'settings' : 'settings'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  const { user } = useAuth();
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
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
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
          headerRight: () => (
            <MaterialIcons
              name="info"
              size={24}
              color={Colors[theme].text}
              onPress={() => router.push('/about')}
            />
          ),
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'About',
            headerShown: true,
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={24}
                color={Colors[theme].text}
                onPress={() => router.push('/')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: true,
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={24}
                color={Colors[theme].text}
                onPress={() => router.push('/')}
              />
            ),
          }}
          listeners={{
            beforeEnter: () => {
              if (!user) {
                router.push('/login');
                return false;
              }
              return true;
            },
          }}
        />
        <Stack.Screen
          name="crud"
          options={{
            title: 'Manage Pets',
            headerShown: true,
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={24}
                color={Colors[theme].text}
                onPress={() => router.push('/')}
              />
            ),
          }}
          listeners={{
            beforeEnter: () => {
              if (!user) {
                router.push('/login');
                return false;
              }
              return true;
            },
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            headerShown: true,
            headerRight: () => (
              <MaterialIcons
                name="home"
                size={24}
                color={Colors[theme].text}
                onPress={() => router.push('/')}
              />
            ),
          }}
          listeners={{
            beforeEnter: () => {
              if (!user) {
                router.push('/login');
                return false;
              }
              return true;
            },
          }}
        />
        <AuthenticatedTabs theme={theme} />
      </Stack>
    </AuthProvider>
  );
}