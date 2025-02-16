'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useSession } from '@clerk/nextjs';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { session } = useSession();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        if (session) {
          // Get token using session
          const token = await session.getToken();
          setToken(token);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      initializeSession();
    }
  }, [isLoaded, session]);

  const value = {
    isLoaded,
    userId,
    sessionId,
    token,
    loading,
    getToken: async () => {
      if (session) {
        return session.getToken();
      }
      return null;
    }
  };

  if (!isLoaded || loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};