import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { Appearance } from 'react-native';


const Settings = () => {
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  const themeStyles = Colors[theme];
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
          setIsDarkMode(savedTheme === 'dark');
          Appearance.setColorScheme(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, [user, router]);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
      Appearance.setColorScheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <Text style={[styles.title, { color: themeStyles.title }]}>Settings</Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: themeStyles.text }]}>Dark Mode</Text>
          <Switch
            onValueChange={toggleTheme}
            value={isDarkMode}
            trackColor={{ false: '#767577', true: themeStyles.primary }}
            thumbColor={isDarkMode ? themeStyles.background : '#f4f3f4'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});