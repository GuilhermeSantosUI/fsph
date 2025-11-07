import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { api } from '../';

function normalizeHost(baseURL: string) {
  if (!baseURL) return baseURL;
  // If using localhost on Android emulator, map to emulator host
  if (baseURL.includes('localhost')) {
    if (Platform.OS === 'android') {
      return baseURL.replace('localhost', '10.0.2.2');
    }
    return baseURL; // iOS simulator can use localhost
  }

  return baseURL;
}

export async function googleAuth() {
  const base = api.defaults.baseURL ?? 'http://localhost:3000';
  const host = normalizeHost(base);
  const url = `${host.replace(/\/$/, '')}/login/google`;

  // Use Expo WebBrowser auth session which opens a modal-like auth experience
  const redirectUri = 'mobile://auth/callback';

  try {
    const result = await WebBrowser.openAuthSessionAsync(url, redirectUri);

    if (result.type === 'success' && result.url) {
      const incoming = result.url;
      const [, query] = incoming.split('?');
      const params = new URLSearchParams(query || '');

      if (params.has('user')) {
        const raw = params.get('user') || '';
        try {
          const user = JSON.parse(decodeURIComponent(raw));
          return { user };
        } catch {
          return { user: raw };
        }
      }

      const obj: Record<string, string> = {};
      params.forEach((v, k) => (obj[k] = v));
      return obj;
    }

    throw new Error('Autenticação cancelada ou sem resposta');
  } catch (err) {
    throw err;
  }
}
