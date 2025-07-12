import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = 'http://localhost:3003/api/v1';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.data);
    } catch (err: any) {
      console.error('Profile fetch error:', err.response?.data || err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        name
      });
      
      if (!response.data || !response.data.data || !response.data.data.token) {
        throw new Error('Invalid response format from server');
      }

      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      
      // Set up axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user directly from signup response
      setUser(user);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'An error occurred during signup';
      console.error('Signup error:', errorMessage);
      setError(errorMessage);
      throw err;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      const { token } = response.data.data;
      localStorage.setItem('token', token);
      const userResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userResponse.data.data);
    } catch (err: any) {
      console.error('Signin error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err;
    }
  };

  const signout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider 
    value={{
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