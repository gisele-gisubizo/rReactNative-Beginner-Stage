import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EnterCodeScreen = () => {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (code.trim().length < 4) {
      Alert.alert('Invalid Code', 'Please enter a valid poll code.');
      return;
    }
    // Navigate to CommunityPollScreen instead of alert
    router.push('/CommunityPollScreen');
  };

  const handleBackToHome = () => {
    router.replace('/');
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <View style={styles.header}>
          <Ionicons name="key-outline" size={42} color="#fff" />
          <Text style={styles.title}>Enter Poll Code</Text>
          <Text style={styles.subtitle}>Type in the code shared by your poll host</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          placeholderTextColor="#aaa"
          value={code}
          onChangeText={setCode}
          keyboardType="default"
          autoCapitalize="characters"
          maxLength={8}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Code</Text>
        </TouchableOpacity>

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default EnterCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 6,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#6a11cb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
