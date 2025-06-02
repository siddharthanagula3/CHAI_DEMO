import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
  onClick
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/30',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/30',
    accent: 'bg-accent-50 dark:bg-accent-900/30',
    success: 'bg-success-50 dark:bg-success-900/30'
  };

  const iconColorClasses = {
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    accent: 'text-accent-600 dark:text-accent-400',
    success: 'text-success-600 dark:text-success-400'
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`rounded-lg p-6 shadow-lg transition-colors ${colorClasses[color]}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : 'article'}
      aria-label={`${title}: ${value}${trendValue ? `, ${trendValue} change` : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
          <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} aria-hidden="true" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-success-600 dark:text-success-400' :
            trend === 'down' ? 'text-error-600 dark:text-error-400' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>
      </div>
    </motion.article>
  );
};

export default MetricCard;