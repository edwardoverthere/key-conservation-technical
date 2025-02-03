import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/Colors';

type SquareProps = {
	value: string | null;
	onPress: () => void;
};

const Square = ({ value, onPress }: SquareProps) => (
	<TouchableOpacity style={styles.square} onPress={onPress}>
		<Text style={styles.squareText}>
			{value === 'X' ? '🐘' : value === 'O' ? '🦁' : ''}
		</Text>
	</TouchableOpacity>
);

type BoardProps = {
	squares: (string | null)[];
	onSquarePress: (index: number) => void;
};

export const Board = ({ squares, onSquarePress }: BoardProps) => {
	const renderSquare = (i: number) => (
		<Square value={squares[i]} onPress={() => onSquarePress(i)} />
	);

	return (
		<View style={styles.board}>
			<View style={styles.row}>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</View>
			<View style={styles.row}>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</View>
			<View style={styles.row}>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	board: {
		padding: 10,
		backgroundColor: Colors.background,
		borderRadius: 15,
		shadowColor: Colors.secondary,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	row: {
		flexDirection: 'row',
	},
	square: {
		width: 90,
		height: 90,
		borderWidth: 2,
		borderColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	squareText: {
		fontSize: 40,
	},
});
