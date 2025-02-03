import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameResult } from '../types/game';

const STORAGE_KEY = 'wildlife-tictactoe-history';

type GameHistoryContextType = {
	games: GameResult[];
	addGame: (game: Omit<GameResult, 'id' | 'date'>) => void;
	clearHistory: () => void;
};

const GameHistoryContext = createContext<GameHistoryContextType | undefined>(
	undefined
);

function GameHistoryProvider({ children }: { children: React.ReactNode }) {
	const [games, setGames] = useState<GameResult[]>([]);

	// Load games from storage when component mounts
	useEffect(() => {
		loadGames();
	}, []);

	const loadGames = async () => {
		try {
			const storedGames = await AsyncStorage.getItem(STORAGE_KEY);
			if (storedGames) {
				setGames(JSON.parse(storedGames));
			}
		} catch (error) {
			console.error('Error loading games:', error);
		}
	};

	const saveGames = async (updatedGames: GameResult[]) => {
		try {
			await AsyncStorage.setItem(
				STORAGE_KEY,
				JSON.stringify(updatedGames)
			);
		} catch (error) {
			console.error('Error saving games:', error);
		}
	};

	const addGame = (game: Omit<GameResult, 'id' | 'date'>) => {
		const newGame: GameResult = {
			...game,
			id: Date.now().toString(),
			date: new Date().toISOString(),
		};
		const updatedGames = [newGame, ...games];
		setGames(updatedGames);
		saveGames(updatedGames);
	};

	const clearHistory = async () => {
		try {
			await AsyncStorage.removeItem(STORAGE_KEY);
			setGames([]);
		} catch (error) {
			console.error('Error clearing history:', error);
		}
	};

	return (
		<GameHistoryContext.Provider value={{ games, addGame, clearHistory }}>
			{children}
		</GameHistoryContext.Provider>
	);
}

const useGameHistory = () => {
	const context = useContext(GameHistoryContext);
	if (!context) {
		throw new Error(
			'useGameHistory must be used within a GameHistoryProvider'
		);
	}
	return context;
};

export { useGameHistory };
export default GameHistoryProvider;
