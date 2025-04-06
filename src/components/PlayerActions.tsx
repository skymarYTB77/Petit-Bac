import React from 'react';
import { Shield, UserMinus, UserX } from 'lucide-react';
import { Button } from './ui/Button';

interface PlayerActionsProps {
  playerName: string;
  onTransfer: (playerName: string) => void;
  onKick: (playerName: string) => void;
  onBan: (playerName: string) => void;
}

export function PlayerActions({ playerName, onTransfer, onKick, onBan }: PlayerActionsProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden z-10">
      <button
        onClick={() => onTransfer(playerName)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200"
      >
        <Shield className="w-4 h-4" />
        <span>Transférer l'hôte</span>
      </button>
      <button
        onClick={() => onKick(playerName)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200 text-orange-400"
      >
        <UserMinus className="w-4 h-4" />
        <span>Exclure</span>
      </button>
      <button
        onClick={() => onBan(playerName)}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200 text-red-400"
      >
        <UserX className="w-4 h-4" />
        <span>Bannir</span>
      </button>
    </div>
  );
}