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
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                {task.explanation}
            </Typography>

            {/*Flex container for code completion in code*/}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
                {task.content.map((item) => {
                    switch (item.type) {

                        case "text":
                            return (
                                <Typography key={item.text} variant="h6" sx={{ fontFamily: 'monospace', m: 0 }}>
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
                                    slotProps={{
                                        input: {
                                            disableUnderline: true,
                                            sx: {
                                                color: "var(--text) !important",
                                                fontFamily: "monospace",
                                                fontSize: "1rem",
                                                padding: "4px 8px",
                                                backgroundColor: "var(--code-bg)",
                                                borderRadius: "4px",
                                                border: error ? "1px solid #f44336" : "1px solid var(--text)", // red border if wrong or empty answer 
                                                transition: "border-color 0.2s ease-in-out", "&:hover": {
                                                    borderColor: error ? "#f44336" : "var(--text-h)", 
                                                },
                                                "&.Mui-focused": {
                                                    border: "2px solid #1976d2",
                                                    padding: "3px 7px"
                                                }
                                            }
                                        }
                                    }} // closing brackets for slotProps
                                    sx={{ 
                                        // equal gaps on all sides
                                        m: 0, 
                                        display: "inline-block", 
                                        verticalAlign: "middle"
                                    }}
                                />            
                            );
                        default:
                            return null;
                    }
                })}
            </Box>

            {/* Centered button placement for submit */}
            <Button 
                variant="contained" 
                size="large"
                onClick={handleSubmit} 
                sx={{ 
                    display: "block", 
                    margin: "0 auto", 
                    px: 5,
                    py: 1,
                    fontWeight: "bold" 
                }}
            >
                Submit
            </Button>
        </Box>
    );
}