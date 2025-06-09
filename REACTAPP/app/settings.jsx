import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { Appearance } from 'react-native';
import { useRouter } from 'expo-router';

const Settings = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    Appearance.setColorScheme(newTheme);
    router.replace('/'); // Refresh to apply theme
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <Text style={[styles.title, { color: Colors[theme].title }]}>Settings</Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: Colors[theme].text }]}>Dark Mode</Text>
          <Switch
            onValueChange={toggleTheme}
            value={theme === 'dark'}
            trackColor={{ false: '#767577', true: Colors[theme].title }}
            thumbColor={theme === 'dark' ? Colors[theme].background : '#f4f3f4'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  text: { marginRight: 10 },
});