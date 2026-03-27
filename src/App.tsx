import 'react-native-gesture-handler'; // Must be at the top!
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Note: react-native-screens is shimmed in index.js for iOS New Architecture compatibility
import { RunAnywhere, SDKEnvironment } from '@runanywhere/core';
import './services/RunAnywhereCompat';
import { ModelServiceProvider, registerDefaultModels } from './services/ModelService';
import { LanguageProvider } from './contexts/LanguageContext';
import { checkOnboardingComplete } from './utils/storage';
import { AppColors } from './theme';
import {
  HomeScreen,
  ChatScreen,
  ToolCallingScreen,
  SpeechToTextScreen,
  TextToSpeechScreen,
  VoicePipelineScreen,
} from './screens';
import OnboardingScreen from './screens/OnboardingScreen';
import AgroHomeScreen from './screens/AgroHomeScreen';
import CropProfitScreen from './screens/CropProfitScreen';
import SellTimingScreen from './screens/SellTimingScreen';
import ExplanationScreen from './screens/ExplanationScreen';
import HowToUseScreen from './screens/HowToUseScreen';
import HistoryScreen from './screens/HistoryScreen';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen';
import { RootStackParamList } from './navigation/types';
import ModelLoaderScreen from './screens/ModelLoaderScreen';

// Using JS-based stack navigator instead of native-stack
// to avoid react-native-screens setColor crash with New Architecture
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize RunAnywhere SDK (Development mode doesn't require API key)
      await RunAnywhere.initialize({
        environment: SDKEnvironment.Development,
      });

      // Register backends (per docs: https://docs.runanywhere.ai/react-native/quick-start)
      const { LlamaCPP } = await import('@runanywhere/llamacpp');
      const { ONNX } = await import('@runanywhere/onnx');

      LlamaCPP.register();
      ONNX.register();

      // Register default models
      await registerDefaultModels();

      console.log('RunAnywhere SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RunAnywhere SDK:', error);
    }

    // Check onboarding status
    const completed = await checkOnboardingComplete();
    setOnboardingComplete(completed);
  };

  if (onboardingComplete === null) {
    // Loading state
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <ModelServiceProvider>
          {!onboardingComplete ? (
            <OnboardingScreen onComplete={() => setOnboardingComplete(true)} />
          ) : !modelReady ? (
            <ModelLoaderScreen onComplete={() => setModelReady(true)} />
          ) : (
            <>
              <StatusBar barStyle="light-content" backgroundColor="#1a5f2a" />
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#1a5f2a',
                      elevation: 0,
                      shadowOpacity: 0,
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                      fontWeight: '700',
                      fontSize: 18,
                    },
                    cardStyle: {
                      backgroundColor: '#f5f5f5',
                    },
                    // iOS-like animations
                    ...TransitionPresets.SlideFromRightIOS,
                  }}
                >
                  {/* AgroSmart screens */}
                  <Stack.Screen
                    name="AgroHome"
                    component={AgroHomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CropProfit"
                    component={CropProfitScreen}
                    options={{ title: 'Crop Profit Decision' }}
                  />
                  <Stack.Screen
                    name="SellTiming"
                    component={SellTimingScreen}
                    options={{ title: 'Sell Timing Advisor' }}
                  />
                  <Stack.Screen
                    name="Explanation"
                    component={ExplanationScreen}
                    options={{ title: 'Explanation' }}
                  />
                  <Stack.Screen
                    name="HowToUse"
                    component={HowToUseScreen}
                    options={{ title: 'How to Use' }}
                  />
                  <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ title: 'History' }}
                  />
                  <Stack.Screen
                    name="LanguageSettings"
                    component={LanguageSettingsScreen}
                    options={{ title: 'Language Settings' }}
                  />

                  {/* Original demo screens - kept for reference */}
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
                  <Stack.Screen
                    name="ToolCalling"
                    component={ToolCallingScreen}
                    options={{ title: 'Tool Calling' }}
                  />
                  <Stack.Screen
                    name="SpeechToText"
                    component={SpeechToTextScreen}
                    options={{ title: 'Speech to Text' }}
                  />
                  <Stack.Screen
                    name="TextToSpeech"
                    component={TextToSpeechScreen}
                    options={{ title: 'Text to Speech' }}
                  />
                  <Stack.Screen
                    name="VoicePipeline"
                    component={VoicePipelineScreen}
                    options={{ title: 'Voice Pipeline' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </>
          )}
        </ModelServiceProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
};

export default App;
