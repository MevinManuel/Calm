import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navigation from './components/common/Navigation';
import Dashboard from './components/Dashboard';
import Breathing from './components/breathing/Breathing';
import Sounds from './components/sounds/Sounds';
import Pomodoro from './components/pomodoro/Pomodoro';
import Meditation from './components/meditation/Meditation';
import Journal from './components/journal/Journal';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#121212',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          backgroundAttachment: 'fixed',
        }}>
          <Navigation />
          <div style={{ 
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: 'calc(100vh - 64px)',
            position: 'relative',
          }}>
            {/* Gradient overlay */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(187, 134, 252, 0.1), transparent 50%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            <div style={{
              position: 'relative',
              zIndex: 2,
            }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/breathing" element={<Breathing />} />
                <Route path="/sounds" element={<Sounds />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/journal" element={<Journal />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;