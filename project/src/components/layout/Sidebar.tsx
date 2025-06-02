import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Weight, 
  Activity, 
  Utensils, 
  Moon,
  SmilePlus, 
  Lightbulb, 
  Video, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const { t } = useTranslation();
  const { logout, user } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: t('dashboard.title'), path: '/app/dashboard' },
    { icon: <Weight size={20} />, label: t('tracking.weight'), path: '/app/weight' },
    { icon: <Activity size={20} />, label: t('tracking.fitness'), path: '/app/fitness' },
    { icon: <Utensils size={20} />, label: t('tracking.nutrition'), path: '/app/nutrition' },
    { icon: <Moon size={20} />, label: t('tracking.sleep'), path: '/app/sleep' },
    { icon: <SmilePlus size={20} />, label: t('tracking.mood'), path: '/app/mood' },
    { icon: <Lightbulb size={20} />, label: t('ai.insights'), path: '/app/insights' },
    { icon: <Video size={20} />, label: t('ai.videoSummary'), path: '/app/videos' },
    { icon: <Settings size={20} />, label: t('common.settings'), path: '/app/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {closeSidebar && (
        <div className="flex items-center justify-end p-4 md:hidden">
          <button 
            onClick={closeSidebar}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="flex items-center p-4">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-300">
            {user?.name.charAt(0)}
          </div>
        )}
        <div className="ml-3">
          <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
      
      <nav className="mt-5 flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            <div className="mr-3">{item.icon}</div>
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <LogOut size={20} className="mr-3" />
          {t('common.logout')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;