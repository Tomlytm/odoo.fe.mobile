import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; tabColor: string; title: string; focused: boolean }) {
  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome size={20} color={props.tabColor} style={{ marginRight: 5 }} {...props} />
      {props.focused && (
        <Text style={{ color: props.tabColor, fontSize: 12, fontFamily: "Lexend", }}>{props.title}</Text>
      )}
    </Pressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarLabel: '',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" tabColor={color} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="cog" tabColor={color} title="Settings" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="users" tabColor={color} title="Leads" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
