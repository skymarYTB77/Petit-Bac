import React from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

/**
 * Modal réutilisable
 */
interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ title, children, onClose, className = '' }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white/10 backdrop-blur-xl rounded-xl w-full max-w-2xl overflow-hidden ${className}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}