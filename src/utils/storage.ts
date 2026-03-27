import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE_KEY = '@agrosmart_onboarding_complete';
const HISTORY_KEY = '@agrosmart_history';

export interface CropDecisionResult {
  type: 'crop';
  timestamp: number;
  inputs: {
    landSize: string;
    cropOptions?: string;
    estimatedCost: string;
    region: string;
    soilType?: string;
    waterAvailability: string;
    season: string;
  };
  result: {
    bestCrop: string;
    estimatedProfit: string;
    riskLevel: 'low' | 'medium' | 'high';
    explanation: string;
  };
}

export interface SellTimingResult {
  type: 'sell';
  timestamp: number;
  inputs: {
    cropType: string;
    currentPrice?: string;
    season: string;
    region: string;
  };
  result: {
    trend: 'up' | 'down' | 'stable';
    recommendation: string;
    reason: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

export type HistoryItem = CropDecisionResult | SellTimingResult;

export const checkOnboardingComplete = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Failed to check onboarding status:', error);
    return false;
  }
};

export const setOnboardingComplete = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
  } catch (error) {
    console.error('Failed to set onboarding complete:', error);
  }
};

export const saveToHistory = async (item: HistoryItem): Promise<void> => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
    const history: HistoryItem[] = historyJson ? JSON.parse(historyJson) : [];
    history.unshift(item); // Add to beginning

    // Keep only last 50 items
    if (history.length > 50) {
      history.splice(50);
    }

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
