import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getScoreColor, getTrend } from '../../utils/healthScore';

interface HealthScoreRingProps {
  score: number;
  previousScore: number;
  size?: number;
  strokeWidth?: number;
}

const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  score,
  previousScore,
  size = 200,
  strokeWidth = 12
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const trend = getTrend(score, previousScore);
  const scoreColor = getScoreColor(score);
  
  const TrendIcon = trend === 'up' ? TrendingUp : 
    trend === 'down' ? TrendingDown : Minus;
  
  return (
    <div className="relative\" style={{ width: size, height: size }}>
      {/* Background ring */}
      <svg className="absolute" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
      </svg>
      
      {/* Progress ring */}
      <svg className="absolute -rotate-90" width={size} height={size}>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={scoreColor}
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center">
            <span className={`text-4xl font-bold ${scoreColor}`}>{score}</span>
            <TrendIcon 
              className={`ml-2 h-6 w-6 ${scoreColor}`}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Health Score</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthScoreRing;