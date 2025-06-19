import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();
  const { user } = useAuth();

  const navigate = (path) => {
    console.log(`Navigating to ${path}`);
    router.push(path);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/')}>
        <MaterialIcons name="home" size={28} color={theme.text} />
      </TouchableOpacity>
      {!user ? (
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/login')}>
          <MaterialIcons name="account-circle" size={28} color={theme.text} />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/pet-foods')}>
            <MaterialIcons name="fastfood" size={28} color={theme.text} />
          </TouchableOpacity>
          {user.role && user.role.toLowerCase() === 'admin' && (
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/crud')}>
              <MaterialIcons name="edit" size={28} color={theme.text} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/settings')}>
            <MaterialIcons name="settings" size={28} color={theme.text} />
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigate('/about')}>
        <MaterialIcons name="info" size={28} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
  },
});