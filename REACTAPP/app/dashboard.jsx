import { SafeAreaView, StyleSheet, Text, View, useColorScheme, Button as RNButton } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const Dashboard = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;
  const { signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalPets: 0, totalRevenue: 0, activeUsers: 0 });

  useEffect(() => {
    setStats({ totalPets: 5, totalRevenue: 250, activeUsers: 3 });
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Welcome to Your Dashboard</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Manage your pet shop with ease!
        </Text>
        <View style={styles.stats}>
          <Text style={[styles.stat, { color: theme.text }]}>Total Pets: {stats.totalPets}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Revenue: ${stats.totalRevenue}</Text>
          <Text style={[styles.stat, { color: theme.text }]}>Active Users: {stats.activeUsers}</Text>
        </View>
        <Text style={[styles.status, { color: theme.text }]}>Status: Shop is Active</Text>
        <RNButton title="Log Out" onPress={handleSignOut} color={theme.primary} />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, alignItems: 'center' },
  title: { fontWeight: 'bold', fontSize: 28, marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  stats: { marginBottom: 20 },
  stat: { fontSize: 18, marginVertical: 5 },
  status: { fontSize: 16, marginBottom: 20, fontStyle: 'italic' },
});