'use client';

import React from 'react';
import { getCharacterState } from '@/utils/calculations';

interface TypingDisplayProps {
  text: string;
  userInput: string;
  currentIndex: number;
  className?: string;
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  text,
  userInput,
  currentIndex,
  className = ''
}) => {
  const renderCharacter = (char: string, index: number) => {
    const state = getCharacterState(index, userInput, text, currentIndex);
    
    let charClassName = 'relative ';
    
    switch (state) {
      case 'correct':
        charClassName += 'text-green-600 bg-green-50';
        break;
      case 'incorrect':
        charClassName += 'text-red-600 bg-red-50';
        break;
      case 'current':
        charClassName += 'text-gray-900 bg-blue-200 animate-pulse';
        break;
      case 'pending':
        charClassName += 'text-gray-400';
        break;
    }
    
    // Handle spaces
    if (char === ' ') {
      return (
        <span
          key={index}
          className={`${charClassName} inline-block w-2`}
        >
          {state === 'current' && (
            <span className="absolute top-0 left-0 w-full h-full border-l-2 border-blue-500 animate-pulse" />
          )}
          &nbsp;
        </span>
      );
    }
    
    return (
      <span
        key={index}
        className={`${charClassName} px-0.5 rounded-sm`}
      >
        {char}
        {state === 'current' && (
          <span className="absolute top-0 left-0 w-full h-full border-l-2 border-blue-500 animate-pulse" />
        )}
      </span>
    );
  };
  
  return (
    <div className={`font-mono text-lg leading-relaxed p-6 bg-white rounded-lg border-2 border-gray-200 focus-within:border-blue-300 transition-colors ${className}`}>
      <div className="whitespace-pre-wrap break-words">
        {text.split('').map((char, index) => renderCharacter(char, index))}
      </div>
    </div>
  );
};
