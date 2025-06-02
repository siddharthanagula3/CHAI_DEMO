import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, User, Settings, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import VoiceCommandButton from '../common/VoiceCommandButton';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme, actualTheme, setTheme } = useTheme();
  const { language, setLanguage, languageOptions } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  
  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  const handleVoiceResult = (text: string) => {
    // Show a temporary notification with the voice command result
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-primary-600 text-white p-3 rounded-lg shadow-lg z-50';
    notification.textContent = text;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };
  
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/app/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {t('common.appName')}
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Search size={20} />
            </button>
            
            {searchOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 250 }}
                exit={{ opacity: 0, width: 0 }}
                className="absolute right-0 top-full mt-2 w-full origin-top-right rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
              </motion.div>
            )}
          </div>
          
          {/* Voice Command Button */}
          <VoiceCommandButton 
            onResult={handleVoiceResult}
            className="hidden md:flex"
          />
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {actualTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <button className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error-500"></span>
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                  {user?.name.charAt(0)}
                </div>
              )}
              <span className="ml-2 hidden text-sm font-medium md:block">
                {user?.name}
              </span>
            </button>
            
            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <Link
                  to="/app/profile"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  {t('common.profile')}
                </Link>
                <Link
                  to="/app/settings"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings size={16} className="mr-2" />
                  {t('common.settings')}
                </Link>
                
                {/* Language Selector */}
                <div className="border-t border-gray-100 px-4 py-2 dark:border-gray-700">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                    {t('settings.language')}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;