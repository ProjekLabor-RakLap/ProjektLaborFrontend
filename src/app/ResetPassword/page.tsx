import { Paper, Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import PillNavFull from "../../Components/NavBar/PillNav/PillNavWithItems";
import api from "../../api/api";

function PasswordResetPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSendResetEmail = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await api.Users.generatePasswordResetToken(email);
            setEmailSent(true);
        } catch (err: any) {
            setError(err.response?.data || "Failed to send password reset email.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await api.Users.resetPassword({ email, token, password: newPassword });
            setSuccess(true);
        } catch (err : any) {
            setError(err.response?.data || "Invalid token or password reset failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setEmailSent(false);
        setEmail("");
        setToken("");
        setNewPassword("");
        setError("");
        setSuccess(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <PillNavFull />

                <Paper
                    elevation={6}
                    sx={{ p: 4, width: "50%", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 3 }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2}
                        sx={{ width: "100%" }}
                        component="form"
                        onSubmit={emailSent ? handleResetPassword : handleSendResetEmail}
                    >
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Reset Password
                        </Typography>

                        <TextField
                            sx={{ width: "27ch", m: 0 }}
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={emailSent}
                        />

                        {emailSent && (
                            <>
                                <TextField
                                    sx={{ width: "27ch", m: 0 }}
                                    label="Reset Token"
                                    variant="outlined"
                                    margin="normal"
                                    value={token}
                                    placeholder="Token sent to email"
                                    onChange={(e) => setToken(e.target.value)}
                                />
                                <TextField
                                    sx={{ width: "27ch", m: 0 }}
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    value={newPassword}
                                    placeholder="Enter new password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </>
                        )}

                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {success && (
                            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                                Password reset successfully!
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ py: 1, width: "40%" }}
                            disabled={loading || (!emailSent && email.trim() === "")}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : emailSent ? (
                                "Reset Password"
                            ) : (
                                "Send Reset Email"
                            )}
                        </Button>
                    </Box>

                    {emailSent && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ py: 1, width: "40%", mt: 2 }}
                            onClick={handleReset}
                            disabled={loading}
                        >
                            Reset
                        </Button>
                    )}
                </Paper>
            </header>
        </div>
    );
}

export default PasswordResetPage;
