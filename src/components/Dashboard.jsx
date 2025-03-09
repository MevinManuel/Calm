import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Air, MusicNote, Timer, Bedtime, Book } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Air sx={{ fontSize: 40 }} />,
    title: 'Breathing',
    description: 'Find peace with guided breathing exercises',
    path: '/breathing'
  },
  {
    icon: <MusicNote sx={{ fontSize: 40 }} />,
    title: 'Sounds',
    description: 'Immerse yourself in calming soundscapes',
    path: '/sounds'
  },
  {
    icon: <Timer sx={{ fontSize: 40 }} />,
    title: 'Pomodoro',
    description: 'Stay focused with timed sessions',
    path: '/pomodoro'
  },
  {
    icon: <Bedtime sx={{ fontSize: 40 }} />,
    title: 'Meditation',
    description: 'Guided meditations for inner peace',
    path: '/meditation'
  },
  {
    icon: <Book sx={{ fontSize: 40 }} />,
    title: 'Journal',
    description: 'Record your daily gratitude moments',
    path: '/journal'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '400px',
          position: 'relative',
          mb: 6,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
        
          component="img"
          src="https://images.unsplash.com/photo-1493752689441-72be47db3f91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmlwcGxlfGVufDB8fDB8fHww"
          alt="Meditation"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
              mb: 2,
            }}
          >
            Welcome to Calm
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              maxWidth: '600px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            Your daily companion for mindfulness, focus, and relaxation
          </Typography>
        </Box>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card
              onClick={() => navigate(feature.path)}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(187, 134, 252, 0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;