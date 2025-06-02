import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Weight, Activity, Utensils, User, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import VoiceCommandButton from '../common/VoiceCommandButton';

const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const [showVoiceButton, setShowVoiceButton] = React.useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: t('dashboard.title'), path: '/app/dashboard' },
    { icon: <Weight size={20} />, label: t('tracking.weight'), path: '/app/weight' },
    { icon: <Activity size={20} />, label: t('tracking.fitness'), path: '/app/fitness' },
    { icon: <Utensils size={20} />, label: t('tracking.nutrition'), path: '/app/nutrition' },
    { icon: <User size={20} />, label: t('common.profile'), path: '/app/profile' },
  ];

  const toggleVoiceButton = () => {
    setShowVoiceButton(!showVoiceButton);
  };

  return (
    <div className="relative">
      {/* Voice Command Button (Floating) */}
      {showVoiceButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -120 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute left-1/2 -translate-x-1/2 transform"
        >
          <VoiceCommandButton />
        </motion.div>
      )}
      
      {/* Bottom Navigation */}
      <nav className="flex h-16 items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-2 py-1 ${
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Voice Command Button (Toggle) */}
        <button
          onClick={toggleVoiceButton}
          className="flex flex-col items-center justify-center px-2 py-1 text-gray-600 dark:text-gray-400"
        >
          <Mic size={20} className={showVoiceButton ? 'text-primary-600 dark:text-primary-400' : ''} />
          <span className="mt-1 text-xs">{t('ai.voiceCommands')}</span>
        </button>
      </nav>
    </div>
  );
};

export default MobileNav;