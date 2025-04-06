import React from 'react';

/**
 * Champ de saisie réutilisable
 */
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  className = '',
  disabled = false,
}: InputProps) {
  const baseStyles = 'w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    />
  );
}