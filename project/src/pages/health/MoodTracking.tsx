import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SmilePlus, Plus, Edit, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, parseISO } from 'date-fns';

interface AddMoodModalProps {
  onClose: () => void;
  onSave: (mood: string, energyLevel: number, stressLevel: number, notes?: string) => void;
  initialData?: {
    mood: string;
    energyLevel: number;
    stressLevel: number;
    notes?: string;
  };
  isEdit?: boolean;
}

const AddMoodModal: React.FC<AddMoodModalProps> = ({
  onClose,
  onSave,
  initialData,
  isEdit = false
}) => {
  const { t } = useTranslation();
  const [mood, setMood] = useState(initialData?.mood || 'neutral');
  const [energyLevel, setEnergyLevel] = useState(initialData?.energyLevel || 5);
  const [stressLevel, setStressLevel] = useState(initialData?.stressLevel || 5);
  const [notes, setNotes] = useState(initialData?.notes || '');

  const moodOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'bad', label: 'Bad' },
    { value: 'terrible', label: 'Terrible' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(mood, energyLevel, stressLevel, notes || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {isEdit ? t('tracking.editMood') : t('tracking.logMood')}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {moodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Energy Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
              {energyLevel}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stress Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
              {stressLevel}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('common.save')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const MoodTracking: React.FC = () => {
  const { t } = useTranslation();
  const { moodEntries, addMoodEntry, deleteMoodEntry } = useHealthData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | '6m'>('1w');

  // Get chart data based on time range
  const getChartData = () => {
    return moodEntries
      .slice(0, timeRange === '1w' ? 7 : timeRange === '1m' ? 30 : timeRange === '3m' ? 90 : 180)
      .map(entry => ({
        date: format(parseISO(entry.date), 'MMM dd'),
        energy: entry.energyLevel,
        stress: entry.stressLevel,
        mood: entry.mood === 'excellent' ? 5 : entry.mood === 'good' ? 4 : entry.mood === 'neutral' ? 3 : entry.mood === 'bad' ? 2 : 1
      }))
      .reverse();
  };

  const chartData = getChartData();

  // Handle adding new mood entry
  const handleAddMood = (mood: string, energyLevel: number, stressLevel: number, notes?: string) => {
    addMoodEntry({
      date: new Date().toISOString().split('T')[0],
      mood: mood as any,
      energyLevel,
      stressLevel,
      notes
    });
  };

  // Handle editing mood entry
  const handleEditMood = (mood: string, energyLevel: number, stressLevel: number, notes?: string) => {
    if (!currentEntry) return;

    deleteMoodEntry(currentEntry.id);
    addMoodEntry({
      date: currentEntry.date,
      mood: mood as any,
      energyLevel,
      stressLevel,
      notes
    });
  };

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this mood entry?')) {
      deleteMoodEntry(id);
    }
  };

  // Get mood emoji
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '😄';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'bad': return '😕';
      case 'terrible': return '😢';
      default: return '😐';
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('tracking.mood')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your mood, energy levels, and stress to understand your emotional well-being
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          {t('tracking.logMood')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <SmilePlus className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Mood</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {moodEntries.length > 0 ? (
                  <span>
                    {getMoodEmoji(moodEntries[0].mood)} {moodEntries[0].mood.charAt(0).toUpperCase() + moodEntries[0].mood.slice(1)}
                  </span>
                ) : (
                  'No data'
                )}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-secondary-600 dark:text-secondary-400">
                ⚡
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Energy Level</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {moodEntries.length > 0 ? `${moodEntries[0].energyLevel}/10` : 'No data'}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="bg-accent-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-accent-600 dark:text-accent-400">
                📊
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stress Level</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {moodEntries.length > 0 ? `${moodEntries[0].stressLevel}/10` : 'No data'}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Mood Chart */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mood & Energy Trends
          </h2>

          <div className="flex space-x-2">
            {(['1w', '1m', '3m', '6m'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1 text-sm ${
                  timeRange === range
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%\" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energy"
                  name="Energy"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  name="Stress"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  dot={{ fill: '#14B8A6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <SmilePlus className="mb-2 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                No mood data available. Start logging your mood to see trends.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Mood History */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mood History
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ChevronLeft size={16} />}
              disabled
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronRight size={16} />}
              disabled
            >
              Next
            </Button>
          </div>
        </div>

        {moodEntries.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Mood
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Energy
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Stress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {moodEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(parseISO(entry.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <span className="mr-2">{getMoodEmoji(entry.mood)}</span>
                      {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.energyLevel}/10
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.stressLevel}/10
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.notes || '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setCurrentEntry(entry);
                          setShowEditModal(true);
                        }}
                        className="mr-3 text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-error-600 hover:text-error-900 dark:text-error-400 dark:hover:text-error-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <SmilePlus className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No mood entries</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your mood to see your emotional well-being over time.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              {t('tracking.logMood')}
            </Button>
          </div>
        )}
      </Card>

      {/* Add Mood Modal */}
      {showAddModal && (
        <AddMoodModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMood}
        />
      )}

      {/* Edit Mood Modal */}
      {showEditModal && currentEntry && (
        <AddMoodModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditMood}
          initialData={{
            mood: currentEntry.mood,
            energyLevel: currentEntry.energyLevel,
            stressLevel: currentEntry.stressLevel,
            notes: currentEntry.notes
          }}
          isEdit
        />
      )}
    </div>
  );
};

export default MoodTracking;