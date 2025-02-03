import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function GameHistory() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Wildlife Conservation</Text>
			<Text style={styles.text}>
				Game History & Statistics - Coming Soon!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.background,
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 16,
	},
	text: {
		fontSize: 18,
		color: Colors.secondary,
	},
});
