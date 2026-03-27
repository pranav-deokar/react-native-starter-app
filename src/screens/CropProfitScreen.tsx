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
import { saveToHistory, CropDecisionResult } from '../utils/storage';

type CropProfitNavigationProp = StackNavigationProp<RootStackParamList, 'CropProfit'>;

interface Props {
  navigation: CropProfitNavigationProp;
}

const CropProfitScreen: React.FC<Props> = ({ navigation }) => {
  const { t, language } = useLanguage();

  const [landSize, setLandSize] = useState('');
  const [cropOptions, setCropOptions] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [region, setRegion] = useState('');
  const [soilType, setSoilType] = useState('');
  const [waterAvailability, setWaterAvailability] = useState<'low' | 'medium' | 'high'>('medium');
  const [season, setSeason] = useState<'kharif' | 'rabi' | 'zaid'>('kharif');

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CropDecisionResult['result'] | null>(null);

  const handleAnalyze = async () => {
    if (!landSize || !region || !estimatedCost) {
      Alert.alert(t.common.error, 'Please fill in all required fields');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      // Build AI prompt based on language
      const prompt = buildPrompt();

      const response = await inferenceText({
        modelId: MODEL_IDS.llm,
        input: prompt,
      });
      const aiResponse = response?.output || 'No response';

      // Parse AI response
      const parsedResult = parseAIResponse(aiResponse);

      setResult(parsedResult);

      // Save to history
      const historyItem: CropDecisionResult = {
        type: 'crop',
        timestamp: Date.now(),
        inputs: {
          landSize,
          cropOptions,
          estimatedCost,
          region,
          soilType,
          waterAvailability,
          season,
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

    const waterText = {
      low: 'Low water availability',
      medium: 'Medium water availability',
      high: 'High water availability',
    };

    const seasonText = {
      kharif: 'Kharif (Monsoon) season',
      rabi: 'Rabi (Winter) season',
      zaid: 'Zaid (Summer) season',
    };

    return `You are an agricultural expert helping rural farmers in India. Analyze the following farm details and suggest the most profitable crop. Respond ONLY in ${languageMap[language]} language.

Farm Details:
- Land Size: ${landSize} acres
- Region: ${region}
${soilType ? `- Soil Type: ${soilType}` : ''}
${cropOptions ? `- Crop Options: ${cropOptions}` : ''}
- Estimated Budget: ₹${estimatedCost}
- Water Availability: ${waterText[waterAvailability]}
- Season: ${seasonText[season]}

IMPORTANT: Respond in the following format (in ${languageMap[language]} language):

BEST CROP: [crop name]
ESTIMATED PROFIT: ₹[amount] per acre
RISK LEVEL: [Low/Medium/High]
REASON: [2-3 sentences explaining why this crop is best for this situation]

Remember:
- Base your recommendation on the region's climate and soil
- Consider water needs of crops
- Factor in market demand and prices
- Give practical advice for small farmers
- Keep the response concise and clear
- Do not give exact predictions, only decision support`;
  };

  const parseAIResponse = (response: string): CropDecisionResult['result'] => {
    const lines = response.split('\n');
    let bestCrop = '';
    let estimatedProfit = '';
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let explanation = '';

    for (const line of lines) {
      const upperLine = line.toUpperCase();
      if (
        upperLine.includes('BEST CROP') ||
        upperLine.includes('सबसे अच्छी फसल') ||
        upperLine.includes('सर्वोत्तम पीक') ||
        upperLine.includes('சிறந்த பயிர்') ||
        upperLine.includes('ఉత్తమ పంట')
      ) {
        bestCrop = line.split(':')[1]?.trim() || '';
      } else if (
        upperLine.includes('PROFIT') ||
        upperLine.includes('लाभ') ||
        upperLine.includes('नफा') ||
        upperLine.includes('லாபம்') ||
        upperLine.includes('లాభం')
      ) {
        estimatedProfit = line.split(':')[1]?.trim() || '';
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
          riskText.includes('ஏற்றும்') ||
          riskText.includes('ఎక్కువ')
        ) {
          riskLevel = 'high';
        } else {
          riskLevel = 'medium';
        }
      } else if (
        upperLine.includes('REASON') ||
        upperLine.includes('कारण') ||
        upperLine.includes('காரணம்') ||
        upperLine.includes('కారణం')
      ) {
        explanation = line.split(':')[1]?.trim() || '';
      } else if (explanation) {
        explanation += ' ' + line.trim();
      }
    }

    // Fallback parsing if structured format not found
    if (!bestCrop || !estimatedProfit) {
      bestCrop = bestCrop || 'See details below';
      estimatedProfit = estimatedProfit || 'Varies by market';
      explanation = explanation || response.trim();
    }

    return {
      bestCrop,
      estimatedProfit,
      riskLevel,
      explanation: explanation || response,
    };
  };

  const handleExplain = () => {
    if (!result) return;

    const context = `Land: ${landSize} acres, Region: ${region}, Season: ${season}, Water: ${waterAvailability}`;
    const prompt = `Explain in detail why ${result.bestCrop} is the best choice for this situation: ${context}`;

    navigation.navigate('Explanation', { prompt, context });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.cropProfit.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.landSize} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t.cropProfit.landSizePlaceholder}
              placeholderTextColor="#999"
              value={landSize}
              onChangeText={setLandSize}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.region} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t.cropProfit.regionPlaceholder}
              placeholderTextColor="#999"
              value={region}
              onChangeText={setRegion}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.estimatedCost} *</Text>
            <TextInput
              style={styles.input}
              placeholder={t.cropProfit.estimatedCostPlaceholder}
              placeholderTextColor="#999"
              value={estimatedCost}
              onChangeText={setEstimatedCost}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.cropOptions}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.cropProfit.cropOptionsPlaceholder}
              placeholderTextColor="#999"
              value={cropOptions}
              onChangeText={setCropOptions}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.soilType}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.cropProfit.soilTypePlaceholder}
              placeholderTextColor="#999"
              value={soilType}
              onChangeText={setSoilType}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.waterAvailability}</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  waterAvailability === 'low' && styles.segmentButtonActive,
                ]}
                onPress={() => setWaterAvailability('low')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    waterAvailability === 'low' && styles.segmentTextActive,
                  ]}
                >
                  {t.cropProfit.waterLow}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  waterAvailability === 'medium' && styles.segmentButtonActive,
                ]}
                onPress={() => setWaterAvailability('medium')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    waterAvailability === 'medium' && styles.segmentTextActive,
                  ]}
                >
                  {t.cropProfit.waterMedium}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  waterAvailability === 'high' && styles.segmentButtonActive,
                ]}
                onPress={() => setWaterAvailability('high')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    waterAvailability === 'high' && styles.segmentTextActive,
                  ]}
                >
                  {t.cropProfit.waterHigh}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.cropProfit.season}</Text>
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
                <Text style={styles.analyzeButtonText}>{t.cropProfit.analyzeProfit}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {analyzing && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t.cropProfit.analyzing}</Text>
            </View>
          )}

          {result && !analyzing && (
            <View style={styles.resultContainer}>
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.cropProfit.bestCrop}</Text>
                </View>
                <Text style={styles.resultValue}>{result.bestCrop}</Text>
              </View>

              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.cropProfit.estimatedProfit}</Text>
                </View>
                <Text style={styles.resultValueProfit}>{result.estimatedProfit}</Text>
              </View>

              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>{t.cropProfit.riskLevel}</Text>
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

              <View style={styles.explanationCard}>
                <Text style={styles.explanationText}>{result.explanation}</Text>
              </View>

              <TouchableOpacity style={styles.explainButton} onPress={handleExplain}>
                <Text style={styles.explainButtonText}>{t.cropProfit.whyDecision}</Text>
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
  resultValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d8f3d',
  },
  resultValueProfit: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ff6f00',
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
  explanationCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  explanationText: {
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

export default CropProfitScreen;
