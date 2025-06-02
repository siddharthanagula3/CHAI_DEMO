// mockData.ts (updated with nutritionBreakdown)

import { 
  User, 
  WeightEntry, 
  FitnessEntry, 
  NutritionEntry, 
  SleepEntry, 
  MoodEntry,
  HealthInsight,
  VideoSummary,
  SubscriptionPlan,
  BodyComposition,
  BodyCompositionGoal
} from '../types';

// Mock Weekly Health Score Data
export const weeklyHealthScore = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 88 },
  { day: 'Wed', score: 82 },
  { day: 'Thu', score: 90 },
  { day: 'Fri', score: 87 },
  { day: 'Sat', score: 92 },
  { day: 'Sun', score: 89 }
];

// Mock Nutrition Breakdown for Charts
export const nutritionBreakdown = [
  { name: 'Protein', value: 25, color: '#8884d8' },
  { name: 'Carbs', value: 45, color: '#82ca9d' },
  { name: 'Fat', value: 30, color: '#ffc658' }
];

// Mock Daily Nutrition Data for Line Charts
export const dailyNutritionData = [
  { date: '2025-05-25', protein: 120, carbs: 250, fat: 80, calories: 2100 },
  { date: '2025-05-26', protein: 115, carbs: 240, fat: 85, calories: 2050 },
  { date: '2025-05-27', protein: 125, carbs: 260, fat: 75, calories: 2150 },
  { date: '2025-05-28', protein: 130, carbs: 245, fat: 90, calories: 2200 },
  { date: '2025-05-29', protein: 110, carbs: 235, fat: 70, calories: 1950 },
  { date: '2025-05-30', protein: 135, carbs: 270, fat: 95, calories: 2300 },
  { date: '2025-06-01', protein: 128, carbs: 255, fat: 82, calories: 2180 }
];

// Mock Weekly Activity Data
export const weeklyActivityData = [
  { day: 'Mon', steps: 8500, calories: 320 },
  { day: 'Tue', steps: 12000, calories: 450 },
  { day: 'Wed', steps: 6500, calories: 280 },
  { day: 'Thu', steps: 15000, calories: 520 },
  { day: 'Fri', steps: 9200, calories: 380 },
  { day: 'Sat', steps: 18000, calories: 650 },
  { day: 'Sun', steps: 11500, calories: 420 }
];

// Mock Sleep Quality Data
export const sleepQualityData = [
  { date: '2025-05-25', duration: 7.5, quality: 8, deepSleep: 2.5 },
  { date: '2025-05-26', duration: 8.0, quality: 9, deepSleep: 3.0 },
  { date: '2025-05-27', duration: 6.5, quality: 6, deepSleep: 2.0 },
  { date: '2025-05-28', duration: 7.8, quality: 8, deepSleep: 2.8 },
  { date: '2025-05-29', duration: 8.2, quality: 9, deepSleep: 3.2 },
  { date: '2025-05-30', duration: 7.0, quality: 7, deepSleep: 2.3 },
  { date: '2025-06-01', duration: 7.5, quality: 8, deepSleep: 2.6 }
];

// Mock Monthly Weight Data
export const monthlyWeightData = [
  { month: 'Jan', weight: 70.5 },
  { month: 'Feb', weight: 70.2 },
  { month: 'Mar', weight: 69.8 },
  { month: 'Apr', weight: 69.5 },
  { month: 'May', weight: 69.2 },
  { month: 'Jun', weight: 68.9 },
  { month: 'Jul', weight: 68.7 },
  { month: 'Aug', weight: 68.5 },
  { month: 'Sep', weight: 68.3 },
  { month: 'Oct', weight: 68.1 },
  { month: 'Nov', weight: 67.9 },
  { month: 'Dec', weight: 67.7 }
];

// Mock Subscription Plans
export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic health tracking',
      'Limited data visualization',
      'Manual data entry',
      'English language only'
    ],
    featuresEnabled: {
      aiCoach: false,
      videoSummaries: false,
      multilingualSupport: false
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    originalPrice: 9.99,
    price: 5.99,
    discount: 40,
    savings: 4.00,
    interval: 'month',
    features: [
      'Advanced health analytics',
      'Voice command entry',
      'Monthly video summaries',
      'All languages supported',
      'AI-powered recommendations',
      'Export and share data'
    ],
    isPopular: true,
    featuresEnabled: {
      aiCoach: true,
      videoSummaries: true,
      multilingualSupport: true
    }
  },
  {
    id: 'family',
    name: 'Family',
    originalPrice: 19.99,
    price: 8.99,
    discount: 55,
    savings: 11.00,
    interval: 'month',
    features: [
      'All Premium features',
      'Up to 5 family members',
      'Family health insights',
      'Shared goals and challenges',
      'Priority support'
    ],
    isLimitedTime: true,
    featuresEnabled: {
      aiCoach: true,
      videoSummaries: true,
      multilingualSupport: true
    }
  }
];

