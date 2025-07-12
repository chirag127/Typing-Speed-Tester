'use client';

import React, { useState } from 'react';
import { Paragraph, ParagraphCategory } from '@/types';
import { getParagraphsByCategory, getRandomParagraph } from '@/data/paragraphs';
import { CategorySelector } from './CategorySelector';
import { Shuffle, Eye, BarChart3 } from 'lucide-react';

interface ParagraphSelectorProps {
  onParagraphSelect: (paragraph: Paragraph) => void;
  className?: string;
}

export const ParagraphSelector: React.FC<ParagraphSelectorProps> = ({
  onParagraphSelect,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ParagraphCategory>('tech');
  const [selectedParagraph, setSelectedParagraph] = useState<Paragraph | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const paragraphs = getParagraphsByCategory(selectedCategory);
  
  const handleCategoryChange = (category: ParagraphCategory) => {
    setSelectedCategory(category);
    setSelectedParagraph(null);
    setShowPreview(false);
  };
  
  const handleParagraphSelect = (paragraph: Paragraph) => {
    setSelectedParagraph(paragraph);
    setShowPreview(true);
  };
  
  const handleRandomSelect = () => {
    const randomParagraph = getRandomParagraph(selectedCategory);
    setSelectedParagraph(randomParagraph);
    onParagraphSelect(randomParagraph);
  };
  
  const handleConfirmSelection = () => {
    if (selectedParagraph) {
      onParagraphSelect(selectedParagraph);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getDifficultyStats = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { bars: 1, description: 'Simple vocabulary and structure' };
      case 'medium':
        return { bars: 2, description: 'Moderate complexity and terminology' };
      case 'hard':
        return { bars: 3, description: 'Complex vocabulary and concepts' };
      default:
        return { bars: 1, description: 'Unknown difficulty' };
    }
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Selection */}
      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* Quick Random Selection */}
      <div className="text-center">
        <button
          onClick={handleRandomSelect}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
        >
          <Shuffle className="w-5 h-5" />
          Random {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Paragraph
        </button>
      </div>
      
      {/* Paragraph List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Choose a Specific Paragraph
        </h3>
        
        <div className="grid gap-3">
          {paragraphs.map((paragraph) => {
            const isSelected = selectedParagraph?.id === paragraph.id;
            const difficultyStats = getDifficultyStats(paragraph.difficulty);
            
            return (
              <div
                key={paragraph.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParagraphSelect(paragraph)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{paragraph.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(paragraph.difficulty)}`}>
                        {paragraph.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-3 rounded-sm ${
                                i < difficultyStats.bars ? 'bg-gray-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1">{difficultyStats.description}</span>
                      </div>
                      
                      <div>
                        {paragraph.content.length} characters
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleParagraphSelect(paragraph);
                      setShowPreview(!showPreview || selectedParagraph?.id !== paragraph.id);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Preview */}
      {showPreview && selectedParagraph && (
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <button
              onClick={handleConfirmSelection}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Test
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h4 className="font-medium text-gray-900">{selectedParagraph.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedParagraph.difficulty)}`}>
                {selectedParagraph.difficulty}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                {selectedParagraph.category}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg font-mono leading-relaxed">
              {selectedParagraph.content.substring(0, 200)}
              {selectedParagraph.content.length > 200 && (
                <span className="text-gray-400">... ({selectedParagraph.content.length - 200} more characters)</span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Length: {selectedParagraph.content.length} characters</span>
              <span>Estimated time: {Math.ceil(selectedParagraph.content.length / 250)} minutes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
