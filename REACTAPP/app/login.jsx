import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const Login = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (signIn(email, password)) {
      Alert.alert('Success', 'Logged in!');
      router.push('/dashboard'); // Redirect to dashboard
    } else {
      Alert.alert('Error', 'Invalid credentials. Use email: user@example.com, password: password');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <Text style={[styles.title, { color: theme.title }]}>Login</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Log in to manage your pet shop!
        </Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={theme.text}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.text}
          secureTextEntry
        />
        <Button title="Log In" onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 20 },
  text: { textAlign: 'center', marginBottom: 20 },
  input: { width: '80%', borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});