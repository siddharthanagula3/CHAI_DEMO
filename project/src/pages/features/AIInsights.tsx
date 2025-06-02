import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, MessageSquare, BarChart as ChartBar, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIInsights: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary-600" />,
      title: 'Personalized Health Analysis',
      description: 'Get AI-powered insights tailored to your unique health data and goals.',
      image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-secondary-600" />,
      title: 'Smart Recommendations',
      description: 'Receive actionable suggestions to improve your health and wellness.',
      image: 'https://images.pexels.com/photos/7991374/pexels-photo-7991374.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-accent-600" />,
      title: 'AI Health Assistant',
      description: 'Chat with our AI to get instant answers about your health data.',
      image: 'https://images.pexels.com/photos/8438914/pexels-photo-8438914.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <ChartBar className="h-8 w-8 text-success-600" />,
      title: 'Trend Analysis',
      description: 'Understand patterns and correlations in your health metrics.',
      image: 'https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Target className="h-8 w-8 text-warning-600" />,
      title: 'Goal Optimization',
      description: 'AI-optimized goals based on your progress and capabilities.',
      image: 'https://images.pexels.com/photos/4098365/pexels-photo-4098365.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Zap className="h-8 w-8 text-error-600" />,
      title: 'Early Warning System',
      description: 'Get proactive alerts about potential health concerns.',
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            AI-Powered Health Insights
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Harness the power of artificial intelligence to understand your health better
            and make informed decisions about your wellness journey.
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

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            How Our AI Works
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Data Collection
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Securely gather your health metrics and activities.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-2xl font-bold text-secondary-600 dark:bg-secondary-900 dark:text-secondary-400">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Pattern Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI analyzes patterns and correlations in your data.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-2xl font-bold text-accent-600 dark:bg-accent-900 dark:text-accent-400">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Insight Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create personalized insights and recommendations.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-100 text-2xl font-bold text-success-600 dark:bg-success-900 dark:text-success-400">
                4
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI adapts and improves based on your feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;