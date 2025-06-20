import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors.jsx';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { useTheme } from './utils/useTheme';

const Articles = () => {
  const colorScheme = useTheme();
  const theme = Colors[colorScheme];
  const { user, articles, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Articles useEffect:', { user, isLoading });
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const renderArticleItem = ({ item }) => {
    console.log('Rendering article:', item);
    const summary = item.body.substring(0, 100) + (item.body.length > 100 ? '...' : ''); // Take first 100 chars
    return (
      <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
        <Text style={[styles.articleTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.summary, { color: theme.text }]}>{summary}</Text>
        <Text style={[styles.date, { color: theme.text }]}>{new Date(item.date).toLocaleDateString()}</Text>
        <Pressable
          onPress={() => router.push({
            pathname: '/article-details',
            params: {
              title: item.title,
              summary: summary,
              body: item.body || 'No content available',
              date: item.date,
              postedBy: item.postedBy,
            },
          })}
          style={({ pressed }) => [
            styles.readMoreButton,
            { backgroundColor: pressed ? theme.primary + '99' : theme.primary },
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : theme.text }]}>Read More</Text>
          )}
        </Pressable>
      </View>
    );
  };

  if (!user && !isLoading) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>News Articles</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome, {user?.name || 'User'}!</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.text, { color: theme.text }]}>Loading articles...</Text>
          </View>
        ) : (
          <FlatList
            data={articles || []}
            renderItem={renderArticleItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={[styles.text, { color: theme.text }]}>No articles available.</Text>}
          />
        )}
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.logoutButton,
            { backgroundColor: pressed ? theme.primary + '99' : theme.primary },
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : theme.text }]}>Log Out</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  readMoreButton: {
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  logoutButton: {
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Articles;