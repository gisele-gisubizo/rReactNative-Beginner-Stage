import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, useWindowDimensions, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSignUp = () => {
    if (isLoading) return;
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (signUp(email, password)) {
      Alert.alert('Success', 'Signed up and logged in!');
    } else {
      Alert.alert('Error', 'Email already exists');
    }
  };

  if (isLoading) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { maxWidth: width > 400 ? 400 : width }]}>
        <Text style={[styles.title, { color: theme.title }]}>Sign Up</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Create an account to manage your pet shop!
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
        <Button title="Sign Up" onPress={handleSignUp} />
        <Link href="/login" style={[styles.link, { color: theme.text, borderBottomColor: theme.text }]}>
          <Text>Go to Login</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 20 },
  text: { textAlign: 'center', marginBottom: 20 },
  input: { width: '80%', borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  link: { marginVertical: 10, borderBottomWidth: 1 },
});