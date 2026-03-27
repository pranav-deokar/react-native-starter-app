export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

export interface Translations {
  // Onboarding
  onboarding: {
    welcome: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    selectLanguage: string;
    getStarted: string;
    next: string;
    skip: string;
  };

  // Home Screen
  home: {
    appName: string;
    appSubtitle: string;
    cropProfit: string;
    cropProfitDesc: string;
    sellTiming: string;
    sellTimingDesc: string;
    howToUse: string;
    changeLanguage: string;
    history: string;
  };

  // Crop Profit Screen
  cropProfit: {
    title: string;
    landSize: string;
    landSizePlaceholder: string;
    cropOptions: string;
    cropOptionsPlaceholder: string;
    estimatedCost: string;
    estimatedCostPlaceholder: string;
    region: string;
    regionPlaceholder: string;
    soilType: string;
    soilTypePlaceholder: string;
    waterAvailability: string;
    waterLow: string;
    waterMedium: string;
    waterHigh: string;
    season: string;
    seasonKharif: string;
    seasonRabi: string;
    seasonZaid: string;
    analyzeProfit: string;
    analyzing: string;
    bestCrop: string;
    estimatedProfit: string;
    riskLevel: string;
    riskLow: string;
    riskMedium: string;
    riskHigh: string;
    whyDecision: string;
    useVoice: string;
  };

  // Sell Timing Screen
  sellTiming: {
    title: string;
    cropType: string;
    cropTypePlaceholder: string;
    currentPrice: string;
    currentPricePlaceholder: string;
    season: string;
    region: string;
    regionPlaceholder: string;
    getSuggestion: string;
    analyzing: string;
    trend: string;
    trendUp: string;
    trendDown: string;
    trendStable: string;
    recommendation: string;
    reason: string;
    riskLevel: string;
    whyDecision: string;
    useVoice: string;
  };

  // Explanation Screen
  explanation: {
    title: string;
    loading: string;
  };

