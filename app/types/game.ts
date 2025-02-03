export type GameResult = {
  id: string;
  winner: string | 'draw' | null;
  date: string;
  finalBoard: (string | null)[];
  player1: '🐘';
  player2: '🦁';
};

// Create an empty object as default export to satisfy router
const gameTypes = {};

export default gameTypes;