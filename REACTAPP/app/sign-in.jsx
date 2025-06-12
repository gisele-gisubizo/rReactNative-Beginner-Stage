import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const success = await signUp(email, password);
    if (success) {
      Alert.alert('Success', 'Signed up and logged in!');
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Email already exists');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.title, { color: theme.title }]}>Sign Up</Text>
          <Text style={[styles.text, { color: theme.text }]}>Create a pet shop account</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={theme.text + '80'}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={theme.text + '80'}
            secureTextEntry
          />
          <Button title="Sign Up" onPress={handleSignUp} />
          <Link href="/login" style={[styles.link, { color: theme.primary }]}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  link: {
    marginVertical: 10,
    padding: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});