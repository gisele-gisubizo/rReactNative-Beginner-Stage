import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({ user: null, signIn: () => {}, signUp: () => {}, signOut: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const users = JSON.parse((await AsyncStorage.getItem('users')) || '[]');
      const foundUser = users.find((u) => u.email === email && u.password === password);
      if (foundUser) {
        setUser({ email, id: foundUser.id });
        await AsyncStorage.setItem('user', JSON.stringify({ email, id: foundUser.id }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };

  const signUp = async (email, password) => {
    try {
      const users = JSON.parse((await AsyncStorage.getItem('users')) || '[]');
      if (users.some((u) => u.email === email)) {
        return false;
      }
      const newUser = { id: Date.now().toString(), email, password };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      setUser({ email, id: newUser.id });
      await AsyncStorage.setItem('user', JSON.stringify({ email, id: newUser.id }));
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};