import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';

const HowToUseScreen: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: t.howToUse.step1Title,
      description: t.howToUse.step1Desc,
      icon: '🎯',
    },
    {
      number: 2,
      title: t.howToUse.step2Title,
      description: t.howToUse.step2Desc,
      icon: '✍️',
    },
    {
      number: 3,
      title: t.howToUse.step3Title,
      description: t.howToUse.step3Desc,
      icon: '🤖',
    },
    {
      number: 4,
      title: t.howToUse.step4Title,
      description: t.howToUse.step4Desc,
      icon: '💡',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.howToUse.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {steps.map((step) => (
          <View key={step.number} style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <Text style={styles.stepIcon}>{step.icon}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footerCard}>
          <Text style={styles.footerIcon}>✨</Text>
          <Text style={styles.footerText}>
            All AI processing happens on your device. No internet needed after setup!
          </Text>
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
    padding: 20,
  },
  stepCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepIcon: {
    fontSize: 32,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d8f3d',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HowToUseScreen;
