import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';
import GameHistoryProvider from './context/GameHistoryContext';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<GameHistoryProvider>
			<ThemeProvider
				value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			>
				<Stack>
					<Stack.Screen
						name='(tabs)'
						options={{ headerShown: false }}
					/>
				</Stack>
			</ThemeProvider>
		</GameHistoryProvider>
	);
}
