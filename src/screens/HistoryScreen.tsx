import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { getHistory, clearHistory, HistoryItem } from '../utils/storage';

const HistoryScreen: React.FC = () => {
  const { t } = useLanguage();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const items = await getHistory();
    setHistory(items);
  };

  const handleClearHistory = () => {
    Alert.alert(t.history.clearHistory, 'Are you sure you want to clear all history?', [
      { text: t.common.cancel, style: 'cancel' },
      {
        text: t.common.ok,
        style: 'destructive',
        onPress: async () => {
          await clearHistory();
          setHistory([]);
        },
      },
    ]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.history.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>{t.history.noPreviousResults}</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
              <Text style={styles.clearButtonText}>{t.history.clearHistory}</Text>
            </TouchableOpacity>

            {history.map((item, index) => (
              <View key={index} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyType}>
                    {item.type === 'crop'
                      ? `🌾 ${t.history.cropDecision}`
                      : `📈 ${t.history.sellDecision}`}
                  </Text>
                  <Text style={styles.historyDate}>{formatDate(item.timestamp)}</Text>
                </View>

                {item.type === 'crop' ? (
                  <View style={styles.historyContent}>
                    <Text style={styles.historyLabel}>
                      {t.cropProfit.region}:{' '}
                      <Text style={styles.historyValue}>{item.inputs.region}</Text>
                    </Text>
                    <Text style={styles.historyLabel}>
                      {t.cropProfit.landSize}:{' '}
                      <Text style={styles.historyValue}>{item.inputs.landSize} acres</Text>
                    </Text>
                    <View style={styles.resultSection}>
                      <Text style={styles.resultTitle}>{t.cropProfit.bestCrop}:</Text>
                      <Text style={styles.resultValue}>{item.result.bestCrop}</Text>
                    </View>
                    <View
                      style={[
                        styles.riskBadge,
                        item.result.riskLevel === 'low'
                          ? styles.riskLow
                          : item.result.riskLevel === 'medium'
                            ? styles.riskMedium
                            : styles.riskHigh,
                      ]}
                    >
                      <Text style={styles.riskText}>
                        {item.result.riskLevel === 'low'
                          ? t.cropProfit.riskLow
                          : item.result.riskLevel === 'medium'
                            ? t.cropProfit.riskMedium
                            : t.cropProfit.riskHigh}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.historyContent}>
                    <Text style={styles.historyLabel}>
                      {t.sellTiming.cropType}:{' '}
                      <Text style={styles.historyValue}>{item.inputs.cropType}</Text>
                    </Text>
                    <Text style={styles.historyLabel}>
                      {t.sellTiming.region}:{' '}
                      <Text style={styles.historyValue}>{item.inputs.region}</Text>
                    </Text>
                    <View style={styles.resultSection}>
                      <Text style={styles.resultTitle}>{t.sellTiming.recommendation}:</Text>
                      <Text style={styles.resultValue}>{item.result.recommendation}</Text>
                    </View>
                    <View style={styles.trendBadge}>
                      <Text style={styles.trendText}>
                        {item.result.trend === 'up'
                          ? '↑ ' + t.sellTiming.trendUp
                          : item.result.trend === 'down'
                            ? '↓ ' + t.sellTiming.trendDown
                            : '→ ' + t.sellTiming.trendStable}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </>
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
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#f44336',
  },
  clearButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '700',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d8f3d',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyContent: {
    gap: 10,
  },
  historyLabel: {
    fontSize: 14,
    color: '#666',
  },
  historyValue: {
    fontWeight: '600',
    color: '#333',
  },
  resultSection: {
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d8f3d',
  },
  riskBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
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
  riskText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  trendBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#e3f2fd',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
  },
});

export default HistoryScreen;
