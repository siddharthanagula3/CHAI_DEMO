// VoiceAssistant.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WaveformVisualizer from './WaveformVisualizer';
import { useVoiceCommand } from '../../hooks/useVoiceCommand';
import { useVoiceSettings } from '../../hooks/useVoiceSettings';
// ⚠️ Commented out ElevenLabs call below
// import { textToSpeech, stopAllAudio } from '../../utils/tts';

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
  className?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onCommand,
  className = ''
}) => {
  const { t } = useTranslation();
  const { isListening, startListening, stopListening, transcript } = useVoiceCommand();
  const { isMuted, toggleMute, volume, setVolume } = useVoiceSettings();
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceCommand = useCallback(async (text: string) => {
    if (!text) return;

    setIsProcessing(true);
    // ⚠️ Commented out ElevenLabs call below
    // stopAllAudio();

    try {
      if (onCommand) {
        onCommand(text);
      }

      const response = `I've processed your command: ${text}`;
      if (!isMuted) {
        // ⚠️ Commented out ElevenLabs call below
        // await textToSpeech(response);
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      // ⚠️ Commented out ElevenLabs call below
      // textToSpeech('Sorry, I had trouble processing that command.');
    } finally {
      setIsProcessing(false);
    }
  }, [onCommand, isMuted]);

  useEffect(() => {
    if (transcript) {
      handleVoiceCommand(transcript);
    }
  }, [transcript, handleVoiceCommand]);

  return (
    <div className={`fixed bottom-20 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {showVolumeControl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <button
              onClick={toggleMute}
              className="mb-2 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isMuted ? "Unmute" : "Mute"}
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
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center"
      >
        <button
          onClick={() => isListening ? stopListening() : startListening()}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-colors ${
            isListening 
              ? 'bg-error-500 text-white' 
              : isProcessing 
                ? 'bg-warning-500 text-white'
                : 'bg-primary-500 text-white'
          }`}
          disabled={isProcessing}
          aria-label={isListening ? "Stop listening" : "Start voice command"}
        >
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-error-400 opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {isListening ? (
            <>
              <StopCircle className="relative z-10 h-8 w-8" />
              <WaveformVisualizer className="absolute inset-0" />
            </>
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </button>

        <button
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          className="mt-2 rounded-full bg-white p-2 text-gray-600 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Toggle volume controls"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <div className="mt-2 text-center" aria-live="polite">
          <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-md dark:bg-gray-800 dark:text-gray-300">
            {isListening 
              ? t('voice.listening')
              : isProcessing 
                ? t('voice.processing')
                : t('voice.tapToSpeak')}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceAssistant;
