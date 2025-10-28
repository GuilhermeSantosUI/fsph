import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{
          headerShown: false,
        }} 
      />
      
      <Stack.Screen 
        name="configuracoes" 
        options={{
        }}
      />

      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
}