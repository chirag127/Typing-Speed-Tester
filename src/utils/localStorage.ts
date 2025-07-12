import { TestResult, LeaderboardEntry, AppSettings } from '@/types';

const STORAGE_KEYS = {
  TEST_RESULTS: 'typing-speed-tester-results',
  LEADERBOARD: 'typing-speed-tester-leaderboard',
  SETTINGS: 'typing-speed-tester-settings',
  USER_NAME: 'typing-speed-tester-username'
} as const;

/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely get item from localStorage
 */
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 */
const setStorageItem = <T>(key: string, value: T): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

// Test Results Management
export const saveTestResult = (result: TestResult): void => {
  const results = getTestResults();
  results.push(result);
  
  // Keep only the last 100 results to prevent storage bloat
  const limitedResults = results.slice(-100);
  setStorageItem(STORAGE_KEYS.TEST_RESULTS, limitedResults);
  
  // Update leaderboard if this is a completed test
  if (result.completed) {
    updateLeaderboard(result);
  }
};

export const getTestResults = (): TestResult[] => {
  return getStorageItem(STORAGE_KEYS.TEST_RESULTS, []);
};

export const clearTestResults = (): void => {
  setStorageItem(STORAGE_KEYS.TEST_RESULTS, []);
};

// Leaderboard Management
export const updateLeaderboard = (result: TestResult): void => {
  const leaderboard = getLeaderboard();
  const userName = getUserName();
  
  const entry: LeaderboardEntry = {
    id: result.id,
    wpm: result.wpm,
    accuracy: result.accuracy,
    timestamp: result.timestamp,
    category: result.category,
    playerName: userName || 'Anonymous'
  };
  
  leaderboard.push(entry);
  
  // Sort by WPM (descending), then by accuracy (descending)
  leaderboard.sort((a, b) => {
    if (b.wpm !== a.wpm) return b.wpm - a.wpm;
    return b.accuracy - a.accuracy;
  });
  
  // Keep only top 50 entries
  const topEntries = leaderboard.slice(0, 50);
  setStorageItem(STORAGE_KEYS.LEADERBOARD, topEntries);
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  return getStorageItem(STORAGE_KEYS.LEADERBOARD, []);
};

export const getLeaderboardByCategory = (category: string): LeaderboardEntry[] => {
  const leaderboard = getLeaderboard();
  return leaderboard.filter(entry => entry.category === category);
};

export const clearLeaderboard = (): void => {
  setStorageItem(STORAGE_KEYS.LEADERBOARD, []);
};

// Settings Management
export const getSettings = (): AppSettings => {
  return getStorageItem(STORAGE_KEYS.SETTINGS, {
    testDuration: 60,
    showTimer: true,
    soundEnabled: false,
    theme: 'light'
  });
};

export const saveSettings = (settings: AppSettings): void => {
  setStorageItem(STORAGE_KEYS.SETTINGS, settings);
};

// User Name Management
export const getUserName = (): string => {
  return getStorageItem(STORAGE_KEYS.USER_NAME, '');
};

export const saveUserName = (name: string): void => {
  setStorageItem(STORAGE_KEYS.USER_NAME, name);
};

// Statistics
export const getPersonalBest = (): { wpm: number; accuracy: number } | null => {
  const results = getTestResults().filter(r => r.completed);
  if (results.length === 0) return null;
  
  const bestWpm = Math.max(...results.map(r => r.wpm));
  const bestAccuracy = Math.max(...results.map(r => r.accuracy));
  
  return { wpm: bestWpm, accuracy: bestAccuracy };
};

export const getAverageStats = (): { wpm: number; accuracy: number } | null => {
  const results = getTestResults().filter(r => r.completed);
  if (results.length === 0) return null;
  
  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
  const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length);
  
  return { wpm: avgWpm, accuracy: avgAccuracy };
};
