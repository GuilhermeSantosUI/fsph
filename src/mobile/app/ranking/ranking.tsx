import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import RankingModal from './ranking-modal';

export default function RankingScreen() {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.setItem('rankingModalSeen', 'true');
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <RankingModal visible={true} onClose={() => router.back()} />
    </>
  );
}
