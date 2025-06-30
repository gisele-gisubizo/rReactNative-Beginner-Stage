import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { API_URL } from '../config';

// Zod schema for validation
const otpSchema = z.number().int().min(100000, { message: 'OTP must be a 6-digit number' }).max(999999);

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email: emailFromParams, role } = useLocalSearchParams(); // Get email and role

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate OTP
      otpSchema.parse(Number(otp));

      // Get JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please sign up again.');
      }

      console.log('Verifying OTP:', { otp });
      const response = await fetch(`${API_URL}/user/validateOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: Number(otp) }),
      });

      const data = await response.json();
      console.log('OTP Verification Response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      // Redirect based on role
      const redirectPath = role === 'admin' ? './AdminDashboard' : './Home';
      Alert.alert('Success', 'Account verified! Redirecting...', [
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('signupEmail'); // Remove signupEmail but keep token
            router.push(redirectPath);
          },
        },
      ]);
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendPrompt = () => {
    Alert.alert(
      'OTP Not Received',
      'Please check your spam/junk folder. If the OTP is not there, try registering again with a different email.',
      [{ text: 'OK', onPress: () => router.push('/register') }]
    );
  };

  return (
    <LinearGradient
      colors={['#895ccf', '#6a11cb', '#4e0ec9']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <View style={styles.formCard}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to {emailFromParams || 'your email'}
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResendPrompt} disabled={loading}>
            <Text style={styles.resendText}>
              Didn't receive the code?{' '}
              <Text style={styles.resendHighlight}>Try again</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#a688e2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    color: '#555',
    fontSize: 14,
  },
  resendHighlight: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;