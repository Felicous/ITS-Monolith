import { Box, Typography } from "@mui/material";

export function DisplayExplanation({task}) {
    return (
        <Box>
            <Typography variant="h6">
                {task.explanation}
            </Typography>
            <br></br>
            <br></br>
            <Box sx={{ p: 2, border: 1, borderColor: "secondary.main", borderRadius: 1}} >
                {task.content.map((item) => {
                    return (
                        <Typography variant="subtitle1" style={{ fontFamily: "Monospace", textIndent: item.indent }} align="left" sx="marginLeft">
                            {item.text}
                        </Typography>
                    );
                })}
            </Box>
        </Box>
    );
}