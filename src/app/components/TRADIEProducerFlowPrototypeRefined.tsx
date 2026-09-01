import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Globe, Mic, Home, Briefcase, ShoppingCart, Truck, Warehouse, 
  DollarSign, Scale, Shield, Settings, Bell, ChevronDown, ChevronRight,
  Camera, Upload, Check, X, QrCode, TrendingUp, AlertCircle, Info,
  Coins, Award, Star, Leaf, Sprout, Package, MapPin, Calendar,
  Clock, Users, FileText, CheckCircle, XCircle, Zap, Sparkles,
  Search, Filter, BarChart, Lock, Unlock, Eye, TrendingDown,
  PlayCircle, PauseCircle, RefreshCw, Send, MessageCircle,
  Plus, Minus, Edit, Trash2, Download, Share2, Copy
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

// ========================================
// TRADIE DESIGN SYSTEM - UNIFIED TOKENS
// ========================================
const TRADIE_TOKENS = {
  colors: {
    primaryGold: '#F4D03F',
    successGreen: '#27AE60',
    errorRed: '#E74C3C',
    white: '#FFFFFF',
    grayDark: '#4A4A4A',
    grayLight: '#BFBFBF',
    grayBg: '#F5F5F5',
  },
  typography: {
    h1: '32px',
    h2: '24px',
    h3: '20px',
    body: '16px',
    small: '14px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  radius: {
    square: 8,
    round: 9999,
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.16)',
    lg: '0 10px 20px rgba(0,0,0,0.20)',
  },
  animation: {
    cardSlideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { type: 'spring', duration: 0.3 }
    },
    buttonScale: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
      transition: { duration: 0.15 }
    },
    tokenBurst: {
      duration: 2,
      loop: true,
    }
  }
};

