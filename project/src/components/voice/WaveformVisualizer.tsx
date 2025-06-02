import React from 'react';
import { motion } from 'framer-motion';

interface WaveformVisualizerProps {
  className?: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ className = '' }) => {
  const numBars = 32;
  const bars = Array.from({ length: numBars });

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex h-full items-center space-x-0.5">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: ['20%', '90%', '20%'],
              backgroundColor: ['#60A5FA', '#3B82F6', '#60A5FA']
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut'
            }}
            className="h-1 w-0.5 bg-primary-400"
          />
        ))}
      </div>
    </div>
  );
};

export default WaveformVisualizer;