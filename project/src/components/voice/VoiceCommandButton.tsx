import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WaveformVisualizer from './WaveformVisualizer';
import { useVoiceCommand } from '../../hooks/useVoiceCommand';
import { useVoiceSettings } from '../../hooks/useVoiceSettings';

interface VoiceCommandButtonProps {
  onResult?: (text: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({
  onResult,
  className = '',
  size = 'md'
}) => {
  const { t } = useTranslation();
  const { isListening, startListening, stopListening, transcript, error } = useVoiceCommand();
  const { isMuted, toggleMute, volume, setVolume } = useVoiceSettings();
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const volumeControlRef = React.useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  useEffect(() => {
    if (transcript && onResult) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeControl(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show error feedback
  useEffect(() => {
    if (error) {
      // Display error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-error-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = `Error: ${error}`;
      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }, [error]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Volume Control */}
      <AnimatePresence>
        {showVolumeControl && (
          <motion.div
            ref={volumeControlRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-4 flex flex-col items-center rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <button
              onClick={toggleMute}
              className="mb-2 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-24 -rotate-90 appearance-none bg-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Button */}
      <motion.button
        onClick={() => isListening ? stopListening() : startListening()}
        whileTap={{ scale: 0.95 }}
        className={`relative flex ${sizeClasses[size]} items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600`}
      >
        {isListening ? (
          <>
            <StopCircle size={iconSizes[size]} className="relative z-10" />
            <WaveformVisualizer className="absolute inset-0" />
          </>
        ) : (
          <Mic size={iconSizes[size]} />
        )}
      </motion.button>

      {/* Volume Toggle */}
      <button
        onClick={() => setShowVolumeControl(!showVolumeControl)}
        className="mt-2 rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      {/* Status Text */}
      <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {isListening ? t('voice.listening') : t('voice.tapToSpeak')}
      </span>
    </div>
  );
};

export default VoiceCommandButton;