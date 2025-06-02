import React from 'react';
import { Settings, Moon, Globe, Bell, Shield, Key } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, languageOptions } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-white">
          <Settings className="h-8 w-8" />
          {t('common.settings')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('settings.managePreferences')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Appearance */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <Moon className="h-6 w-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings.appearance')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.theme')}</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="light">{t('settings.lightMode')}</option>
                <option value="dark">{t('settings.darkMode')}</option>
                <option value="system">{t('settings.systemMode')}</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.reduceMotion')}</span>
              <button className="relative h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-secondary-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings.languageRegion')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                {t('settings.language')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="rounded-md border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                {t('settings.units')}
              </label>
              <select className="rounded-md border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option value="metric">{t('settings.metric')}</option>
                <option value="imperial">{t('settings.imperial')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <Bell className="h-6 w-6 text-warning-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings.notifications')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.emailNotifications')}</span>
              <button className="relative h-6 w-12 rounded-full bg-warning-500">
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.pushNotifications')}</span>
              <button className="relative h-6 w-12 rounded-full bg-warning-500">
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-6 w-6 text-success-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings.privacySecurity')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.twoFactor')}</span>
              <button className="relative h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('settings.dataSharing')}</span>
              <button className="relative h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600">
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-3">
          <Key className="h-6 w-6 text-error-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('settings.accountManagement')}
          </h2>
        </div>
        <div className="space-y-4">
          {user?.isPremium ? (
            <div className="rounded-lg bg-primary-50 p-4 dark:bg-primary-900/30">
              <p className="text-primary-700 dark:text-primary-300">
                {t('settings.premiumActive')}
              </p>
            </div>
          ) : (
            <Button
              variant="primary"
              fullWidth
            >
              {t('settings.upgradePremium')}
            </Button>
          )}
          <Button
            variant="outline"
            className="text-error-600 hover:bg-error-50 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-900/30 dark:hover:text-error-300"
          >
            {t('settings.deleteAccount')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;