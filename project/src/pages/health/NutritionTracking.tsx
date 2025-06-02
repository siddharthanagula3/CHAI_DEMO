import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Apple, Plus, Edit, Trash2, ChevronRight, ChevronLeft, Filter, ArrowUpDown } from 'lucide-react';
import { 
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { format, parseISO } from 'date-fns';
import { FoodItem } from '../../types';

interface AddMealModalProps {
  onClose: () => void;
  onSave: (mealType: string, foodItems: FoodItem[], notes?: string) => void;
  initialData?: {
    mealType: string;
    foodItems: FoodItem[];
    notes?: string;
  };
  isEdit?: boolean;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  isEdit = false 
}) => {
  const { t } = useTranslation();
  const [mealType, setMealType] = useState(initialData?.mealType || 'breakfast');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialData?.foodItems || []);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [newFoodItem, setNewFoodItem] = useState<Partial<FoodItem>>({
    name: '',
    servingSize: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  const handleAddFoodItem = () => {
    if (newFoodItem.name && newFoodItem.servingSize) {
      setFoodItems([...foodItems, {
        id: `food-${Date.now()}`,
        name: newFoodItem.name,
        servingSize: newFoodItem.servingSize,
        calories: newFoodItem.calories || 0,
        protein: newFoodItem.protein || 0,
        carbs: newFoodItem.carbs || 0,
        fat: newFoodItem.fat || 0
      }]);
      setNewFoodItem({
        name: '',
        servingSize: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    }
  };
  
  const handleRemoveFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodItems.length > 0) {
      onSave(mealType, foodItems, notes);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {isEdit ? t('tracking.editMeal') : t('tracking.logMeal')}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Food Items
            </h3>
            
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Food Name
                </label>
                <input
                  type="text"
                  value={newFoodItem.name}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Serving Size
                </label>
                <input
                  type="text"
                  value={newFoodItem.servingSize}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, servingSize: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Calories
                </label>
                <input
                  type="number"
                  value={newFoodItem.calories}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, calories: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={newFoodItem.protein}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, protein: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={newFoodItem.carbs}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, carbs: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={newFoodItem.fat}
                  onChange={(e) => setNewFoodItem({ ...newFoodItem, fat: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddFoodItem}
              leftIcon={<Plus size={16} />}
            >
              Add Food Item
            </Button>
            
            {foodItems.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Food
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Serving
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Calories
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Protein
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Carbs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Fat
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {foodItems.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.servingSize}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.calories}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.protein}g
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.carbs}g
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {item.fat}g
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button
                            onClick={() => handleRemoveFoodItem(item.id)}
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
            )}
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
              disabled={foodItems.length === 0}
            >
              {t('common.save')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const NutritionTracking: React.FC = () => {
  const { t } = useTranslation();
  const { nutritionEntries, addNutritionEntry, deleteNutritionEntry } = useHealthData();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | 'all'>('1w');
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('all');
  
  // Calculate nutrition totals for today
  const todayEntries = nutritionEntries.filter(entry => 
    new Date(entry.date).toDateString() === new Date().toDateString()
  );
  
  const todayTotals = todayEntries.reduce((acc, entry) => ({
    calories: acc.calories + entry.calories,
    protein: acc.protein + entry.protein,
    carbs: acc.carbs + entry.carbs,
    fat: acc.fat + entry.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
  // Calculate macronutrient percentages
  const totalMacros = todayTotals.protein + todayTotals.carbs + todayTotals.fat;
  const macroPercentages = [
    { name: 'Protein', value: Math.round((todayTotals.protein / totalMacros) * 100) || 0 },
    { name: 'Carbs', value: Math.round((todayTotals.carbs / totalMacros) * 100) || 0 },
    { name: 'Fat', value: Math.round((todayTotals.fat / totalMacros) * 100) || 0 }
  ];
  
  // Get filtered entries based on time range and meal type
  const getFilteredEntries = () => {
    let filtered = [...nutritionEntries];
    
    // Apply time range filter
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
    
    // Apply meal type filter
    if (mealTypeFilter !== 'all') {
      filtered = filtered.filter(entry => entry.mealType === mealTypeFilter);
    }
    
    return filtered;
  };
  
  const filteredEntries = getFilteredEntries();
  
  // Handle adding new nutrition entry
  const handleAddMeal = (mealType: string, foodItems: FoodItem[], notes?: string) => {
    const totals = foodItems.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    addNutritionEntry({
      date: new Date().toISOString().split('T')[0],
      mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      foodItems,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat,
      notes
    });
  };
  
  // Handle editing nutrition entry
  const handleEditMeal = (mealType: string, foodItems: FoodItem[], notes?: string) => {
    if (!currentEntry) return;
    
    const totals = foodItems.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    deleteNutritionEntry(currentEntry.id);
    addNutritionEntry({
      date: currentEntry.date,
      mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      foodItems,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat,
      notes
    });
  };
  
  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this meal entry?')) {
      deleteNutritionEntry(id);
    }
  };
  
  // Colors for charts
  const COLORS = ['#3B82F6', '#14B8A6', '#F97316'];
  
  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('tracking.nutrition')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your meals and monitor your nutrition intake
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          {t('tracking.logMeal')}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
              <Apple className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Calories</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {todayTotals.calories} kcal
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-secondary-600 dark:text-secondary-400">
                P
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Protein</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {todayTotals.protein}g
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-accent-600 dark:text-accent-400">
                C
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Carbs</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {todayTotals.carbs}g
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <div className="flex h-6 w-6 items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                F
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fat</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {todayTotals.fat}g
              </h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Macronutrient Distribution Chart */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Macronutrient Distribution
          </h2>
        </div>
        
        <div className="h-64">
          {totalMacros > 0 ? (
            <ResponsiveContainer width="100%\" height="100%">
              <PieChart>
                <Pie
                  data={macroPercentages}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroPercentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Apple className="mb-2 h-12 w-12 text-gray-300" />
              <p className="text-center text-gray-500">
                No nutrition data available for today. Start logging your meals to see the distribution.
              </p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Meal History */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Meal History
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <Filter className="ml-3 h-5 w-5 text-gray-400" />
              <select
                value={mealTypeFilter}
                onChange={(e) => setMealTypeFilter(e.target.value)}
                className="w-full border-0 bg-transparent p-2 text-gray-700 focus:outline-none dark:text-gray-300"
              >
                <option value="all">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            
            <div className="flex items-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <ArrowUpDown className="ml-3 h-5 w-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="w-full border-0 bg-transparent p-2 text-gray-700 focus:outline-none dark:text-gray-300"
              >
                <option value="1w">Last Week</option>
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
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
                    Meal Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Protein
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Carbs
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Fat
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
                      {entry.mealType.charAt(0).toUpperCase() + entry.mealType.slice(1)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.calories} kcal
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.protein}g
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.carbs}g
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.fat}g
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
            <Apple className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No meal entries</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Start tracking your meals to see your nutrition data here.
            </p>
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddModal(true)}
            >
              {t('tracking.logMeal')}
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Meal Modal */}
      {showAddModal && (
        <AddMealModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMeal}
        />
      )}
      
      {/* Edit Meal Modal */}
      {showEditModal && currentEntry && (
        <AddMealModal
          onClose={() => {
            setShowEditModal(false);
            setCurrentEntry(null);
          }}
          onSave={handleEditMeal}
          initialData={{
            mealType: currentEntry.mealType,
            foodItems: currentEntry.foodItems,
            notes: currentEntry.notes
          }}
          isEdit
        />
      )}
    </div>
  );
};

export default NutritionTracking;