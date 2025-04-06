import React, { useState } from 'react';
import { Users, Crown, RefreshCw, Copy, ChevronLeft } from 'lucide-react';
import type { GameRoom } from '../types';
import { PlayerInfo } from './PlayerInfo';
import { PlayerActions } from './PlayerActions';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

type WaitingRoomProps = {
  room: GameRoom;
  playerName: string;
  onStart: () => void;
  onLeave: () => void;
  onReady: () => void;
  onKickPlayer?: (playerName: string) => void;
  onBanPlayer?: (playerName: string) => void;
  onTransferHost?: (playerName: string) => void;
};

export function WaitingRoom({ 
  room, 
  playerName, 
  onStart, 
  onLeave, 
  onReady,
  onKickPlayer,
  onBanPlayer,
  onTransferHost
}: WaitingRoomProps) {
  const currentPlayer = room.players.find(p => p.name === playerName);
  const isHost = currentPlayer?.isHost;
  const allPlayersReady = room.players
    .filter(p => !p.isHost)
    .every(p => p.isReady);
  const canStart = isHost && allPlayersReady && room.players.length > 1;

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<{
    type: 'kick' | 'ban' | 'transfer' | null;
    playerName: string | null;
  }>({ type: null, playerName: null });

  const copyRoomCode = () => {
    navigator.clipboard.writeText(room.code);
  };

  const handleAction = (type: 'kick' | 'ban' | 'transfer', playerName: string) => {
    setShowConfirmation({ type, playerName });
    setSelectedPlayer(null);
  };

  const confirmAction = () => {
    if (!showConfirmation.type || !showConfirmation.playerName) return;

    switch (showConfirmation.type) {
      case 'kick':
        onKickPlayer?.(showConfirmation.playerName);
        break;
      case 'ban':
        onBanPlayer?.(showConfirmation.playerName);
        break;
      case 'transfer':
        onTransferHost?.(showConfirmation.playerName);
        break;
    }

    setShowConfirmation({ type: null, playerName: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onLeave}
          className="mb-8 flex items-center text-lg hover:text-indigo-300"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Retour au menu
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Salon de jeu</h2>
            <button 
              onClick={copyRoomCode}
              className="flex items-center gap-3 text-xl bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              <span className="font-mono font-bold">{room.code}</span>
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xl text-indigo-200">
              <Users className="w-6 h-6" />
              <span>
                {room.players.length} / {room.settings.maxPlayers} joueurs
              </span>
            </div>

            <div className="space-y-3">
              {room.players.map((player) => (
                <div key={player.id} className="relative">
                  <PlayerInfo
                    player={player}
                    currentPlayerName={playerName}
                    onActionClick={(name) => setSelectedPlayer(name === selectedPlayer ? null : name)}
                  />
                  {isHost && selectedPlayer === player.name && (
                    <PlayerActions
                      playerName={player.name}
                      onTransfer={(name) => handleAction('transfer', name)}
                      onKick={(name) => handleAction('kick', name)}
                      onBan={(name) => handleAction('ban', name)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {!isHost && !currentPlayer?.isReady && (
            <Button
              variant="success"
              fullWidth
              onClick={onReady}
            >
              Je suis prêt
            </Button>
          )}
          {isHost && (
            <Button
              variant="primary"
              fullWidth
              disabled={!canStart}
              onClick={onStart}
            >
              <RefreshCw className="w-5 h-5" />
              Lancer la partie
            </Button>
          )}
        </div>

        {isHost && !canStart && (
          <p className="mt-4 text-center text-indigo-200 text-sm">
            En attente que tous les joueurs soient prêts pour lancer la partie...
          </p>
        )}
      </div>

      {showConfirmation.type && (
        <Modal
          title={
            showConfirmation.type === 'kick' ? "Confirmer l'exclusion" :
            showConfirmation.type === 'ban' ? "Confirmer le bannissement" :
            "Confirmer le transfert d'hôte"
          }
          onClose={() => setShowConfirmation({ type: null, playerName: null })}
        >
          <div className="space-y-6">
            <p>
              {showConfirmation.type === 'kick' && `Êtes-vous sûr de vouloir exclure ${showConfirmation.playerName} ?`}
              {showConfirmation.type === 'ban' && `Êtes-vous sûr de vouloir bannir définitivement ${showConfirmation.playerName} ?`}
              {showConfirmation.type === 'transfer' && `Êtes-vous sûr de vouloir transférer votre statut d'hôte à ${showConfirmation.playerName} ?`}
            </p>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowConfirmation({ type: null, playerName: null })}
              >
                Annuler
              </Button>
              <Button
                variant={showConfirmation.type === 'transfer' ? 'primary' : 'danger'}
                fullWidth
                onClick={confirmAction}
              >
                Confirmer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}