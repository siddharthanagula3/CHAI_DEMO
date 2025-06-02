import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          
          {/* Profile Info */}
          <div className="relative px-6 py-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-6">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover dark:border-gray-800"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-primary-100 dark:border-gray-800 dark:bg-primary-900">
                  <User className="h-16 w-16 text-primary-600 dark:text-primary-400" />
                </div>
              )}
            </div>
            
            {/* Profile Actions */}
            <div className="ml-40 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('profile.healthEnthusiast')}</p>
              </div>
              <Button
                variant="primary"
                leftIcon={<Edit size={16} />}
              >
                {t('profile.editProfile')}
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 px-6 py-6 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('profile.contactInfo')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('auth.email')}</p>
                  <p className="text-gray-900 dark:text-white">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('profile.phone')}</p>
                  <p className="text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('profile.location')}</p>
                  <p className="text-gray-900 dark:text-white">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('profile.occupation')}</p>
                  <p className="text-gray-900 dark:text-white">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Goals */}
          <div className="border-t border-gray-200 px-6 py-6 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('profile.healthGoals')}
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('profile.weightGoal')}</span>
                  <span className="text-primary-600 dark:text-primary-400">75 kg</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <div className="h-2 w-[70%] rounded-full bg-primary-500"></div>
                </div>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('profile.weeklyExercise')}</span>
                  <span className="text-success-600 dark:text-success-400">4/5 days</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                  <div className="h-2 w-[80%] rounded-full bg-success-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="border-t border-gray-200 px-6 py-6 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('profile.recentActivity')}
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('profile.completedWorkout')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('profile.updatedNutrition')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('profile.yesterday')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{t('profile.achievedSleepGoal')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;