import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { inferenceText } from '../services/RunAnywhereCompat';
import { MODEL_IDS } from '../services/ModelService';

type ExplanationRouteProp = RouteProp<RootStackParamList, 'Explanation'>;

interface Props {
  route: ExplanationRouteProp;
}

const ExplanationScreen: React.FC<Props> = ({ route }) => {
  const { t } = useLanguage();
  const { prompt, context } = route.params;

  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    generateExplanation();
  }, []);

  const generateExplanation = async () => {
    try {
      const fullPrompt = `${prompt}\n\nContext: ${context}\n\nProvide a detailed, easy-to-understand explanation for a rural farmer.`;
      const response = await inferenceText({
        modelId: MODEL_IDS.llm,
        input: fullPrompt,
      });
      setExplanation(response?.output || 'No response');
    } catch (error) {
      console.error('Failed to generate explanation:', error);
      setExplanation('Failed to generate explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.explanation.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2d8f3d" />
            <Text style={styles.loadingText}>{t.explanation.loading}</Text>
          </View>
        ) : (
          <View style={styles.explanationContainer}>
            <View style={styles.card}>
              <Text style={styles.explanationText}>{explanation}</Text>
            </View>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  explanationContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  explanationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default ExplanationScreen;
