import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../locales/translations';

const LanguageSettingsScreen: React.FC = () => {
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
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a5f2a', '#2d8f3d']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.home.changeLanguage}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.languageContainer}>
          <Text style={styles.sectionTitle}>{t.onboarding.selectLanguage}</Text>

          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.languageButton, language === lang.code && styles.languageButtonActive]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text style={styles.languageName}>{lang.name}</Text>
              {language === lang.code && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
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
  languageContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  languageButtonActive: {
    borderColor: '#2d8f3d',
    backgroundColor: '#e8f5e9',
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: '#2d8f3d',
    fontWeight: '700',
  },
});

export default LanguageSettingsScreen;
