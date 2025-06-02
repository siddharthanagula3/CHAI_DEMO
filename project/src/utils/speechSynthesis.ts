import { useVoiceSettings } from '../hooks/useVoiceSettings';

export const speak = (text: string, options: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()) => {
  const { isMuted, volume } = useVoiceSettings.getState();
  
  if (isMuted) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Configure speech options
  options.text = text;
  options.volume = volume;
  options.rate = 1;
  options.pitch = 1;

  // Use a more natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => 
    voice.name.includes('Google') || voice.name.includes('Natural')
  );
  if (preferredVoice) {
    options.voice = preferredVoice;
  }

  // Speak the text
  window.speechSynthesis.speak(options);
};

export const generateResponse = (command: string): string => {
  // Add personality to responses
  const responses = {
    healthScore: [
      "Your health score is looking great at 85! Keep up the excellent work with your consistent exercise routine.",
      "I see your health score is 72. Your sleep has improved, but we could work on increasing your daily activity.",
      "Your current health score is 65. Let's focus on improving your nutrition habits to boost that score!"
    ],
    progress: [
      "You're making fantastic progress! Your workout consistency has improved by 30% this month.",
      "I notice you've been hitting your step goals more often. That's excellent dedication!",
      "Your sleep quality has been trending upward. Those evening meditation sessions are paying off!"
    ],
    motivation: [
      "Remember, every small step counts toward your bigger health goals. You've got this!",
      "Looking at your progress, I can see your dedication. Keep that momentum going!",
      "You're building healthy habits that will serve you well. Stay consistent!"
    ]
  };

  // Select appropriate response based on command context
  if (command.includes('health score')) {
    return responses.healthScore[Math.floor(Math.random() * responses.healthScore.length)];
  } else if (command.includes('progress')) {
    return responses.progress[Math.floor(Math.random() * responses.progress.length)];
  } else {
    return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
  }
};