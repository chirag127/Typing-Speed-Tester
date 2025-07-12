'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '@/utils/calculations';

interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ 
  timeRemaining, 
  isRunning, 
  className = '' 
}) => {
  const formattedTime = formatTime(timeRemaining);
  const isLowTime = timeRemaining <= 10 && timeRemaining > 0;
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock 
        className={`w-5 h-5 ${
          isLowTime 
            ? 'text-red-500 animate-pulse' 
            : isRunning 
              ? 'text-blue-500' 
              : 'text-gray-500'
        }`} 
      />
      <span 
        className={`font-mono text-lg font-semibold ${
          isLowTime 
            ? 'text-red-500 animate-pulse' 
            : isRunning 
              ? 'text-blue-600' 
              : 'text-gray-600'
        }`}
      >
        {formattedTime}
      </span>
    </div>
  );
};
