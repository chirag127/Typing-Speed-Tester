'use client';

import React from 'react';
import { TypingStats } from '@/types';
import { getSpeedCategory, getAccuracyCategory, calculateProgress } from '@/utils/calculations';
import { Zap, Target, Clock, TrendingUp } from 'lucide-react';

interface StatsDisplayProps {
  stats: TypingStats;
  currentIndex: number;
  totalLength: number;
  isLive?: boolean;
  className?: string;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  currentIndex,
  totalLength,
  isLive = false,
  className = ''
}) => {
  const progress = calculateProgress(currentIndex, totalLength);
  const speedCategory = getSpeedCategory(stats.wpm);
  const accuracyCategory = getAccuracyCategory(stats.accuracy);
  
  const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    category?: string;
    color: string;
  }> = ({ icon, label, value, unit, category, color }) => (
    <div className={`bg-white rounded-lg p-4 border-2 border-gray-200 ${isLive ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1 rounded ${color}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
      {category && (
        <div className="mt-1">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {category}
          </span>
        </div>
      )}
    </div>
  );
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{currentIndex} chars</span>
          <span>{totalLength} chars</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Zap className="w-4 h-4 text-white" />}
          label="Speed"
          value={stats.wpm}
          unit="WPM"
          category={speedCategory}
          color="bg-blue-500"
        />
        
        <StatCard
          icon={<Target className="w-4 h-4 text-white" />}
          label="Accuracy"
          value={stats.accuracy}
          unit="%"
          category={accuracyCategory}
          color="bg-green-500"
        />
        
        <StatCard
          icon={<Clock className="w-4 h-4 text-white" />}
          label="Time"
          value={Math.round(stats.timeElapsed)}
          unit="sec"
          color="bg-purple-500"
        />
        
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          label="Characters"
          value={`${stats.correctChars}/${stats.totalChars}`}
          color="bg-orange-500"
        />
      </div>
      
      {/* Detailed Stats */}
      {!isLive && (
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Detailed Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Correct Characters:</span>
              <span className="ml-2 font-medium text-green-600">{stats.correctChars}</span>
            </div>
            <div>
              <span className="text-gray-500">Incorrect Characters:</span>
              <span className="ml-2 font-medium text-red-600">{stats.incorrectChars}</span>
            </div>
            <div>
              <span className="text-gray-500">Total Characters:</span>
              <span className="ml-2 font-medium">{stats.totalChars}</span>
            </div>
            <div>
              <span className="text-gray-500">Time Elapsed:</span>
              <span className="ml-2 font-medium">{stats.timeElapsed.toFixed(1)}s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
