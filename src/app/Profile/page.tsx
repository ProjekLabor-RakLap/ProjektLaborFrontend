import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import { useUserContext } from '../../Context/userContext';
import { useState } from 'react';
import api from '../../api/api';


export default function Profile() {
  const { user } = useUserContext();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    setTimeout(async () => {
      try {
        //const response = await api.Users.updateUser(user?.id,);
        setLoading(false);
      } catch (error: any) {
        console.error("Error loging in:", error);
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError("Error during login!");
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
            onSubmit={handleSubmit}
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
      </header>
    </div>
  );
}
