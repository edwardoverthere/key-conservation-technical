import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Board } from '../components/Board';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CurrentMatch() {
	const [squares, setSquares] = useState<(string | null)[]>(
		Array(9).fill(null)
	);
	const [xIsNext, setXIsNext] = useState(true);

	const calculateWinner = (squares: (string | null)[]) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	const handleSquarePress = (i: number) => {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		const newSquares = squares.slice();
		newSquares[i] = xIsNext ? 'X' : 'O';
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};

	const resetGame = () => {
		setSquares(Array(9).fill(null));
		setXIsNext(true);
	};

	const winner = calculateWinner(squares);
	const isDraw = !winner && squares.every((square) => square !== null);
	const status = winner
		? `Winner: ${winner === 'X' ? '🐘' : '🦁'}`
		: isDraw
		? 'Game Draw!'
		: `Next player: ${xIsNext ? '🐘' : '🦁'}`;

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>Wildlife Tic-Tac-Toe</Text>
				<Text style={styles.subtitle}>Help preserve our wildlife!</Text>
				<Text style={styles.status}>{status}</Text>
				<Board squares={squares} onSquarePress={handleSquarePress} />
				<TouchableOpacity
					style={styles.resetButton}
					onPress={resetGame}
				>
					<Text style={styles.resetButtonText}>New Game</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.secondary,
		marginBottom: 24,
	},
	status: {
		marginBottom: 20,
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.text,
	},
	resetButton: {
		marginTop: 20,
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		minWidth: 150,
		alignItems: 'center',
	},
	resetButtonText: {
		color: Colors.buttonText,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
