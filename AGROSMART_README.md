# AgroSmart - Offline Crop Profit & Selling Decision System

A React Native mobile app powered by on-device AI to help rural farmers make smart farming decisions completely offline.

## Features

### 1. Multi-Language Support

- English, Hindi, Marathi, Tamil, Telugu
- All UI elements and AI responses in selected language
- Easy language switching anytime

### 2. Onboarding Flow

- Interactive introduction to app features
- Language selection on first launch
- Step-by-step guide on how to use the app
- Only shown once, persisted locally

### 3. Crop Profit Decision System

**Inputs:**

- Land size (acres)
- Region/location
- Estimated budget
- Crop options (optional)
- Soil type (optional)
- Water availability (Low/Medium/High)
- Season (Kharif/Rabi/Zaid)

**AI Analysis Provides:**

- Best crop recommendation
- Estimated profit potential
- Risk level assessment (Low/Medium/High)
- Detailed explanation of the decision

### 4. Sell Timing Advisor

**Inputs:**

- Crop type
- Region
- Current market price (optional)
- Season

**AI Analysis Provides:**

- Price trend prediction (Up/Down/Stable)
- Sell now or wait recommendation
- Detailed reasoning
- Risk level assessment

### 5. Detailed Explanations

- Tap "Why this decision?" on any result
- Get comprehensive AI-generated explanation
- Helps farmers understand the reasoning

### 6. History Tracking

- All decisions automatically saved locally
- View past crop and sell timing decisions
- Track inputs and results over time
- Clear history option available

### 7. How to Use Guide

- Step-by-step instructions
- Always accessible from home screen
- Helps new users understand features

### 8. Modern UI/UX

- Gradient backgrounds and modern cards
- Color-coded risk indicators (Green/Yellow/Red)
- Clean typography and spacing
- Visual icons throughout
- Smooth animations and transitions

## Technical Architecture

### On-Device AI Integration

**RunAnywhere SDK** powers all AI features:

- **LLM (Chat)**: `RunAnywhere.chat()` for all decision analysis
- 100% offline after initial model download
- No internet required for AI inference
- All data stays on device - complete privacy

### Key Technologies

- **React Native 0.83.1**: Cross-platform mobile framework
- **@runanywhere/core**: On-device AI SDK
- **@runanywhere/llamacpp**: LLM backend
- **@runanywhere/onnx**: STT backend (ready for voice input)
- **AsyncStorage**: Local data persistence
- **React Navigation**: Screen navigation
- **LinearGradient**: Modern UI gradients

### Project Structure

```
src/
├── screens/
│   ├── OnboardingScreen.tsx       # First-time user onboarding
│   ├── AgroHomeScreen.tsx         # Main app home
│   ├── CropProfitScreen.tsx       # Crop decision with AI
│   ├── SellTimingScreen.tsx       # Sell timing with AI
│   ├── ExplanationScreen.tsx      # Detailed AI explanations
│   ├── HowToUseScreen.tsx         # User guide
│   ├── HistoryScreen.tsx          # Past decisions
│   └── LanguageSettingsScreen.tsx # Language selection
├── contexts/
│   └── LanguageContext.tsx        # Multi-language state management
├── locales/
│   └── translations.ts            # 5 language translations
├── utils/
│   └── storage.ts                 # AsyncStorage helpers
├── navigation/
│   └── types.ts                   # Navigation type definitions
└── App.tsx                        # App entry point with AI initialization
```

## AI Prompts Used

### Crop Decision Prompt

```
You are an agricultural expert helping rural farmers in India.
Analyze the following farm details and suggest the most profitable crop.

Consider:
- Region's climate and soil compatibility
- Water requirements of crops
- Market demand and prices
- Practical advice for small farmers
- Seasonal patterns

Respond with:
- Best crop recommendation
- Estimated profit
- Risk level
- Detailed reasoning
```

### Sell Timing Prompt

```
You are an agricultural market expert helping rural farmers decide
when to sell their crops.

Consider:
- Seasonal price patterns
- Regional market conditions
- Storage costs vs waiting
- Festival seasons and demand
- Practical advice for small farmers

Respond with:
- Price trend (Up/Down/Stable)
- Recommendation (Sell Now/Wait/Partial Sale)
- Detailed reasoning
- Risk level
```

## How to Run

### Prerequisites

- Node.js >= 18
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start Metro bundler:**

```bash
npm start
```

3. **Run on Android:**

```bash
npm run android
```

4. **Run on iOS:**

```bash
npm run ios
```

### First Time Setup

1. App will show onboarding screen
2. Select your preferred language
3. View feature introduction
4. App will remember your choice

### Using the App

1. **Download AI Model**: On first use, the app will need to download the LLM model
2. **Choose Feature**: Select Crop Profit Decision or Sell Timing Advisor
3. **Enter Details**: Fill in your farm details (required fields marked with \*)
4. **Get AI Analysis**: Tap analyze button, AI processes on-device
5. **View Results**: See recommendations with risk levels
6. **Get Explanation**: Tap "Why this decision?" for detailed reasoning
7. **Check History**: View past decisions anytime

## Offline Capability

### Complete Offline Operation

- ✅ AI inference runs 100% on-device
- ✅ No internet needed after model download
- ✅ All data stored locally
- ✅ Complete privacy - no data sent to servers
- ✅ Works in areas with no connectivity
- ✅ Perfect for rural areas

### Why Offline Matters for Rural Farmers

- Many rural areas have poor/no internet connectivity
- Farmers can't rely on cloud-based solutions
- Data privacy - farm details stay on device
- No ongoing internet costs
- Instant AI responses without network latency

## Multi-Language Implementation

All UI elements and AI responses adapt to selected language:

- **English**: Default
- **Hindi (हिन्दी)**: Native Hindi speakers
- **Marathi (मराठी)**: Maharashtra region
- **Tamil (தமிழ்)**: Tamil Nadu region
- **Telugu (తెలుగు)**: Andhra Pradesh/Telangana

AI prompts are constructed with language-specific instructions to ensure responses match the user's selected language.

## Data Privacy

- **All data stored locally**: AsyncStorage on device
- **No cloud sync**: Everything stays on your phone
- **No analytics**: No tracking or data collection
- **AI on-device**: Queries never leave the device
- **No account required**: No sign-up, no login

## Future Enhancements (Not Implemented)

### Voice Input

- RunAnywhere STT ready to integrate
- Allow farmers to speak instead of type
- Especially helpful for farmers not comfortable with typing

### Crop Disease Detection

- Use device camera + AI
- Identify crop diseases
- Suggest treatments

### Weather Integration

- Optional online feature
- Local weather data
- Planting time suggestions

## Known Limitations

1. **AI Model Size**: Initial download is ~500MB-2GB depending on model
2. **First Launch**: Requires internet to download AI model
3. **Device Requirements**: Needs Android 7.0+ / iOS 13.0+ with sufficient storage
4. **AI Accuracy**: Provides decision support, not exact predictions

## Support for Rural Farmers

This app is specifically designed for:

- Small-scale farmers (2-10 acre farms)
- Limited internet connectivity areas
- Users preferring regional languages
- Farmers needing quick, practical advice
- Privacy-conscious users

## License

This project is built for a hackathon and startup initiative to support rural farmers in India.

## Acknowledgments

- **RunAnywhere SDK**: Enabling on-device AI
- **React Native Community**: Open-source libraries
- **Rural Farming Community**: Inspiration and target users

---

Built with ❤️ for Indian Farmers
