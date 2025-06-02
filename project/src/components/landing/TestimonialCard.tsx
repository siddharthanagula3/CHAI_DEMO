import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  image,
  quote,
  rating,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
    >
      <div className="mb-4 flex items-center">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <div className="mb-4 flex">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-current text-yellow-400"
          />
        ))}
      </div>
      <p className="flex-1 text-gray-600 dark:text-gray-300">{quote}</p>
    </motion.div>
  );
};

export default TestimonialCard;