import { Box, Typography } from '@mui/material';

const ComponentWrapper = ({ title, children }) => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          textAlign: 'center',
          color: 'white',
          fontWeight: '500',
          background: 'linear-gradient(45deg, #BB86FC 30%, #03DAC6 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(187, 134, 252, 0.3)',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ComponentWrapper; 