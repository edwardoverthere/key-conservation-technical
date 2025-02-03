export type GameResult = {
  id: string;
  winner: string | 'draw' | null;
  date: string;
  finalBoard: (string | null)[];
  player1: '🐘';
  player2: '🦁';
};