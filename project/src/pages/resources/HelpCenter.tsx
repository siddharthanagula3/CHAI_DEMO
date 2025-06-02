import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Book, MessageCircle, Settings, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HelpCenter: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: <Book className="h-6 w-6 text-primary-600" />,
      title: 'Getting Started',
      articles: [
        'How to set up your account',
        'Understanding the dashboard',
        'Setting your health goals',
        'Connecting devices and apps'
      ]
    },
    {
      icon: <Settings className="h-6 w-6 text-secondary-600" />,
      title: 'Using Features',
      articles: [
        'Tracking your weight',
        'Logging workouts',
        'Recording meals',
        'Sleep tracking guide'
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-accent-600" />,
      title: 'AI Features',
      articles: [
        'Voice command guide',
        'Understanding AI insights',
        'Video summary creation',
        'Personalized recommendations'
      ]
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-success-600" />,
      title: 'Troubleshooting',
      articles: [
        'Common issues and solutions',
        'Data sync problems',
        'App performance tips',
        'Privacy and security'
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

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
            <HelpCircle className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Help Center
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Find answers to your questions and learn how to make the most of Complete Health AI.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredCategories.map((category, index) => (
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <button className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">{article}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 rounded-lg bg-primary-50 p-8 dark:bg-primary-900/30">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Need More Help?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                Contact Support
              </button>
              <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;