import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Moon, Plus, Edit, Trash2, ChevronRight, ChevronLeft, Filter, ArrowUpDown } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, parseISO } from 'date-fns';

interface AddSleepModalProps {
  onClose: () => void;
  onSave: (duration: number, quality: number, bedTime: string, wakeTime: string, notes?: string) => void;
  initialData?: {
    duration: number;
    quality: number;
    bedTime: string;
    wakeTime: string;
    notes?: string;
  };
  isEdit?: boolean;
}

const AddSleepModal: React.FC<AddSleepModalProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  isEdit = false 
}) => {
  const { t } = useTranslation();
  const [bedTime, setBedTime] = useState(initialData?.bedTime || '22:00');
  const [wakeTime, setWakeTime] = useState(initialData?.wakeTime || '06:00');
  const [quality, setQuality] = useState(initialData?.quality || 7);
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  const calculateDuration = (bed: string, wake: string): number => {
    const [bedHours, bedMinutes] = bed.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wake.split(':').map(Number);
    
    let duration = wakeHours - bedHours;
    if (duration < 0) duration += 24;
    
    duration += (wakeMinutes - bedMinutes) / 60;
    return Number(duration.toFixed(1));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = calculateDuration(bedTime, wakeTime);
    onSave(duration, quality, bedTime, wakeTime, notes);
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
          {isEdit ? t('tracking.editSleep') : t('tracking.logSleep')}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bed Time
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Wake Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sleep Quality (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Poor (1)</span>
              <span>Excellent (10)</span>
            </div>
            <div className="mt-1 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected: {quality}
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

const SleepTracking: React.FC = () => {
  const { t } = useTranslation();
  const { sleepEntries, addSleepEntry, deleteSleepEntry } = useHealthData();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | 'all'>('1w');
  
  // Get filtered entries based on time range
  const getFilteredEntries = () => {
    let filtered = [...sleepEntries];
    
    const now = new Date();
    switch (timeRange) {
      case '1w':
        filtered = filtered.filter(entry => 
          new Date(entry.date) >= new Date(now.setDate(now.getDate() - 7))
        );
        break;
      case '1m':
        filtered = filtered.filter(entry => 
          new Date(entry.date) >= new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case '3m':
        filtered = filtered.filter(entry => 
          new Date(entry.date) >= new Date(now.setMonth(now.getMonth() - 3))
        );
        break;
      // 'all' case doesn't need filtering
    }
    
    return filtered;
  };
  
  const filteredEntries = getFilteredEntries();
  
  // Calculate average sleep metrics
  const calculateAverages = () => {
    if (filteredEntries.length === 0) return { duration: 0, quality: 0 };
    
    const totals = filteredEntries.reduce((acc, entry) => ({
      duration: acc.duration + entry.duration,
      quality: acc.quality + entry.quality
    }), { duration: 0, quality: 0 });
    
    return {
      duration: Number((totals.duration / filteredEntries.length).toFixed(1)),
      quality: Number((totals.quality / filteredEntries.length).toFixed(1))
    };
  };
  
  const averages = calculateAverages();
  
  // Get chart data
  const getChartData = () => {
    return [...filteredEntries]
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .map(entry => ({
        date: format(parseISO(entry.date), 'MMM dd'),
        duration: entry.duration,
        quality: entry.quality
      }));
  };
  
  const chartData = getChartData();
  
  // Handle adding new sleep entry
  const handleAddSleep = (
    duration: number,
    quality: number,
    bedTime: string,
    wakeTime: string,
    notes?: string
  ) => {
    addSleepEntry({
      date: new Date().toISOString().split('T')[0],
      duration,
      quality,
      bedTime,
      wakeTime,
      notes
    });
  };
  
  // Handle editing sleep entry
  const handleEditSleep = (
    duration: number,
    quality: number,
    bedTime: string,
    wakeTime: string,
    notes?: string
  ) => {
    if (!currentEntry) return;
    
    deleteSleepEntry(currentEntry.id);
    addSleepEntry({
      date: currentEntry.date,
      duration,
      quality,
      bedTime,
      wakeTime,
      notes
    });
  };
  
  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sleep entry?')) {
      deleteSleepEntry(id);
    }
  };
  
  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('tracking.sleep')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your sleep duration and quality
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          {t('tracking.logSleep')}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <Moon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Sleep Duration</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {averages.duration}h
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-secondary-600 dark:text-secondary-400">
                Q
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Sleep Quality</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {averages.quality}/10
              </h3>
            </div>
          </div>
        </Card>
        
        {sleepEntries.length > 0 && (
          <>
            <Card className="bg-accent-50 dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
                  <div className="flex h-6 w-6 items-center justify-center font-bold text-accent-600 dark:text-accent-400">
                    B
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Bedtime</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sleepEntries[0].bedTime}
                  </h3>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
                  <div className="flex h-6 w-6 items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    W
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Wake Time</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sleepEntries[0].wakeTime}
                  </h3>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      
      {/* Sleep Charts */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sleep Trends
          </h2>
          
          <div className="flex space-x-2">
            {(['1w', '1m', '3m', 'all'] as const).map((range) => (
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
                  yAxisId="left"
                  domain={[0, 12]}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 10]}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Quality', angle: 90, position: 'insideRight' }}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="duration"
                  name="Sleep Duration"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="quality"
                  name="Sleep Quality"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  dot={{ fill: '#14B8A6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Moon className="mb-2 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                No sleep data available. Start logging your sleep to see trends.
              </p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Sleep History */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sleep History
          </h2>
        </div>
        
        {filteredEntries.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Quality
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Bed Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Wake Time
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
                {filteredEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(parseISO(entry.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.duration}h
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.quality}/10
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.bedTime}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.wakeTime}
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
            <Moon className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No sleep entries</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your sleep to see your patterns and quality over time.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              {t('tracking.logSleep')}
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Sleep Modal */}
      {showAddModal && (
        <AddSleepModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSleep}
        />
      )}
      
      {/* Edit Sleep Modal */}
      {showEditModal && currentEntry && (
        <AddSleepModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditSleep}
          initialData={{
            duration: currentEntry.duration,
            quality: currentEntry.quality,
            bedTime: currentEntry.bedTime,
            wakeTime: currentEntry.wakeTime,
            notes: currentEntry.notes
          }}
          isEdit
        />
      )}
    </div>
  );
};

export default SleepTracking;