import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors.jsx';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

const Dashboard = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, articles, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalArticles: articles.length,
    totalAuthors: new Set(articles.map(a => a.postedBy)).size,
    activeUsers: 3, // Placeholder, update if backend provides
    recentActivity: articles.slice(0, 2).map(a => `Posted "${a.title}"`),
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/articles');
    }
    setStats({
      totalArticles: articles.length,
      totalAuthors: new Set(articles.map(a => a.postedBy)).size,
      activeUsers: 3,
      recentActivity: articles.slice(0, 2).map(a => `Posted "${a.title}"`),
    });
  }, [user, router, articles]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome, {user.name}!</Text>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.stat, { color: theme.text }]}>Total Articles: {stats.totalArticles}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Total Authors: {stats.totalAuthors}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Active Users: {stats.activeUsers}</Text>
          <Text style={[styles.status, { color: theme.text }]}>Status: Newsroom Active</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity:</Text>
          {stats.recentActivity.map((activity, index) => (
            <Text key={index} style={[styles.activity, { color: theme.text }]}>
              • {activity}
            </Text>
          ))}
        </View>
        <Button title="Log Out" onPress={handleSignOut} />
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
    alignItems: 'center',
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
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stat: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: '500',
  },
  status: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  activity: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default Dashboard;