import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material";

export function DisplayCodeCompletion({task}) {

    const [answers, setAnswer] = useState([]);

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
                                value={answers[item.id] ?? ""}
                                onChange={(e) =>
                                    setAnswer(prev => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                    }))
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
        </Box>

    )

}