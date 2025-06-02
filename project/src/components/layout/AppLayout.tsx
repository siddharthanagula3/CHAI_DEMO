import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import VoiceAssistant from '../voice/VoiceAssistant';
import { useTheme } from '../../contexts/ThemeContext';
import { useHealthData } from '../../contexts/HealthDataContext';
import { parseHealthCommand } from '../../utils/voiceCommandParser';

const AppLayout: React.FC = () => {
  const { actualTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const healthData = useHealthData();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleVoiceCommand = (command: string) => {
    const parsedCommand = parseHealthCommand(command);
    if (!parsedCommand) return;

    switch (parsedCommand.type) {
      case 'weight':
        healthData.addWeightEntry({
          date: new Date().toISOString().split('T')[0],
          weight: parsedCommand.data?.weight || 0,
          notes: 'Added via voice command'
        });
        break;
      case 'exercise':
        healthData.addFitnessEntry({
          date: new Date().toISOString().split('T')[0],
          activityType: parsedCommand.data?.activity || 'exercise',
          duration: parsedCommand.data?.duration || 0,
          caloriesBurned: parsedCommand.data?.duration * 8, // Rough estimate
          intensity: 'medium',
          notes: 'Added via voice command'
        });
        break;
      case 'nutrition':
        healthData.addNutritionEntry({
          date: new Date().toISOString().split('T')[0],
          mealType: parsedCommand.data?.mealType,
          foodItems: [{
            id: `food-${Date.now()}`,
            name: parsedCommand.data?.food || '',
            servingSize: '1 serving',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
          }],
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          notes: 'Added via voice command'
        });
        break;
      case 'sleep':
        healthData.addSleepEntry({
          date: new Date().toISOString().split('T')[0],
          duration: parsedCommand.data?.duration || 0,
          quality: parsedCommand.data?.quality || 5,
          bedTime: '22:00',
          wakeTime: '06:00',
          notes: 'Added via voice command'
        });
        break;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${actualTheme === 'dark' ? 'dark' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
              onClick={toggleSidebar}
            ></div>
            <div className="relative flex h-full w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800">
              <Sidebar closeSidebar={toggleSidebar} />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 block border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <MobileNav />
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant onCommand={handleVoiceCommand} />
    </div>
  );
};

export default AppLayout;