import { WeightEntry, FitnessEntry, NutritionEntry, SleepEntry, MoodEntry } from '../types';

// Health score weights (total = 100)
const WEIGHTS = {
  SLEEP: 25,
  NUTRITION: 25,
  ACTIVITY: 20,
  MOOD: 15,
  GOAL_PROGRESS: 15
};

// Calculate sleep score (0-10)
export const calculateSleepScore = (entries: SleepEntry[]): number => {
  if (!entries.length) return 0;
  const latestEntry = entries[0];
  
  // Score based on duration (ideal: 7-9 hours)
  const durationScore = Math.min(10, (latestEntry.duration >= 7 && latestEntry.duration <= 9) ? 10 : 
    (latestEntry.duration >= 6 && latestEntry.duration <= 10) ? 7 : 4);
  
  // Quality score (already 1-10)
  const qualityScore = latestEntry.quality;
  
  return (durationScore + qualityScore) / 2;
};

// Calculate nutrition score (0-10)
export const calculateNutritionScore = (entries: NutritionEntry[]): number => {
  if (!entries.length) return 0;
  const latestEntry = entries[0];
  
  // Score based on macronutrient balance
  const proteinScore = Math.min(10, (latestEntry.protein / latestEntry.calories) * 400);
  const carbScore = Math.min(10, (latestEntry.carbs / latestEntry.calories) * 400);
  const fatScore = Math.min(10, (latestEntry.fat / latestEntry.calories) * 225);
  
  return (proteinScore + carbScore + fatScore) / 3;
};

// Calculate activity score (0-10)
export const calculateActivityScore = (entries: FitnessEntry[]): number => {
  if (!entries.length) return 0;
  const latestEntry = entries[0];
  
  // Score based on duration and intensity
  const durationScore = Math.min(10, (latestEntry.duration / 60) * 10);
  const intensityMultiplier = latestEntry.intensity === 'high' ? 1.2 : 
    latestEntry.intensity === 'medium' ? 1 : 0.8;
  
  return Math.min(10, durationScore * intensityMultiplier);
};

// Calculate mood score (0-10)
export const calculateMoodScore = (entries: MoodEntry[]): number => {
  if (!entries.length) return 0;
  const latestEntry = entries[0];
  
  // Convert mood to score
  const moodScore = latestEntry.mood === 'excellent' ? 10 :
    latestEntry.mood === 'good' ? 8 :
    latestEntry.mood === 'neutral' ? 6 :
    latestEntry.mood === 'bad' ? 4 : 2;
  
  // Energy level is already 1-10
  const energyScore = latestEntry.energyLevel;
  
  // Stress level inverse (1-10 → 10-1)
  const stressScore = 11 - latestEntry.stressLevel;
  
  return (moodScore + energyScore + stressScore) / 3;
};

// Calculate goal progress score (0-10)
export const calculateGoalProgress = (entries: WeightEntry[], targetWeight: number): number => {
  if (!entries.length) return 0;
  const latestWeight = entries[0].weight;
  const initialWeight = entries[entries.length - 1].weight;
  
  // Calculate progress towards goal
  const totalChange = Math.abs(targetWeight - initialWeight);
  const currentChange = Math.abs(targetWeight - latestWeight);
  const progress = (totalChange - currentChange) / totalChange;
  
  return Math.min(10, progress * 10);
};

// Calculate overall health score (0-100)
export const calculateHealthScore = (
  sleepEntries: SleepEntry[],
  nutritionEntries: NutritionEntry[],
  fitnessEntries: FitnessEntry[],
  moodEntries: MoodEntry[],
  weightEntries: WeightEntry[],
  targetWeight: number
): number => {
  const sleepScore = calculateSleepScore(sleepEntries) * (WEIGHTS.SLEEP / 10);
  const nutritionScore = calculateNutritionScore(nutritionEntries) * (WEIGHTS.NUTRITION / 10);
  const activityScore = calculateActivityScore(fitnessEntries) * (WEIGHTS.ACTIVITY / 10);
  const moodScore = calculateMoodScore(moodEntries) * (WEIGHTS.MOOD / 10);
  const goalScore = calculateGoalProgress(weightEntries, targetWeight) * (WEIGHTS.GOAL_PROGRESS / 10);
  
  return Math.round(sleepScore + nutritionScore + activityScore + moodScore + goalScore);
};

// Get score color based on value
export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-success-500 dark:text-success-400';
  if (score >= 60) return 'text-warning-500 dark:text-warning-400';
  return 'text-error-500 dark:text-error-400';
};

// Get trend indicator
export const getTrend = (currentScore: number, previousScore: number): 'up' | 'down' | 'stable' => {
  const diff = currentScore - previousScore;
  if (Math.abs(diff) < 2) return 'stable';
  return diff > 0 ? 'up' : 'down';
};