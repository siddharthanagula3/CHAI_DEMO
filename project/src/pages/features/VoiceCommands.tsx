import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, List, Settings, Play, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VoiceCommands: React.FC = () => {
  const { t } = useTranslation();

  const commandCategories = [
    {
      title: 'Health Tracking',
      icon: <List className="h-6 w-6 text-primary-600" />,
      commands: [
        'Log my weight: 75 kilograms',
        'Record workout: 30 minutes running',
        'Add meal: breakfast with eggs and toast',
        'Track sleep: 8 hours from 10 PM',
        'Log mood: feeling energetic today'
      ]
    },
    {
      title: 'Data Queries',
      icon: <HelpCircle className="h-6 w-6 text-secondary-600" />,
      commands: [
        'Show my weight trend this month',
        'What was my average sleep last week?',
        'How many calories did I burn today?',
        'Compare my workouts this week',
        'Show my nutrition summary'
      ]
    },
    {
      title: 'Quick Actions',
      icon: <Play className="h-6 w-6 text-accent-600" />,
      commands: [
        'Start workout timer',
        'Begin meditation session',
        'Set reminder for medication',
        'Schedule next weigh-in',
        'Create new fitness goal'
      ]
    },
    {
      title: 'Settings & Help',
      icon: <Settings className="h-6 w-6 text-success-600" />,
      commands: [
        'Change units to metric',
        'Update notification preferences',
        'Show voice command help',
        'Adjust microphone sensitivity',
        'Enable dark mode'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900"
          >
            <Mic className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Voice Command Guide
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Control your health tracking experience with natural voice commands.
            Simply speak to log data, get insights, and manage your health journey.
          </p>
        </div>

        {/* Setup Guide */}
        <div className="mb-16 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Getting Started with Voice Commands
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                <Volume2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Enable Microphone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Grant microphone permissions when prompted to enable voice commands.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900">
                <Settings className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Configure Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Adjust voice recognition settings and language preferences.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900">
                <Play className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Start Speaking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click the microphone icon or say "Hey Health AI" to start.
              </p>
            </div>
          </div>
        </div>

        {/* Command Categories */}
        <div className="grid gap-8 md:grid-cols-2">
          {commandCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-3 rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.commands.map((command, cmdIndex) => (
                  <motion.li
                    key={cmdIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 5 + cmdIndex) * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                  >
                    <Mic className="mr-3 h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{command}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 rounded-lg bg-primary-50 p-8 dark:bg-primary-900/30">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Tips for Better Voice Recognition
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Speak Clearly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use a clear, natural voice and pace when speaking commands.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Use Key Phrases
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start with action words like "log," "show," or "track."
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Quiet Environment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Minimize background noise for better recognition accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommands;