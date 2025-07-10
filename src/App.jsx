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
    const startAudio = () => {
      if (!audioStarted && audioRef.current) {
        // Set volume before playing (mobile Safari requirement)
        audioRef.current.volume = 0.3;
        
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
        setAudioStarted(true);
        // Remove event listener after first interaction
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
        document.removeEventListener('keydown', startAudio);
        document.removeEventListener('touchend', startAudio);
      }
    };

    // Add event listeners for user interaction (including mobile events)
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
    document.addEventListener('touchend', startAudio);
    document.addEventListener('keydown', startAudio);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('touchend', startAudio);
      document.removeEventListener('keydown', startAudio);
    };
  }, [audioStarted]);

  return (
    <div>
      {/* Background audio */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        muted={false}
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