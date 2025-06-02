import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoiceSettings } from './useVoiceSettings';
import { parseHealthCommand } from '../utils/voiceCommandParser';

export const useVoiceCommand = () => {
  const { language } = useLanguage();
  const { isMuted } = useVoiceSettings();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;
        setRecognition(recognition);
      }
    }
  }, [language]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      setTranscript(command);

      // Handle navigation commands
      if (command.includes('show insights') || command.includes('open insights')) {
        navigate('/app/insights');
        return;
      }
      if (command.includes('open settings') || command.includes('show settings')) {
        navigate('/app/settings');
        return;
      }

      // Parse health commands
      const parsedCommand = parseHealthCommand(command);
      if (parsedCommand) {
        // Handle the command based on its type
        switch (parsedCommand.type) {
          case 'weight':
            // Open weight modal with pre-filled data
            window.dispatchEvent(new CustomEvent('openLogModal', {
              detail: {
                type: 'weight',
                data: parsedCommand.data
              }
            }));
            break;
          case 'exercise':
            // Open exercise modal with pre-filled data
            window.dispatchEvent(new CustomEvent('openLogModal', {
              detail: {
                type: 'workout',
                data: parsedCommand.data
              }
            }));
            break;
          case 'nutrition':
            // Open nutrition modal with pre-filled data
            window.dispatchEvent(new CustomEvent('openLogModal', {
              detail: {
                type: 'meal',
                data: parsedCommand.data
              }
            }));
            break;
          case 'sleep':
            // Open sleep modal with pre-filled data
            window.dispatchEvent(new CustomEvent('openLogModal', {
              detail: {
                type: 'sleep',
                data: parsedCommand.data
              }
            }));
            break;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [recognition, navigate]);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript('');
        setError(null);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setError('Failed to start speech recognition');
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    transcript,
    error,
    isSupported: !!recognition
  };
};