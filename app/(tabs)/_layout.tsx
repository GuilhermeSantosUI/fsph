import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { House, CalendarCheck, User } from 'phosphor-react-native';

import { IconProps } from 'phosphor-react-native';

type TabIconProps = {
  icon: React.ComponentType<IconProps>; 
  label: string;
  focused: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon: Icon, label, focused }) => {
  const activeColor = '#007AFF';
  const inactiveColor = '#888';
  const color = focused ? activeColor : inactiveColor;
  
  const weight = focused ? 'fill' : 'regular'; 

  return (
    <View style={styles.tabItemContainer}>
      <Icon 
        color={color} 
        weight={weight} 
        size={24} 
        style={styles.tabIcon} 
      />
      <Text style={[styles.tabLabel, { color: color, fontWeight: focused ? '600' : 'normal' }]}>
        {label}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#CCC',
          backgroundColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={House}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="agendamentos"
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={CalendarCheck}
              label="Agendamentos"
              focused={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={User}
              label="Perfil"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingHorizontal: 18,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
  },
});