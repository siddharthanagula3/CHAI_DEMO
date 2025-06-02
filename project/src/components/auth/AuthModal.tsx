import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '../../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
  onToggleMode: () => void;
  isLoading: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  onToggleMode,
  isLoading
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: mode === 'login' ? {
      email: '',
      password: '',
      rememberMe: false
    } : {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });

  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, mode, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? t('auth.signIn') : t('auth.signUp')}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300\" htmlFor="name">
                  {t('auth.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  aria-label="Full name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                    errors.name 
                      ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                      : 'border-gray-300 focus:border-primary-500 dark:border-gray-600'
                  }`}
                />
                {errors.name && (
                  <p id="name-error\" className="mt-1 text-sm text-error-600">{errors.name.message}</p>
                )}
              </div>
            )}

            <div className={mode === 'register' ? 'mt-4' : ''}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                aria-label="Email address"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                  errors.email 
                    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                    : 'border-gray-300 focus:border-primary-500 dark:border-gray-600'
                }`}
              />
              {errors.email && (
                <p id="email-error\" className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                  {t('auth.password')}
                </label>
                {mode === 'login' && (
                  <button 
                    type="button"
                    className="text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                  >
                    {t('auth.forgotPassword')}
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                {...register('password')}
                aria-label="Password"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                  errors.password 
                    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                    : 'border-gray-300 focus:border-primary-500 dark:border-gray-600'
                }`}
              />
              {errors.password && (
                <p id="password-error\" className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}
            </div>

            {mode === 'register' && (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="confirmPassword">
                    {t('auth.confirmPassword')}
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    aria-label="Confirm password"
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                    autoComplete="new-password"
                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                      errors.confirmPassword 
                        ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                        : 'border-gray-300 focus:border-primary-500 dark:border-gray-600'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p id="confirm-password-error\" className="mt-1 text-sm text-error-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register('acceptTerms')}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {t('auth.acceptTerms')}
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-error-600">{errors.acceptTerms.message}</p>
                )}
              </>
            )}

            {mode === 'login' && (
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="mt-6"
              isLoading={isLoading}
            >
              {mode === 'login' ? t('auth.signIn') : t('auth.signUp')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
            </span>
            <button
              onClick={onToggleMode}
              className="ml-1 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              {mode === 'login' ? t('auth.signUp') : t('auth.signIn')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;