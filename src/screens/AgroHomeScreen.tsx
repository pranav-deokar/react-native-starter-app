import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgroHome'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const AgroHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5f2a" />

      <LinearGradient colors={['#1a5f2a', '#2d8f3d', '#4caf50']} style={styles.header}>
        <Text style={styles.headerTitle}>{t.home.appName}</Text>
        <Text style={styles.headerSubtitle}>{t.home.appSubtitle}</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.mainCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CropProfit')}
          >
            <LinearGradient
              colors={['#2d8f3d', '#4caf50']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>🌾</Text>
              </View>
              <Text style={styles.cardTitle}>{t.home.cropProfit}</Text>
              <Text style={styles.cardDescription}>{t.home.cropProfitDesc}</Text>
              <View style={styles.cardArrow}>
                <Text style={styles.cardArrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SellTiming')}
          >
            <LinearGradient
              colors={['#388e3c', '#66bb6a']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>📈</Text>
              </View>
              <Text style={styles.cardTitle}>{t.home.sellTiming}</Text>
              <Text style={styles.cardDescription}>{t.home.sellTimingDesc}</Text>
              <View style={styles.cardArrow}>
                <Text style={styles.cardArrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('HowToUse')}
          >
            <Text style={styles.secondaryButtonIcon}>❓</Text>
            <Text style={styles.secondaryButtonText}>{t.home.howToUse}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.secondaryButtonIcon}>📜</Text>
            <Text style={styles.secondaryButtonText}>{t.home.history}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('LanguageSettings')}
          >
            <Text style={styles.secondaryButtonIcon}>🌐</Text>
            <Text style={styles.secondaryButtonText}>{t.home.changeLanguage}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🔒 100% Offline • 🤖 On-Device AI</Text>
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
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0f2e0',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  mainCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardGradient: {
    padding: 25,
    minHeight: 180,
  },
  cardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#e0f2e0',
    lineHeight: 20,
  },
  cardArrow: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardArrowText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  secondaryButtonIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  secondaryButtonText: {
    fontSize: 12,
    color: '#2d8f3d',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});

export default AgroHomeScreen;
