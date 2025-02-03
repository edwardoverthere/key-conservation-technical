import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type SquareProps = {
	value: string | null;
	onPress: () => void;
};

const Square = ({ value, onPress }: SquareProps) => (
	<TouchableOpacity style={styles.square} onPress={onPress}>
		<Text style={styles.squareText}>{value}</Text>
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
	},
	row: {
		flexDirection: 'row',
	},
	square: {
		width: 80,
		height: 80,
		borderWidth: 1,
		borderColor: '#999',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
		backgroundColor: '#fff',
	},
	squareText: {
		fontSize: 40,
	},
});
