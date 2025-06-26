import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Link, useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureEntry(!secureEntry);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Image
          source={require('../assets/poll4.png')}
          style={styles.logo}
        />

        <Text style={styles.logoText}>PollMaster</Text>
        <Text style={styles.subheading}>Sign in to your account</Text>

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
            // This makes placeholder bold on iOS & Android
            // For Android: placeholderTextColor style controls color only,
            // so bold placeholder needs a trick or external library.
            // But here we do it via fontWeight.
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <Link href="/register">
          <TouchableOpacity style={styles.signupLink}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Link>
       
      </View>
    </View>
  );
};

export default Login;

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