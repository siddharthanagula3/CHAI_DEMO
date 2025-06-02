import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Calendar, Clock, Tag, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

const VideoSummaries: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: 'Weekly Progress Videos',
      description: 'Get personalized video summaries of your weekly health achievements and progress.',
      image: 'https://images.pexels.com/photos/4098365/pexels-photo-4098365.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Monthly Health Reviews',
      description: 'Comprehensive monthly video reports analyzing your health trends and improvements.',
      image: 'https://images.pexels.com/photos/7991374/pexels-photo-7991374.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Goal Achievement Celebrations',
      description: 'Special video highlights when you reach important health and fitness milestones.',
      image: 'https://images.pexels.com/photos/4098152/pexels-photo-4098152.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const sampleVideos = [
    {
      title: 'Weekly Fitness Progress',
      thumbnail: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2:45',
      date: '2024-01-15',
      tags: ['Fitness', 'Progress', 'Weekly']
    },
    {
      title: 'Monthly Health Overview',
      thumbnail: 'https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4:20',
      date: '2024-01-01',
      tags: ['Health', 'Monthly', 'Overview']
    },
    {
      title: 'Weight Loss Journey',
      thumbnail: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3:15',
      date: '2023-12-31',
      tags: ['Weight Loss', 'Progress']
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
            <Video className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            AI-Generated Video Summaries
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Watch your health journey come to life with personalized video summaries.
            Get engaging visual updates on your progress and achievements.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <div className="relative h-48">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <Play className="h-12 w-12 text-white opacity-75" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Feature Banner */}
        <div className="mb-16 overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-white">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center">
              <Crown className="mr-4 h-12 w-12" />
              
              <div>
                <h2 className="text-2xl font-bold">Premium Feature</h2>
                <p className="max-w-xl">
                  Unlock AI-generated video summaries with our premium subscription.
                  Get detailed visual insights into your health journey.
                </p>
              </div>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="whitespace-nowrap bg-white text-primary-600 hover:bg-gray-100"
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>

        {/* Sample Videos */}
        <div>
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Sample Video Summaries
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {sampleVideos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-75 px-2 py-1 text-sm text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {video.title}
                  </h3>
                  <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-1 h-4 w-4" />
                    {video.date}
                    <Clock className="ml-4 mr-1 h-4 w-4" />
                    {video.duration}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSummaries;