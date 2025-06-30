import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_URL}/user/listAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
  };

  const handleDeleteUser = async (userId, userName) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${API_URL}/user/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      Alert.alert('Deleted', `User ${userName} was removed.`);
      await fetchUsers();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.replace('/login');
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Ionicons name="person-circle-outline" size={30} color="#a755f9" style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userMeta}>{item.email} · {item.role}</Text>
        </View>
      </View>
      {item.role !== 'admin' && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert('Confirm', `Delete ${item.name}?`, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', onPress: () => handleDeleteUser(item.id, item.name) },
            ])
          }
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#6a11cb', '#a755f9']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          <Ionicons name="shield-checkmark-outline" size={28} color="#fff" />
          <Text style={styles.title}>Admin Dashboard</Text>
        </View>
        <Text style={styles.subtitle}>Manage all users in the system</Text>

        {loading && !refreshing ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fff']} tintColor="#fff" />
            }
          />
        )}

        {/* Logout button at the bottom */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: '#e0dff9',
    textAlign: 'center',
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userMeta: {
    fontSize: 13,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a11cb',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
    width: '60%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;
