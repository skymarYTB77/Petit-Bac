/**
 * Types liés aux manches et au score
 */
export type Round = {
  letter: string;
  answers: Record<string, string>;
  score: number;
};

export type RoundHistory = {
  letter: string;
  playerAnswers: Record<string, PlayerRoundAnswers>;
};

export type PlayerRoundAnswers = {
  answers: Record<string, string>;
  validWords: number;
  score: number;
};