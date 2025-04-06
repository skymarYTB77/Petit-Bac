import type { Round } from './round';
import type { GameSettings } from './game';

/**
 * Types liés à l'historique des parties
 */
export type GameHistory = {
  id: string;
  date: string;
  rounds: Round[];
  totalScore: number;
  settings: GameSettings;
};