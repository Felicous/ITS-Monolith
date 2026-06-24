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


export function DisplayMultiplechoice({task}) {

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
          Bitte mindestens eine Option auswählen
        </FormHelperText>
        )}
        <Button variant="contained" onClick={handleSubmit}>
            Speichern
          </Button>
      </FormControl>
    </Box>
    );
  
  }








/*
import { useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
} from "@mui/material";

export function CheckboxExample() {
  const [values, setValues] = useState({
    option1: true,
    option2: false,
    option3: false,
  });

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.checked,
    };

    setValues(newValues);

    // Prüfen, ob mindestens eine Checkbox ausgewählt ist
    const hasSelection = Object.values(newValues).some(Boolean);
    setError(!hasSelection);
  };

  const handleSubmit = () => {
    const hasSelection = Object.values(values).some(Boolean);

    if (!hasSelection) {
      setError(true);
      return;
    }

    setError(false);
    console.log("Formular absenden", values);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.option1}
              onChange={handleChange}
              name="option1"
            />
          }
          label="Option 1"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={values.option2}
              onChange={handleChange}
              name="option2"
            />
          }
          label="Option 2"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={values.option3}
              onChange={handleChange}
              name="option3"
            />
          }
          label="Option 3"
        />

        {error && (
          <FormHelperText error>
            Bitte mindestens eine Option auswählen.
          </FormHelperText>
        )}
      </FormGroup>

      <Button variant="contained" onClick={handleSubmit}>
        Speichern
      </Button>
    </>
  );
}
  */