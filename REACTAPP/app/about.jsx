import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/Colors.jsx';
import { useTheme } from './utils/useTheme';

const About = () => {
  const colorScheme = useTheme();
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.title, { color: theme.title }]}>About News Column</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Since 2020, we've been delivering the latest news articles. Log in to manage your newsroom or sign up for exclusive access!
          </Text>
          <Link href="/" style={[styles.link, { color: theme.primary }]}>
            <Text style={styles.linkText}>Back to Home</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  card: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
  },
  link: {
    marginVertical: 10,
    padding: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default About;