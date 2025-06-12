import { SafeAreaView, StyleSheet, Text, View, Image, useColorScheme, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/Colors';

const Index = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        {require('../assets/images/pet.jpg') ? (
          <Image
            source={require('../assets/images/pet.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.card}>
          <Text style={[styles.title, { color: theme.title }]}>Pet Food Shop Admin</Text>
          <Text style={[styles.post, { color: theme.text }]}>
            Manage your pet shop with ease!
          </Text>
          <Link href="/login" style={[styles.link, { color: theme.primary }]}>
            <Text style={styles.linkText}>Log In</Text>
          </Link>
          <Link href="/sign-in" style={[styles.link, { color: theme.primary }]}>
            <Text style={styles.linkText}>Sign Up</Text>
          </Link>
          <Link href="/about" style={[styles.link, { color: theme.primary }]}>
            <Text style={styles.linkText}>About</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

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
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  post: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
  },
  link: {
    marginVertical: 8,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});