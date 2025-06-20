import { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.155:3000';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoading(true);
        const storedToken = await AsyncStorage.getItem('userToken');
        console.log('loadSession: Retrieved stored token:', storedToken ? 'Present' : 'Absent');
        if (storedToken) {
          setToken(storedToken);
          await fetchProfile(storedToken);
          await fetchArticles(storedToken);
        }
      } catch (error) {
        console.error('loadSession: Error:', error.message);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  useEffect(() => {
    if (token && !articles.length && !isLoading) {
      console.log('Retry fetchArticles due to token availability:', token);
      fetchArticles(token);
    }
  }, [token]);

  const fetchProfile = async (jwtToken = token) => {
    if (!jwtToken) {
      console.log('fetchProfile: No token available');
      return null;
    }
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
      console.log('Fetch profile response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Failed to fetch profile`);
      }
      const userData = { ...data.data.user, role: data.data.user.role.toLowerCase() };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('fetchProfile: Error:', error.message);
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('userToken');
      return null;
    }
  };

 const fetchArticles = async (jwtToken = token) => {
  if (!jwtToken) {
    console.log('fetchArticles: No token available, skipping');
    return;
  }
  try {
    setIsLoading(true);
    console.log('fetchArticles: Sending request:', { url: `${BASE_URL}/get?page=1&limit=50`, token: jwtToken });
    const response = await fetch(`${BASE_URL}/get?page=1&limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    console.log('fetchArticles: Response:', { status: response.status, data });
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: Failed to fetch articles`);
    }
    const mappedArticles = data.data.posts.map(post => ({
      id: post.id.toString(),
      title: post.title,
      summary: post.summary || post.body.substring(0, 200), // Use backend summary if available, fall back to truncated body
      body: post.body,
      date: post.createdAt || new Date().toISOString(),
      postedBy: post.author?.name || 'Unknown',
      authorId: post.author?.id || null,
    }));
    console.log('fetchArticles: Mapped articles:', mappedArticles);
    setArticles(mappedArticles);
  } catch (error) {
    console.log('fetchArticles: Error:', error.message);
    Alert.alert('Error', error.message || 'Failed to fetch articles');
    setArticles([]);
  } finally {
    setIsLoading(false);
  }
};

  const signUp = async (name, email, password) => {
    console.log('signUp called with:', { name, email, password });
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    try {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const sanitizedEmail = email.trim().toLowerCase();
      console.log('Sending signup request:', { url: `${BASE_URL}/signup`, body: { name, email: sanitizedEmail, password } });
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: sanitizedEmail, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Signup response status:', response.status);
      const data = await response.json();
      console.log('Signup response data:', data);
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Signup failed`);
      }

      const { user: userData, token: jwtToken } = data.data || {};
      if (!jwtToken || !userData) {
        throw new Error('Invalid signup response');
      }
      console.log('Signup success, setting user and token:', { userData, jwtToken });
      setUser({ ...userData, role: userData.role.toLowerCase() });
      setToken(jwtToken);
      await AsyncStorage.setItem('userToken', jwtToken);
      await fetchArticles(jwtToken);
      return true;
    } catch (error) {
      console.error('Signup error:', error.message);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your network or server status.');
      }
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('Cannot connect to server. Please check your network or server status.');
      }
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    console.log('login called with:', { email, password });
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
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
        throw new Error(data.message || `HTTP ${response.status}: Login failed`);
      }

      const { user: userData, token: jwtToken } = data.data;
      console.log('Login success, setting user and token:', { userData, jwtToken });
      setUser({ ...userData, role: userData.role.toLowerCase() });
      setToken(jwtToken);
      await AsyncStorage.setItem('userToken', jwtToken);
      await fetchArticles(jwtToken);
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
    } finally {
      setIsLoading(false);
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
        throw new Error(data.message || `HTTP ${response.status}: Email verification failed`);
      }

      Alert.alert('Success', data.message || 'Email verified successfully');
      await fetchProfile();
      return true;
    } catch (error) {
      console.error('Verify email error:', error.message);
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
      console.log('Forgot password response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Forgot password request failed`);
      }

      Alert.alert('Success', data.message || 'Password reset email sent. Check your inbox.');
      return true;
    } catch (error) {
      console.error('Forgot password error:', error.message);
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
      console.log('Reset password response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Password reset failed`);
      }

      Alert.alert('Success', data.message || 'Password reset successfully.');
      return true;
    } catch (error) {
      console.error('Reset password error:', error.message);
      throw new Error(error.message || 'Invalid or expired reset token.');
    }
  };

  const signOut = async () => {
    console.log('signOut: Clearing user and token');
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('userToken');
      setArticles([]);
    } catch (error) {
      console.error('signOut: Error clearing AsyncStorage:', error.message);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const addArticle = async (article) => {
    if (!user || user.role.toLowerCase() !== 'admin') {
      console.log('addArticle: Unauthorized, user:', user);
      Alert.alert('Error', 'Only admins can add articles');
      return false;
    }
    try {
      setIsLoading(true);
      console.log('Adding article:', article);
      const response = await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
          body: article.body,
          summary: article.summary,
          createdAt: article.date,
        }),
      });
      const data = await response.json();
      console.log('Add article response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Failed to add article`);
      }
      await fetchArticles(token);
      Alert.alert('Success', 'Article added successfully');
      return true;
    } catch (error) {
      console.error('addArticle: Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to add article');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateArticle = async (id, updatedArticle) => {
    if (!user || user.role.toLowerCase() !== 'admin') {
      console.log('updateArticle: Unauthorized, user:', user);
      Alert.alert('Error', 'Only admins can update articles');
      return false;
    }
    try {
      setIsLoading(true);
      console.log('Updating article:', { id, updatedArticle });
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedArticle.title,
          body: updatedArticle.body,
          summary: updatedArticle.summary,
          createdAt: updatedArticle.date,
        }),
      });
      const data = await response.json();
      console.log('Update article response:', { status: response.status, data });
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Failed to update article`);
      }
      await fetchArticles(token);
      Alert.alert('Success', 'Article updated successfully');
      return true;
    } catch (error) {
      console.error('updateArticle: Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to update article');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    if (!user || user.role.toLowerCase() !== 'admin') {
      console.log('deleteArticle: Unauthorized, user:', user);
      Alert.alert('Error', 'Only admins can delete articles');
      return false;
    }
    try {
      setIsLoading(true);
      console.log('Deleting article:', { url: `${BASE_URL}/delete/${id}`, userId: user.id });
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Delete article response:', { status: response.status, data });
      if (!response.ok) {
        const errorMessage = data.message || `HTTP ${response.status}: Failed to delete article`;
        if (errorMessage.includes('Not authorized')) {
          throw new Error('You can only delete articles you created');
        }
        throw new Error(errorMessage);
      }
      await fetchArticles(token);
      Alert.alert('Success', 'Article deleted successfully');
      return true;
    } catch (error) {
      console.error('deleteArticle: Error:', error.message);
      throw new Error(error.message || 'Failed to delete article');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    articles,
    isLoading,
    signUp,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    signOut,
    addArticle,
    updateArticle,
    deleteArticle,
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