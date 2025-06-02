const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

// Base API URL
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

// Use actual voice ID - get this from ElevenLabs dashboard
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel's actual voice ID

export const textToSpeech = async (text: string, voiceId: string = DEFAULT_VOICE_ID) => {
  try {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Make direct API call using fetch
    const response = await fetch(`${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    // Convert response to blob and play
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    await audio.play();
    
    // Clean up URL after playing
    audio.addEventListener('ended', () => {
      URL.revokeObjectURL(audioUrl);
    });
    
    return audio;

  } catch (error) {
    console.error('TTS Error:', error);
    
    // Fallback to browser TTS
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    
    return null;
  }
};

export const stopAllAudio = () => {
  // Stop browser TTS
  window.speechSynthesis.cancel();
  
  // Stop all HTML audio elements
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
};

// Helper function to get available voices
export const getAvailableVoices = async () => {
  try {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }
    
    const response = await fetch(`${ELEVENLABS_BASE_URL}/voices`, {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.status}`);
    }

    const data = await response.json();
    return data.voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};