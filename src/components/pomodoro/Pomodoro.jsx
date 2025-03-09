import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch modes
            if (mode === 'work') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('work');
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Pomodoro Timer
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={(minutes * 60 + seconds) / (mode === 'work' ? 1500 : 300) * 100}
          size={200}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outlined" onClick={resetTimer}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Pomodoro; 