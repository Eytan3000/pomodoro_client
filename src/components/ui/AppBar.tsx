import { Box, Button, Typography } from '@mui/joy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useAuth } from '../../contexts/AuthContext';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function AppBar() {
  const { logOut } = useAuth();
  function handleLogOut() {
    logOut();
  }

  return (
    <div
      style={{
        height: '50px',
        padding: 10,
        position: 'fixed',
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#ffffffff',
        zIndex: 1000, // Set a high z-index value
      }}>
      <Typography alignItems={'center'} level="h4" sx={{ marginTop: 0.4 }}>
        Pomodoro Timer
      </Typography>

      <Box display="flex" justifyContent={'space-between'} mt={1}>
        {/* <Typography level='body-md' sx={{ marginTop: 0.4 }}>
        Log Out
      </Typography> */}
        <Button variant="plain" onClick={handleLogOut}>
          Log Out
        </Button>
        <VolumeUpIcon style={{ marginRight: 40, marginLeft: 30 }} />
        {/* <VolumeOffIcon style={{marginRight:40, marginTop:6}}/> */}
      </Box>
    </div>
  );
}
