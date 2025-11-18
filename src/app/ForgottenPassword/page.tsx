import { Paper, Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { error } from "console";
import PasswordInput from "../../Components/Inputs/passwordInput";
import PillNavFull from "../../Components/NavBar/PillNav/PillNavWithItems";
import { useState } from "react";
import { IUserForgotPwd } from "../../Interfaces/IUser";
import api from "../../api/api";

function ForgottenPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [code, setCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const handlePwdUpdate = (e: any) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        setTimeout(async () => {
            if (!password1 || !password2) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            if (password1 !== password2) {
                setError("Passwords don't match.");
                setLoading(false);
                return;
            }

            if (password1.length < 8) {
                setError("Password must be 8 or more characters.");
                setLoading(false);
                return;
            }

            if (!/[A-Z]/.test(password1)) {
                setError("Password must contain at least one uppercase letter.");
                setLoading(false);
                return;
            }

            if (!/[a-z]/.test(password1)) {
                setError("Password must contain at least one lowercase letter.");
                setLoading(false);
                return;
            }

            if (!/[0-9]/.test(password1)) {
                setError("Password must contain at least one number.");
                setLoading(false);
                return;
            }

            if (!/[!@#$%^&*(),.?:{}|<>]/.test(password1)) {
                setError("Password must contain at least one special character.");
                setLoading(false);
                return;
            }

            const passwordChangeData: IUserForgotPwd = {
                email: email,
                token: code,
                password: password1,
            }

            try {
                await api.Users.resetPassword(passwordChangeData);
                setLoading(false);
                setSuccess(true);
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Error during password reset!");
                }
                setLoading(false);
            }
        }, 1500);
    }


    return (
        <div className="App">
            <header className="App-header">
                <PillNavFull />

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
                        component="form"
                        onSubmit={handlePwdUpdate}
                        sx={{ width: "100%" }}>

                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Update password
                        </Typography>

                        <TextField
                            sx={{ width: '27ch', m: 0 }}
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            sx={{ width: '27ch', m: 0 }}
                            label="Code"
                            variant="outlined"
                            margin="normal"
                            value={code}
                            placeholder="Code"
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <PasswordInput
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />

                        <PasswordInput
                            value={password2}
                            label="Password again"
                            onChange={(e) => setPassword2(e.target.value)}
                        />

                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        {success && (
                            <Typography color="success" variant="body2" sx={{ mt: 1 }}>
                                Password Updated!
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ py: 1, width: "50%" }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Update password"}
                        </Button>
                    </Box>
                </Paper>
            </header>
        </div>
    );
}

export default ForgottenPasswordPage;