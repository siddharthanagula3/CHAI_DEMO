import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Scale, TrendingDown, Plus, Edit, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, subDays, parseISO } from 'date-fns';

interface AddWeightModalProps {
  onClose: () => void;
  onSave: (weight: number, bodyFat?: number, notes?: string) => void;
  initialData?: {
    weight: number;
    bodyFat?: number;
    notes?: string;
  };
  isEdit?: boolean;
}

const AddWeightModal: React.FC<AddWeightModalProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  isEdit = false 
}) => {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(initialData?.weight || 70);
  const [bodyFat, setBodyFat] = useState(initialData?.bodyFat || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      weight, 
      bodyFat ? parseFloat(bodyFat.toString()) : undefined, 
      notes || undefined
    );
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
          {isEdit ? t('tracking.editWeight') : t('tracking.logWeight')}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Body Fat % (optional)
            </label>
            <input
              type="number"
              step="0.1"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
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

const WeightTracking: React.FC = () => {
  const { t } = useTranslation();
  const { weightEntries, addWeightEntry, deleteWeightEntry } = useHealthData();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('1m');
  
  // Get chart data based on time range
  const getChartData = () => {
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case '3m':
        cutoffDate = subDays(now, 90);
        break;
      case '6m':
        cutoffDate = subDays(now, 180);
        break;
      case '1y':
        cutoffDate = subDays(now, 365);
        break;
      default: // 1m
        cutoffDate = subDays(now, 30);
    }
    
    return [...weightEntries]
      .filter(entry => parseISO(entry.date) >= cutoffDate)
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .map(entry => ({
        date: format(parseISO(entry.date), 'MMM dd'),
        weight: entry.weight,
        bodyFat: entry.bodyFat
      }));
  };
  
  const chartData = getChartData();
  
  // Handle adding new weight entry
  const handleAddWeight = (weight: number, bodyFat?: number, notes?: string) => {
    addWeightEntry({
      date: new Date().toISOString().split('T')[0],
      weight,
      bodyFat,
      notes
    });
  };
  
  // Handle editing weight entry
  const handleEditWeight = (weight: number, bodyFat?: number, notes?: string) => {
    if (!currentEntry) return;
    
    // Delete the old entry and add the updated one
    deleteWeightEntry(currentEntry.id);
    addWeightEntry({
      date: currentEntry.date,
      weight,
      bodyFat,
      notes
    });
  };
  
  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this weight entry?')) {
      deleteWeightEntry(id);
    }
  };

  // Get trend data
  const getTrendData = () => {
    if (weightEntries.length < 2) return null;
    
    const latest = weightEntries[0].weight;
    const previous = weightEntries[1].weight;
    const diff = latest - previous;
    const diffPercentage = (diff / previous) * 100;
    
    return {
      diff: diff.toFixed(1),
      percentage: diffPercentage.toFixed(1),
      isLoss: diff < 0
    };
  };
  
  const trend = getTrendData();
  
  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('tracking.weight')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track and monitor your weight progress over time
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          {t('tracking.logWeight')}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <Scale className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Weight</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {weightEntries.length > 0 ? `${weightEntries[0].weight} kg` : 'No data'}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <TrendingDown className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Change</p>
              {trend ? (
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span className={trend.isLoss ? 'text-success-600' : 'text-error-600'}>
                    {trend.isLoss ? '-' : '+'}{Math.abs(parseFloat(trend.diff))} kg
                  </span>
                </h3>
              ) : (
                <h3 className="text-lg text-gray-500 dark:text-gray-400">Insufficient data</h3>
              )}
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                %
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Body Fat</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {weightEntries.length > 0 && weightEntries[0].bodyFat 
                  ? `${weightEntries[0].bodyFat}%` 
                  : 'No data'}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-accent-600 dark:text-accent-400">
                BMI
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">BMI</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {weightEntries.length > 0 ? 
                  (weightEntries[0].weight / Math.pow(1.75, 2)).toFixed(1) : 
                  'No data'}
              </h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Weight Chart */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weight Trend
          </h2>
          
          <div className="flex space-x-2">
            {(['1m', '3m', '6m', '1y'] as const).map((range) => (
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
                  domain={['dataMin - 2', 'dataMax + 2']}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                {chartData.some(d => d.bodyFat) && (
                  <Line
                    type="monotone"
                    dataKey="bodyFat"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ fill: '#F97316', strokeWidth: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Scale className="mb-2 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                No weight data available. Start logging your weight to see trends.
              </p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Weight History */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weight History
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
        
        {weightEntries.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Body Fat
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
                {weightEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(parseISO(entry.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.weight} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.bodyFat ? `${entry.bodyFat}%` : '-'}
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
            <Scale className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No weight entries</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your weight to see your progress over time.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              {t('tracking.logWeight')}
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Weight Modal */}
      {showAddModal && (
        <AddWeightModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddWeight}
        />
      )}
      
      {/* Edit Weight Modal */}
      {showEditModal && currentEntry && (
        <AddWeightModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditWeight}
          initialData={{
            weight: currentEntry.weight,
            bodyFat: currentEntry.bodyFat,
            notes: currentEntry.notes
          }}
          isEdit
        />
      )}
    </div>
  );
};

export default WeightTracking;