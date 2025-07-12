// Core types for the Typing Speed Tester application

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
}

export interface TestResult extends TypingStats {
  id: string;
  timestamp: number;
  category: ParagraphCategory;
  paragraphId: string;
  completed: boolean;
}

export interface LeaderboardEntry {
  id: string;
  wpm: number;
  accuracy: number;
  timestamp: number;
  category: ParagraphCategory;
  playerName?: string;
}

export type ParagraphCategory = 'tech' | 'casual' | 'random';

export interface Paragraph {
  id: string;
  category: ParagraphCategory;
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TypingTestState {
  isActive: boolean;
  isCompleted: boolean;
  isPaused: boolean;
  startTime: number | null;
  endTime: number | null;
  currentIndex: number;
  userInput: string;
  errors: Set<number>;
  stats: TypingStats;
}

export interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  duration: number;
}

export interface AppSettings {
  testDuration: number; // in seconds
  showTimer: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
}

// Character state for visual feedback
export type CharacterState = 'correct' | 'incorrect' | 'current' | 'pending';

export interface CharacterInfo {
  char: string;
  state: CharacterState;
  index: number;
}
