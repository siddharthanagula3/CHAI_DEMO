import React, { useState } from 'react';
import { Mic, StopCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface VoiceCommandButtonProps {
  onResult?: (text: string) => void;
  className?: string;
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ 
  onResult = () => {},
  className = '' 
}) => {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pulseSize, setPulseSize] = useState(1);

  // Simulated voice recognition function
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    
    // Simulate variable pulse size based on "audio input"
    const pulseInterval = setInterval(() => {
      setPulseSize(Math.random() * 0.5 + 1);
    }, 300);
    
    // Simulate recording for a few seconds
    setTimeout(() => {
      clearInterval(pulseInterval);
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        
        // Sample mock results
        const mockResponses = [
          "Logging weight: 72.5kg",
          "Added 30 minutes of running to your fitness log",
          "Recorded breakfast with 450 calories",
          "Sleep quality last night: 7 hours, good quality",
          "Your health score this week improved by 5 points"
        ];
        
        // Return a random mock response
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        onResult(randomResponse);
      }, 1500);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setPulseSize(1);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.button
        className={`relative flex items-center justify-center w-14 h-14 rounded-full ${
          isListening 
            ? 'bg-error-500 text-white' 
            : isProcessing 
              ? 'bg-warning-500 text-white'
              : 'bg-primary-500 text-white'
        } shadow-lg`}
        onClick={toggleListening}
        disabled={isProcessing}
        whileTap={{ scale: 0.95 }}
      >
        {isListening && (
          <motion.div
            className="absolute w-full h-full rounded-full bg-error-400 opacity-30"
            animate={{ scale: pulseSize }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {isListening ? (
          <StopCircle className="w-6 h-6" />
        ) : isProcessing ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </motion.button>
      
      <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {isListening 
          ? t('ai.listening') 
          : isProcessing 
            ? t('ai.processing') 
            : t('ai.startSpeaking')}
      </span>
    </div>
  );
};

export default VoiceCommandButton;