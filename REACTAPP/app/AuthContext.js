// app/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Auth state check:', { token, currentPath: router.pathname });
        setIsAuthenticated(!!token);
        if (!token && router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/splashScreen' && router.pathname !== '/OTPVerificationScreen') {
          router.replace('/login');
        } else if (token && router.pathname === '/splashScreen') {
          router.replace('/(tabs)/index');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router.pathname]);

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};