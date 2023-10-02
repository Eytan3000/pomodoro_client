import { Typography } from '@mui/joy';
import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';
// import { useAuth } from '../../contexts/AuthContext';

export default function AppBar() {
  // const { currentUser, reAuthenticate }:any = useAuth();
  const isLogged = useSelector((state: RootState) => state.general.isLogged);

  return (
    <div
      style={{
        height: '50px',
        padding: 10,
        // position: 'fixed',
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        width: '99%',
        backgroundColor: '#ffffffff',
        zIndex: 1000, // Set a high z-index value
      }}>
      <Typography alignItems={'center'} level="h4" sx={{ marginTop: 0.4 }}>
        Pomodoro Timer
      </Typography>

      {/* <Box display="flex" justifyContent={'space-between'} mt={1}> */}
        {isLogged && <AccountMenu />}
        {/* <VolumeUpIcon style={{ marginRight: 40, marginLeft: 30, marginTop:8 }} /> */}
        {/* <VolumeOffIcon style={{marginRight:40, marginTop:6}}/> */}
      {/* </Box> */}
    </div>
  );
}
