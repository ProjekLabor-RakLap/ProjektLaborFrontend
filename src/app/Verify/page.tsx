import { Paper, Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import PillNavFull from "../../Components/NavBar/PillNav/PillNavWithItems";
import api from "../../api/api";

function VerifyPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [verificationCode, setCode] = useState<string>("");

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await api.Users.sendVerificationCode(email);
            setEmailSent(true);
        } catch (err: any) {
            setError(err.response?.data || "Failed to send verification code.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await api.Users.verifyAccount(email, verificationCode);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data || "Invalid verification code or email.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setEmailSent(false);
        setEmail("");
        setCode("");
        setError("");
        setSuccess(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <PillNavFull />

                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 3,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2}
                        sx={{ width: "100%" }}
                        component="form"
                        onSubmit={emailSent ? handleVerify : handleSendCode}
                    >
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Verify Account
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
                            <TextField
                                sx={{ width: "27ch", m: 0 }}
                                label="Verification Code"
                                variant="outlined"
                                margin="normal"
                                value={verificationCode}
                                placeholder="Enter the code sent to your email"
                                onChange={(e) => setCode(e.target.value)}
                            />
                        )}

                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {success && (
                            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                                Account verified successfully!
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
                                "Verify Account"
                            ) : (
                                "Send Verification Code"
                            )}
                        </Button>
                    </Box>
                    {emailSent && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ py: 1, width: "40%", marginTop: '1rem' }}
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

export default VerifyPage;