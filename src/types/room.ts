import type { Player } from './player';
import type { GameSettings } from './game';

/**
 * Types liés aux salles de jeu et leur état
 */
export type GameRoom = {
  id: string;
  code: string;
  host: string;
  players: Player[];
  status: 'waiting' | 'playing' | 'finished';
  settings: GameSettings;
  currentRound?: number;
  currentLetter?: string;
  startTime: number | null;
  endTime: number | null;
  answers?: Record<string, Record<string, string>>;
  seed?: string;
  roundHistory?: RoundHistory[];
  roundEnding?: boolean;
  bannedPlayers?: string[];
};