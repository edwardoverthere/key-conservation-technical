import { createContext, useContext, useState } from 'react';
import { GameResult } from '../types/game.d';

type GameHistoryContextType = {
	games: GameResult[];
	addGame: (game: Omit<GameResult, 'id' | 'date'>) => void;
};

const GameHistoryContext = createContext<GameHistoryContextType | undefined>(
	undefined
);

export function GameHistoryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [games, setGames] = useState<GameResult[]>([]);

	const addGame = (game: Omit<GameResult, 'id' | 'date'>) => {
		const newGame: GameResult = {
			...game,
			id: Date.now().toString(),
			date: new Date().toISOString(),
		};
		setGames((prevGames) => [newGame, ...prevGames]);
	};

	return (
		<GameHistoryContext.Provider value={{ games, addGame }}>
			{children}
		</GameHistoryContext.Provider>
	);
}

export const useGameHistory = () => {
	const context = useContext(GameHistoryContext);
	if (!context) {
		throw new Error(
			'useGameHistory must be used within a GameHistoryProvider'
		);
	}
	return context;
};
