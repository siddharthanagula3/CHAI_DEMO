import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  icon,
  title,
  description,
  delay = 0
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start space-x-4 rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
    >
      <div className="rounded-full bg-primary-100 p-3 dark:bg-primary-900">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureHighlight;