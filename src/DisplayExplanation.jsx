import { Box, Typography } from "@mui/material";

export function DisplayExplanation({task}) {
    return (
        <Box>
            <Typography variant="h6">
                {task.explanation}
            </Typography>
        </Box>
    );
}