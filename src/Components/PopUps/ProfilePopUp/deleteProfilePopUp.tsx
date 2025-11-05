import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../../../Context/userContext';
import { useState } from 'react';
import api from '../../../api/api';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';

export default function DeleteProfilePopUp() {
    const { user, logout } = useUserContext();

    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await api.Users.deleteUser(user!.id);
            handleClose();
            logout();
            navigate("/");
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError("Error during deletion!");
            }
        }
    }

    return (
        <React.Fragment>
            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ py: 1, width: "50%" }}
                onClick={handleClickOpen}
            >
                Delete account
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action is <b>premament</b>.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="form"></form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                    <Button type="submit" form="form" color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}