// ========================================
// UNIFIED COMMODITY DATABASE (200+)
// ========================================
const UNIFIED_COMMODITIES = {
  'Cereals': {
    'Rice': [
      'Basmati 370',
      'Pusa Basmati 1121',
      'Sona Masuri',
      'IR 64',
      'Swarna',
      'BPT 5204',
      'MTU 7029',
      'Jaya',
      'Samba Mahsuri'
    ],
    'Wheat': [
      'HD2967',
      'PBW 343',
      'PBW 550',
      'Lok 1',
      'DBW 17',
      'Sharbati',
      'MP 3288',
      'HI 1544'
    ],
    'Maize': [
      'HQPM1',
      'PMH 1',
      'DHM 117',
      'Vivek Maize 27',
      'Deccan 101',
      'Shaktiman 2',
      'Ganga 5'
    ],
    'Pearl Millet (Bajra)': [
      'ICTP 8203',
      'HHB 67',
      'RHB 121',
      'Pusa 322',
      'WCC 75'
    ],
    'Finger Millet (Ragi)': [
      'GPU 28',
      'PR 202',
      'VL Mandua 352',
      'ML 365',
      'Indaf 9'
    ],
    'Sorghum (Jowar)': [
      'CSV 15',
      'CSV 216',
      'M 35-1',
      'SPV 86'
    ]
  },
  'Pulses': {
    'Arhar (Pigeon Pea)': [
      'Pusa 992',
      'Pusa 2001',
      'Pusa 15',
      'Asha',
      'Bahar',
      'Parbhani Tur'
    ],
    'Moong (Green Gram)': [
      'Pusa Baisakhi',
      'Pusa Vishal',
      'SML 668',
      'PDM 139',
      'TM 96-2'
    ],
    'Chana (Chickpea)': [
      'Pusa 372',
      'JG 11',
      'JG 16',
      'Pusa 256',
      'HC 1'
    ],
    'Urad (Black Gram)': [
      'Type 9',
      'Pant U 19',
      'PU 31',
      'Azad U 1'
    ],
    'Masoor (Lentil)': [
      'L 4076',
      'Pant L 406',
      'IPL 81'
    ]
  },
  'Oilseeds': {
    'Groundnut': [
      'JL 24',
      'TMV 2',
      'TMVGn 13',
      'Kadiri 9',
      'TAG 24'
    ],
    'Mustard': [
      'Pusa Bold',
      'Varuna',
      'Kranti',
      'Rohini',
      'Pusa Mustard 25'
    ],
    'Soybean': [
      'JS 335',
      'MAUS 71',
      'JS 97-52',
      'JS 95-60'
    ],
    'Sunflower': [
      'KBSH 1',
      'Morden',
      'KBSH 44',
      'PAC 36'
    ],
    'Sesame': [
      'TKG 306',
      'GT 10',
      'Punjab Til No. 1'
    ]
  },
  'Spices': {
    'Turmeric': [
      'Erode Local',
      'IISR Prathibha',
      'Roma',
      'Suguna',
      'Alleppey Finger',
      'Rajendra Sonia'
    ],
    'Chilli': [
      'Guntur S4',
      'Teja',
      'Byadagi',
      'Sankeshwar',
      'Jwala',
      'Pusa Sadabahar'
    ],
    'Black Pepper': [
      'Panniyur 1',
      'Karimunda',
      'Subhakara',
      'IISR Shakthi'
    ],
    'Cardamom': [
      'IISR Vijaya',
      'IISR Avinash',
      'PV 1',
      'Mudigere 1'
    ],
    'Coriander': [
      'Pant Haritima',
      'RCr 41',
      'CS 6'
    ],
    'Cumin': [
      'Gujarat Cumin 4',
      'RZ 19',
      'RZ 209'
    ]
  },
  'Fruits': {
    'Mango': [
      'Alphonso',
      'Kesar',
      'Dashehari',
      'Langra',
      'Totapuri',
      'Banganapalli',
      'Himsagar'
    ],
    'Banana': [
      'Grand Naine',
      'Robusta',
      'Rasthali',
      'Nendran',
      'Red Banana',
      'Ney Poovan'
    ],
    'Guava': [
      'Allahabad Safeda',
      'L-49',
      'Lucknow 49',
      'Red Fleshed',
      'Apple Color'
    ],
    'Apple': [
      'Red Delicious',
      'Royal Delicious',
      'Maharaji',
      'Ambri'
    ],
    'Grapes': [
      'Thompson Seedless',
      'Bangalore Blue',
      'Anab-e-Shahi'
    ]
  },
  'Vegetables': {
    'Potato': [
      'Kufri Jyoti',
      'Kufri Pukhraj',
      'Kufri Sindhuri',
      'Kufri Chandramukhi',
      'Kufri Bahar'
    ],
    'Onion': [
      'Pusa Red',
      'Pusa Ratnar',
      'Agrifound Light Red',
      'Agri Found Dark Red',
      'Bhima Kiran',
      'Bhima Super'
    ],
    'Tomato': [
      'Arka Rakshak',
      'Arka Vikas',
      'Pusa Ruby',
      'Pusa Gaurav',
      'Arka Meghali'
    ],
    'Spinach': [
      'Punjab Green',
      'All Green',
      'Pusa Bharati',
      'Pusa Harit'
    ],
    'Cabbage': [
      'Pride of India',
      'Golden Acre',
      'Pusa Mukta'
    ],
    'Cauliflower': [
      'Pusa Snowball K-1',
      'Pusa Katki',
      'Early Kunwari'
    ]
  },
  'Plantation Crops': {
    'Coconut': [
      'West Coast Tall',
      'Chandra Kalpa Dwarf',
      'Malayan Dwarf',
      'Gangabondam',
      'Laccadive Micro',
      'Chowghat Orange Dwarf'
    ],
    'Coffee': [
      'SLN 9 (Arabica)',
      'Catimor (Arabica)',
      'S.795 (Arabica)',
      'CxR (Robusta)'
    ],
    'Tea': [
      'TV 23',
      'TV 25',
      'Tocklai varieties',
      'UPASI varieties'
    ],
    'Cashew': [
      'Vengurla 1',
      'Ullal 3',
      'BPP 8',
      'Bhaskara'
    ],
    'Areca Nut': [
      'Mangala',
      'Sreemangala',
      'Sumangala'
    ]
  },
  'Mushrooms': {
    'Oyster': [
      'Grey Oyster',
      'Pink Oyster',
      'Yellow Oyster'
    ],
    'Button': [
      'White Button',
      'Cream Button'
    ],
    'Specialty': [
      'Paddy Straw (Volvariella)',
      'Milky (Calocybe)',
      'Shiitake (Lentinula)',
      'Enoki'
    ]
  },
  'Fibers': {
    'Cotton': [
      'MCU 5',
      'BT Cotton',
      'Suraj',
      'H 4'
    ],
    'Jute': [
      'Sabuj',
      'Tara',
      'JRO 524',
      'JRO 632'
    ]
  }
};

