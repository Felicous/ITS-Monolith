import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";

export function DisplayCodeCompletion({task, onSubmit}) {

    const [answers, setAnswer] = useState(() =>
        Array(task.solution.length).fill("")
    );

    const handleChange = (index, input) => {

        const newAnswers = [...answers];
        newAnswers[index] = input;
        setAnswer(newAnswers);
    };

    const [error, setError] = useState(false);
  
    const handleSubmit = () => {
        const invalid = answers.some(value => value.trim() === "");
  
        setError(invalid);
  
        if (invalid) {
        return;
        }

        if (!invalid) {
        onSubmit(answers)
        }
    };


    return (

        <Box>
            <Typography variant="h5">
                {task.explanation}
            </Typography>

            {task.content.map((item) => {

                switch (item.type) {

                    case "text":
                        return (
                            <Typography variant="h6">
                                {item.text}
                            </Typography>
                        );
                    
                    case "input":
                        return (
                            <TextField
                                key={item.id}
                                variant="standard"
                                error={error}
                                helperText={error ? "please complete the code snippet" : ""}
                                value={answers[item.id] ?? ""}
                                onChange={(e) =>
                                    handleChange(item.id, e.target.value)
                                }
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                    font: "inherit",
                                    "& textarea": {
                                        font: "inherit",
                                    }
                                    }
                                }}
                                sx={{ mb: 2 }}
                            />                            
                        );
                }

            })}

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>

        </Box>

    )

}