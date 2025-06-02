import React from 'react';
import { motion } from 'framer-motion';

const WaveAnimation: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg 
          viewBox="0 0 1440 320" 
          className="text-white dark:text-gray-900"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default WaveAnimation;