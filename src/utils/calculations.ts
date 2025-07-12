import { TypingStats } from '@/types';

/**
 * Calculate Words Per Minute (WPM)
 * Standard calculation: (characters typed / 5) / (time in minutes)
 */
export const calculateWPM = (correctChars: number, timeInSeconds: number): number => {
  if (timeInSeconds === 0) return 0;
  const timeInMinutes = timeInSeconds / 60;
  const words = correctChars / 5; // Standard: 5 characters = 1 word
  return Math.round(words / timeInMinutes);
};

/**
 * Calculate typing accuracy as a percentage
 */
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

/**
 * Calculate comprehensive typing statistics
 */
export const calculateTypingStats = (
  userInput: string,
  originalText: string,
  timeElapsed: number
): TypingStats => {
  let correctChars = 0;
  let incorrectChars = 0;
  
  // Compare each character
  for (let i = 0; i < userInput.length; i++) {
    if (i < originalText.length && userInput[i] === originalText[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }
  
  const totalChars = userInput.length;
  const wpm = calculateWPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalChars);
  
  return {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalChars,
    timeElapsed
  };
};

/**
 * Get character state for visual feedback
 */
export const getCharacterState = (
  index: number,
  userInput: string,
  originalText: string,
  currentIndex: number
): 'correct' | 'incorrect' | 'current' | 'pending' => {
  if (index === currentIndex) return 'current';
  if (index >= userInput.length) return 'pending';
  
  return userInput[index] === originalText[index] ? 'correct' : 'incorrect';
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (currentIndex: number, totalLength: number): number => {
  if (totalLength === 0) return 0;
  return Math.round((currentIndex / totalLength) * 100);
};

/**
 * Determine typing speed category
 */
export const getSpeedCategory = (wpm: number): string => {
  if (wpm >= 70) return 'Expert';
  if (wpm >= 50) return 'Advanced';
  if (wpm >= 30) return 'Intermediate';
  if (wpm >= 15) return 'Beginner';
  return 'Learning';
};

/**
 * Determine accuracy category
 */
export const getAccuracyCategory = (accuracy: number): string => {
  if (accuracy >= 98) return 'Excellent';
  if (accuracy >= 95) return 'Very Good';
  if (accuracy >= 90) return 'Good';
  if (accuracy >= 80) return 'Fair';
  return 'Needs Improvement';
};
