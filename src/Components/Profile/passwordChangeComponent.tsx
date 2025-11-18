import { Paper, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../../Context/userContext";
import PasswordInput from "../Inputs/passwordInput";
import { IUserChangePwd } from "../../Interfaces/IUser";
import api from "../../api/api";

export default function PasswordChangeComponent() {
    const { user } = useUserContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const handlePwdUpdate = (e: any) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        setTimeout(async () => {
            if (!oldPassword || !newPassword) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            if (oldPassword === newPassword) {
                setError("New and old password cannot be the same!");
                setLoading(false);
                return;
            }

            if (newPassword.length < 8) {
                setError("Password must be 8 or more characters.");
                setLoading(false);
                return;
            }

            if (!/[A-Z]/.test(newPassword)) {
                setError("Password must contain at least one uppercase letter.");
                setLoading(false);
                return;
            }

            if (!/[a-z]/.test(newPassword)) {
                setError("Password must contain at least one lowercase letter.");
                setLoading(false);
                return;
            }

            if (!/[0-9]/.test(newPassword)) {
                setError("Password must contain at least one number.");
                setLoading(false);
                return;
            }

            if (!/[!@#$%^&*(),.?:{}|<>]/.test(newPassword)) {
                setError("Password must contain at least one special character.");
                setLoading(false);
                return;
            }

            const passwordChangeData: IUserChangePwd = {
                email : user!.email,
                NewPassword : newPassword,
                Password : oldPassword
            }

            try {
                await api.Users.updatePassword(passwordChangeData);
                setLoading(false);
                setSuccess(true);
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Error during password update!");
                }
                setLoading(false);  
            }
        }, 1500);
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
                onSubmit={handlePwdUpdate}
                sx={{ width: "100%" }}>

                <Typography variant="h4" sx={{ mb: 2 }}>
                    Update password
                </Typography>

                <PasswordInput
                    value={oldPassword}
                    label='Old password'
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <PasswordInput
                    value={newPassword}
                    label="New password"
                    onChange={(e) => setNewPassword(e.target.value)}
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
    );
}
