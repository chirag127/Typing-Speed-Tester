'use client';

import React, { useState } from 'react';
import { Paragraph, TestResult } from '@/types';
import { Navigation } from '@/components/Navigation';
import { ParagraphSelector } from '@/components/ParagraphSelector';
import { TypingTest } from '@/components/TypingTest';
import { Results } from '@/components/Results';
import { Leaderboard } from '@/components/Leaderboard';
import { UserProfile } from '@/components/UserProfile';

export default function Home() {
  const [currentView, setCurrentView] = useState<'test' | 'leaderboard' | 'profile' | 'results' | 'paragraph-select'>('paragraph-select');
  const [selectedParagraph, setSelectedParagraph] = useState<Paragraph | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testDuration] = useState(60); // 60 seconds default

  const handleParagraphSelect = (paragraph: Paragraph) => {
    setSelectedParagraph(paragraph);
    setCurrentView('test');
  };

  const handleTestComplete = (result: TestResult) => {
    setTestResult(result);
    setCurrentView('results');
  };

  const handleNewTest = () => {
    setSelectedParagraph(null);
    setTestResult(null);
    setCurrentView('paragraph-select');
  };

  const handleTestReset = () => {
    // Reset is handled within the TypingTest component
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'paragraph-select':
        return (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to TypingSpeed Tester
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Test your typing speed and accuracy with customizable paragraphs.
                Choose from tech, casual, or random content to practice with.
              </p>
            </div>
            <ParagraphSelector onParagraphSelect={handleParagraphSelect} />
          </div>
        );

      case 'test':
        return selectedParagraph ? (
          <div className="animate-fadeIn">
            <TypingTest
              paragraph={selectedParagraph}
              testDuration={testDuration}
              onComplete={handleTestComplete}
              onReset={handleTestReset}
            />
          </div>
        ) : null;

      case 'results':
        return testResult ? (
          <div className="animate-fadeIn">
            <Results
              result={testResult}
              onNewTest={handleNewTest}
            />
          </div>
        ) : null;

      case 'leaderboard':
        return (
          <div className="animate-fadeIn">
            <Leaderboard />
          </div>
        );

      case 'profile':
        return (
          <div className="animate-fadeIn">
            <UserProfile />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView === 'results' || currentView === 'paragraph-select' ? 'test' : currentView}
        onViewChange={(view) => {
          if (view === 'test') {
            handleNewTest();
          } else {
            setCurrentView(view);
          }
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 TypingSpeed Tester. Built by Chirag Singhal.</p>
            <p className="text-sm mt-1">Test your typing speed and improve your skills!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
