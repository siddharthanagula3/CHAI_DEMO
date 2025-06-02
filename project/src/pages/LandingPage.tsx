import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, ArrowRight, Mic, Activity, BarChart3, 
  Languages, Video, CheckCircle, Moon, Sun 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockSubscriptionPlans } from '../utils/mockData';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import type { LoginFormData, RegisterFormData } from '../utils/auth';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { actualTheme, setTheme } = useTheme();
  const { language, setLanguage, languageOptions } = useLanguage();
  const { login, register, isLoading } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);

  const handleAuthSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      setError(null);
      if (authMode === 'login') {
        await login(data as LoginFormData);
      } else {
        await register(data as RegisterFormData);
      }
      setShowAuthModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  const features = [
    {
      icon: <Mic className="h-6 w-6 text-primary-600" />,
      title: 'Voice Command Interactions',
      description: 'Log health data with your voice, ask questions about your health, and get insights using natural language.',
      image: 'https://images.pexels.com/photos/4098365/pexels-photo-4098365.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Activity className="h-6 w-6 text-primary-600" />,
      title: 'Comprehensive Health Tracking',
      description: 'Track weight, fitness, nutrition, sleep, and mood all in one place with intuitive tools and visualizations.',
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      title: 'AI-Powered Insights',
      description: 'Receive personalized health recommendations and insights based on your data and patterns.',
      image: 'https://images.pexels.com/photos/7991374/pexels-photo-7991374.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Languages className="h-6 w-6 text-primary-600" />,
      title: 'Multilingual Support',
      description: 'Access the app in multiple languages including English, Spanish, French, German, and Chinese.',
      image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Video className="h-6 w-6 text-primary-600" />,
      title: 'Video Health Summaries',
      description: 'Get AI-generated video summaries of your health progress and achievements on a weekly basis.',
      image: 'https://images.pexels.com/photos/4098152/pexels-photo-4098152.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Sun className="h-6 w-6 text-primary-600" />,
      title: 'Light & Dark Mode',
      description: 'Choose between light and dark themes for comfortable viewing in any environment or time of day.',
      image: 'https://images.pexels.com/photos/4098606/pexels-photo-4098606.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${actualTheme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-80"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="mr-2 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {t('common.appName')}
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {actualTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.select
              whileHover={{ scale: 1.05 }}
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </motion.select>
            
            <div className="hidden md:block">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                >
                  {t('common.login')}
                </Button>
              </motion.div>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="primary"
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
              >
                {t('auth.signUp')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <motion.h1 
                className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your AI-Powered Health Companion
              </motion.h1>
              <motion.p 
                className="mb-8 text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Track your health, get personalized insights, and achieve your wellness goals with the power of AI and voice interactions.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight />}
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                  >
                    Get Started Free
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                  >
                    Log In
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <motion.img 
                src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Health tracking and wellness" 
                className="rounded-lg shadow-xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Powerful Features for Your Health Journey
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Complete Health AI combines cutting-edge technology with comprehensive health tracking to give you the tools you need for better wellness.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-transform dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              We offer flexible plans to meet your health tracking needs, from free to premium features.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {mockSubscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className={`relative rounded-lg border ${
                  plan.isPopular 
                    ? 'border-primary-500 dark:border-primary-400' 
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white p-6 shadow-lg dark:bg-gray-800`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-primary-500 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}

                {/* Limited Time Badge */}
                {plan.isLimitedTime && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-error-500 px-4 py-1 text-sm font-medium text-white">
                    Limited Time
                  </div>
                )}
                
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  {plan.originalPrice ? (
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">/{plan.interval}</span>
                      <div className="mt-1 space-y-1">
                        <span className="inline-block text-lg text-gray-500 line-through dark:text-gray-400">
                          ${plan.originalPrice}/{plan.interval}
                        </span>
                        <span className="ml-2 inline-block rounded-full bg-success-100 px-2 py-0.5 text-sm font-medium text-success-700 dark:bg-success-900 dark:text-success-300">
                          Save ${plan.savings.toFixed(2)}
                        </span>
                        <div className="text-sm font-medium text-error-600 dark:text-error-400">
                          Offer ends soon!
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">/{plan.interval}</span>
                    </div>
                  )}
                </div>
                
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="mr-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={plan.isPopular || plan.isLimitedTime ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                  >
                    {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                  </Button>
                </motion.div>

                {/* Discount Badge */}
                {plan.discount && (
                  <div className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full bg-success-500 text-lg font-bold text-white shadow-lg">
                    -{plan.discount}%
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <motion.section 
        className="bg-primary-600 py-16 text-white dark:bg-primary-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h2 
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Start Your Health Journey Today
          </motion.h2>
          <motion.p 
            className="mx-auto mb-8 max-w-3xl text-lg text-primary-100"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of users who are taking control of their health with Complete Health AI.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="accent"
              size="lg"
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
            >
              Sign Up Free
            </Button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-center">
                <Heart className="mr-2 text-primary-400" />
                <span className="text-xl font-bold">Complete Health AI</span>
              </div>
              <p className="text-gray-400">
                Your AI-powered health and wellness companion for a better, healthier life.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-4 text-lg font-semibold">Features</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Health Tracking
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  AI Insights
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Voice Commands
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Video Summaries
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Help Center
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Blog
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Privacy Policy
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400 hover:text-primary-400">
                  Terms of Service
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }} className="text-gray-400">
                  support@completehealthtracker.com
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400">
                  +1 (214) 940-6749
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="text-gray-400">
                  123 Health Street, San Francisco, CA
                </motion.li>
              </ul>
            </motion.div>
          </div>
          
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Complete Health AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSubmit={handleAuthSubmit}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LandingPage;