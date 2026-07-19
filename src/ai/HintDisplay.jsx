import { useState, useEffect } from "react";
import { Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { generateAiHint } from './HintGenerator';

export function HintDisplay({ task }) {
  const [hint, setHint] = useState(''); // Stores the currently displayed hint text          
  const [loading, setLoading] = useState(false); // Tracks API request loading state
  const [hintCount, setHintCount] = useState(0); // Tracks number of requested hints (max 2)

  // Reset on new task
  useEffect(() => {
    setHint('');
    setHintCount(0);
  }, [task?.id]);

  // Handles async logic for hints from the ai generator
  const handleRequestHint = async () => {
    if (hintCount >= 2) return;
    setLoading(true);
    
    // Call HintGenerator
    const text = await generateAiHint(task, hintCount);
    
    setHint(text);
    setHintCount(prev => prev + 1);
    setLoading(false);
  };

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleRequestHint}
        disabled={loading || hintCount >= 2}
        fullWidth
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : hintCount >= 2 ? (
          'No more hints available'
        ) : (
          `Get hint (${hintCount}/2)`
        )}
      </Button>

      {hint && (
        <Paper elevation={1} sx={{ p: 2, mt: 2, bgcolor: '#fafafa', borderLeft: '4px solid #9c27b0' }}>
          <Typography variant="subtitle2" color="secondary" gutterBottom>KI-Tutor:</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{hint}</Typography>
        </Paper>
      )}
    </Box>
  );
}