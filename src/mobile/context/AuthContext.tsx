import { Session, type AuthChangeEvent } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { redirectTo, supabase } from '../lib/supabase';

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

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

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) throw error;
    Alert.alert('Verifique seu e-mail', 'Enviamos um link de confirmação.');
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
    Alert.alert(
      'Email enviado',
      'Siga as instruções para redefinir sua senha.'
    );
  }, []);

  const signInWithOtp = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    Alert.alert(
      'Código enviado',
      'Verifique seu e-mail pelo código de acesso.'
    );
  }, []);

  const verifyOtp = useCallback(async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // Necessário configurar o provedor Google no Supabase e o deep link no app.json
    const res = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    const url = res.data?.url;
    if (url) {
      const result = await WebBrowser.openAuthSessionAsync(url, redirectTo);
      if (result.type === 'success' && result.url) {
        const parsed = Linking.parse(result.url);
        const params = parsed.queryParams as
          | Record<string, string>
          | null
          | undefined;
        if (params?.['code']) {
          // Supabase cuidará da troca do código pelo token automaticamente
        }
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      signInWithOtp,
      verifyOtp,
      signInWithGoogle,
    }),
    [
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      signInWithOtp,
      verifyOtp,
      signInWithGoogle,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
