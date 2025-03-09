import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import { Howl } from 'howler';
import ComponentWrapper from '../common/ComponentWrapper';

const soundsList = [
  { 
    id: 1, 
    name: 'Rain', 
    file: 'https://assets.mixkit.co/active_storage/sfx/2515/2515.wav'
  },
  { 
    id: 2, 
    name: 'Ocean', 
    file: 'https://assets.mixkit.co/active_storage/sfx/2432/2432.wav'
  },
  { 
    id: 3, 
    name: 'Forest', 
    file: 'https://assets.mixkit.co/active_storage/sfx/2545/2545.wav'
  },
  { 
    id: 4, 
    name: 'White Noise', 
    file: 'https://assets.mixkit.co/active_storage/sfx/2518/2518.wav'
  },
];

const Sounds = () => {
  const [sounds, setSounds] = useState({});
  const [playing, setPlaying] = useState(null);
  const [volumes, setVolumes] = useState({});

  useEffect(() => {
    // Initialize Howl objects for each sound
    const soundObjects = {};
    soundsList.forEach(sound => {
      soundObjects[sound.id] = new Howl({
        src: [sound.file],
        loop: true,
        volume: 0.5,
        onload: () => {
          console.log(`Sound ${sound.name} loaded successfully`);
        },
        onloaderror: (id, error) => {
          console.error(`Error loading sound ${sound.name}:`, error);
        },
        onplay: () => {
          console.log(`Sound ${sound.name} started playing`);
        },
        onplayerror: (id, error) => {
          console.error(`Error playing sound ${sound.name}:`, error);
        }
      });
    });
    setSounds(soundObjects);

    // Initialize volumes
    const initialVolumes = {};
    soundsList.forEach(sound => {
      initialVolumes[sound.id] = 0.5;
    });
    setVolumes(initialVolumes);

    // Cleanup on unmount
    return () => {
      Object.values(soundObjects).forEach(sound => sound.unload());
    };
  }, []);

  const toggleSound = (id) => {
    if (!sounds[id]) {
      console.error('Sound not loaded yet');
      return;
    }

    if (playing === id) {
      sounds[id].pause();
      setPlaying(null);
    } else {
      // Stop currently playing sound if any
      if (playing && sounds[playing]) {
        sounds[playing].pause();
      }
      sounds[id].play();
      setPlaying(id);
    }
  };

  const handleVolumeChange = (id, newValue) => {
    const volume = newValue / 100;
    if (sounds[id]) {
      sounds[id].volume(volume);
      setVolumes(prev => ({
        ...prev,
        [id]: volume
      }));
    }
  };

  return (
    <ComponentWrapper title="Soundscapes">
      <Grid container spacing={3}>
        {soundsList.map((sound) => (
          <Grid item xs={12} sm={6} md={4} key={sound.id}>
            <Card sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <IconButton 
                    onClick={() => toggleSound(sound.id)}
                    sx={{ 
                      bgcolor: playing === sound.id ? 'primary.main' : 'transparent',
                      '&:hover': {
                        bgcolor: playing === sound.id ? 'primary.dark' : 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                  >
                    {playing === sound.id ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <Typography>{sound.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VolumeUp sx={{ color: 'text.secondary' }} />
                  <Slider
                    value={volumes[sound.id] * 100 || 50}
                    onChange={(_, newValue) => handleVolumeChange(sound.id, newValue)}
                    aria-label="Volume"
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ComponentWrapper>
  );
};

export default Sounds;