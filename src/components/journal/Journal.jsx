import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  Stack 
} from '@mui/material';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const entry = {
      id: Date.now(),
      text: newEntry,
      date: new Date().toLocaleDateString(),
    };

    setEntries([entry, ...entries]);
    setNewEntry('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Gratitude Journal
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What are you grateful for today?"
            variant="outlined"
          />
          <Button 
            variant="contained" 
            type="submit"
            sx={{ alignSelf: 'flex-start' }}
          >
            Add Entry
          </Button>
        </Stack>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Previous Entries
        </Typography>
        <Stack spacing={2}>
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {entry.date}
                </Typography>
                <Typography variant="body1">
                  {entry.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Journal; 