import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  common: {
    appName: 'Complete Health AI',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    viewAll: 'View All',
    search: 'Search',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome',
  },
  auth: {
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    signUp: 'Sign Up',
    hasAccount: 'Already have an account?',
    signIn: 'Sign In',
    name: 'Full Name',
    confirmPassword: 'Confirm Password',
  },
  dashboard: {
    title: 'Dashboard',
    healthScore: 'Health Score',
    todayActivities: 'Today\'s Activities',
    recentEntries: 'Recent Entries',
    insights: 'AI Insights',
    quickAdd: 'Quick Add',
    viewReports: 'View Reports',
  },
  tracking: {
    weight: 'Weight',
    fitness: 'Fitness',
    nutrition: 'Nutrition',
    sleep: 'Sleep',
    mood: 'Mood',
    addEntry: 'Add Entry',
    logWeight: 'Log Weight',
    logWorkout: 'Log Workout',
    logMeal: 'Log Meal',
    logSleep: 'Log Sleep',
    logMood: 'Log Mood',
    editWeight: 'Edit Weight Entry',
    editActivity: 'Edit Activity',
    editMeal: 'Edit Meal',
    editSleep: 'Edit Sleep Entry',
    editMood: 'Edit Mood Entry',
    logActivity: 'Log Activity',
  },
  ai: {
    voiceCommands: 'Voice Commands',
    videoSummary: 'Video Summary',
    insights: 'AI Insights',
    startSpeaking: 'Start Voice Command',
    listening: 'Listening...',
    processing: 'Processing...',
    voiceHint: 'Try saying: "Log my weight" or "How did I sleep last week?"',
  },
  settings: {
    language: 'Language',
    theme: 'Theme',
    units: 'Units',
    notifications: 'Notifications',
    privacy: 'Privacy',
    subscription: 'Subscription',
    account: 'Account',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemMode: 'System Default',
    metric: 'Metric (kg, cm)',
    imperial: 'Imperial (lb, in)',
    managePreferences: 'Manage your application preferences and settings',
    appearance: 'Appearance',
    reduceMotion: 'Reduce Motion',
    languageRegion: 'Language & Region',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    privacySecurity: 'Privacy & Security',
    twoFactor: 'Two-Factor Authentication',
    dataSharing: 'Data Sharing',
    accountManagement: 'Account Management',
    premiumActive: 'Premium Subscription Active',
    upgradePremium: 'Upgrade to Premium',
    deleteAccount: 'Delete Account',
  },
  profile: {
    healthEnthusiast: 'Health Enthusiast',
    editProfile: 'Edit Profile',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    location: 'Location',
    occupation: 'Occupation',
    healthGoals: 'Health Goals',
    weightGoal: 'Weight Goal',
    weeklyExercise: 'Weekly Exercise',
    recentActivity: 'Recent Activity',
    completedWorkout: 'Completed a workout session',
    updatedNutrition: 'Updated nutrition log',
    achievedSleepGoal: 'Achieved sleep goal',
    yesterday: 'Yesterday',
  },
};

// Spanish translations
const esTranslations = {
  common: {
    appName: 'Salud Completa IA',
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    viewAll: 'Ver Todo',
    search: 'Buscar',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    welcome: 'Bienvenido',
  },
  // ... (rest of Spanish translations)
};

// French translations (basic implementation for MVP)
const frTranslations = {
  common: {
    appName: 'Santé Complète IA',
    loading: 'Chargement...',
    save: 'Enregistrer',
    cancel: 'Annuler',
  },
  // ... (rest of French translations)
};

// German translations (basic implementation for MVP)
const deTranslations = {
  common: {
    appName: 'Komplette Gesundheit KI',
    loading: 'Wird geladen...',
    save: 'Speichern',
    cancel: 'Abbrechen',
  },
  // ... (rest of German translations)
};

// Chinese translations (basic implementation for MVP)
const zhTranslations = {
  common: {
    appName: '完整健康人工智能',
    loading: '加载中...',
    save: '保存',
    cancel: '取消',
  },
  // ... (rest of Chinese translations)
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations },
    fr: { translation: frTranslations },
    de: { translation: deTranslations },
    zh: { translation: zhTranslations },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;