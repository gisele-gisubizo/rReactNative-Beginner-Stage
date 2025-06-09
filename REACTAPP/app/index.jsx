import { SafeAreaView, StyleSheet, Text, View, Image, useColorScheme, useWindowDimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';

const Index = () => {
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
        <Image
          source={require('../assets/images/pet.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.title }]}>Welcome to Pet Food Shop Admin Portal</Text>
        <Text style={[styles.post, { color: theme.text }]}>
          Your one-stop shop for premium pet food and supplies!
        </Text>
        <Link href="/login" style={[styles.link, { color: theme.text, borderBottomColor: theme.text }]}>
          <Text>Log In</Text>
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

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: '100%', height: 200, marginBottom: 20 },
  title: { fontWeight: 'bold', fontSize: 24, textAlign: 'center' },
  post: { marginVertical: 10, textAlign: 'center' },
  link: { marginVertical: 10, borderBottomWidth: 1 },
});