import { Box } from "@mui/material";

export function DisplayResult({task, taskCorrect}) {

    // space for more detailed display based on task details
    
    switch(taskCorrect) {
        case true:
            return (
                <Box>
                    That was the correct answer
                </Box>);
        case false:
            return (
                <Box>
                    That was the wrong answer
                </Box>
            );
    }
    
}