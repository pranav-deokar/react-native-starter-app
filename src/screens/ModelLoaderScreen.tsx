import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RunAnywhere } from '@runanywhere/core';
import { downloadLlamaModel, loadLlamaModel } from '../services/RunAnywhereCompat';
import { MODEL_IDS } from '../services/ModelService';

interface ModelLoaderScreenProps {
  onComplete: () => void;
}

const ModelLoaderScreen: React.FC<ModelLoaderScreenProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Checking AI model...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAndLoadModel();
  }, []);

  const checkAndLoadModel = async () => {
    try {
      setStatus('Checking if AI model is available...');

      await loadLlamaModel(MODEL_IDS.llm);
      setStatus('AI model ready!');
      setTimeout(onComplete, 1000);
      return;

      // No model available - need to download
    } catch (err) {
      console.error('Model check/load failed:', err);
      try {
        await RunAnywhere.deleteModel(MODEL_IDS.llm);
      } catch {
        // Ignore cleanup failures and let the user retry.
      }
      setError('nomodel');
      setLoading(false);
      setStatus('AI model not found. Download required.');
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);
      setStatus('Downloading AI model...');

      await downloadLlamaModel(MODEL_IDS.llm);
      setProgress(100);

      setStatus('Download complete. Loading model...');
      await loadLlamaModel(MODEL_IDS.llm);

      setStatus('AI model ready!');
      setTimeout(onComplete, 1000);
    } catch (err) {
      console.error('Download failed:', err);
      try {
        await RunAnywhere.deleteModel(MODEL_IDS.llm);
      } catch {
        // Ignore cleanup failures and let the user retry.
      }
      Alert.alert('Download Failed', `Error: ${(err as Error).message}`);
      setError('error');
      setLoading(false);
      setStatus('Failed to download model');
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Model Download?',
      'The app requires an AI model to provide recommendations. Without it, the app will not work properly.\n\nYou can skip now and use a demo/mock mode, but no real AI analysis will be available.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip Anyway',
          style: 'destructive',
          onPress: onComplete,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d', '#4caf50']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.icon}>🤖</Text>
          <Text style={styles.title}>Setting Up AI</Text>
          <Text style={styles.subtitle}>{status}</Text>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              {progress > 0 && <Text style={styles.progressText}>{progress}%</Text>}
            </View>
          )}

          {error === 'nomodel' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>AI Model Required</Text>
              <Text style={styles.errorDescription}>
                AgroSmart needs to download an AI model to provide crop recommendations. This is a
                one-time download (approximately 100-500MB).
                {'\n\n'}
                You need an internet connection for this step only. After download, the app works
                completely offline.
              </Text>

              <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                <Text style={styles.downloadButtonText}>Download AI Model</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip (Demo Mode)</Text>
              </TouchableOpacity>
            </View>
          )}

          {error === 'error' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>❌</Text>
              <Text style={styles.errorText}>Setup Failed</Text>
              <Text style={styles.errorDescription}>
                Failed to set up AI model. Please check your internet connection and try again.
              </Text>

              <TouchableOpacity style={styles.retryButton} onPress={checkAndLoadModel}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip (Demo Mode)</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f2e0',
    marginBottom: 30,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 15,
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 14,
    color: '#e0f2e0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  downloadButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
  },
  downloadButtonText: {
    color: '#2d8f3d',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
  },
  retryButtonText: {
    color: '#2d8f3d',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 15,
  },
  skipButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ModelLoaderScreen;
