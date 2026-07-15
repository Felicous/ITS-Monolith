import { Box } from "@mui/material";

export function DisplayResult(task, correct) {

    // space for more detailed display based on task details

    return(
            <Box>
                That was the {correct ? "correct" : "wrong"} answer
            </Box>
        )
    
}