import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from 'expo-router';

const Login = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const success = await signIn(email, password);
    if (success) {
      Alert.alert('Success', 'Logged in!');
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  // Function to append alpha to hex color
  const getPlaceholderColor = (color, alpha) => {
    const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${color}${hexAlpha}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.title, { color: theme.title }]}>Login</Text>
          <Text style={[styles.text, { color: theme.text }]}>Access your pet shop account</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={getPlaceholderColor(theme.text.replace('#', ''), 0.5)} // 0.5 alpha (50%)
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={getPlaceholderColor(theme.text.replace('#', ''), 0.5)} // 0.5 alpha (50%)
            secureTextEntry
          />
          <Button title="Log In" onPress={handleSignIn} />
          <Link href="/sign-in" style={[styles.link, { color: theme.primary }]}>
            <Text style={[styles.linkText, { color: theme.primary }]}>Need an account? Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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