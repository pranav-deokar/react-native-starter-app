import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { inferenceText } from '../services/RunAnywhereCompat';
import { MODEL_IDS } from '../services/ModelService';
import { saveToHistory, SellTimingResult } from '../utils/storage';

type SellTimingNavigationProp = StackNavigationProp<RootStackParamList, 'SellTiming'>;

interface Props {
  navigation: SellTimingNavigationProp;
}

const SellTimingScreen: React.FC<Props> = ({ navigation }) => {
  const { t, language } = useLanguage();

  const [cropType, setCropType] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState<'kharif' | 'rabi' | 'zaid'>('kharif');

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SellTimingResult['result'] | null>(null);

  const handleAnalyze = async () => {
    if (!cropType || !region) {
      Alert.alert(t.common.error, 'Please fill in all required fields');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const prompt = buildPrompt();
      const response = await inferenceText({
        modelId: MODEL_IDS.llm,
        input: prompt,
      });
      const aiResponse = response?.output || 'No response';
      const parsedResult = parseAIResponse(aiResponse);

      setResult(parsedResult);

      const historyItem: SellTimingResult = {
        type: 'sell',
        timestamp: Date.now(),
        inputs: {
          cropType,
          currentPrice,
          season,
          region,
        },
        result: parsedResult,
      };
      await saveToHistory(historyItem);
    } catch (error) {
      console.error('AI analysis failed:', error);
      Alert.alert(t.common.error, 'Failed to analyze. Please ensure AI model is loaded.');
    } finally {
      setAnalyzing(false);
    }
  };

  const buildPrompt = (): string => {
    const languageMap = {
      en: 'English',
      hi: 'Hindi',
      mr: 'Marathi',
      ta: 'Tamil',
      te: 'Telugu',
    };

    const seasonText = {
      kharif: 'Kharif (Monsoon) season',
      rabi: 'Rabi (Winter) season',
      zaid: 'Zaid (Summer) season',
    };

    return `You are an agricultural market expert helping rural farmers in India decide when to sell their crops. Analyze the following details and suggest the best selling strategy. Respond ONLY in ${languageMap[language]} language.

Crop Details:
- Crop Type: ${cropType}
- Region: ${region}
${currentPrice ? `- Current Price: ₹${currentPrice} per quintal` : ''}
- Season: ${seasonText[season]}

IMPORTANT: Respond in the following format (in ${languageMap[language]} language):

TREND: [Upward/Downward/Stable]
RECOMMENDATION: [Sell Now/Wait/Partial Sale]
REASON: [2-3 sentences explaining why this is the best timing]
RISK LEVEL: [Low/Medium/High]

Consider:
- Seasonal price patterns for this crop
- Regional market conditions
- Typical demand during this season
- Storage costs vs waiting for better prices
- Festival seasons and market demand
- Give practical advice for small farmers
- Do not give exact predictions, only decision support`;
  };

  const parseAIResponse = (response: string): SellTimingResult['result'] => {
    const lines = response.split('\n');
    let trend: 'up' | 'down' | 'stable' = 'stable';
    let recommendation = '';
    let reason = '';
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';

    for (const line of lines) {
      const upperLine = line.toUpperCase();
      if (
        upperLine.includes('TREND') ||
        upperLine.includes('रुझान') ||
        upperLine.includes('ट्रेंड') ||
        upperLine.includes('போக்கு') ||
        upperLine.includes('ట్రెండ్')
      ) {
        const trendText = line.split(':')[1]?.trim().toLowerCase() || '';
        if (
          trendText.includes('up') ||
          trendText.includes('ऊपर') ||
          trendText.includes('वर') ||
          trendText.includes('மேல்') ||
          trendText.includes('పైకి')
        ) {
          trend = 'up';
        } else if (
          trendText.includes('down') ||
          trendText.includes('नीचे') ||
          trendText.includes('खाल') ||
          trendText.includes('கீழ்') ||
          trendText.includes('క్రింద')
        ) {
          trend = 'down';
        } else {
          trend = 'stable';
        }
      } else if (
        upperLine.includes('RECOMMENDATION') ||
        upperLine.includes('सिफारिश') ||
        upperLine.includes('शिफारस') ||
        upperLine.includes('பரிந்துரை') ||
        upperLine.includes('సిఫార్సు')
      ) {
        recommendation = line.split(':')[1]?.trim() || '';
      } else if (
        upperLine.includes('REASON') ||
        upperLine.includes('कारण') ||
        upperLine.includes('காரணம்') ||
        upperLine.includes('కారణం')
      ) {
        reason = line.split(':')[1]?.trim() || '';
      } else if (
        upperLine.includes('RISK') ||
        upperLine.includes('जोखिम') ||
        upperLine.includes('ரிஸ்க்') ||
        upperLine.includes('రిస్క్')
      ) {
        const riskText = line.split(':')[1]?.trim().toLowerCase() || '';
        if (
          riskText.includes('low') ||
          riskText.includes('कम') ||
          riskText.includes('குறை') ||
          riskText.includes('తక్కువ')
        ) {
          riskLevel = 'low';
        } else if (
          riskText.includes('high') ||
          riskText.includes('उच्च') ||
          riskText.includes('अधिक') ||
          riskText.includes('அதிக') ||
          riskText.includes('ఎక్కువ')
        ) {
          riskLevel = 'high';
        } else {
          riskLevel = 'medium';
        }
      } else if (reason) {
        reason += ' ' + line.trim();
      }
    }

    if (!recommendation || !reason) {
      recommendation = recommendation || 'See details below';
      reason = reason || response.trim();
    }

    return {
      trend,
      recommendation,
      reason: reason || response,
      riskLevel,
    };
  };

  const handleExplain = () => {
    if (!result) return;

    const context = `Crop: ${cropType}, Region: ${region}, Season: ${season}, Trend: ${result.trend}`;
    const prompt = `Explain in detail why the recommendation is "${result.recommendation}" for this situation: ${context}`;

    navigation.navigate('Explanation', { prompt, context });
  };

  const getTrendIcon = () => {
    if (result?.trend === 'up') return '↑';
    if (result?.trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (result?.trend === 'up') return '#4caf50';
    if (result?.trend === 'down') return '#f44336';
    return '#ff9800';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.sellTiming.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.sellTiming.cropType} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t.sellTiming.cropTypePlaceholder}
              placeholderTextColor="#999"
              value={cropType}
              onChangeText={setCropType}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.sellTiming.region} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t.sellTiming.regionPlaceholder}
              placeholderTextColor="#999"
              value={region}
              onChangeText={setRegion}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.sellTiming.currentPrice}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.sellTiming.currentPricePlaceholder}
              placeholderTextColor="#999"
              value={currentPrice}
              onChangeText={setCurrentPrice}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.sellTiming.season}</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[styles.segmentButton, season === 'kharif' && styles.segmentButtonActive]}
                onPress={() => setSeason('kharif')}
              >
                <Text style={[styles.segmentText, season === 'kharif' && styles.segmentTextActive]}>
                  {t.cropProfit.seasonKharif}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentButton, season === 'rabi' && styles.segmentButtonActive]}
                onPress={() => setSeason('rabi')}
              >
                <Text style={[styles.segmentText, season === 'rabi' && styles.segmentTextActive]}>
                  {t.cropProfit.seasonRabi}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segmentButton, season === 'zaid' && styles.segmentButtonActive]}
                onPress={() => setSeason('zaid')}
              >
                <Text style={[styles.segmentText, season === 'zaid' && styles.segmentTextActive]}>
                  {t.cropProfit.seasonZaid}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={handleAnalyze}
            disabled={analyzing}
          >
            <LinearGradient colors={['#2d8f3d', '#4caf50']} style={styles.analyzeButtonGradient}>
              {analyzing ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.analyzeButtonText}>{t.sellTiming.getSuggestion}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {analyzing && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t.sellTiming.analyzing}</Text>
            </View>
          )}

          {result && !analyzing && (
            <View style={styles.resultContainer}>
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.sellTiming.trend}</Text>
                </View>
                <View style={styles.trendContainer}>
                  <Text style={[styles.trendIcon, { color: getTrendColor() }]}>
                    {getTrendIcon()}
                  </Text>
                  <Text style={[styles.trendText, { color: getTrendColor() }]}>
                    {result.trend === 'up'
                      ? t.sellTiming.trendUp
                      : result.trend === 'down'
                        ? t.sellTiming.trendDown
                        : t.sellTiming.trendStable}
                  </Text>
                </View>
              </View>

              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.sellTiming.recommendation}</Text>
                </View>
                <Text style={styles.recommendationText}>{result.recommendation}</Text>
              </View>

              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.sellTiming.riskLevel}</Text>
                </View>
                <View
                  style={[
                    styles.riskBadge,
                    result.riskLevel === 'low'
                      ? styles.riskLow
                      : result.riskLevel === 'medium'
                        ? styles.riskMedium
                        : styles.riskHigh,
                  ]}
                >
                  <Text style={styles.riskBadgeText}>
                    {result.riskLevel === 'low'
                      ? t.cropProfit.riskLow
                      : result.riskLevel === 'medium'
                        ? t.cropProfit.riskMedium
                        : t.cropProfit.riskHigh}
                  </Text>
                </View>
              </View>

              <View style={styles.reasonCard}>
                <Text style={styles.reasonLabel}>{t.sellTiming.reason}</Text>
                <Text style={styles.reasonText}>{result.reason}</Text>
              </View>

              <TouchableOpacity style={styles.explainButton} onPress={handleExplain}>
                <Text style={styles.explainButtonText}>{t.sellTiming.whyDecision}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#2d8f3d',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  analyzeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  analyzeButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 30,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultHeader: {
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 40,
    fontWeight: '700',
    marginRight: 15,
  },
  trendText: {
    fontSize: 24,
    fontWeight: '700',
  },
  recommendationText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d8f3d',
  },
  riskBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  riskLow: {
    backgroundColor: '#c8e6c9',
  },
  riskMedium: {
    backgroundColor: '#fff9c4',
  },
  riskHigh: {
    backgroundColor: '#ffcdd2',
  },
  riskBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  reasonCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  reasonLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  explainButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2d8f3d',
  },
  explainButtonText: {
    color: '#2d8f3d',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SellTimingScreen;
