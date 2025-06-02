import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Scale, Activity, Plus, Edit, Trash2, 
  ChevronRight, ChevronLeft, Download,
  Target, Camera, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, parseISO } from 'date-fns';
import { BodyComposition } from '../../types';

interface AddBodyCompositionModalProps {
  onClose: () => void;
  onSave: (data: Omit<BodyComposition, 'id' | 'date'>) => void;
  initialData?: Omit<BodyComposition, 'id' | 'date'>;
  isEdit?: boolean;
}

const AddBodyCompositionModal: React.FC<AddBodyCompositionModalProps> = ({
  onClose,
  onSave,
  initialData,
  isEdit = false
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialData || {
    intracellularWater: 0,
    extracellularWater: 0,
    dryLeanMass: 0,
    bodyFatMass: 0,
    weight: 0,
    skeletalMuscleMass: 0,
    bmi: 0,
    bodyFatPercentage: 0,
    segmentalLean: {
      rightArm: 0,
      leftArm: 0,
      trunk: 0,
      rightLeg: 0,
      leftLeg: 0
    },
    ecwTbwRatio: 0,
    segmentalFat: {
      rightArm: 0,
      leftArm: 0,
      trunk: 0,
      rightLeg: 0,
      leftLeg: 0
    },
    basalMetabolicRate: 0,
    visceralFatLevel: 0,
    smi: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: parseFloat(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'notes' ? value : parseFloat(value) || 0
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {isEdit ? t('tracking.editBodyComposition') : t('tracking.logBodyComposition')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Measurements */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Body Fat %
              </label>
              <input
                type="number"
                name="bodyFatPercentage"
                value={formData.bodyFatPercentage}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Skeletal Muscle Mass (kg)
              </label>
              <input
                type="number"
                name="skeletalMuscleMass"
                value={formData.skeletalMuscleMass}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Water Composition */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Intracellular Water (L)
              </label>
              <input
                type="number"
                name="intracellularWater"
                value={formData.intracellularWater}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Extracellular Water (L)
              </label>
              <input
                type="number"
                name="extracellularWater"
                value={formData.extracellularWater}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Segmental Lean Analysis */}
          <div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Segmental Lean Analysis (kg)
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Right Arm
                </label>
                <input
                  type="number"
                  name="segmentalLean.rightArm"
                  value={formData.segmentalLean.rightArm}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Left Arm
                </label>
                <input
                  type="number"
                  name="segmentalLean.leftArm"
                  value={formData.segmentalLean.leftArm}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Trunk
                </label>
                <input
                  type="number"
                  name="segmentalLean.trunk"
                  value={formData.segmentalLean.trunk}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Right Leg
                </label>
                <input
                  type="number"
                  name="segmentalLean.rightLeg"
                  value={formData.segmentalLean.rightLeg}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Left Leg
                </label>
                <input
                  type="number"
                  name="segmentalLean.leftLeg"
                  value={formData.segmentalLean.leftLeg}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                BMR (kcal)
              </label>
              <input
                type="number"
                name="basalMetabolicRate"
                value={formData.basalMetabolicRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Visceral Fat Level
              </label>
              <input
                type="number"
                name="visceralFatLevel"
                value={formData.visceralFatLevel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SMI (kg/m²)
              </label>
              <input
                type="number"
                name="smi"
                value={formData.smi}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const BodyCompositionPage: React.FC = () => {
  const { t } = useTranslation();
  const { 
    bodyCompositionEntries, 
    addBodyCompositionEntry, 
    deleteBodyCompositionEntry,
    bodyCompositionGoals
  } = useHealthData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<BodyComposition | null>(null);
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('1m');

  const latestEntry = bodyCompositionEntries[0];
  const latestGoal = bodyCompositionGoals[0];

  // Calculate trends
  const calculateTrend = (current: number, previous: number): string => {
    const diff = ((current - previous) / previous) * 100;
    return diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
  };

  const trends = latestEntry && bodyCompositionEntries[1] ? {
    weight: calculateTrend(latestEntry.weight, bodyCompositionEntries[1].weight),
    muscle: calculateTrend(latestEntry.skeletalMuscleMass, bodyCompositionEntries[1].skeletalMuscleMass),
    fat: calculateTrend(latestEntry.bodyFatPercentage, bodyCompositionEntries[1].bodyFatPercentage)
  } : null;

  // Handle adding new entry
  const handleAddEntry = (data: Omit<BodyComposition, 'id' | 'date'>) => {
    addBodyCompositionEntry({
      ...data,
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Handle editing entry
  const handleEditEntry = (data: Omit<BodyComposition, 'id' | 'date'>) => {
    if (!currentEntry) return;
    
    deleteBodyCompositionEntry(currentEntry.id);
    addBodyCompositionEntry({
      ...data,
      date: currentEntry.date
    });
  };

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteBodyCompositionEntry(id);
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Body Composition
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track and analyze your detailed body composition metrics
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Log Measurement
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <Scale className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {latestEntry ? `${latestEntry.weight} kg` : 'No data'}
              </h3>
              {trends && (
                <p className={`text-sm ${
                  parseFloat(trends.weight) < 0 
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400'
                }`}>
                  {trends.weight}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <Activity className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Muscle Mass</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {latestEntry ? `${latestEntry.skeletalMuscleMass} kg` : 'No data'}
              </h3>
              {trends && (
                <p className={`text-sm ${
                  parseFloat(trends.muscle) > 0 
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400'
                }`}>
                  {trends.muscle}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-accent-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
              <TrendingUp className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Body Fat</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {latestEntry ? `${latestEntry.bodyFatPercentage}%` : 'No data'}
              </h3>
              {trends && (
                <p className={`text-sm ${
                  parseFloat(trends.fat) < 0 
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400'
                }`}>
                  {trends.fat}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-success-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-success-100 p-3 dark:bg-success-900">
              <Target className="h-6 w-6 text-success-600 dark:text-success-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Goal Progress</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {latestEntry && latestGoal ? (
                  `${Math.round((latestEntry.bodyFatPercentage / latestGoal.bodyFatPercentage) * 100)}%`
                ) : 'No goal set'}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Body Composition Trends
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
          {bodyCompositionEntries.length > 0 ? (
            <ResponsiveContainer width="100%\" height="100%">
              <LineChart
                data={bodyCompositionEntries.map(entry => ({
                  date: format(parseISO(entry.date), 'MMM dd'),
                  weight: entry.weight,
                  muscle: entry.skeletalMuscleMass,
                  fat: entry.bodyFatPercentage
                }))}
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
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 40]}
                />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  name="Weight (kg)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="muscle"
                  name="Muscle Mass (kg)"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  dot={{ fill: '#14B8A6', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="fat"
                  name="Body Fat (%)"
                  stroke="#F97316"
                  strokeWidth={2}
                  dot={{ fill: '#F97316', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Scale className="mb-2 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                No body composition data available. Start logging measurements to see trends.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Measurement History */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Measurement History
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
        
        {bodyCompositionEntries.length > 0 ? (
          <div className="overflow-x-auto">
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
                    Muscle Mass
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    BMR
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Visceral Fat
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {bodyCompositionEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {format(parseISO(entry.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.weight} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.bodyFatPercentage}%
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.skeletalMuscleMass} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.basalMetabolicRate} kcal
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.visceralFatLevel}
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
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No measurements</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your body composition to see your progress over time.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              Log First Measurement
            </Button>
          </div>
        )}
      </Card>

      {/* Add Measurement Modal */}
      {showAddModal && (
        <AddBodyCompositionModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEntry}
        />
      )}

      {/* Edit Measurement Modal */}
      {showEditModal && currentEntry && (
        <AddBodyCompositionModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditEntry}
          initialData={currentEntry}
          isEdit
        />
      )}
    </div>
  );
};

export default BodyCompositionPage;