// Flatten for search
const COMMODITY_LIST = Object.entries(UNIFIED_COMMODITIES).flatMap(([category, subcategories]) =>
  Object.entries(subcategories).flatMap(([name, varieties]) =>
    varieties.map(variety => ({
      category,
      commodity: name,
      variety,
      fullName: `${name} - ${variety}`,
      searchText: `${category} ${name} ${variety}`.toLowerCase()
    }))
  )
);

// ========================================
// MULTI-LANGUAGE SUPPORT
// ========================================
const LANGUAGES = {
  EN: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  HI: { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
  TE: { name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
  TM: { name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
  KN: { name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
  BN: { name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
  MR: { name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
};

// ========================================
// UNIFIED TRADIE TOKEN SYSTEM
// ========================================
interface TradieTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  reason: string;
  timestamp: Date;
  screen: string;
}

interface TradieWallet {
  balance: number;
  transactions: TradieTransaction[];
  dailyLoginCount: number;
  lastLoginDate: string;
}

const TRADIE_REWARDS = {
  signup: 50,
  dailyLogin: 5,
  cropSelect: 5,
  journalEntry: 3,
  tokenize: 5,
  qualityCheck: 10,
  serviceBook: -10,
  tradeComplete: 10,
  review: 2,
};

// ========================================
// SHARED ANIMATION VARIANTS
// ========================================
const sharedAnimations = {
  cardSlideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  scaleButton: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.15 }
  },
  tokenBurst: {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: [0, 1.5, 1], 
      rotate: [0, 180, 360] 
    },
    transition: { duration: 1, ease: 'easeOut' }
  },
  sparkle: (i: number) => ({
    initial: { scale: 0, x: 0, y: 0 },
    animate: {
      scale: [0, 1, 0],
      x: Math.cos((i * Math.PI) / 4) * 100,
      y: Math.sin((i * Math.PI) / 4) * 100,
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      delay: i * 0.1,
    }
  }),
  shimmer: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// ========================================
// UNIFIED WALLET CARD COMPONENT
// ========================================
const UnifiedWalletCard: React.FC<{
  wallet: TradieWallet;
  onTap?: () => void;
}> = ({ wallet, onTap }) => (
  <motion.div
    {...sharedAnimations.scaleButton}
    onClick={onTap}
    className="relative overflow-hidden rounded-lg p-6 cursor-pointer"
    style={{
      background: 'linear-gradient(135deg, #F4D03F 0%, #F39C12 100%)',
      boxShadow: TRADIE_TOKENS.shadow.lg,
    }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '200% 0%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
    
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm mb-1">Tradie Tokens</p>
        <p className="text-white text-4xl font-bold">{wallet.balance}</p>
        <p className="text-white/70 text-xs mt-1">
          {wallet.transactions.length} transactions
        </p>
      </div>
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      >
        <Coins className="w-16 h-16 text-white/90" />
      </motion.div>
    </div>
  </motion.div>
);

// ========================================
// VOICE INPUT COMPONENT
// ========================================
const VoiceInput: React.FC<{
  onResult: (text: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}> = ({ onResult, isListening, setIsListening }) => {
  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => {
      if (isListening) {
        onResult('Voice input simulated');
        setIsListening(false);
      }
    }, 2000);
  };

  return (
    <motion.button
      {...sharedAnimations.scaleButton}
      onClick={handleVoiceInput}
      className="relative p-3 rounded-lg hover:bg-gray-100 transition"
      style={{ minWidth: '48px', minHeight: '48px' }}
    >
      <Mic className={`w-6 h-6 ${isListening ? 'text-red-500' : 'text-yellow-600'}`} />
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
          >
            Listening...
            <motion.div
              className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ========================================
// MAIN PROTOTYPE COMPONENT
// ========================================
interface TRADIEProducerFlowPrototypeRefinedProps {
  onClose?: () => void;
}

export const TRADIEProducerFlowPrototypeRefined: React.FC<TRADIEProducerFlowPrototypeRefinedProps> = ({ onClose }) => {
  // State management
  const [currentScreen, setCurrentScreen] = useState(1);
  const [language, setLanguage] = useState<keyof typeof LANGUAGES>('EN');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCommodity, setSelectedCommodity] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [showTokenAnimation, setShowTokenAnimation] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);
  
  // Ref to track if welcome bonus has been added (prevents duplicate)
  const welcomeBonusAddedRef = useRef(false);
  
  // Unified wallet state
  const [wallet, setWallet] = useState<TradieWallet>({
    balance: 0,
    transactions: [],
    dailyLoginCount: 0,
    lastLoginDate: '',
  });

  // Form data
  const [formData, setFormData] = useState<any>({
    acres: '',
    soilType: '',
    waterSource: '',
    journalEntries: [],
    qualityTiers: [],
    lotDetails: {},
  });

  // Add tokens with animation
  const addTradieTokens = useCallback((amount: number, reason: string, screen: string) => {
    const transaction: TradieTransaction = {
      id: Date.now().toString(),
      type: amount > 0 ? 'earned' : 'spent',
      amount: Math.abs(amount),
      reason,
      timestamp: new Date(),
      screen,
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: [transaction, ...prev.transactions],
    }));

    if (amount > 0) {
      setShowTokenAnimation(true);
      setTimeout(() => setShowTokenAnimation(false), 2000);
    }
  }, []);

  // Navigation
  const goToScreen = (screenNumber: number, addTokens?: { amount: number; reason: string }) => {
    if (addTokens) {
      addTradieTokens(addTokens.amount, addTokens.reason, `Screen ${screenNumber}`);
    }
    setCurrentScreen(screenNumber);
    window.scrollTo(0, 0);
  };

  // Daily login bonus
  useEffect(() => {
    const today = new Date().toDateString();
    if (wallet.lastLoginDate !== today && currentScreen === 4) {
      addTradieTokens(TRADIE_REWARDS.dailyLogin, 'Daily Login Bonus', 'Screen 4');
      setWallet(prev => ({
        ...prev,
        dailyLoginCount: prev.dailyLoginCount + 1,
        lastLoginDate: today,
      }));
    }
  }, [currentScreen]);

  // ========================================
  // SCREEN 1: LANGUAGE SELECT
  // ========================================
  const LanguageSelectScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <motion.div
        {...sharedAnimations.cardSlideUp}
        className="max-w-md mx-auto"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #F4D03F 0%, #F39C12 100%)',
              boxShadow: TRADIE_TOKENS.shadow.lg,
            }}
          >
            <Leaf className="w-12 h-12 text-white" />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(244, 208, 63, 0.5)',
                  '0 0 40px rgba(244, 208, 63, 0.8)',
                  '0 0 20px rgba(244, 208, 63, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <h1 
            className="font-bold mb-2"
            style={{ 
              fontSize: TRADIE_TOKENS.typography.h1,
              color: TRADIE_TOKENS.colors.grayDark,
              fontFamily: TRADIE_TOKENS.typography.fontFamily
            }}
          >
            TRADIE
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontSize: TRADIE_TOKENS.typography.body }}
          >
            Choose Your Language
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(LANGUAGES).map(([code, { flag, nativeName }], index) => (
            <motion.button
              key={code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              {...sharedAnimations.scaleButton}
              onClick={() => {
                setLanguage(code as keyof typeof LANGUAGES);
                setTimeout(() => goToScreen(2), 300);
              }}
              className={`p-6 rounded-lg border-2 transition-all ${
                language === code
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-yellow-300'
              }`}
              style={{
                borderRadius: `${TRADIE_TOKENS.radius.square}px`,
                boxShadow: language === code ? TRADIE_TOKENS.shadow.md : TRADIE_TOKENS.shadow.sm,
                minHeight: '48px',
              }}
            >
              <div className="text-5xl mb-2">{flag}</div>
              <div 
                className="font-semibold"
                style={{ 
                  fontSize: TRADIE_TOKENS.typography.body,
                  color: TRADIE_TOKENS.colors.grayDark 
                }}
              >
                {nativeName}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Voice Toggle */}
        <motion.div
          {...sharedAnimations.cardSlideUp}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          style={{ borderRadius: `${TRADIE_TOKENS.radius.square}px` }}
        >
          <div className="flex items-center gap-3">
            <Mic className="w-6 h-6 text-yellow-600" />
            <span 
              className="font-semibold"
              style={{ 
                fontSize: TRADIE_TOKENS.typography.body,
                color: TRADIE_TOKENS.colors.grayDark 
              }}
            >
              Voice Input
            </span>
          </div>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              voiceEnabled ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            style={{ minWidth: '56px' }}
          >
            <motion.div
              animate={{ x: voiceEnabled ? 28 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow"
            />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );

  // ========================================
  // SCREEN 2: ROLE SELECT
  // ========================================
  const RoleSelectScreen = () => {
    const roles = [
      { id: 'producer', icon: '🌾', label: 'Producer', subtitle: 'AI Lifecycle' },
      { id: 'agent', icon: '📦', label: 'Agent', subtitle: 'Commission' },
      { id: 'buyer', icon: '🛒', label: 'Buyer', subtitle: 'Purchase' },
      { id: 'transporter', icon: '🚛', label: 'Transporter', subtitle: 'Logistics' },
      { id: 'storage', icon: '🏭', label: 'Storage', subtitle: 'Warehouse' },
      { id: 'financial', icon: '🏦', label: 'Financial', subtitle: 'Loans' },
      { id: 'regulator', icon: '⚖️', label: 'Regulator', subtitle: 'Quality' },
      { id: 'admin', icon: '🔧', label: 'Admin', subtitle: 'System' },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
        <motion.div
          {...sharedAnimations.fadeIn}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              {...sharedAnimations.scaleButton}
              onClick={() => goToScreen(1)}
              className="p-2 hover:bg-white/50 rounded-lg"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <ChevronRight className="w-6 h-6 rotate-180 text-gray-600" />
            </motion.button>
            <Badge 
              className="bg-white text-yellow-700 border border-yellow-300"
              style={{ borderRadius: `${TRADIE_TOKENS.radius.square}px` }}
            >
              {LANGUAGES[language].flag} {LANGUAGES[language].nativeName}
            </Badge>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="font-bold mb-2"
              style={{ 
                fontSize: TRADIE_TOKENS.typography.h1,
                color: TRADIE_TOKENS.colors.grayDark 
              }}
            >
              Select Your Role
            </h1>
            <p 
              className="text-gray-600"
              style={{ fontSize: TRADIE_TOKENS.typography.body }}
            >
              You can change this anytime in settings
            </p>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                {...sharedAnimations.scaleButton}
                onClick={() => {
                  setSelectedRole(role.id);
                  setTimeout(() => goToScreen(3), 300);
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}
                style={{
                  borderRadius: `${TRADIE_TOKENS.radius.square}px`,
                  boxShadow: TRADIE_TOKENS.shadow.md,
                  minHeight: '120px',
                }}
              >
                <div className="text-5xl mb-3">{role.icon}</div>
                <div 
                  className="font-bold mb-1"
                  style={{ 
                    fontSize: TRADIE_TOKENS.typography.body,
                    color: TRADIE_TOKENS.colors.grayDark 
                  }}
                >
                  {role.label}
                </div>
                <div 
                  className="text-gray-500"
                  style={{ fontSize: TRADIE_TOKENS.typography.small }}
                >
                  {role.subtitle}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  // ========================================
  // SCREEN 3: SIGNUP REWARD
  // ========================================
  const SignupRewardScreen = () => {
    useEffect(() => {
      // Only add welcome bonus once using ref
      if (!welcomeBonusAddedRef.current) {
        welcomeBonusAddedRef.current = true;
        addTradieTokens(TRADIE_REWARDS.signup, 'Welcome Bonus', 'Screen 3');
      }
    }, [addTradieTokens]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 p-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center"
        >
          {/* Token Burst */}
          <motion.div
            {...sharedAnimations.tokenBurst}
            className="relative w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #F39C12 100%)',
              boxShadow: '0 20px 60px rgba(244, 208, 63, 0.6)',
            }}
          >
            <Coins className="w-16 h-16 text-white" />
            
            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4"
                {...sharedAnimations.sparkle(i)}
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </motion.div>
            ))}
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 
              className="text-white font-bold mb-4"
              style={{ fontSize: TRADIE_TOKENS.typography.h1 }}
            >
              Welcome to TRADIE!
            </h1>
            <p 
              className="text-white mb-2"
              style={{ fontSize: TRADIE_TOKENS.typography.h2 }}
            >
              <span className="font-bold">+{TRADIE_REWARDS.signup} Tradie Tokens</span>
            </p>
            <p className="text-white/80 text-sm">Signup Bonus</p>
          </motion.div>

          {/* Wallet Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-sm mx-auto mb-8 mt-8"
          >
            <UnifiedWalletCard wallet={wallet} />
          </motion.div>

          {/* Voice Read Aloud */}
          {voiceEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                variant="outline"
                className="mb-6 bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur"
                style={{
                  borderRadius: `${TRADIE_TOKENS.radius.square}px`,
                  minHeight: '48px',
                }}
              >
                <Mic className="w-5 h-5 mr-2" />
                Read Welcome
              </Button>
            </motion.div>
          )}

          {/* Continue Button */}
          <Button
            onClick={() => goToScreen(4)}
            className="w-full max-w-sm font-bold shadow-2xl"
            style={{
              backgroundColor: TRADIE_TOKENS.colors.white,
              color: TRADIE_TOKENS.colors.primaryGold,
              borderRadius: `${TRADIE_TOKENS.radius.square}px`,
              minHeight: '48px',
              fontSize: TRADIE_TOKENS.typography.body,
            }}
          >
            Start Dashboard
          </Button>
        </motion.div>
      </div>
    );
  };

  // Continue with remaining screens in next message...
  
  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <LanguageSelectScreen />;
      case 2: return <RoleSelectScreen />;
      case 3: return <SignupRewardScreen />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <Card className="max-w-md w-full p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Screen {currentScreen}</h2>
              <p className="text-gray-600 mb-6">
                Coming in next update...
              </p>
              <Button
                onClick={() => goToScreen(4)}
                style={{
                  backgroundColor: TRADIE_TOKENS.colors.primaryGold,
                  borderRadius: `${TRADIE_TOKENS.radius.square}px`,
                }}
              >
                Back to Dashboard
              </Button>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Token Animation Overlay */}
      <AnimatePresence>
        {showTokenAnimation && (
          <motion.div
            {...sharedAnimations.fadeIn}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              {...sharedAnimations.tokenBurst}
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #F39C12 100%)',
              }}
            >
              <Coins className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Close Button */}
      {onClose && currentScreen === 1 && (
        <motion.button
          {...sharedAnimations.scaleButton}
          onClick={onClose}
          className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
          style={{
            borderRadius: `${TRADIE_TOKENS.radius.round}px`,
            boxShadow: TRADIE_TOKENS.shadow.lg,
          }}
        >
          <X className="w-6 h-6 text-gray-600" />
        </motion.button>
      )}
    </div>
  );
};

export default TRADIEProducerFlowPrototypeRefined;
