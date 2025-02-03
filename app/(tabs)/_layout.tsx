import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						backgroundColor: '#fff',
					},
					android: {
						backgroundColor: '#fff',
					},
				}),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Current Match',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='gamepad' size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='history'
				options={{
					title: 'Game History',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='history' size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
