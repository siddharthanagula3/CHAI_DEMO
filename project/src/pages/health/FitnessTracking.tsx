import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Activity, TrendingUp, Plus, Edit, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, subDays, parseISO } from 'date-fns';

interface AddFitnessModalProps {
  onClose: () => void;
  onSave: (activityType: string, duration: number, caloriesBurned: number, intensity: 'low' | 'medium' | 'high', notes?: string) => void;
  initialData?: {
    activityType: string;
    duration: number;
    caloriesBurned: number;
    intensity: 'low' | 'medium' | 'high';
    notes?: string;
  };
  isEdit?: boolean;
}

const AddFitnessModal: React.FC<AddFitnessModalProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  isEdit = false 
}) => {
  const { t } = useTranslation();
  const [activityType, setActivityType] = useState(initialData?.activityType || 'Running');
  const [duration, setDuration] = useState(initialData?.duration || 30);
  const [caloriesBurned, setCaloriesBurned] = useState(initialData?.caloriesBurned || 300);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>(initialData?.intensity || 'medium');
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  const activityTypes = [
    'Running',
    'Walking',
    'Cycling',
    'Swimming',
    'Strength Training',
    'Yoga',
    'HIIT',
    'Other'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(activityType, duration, caloriesBurned, intensity, notes);
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
          {isEdit ? t('tracking.editActivity') : t('tracking.logActivity')}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Activity Type
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
              min="1"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Calories Burned
            </label>
            <input
              type="number"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
              min="0"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Intensity
            </label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value as 'low' | 'medium' | 'high')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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

const FitnessTracking: React.FC = () => {
  const { t } = useTranslation();
  const { fitnessEntries, addFitnessEntry, deleteFitnessEntry } = useHealthData();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | '6m'>('1w');
  
  // Get chart data based on time range
  const getChartData = () => {
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case '1m':
        cutoffDate = subDays(now, 30);
        break;
      case '3m':
        cutoffDate = subDays(now, 90);
        break;
      case '6m':
        cutoffDate = subDays(now, 180);
        break;
      default: // 1w
        cutoffDate = subDays(now, 7);
    }
    
    return [...fitnessEntries]
      .filter(entry => parseISO(entry.date) >= cutoffDate)
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .map(entry => ({
        date: format(parseISO(entry.date), 'MMM dd'),
        duration: entry.duration,
        calories: entry.caloriesBurned
      }));
  };
  
  const chartData = getChartData();
  
  // Handle adding new fitness entry
  const handleAddFitness = (
    activityType: string,
    duration: number,
    caloriesBurned: number,
    intensity: 'low' | 'medium' | 'high',
    notes?: string
  ) => {
    addFitnessEntry({
      date: new Date().toISOString().split('T')[0],
      activityType,
      duration,
      caloriesBurned,
      intensity,
      notes
    });
  };
  
  // Handle editing fitness entry
  const handleEditFitness = (
    activityType: string,
    duration: number,
    caloriesBurned: number,
    intensity: 'low' | 'medium' | 'high',
    notes?: string
  ) => {
    if (!currentEntry) return;
    
    // Delete the old entry and add the updated one
    deleteFitnessEntry(currentEntry.id);
    addFitnessEntry({
      date: currentEntry.date,
      activityType,
      duration,
      caloriesBurned,
      intensity,
      notes
    });
  };
  
  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteFitnessEntry(id);
    }
  };

  // Get activity stats
  const getActivityStats = () => {
    if (fitnessEntries.length === 0) return null;
    
    const totalDuration = fitnessEntries.reduce((sum, entry) => sum + entry.duration, 0);
    const totalCalories = fitnessEntries.reduce((sum, entry) => sum + entry.caloriesBurned, 0);
    const avgDuration = Math.round(totalDuration / fitnessEntries.length);
    
    return {
      totalDuration,
      totalCalories,
      avgDuration,
      totalActivities: fitnessEntries.length
    };
  };
  
  const stats = getActivityStats();
  
  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('tracking.fitness')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track and monitor your fitness activities
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          {t('tracking.logActivity')}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <Activity className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Activities</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? stats.totalActivities : '0'}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <TrendingUp className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Duration</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? `${stats.totalDuration} min` : '0 min'}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
              <Activity className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Duration</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? `${stats.avgDuration} min` : '0 min'}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-success-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-success-100 p-3 dark:bg-success-900">
              <Activity className="h-6 w-6 text-success-600 dark:text-success-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Calories</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats ? `${stats.totalCalories} kcal` : '0 kcal'}
              </h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Activity Charts */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Duration Trend
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
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Activity className="mb-2 h-12 w-12 text-gray-300" />
                <p className="text-center text-gray-500">
                  No activity data available. Start logging your workouts to see trends.
                </p>
              </div>
            )}
          </div>
        </Card>
        
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Calories Burned
            </h2>
          </div>
          
          <div className="h-72">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%\" height="100%">
                <BarChart
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
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="calories" 
                    fill="#14B8A6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Activity className="mb-2 h-12 w-12 text-gray-300" />
                <p className="text-center text-gray-500">
                  No calorie data available. Start logging your workouts to see trends.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Activity History */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Activity History
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
        
        {fitnessEntries.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Intensity
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
                {fitnessEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(parseISO(entry.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.activityType}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.duration} min
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.caloriesBurned} kcal
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        entry.intensity === 'high' 
                          ? 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
                          : entry.intensity === 'medium'
                            ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200'
                            : 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                      }`}>
                        {entry.intensity}
                      </span>
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
            <Activity className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No activities logged</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your fitness activities to see your progress over time.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              {t('tracking.logActivity')}
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Activity Modal */}
      {showAddModal && (
        <AddFitnessModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddFitness}
        />
      )}
      
      {/* Edit Activity Modal */}
      {showEditModal && currentEntry && (
        <AddFitnessModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditFitness}
          initialData={{
            activityType: currentEntry.activityType,
            duration: currentEntry.duration,
            caloriesBurned: currentEntry.caloriesBurned,
            intensity: currentEntry.intensity,
            notes: currentEntry.notes
          }}
          isEdit
        />
      )}
    </div>
  );
};

export default FitnessTracking;