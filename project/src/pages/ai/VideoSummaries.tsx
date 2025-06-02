import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Calendar, Tag, Clock, Info } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useHealthData } from '../../contexts/HealthDataContext';
import { useAuth } from '../../contexts/AuthContext';

const VideoSummaries: React.FC = () => {
  const { t } = useTranslation();
  const { videoSummaries } = useHealthData();
  const { user } = useAuth();
  
  return (
    <div className="pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('ai.videoSummary')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            AI-generated video summaries of your health journey
          </p>
        </div>
        
        {!user?.isPremium && (
          <Button
            variant="accent"
          >
            Upgrade to Premium
          </Button>
        )}
      </div>
      
      {/* Premium Feature Banner (for non-premium users) */}
      {!user?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg bg-gradient-to-r from-primary-600 to-accent-500 p-6 text-white"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-xl font-bold">Unlock Video Summaries with Premium</h2>
              <p className="mt-2 max-w-2xl">
                Get personalized video summaries of your health progress, achievements, and actionable insights. 
                Videos are generated weekly to keep you motivated and on track.
              </p>
            </div>
            <Button
              variant="accent"
              className="whitespace-nowrap bg-white text-primary-600 hover:bg-gray-100"
            >
              Upgrade Now
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Video Summaries Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {videoSummaries.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="h-full"
              interactive={user?.isPremium}
              onClick={() => user?.isPremium && window.open(video.videoUrl, '_blank')}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-48 w-full object-cover"
                />
                
                {user?.isPremium ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg">
                      <Play className="h-6 w-6" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="rounded-md bg-gray-800 p-2 text-sm font-medium text-white">
                      Premium Only
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {video.title}
              </h3>
              
              <div className="mb-3 flex flex-wrap gap-y-2">
                <div className="mr-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(video.generatedDate).toLocaleDateString()}
                </div>
                <div className="mr-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="mr-1 h-4 w-4" />
                  {video.duration}
                </div>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {video.topics.map((topic, idx) => (
                  <span 
                    key={idx}
                    className="flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {topic}
                  </span>
                ))}
              </div>
              
              {!user?.isPremium && (
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<Info size={14} />}
                  >
                    Learn More About Premium
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Sample Video (for all users) */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Sample Health Summary Video
        </h2>
        <div className="overflow-hidden rounded-lg bg-gray-900">
          <div className="aspect-w-16 aspect-h-9 relative pt-[56.25%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 text-white opacity-80" />
                <p className="mt-4 text-white">
                  Video playback would be available here in a production environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSummaries;