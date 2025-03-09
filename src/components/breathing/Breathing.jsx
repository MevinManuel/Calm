import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import ComponentWrapper from '../common/ComponentWrapper';

const Breathing = () => {
  const [phase, setPhase] = useState('inhale');
  const [timer, setTimer] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setPhase((prevPhase) => {
              switch (prevPhase) {
                case 'inhale':
                  return 'hold';
                case 'hold':
                  return 'exhale';
                case 'exhale':
                  return 'inhale';
                default:
                  return 'inhale';
              }
            });
            return phase === 'hold' ? 7 : 4;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  return (
    <ComponentWrapper title="Breathing Exercise">
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <Box 
          sx={{ 
            position: 'relative', 
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            padding: 2,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={((phase === 'hold' ? 4 : 7) - timer) / (phase === 'hold' ? 4 : 7) * 100}
            size={200}
            thickness={4}
            sx={{
              color: '#BB86FC',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#BB86FC',
                textTransform: 'capitalize',
                mb: 1,
                fontWeight: 500,
              }}
            >
              {phase}
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 400,
              }}
            >
              {timer}s
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => setIsActive(!isActive)}
          sx={{
            width: '200px',
            height: '48px',
            borderRadius: '24px',
            fontSize: '1.1rem',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #BB86FC 30%, #03DAC6 90%)',
            boxShadow: '0 3px 5px 2px rgba(187, 134, 252, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #9965FC 30%, #02B9A8 90%)',
            },
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
      </Box>
    </ComponentWrapper>
  );
};

export default Breathing;