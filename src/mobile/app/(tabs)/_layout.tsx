import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' }, // Oculta a tab bar
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          title: 'Main',
          tabBarStyle: { display: 'none' }, // Oculta a tab bar
        }}
      />
    </Tabs>
  );
}
