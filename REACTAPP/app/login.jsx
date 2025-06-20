import { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Alert, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors.jsx';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from 'expo-router';
import { debounce } from 'lodash';

const Login = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('handleLogin called with:', { email, password });
    try {
      const result = await login(email, password);
      console.log('login result:', result);
      if (result) {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', error.message || 'Failed to log in');
    }
  };

  const debouncedHandleLogin = useCallback(debounce(handleLogin, 1000, { leading: true, trailing: false }), [email, password, login]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.masthead, { color: theme.title }]}>News Column</Text>
        <Text style={[styles.title, { color: theme.title }]}>Login</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.text + '80'}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor={theme.text + '80'}
        />
        <Button
          title="Login"
          onPress={() => {
            console.log('Login button pressed');
            debouncedHandleLogin();
          }}
          disabled={isLoading}
        />
        <Link href="/sign-in" style={[styles.link, { color: theme.primary }]}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </Link>
        <Link href="/verify-email" style={[styles.link, { color: theme.primary }]}>
          <Text style={styles.linkText}>Verify Email</Text>
        </Link>
        <Link href="/forgot-password" style={[styles.link, { color: theme.primary }]}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  masthead: {
    fontFamily: 'Playfair Display',
    fontWeight: '900',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  link: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Login;