  // How to Use Screen
  howToUse: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };

  // History Screen
  history: {
    title: string;
    noPreviousResults: string;
    clearHistory: string;
    cropDecision: string;
    sellDecision: string;
  };

  // Common
  common: {
    back: string;
    cancel: string;
    ok: string;
    error: string;
    success: string;
    loading: string;
    optional: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    onboarding: {
      welcome: 'Welcome to',
      title: 'AgroSmart',
      subtitle: 'Smart farming decisions, offline',
      feature1Title: 'Crop Profit Analysis',
      feature1Desc:
        'Get AI-powered recommendations on which crops to grow for maximum profit based on your land, soil, and water availability.',
      feature2Title: 'Sell Timing Advisor',
      feature2Desc:
        'Know the best time to sell your crops. Get market trend predictions and timing recommendations.',
      feature3Title: 'Fully Offline',
      feature3Desc:
        'All AI analysis happens on your device. No internet needed after first setup. Your data stays private.',
      selectLanguage: 'Select Your Language',
      getStarted: 'Get Started',
      next: 'Next',
      skip: 'Skip',
    },
    home: {
      appName: 'AgroSmart',
      appSubtitle: 'Smart farming decisions, offline',
      cropProfit: 'Crop Profit Decision',
      cropProfitDesc: 'Find the best crop for your farm',
      sellTiming: 'Sell Timing Advisor',
      sellTimingDesc: 'Know when to sell your harvest',
      howToUse: 'How to Use',
      changeLanguage: 'Change Language',
      history: 'View History',
    },
    cropProfit: {
      title: 'Crop Profit Analysis',
      landSize: 'Land Size (acres)',
      landSizePlaceholder: 'e.g., 5 acres',
      cropOptions: 'Crop Options (optional)',
      cropOptionsPlaceholder: 'e.g., wheat, rice, sugarcane',
      estimatedCost: 'Estimated Cost (₹)',
      estimatedCostPlaceholder: 'e.g., 50000',
      region: 'Region/Location',
      regionPlaceholder: 'e.g., Punjab, Maharashtra',
      soilType: 'Soil Type (optional)',
      soilTypePlaceholder: 'e.g., clay, loamy, sandy',
      waterAvailability: 'Water Availability',
      waterLow: 'Low',
      waterMedium: 'Medium',
      waterHigh: 'High',
      season: 'Season',
      seasonKharif: 'Kharif (Monsoon)',
      seasonRabi: 'Rabi (Winter)',
      seasonZaid: 'Zaid (Summer)',
      analyzeProfit: 'Analyze Profit',
      analyzing: 'Analyzing with AI...',
      bestCrop: 'Best Crop',
      estimatedProfit: 'Estimated Profit',
      riskLevel: 'Risk Level',
      riskLow: 'Low Risk',
      riskMedium: 'Medium Risk',
      riskHigh: 'High Risk',
      whyDecision: 'Why this decision?',
      useVoice: 'Use Voice Input',
    },
    sellTiming: {
      title: 'Sell Timing Advisor',
      cropType: 'Crop Type',
      cropTypePlaceholder: 'e.g., wheat, rice, cotton',
      currentPrice: 'Current Price (₹/quintal, optional)',
      currentPricePlaceholder: 'e.g., 2000',
      season: 'Season',
      region: 'Region',
      regionPlaceholder: 'e.g., Punjab, Maharashtra',
      getSuggestion: 'Get Suggestion',
      analyzing: 'Analyzing market trends...',
      trend: 'Price Trend',
      trendUp: 'Upward ↑',
      trendDown: 'Downward ↓',
      trendStable: 'Stable →',
      recommendation: 'Recommendation',
      reason: 'Reason',
      riskLevel: 'Risk Level',
      whyDecision: 'Why this decision?',
      useVoice: 'Use Voice Input',
    },
    explanation: {
      title: 'Decision Explanation',
      loading: 'Generating detailed explanation...',
    },
    howToUse: {
      title: 'How to Use AgroSmart',
      step1Title: 'Step 1: Choose Feature',
      step1Desc:
        'Select either Crop Profit Decision to find the best crop to grow, or Sell Timing Advisor to know when to sell.',
      step2Title: 'Step 2: Enter Details',
      step2Desc:
        'Fill in your land details, region, and other information. You can type or use voice input.',
      step3Title: 'Step 3: Get AI Analysis',
      step3Desc:
        'Our offline AI will analyze your inputs and provide recommendations tailored to your situation.',
      step4Title: 'Step 4: Understand Decision',
      step4Desc: 'Tap "Why this decision?" to get a detailed explanation of the recommendations.',
    },
    history: {
      title: 'History',
      noPreviousResults: 'No previous decisions saved yet',
      clearHistory: 'Clear All History',
      cropDecision: 'Crop Decision',
      sellDecision: 'Sell Decision',
    },
    common: {
      back: 'Back',
      cancel: 'Cancel',
      ok: 'OK',
      error: 'Error',
      success: 'Success',
      loading: 'Loading...',
      optional: 'optional',
    },
  },
  hi: {
    onboarding: {
      welcome: 'स्वागत है',
      title: 'एग्रोस्मार्ट',
      subtitle: 'स्मार्ट खेती के फैसले, ऑफलाइन',
      feature1Title: 'फसल लाभ विश्लेषण',
      feature1Desc:
        'अपनी जमीन, मिट्टी और पानी की उपलब्धता के आधार पर अधिकतम लाभ के लिए कौन सी फसल उगाएं, इसकी AI-संचालित सिफारिशें प्राप्त करें।',
      feature2Title: 'बिक्री समय सलाहकार',
      feature2Desc:
        'अपनी फसल बेचने का सबसे अच्छा समय जानें। बाजार के रुझान की भविष्यवाणी और समय की सिफारिशें प्राप्त करें।',
      feature3Title: 'पूरी तरह ऑफलाइन',
      feature3Desc:
        'सभी AI विश्लेषण आपके डिवाइस पर होता है। पहली सेटअप के बाद इंटरनेट की जरूरत नहीं। आपका डेटा निजी रहता है।',
      selectLanguage: 'अपनी भाषा चुनें',
      getStarted: 'शुरू करें',
      next: 'आगे',
      skip: 'छोड़ें',
    },
    home: {
      appName: 'एग्रोस्मार्ट',
      appSubtitle: 'स्मार्ट खेती के फैसले, ऑफलाइन',
      cropProfit: 'फसल लाभ निर्णय',
      cropProfitDesc: 'अपने खेत के लिए सबसे अच्छी फसल खोजें',
      sellTiming: 'बिक्री समय सलाहकार',
      sellTimingDesc: 'जानें कि अपनी फसल कब बेचें',
      howToUse: 'उपयोग कैसे करें',
      changeLanguage: 'भाषा बदलें',
      history: 'इतिहास देखें',
    },
    cropProfit: {
      title: 'फसल लाभ विश्लेषण',
      landSize: 'जमीन का आकार (एकड़)',
      landSizePlaceholder: 'उदा., 5 एकड़',
      cropOptions: 'फसल विकल्प (वैकल्पिक)',
      cropOptionsPlaceholder: 'उदा., गेहूं, चावल, गन्ना',
      estimatedCost: 'अनुमानित लागत (₹)',
      estimatedCostPlaceholder: 'उदा., 50000',
      region: 'क्षेत्र/स्थान',
      regionPlaceholder: 'उदा., पंजाब, महाराष्ट्र',
      soilType: 'मिट्टी का प्रकार (वैकल्पिक)',
      soilTypePlaceholder: 'उदा., चिकनी, दोमट, रेतीली',
      waterAvailability: 'पानी की उपलब्धता',
      waterLow: 'कम',
      waterMedium: 'मध्यम',
      waterHigh: 'अधिक',
      season: 'मौसम',
      seasonKharif: 'खरीफ (मानसून)',
      seasonRabi: 'रबी (सर्दी)',
      seasonZaid: 'जायद (गर्मी)',
      analyzeProfit: 'लाभ का विश्लेषण करें',
      analyzing: 'AI से विश्लेषण हो रहा है...',
      bestCrop: 'सबसे अच्छी फसल',
      estimatedProfit: 'अनुमानित लाभ',
      riskLevel: 'जोखिम स्तर',
      riskLow: 'कम जोखिम',
      riskMedium: 'मध्यम जोखिम',
      riskHigh: 'उच्च जोखिम',
      whyDecision: 'यह निर्णय क्यों?',
      useVoice: 'आवाज़ इनपुट का उपयोग करें',
    },
    sellTiming: {
      title: 'बिक्री समय सलाहकार',
      cropType: 'फसल का प्रकार',
      cropTypePlaceholder: 'उदा., गेहूं, चावल, कपास',
      currentPrice: 'वर्तमान मूल्य (₹/क्विंटल, वैकल्पिक)',
      currentPricePlaceholder: 'उदा., 2000',
      season: 'मौसम',
      region: 'क्षेत्र',
      regionPlaceholder: 'उदा., पंजाब, महाराष्ट्र',
      getSuggestion: 'सुझाव प्राप्त करें',
      analyzing: 'बाजार के रुझान का विश्लेषण...',
      trend: 'मूल्य रुझान',
      trendUp: 'ऊपर की ओर ↑',
      trendDown: 'नीचे की ओर ↓',
      trendStable: 'स्थिर →',
      recommendation: 'सिफारिश',
      reason: 'कारण',
      riskLevel: 'जोखिम स्तर',
      whyDecision: 'यह निर्णय क्यों?',
      useVoice: 'आवाज़ इनपुट का उपयोग करें',
    },
    explanation: {
      title: 'निर्णय व्याख्या',
      loading: 'विस्तृत व्याख्या उत्पन्न हो रही है...',
    },
    howToUse: {
      title: 'एग्रोस्मार्ट का उपयोग कैसे करें',
      step1Title: 'चरण 1: सुविधा चुनें',
      step1Desc:
        'उगाने के लिए सबसे अच्छी फसल खोजने के लिए फसल लाभ निर्णय, या बेचने का समय जानने के लिए बिक्री समय सलाहकार चुनें।',
      step2Title: 'चरण 2: विवरण दर्ज करें',
      step2Desc:
        'अपनी जमीन का विवरण, क्षेत्र और अन्य जानकारी भरें। आप टाइप कर सकते हैं या आवाज इनपुट का उपयोग कर सकते हैं।',
      step3Title: 'चरण 3: AI विश्लेषण प्राप्त करें',
      step3Desc:
        'हमारा ऑफलाइन AI आपके इनपुट का विश्लेषण करेगा और आपकी स्थिति के अनुसार सिफारिशें प्रदान करेगा।',
      step4Title: 'चरण 4: निर्णय को समझें',
      step4Desc:
        'सिफारिशों की विस्तृत व्याख्या प्राप्त करने के लिए "यह निर्णय क्यों?" पर टैप करें।',
    },
    history: {
      title: 'इतिहास',
      noPreviousResults: 'अभी तक कोई पिछला निर्णय सहेजा नहीं गया',
      clearHistory: 'सभी इतिहास साफ़ करें',
      cropDecision: 'फसल निर्णय',
      sellDecision: 'बिक्री निर्णय',
    },
    common: {
      back: 'वापस',
      cancel: 'रद्द करें',
      ok: 'ठीक है',
      error: 'त्रुटि',
      success: 'सफलता',
      loading: 'लोड हो रहा है...',
      optional: 'वैकल्पिक',
    },
  },
  mr: {
    onboarding: {
      welcome: 'स्वागत आहे',
      title: 'एग्रोस्मार्ट',
      subtitle: 'स्मार्ट शेती निर्णय, ऑफलाइन',
      feature1Title: 'पीक नफा विश्लेषण',
      feature1Desc:
        'तुमच्या जमिनी, माती आणि पाण्याच्या उपलब्धतेवर आधारित जास्तीत जास्त नफ्यासाठी कोणते पीक लावावे याच्या AI-चालित शिफारसी मिळवा।',
      feature2Title: 'विक्री वेळ सल्लागार',
      feature2Desc:
        'तुमचे पीक विकण्याची सर्वोत्तम वेळ जाणून घ्या. बाजार ट्रेंड अंदाज आणि वेळेच्या शिफारसी मिळवा।',
      feature3Title: 'पूर्णपणे ऑफलाइन',
      feature3Desc:
        'सर्व AI विश्लेषण तुमच्या डिव्हाइसवर होते. पहिल्या सेटअपनंतर इंटरनेटची गरज नाही. तुमचा डेटा खाजगी राहतो।',
      selectLanguage: 'तुमची भाषा निवडा',
      getStarted: 'सुरू करा',
      next: 'पुढे',
      skip: 'वगळा',
    },
    home: {
      appName: 'एग्रोस्मार्ट',
      appSubtitle: 'स्मार्ट शेती निर्णय, ऑफलाइन',
      cropProfit: 'पीक नफा निर्णय',
      cropProfitDesc: 'तुमच्या शेतासाठी सर्वोत्तम पीक शोधा',
      sellTiming: 'विक्री वेळ सल्लागार',
      sellTimingDesc: 'तुमचे पीक केव्हा विकावे ते जाणून घ्या',
      howToUse: 'वापर कसा करावा',
      changeLanguage: 'भाषा बदला',
      history: 'इतिहास पहा',
    },
    cropProfit: {
      title: 'पीक नफा विश्लेषण',
      landSize: 'जमिनीचा आकार (एकर)',
      landSizePlaceholder: 'उदा., 5 एकर',
      cropOptions: 'पीक पर्याय (वैकल्पिक)',
      cropOptionsPlaceholder: 'उदा., गहू, तांदूळ, ऊस',
      estimatedCost: 'अंदाजे खर्च (₹)',
      estimatedCostPlaceholder: 'उदा., 50000',
      region: 'प्रदेश/स्थान',
      regionPlaceholder: 'उदा., पंजाब, महाराष्ट्र',
      soilType: 'मातीचा प्रकार (वैकल्पिक)',
      soilTypePlaceholder: 'उदा., चिकणमाती, दुमट, वाळूमाती',
      waterAvailability: 'पाण्याची उपलब्धता',
      waterLow: 'कमी',
      waterMedium: 'मध्यम',
      waterHigh: 'जास्त',
      season: 'हंगाम',
      seasonKharif: 'खरीप (पावसाळा)',
      seasonRabi: 'रब्बी (हिवाळा)',
      seasonZaid: 'जायद (उन्हाळा)',
      analyzeProfit: 'नफ्याचे विश्लेषण करा',
      analyzing: 'AI सह विश्लेषण करत आहे...',
      bestCrop: 'सर्वोत्तम पीक',
      estimatedProfit: 'अंदाजे नफा',
      riskLevel: 'जोखीम पातळी',
      riskLow: 'कमी जोखीम',
      riskMedium: 'मध्यम जोखीम',
      riskHigh: 'उच्च जोखीम',
      whyDecision: 'हा निर्णय का?',
      useVoice: 'आवाज इनपुट वापरा',
    },
    sellTiming: {
      title: 'विक्री वेळ सल्लागार',
      cropType: 'पिकाचा प्रकार',
      cropTypePlaceholder: 'उदा., गहू, तांदूळ, कापूस',
      currentPrice: 'सध्याची किंमत (₹/क्विंटल, वैकल्पिक)',
      currentPricePlaceholder: 'उदा., 2000',
      season: 'हंगाम',
      region: 'प्रदेश',
      regionPlaceholder: 'उदा., पंजाब, महाराष्ट्र',
      getSuggestion: 'सुचवण्या मिळवा',
      analyzing: 'बाजार ट्रेंडचे विश्लेषण...',
      trend: 'किंमत ट्रेंड',
      trendUp: 'वरच्या दिशेने ↑',
      trendDown: 'खालच्या दिशेने ↓',
      trendStable: 'स्थिर →',
      recommendation: 'शिफारस',
      reason: 'कारण',
      riskLevel: 'जोखीम पातळी',
      whyDecision: 'हा निर्णय का?',
      useVoice: 'आवाज इनपुट वापरा',
    },
    explanation: {
      title: 'निर्णय स्पष्टीकरण',
      loading: 'तपशीलवार स्पष्टीकरण तयार करत आहे...',
    },
    howToUse: {
      title: 'एग्रोस्मार्ट कसे वापरावे',
      step1Title: 'पायरी 1: वैशिष्ट्य निवडा',
      step1Desc:
        'लावण्यासाठी सर्वोत्तम पीक शोधण्यासाठी पीक नफा निर्णय किंवा विकण्याची वेळ जाणून घेण्यासाठी विक्री वेळ सल्लागार निवडा।',
      step2Title: 'पायरी 2: तपशील प्रविष्ट करा',
      step2Desc:
        'तुमच्या जमिनीचा तपशील, प्रदेश आणि इतर माहिती भरा. तुम्ही टाइप करू शकता किंवा आवाज इनपुट वापरू शकता।',
      step3Title: 'पायरी 3: AI विश्लेषण मिळवा',
      step3Desc:
        'आमचे ऑफलाइन AI तुमच्या इनपुटचे विश्लेषण करेल आणि तुमच्या परिस्थितीनुसार शिफारसी प्रदान करेल।',
      step4Title: 'पायरी 4: निर्णय समजून घ्या',
      step4Desc: 'शिफारशींचे तपशीलवार स्पष्टीकरण मिळवण्यासाठी "हा निर्णय का?" वर टॅप करा।',
    },
    history: {
      title: 'इतिहास',
      noPreviousResults: 'अद्याप कोणताही मागील निर्णय जतन केलेला नाही',
      clearHistory: 'सर्व इतिहास साफ करा',
      cropDecision: 'पीक निर्णय',
      sellDecision: 'विक्री निर्णय',
    },
    common: {
      back: 'मागे',
      cancel: 'रद्द करा',
      ok: 'ठीक आहे',
      error: 'त्रुटी',
      success: 'यश',
      loading: 'लोड करत आहे...',
      optional: 'वैकल्पिक',
    },
  },
  ta: {
    onboarding: {
      welcome: 'வரவேற்கிறோம்',
      title: 'அக்ரோஸ்மார்ட்',
      subtitle: 'ஸ்மார்ட் விவசாய முடிவுகள், ஆஃப்லைன்',
      feature1Title: 'பயிர் லாபம் பகுப்பாய்வு',
      feature1Desc:
        'உங்கள் நிலம், மண் மற்றும் நீர் கிடைக்கும் தன்மையின் அடிப்படையில் அதிகபட்ச லாபத்திற்கு எந்த பயிரை பயிரிடுவது என்பதற்கான AI-இயக்கப்படும் பரிந்துரைகளைப் பெறுங்கள்.',
      feature2Title: 'விற்பனை நேர ஆலோசகர்',
      feature2Desc:
        'உங்கள் பயிரை விற்க சிறந்த நேரம் தெரிந்து கொள்ளுங்கள். சந்தை போக்கு கணிப்புகள் மற்றும் நேர பரிந்துரைகளைப் பெறுங்கள்.',
      feature3Title: 'முற்றிலும் ஆஃப்லைன்',
      feature3Desc:
        'அனைத்து AI பகுப்பாய்வும் உங்கள் சாதனத்தில் நடக்கிறது. முதல் அமைவுக்குப் பிறகு இணையம் தேவையில்லை. உங்கள் தரவு தனிப்பட்டதாக இருக்கும்.',
      selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      getStarted: 'தொடங்குங்கள்',
      next: 'அடுத்து',
      skip: 'தவிர்',
    },
    home: {
      appName: 'அக்ரோஸ்மார்ட்',
      appSubtitle: 'ஸ்மார்ட் விவசாய முடிவுகள், ஆஃப்லைன்',
      cropProfit: 'பயிர் லாப முடிவு',
      cropProfitDesc: 'உங்கள் பண்ணைக்கு சிறந்த பயிரைக் கண்டறியவும்',
      sellTiming: 'விற்பனை நேர ஆலோசகர்',
      sellTimingDesc: 'உங்கள் அறுவடையை எப்போது விற்க வேண்டும் என்பதை அறியுங்கள்',
      howToUse: 'எவ்வாறு பயன்படுத்துவது',
      changeLanguage: 'மொழியை மாற்றவும்',
      history: 'வரலாற்றைக் காண்க',
    },
    cropProfit: {
      title: 'பயிர் லாபம் பகுப்பாய்வு',
      landSize: 'நில அளவு (ஏக்கர்)',
      landSizePlaceholder: 'எ.கா., 5 ஏக்கர்',
      cropOptions: 'பயிர் விருப்பங்கள் (விரும்பினால்)',
      cropOptionsPlaceholder: 'எ.கா., கோதுமை, அரிசி, கரும்பு',
      estimatedCost: 'மதிப்பிடப்பட்ட செலவு (₹)',
      estimatedCostPlaceholder: 'எ.கா., 50000',
      region: 'பகுதி/இடம்',
      regionPlaceholder: 'எ.கா., பஞ்சாப், மகாராஷ்டிரா',
      soilType: 'மண் வகை (விரும்பினால்)',
      soilTypePlaceholder: 'எ.கா., களிமண், தரை மண், மணல்',
      waterAvailability: 'நீர் கிடைக்கும் தன்மை',
      waterLow: 'குறைவு',
      waterMedium: 'நடுத்தரம்',
      waterHigh: 'அதிகம்',
      season: 'பருவம்',
      seasonKharif: 'கரீஃப் (பருவமழை)',
      seasonRabi: 'ராபி (குளிர்காலம்)',
      seasonZaid: 'ஜைத் (கோடை)',
      analyzeProfit: 'லாபத்தை பகுப்பாய்வு செய்யுங்கள்',
      analyzing: 'AI மூலம் பகுப்பாய்வு செய்யப்படுகிறது...',
      bestCrop: 'சிறந்த பயிர்',
      estimatedProfit: 'மதிப்பிடப்பட்ட லாபம்',
      riskLevel: 'ரிஸ்க் நிலை',
      riskLow: 'குறைந்த ரிஸ்க்',
      riskMedium: 'நடுத்தர ரிஸ்க்',
      riskHigh: 'அதிக ரிஸ்க்',
      whyDecision: 'இந்த முடிவு ஏன்?',
      useVoice: 'குரல் உள்ளீட்டைப் பயன்படுத்துங்கள்',
    },
    sellTiming: {
      title: 'விற்பனை நேர ஆலோசகர்',
      cropType: 'பயிர் வகை',
      cropTypePlaceholder: 'எ.கா., கோதுமை, அரிசி, பருத்தி',
      currentPrice: 'தற்போதைய விலை (₹/குவிண்டால், விரும்பினால்)',
      currentPricePlaceholder: 'எ.கா., 2000',
      season: 'பருவம்',
      region: 'பகுதி',
      regionPlaceholder: 'எ.கா., பஞ்சாப், மகாராஷ்டிரா',
      getSuggestion: 'பரிந்துரையைப் பெறுங்கள்',
      analyzing: 'சந்தை போக்குகளை பகுப்பாய்வு செய்கிறது...',
      trend: 'விலை போக்கு',
      trendUp: 'மேல்நோக்கி ↑',
      trendDown: 'கீழ்நோக்கி ↓',
      trendStable: 'நிலையானது →',
      recommendation: 'பரிந்துரை',
      reason: 'காரணம்',
      riskLevel: 'ரிஸ்க் நிலை',
      whyDecision: 'இந்த முடிவு ஏன்?',
      useVoice: 'குரல் உள்ளீட்டைப் பயன்படுத்துங்கள்',
    },
    explanation: {
      title: 'முடிவு விளக்கம்',
      loading: 'விரிவான விளக்கம் உருவாக்கப்படுகிறது...',
    },
    howToUse: {
      title: 'அக்ரோஸ்மார்ட்டை எவ்வாறு பயன்படுத்துவது',
      step1Title: 'படி 1: அம்சத்தைத் தேர்ந்தெடுக்கவும்',
      step1Desc:
        'வளர்க்க சிறந்த பயிரைக் கண்டறிய பயிர் லாப முடிவு அல்லது விற்க வேண்டிய நேரத்தை அறிய விற்பனை நேர ஆலோசகரைத் தேர்ந்தெடுக்கவும்.',
      step2Title: 'படி 2: விவரங்களை உள்ளிடவும்',
      step2Desc:
        'உங்கள் நில விவரங்கள், பகுதி மற்றும் பிற தகவல்களை நிரப்பவும். நீங்கள் தட்டச்சு செய்யலாம் அல்லது குரல் உள்ளீட்டைப் பயன்படுத்தலாம்.',
      step3Title: 'படி 3: AI பகுப்பாய்வைப் பெறுங்கள்',
      step3Desc:
        'எங்கள் ஆஃப்லைன் AI உங்கள் உள்ளீடுகளை பகுப்பாய்வு செய்து உங்கள் சூழ்நிலைக்கு ஏற்ற பரிந்துரைகளை வழங்கும்.',
      step4Title: 'படி 4: முடிவை புரிந்து கொள்ளுங்கள்',
      step4Desc: 'பரிந்துரைகளின் விரிவான விளக்கத்தைப் பெற "இந்த முடிவு ஏன்?" என்பதைத் தட்டவும்.',
    },
    history: {
      title: 'வரலாறு',
      noPreviousResults: 'இன்னும் முந்தைய முடிவுகள் சேமிக்கப்படவில்லை',
      clearHistory: 'அனைத்து வரலாற்றையும் அழிக்கவும்',
      cropDecision: 'பயிர் முடிவு',
      sellDecision: 'விற்பனை முடிவு',
    },
    common: {
      back: 'பின்',
      cancel: 'ரத்து',
      ok: 'சரி',
      error: 'பிழை',
      success: 'வெற்றி',
      loading: 'ஏற்றுகிறது...',
      optional: 'விரும்பினால்',
    },
  },
  te: {
    onboarding: {
      welcome: 'స్వాగతం',
      title: 'అగ్రోస్మార్ట్',
      subtitle: 'స్మార్ట్ వ్యవసాయ నిర్ణయాలు, ఆఫ్‌లైన్',
      feature1Title: 'పంట లాభం విశ్లేషణ',
      feature1Desc:
        'మీ భూమి, మట్టి మరియు నీటి లభ్యత ఆధారంగా గరిష్ట లాభం కోసం ఏ పంట పండించాలో AI-ఆధారిత సిఫార్సులను పొందండి.',
      feature2Title: 'అమ్మకపు సమయ సలహాదారు',
      feature2Desc:
        'మీ పంటను అమ్మడానికి ఉత్తమ సమయం తెలుసుకోండి. మార్కెట్ ట్రెండ్ అంచనాలు మరియు సమయ సిఫార్సులను పొందండి.',
      feature3Title: 'పూర్తిగా ఆఫ్‌లైన్',
      feature3Desc:
        'అన్ని AI విశ్లేషణలు మీ పరికరంలో జరుగుతాయి. మొదటి సెటప్ తర్వాత ఇంటర్నెట్ అవసరం లేదు. మీ డేటా ప్రైవేట్‌గా ఉంటుంది.',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      getStarted: 'ప్రారంభించండి',
      next: 'తదుపరి',
      skip: 'దాటవేయండి',
    },
    home: {
      appName: 'అగ్రోస్మార్ట్',
      appSubtitle: 'స్మార్ట్ వ్యవసాయ నిర్ణయాలు, ఆఫ్‌లైన్',
      cropProfit: 'పంట లాభం నిర్ణయం',
      cropProfitDesc: 'మీ పొలానికి ఉత్తమ పంటను కనుగొనండి',
      sellTiming: 'అమ్మకపు సమయ సలహాదారు',
      sellTimingDesc: 'మీ పంటను ఎప్పుడు అమ్మాలో తెలుసుకోండి',
      howToUse: 'ఎలా ఉపయోగించాలి',
      changeLanguage: 'భాషను మార్చండి',
      history: 'చరిత్రను చూడండి',
    },
    cropProfit: {
      title: 'పంట లాభం విశ్లేషణ',
      landSize: 'భూమి పరిమాణం (ఎకరాలు)',
      landSizePlaceholder: 'ఉదా., 5 ఎకరాలు',
      cropOptions: 'పంట ఎంపికలు (ఐచ్ఛికం)',
      cropOptionsPlaceholder: 'ఉదా., గోధుమ, బియ్యం, చెరకు',
      estimatedCost: 'అంచనా వేసిన ఖర్చు (₹)',
      estimatedCostPlaceholder: 'ఉదా., 50000',
      region: 'ప్రాంతం/స్థానం',
      regionPlaceholder: 'ఉదా., పంజాబ్, మహారాష్ట్ర',
      soilType: 'మట్టి రకం (ఐచ్ఛికం)',
      soilTypePlaceholder: 'ఉదా., మట్టి, లోమ్, ఇసుక',
      waterAvailability: 'నీటి లభ్యత',
      waterLow: 'తక్కువ',
      waterMedium: 'మధ్యస్థం',
      waterHigh: 'ఎక్కువ',
      season: 'కాలం',
      seasonKharif: 'ఖరీఫ్ (వర్షాకాలం)',
      seasonRabi: 'రబీ (శీతాకాలం)',
      seasonZaid: 'జైద్ (వేసవి)',
      analyzeProfit: 'లాభాన్ని విశ్లేషించండి',
      analyzing: 'AI తో విశ్లేషించబడుతోంది...',
      bestCrop: 'ఉత్తమ పంట',
      estimatedProfit: 'అంచనా లాభం',
      riskLevel: 'రిస్క్ స్థాయి',
      riskLow: 'తక్కువ రిస్క్',
      riskMedium: 'మధ్యస్థ రిస్క్',
      riskHigh: 'ఎక్కువ రిస్క్',
      whyDecision: 'ఈ నిర్ణయం ఎందుకు?',
      useVoice: 'వాయిస్ ఇన్‌పుట్‌ని ఉపయోగించండి',
    },
    sellTiming: {
      title: 'అమ్మకపు సమయ సలహాదారు',
      cropType: 'పంట రకం',
      cropTypePlaceholder: 'ఉదా., గోధుమ, బియ్యం, పత్తి',
      currentPrice: 'ప్రస్తుత ధర (₹/క్వింటల్, ఐచ్ఛికం)',
      currentPricePlaceholder: 'ఉదా., 2000',
      season: 'కాలం',
      region: 'ప్రాంతం',
      regionPlaceholder: 'ఉదా., పంజాబ్, మహారాష్ట్ర',
      getSuggestion: 'సూచనను పొందండి',
      analyzing: 'మార్కెట్ ట్రెండ్‌లను విశ్లేషిస్తోంది...',
      trend: 'ధర ట్రెండ్',
      trendUp: 'పైకి ↑',
      trendDown: 'క్రింద ↓',
      trendStable: 'స్థిరమైన →',
      recommendation: 'సిఫార్సు',
      reason: 'కారణం',
      riskLevel: 'రిస్క్ స్థాయి',
      whyDecision: 'ఈ నిర్ణయం ఎందుకు?',
      useVoice: 'వాయిస్ ఇన్‌పుట్‌ని ఉపయోగించండి',
    },
    explanation: {
      title: 'నిర్ణయ వివరణ',
      loading: 'వివరణాత్మక వివరణ రూపొందించబడుతోంది...',
    },
    howToUse: {
      title: 'అగ్రోస్మార్ట్‌ను ఎలా ఉపయోగించాలి',
      step1Title: 'దశ 1: ఫీచర్‌ను ఎంచుకోండి',
      step1Desc:
        'పండించడానికి ఉత్తమ పంటను కనుగొనడానికి పంట లాభం నిర్ణయం లేదా అమ్మడానికి సమయం తెలుసుకోవడానికి అమ్మకపు సమయ సలహాదారుని ఎంచుకోండి.',
      step2Title: 'దశ 2: వివరాలను నమోదు చేయండి',
      step2Desc:
        'మీ భూమి వివరాలు, ప్రాంతం మరియు ఇతర సమాచారాన్ని నింపండి. మీరు టైప్ చేయవచ్చు లేదా వాయిస్ ఇన్‌పుట్‌ని ఉపయోగించవచ్చు.',
      step3Title: 'దశ 3: AI విశ్లేషణను పొందండి',
      step3Desc:
        'మా ఆఫ్‌లైన్ AI మీ ఇన్‌పుట్‌లను విశ్లేషిస్తుంది మరియు మీ పరిస్థితికి అనుగుణంగా సిఫార్సులను అందిస్తుంది.',
      step4Title: 'దశ 4: నిర్ణయాన్ని అర్థం చేసుకోండి',
      step4Desc: 'సిఫార్సుల వివరణాత్మక వివరణను పొందడానికి "ఈ నిర్ణయం ఎందుకు?" అని నొక్కండి.',
    },
    history: {
      title: 'చరిత్ర',
      noPreviousResults: 'ఇంకా మునుపటి నిర్ణయాలు సేవ్ చేయబడలేదు',
      clearHistory: 'మొత్తం చరిత్రను తొలగించండి',
      cropDecision: 'పంట నిర్ణయం',
      sellDecision: 'అమ్మకం నిర్ణయం',
    },
    common: {
      back: 'వెనుకకు',
      cancel: 'రద్దు చేయండి',
      ok: 'సరే',
      error: 'లోపం',
      success: 'విజయం',
      loading: 'లోడ్ అవుతోంది...',
      optional: 'ఐచ్ఛికం',
    },
  },
};
