import { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
} from "@mui/material";

export function DisplayMultiplechoice({task, onSubmit}) {

  const [selected, setSelected] = useState([]);

  // Toggle selection state for options
  const handleChange = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const [error, setError] = useState(false);
  
  // Validate and submit selected options
  const handleSubmit = () => {
    const valid = selected.length > 0;
  
    setError(!valid);
  
    if (!valid) {
      return;
    }

    if (valid) {
      onSubmit(selected);
      setSelected([])
    }
  };
  
  return (
    
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {task.explanation}
      </Typography>
    
      <FormControl error={error} fullWidth>
        <FormGroup sx={{ gap: 1 }}>
          {task.content.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selected.includes(option)}
                  onChange={() => handleChange(option)}
                  sx={{ color: 'var(--text)', '&.Mui-checked': { color: 'primary.main' } }}
                />
              }
              label={option}
              sx={{
                // border styling 
                border: '1px solid var(--text)',
                borderRadius: '6px',
                m: '4px 0',
                p: '4px 8px'
              }}
            />
          ))}
        </FormGroup>
        
        {error && <FormHelperText>Please choose at least one option</FormHelperText>}
        
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );

}