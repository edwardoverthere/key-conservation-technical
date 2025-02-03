import { View, Text, StyleSheet } from 'react-native';

export default function GameHistory() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Game History - Coming Soon!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: '500',
	},
});
