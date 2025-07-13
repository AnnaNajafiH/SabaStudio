import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ApiService from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string, confirmPassword: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const api = new ApiService();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.getProfile();
      if (response.status === 'success' && response.data?.user) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.log('Not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, confirmPassword: string) => {
    try {
      setError(null);
      const response = await api.signup(name, email, password, confirmPassword);
      if (response.status === 'success' && response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred during signup');
      throw err;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await api.signin(email, password);
      if (response.status === 'success' && response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err: any) {
      console.error('Signin error:', err);
      setError(err.response?.data?.message || err.message || 'Invalid credentials');
      throw err;
    }
  };

  const signout = async () => {
    try {
      await api.signout();
      setUser(null);
    } catch (err: any) {
      console.error('Signout error:', err);
      // Even if the logout API fails, we clear the user state
      setUser(null);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated: !!user,
      signup,
      signin,
      signout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};