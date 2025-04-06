import React from 'react';
import { Crown } from 'lucide-react';
import type { Player } from '../types';

interface PlayerInfoProps {
  player: Player;
  currentPlayerName: string;
  onActionClick: (playerName: string) => void;
}

export function PlayerInfo({ player, currentPlayerName, onActionClick }: PlayerInfoProps) {
  return (
    <div
      className={`flex items-center justify-between ${
        player.name === currentPlayerName ? 'bg-white/20' : 'bg-white/10'
      } p-4 rounded-lg transition-colors duration-200`}
    >
      <div className="flex items-center gap-3">
        {player.isHost && <Crown className="w-5 h-5 text-yellow-400" />}
        <span className="font-medium">
          {player.name}
          {player.name === currentPlayerName && " (vous)"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          player.isReady || player.isHost
            ? 'bg-green-500/20 text-green-400'
            : 'bg-orange-500/20 text-orange-400'
        }`}>
          {player.isHost ? 'Hôte' : player.isReady ? 'Prêt' : 'En attente'}
        </div>
        {player.name !== currentPlayerName && (
          <button
            onClick={() => onActionClick(player.name)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <span className="sr-only">Actions pour {player.name}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}