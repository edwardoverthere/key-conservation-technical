import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Board } from '../components/Board';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
		? `Winner: ${winner}`
		: isDraw
		? 'Game Draw!'
		: `Next player: ${xIsNext ? 'X' : 'O'}`;

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.status}>{status}</Text>
				<Board squares={squares} onSquarePress={handleSquarePress} />
				<TouchableOpacity
					style={styles.resetButton}
					onPress={resetGame}
				>
					<Text style={styles.resetButtonText}>Reset Game</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	status: {
		marginBottom: 20,
		fontSize: 24,
		fontWeight: 'bold',
	},
	resetButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: '#007AFF',
		borderRadius: 5,
	},
	resetButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
