interface ParsedCommand {
  type: 'weight' | 'exercise' | 'nutrition' | 'sleep' | 'mood' | 'query';
  data?: Record<string, any>;
}

export const parseHealthCommand = (command: string): ParsedCommand | null => {
  const lowerCommand = command.toLowerCase();

  // Weight logging
  const weightMatch = lowerCommand.match(/(?:log |record |track )?(?:my )?weight (?:is |as |of )?(\d+(?:\.\d+)?)\s*(kg|pounds|lbs)?/i);
  if (weightMatch) {
    return {
      type: 'weight',
      data: {
        weight: parseFloat(weightMatch[1]),
        unit: weightMatch[2]?.toLowerCase() || 'kg'
      }
    };
  }

  // Exercise logging
  const exerciseMatch = lowerCommand.match(/(?:log |record |track )?(?:i )?(ran|walked|cycled|exercised|worked out) for (\d+) ?(minutes?|hours?)/i);
  if (exerciseMatch) {
    const duration = parseInt(exerciseMatch[2]);
    const unit = exerciseMatch[3].toLowerCase();
    return {
      type: 'exercise',
      data: {
        activity: exerciseMatch[1].toLowerCase(),
        duration: unit.startsWith('hour') ? duration * 60 : duration,
        unit: 'minutes'
      }
    };
  }

  // Meal logging
  const mealMatch = lowerCommand.match(/(?:log |record |track )?(?:i )?(?:had|ate|consumed) (.+?) for (breakfast|lunch|dinner|snack)/i);
  if (mealMatch) {
    return {
      type: 'nutrition',
      data: {
        food: mealMatch[1].trim(),
        mealType: mealMatch[2].toLowerCase()
      }
    };
  }

  // Sleep logging
  const sleepMatch = lowerCommand.match(/(?:log |record |track )?(?:i )?slept (?:for )?(\d+(?:\.\d+)?)\s*hours?(?: with (.+) quality)?/i);
  if (sleepMatch) {
    return {
      type: 'sleep',
      data: {
        duration: parseFloat(sleepMatch[1]),
        quality: sleepMatch[2] ? parseQuality(sleepMatch[2]) : undefined
      }
    };
  }

  // Mood logging
  const moodMatch = lowerCommand.match(/(?:log |record |track )?(?:i )?(?:am |feel |feeling )(happy|sad|tired|energetic|stressed|relaxed|anxious|calm)/i);
  if (moodMatch) {
    return {
      type: 'mood',
      data: {
        mood: moodMatch[1].toLowerCase(),
        timestamp: new Date().toISOString()
      }
    };
  }

  // Query commands
  if (lowerCommand.includes('show') || lowerCommand.includes('display') || lowerCommand.includes('view')) {
    return {
      type: 'query',
      data: {
        target: lowerCommand.includes('insights') ? 'insights' :
               lowerCommand.includes('progress') ? 'progress' :
               lowerCommand.includes('settings') ? 'settings' : 'unknown'
      }
    };
  }

  return null;
};

// Helper function to convert quality description to number (1-10)
const parseQuality = (quality: string): number => {
  const qualityMap: Record<string, number> = {
    'excellent': 10,
    'very good': 8,
    'good': 7,
    'okay': 5,
    'poor': 3,
    'bad': 2,
    'terrible': 1
  };

  const lowerQuality = quality.toLowerCase();
  return qualityMap[lowerQuality] || 5;
};