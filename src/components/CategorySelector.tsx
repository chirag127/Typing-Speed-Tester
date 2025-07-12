'use client';

import React from 'react';
import { ParagraphCategory } from '@/types';
import { Code, Coffee, Shuffle } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: ParagraphCategory;
  onCategoryChange: (category: ParagraphCategory) => void;
  className?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
  className = ''
}) => {
  const categories = [
    {
      id: 'tech' as ParagraphCategory,
      name: 'Tech',
      description: 'Programming and technology content',
      icon: <Code className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'casual' as ParagraphCategory,
      name: 'Casual',
      description: 'Everyday topics and lifestyle',
      icon: <Coffee className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'random' as ParagraphCategory,
      name: 'Random',
      description: 'Mixed topics and general knowledge',
      icon: <Shuffle className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  const getButtonClasses = (category: ParagraphCategory, color: string) => {
    const isSelected = selectedCategory === category;
    const baseClasses = 'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105';

    if (isSelected) {
      return `${baseClasses} border-${color}-500 bg-${color}-50 text-${color}-700 shadow-md`;
    }

    return `${baseClasses} border-gray-200 bg-white text-gray-600 hover:border-${color}-300 hover:bg-${color}-25`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Category</h3>
        <p className="text-sm text-gray-600">Select the type of content you&apos;d like to practice with</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={getButtonClasses(category.id, category.color)}
          >
            <div className={`p-2 rounded-full ${
              selectedCategory === category.id
                ? `bg-${category.color}-100`
                : 'bg-gray-100'
            }`}>
              {category.icon}
            </div>
            <div className="text-center">
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-xs mt-1 opacity-75">{category.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
