//import { task } from "./task_mockup";
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

  const handleChange = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const [error, setError] = useState(false);
  
  const handleSubmit = () => {
    const valid = selected.length > 0;
  
    setError(!valid);
  
    if (!valid) {
      return;
    }

    if (valid) {
      onSubmit(selected)
    }
  };
  
  return (
    
    <Box>
    
      <Typography variant="h6">
      {task.explanation}
      </Typography>
    
      <FormControl error={error}>
        <FormGroup>
          {task.content.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={selected.includes(option)}
                  onChange={() => handleChange(option)}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
        
        {error && (
        <FormHelperText>
          Please choose at least one option
        </FormHelperText>
        )}
        <Button variant="contained" onClick={handleSubmit}>
            Submit
        </Button>
      </FormControl>
    </Box>
    );
  
  }