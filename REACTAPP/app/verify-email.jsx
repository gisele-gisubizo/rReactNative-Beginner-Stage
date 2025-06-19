import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const VerifyEmail = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { verifyEmail } = useAuth();
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const [error, setError] = useState('');

  useEffect(() => {
    if (token && typeof token === 'string') {
      verifyEmail(token)
        .then(() => {
          setStatus('Email verified successfully!');
        })
        .catch((err) => {
          setError(err.message || 'Verification failed');
          setStatus('');
        });
    } else {
      setError('No verification token provided');
      setStatus('');
    }
  }, [token, verifyEmail]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Verify Email</Text>
        {status ? <Text style={[styles.text, { color: theme.text }]}>{status}</Text> : null}
        {error ? <Text style={[styles.error, { color: '#FF3B30' }]}>{error}</Text> : null}
        <Button
          title="Go to Login"
          onPress={() => router.push('/login')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '80%',
  },
});