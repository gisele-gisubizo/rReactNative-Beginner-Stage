import { SafeAreaView, StyleSheet, Text, View, TextInput, useColorScheme, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { debounce } from 'lodash';

const Login = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { signIn, forgotPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    console.log('handleLogin called with:', { email, password });
    setError('');
    setIsSubmitting(true);
    try {
      const success = await signIn(email, password);
      console.log('signIn result:', success);
      if (success) {
        console.log('Navigating to /pet-foods');
        router.push('/pet-foods');
      } else {
        console.log('signIn returned false, no navigation');
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Invalid credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const debouncedHandleLogin = useCallback(debounce(handleLogin, 1000, { leading: true, trailing: false }), [email, password]);

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
        <Text style={[styles.title, { color: theme.title }]}>Login</Text>
        {error ? <Text style={[styles.error, { color: '#FF3B30' }]}>{error}</Text> : null}
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
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={() => {
            console.log('Login button pressed');
            debouncedHandleLogin();
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text style={[styles.link, { color: theme.text }]}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={[styles.link, { color: theme.text }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#007AFF80',
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