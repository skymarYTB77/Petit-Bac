/**
 * Types liés aux paramètres et à la configuration du jeu
 */
export type Category = {
  name: string;
  label: string;
};

export type GameSettings = {
  timeLimit: number;
  maxPlayers: number;
  rounds: number;
  categories: Category[];
  customCategories: Category[];
};