import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.178:3000';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [petFoods, setPetFoods] = useState([]);

  useEffect(() => {
    const loadSessionAndPetFoods = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchProfile(storedToken);
        }

        const storedPetFoods = await AsyncStorage.getItem('petFoods');
        if (storedPetFoods) {
          const parsedPetFoods = JSON.parse(storedPetFoods);
          setPetFoods(Array.isArray(parsedPetFoods) ? parsedPetFoods : []);
        } else {
          const defaultPetFoods = [
            { id: '1', name: 'Pet Food 1', price: 10.99, description: 'Delicious food for pets.', imagePath: 'pet-food-1.webp', postedBy: 'admin@example.com' },
            { id: '2', name: 'Pet Food 2', price: 15.99, description: 'Nutritious meal for dogs.', imagePath: 'pet-food-2.webp', postedBy: 'admin@example.com' },
            { id: '3', name: 'Pet Food 3', price: 12.99, description: 'Healthy cat food.', imagePath: 'pet-food-3.webp', postedBy: 'admin@example.com' },
            { id: '4', name: 'Pet Food 4', price: 8.99, description: 'Treats for pets.', imagePath: 'pet-food-4.webp', postedBy: 'admin@example.com' },
          ];
          setPetFoods(defaultPetFoods);
          await AsyncStorage.setItem('petFoods', JSON.stringify(defaultPetFoods));
        }
      } catch (error) {
        console.error('Error loading session or pet foods:', error);
        setPetFoods([]);
      }
    };
    loadSessionAndPetFoods();
  }, []);

  const signUp = async (name, email, password, role, adminKey) => {
    console.log('signUp called with:', { name, email, password, role, adminKey });
    if (!name || !email || !password || !role) {
      throw new Error('Name, email, password, and role are required');
    }
    if (role === 'Admin' && adminKey !== 'SECRET2025') {
      throw new Error('Invalid admin key');
    }

    const sanitizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }
    if (!/^[a-zA-Z\s]{2,100}$/.test(name)) {
      throw new Error('Name must be 2-100 characters with letters and spaces only');
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new Error('Password must be at least 8 characters with uppercase, lowercase, and a number');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const requestBody = { name, email: sanitizedEmail, password, role: role };
      console.log('Signup request:', { url: `${BASE_URL}/signup`, body: requestBody });
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Signup response status:', response.status);
      const data = await response.json();
      console.log('Signup response data:', data);
      if (!response.ok) {
        if (data.errors && data.errors['body.email']) {
          throw new Error(data.errors['body.email'][0] || 'Invalid email format');
        }
        if (data.errors && data.errors['body.name']) {
          throw new Error(data.errors['body.name'][0] || 'Invalid name format');
        }
        if (data.errors && data.errors['body.password']) {
          throw new Error(data.errors['body.password'][0] || 'Invalid password format');
        }
        throw new Error(data.message || 'Signup failed');
      }

      Alert.alert('Success', data.message || 'Signup successful. Please check your email to verify your account.');
      return true;
    } catch (error) {
      console.error('Signup error:', error.message);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your network or server status.');
      }
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('Cannot connect to server. Please check your network or server status.');
      }
      throw new Error(error.message || 'Signup failed. Please check your inputs.');
    }
  };

  const signIn = async (email, password) => {
    console.log('signIn called with:', { email, password });
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const sanitizedEmail = email.trim().toLowerCase();
      console.log('Sending login request:', { url: `${BASE_URL}/login`, body: { email: sanitizedEmail, password } });
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sanitizedEmail, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      if (!response.ok) {
        if (data.errors && data.errors['body.email']) {
          throw new Error(data.errors['body.email'][0] || 'Invalid email format');
        }
        if (data.errors && data.errors['body.password']) {
          throw new Error(data.errors['body.password'][0] || 'Invalid password');
        }
        throw new Error(data.message || 'Login failed');
      }

      const { user: userData, token: jwtToken } = data.data;
      console.log('Login success, setting user and token:', { userData, jwtToken });
      setUser(userData);
      setToken(jwtToken);
      await AsyncStorage.setItem('userToken', jwtToken);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your network or server status.');
      }
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('Cannot connect to server. Please check your network or server status.');
      }
      throw new Error(error.message || 'Invalid credentials');
    }
  };

  const verifyEmail = async (token) => {
    if (!token) {
      throw new Error('Verification token is required');
    }

    try {
      console.log('Verify email request:', { url: `${BASE_URL}/verify-email/${token}` });
      const response = await fetch(`${BASE_URL}/verify-email/${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Verify email response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }

      Alert.alert('Success', data.message || 'Email verified successfully');
      await fetchProfile();
      return true;
    } catch (error) {
      console.error('Verify email error:', { message: error.message, stack: error.stack });
      throw new Error(error.message || 'Invalid or expired verification token');
    }
  };

  const forgotPassword = async (email) => {
    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      console.log('Forgot password request:', { url: `${BASE_URL}/forgot-password`, body: { email: sanitizedEmail } });
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      const data = await response.json();
      console.log('Forgot password response:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Forgot password request failed');
      }

      Alert.alert('Success', data.message || 'Password reset email sent. Check your inbox.');
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error(error.message || 'Failed to send password reset email.');
    }
  };

  const resetPassword = async (token, password) => {
    if (!token || !password) {
      throw new Error('Token and password are required');
    }

    try {
      console.log('Reset password request:', { url: `${BASE_URL}/reset-password/${token}`, body: { password } });
      const response = await fetch(`${BASE_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log('Reset password response:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      Alert.alert('Success', data.message || 'Password reset successfully.');
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Invalid or expired reset token.');
    }
  };

  const fetchProfile = async (jwtToken = token) => {
    if (!jwtToken) return null;
    try {
      console.log('Fetch profile request:', { url: `${BASE_URL}/users/profile`, headers: { Authorization: `Bearer ${jwtToken}` } });
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      const data = await response.json();
      console.log('Fetch profile response:', data);
      if (!response.ok) {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('userToken');
        return null;
      }

      const userData = data.data.user;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('userToken');
      return null;
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem('userToken');
  };

  const addPetFood = async (petFood) => {
    if (!user || user.role !== 'admin') return;
    const updatedPetFoods = [...petFoods, { ...petFood, id: Date.now().toString(), postedBy: user.email }];
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error saving pet food:', error);
    }
  };

  const updatePetFood = async (id, updatedPetFood) => {
    if (!user || user.role !== 'admin') return;
    const updatedPetFoods = petFoods.map((food) =>
      food.id === id ? { ...food, ...updatedPetFood } : food
    );
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error updating pet food:', error);
    }
  };

  const deletePetFood = async (id) => {
    if (!user || user.role !== 'admin') return;
    const updatedPetFoods = petFoods.filter((food) => food.id !== id);
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error deleting pet food:', error);
    }
  };

  const value = {
    user,
    token,
    petFoods,
    signIn,
    signUp,
    verifyEmail,
    forgotPassword,
    resetPassword,
    signOut,
    addPetFood,
    updatePetFood,
    deletePetFood,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}