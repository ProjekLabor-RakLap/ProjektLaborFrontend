import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    FormControl,
    InputLabel,
    Link,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { IUserRegister } from "../../Interfaces/IUser";
import PasswordInput from "../Inputs/passwordInput";

export default function Register() {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [role, setRole] = useState<number>(2);

    const handleRoleChange = (event: SelectChangeEvent<number>) => {
        setRole(Number(event.target.value));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError("");

        const registerData: IUserRegister = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password1,
            roleId: Number(role)
        };

        setLoading(true);

        setTimeout(async () => {
            if (!firstname || !lastname || !email || !password1 || !password2) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            if (firstname.length > 75 || lastname.length > 75) {
                setError("Firstname and Lastname cannot be more than 75 characters.");
                setLoading(false);
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                setError("Invalid email format!");
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

            try {
                await api.Users.registerUser(registerData);
                setLoading(false);
                navigate("/verify");
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Error during signup!");
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
                marginTop: "5rem"
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }}>
                Register
            </Typography>

            <Box display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}>

                <TextField
                    sx={{ width: '27ch', m: 0 }}
                    label="Firstname"
                    variant="outlined"
                    margin="normal"
                    value={firstname}
                    placeholder="Jane"
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <TextField
                    sx={{ width: '27ch', m: 0 }}
                    label="Lastname"
                    variant="outlined"
                    margin="normal"
                    value={lastname}
                    placeholder="Doe"
                    onChange={(e) => setLastname(e.target.value)}
                />

                <TextField
                    sx={{ width: '27ch', m: 0 }}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
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

                <FormControl sx={{ width: '27ch', m: 0 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        id="role-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="2">Analyst</MenuItem>
                        <MenuItem value="1">Manager</MenuItem>
                        <MenuItem value="0">Admin</MenuItem>
                    </Select>
                </FormControl>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/login")}
                        sx={{ fontWeight: 600 }}
                    >
                        Log in
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
            </Box>
        </Paper>
    );
}
