import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({ user: null, signIn: () => {}, signOut: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
   
    if (email === 'gisele' && password === '12345') {
      const newUser = { email, id: '1' };
      setUser(newUser);
      console.log('Logged in with:', newUser);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    console.log('Signed out');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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