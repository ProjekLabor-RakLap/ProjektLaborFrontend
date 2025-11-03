import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    Link,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [firsname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError("");

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            if (!firsname || !lastname || !email || !password1 || !password2 || !role) {
                setError("Please fill in all fields.");
                return;
            }

            if (firsname.length > 75 || lastname.length > 75) {
                setError("Firstname and Lastname cannot be more than 75 characters.");
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                setError("Invalid email format!");
                return;
            }

            if (password1 !== password2) {
                setError("Passwords don't match.");
                return;
            }

            if (password1.length < 8) {
                setError("Password must be 8 or more characters.");
                return;
            }

            if (!/[A-Z]/.test(password1)) {
                setError("Password must contain at least one uppercase letter.");
                return;
            }

            if (!/[a-z]/.test(password1)) {
                setError("Password must contain at least one lowercase letter.");
                return;
            }

            if (!/[0-9]/.test(password1)) {
                setError("Password must contain at least one number.");
                return;
            }

            if (!/[!@#$%^&*(),.?:{}|<>]/.test(password1)) {
                setError("Password must contain at least one special character.");
                return;
            }

            if (email === "a@a.a" && password1 === "ASDasd1!") {
                alert("✅ Login successful!");
            } else {
                setError("No");
            }
        }, 1500);
    };

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                width: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
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
                    value={firsname}
                    placeholder="Jane"
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <TextField
                    sx={{ width: '27ch', m: 0  }}
                    label="Lastname"
                    variant="outlined"
                    margin="normal"
                    value={lastname}
                    placeholder="Doe"
                    onChange={(e) => setLastname(e.target.value)}
                />

                <TextField
                    sx={{ width: '27ch', m: 0  }}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormControl sx={{ width: '27ch', m: 0  }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password1"
                        value={password1}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ width: '27ch', m: 0  }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password2">Password again</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password2"
                        value={password2}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password again"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ width: '27ch', m: 0  }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        id="role-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                    >
                        <MenuItem value={'Analyst'}>Analyst</MenuItem>
                        <MenuItem value={'Manager'}>Manager</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem>
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
            </Box>
        </Paper>
    );
}
