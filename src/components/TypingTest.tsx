'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Paragraph, TypingTestState, TestResult } from '@/types';
import { calculateTypingStats } from '@/utils/calculations';
import { saveTestResult } from '@/utils/localStorage';
import { TypingDisplay } from './TypingDisplay';
import { StatsDisplay } from './StatsDisplay';
import { Timer } from './Timer';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface TypingTestProps {
  paragraph: Paragraph;
  testDuration: number;
  onComplete: (result: TestResult) => void;
  onReset: () => void;
  className?: string;
}

export const TypingTest: React.FC<TypingTestProps> = ({
  paragraph,
  testDuration,
  onComplete,
  onReset,
  className = ''
}) => {
  const [testState, setTestState] = useState<TypingTestState>({
    isActive: false,
    isCompleted: false,
    isPaused: false,
    startTime: null,
    endTime: null,
    currentIndex: 0,
    userInput: '',
    errors: new Set(),
    stats: {
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0
    }
  });

  const [timeRemaining, setTimeRemaining] = useState(testDuration);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate stats in real-time
  const updateStats = useCallback(() => {
    if (!testState.startTime) return;

    const now = Date.now();
    const timeElapsed = (now - testState.startTime) / 1000;
    const stats = calculateTypingStats(testState.userInput, paragraph.content, timeElapsed);

    setTestState(prev => ({
      ...prev,
      stats: { ...stats, timeElapsed }
    }));
  }, [testState.startTime, testState.userInput, paragraph.content]);

  // Complete test
  const completeTest = useCallback(() => {
    if (testState.isCompleted) return;

    const endTime = Date.now();
    const finalStats = calculateTypingStats(
      testState.userInput,
      paragraph.content,
      testState.startTime ? (endTime - testState.startTime) / 1000 : 0
    );

    const result: TestResult = {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: endTime,
      category: paragraph.category,
      paragraphId: paragraph.id,
      completed: true,
      ...finalStats
    };

    setTestState(prev => ({
      ...prev,
      isActive: false,
      isCompleted: true,
      endTime,
      stats: finalStats
    }));

    saveTestResult(result);
    onComplete(result);
  }, [testState.userInput, testState.startTime, testState.isCompleted, paragraph, onComplete]);

  // Timer logic
  useEffect(() => {
    if (testState.isActive && !testState.isPaused && !testState.isCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
        updateStats();
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testState.isActive, testState.isPaused, testState.isCompleted, updateStats, completeTest]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const newIndex = value.length;

    // Prevent typing beyond the text length
    if (newIndex > paragraph.content.length) return;

    // Start test on first character
    if (!testState.isActive && value.length > 0) {
      setTestState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now()
      }));
    }

    // Update errors set
    const newErrors = new Set(testState.errors);
    if (newIndex > 0 && value[newIndex - 1] !== paragraph.content[newIndex - 1]) {
      newErrors.add(newIndex - 1);
    }

    setTestState(prev => ({
      ...prev,
      userInput: value,
      currentIndex: newIndex,
      errors: newErrors
    }));

    // Complete test if all text is typed
    if (newIndex === paragraph.content.length) {
      setTimeout(completeTest, 100);
    }
  };

  // Control functions
  const startTest = () => {
    if (!testState.isActive) {
      setTestState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now()
      }));
    } else {
      setTestState(prev => ({
        ...prev,
        isPaused: false
      }));
    }
    inputRef.current?.focus();
  };

  const pauseTest = () => {
    setTestState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const resetTest = () => {
    setTestState({
      isActive: false,
      isCompleted: false,
      isPaused: false,
      startTime: null,
      endTime: null,
      currentIndex: 0,
      userInput: '',
      errors: new Set(),
      stats: {
        wpm: 0,
        accuracy: 100,
        correctChars: 0,
        incorrectChars: 0,
        totalChars: 0,
        timeElapsed: 0
      }
    });
    setTimeRemaining(testDuration);
    onReset();
    inputRef.current?.focus();
  };

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">{paragraph.title}</h2>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
            {paragraph.category} • {paragraph.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Timer
            timeRemaining={timeRemaining}
            isRunning={testState.isActive && !testState.isPaused}
          />

          <div className="flex gap-2">
            {!testState.isActive || testState.isPaused ? (
              <button
                onClick={startTest}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Play className="w-4 h-4" />
                {testState.isPaused ? 'Resume' : 'Start'}
              </button>
            ) : (
              <button
                onClick={pauseTest}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}

            <button
              onClick={resetTest}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Typing display */}
      <TypingDisplay
        text={paragraph.content}
        userInput={testState.userInput}
        currentIndex={testState.currentIndex}
      />

      {/* Hidden input for capturing keystrokes */}
      <textarea
        ref={inputRef}
        value={testState.userInput}
        onChange={handleInputChange}
        disabled={testState.isCompleted || testState.isPaused}
        className="sr-only"
        placeholder="Start typing..."
        autoFocus
      />

      {/* Stats display */}
      <StatsDisplay
        stats={testState.stats}
        currentIndex={testState.currentIndex}
        totalLength={paragraph.content.length}
        isLive={testState.isActive && !testState.isCompleted}
      />

      {/* Completion message */}
      {testState.isCompleted && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-2">Test Completed!</h3>
          <p className="text-green-700">
            Great job! You achieved {testState.stats.wpm} WPM with {testState.stats.accuracy}% accuracy.
          </p>
        </div>
      )}
    </div>
  );
};
