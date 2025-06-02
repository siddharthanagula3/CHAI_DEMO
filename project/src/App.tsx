import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HealthDataProvider } from './contexts/HealthDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WeightTracking from './pages/health/WeightTracking';
import FitnessTracking from './pages/health/FitnessTracking';
import NutritionTracking from './pages/health/NutritionTracking';
import SleepTracking from './pages/health/SleepTracking';
import MoodTracking from './pages/health/MoodTracking';
import AIInsights from './pages/ai/AIInsights';
import VideoSummaries from './pages/ai/VideoSummaries';
import SettingsPage from './pages/settings/SettingsPage';
import ProfilePage from './pages/settings/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';

// Features Pages
import HealthTrackingFeature from './pages/features/HealthTracking';
import AIInsightsFeature from './pages/features/AIInsights';
import VoiceCommandsFeature from './pages/features/VoiceCommands';
import VideoSummariesFeature from './pages/features/VideoSummaries';

// Resources Pages
import HelpCenter from './pages/resources/HelpCenter';
import Blog from './pages/resources/Blog';

// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

// Contact Page
import Contact from './pages/contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <HealthDataProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Features Pages */}
                <Route path="/features">
                  <Route path="health-tracking" element={<HealthTrackingFeature />} />
                  <Route path="ai-insights" element={<AIInsightsFeature />} />
                  <Route path="voice-commands" element={<VoiceCommandsFeature />} />
                  <Route path="video-summaries" element={<VideoSummariesFeature />} />
                </Route>

                {/* Resources Pages */}
                <Route path="/resources">
                  <Route path="help-center" element={<HelpCenter />} />
                  <Route path="blog" element={<Blog />} />
                </Route>

                {/* Legal Pages */}
                <Route path="/legal">
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms-of-service" element={<TermsOfService />} />
                </Route>

                {/* Contact Page */}
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/app" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/app/dashboard\" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="weight" element={<WeightTracking />} />
                  <Route path="fitness" element={<FitnessTracking />} />
                  <Route path="nutrition" element={<NutritionTracking />} />
                  <Route path="sleep" element={<SleepTracking />} />
                  <Route path="mood" element={<MoodTracking />} />
                  <Route path="insights" element={<AIInsights />} />
                  <Route path="videos" element={<VideoSummaries />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </HealthDataProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;