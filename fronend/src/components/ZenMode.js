import React, { useEffect, useState, useRef } from 'react';

function ZenMode() {
  const [breathState, setBreathState] = useState('Inhale');
  const [cycle, setCycle] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  const quotes = [
    "Breathe in calm, breathe out stress.",
    "Peace begins with a single breath.",
    "Let go. Relax. Be present.",
    "Silence your thoughts. Embrace the now."
  ];
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const breathInterval = setInterval(() => {
      setBreathState(prev => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
      setCycle(c => c + 1);
    }, 4000);

    const timerInterval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(breathInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (soundOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.loop = true;
      audioRef.current.play();
    }
    setSoundOn(!soundOn);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' + s : s}s`;
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2021/09/08/audio_8d69e1999b.mp3?filename=ocean-wave-nature-sound-6724.mp3" />

      <div style={styles.glowContainer}>
        <div
          style={{
            ...styles.circle,
            transform: breathState === 'Inhale' ? 'scale(1.2)' : 'scale(0.8)',
            backgroundColor: breathState === 'Inhale' ? '#aad8d3' : '#d6e6f2'
          }}
        >
          <p style={styles.breathText}>{breathState}</p>
        </div>
      </div>

      <h2 style={styles.title}>🧘‍♂️ Zen Mode</h2>
      <p style={styles.quote}>{quote}</p>

      <div style={styles.infoBox}>
        <p>🕒 Time Elapsed: <strong>{formatTime(elapsedSeconds)}</strong></p>
        <p>🌬️ Breathing Cycles: <strong>{cycle}</strong></p>
      </div>

      <button onClick={toggleSound} style={styles.soundButton}>
        {soundOn ? '🔇 Turn Sound Off' : '🔊 Turn Sound On'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem'
  },
  glowContainer: {
    marginBottom: '2rem'
  },
  circle: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 4s ease-in-out, background-color 4s ease-in-out',
    boxShadow: '0 0 30px rgba(0,0,0,0.15)'
  },
  breathText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '1rem'
  },
  quote: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: '1.2rem',
    maxWidth: '500px'
  },
  infoBox: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#444'
  },
  soundButton: {
    marginTop: '1.5rem',
    padding: '0.7rem 1.2rem',
    fontSize: '1rem',
    backgroundColor: '#80cbc4',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};

export default ZenMode;
