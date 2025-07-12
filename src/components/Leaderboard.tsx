'use client';

import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, ParagraphCategory } from '@/types';
import { getLeaderboard, getLeaderboardByCategory } from '@/utils/localStorage';
import { Trophy, Medal, Award, Filter } from 'lucide-react';

interface LeaderboardProps {
  className?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ className = '' }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ParagraphCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadLeaderboard = () => {
      setLoading(true);
      const leaderboard = selectedCategory === 'all' 
        ? getLeaderboard() 
        : getLeaderboardByCategory(selectedCategory);
      setEntries(leaderboard);
      setLoading(false);
    };
    
    loadLeaderboard();
  }, [selectedCategory]);
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'tech', name: 'Tech' },
    { id: 'casual', name: 'Casual' },
    { id: 'random', name: 'Random' }
  ];
  
  if (loading) {
    return (
      <div className={`bg-white rounded-lg border-2 border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h2>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ParagraphCategory | 'all')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No entries yet. Complete a test to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.slice(0, 10).map((entry, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isTopThree 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(rank)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">
                      {entry.playerName || 'Anonymous'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full capitalize">
                      {entry.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(entry.timestamp)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-blue-600">
                    {entry.wpm} WPM
                  </div>
                  <div className="text-sm text-gray-500">
                    {entry.accuracy}% accuracy
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {entries.length > 10 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing top 10 of {entries.length} entries
          </p>
        </div>
      )}
    </div>
  );
};
