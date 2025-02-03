import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

type SquareProps = {
	value: string | null;
	onPress: () => void;
	disabled?: boolean;
};

const Square = ({ value, onPress, disabled }: SquareProps) => (
	<TouchableOpacity
		style={[styles.square, disabled && styles.squareDisabled]}
		onPress={onPress}
		disabled={disabled}
	>
		<Text style={styles.squareText}>
			{value === 'X' ? '🐘' : value === 'O' ? '🦁' : ''}
		</Text>
	</TouchableOpacity>
);

type BoardProps = {
	squares: (string | null)[];
	onSquarePress: (index: number) => void;
	disabled?: boolean;
};

const Board = ({ squares, onSquarePress, disabled = false }: BoardProps) => {
	const renderSquare = (i: number) => (
		<Square
			value={squares[i]}
			onPress={() => !disabled && onSquarePress(i)}
			disabled={disabled}
		/>
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
		backgroundColor: Colors.shared.background,
		borderRadius: 15,
		shadowColor: Colors.shared.secondary,
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
		borderColor: Colors.shared.primary,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
	squareText: {
		fontSize: 40,
	},
	squareDisabled: {
		opacity: 0.8,
	},
});

export default Board;
