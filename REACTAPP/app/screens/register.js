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
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config'; // API_URL = 'http://10.232.213.40:5000'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSignup = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // Enhanced local validation
      if (!name || name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address (e.g., user@example.com)');
      }
      if (!password || password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        throw new Error('Password must be at least 8 characters with one lowercase, one uppercase, and one number');
      }

      console.log('Attempting signup to:', `${API_URL}/user/signup`);
      console.log('Payload:', { name, email, password, role: 'user' });

      const response = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'user',
        }),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          throw new Error(errorMessages || 'Invalid input data');
        }
        throw new Error(data.message || `Signup failed with status ${response.status}`);
      }

      // Store token if provided
      if (data.data?.token) {
        await AsyncStorage.setItem('token', data.data.token);
      }

      Alert.alert(
        'Success',
        'Registration successful! Check your email (including spam/junk folder) for the OTP. If not received, try resending on the next screen or use a different email.'
      );
      router.push({ pathname: '/otp-verification', params: { email } });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Check server response or network.');
      Alert.alert(
        'Error',
        err.message || 'Signup failed. Please try again with a different email or check your network.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Image
          source={require('../assets/poll4.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>PollMaster</Text>
        <Text style={styles.subheading}>Sign up to your account</Text>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Name Field */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="words"
            placeholderTextColor="#6a11cb"
            style={styles.input}
          />
          <Icon name="person-outline" size={20} color="#888" style={styles.iconRight} />
        </View>

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? 'Signing Up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Link href="/login">
          <TouchableOpacity style={styles.signupLink}>
            <Text style={styles.signupText}>
              Already have an account? <Text style={styles.signupTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Link>
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
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#895ccf',
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
    color: '#6a11cb',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
});

export default Register;