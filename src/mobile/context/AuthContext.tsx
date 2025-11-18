import { api } from '@/services';
import { authService } from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, type AuthChangeEvent } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, s: Session | null) => {
        setSession(s ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const data = await authService.googleAuth();

    console.log('Google Auth Data:', data);

    // if server returned a token, store it and navigate to tabs
    if (data && (data as any).token) {
      try {
        const token = (data as any).token as string;
        await AsyncStorage.setItem('authToken', token);
        // set default Authorization header for API calls
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.warn('Failed to store auth token', err);
      }

      // navigate to the main tabs area
      router.replace('/(tabs)');
    }
  }, [router]);

  const value = useMemo(
    () => ({
      session,
      loading,
      signInWithGoogle,
    }),
    [session, loading, signInWithGoogle]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
