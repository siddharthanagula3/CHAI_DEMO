import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  WeightEntry, 
  FitnessEntry, 
  NutritionEntry, 
  SleepEntry, 
  MoodEntry,
  HealthInsight,
  VideoSummary,
  BodyComposition,
  BodyCompositionGoal
} from '../types';
import { 
  mockWeightEntries,
  mockFitnessEntries,
  mockNutritionEntries,
  mockSleepEntries,
  mockMoodEntries,
  mockHealthInsights,
  mockVideoSummaries,
  mockBodyCompositionEntries,
  mockBodyCompositionGoals
} from '../utils/mockData';

interface HealthDataContextType {
  // Existing data collections
  weightEntries: WeightEntry[];
  fitnessEntries: FitnessEntry[];
  nutritionEntries: NutritionEntry[];
  sleepEntries: SleepEntry[];
  moodEntries: MoodEntry[];
  healthInsights: HealthInsight[];
  videoSummaries: VideoSummary[];
  
  // New body composition data
  bodyCompositionEntries: BodyComposition[];
  bodyCompositionGoals: BodyCompositionGoal[];
  
  // Existing data management functions
  addWeightEntry: (entry: Omit<WeightEntry, 'id'>) => void;
  addFitnessEntry: (entry: Omit<FitnessEntry, 'id'>) => void;
  addNutritionEntry: (entry: Omit<NutritionEntry, 'id'>) => void;
  addSleepEntry: (entry: Omit<SleepEntry, 'id'>) => void;
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  
  deleteWeightEntry: (id: string) => void;
  deleteFitnessEntry: (id: string) => void;
  deleteNutritionEntry: (id: string) => void;
  deleteSleepEntry: (id: string) => void;
  deleteMoodEntry: (id: string) => void;
  
  // New body composition functions
  addBodyCompositionEntry: (entry: Omit<BodyComposition, 'id'>) => void;
  deleteBodyCompositionEntry: (id: string) => void;
  addBodyCompositionGoal: (goal: Omit<BodyCompositionGoal, 'id'>) => void;
  deleteBodyCompositionGoal: (id: string) => void;
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

export const HealthDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Existing state
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(mockWeightEntries);
  const [fitnessEntries, setFitnessEntries] = useState<FitnessEntry[]>(mockFitnessEntries);
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>(mockNutritionEntries);
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>(mockSleepEntries);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [healthInsights] = useState<HealthInsight[]>(mockHealthInsights);
  const [videoSummaries] = useState<VideoSummary[]>(mockVideoSummaries);
  
  // New state for body composition
  const [bodyCompositionEntries, setBodyCompositionEntries] = useState<BodyComposition[]>(mockBodyCompositionEntries);
  const [bodyCompositionGoals, setBodyCompositionGoals] = useState<BodyCompositionGoal[]>(mockBodyCompositionGoals);

  // Add entry functions
  const addWeightEntry = (entry: Omit<WeightEntry, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `w${Date.now()}`
    };
    setWeightEntries([newEntry, ...weightEntries]);
  };

  const addFitnessEntry = (entry: Omit<FitnessEntry, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `f${Date.now()}`
    };
    setFitnessEntries([newEntry, ...fitnessEntries]);
  };

  const addNutritionEntry = (entry: Omit<NutritionEntry, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `n${Date.now()}`
    };
    setNutritionEntries([newEntry, ...nutritionEntries]);
  };

  const addSleepEntry = (entry: Omit<SleepEntry, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `s${Date.now()}`
    };
    setSleepEntries([newEntry, ...sleepEntries]);
  };

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `m${Date.now()}`
    };
    setMoodEntries([newEntry, ...moodEntries]);
  };

  // Delete entry functions
  const deleteWeightEntry = (id: string): void => {
    setWeightEntries(weightEntries.filter(entry => entry.id !== id));
  };

  const deleteFitnessEntry = (id: string): void => {
    setFitnessEntries(fitnessEntries.filter(entry => entry.id !== id));
  };

  const deleteNutritionEntry = (id: string): void => {
    setNutritionEntries(nutritionEntries.filter(entry => entry.id !== id));
  };

  const deleteSleepEntry = (id: string): void => {
    setSleepEntries(sleepEntries.filter(entry => entry.id !== id));
  };

  const deleteMoodEntry = (id: string): void => {
    setMoodEntries(moodEntries.filter(entry => entry.id !== id));
  };

  // New body composition functions
  const addBodyCompositionEntry = (entry: Omit<BodyComposition, 'id'>): void => {
    const newEntry = {
      ...entry,
      id: `bc${Date.now()}`
    };
    setBodyCompositionEntries([newEntry, ...bodyCompositionEntries]);
  };

  const deleteBodyCompositionEntry = (id: string): void => {
    setBodyCompositionEntries(bodyCompositionEntries.filter(entry => entry.id !== id));
  };

  const addBodyCompositionGoal = (goal: Omit<BodyCompositionGoal, 'id'>): void => {
    const newGoal = {
      ...goal,
      id: `bcg${Date.now()}`
    };
    setBodyCompositionGoals([newGoal, ...bodyCompositionGoals]);
  };

  const deleteBodyCompositionGoal = (id: string): void => {
    setBodyCompositionGoals(bodyCompositionGoals.filter(goal => goal.id !== id));
  };

  return (
    <HealthDataContext.Provider value={{
      // Existing data
      weightEntries,
      fitnessEntries,
      nutritionEntries,
      sleepEntries,
      moodEntries,
      healthInsights,
      videoSummaries,
      
      // New body composition data
      bodyCompositionEntries,
      bodyCompositionGoals,
      
      // Existing functions
      addWeightEntry,
      addFitnessEntry,
      addNutritionEntry,
      addSleepEntry,
      addMoodEntry,
      
      deleteWeightEntry,
      deleteFitnessEntry,
      deleteNutritionEntry,
      deleteSleepEntry,
      deleteMoodEntry,
      
      // New body composition functions
      addBodyCompositionEntry,
      deleteBodyCompositionEntry,
      addBodyCompositionGoal,
      deleteBodyCompositionGoal,
    }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = (): HealthDataContextType => {
  const context = useContext(HealthDataContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};