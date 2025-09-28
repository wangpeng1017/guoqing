import { useCallback, useRef } from 'react';

interface UseSoundOptions {
  volume?: number;
  preload?: boolean;
}

export function useSound() {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const playSound = useCallback((soundName: string, options: UseSoundOptions = {}) => {
    const { volume = 0.5 } = options;
    
    try {
      let audio = audioCache.current.get(soundName);
      
      if (!audio) {
        audio = new Audio(`/sounds/${soundName}`);
        audioCache.current.set(soundName, audio);
      }
      
      audio.volume = volume;
      audio.currentTime = 0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('音效播放失败:', error);
        });
      }
    } catch (error) {
      console.warn('音效加载失败:', error);
    }
  }, []);

  const preloadSounds = useCallback((soundNames: string[]) => {
    soundNames.forEach(soundName => {
      if (!audioCache.current.has(soundName)) {
        const audio = new Audio(`/sounds/${soundName}`);
        audio.preload = 'auto';
        audioCache.current.set(soundName, audio);
      }
    });
  }, []);

  return {
    playSound,
    preloadSounds
  };
}