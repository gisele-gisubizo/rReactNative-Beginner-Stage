import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors.jsx';
import { useAuth } from '../context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from './utils/useTheme';

const ArticleDetails = () => {
  const colorScheme = useTheme();
  const theme = Colors[colorScheme];
  const { user } = useAuth();
  const { title, body, date, postedBy } = useLocalSearchParams();
  const summary = body ? body.substring(0, 100) + (body.length > 100 ? '...' : '') : 'N/A'; // Generate summary from body

  useEffect(() => {
    if (!user) {
      console.log('User not authenticated, redirecting to /login');
    }
    console.log('Received params:', { title, body, date, postedBy });
  }, [user]);

  if (!user || !title) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>No details available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>{title}</Text>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Summary</Text>
          <Text style={[styles.text, { color: theme.text }]}>{summary}</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Full Article</Text>
          <Text style={[styles.text, { color: theme.text }]}>{body || 'No content available'}</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Published</Text>
          <Text style={[styles.text, { color: theme.text }]}>{date ? new Date(date).toLocaleDateString() : 'N/A'}</Text>
          {user.role === 'admin' && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Posted By</Text>
              <Text style={[styles.text, { color: theme.text }]}>{postedBy || 'Unknown'}</Text>
            </>
          )}
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
    padding: 20,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  card: {
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default ArticleDetails;