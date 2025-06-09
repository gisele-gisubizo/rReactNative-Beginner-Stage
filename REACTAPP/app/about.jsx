import { SafeAreaView, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const router = useRouter();

  const handleProtectedNavigation = (path) => {
    if (user) {
      router.push(path);
    } else {
      router.push('/login');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <Text style={[styles.title, { color: theme.title }]}>About Pet Food Shop</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          We started in 2020 with a passion for pets, aiming to provide the best food and care products.
          Login to stay updated on exclusive discounts and new arrivals!
        </Text>
        <Link href="/" style={[styles.link, { color: theme.text, borderBottomColor: theme.text }]}>
          <Text>Back to Home</Text>
        </Link>
        <Link
          href="/settings"
          style={[styles.link, { color: theme.text, borderBottomColor: theme.text }]}
          onPress={() => handleProtectedNavigation('/settings')}
        >
          <Text>Settings</Text>
        </Link>
        <Link
          href="/crud"
          style={[styles.link, { color: theme.text, borderBottomColor: theme.text }]}
          onPress={() => handleProtectedNavigation('/crud')}
        >
          <Text>Manage Pets</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 20 },
  text: { textAlign: 'center', marginBottom: 20 },
  link: { marginVertical: 10, borderBottomWidth: 1 },
});