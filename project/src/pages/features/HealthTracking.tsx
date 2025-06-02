import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Activity, Apple, Moon, SmilePlus, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HealthTracking: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Scale className="h-8 w-8 text-primary-600" />,
      title: 'Weight Tracking',
      description: 'Track your weight journey with detailed metrics and body composition analysis.',
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Activity className="h-8 w-8 text-secondary-600" />,
      title: 'Fitness Tracking',
      description: 'Log workouts, track progress, and analyze your fitness improvements over time.',
      image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Apple className="h-8 w-8 text-accent-600" />,
      title: 'Nutrition Tracking',
      description: 'Monitor your diet, track macros, and get personalized nutrition insights.',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Moon className="h-8 w-8 text-success-600" />,
      title: 'Sleep Tracking',
      description: 'Analyze your sleep patterns and improve your rest quality.',
      image: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <SmilePlus className="h-8 w-8 text-warning-600" />,
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being and identify patterns.',
      image: 'https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Brain className="h-8 w-8 text-error-600" />,
      title: 'Body Composition',
      description: 'Advanced body composition analysis with detailed metrics.',
      image: 'https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Comprehensive Health Tracking
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Monitor every aspect of your health journey with our advanced tracking features.
            Get detailed insights and personalized recommendations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center">
                  <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Why Track Your Health with Us?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
                <Activity className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Comprehensive Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track all aspects of your health in one place with detailed metrics and analysis.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
                <Brain className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized recommendations and insights based on your data patterns.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
                <SmilePlus className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Holistic Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understand how different aspects of your health interact and affect each other.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;