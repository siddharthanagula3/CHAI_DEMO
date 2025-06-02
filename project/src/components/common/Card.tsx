import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  footer?: ReactNode;
  headerAction?: ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  className = '', 
  onClick, 
  interactive = false,
  footer,
  headerAction
}) => {
  const cardContent = (
    <>
      {(title || icon || subtitle) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start">
            {icon && <div className="mr-3 text-primary-500">{icon}</div>}
            <div>
              {title && <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className="flex-1">{children}</div>
      
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          {footer}
        </div>
      )}
    </>
  );

  return interactive ? (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 ${
        interactive ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {cardContent}
    </motion.div>
  ) : (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 ${className}`}
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
};

export default Card;