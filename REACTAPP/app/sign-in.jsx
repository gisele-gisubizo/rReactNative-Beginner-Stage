import { SafeAreaView, StyleSheet, Text, View, TextInput, useColorScheme, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const Signup = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { signUp, forgotPassword } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    console.log('handleSignup called with:', { name, email, password, role, adminKey });
    setError('');
    if (!name || !/^[a-zA-Z\s]{2,100}$/.test(name)) {
      setError('Name must be 2-100 characters with letters and spaces only');
      return;
    }
    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a number');
      return;
    }

    try {
      const success = await signUp(name, email, password, role, adminKey);
      console.log('signUp result:', success);
      if (success) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message || 'Signup failed. Email may already exist or invalid admin key.');
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    try {
      const success = await forgotPassword(email);
      if (success) {
        Alert.alert('Success', 'Password reset email sent. Check your inbox.');
      }
    } catch (err) {
      console.error('Forgot password error:', err.message);
      setError(err.message || 'Failed to send password reset email.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Sign Up</Text>
        {error ? <Text style={[styles.error, { color: '#FF3B30' }]}>{error}</Text> : null}
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Name"
          placeholderTextColor={theme.text + '80'}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Email"
          placeholderTextColor={theme.text + '80'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Password"
          placeholderTextColor={theme.text + '80'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {role === 'Admin' && (
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.text }]}
            placeholder="Admin Key"
            placeholderTextColor={theme.text + '80'}
            value={adminKey}
            onChangeText={setAdminKey}
            secureTextEntry
          />
        )}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'User' && styles.selectedRole]}
            onPress={() => setRole('User')}
          >
            <Text style={[styles.roleText, { color: role === 'User' ? '#fff' : theme.text }]}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'Admin' && styles.selectedRole]}
            onPress={() => setRole('Admin')}
          >
            <Text style={[styles.roleText, { color: role === 'Admin' ? '#fff' : theme.text }]}>Admin</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Sign Up button pressed');
            handleSignup();
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={[styles.link, { color: theme.text }]}>Already have an account? Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={[styles.link, { color: theme.text }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  error: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedRole: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  roleText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    marginTop: 10,
  },
});