import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Activity, Apple, Moon, SmilePlus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import LogEntryModal from '../components/modals/LogEntryModal';
import { useHealthData } from '../contexts/HealthDataContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<'weight' | 'workout' | 'meal' | 'sleep' | 'mood' | null>(null);
  const { weightEntries, fitnessEntries, nutritionEntries, sleepEntries, moodEntries } = useHealthData();

  // Get latest entries
  const latestWeight = weightEntries[0];
  const latestWorkout = fitnessEntries[0];
  const latestMeal = nutritionEntries[0];
  const latestSleep = sleepEntries[0];
  const latestMood = moodEntries[0];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your daily health metrics
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setActiveModal('weight')}
          >
            Add Entry
          </Button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 md:grid-cols-5">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
          onClick={() => setActiveModal('weight')}
        >
          <div className="mb-2 flex items-center justify-between">
            <Scale className="h-6 w-6 text-primary-500" />
            <span className="text-sm text-gray-500">Weight</span>
          </div>
          <p className="text-xl font-semibold">
            {latestWeight ? `${latestWeight.weight} kg` : '--'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
          onClick={() => setActiveModal('workout')}
        >
          <div className="mb-2 flex items-center justify-between">
            <Activity className="h-6 w-6 text-secondary-500" />
            <span className="text-sm text-gray-500">Workout</span>
          </div>
          <p className="text-xl font-semibold">
            {latestWorkout ? `${latestWorkout.duration} min` : '--'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
          onClick={() => setActiveModal('meal')}
        >
          <div className="mb-2 flex items-center justify-between">
            <Apple className="h-6 w-6 text-accent-500" />
            <span className="text-sm text-gray-500">Nutrition</span>
          </div>
          <p className="text-xl font-semibold">
            {latestMeal ? `${latestMeal.calories} kcal` : '--'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
          onClick={() => setActiveModal('sleep')}
        >
          <div className="mb-2 flex items-center justify-between">
            <Moon className="h-6 w-6 text-success-500" />
            <span className="text-sm text-gray-500">Sleep</span>
          </div>
          <p className="text-xl font-semibold">
            {latestSleep ? `${latestSleep.duration}h` : '--'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
          onClick={() => setActiveModal('mood')}
        >
          <div className="mb-2 flex items-center justify-between">
            <SmilePlus className="h-6 w-6 text-warning-500" />
            <span className="text-sm text-gray-500">Mood</span>
          </div>
          <p className="text-xl font-semibold">
            {latestMood ? latestMood.mood : '--'}
          </p>
        </motion.div>
      </div>

      {/* Log Entry Modal */}
      {activeModal && (
        <LogEntryModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;