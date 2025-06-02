// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
  isPremium: boolean;
  height?: number; // in cm
  weightGoal?: number; // in kg
  dateOfBirth?: string;
  gender?: string;
  profilePicture?: string;
}

// Health Metrics Types
export interface WeightEntry {
  id: string;
  date: string;
  weight: number; // in kg
  bodyFat?: number; // percentage
  notes?: string;
  unit: 'kg' | 'lbs';
  source: 'manual' | 'device' | 'import';
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  savings?: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  isLimitedTime?: boolean;
  featuresEnabled: string[];
}

// Fitness Types
export interface FitnessEntry {
  id: string;
  date: string;
  activityType: string;
  duration: number; // in minutes
  caloriesBurned: number;
  distance?: number; // in km
  heartRate?: number; // avg bpm
  steps?: number;
}

// Nutrition Types
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: number;
  unit: string;
}

export interface NutritionEntry {
  id: string;
  date: string;
  meals: {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    foods: FoodItem[];
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

// Sleep Types
export interface SleepEntry {
  id: string;
  date: string;
  duration: number; // in minutes
  quality: number; // 1-10
  startTime: string;
  endTime: string;
  deepSleep?: number; // in minutes
  lightSleep?: number; // in minutes
  remSleep?: number; // in minutes
}

// Mood Types
export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5
  notes?: string;
  energy: number; // 1-5
  stress: number; // 1-5
  activities: string[];
}

// AI Insights Types
export interface HealthInsight {
  id: string;
  date: string;
  type: 'nutrition' | 'fitness' | 'sleep' | 'mood' | 'general';
  title: string;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface VideoSummary {
  id: string;
  title: string;
  url: string;
  duration: number;
  thumbnail: string;
  summary: string;
  keyPoints: string[];
  tags: string[];
  dateCreated: string;
}

// Body Composition Types
export interface BodyComposition {
  id: string;
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  boneMass: number;
  waterWeight: number;
  visceralFat: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
}

export interface BodyCompositionGoal {
  targetWeight: number;
  targetBodyFat: number;
  targetMuscleMass: number;
  deadline?: string;
  weeklyGoal: number;
}

// Nutrition Breakdown Type
export interface NutritionBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
  date: string;
}