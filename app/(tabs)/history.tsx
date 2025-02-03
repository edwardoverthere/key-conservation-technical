import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import { useGameHistory } from '../context/GameHistoryContext';
import Board from '../components/Board';

export default function GameHistory() {
	const { games, clearHistory } = useGameHistory();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const renderGameResult = (game: GameResult) => {
		const winner =
			game.winner === 'X' ? '🐘' : game.winner === 'O' ? '🦁' : null;
		return game.winner === 'draw'
			? 'Draw!'
			: winner
			? `${winner} Wins!`
			: '';
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Game History</Text>
				{games.length > 0 && (
					<TouchableOpacity
						style={styles.clearButton}
						onPress={clearHistory}
					>
						<Text style={styles.clearButtonText}>
							Clear History
						</Text>
					</TouchableOpacity>
				)}
			</View>
			{games.length === 0 ? (
				<Text style={styles.emptyText}>No games played yet!</Text>
			) : (
				games.map((game) => (
					<View key={game.id} style={styles.gameCard}>
						<View style={styles.gameHeader}>
							<Text style={styles.dateText}>
								{formatDate(game.date)}
							</Text>
							<Text style={styles.resultText}>
								{renderGameResult(game)}
							</Text>
						</View>
						<View style={styles.boardContainer}>
							<Board
								squares={game.finalBoard}
								onSquarePress={() => {}}
								disabled
							/>
						</View>
					</View>
				))
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.shared.background,
		padding: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.shared.primary,
		marginBottom: 20,
		textAlign: 'center',
	},
	emptyText: {
		fontSize: 18,
		color: Colors.shared.secondary,
		textAlign: 'center',
		marginTop: 20,
	},
	gameCard: {
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: 16,
		marginBottom: 16,
		shadowColor: Colors.shared.secondary,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	gameHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	dateText: {
		fontSize: 16,
		color: Colors.shared.secondary,
	},
	resultText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.shared.primary,
	},
	boardContainer: {
		transform: [{ scale: 0.8 }],
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 20,
	},
	clearButton: {
		backgroundColor: Colors.shared.accent,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
	},
	clearButtonText: {
		color: Colors.shared.buttonText,
		fontSize: 14,
		fontWeight: 'bold',
	},
});
