import { Typography } from '@mui/joy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function AppBar() {
  return (
    <div style={{ height: '50px', padding: 10,
    position: 'fixed',
    top: 0,
    display:'flex',
    justifyContent:'space-between',
    width:'100%'
    }}>
        <Typography alignItems={'center'} level="h4" sx={{ marginTop: 0.4 }}>
          Pomodoro Timer
        </Typography>
        <VolumeUpIcon style={{marginRight:40, marginTop:6}}/>
        {/* <VolumeOffIcon style={{marginRight:40, marginTop:6}}/> */}
      </div>
  )
}
