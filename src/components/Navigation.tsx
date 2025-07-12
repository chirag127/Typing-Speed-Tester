'use client';

import React, { useState } from 'react';
import { Keyboard, Trophy, User, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentView: 'test' | 'leaderboard' | 'profile';
  onViewChange: (view: 'test' | 'leaderboard' | 'profile') => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'test' as const,
      name: 'Typing Test',
      icon: <Keyboard className="w-5 h-5" />,
      description: 'Take a typing speed test'
    },
    {
      id: 'leaderboard' as const,
      name: 'Leaderboard',
      icon: <Trophy className="w-5 h-5" />,
      description: 'View top scores'
    },
    {
      id: 'profile' as const,
      name: 'Profile',
      icon: <User className="w-5 h-5" />,
      description: 'Manage your profile'
    }
  ];

  const handleNavClick = (view: typeof currentView) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`bg-white border-b-2 border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Keyboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TypingSpeed</h1>
              <p className="text-xs text-gray-500">Test your typing skills</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={item.description}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fadeIn">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <div className="text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
