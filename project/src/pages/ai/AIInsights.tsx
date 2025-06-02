import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Filter, ArrowUpDown, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';

const AIInsights: React.FC = () => {
  const { t } = useTranslation();
  const { healthInsights } = useHealthData();
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'priority'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter and sort insights
  const filteredInsights = healthInsights
    .filter(insight => {
      // Apply type filter
      if (filterType !== 'all' && insight.type !== filterType) {
        return false;
      }
      
      // Apply search filter (case insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          insight.title.toLowerCase().includes(query) ||
          insight.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        // Sort by priority (high, medium, low)
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

  // Get priority class for the insight card
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-error-500';
      case 'medium':
        return 'border-l-warning-500';
      case 'low':
        return 'border-l-success-500';
      default:
        return '';
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('ai.insights')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          AI-powered analysis and recommendations based on your health data
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <Filter className="ml-3 h-5 w-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full border-0 bg-transparent p-2 text-gray-700 focus:outline-none dark:text-gray-300"
          >
            <option value="all">All Types</option>
            <option value="weight">Weight</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            <option value="sleep">Sleep</option>
            <option value="general">General</option>
          </select>
        </div>
        
        <div className="flex items-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <ArrowUpDown className="ml-3 h-5 w-5 text-gray-400" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'priority')}
            className="w-full border-0 bg-transparent p-2 text-gray-700 focus:outline-none dark:text-gray-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        
        <div className="flex items-center rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-0 bg-transparent p-2 text-gray-700 focus:outline-none dark:text-gray-300"
          />
        </div>
      </div>
      
      {/* Insights Grid */}
      {filteredInsights.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                title={insight.title}
                subtitle={new Date(insight.date).toLocaleDateString()}
                icon={<Lightbulb className="h-5 w-5" />}
                className={`border-l-4 ${getPriorityClass(insight.priority)}`}
              >
                <p className="text-gray-600 dark:text-gray-300">
                  {insight.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    insight.type === 'weight' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                    insight.type === 'fitness' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                    insight.type === 'nutrition' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                    insight.type === 'sleep' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                  <Button variant="ghost" size="sm">
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <Lightbulb className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-center text-gray-500 dark:text-gray-400">
            No insights found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;