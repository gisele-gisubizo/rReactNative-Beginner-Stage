import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

const Dashboard = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPets: 5,
    totalRevenue: 250,
    activeUsers: 3,
    recentActivity: ['Added Dog - $100', 'Updated Cat price'],
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome, {user.email}!</Text>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.stat, { color: theme.text }]}>Total Pets: {stats.totalPets}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Revenue: ${stats.totalRevenue}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Active Users: {stats.activeUsers}</Text>
          <Text style={[styles.status, { color: theme.text }]}>Status: Shop is Active</Text>
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

export default Dashboard;

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