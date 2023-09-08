// import * as React from 'react';
// import { VariantProp } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { Box } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store';
// import { breakDuration, restDuration, workDuration } from '../../utils/palette';
//-----------------------
interface RootState {
  timer: {
    playing: boolean;
    timerDuration: number;
    toggleButtonValue:string
  };
}
//-----------------------

export default function TimerTypeToggle() {
  const dispatch = useDispatch();
  // const [value, setValue] = React.useState<VariantProp | null | string>('work');
  

  // const timerDuration = useSelector(
  //   (state: RootState) => state.timer.timerDuration
  // );
  const playing = useSelector(
    (state: RootState) => state.timer.playing
  );
  const value = useSelector(
    (state: RootState) => state.timer.toggleButtonValue
  );

  const handleWorkClick = () => {
    dispatch(timerActions.setTimerDurationWork());
  };
  const handleBreakClick = () => {
    dispatch(timerActions.setTimerDurationBreak());
  };
  const handleRestClick = () => {
    dispatch(timerActions.setTimerDurationRest());
  };

  return (
    <Box display={'flex'} justifyContent={'center'} mb={6}>
      <ToggleButtonGroup
        variant="plain"
        value={value}
        onChange={(_, newValue) => {
          dispatch(timerActions.setToggleButtonValue(newValue));
        }}>
        <Button
          disabled={playing && value !== 'work'}
          sx={{ width: 110 }}
          onClick={handleWorkClick}
          value="work">
          Work
        </Button>
        <Button 
        disabled={playing && value !== 'break'}
        sx={{ width: 110 }} onClick={handleBreakClick} value="break">
          Break
        </Button>
        <Button
        disabled={playing && value !== 'rest'}
        sx={{ 
          width: 110,
          
          }} onClick={handleRestClick} value="long-rest">
          Long Rest
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
}
