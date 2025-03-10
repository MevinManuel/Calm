import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { Howl } from 'howler';
import ComponentWrapper from '../common/ComponentWrapper';

const meditationList = [
  { 
    id: 1, 
    name: 'Deep Sleep', 
    duration: '3 min', 
    type: 'sleep',
    file: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
  { 
    id: 2, 
    name: 'Morning Calm', 
    duration: '2 min', 
    type: 'morning',
    file: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_f8a246f243.mp3'
  },
  { 
    id: 3, 
    name: 'Stress Relief', 
    duration: '3 min', 
    type: 'stress',
    file: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c157d06c.mp3'
  },
  { 
    id: 4, 
    name: 'Bedtime Story', 
    duration: '2 min', 
    type: 'story',
    file: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73acc.mp3'
  },
];

const Meditation = () => {
  const [meditations, setMeditations] = useState({});
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    // Initialize Howl objects for each meditation
    const meditationObjects = {};
    meditationList.forEach(meditation => {
      meditationObjects[meditation.id] = new Howl({
        src: [meditation.file],
        html5: true,
        volume: 0.5,
        onload: () => {
          console.log(`Meditation ${meditation.name} loaded successfully`);
        },
        onloaderror: (id, error) => {
          console.error(`Error loading meditation ${meditation.name}:`, error);
        },
        onplay: () => {
          console.log(`Meditation ${meditation.name} started playing`);
          setPlaying(meditation.id);
        },
        onplayerror: (id, error) => {
          console.error(`Error playing meditation ${meditation.name}:`, error);
        },
        onend: () => {
          console.log(`Meditation ${meditation.name} finished`);
          setPlaying(null);
        },
        onstop: () => {
          console.log(`Meditation ${meditation.name} stopped`);
          setPlaying(null);
        },
        onpause: () => {
          console.log(`Meditation ${meditation.name} paused`);
          setPlaying(null);
        }
      });
    });
    setMeditations(meditationObjects);

    // Cleanup on unmount
    return () => {
      Object.values(meditationObjects).forEach(meditation => {
        meditation.unload();
      });
    };
  }, []);

  const toggleMeditation = (id) => {
    console.log('Attempting to toggle meditation:', id);
    
    if (!meditations[id]) {
      console.error('Meditation not loaded yet');
      return;
    }

    if (playing === id) {
      console.log('Pausing meditation:', id);
      meditations[id].pause();
      setPlaying(null);
    } else {
      // Stop currently playing meditation if any
      if (playing && meditations[playing]) {
        console.log('Stopping current meditation:', playing);
        meditations[playing].stop();
      }
      console.log('Playing meditation:', id);
      meditations[id].play();
    }
  };

  return (
    <ComponentWrapper title="Meditations & Stories">
      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
  {meditationList.map((meditation) => (
    <Grid item xs={12} sm={6} md={3} key={meditation.id}> 
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
        }
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => toggleMeditation(meditation.id)}
              sx={{ 
                bgcolor: playing === meditation.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: playing === meditation.id ? 'primary.dark' : 'rgba(255, 255, 255, 0.08)',
                }
              }}
            >
              {playing === meditation.id ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Box>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {meditation.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {meditation.duration}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

    </ComponentWrapper>
  );
};

export default Meditation;