// Mock Weight Entries
export const mockWeightEntries: WeightEntry[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    weight: 70.5,
    unit: 'kg',
    source: 'Manual'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    weight: 70.3,
    unit: 'kg',
    source: 'Fitbit'
  }
];

// Mock Fitness Entries
export const mockFitnessEntries: FitnessEntry[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    activity: 'Running',
    duration: 30,
    caloriesBurned: 300,
    tags: ['cardio', 'outdoor'],
    source: 'AppleWatch'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    activity: 'Cycling',
    duration: 45,
    caloriesBurned: 400,
    tags: ['cardio'],
    source: 'Manual'
  }
];

// Mock Nutrition Entries
export const mockNutritionEntries: NutritionEntry[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    meal: 'Breakfast',
    calories: 400,
    protein: 20,
    carbs: 45,
    fat: 15,
    mealType: 'balanced',
    source: 'Manual'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    meal: 'Lunch',
    calories: 600,
    protein: 30,
    carbs: 65,
    fat: 20,
    mealType: 'high-protein',
    source: 'Fitbit'
  }
];

// Mock Sleep Entries
export const mockSleepEntries: SleepEntry[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    duration: 7.5,
    quality: 8,
    deepSleep: 2.5,
    source: 'Fitbit'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    duration: 8,
    quality: 9,
    deepSleep: 3,
    source: 'Manual'
  }
];

// Mock Mood Entries
export const mockMoodEntries: MoodEntry[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    mood: 'Happy',
    energy: 8,
    stress: 3
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    mood: 'Calm',
    energy: 6,
    stress: 2
  }
];

// Mock Health Insights
export const mockHealthInsights: HealthInsight[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    title: 'Improved Sleep Quality',
    description: 'Your sleep quality improved by 15%',
    type: 'sleep',
    priority: 'medium'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    title: 'Exercise Goal Achieved',
    description: 'You met your weekly exercise goal',
    type: 'fitness',
    priority: 'low'
  },
  {
    id: '3',
    date: '2025-06-01T00:00:00.000Z',
    title: 'Low Vitamin D Risk',
    description: 'Your data suggests a potential Vitamin D deficiency',
    type: 'nutrition',
    priority: 'high'
  }
];

// Mock Video Summaries
export const mockVideoSummaries: VideoSummary[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    title: 'January Health Overview',
    duration: '03:00',
    thumbnailUrl: 'https://example.com/thumbnail1.jpg'
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    title: 'Weekly Progress Update',
    duration: '02:00',
    thumbnailUrl: 'https://example.com/thumbnail2.jpg'
  }
];

// Mock Body Composition Data
export const mockBodyCompositionEntries: BodyComposition[] = [
  {
    id: '1',
    date: '2025-06-01T00:00:00.000Z',
    bodyFat: 20,
    muscleMass: 45,
    boneMass: 8,
    waterWeight: 42
  },
  {
    id: '2',
    date: '2025-06-01T00:00:00.000Z',
    bodyFat: 19.5,
    muscleMass: 45.5,
    boneMass: 8,
    waterWeight: 42.5
  }
];

// Mock Body Composition Goals
export const mockBodyCompositionGoals: BodyCompositionGoal[] = [
  {
    id: '1',
    targetDate: '2025-06-01T00:00:00.000Z',
    bodyFatTarget: 18,
    muscleMassTarget: 47,
    notes: 'Focus on strength training'
  },
  {
    id: '2',
    targetDate: '2025-12-01T00:00:00.000Z',
    bodyFatTarget: 15,
    muscleMassTarget: 50,
    notes: 'Maintain lean muscle mass'
  }
];

// Mock User Profile
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
  height: 175,
  targetWeight: 68,
  subscriptionPlan: 'premium',
  preferences: {
    units: 'metric',
    language: 'en',
    notifications: true
  }
};

// Mock Goals Data
export const mockGoals = {
  weight: { target: 68, current: 68.9, unit: 'kg' },
  steps: { target: 10000, current: 8500 },
  calories: { target: 2000, current: 1850 },
  sleep: { target: 8, current: 7.5 },
  water: { target: 2.5, current: 2.1, unit: 'L' }
};

// Mock Statistics
export const mockStats = {
  totalWorkouts: 42,
  totalCaloriesBurned: 15680,
  averageSleep: 7.6,
  streakDays: 12,
  weightLost: 2.8
};