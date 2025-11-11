import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { IUserLogin } from "../../Interfaces/IUser";
import { useUserContext } from "../../Context/userContext";
import PasswordInput from "../Inputs/passwordInput";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { setUser } = useUserContext();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError("");

        const loginData: IUserLogin = {
            email: email,
            password: password
        }

        setLoading(true);

        setTimeout(async () => {
            if (!email || !password) {
                setError("Please fill in both fields.");
                setLoading(false);
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                setError("Invalid email format!");
                setLoading(false);
                return;
            }

            try {
                const response = await api.Users.login(loginData);
                setUser(response.data);
                setLoading(false);
                navigate("/");
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Error during login!");
                }
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                width: '27ch',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }}>
                Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                <TextField
                    sx={{ width: '27ch' }}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don’t have an account?{" "}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/register")}
                        sx={{ fontWeight: 600 }}
                    >
                        Register
                    </Link>
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, py: 1 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
            </Box>
        </Paper>
    );
}
