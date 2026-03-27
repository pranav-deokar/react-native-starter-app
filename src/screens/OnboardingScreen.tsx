import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../locales/translations';
import { setOnboardingComplete } from '../utils/storage';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'language' | 'feature1' | 'feature2' | 'feature3'>(
    'language'
  );
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  ];

  const handleLanguageSelect = async (lang: Language) => {
    await setLanguage(lang);
    setCurrentStep('feature1');
  };

  const handleNext = () => {
    if (currentStep === 'feature1') {
      setCurrentStep('feature2');
    } else if (currentStep === 'feature2') {
      setCurrentStep('feature3');
    } else if (currentStep === 'feature3') {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await setOnboardingComplete();
    onComplete();
  };

  if (currentStep === 'language') {
    return (
      <LinearGradient colors={['#1a5f2a', '#2d8f3d', '#4caf50']} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.titleText}>AgroSmart</Text>
          <Text style={styles.subtitleText}>Smart farming decisions, offline</Text>

          <View style={styles.languageContainer}>
            <Text style={styles.languageTitle}>Select Your Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  language === lang.code && styles.languageButtonActive,
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={styles.languageName}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    );
  }

  const features = [
    {
      step: 'feature1',
      icon: '🌾',
      title: t.onboarding.feature1Title,
      description: t.onboarding.feature1Desc,
    },
    {
      step: 'feature2',
      icon: '📈',
      title: t.onboarding.feature2Title,
      description: t.onboarding.feature2Desc,
    },
    {
      step: 'feature3',
      icon: '📱',
      title: t.onboarding.feature3Title,
      description: t.onboarding.feature3Desc,
    },
  ];

  const currentFeature = features.find((f) => f.step === currentStep);

  return (
    <LinearGradient colors={['#1a5f2a', '#2d8f3d', '#4caf50']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>{currentFeature?.icon}</Text>
          </View>

          <Text style={styles.featureTitle}>{currentFeature?.title}</Text>
          <Text style={styles.featureDescription}>{currentFeature?.description}</Text>

          <View style={styles.dotContainer}>
            <View style={[styles.dot, currentStep === 'feature1' && styles.dotActive]} />
            <View style={[styles.dot, currentStep === 'feature2' && styles.dotActive]} />
            <View style={[styles.dot, currentStep === 'feature3' && styles.dotActive]} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleComplete}>
          <Text style={styles.skipButtonText}>{t.onboarding.skip}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === 'feature3' ? t.onboarding.getStarted : t.onboarding.next}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
    fontWeight: '300',
  },
  titleText: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 18,
    color: '#e0f2e0',
    marginBottom: 50,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  languageTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#ffffff',
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 15,
  },
  languageName: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  featureIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  featureIcon: {
    fontSize: 64,
  },
  featureTitle: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#e0f2e0',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#ffffff',
    width: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  skipButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#2d8f3d',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
