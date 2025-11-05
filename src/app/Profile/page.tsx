import { Box } from '@mui/material';
import '../../App.css';
import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import DataUpdateComponent from '../../Components/Profile/dataUpdateComponent';
import PasswordChangeComponent from '../../Components/Profile/passwordChangeComponent';
import DeactivateProfileComponent from '../../Components/Profile/deactivateProfileComponent';

export default function Profile() {
  return (
    <div className="App">
      <div className="App-header">
        <PillNavFull />

        <Box display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}>

          <DataUpdateComponent/>

          <PasswordChangeComponent/>

          <DeactivateProfileComponent/>

        </Box>
      </div>
    </div>
  );
}
