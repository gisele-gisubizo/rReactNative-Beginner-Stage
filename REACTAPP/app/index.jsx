import { SafeAreaView, StyleSheet, Text, View, useColorScheme, useWindowDimensions, Image } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/Colors.jsx';
import { MaterialIcons } from '@expo/vector-icons';

const Index = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 600 ? 600 : width }]}>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
          <Image
            source={require('../assets/images/column.jpg')}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <Text style={[styles.title, { color: theme.title }]}>News Column</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Your trusted source for the latest news articles
          </Text>
          <View style={styles.linksContainer}>
            <Link href="/login" style={styles.link}>
              <View style={styles.linkContent}>
                <MaterialIcons name="login" size={20} color={theme.primary} />
                <Text style={[styles.linkText, { color: theme.primary }]}>Log In</Text>
              </View>
            </Link>
            <Link href="/sign-in" style={styles.link}>
              <View style={styles.linkContent}>
                <MaterialIcons name="person-add" size={20} color={theme.primary} />
                <Text style={[styles.linkText, { color: theme.primary }]}>Sign Up</Text>
              </View>
            </Link>
            <Link href="/about" style={styles.link}>
              <View style={styles.linkContent}>
                <MaterialIcons name="info" size={20} color={theme.primary} />
                <Text style={[styles.linkText, { color: theme.primary }]}>About</Text>
              </View>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Times New Roman',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  linksContainer: {
    width: '100%',
    alignItems: 'center',
  },
  link: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Index;