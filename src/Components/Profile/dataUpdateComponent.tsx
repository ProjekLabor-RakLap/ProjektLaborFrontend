import { Paper, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import api from "../../api/api";
import { useUserContext } from "../../Context/userContext";
import { IUserPatch } from "../../Interfaces/IUser";

export default function ProfileDataComponent() {
    const { user } = useUserContext();

    const defaultFname = user?.firstname;
    const defaultLname = user?.lastname;
    const defaultEmail = user?.email;

    const [firstname, setFirstname] = useState<string | undefined>(user?.firstname);
    const [lastname, setLastname] = useState<string | undefined>(user?.lastname);
    const [email, setEmail] = useState<string | undefined>(user?.email);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { setUser } = useUserContext();

    const handleUpdateSubmit = (e: any) => {
        e.preventDefault();
        setError("");

        let updateData: IUserPatch = {};
        if (firstname !== defaultFname) {
            updateData.firstname = firstname;
        }
        if (lastname !== defaultLname) {
            updateData.lastname = lastname;
        }
        if (email !== defaultEmail) {
            updateData.email = email;
        }

        setSuccess(false);
        setLoading(true);

        setTimeout(async () => {
            if (!firstname || !lastname || !email) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            if (firstname === user?.firstname && lastname === user?.lastname && email === user?.email) {
                setError("No fields have changed!");
                setLoading(false);
                return;
            }

            if (firstname!.length > 75 || lastname!.length > 75) {
                setError("Firstname and Lastname cannot be more than 75 characters.");
                setLoading(false);
                return;
            }

            if (!email!.includes('@') || !email!.includes('.')) {
                setError("Invalid email format!");
                setLoading(false);
                return;
            }

            try {
                const response = await api.Users.updateUser(user!.id, updateData);
                setUser(response.data);
                setLoading(false);
                setSuccess(true);

            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Error during update!");
                }
                setLoading(false);
            }
        }, 1500);
    }

    const handleReset = (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setFirstname(defaultFname);
        setLastname(defaultLname);
        setEmail(defaultEmail);
    }

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
                component="form"
                onSubmit={handleUpdateSubmit}
                sx={{ width: "100%" }}>

                <Typography variant="h4" sx={{ mb: 2 }}>
                    {`${user?.firstname} ${user?.lastname}'s Profile`}
                </Typography>

                <TextField
                    sx={{ width: '100%', m: 0 }}
                    label="Firstname"
                    variant="outlined"
                    margin="normal"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <TextField
                    sx={{ width: '100%', m: 0 }}
                    label="Lastname"
                    variant="outlined"
                    margin="normal"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />

                <TextField
                    sx={{ width: '100%', m: 0 }}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    sx={{
                        width: '100%',
                        m: 0,
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black',
                        },
                    }}
                    label="Role"
                    variant="outlined"
                    margin="normal"
                    disabled
                    value={user?.role}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography color="success" variant="body2" sx={{ mt: 1 }}>
                        Profile Updated!
                    </Typography>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 4,
                        mt: 3,
                        width: '100%'
                    }}
                >
                    <Button
                        type="reset"
                        variant="contained"
                        color="error"
                        sx={{ py: 1, width: "50%" }}
                        disabled={loading}
                        onClick={handleReset}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Cancel changes"}
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ py: 1, width: "50%" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Update Profile"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
