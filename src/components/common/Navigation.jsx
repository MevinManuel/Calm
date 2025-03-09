import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import {
  Home,
  Air,
  MusicNote,
  Timer,
  Bedtime,
  Book,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home />, path: '/', label: 'Home' },
    { icon: <Air />, path: '/breathing', label: 'Breathing' },
    { icon: <MusicNote />, path: '/sounds', label: 'Sounds' },
    { icon: <Timer />, path: '/pomodoro', label: 'Pomodoro' },
    { icon: <Bedtime />, path: '/meditation', label: 'Meditation' },
    { icon: <Book />, path: '/journal', label: 'Journal' },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            background: 'linear-gradient(45deg, #BB86FC, #03DAC6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '0 0 20px rgba(187, 134, 252, 0.5)',
            animation: 'glow 2s ease-in-out infinite alternate',
            '@keyframes glow': {
              from: {
                textShadow: '0 0 10px rgba(187, 134, 252, 0.5)',
              },
              to: {
                textShadow: '0 0 20px rgba(187, 134, 252, 0.8), 0 0 30px rgba(3, 218, 198, 0.5)',
              },
            },
          }}
        >
          Calm
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <IconButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: 'white',
                '&:hover': {
                  background: 'rgba(187, 134, 252, 0.1)',
                },
              }}
              title={item.label}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;