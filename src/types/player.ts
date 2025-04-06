/**
 * Types liés aux joueurs et leurs données
 */
export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  answers?: Record<string, string>;
  score?: number;
  validWords?: number;
  hasValidatedRound?: boolean;
};