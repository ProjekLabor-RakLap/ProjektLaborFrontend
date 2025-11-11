import { Paper, Box, Typography, Button, CircularProgress } from "@mui/material";
import DeleteProfilePopUp from "../PopUps/ProfilePopUp/deleteProfilePopUp";

export default function DeactivateProfileComponent() {
    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                width: '50%',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
            }}
        >

            <Box display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                sx={{ width: "100%" }}>

                <Typography variant="h4" sx={{ mb: 2 }}>
                    Delete Account
                </Typography>

                <DeleteProfilePopUp/>
            </Box>
        </Paper>
    );
}