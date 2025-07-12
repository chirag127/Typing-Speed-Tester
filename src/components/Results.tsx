'use client';

import React from 'react';
import { TestResult } from '@/types';
import { getSpeedCategory, getAccuracyCategory } from '@/utils/calculations';
import { getPersonalBest, getAverageStats } from '@/utils/localStorage';
import { Trophy, Target, Clock, TrendingUp, Award, BarChart3 } from 'lucide-react';

interface ResultsProps {
  result: TestResult;
  onNewTest: () => void;
  className?: string;
}

export const Results: React.FC<ResultsProps> = ({
  result,
  onNewTest,
  className = ''
}) => {
  const personalBest = getPersonalBest();
  const averageStats = getAverageStats();
  const speedCategory = getSpeedCategory(result.wpm);
  const accuracyCategory = getAccuracyCategory(result.accuracy);
  
  const isNewWpmRecord = !personalBest || result.wpm > personalBest.wpm;
  const isNewAccuracyRecord = !personalBest || result.accuracy > personalBest.accuracy;
  
  const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    category?: string;
    isRecord?: boolean;
    color: string;
  }> = ({ icon, label, value, unit, category, isRecord, color }) => (
    <div className={`bg-white rounded-lg p-6 border-2 ${isRecord ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'} relative`}>
      {isRecord && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            New Record!
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{label}</h3>
          {category && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {category}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-lg text-gray-500">{unit}</span>}
      </div>
    </div>
  );
  
  const ComparisonCard: React.FC<{
    title: string;
    current: number;
    comparison: number;
    unit: string;
    type: 'wpm' | 'accuracy';
  }> = ({ title, current, comparison, unit, type }) => {
    const difference = current - comparison;
    const isImprovement = difference > 0;
    const percentage = comparison > 0 ? Math.abs((difference / comparison) * 100) : 0;
    
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{current}{unit}</span>
            <span className="text-sm text-gray-500 ml-1">vs {comparison}{unit}</span>
          </div>
          <div className={`text-sm font-medium ${isImprovement ? 'text-green-600' : 'text-red-600'}`}>
            {isImprovement ? '+' : ''}{difference.toFixed(type === 'accuracy' ? 1 : 0)}{unit}
            {percentage > 0 && (
              <span className="text-xs ml-1">
                ({percentage.toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h1>
        <p className="text-gray-600">
          Category: <span className="capitalize font-medium">{result.category}</span> • 
          Duration: {result.timeElapsed.toFixed(1)}s
        </p>
      </div>
      
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          label="Speed"
          value={result.wpm}
          unit="WPM"
          category={speedCategory}
          isRecord={isNewWpmRecord}
          color="bg-blue-500"
        />
        
        <StatCard
          icon={<Target className="w-6 h-6 text-white" />}
          label="Accuracy"
          value={result.accuracy}
          unit="%"
          category={accuracyCategory}
          isRecord={isNewAccuracyRecord}
          color="bg-green-500"
        />
        
        <StatCard
          icon={<Clock className="w-6 h-6 text-white" />}
          label="Time"
          value={result.timeElapsed.toFixed(1)}
          unit="sec"
          color="bg-purple-500"
        />
        
        <StatCard
          icon={<BarChart3 className="w-6 h-6 text-white" />}
          label="Characters"
          value={`${result.correctChars}/${result.totalChars}`}
          color="bg-orange-500"
        />
      </div>
      
      {/* Comparisons */}
      {(personalBest || averageStats) && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Performance Comparison
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalBest && (
              <>
                <ComparisonCard
                  title="vs Personal Best"
                  current={result.wpm}
                  comparison={personalBest.wpm}
                  unit=" WPM"
                  type="wpm"
                />
                <ComparisonCard
                  title="vs Best Accuracy"
                  current={result.accuracy}
                  comparison={personalBest.accuracy}
                  unit="%"
                  type="accuracy"
                />
              </>
            )}
            
            {averageStats && (
              <>
                <ComparisonCard
                  title="vs Average Speed"
                  current={result.wpm}
                  comparison={averageStats.wpm}
                  unit=" WPM"
                  type="wpm"
                />
                <ComparisonCard
                  title="vs Average Accuracy"
                  current={result.accuracy}
                  comparison={averageStats.accuracy}
                  unit="%"
                  type="accuracy"
                />
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Detailed Stats */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{result.correctChars}</div>
            <div className="text-green-700">Correct Characters</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{result.incorrectChars}</div>
            <div className="text-red-700">Incorrect Characters</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{result.totalChars}</div>
            <div className="text-blue-700">Total Characters</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{result.timeElapsed.toFixed(1)}s</div>
            <div className="text-purple-700">Time Elapsed</div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onNewTest}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Take Another Test
        </button>
      </div>
    </div>
  );
};
