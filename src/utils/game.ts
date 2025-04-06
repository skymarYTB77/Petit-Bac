/**
 * Utilitaires pour la gestion du jeu
 */

/**
 * Calcule le score pour un ensemble de réponses
 */
export const calculateScore = (answers: Record<string, string>, letter: string) => {
  let roundScore = 0;
  let validWords = 0;
  
  Object.values(answers).forEach(answer => {
    if (answer.trim().toLowerCase().startsWith(letter.toLowerCase())) {
      roundScore += 10;
      validWords++;
    }
  });
  
  return { score: roundScore, validWords };
};

/**
 * Génère une lettre aléatoire pour le jeu
 */
export const generateLetter = (seed: string, currentRound: number, usedLetters: string[] = []) => {
  const letters = 'ABCDEFGHIJLMNOPRSTV';
  
  const hash = Array.from(seed + currentRound).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0
  );
  
  let attempts = 0;
  let newLetter;
  
  do {
    const index = Math.abs((hash + attempts) % letters.length);
    newLetter = letters[index];
    attempts++;
  } while (usedLetters.includes(newLetter) && attempts < letters.length);
  
  return newLetter;
};