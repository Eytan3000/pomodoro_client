import { Box, Button } from '@mui/joy';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/interfaces';

interface props {
  submitStartClick:()=>void;
  submitRestartClick:()=>void;
}

export default function TimerButtons({ submitStartClick, submitRestartClick }:props) {
  const playing = useSelector((state: RootState) => state.timer.playing);
  return (
    <Box mt={3}>
      <Button
        color="primary"
        variant={!playing ? 'solid' : 'outlined'}
        sx={{
          borderRadius: 20,
          width: '100%',
        }}
        onClick={submitStartClick}>
        {playing ? 'pause' : 'Start'}
      </Button>
      <Button
        variant="plain"
        color="primary"
        sx={{
          marginTop: 1,
          borderRadius: 20,
          width: '70%',
          outlineColor: 'green',
        }}
        onClick={submitRestartClick}>
        Restart
      </Button>
    </Box>
  );
}
