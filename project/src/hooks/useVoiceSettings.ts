import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VoiceSettings {
  isMuted: boolean;
  volume: number;
  autoListen: boolean;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setAutoListen: (autoListen: boolean) => void;
}

export const useVoiceSettings = create<VoiceSettings>()(
  persist(
    (set) => ({
      isMuted: false,
      volume: 0.8,
      autoListen: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (volume) => set({ volume }),
      setAutoListen: (autoListen) => set({ autoListen })
    }),
    {
      name: 'voice-settings'
    }
  )
);