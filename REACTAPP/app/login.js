import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setSecureEntry(!secureEntry);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      if (!password) {
        throw new Error('Password is required');
      }

      console.log('Attempting login to:', `${API_URL}/user/signin`);
      console.log('Payload:', { email, password });

      const response = await axios.post(`${API_URL}/user/signin`, {
        email,
        password,
      });

      console.log('Response:', { status: response.status, data: response.data });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      if (response.data.data?.token) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('userRole', response.data.data.user.role); // Store role
        console.log('Navigating to:', response.data.data.user.role === 'admin' ? './AdminDashboard' : '(tabs)');
        try {
          const redirectPath = response.data.data.user.role === 'admin' ? './AdminDashboard' : '(tabs)';
          router.push(redirectPath);
        } catch (navError) {
          console.error('Navigation error:', navError.message);
          Alert.alert('Navigation Error', 'Could not navigate to home screen. Check route configuration.');
          router.push('/splashScreen'); // Fallback to splash screen
        }
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Image source={require('../app/assets/poll4.png')} style={styles.logo} />
        <Text style={styles.logoText}>PollMaster</Text>
        <Text style={styles.subheading}>Sign in to your account</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#6a11cb"
            style={styles.input}
          />
          <Icon name="mail-outline" size={20} color="#888" style={styles.iconRight} />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureEntry}
            placeholderTextColor="#6a11cb"
            style={styles.input}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => router.push('./register')}
        >
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#895ccf',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formWrapper: {
    backgroundColor: '#f9f9f9',
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 60,
    marginBottom: 8,
    alignSelf: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a11cb',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#6a11cb',
    fontWeight: 'bold',
  },
  iconRight: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#a688e2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
  signupTextBold: {
    color: '#5b0eb3',
    fontWeight: '900',
  },
});

export default Login;