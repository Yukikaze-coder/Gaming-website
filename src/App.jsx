import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Characters from './components/Characters';
import Arena from './components/Arena';
import Footer from './components/Footer';

const App = () => {
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const startAudio = async (e) => {
      console.log('User interaction detected:', e.type);
      
      if (!audioStarted && audioRef.current) {
        try {
          // Reset audio to beginning
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.3;
          
          // For mobile, we need to ensure the audio is ready
          await audioRef.current.play();
          
          console.log('Audio started successfully');
          setAudioStarted(true);
          
          // Remove all event listeners after success
          removeAllListeners();
        } catch (error) {
          console.log('Audio play failed:', error);
          // Try again with a slight delay for mobile
          setTimeout(async () => {
            try {
              await audioRef.current.play();
              setAudioStarted(true);
              removeAllListeners();
            } catch (retryError) {
              console.log('Audio retry failed:', retryError);
            }
          }, 100);
        }
      }
    };

    const removeAllListeners = () => {
      document.removeEventListener('click', startAudio, { passive: false });
      document.removeEventListener('touchstart', startAudio, { passive: false });
      document.removeEventListener('touchend', startAudio, { passive: false });
      document.removeEventListener('keydown', startAudio, { passive: false });
      document.removeEventListener('pointerdown', startAudio, { passive: false });
    };

    // Only add listeners if audio hasn't started
    if (!audioStarted) {
      // Add event listeners with passive: false for better mobile support
      document.addEventListener('click', startAudio, { passive: false });
      document.addEventListener('touchstart', startAudio, { passive: false });
      document.addEventListener('touchend', startAudio, { passive: false });
      document.addEventListener('keydown', startAudio, { passive: false });
      document.addEventListener('pointerdown', startAudio, { passive: false });
    }

    return removeAllListeners;
  }, [audioStarted]);

  return (
    <div>
      {/* Background audio */}
      <audio 
        ref={audioRef}
        loop
        preload="metadata"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
      >
        <source src="/audio/Echoes.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Header />
      <Hero />
      <Characters />
      <Arena />
      <Footer />
    </div>
  )
}

export default App