'use client';

import React, { useState, useEffect } from 'react';
import { TestResult } from '@/types';
import {
  getUserName,
  saveUserName,
  getTestResults,
  getPersonalBest,
  getAverageStats,
  clearTestResults,
  clearLeaderboard
} from '@/utils/localStorage';
import { User, BarChart3, Trash2, Edit3, Save, X } from 'lucide-react';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ className = '' }) => {
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    const name = getUserName();
    setUserName(name);
    setTempName(name);
    setTestResults(getTestResults());
  }, []);

  const personalBest = getPersonalBest();
  const averageStats = getAverageStats();
  const completedTests = testResults.filter(r => r.completed);

  const handleSaveName = () => {
    saveUserName(tempName);
    setUserName(tempName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditing(false);
  };

  const handleClearData = () => {
    clearTestResults();
    clearLeaderboard();
    setTestResults([]);
    setShowConfirmClear(false);
  };

  const getRecentTests = () => {
    return completedTests
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  };

  const getCategoryStats = () => {
    const stats = completedTests.reduce((acc, test) => {
      if (!acc[test.category]) {
        acc[test.category] = { count: 0, totalWpm: 0, totalAccuracy: 0 };
      }
      acc[test.category].count++;
      acc[test.category].totalWpm += test.wpm;
      acc[test.category].totalAccuracy += test.accuracy;
      return acc;
    }, {} as Record<string, { count: number; totalWpm: number; totalAccuracy: number }>);

    return Object.entries(stats).map(([category, data]) => ({
      category,
      count: data.count,
      avgWpm: Math.round(data.totalWpm / data.count),
      avgAccuracy: Math.round(data.totalAccuracy / data.count)
    }));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* User Info */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            User Profile
          </h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveName}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <div className="text-lg font-medium text-gray-900">
                {userName || 'Anonymous'}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{completedTests.length}</div>
              <div className="text-sm text-blue-700">Tests Completed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">
                {personalBest ? personalBest.wpm : 0}
              </div>
              <div className="text-sm text-green-700">Best WPM</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">
                {personalBest ? personalBest.accuracy : 0}%
              </div>
              <div className="text-sm text-purple-700">Best Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {averageStats && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-500" />
            Average Performance
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageStats.wpm}</div>
              <div className="text-sm text-gray-600">Average WPM</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageStats.accuracy}%</div>
              <div className="text-sm text-gray-600">Average Accuracy</div>
            </div>
          </div>
        </div>
      )}

      {/* Category Performance */}
      {completedTests.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance by Category</h3>

          <div className="space-y-3">
            {getCategoryStats().map((stat) => (
              <div key={stat.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900 capitalize">{stat.category}</span>
                  <span className="text-sm text-gray-500 ml-2">({stat.count} tests)</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{stat.avgWpm} WPM</div>
                  <div className="text-sm text-gray-600">{stat.avgAccuracy}% accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Tests */}
      {completedTests.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tests</h3>

          <div className="space-y-2">
            {getRecentTests().map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900 capitalize">{test.category}</span>
                  <span className="text-sm text-gray-500 ml-2">{formatDate(test.timestamp)}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{test.wpm} WPM</div>
                  <div className="text-sm text-gray-600">{test.accuracy}% accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Management */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Data Management</h3>

        {!showConfirmClear ? (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-red-600 font-medium">
              Are you sure you want to clear all test results and leaderboard data? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Clear All Data
              </button>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
