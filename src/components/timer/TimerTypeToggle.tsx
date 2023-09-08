
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { Box } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store';
import { RootState } from '../../utils/interfaces';
//-----------------------

export default function TimerTypeToggle() {
  const dispatch = useDispatch();

  const playing = useSelector((state: RootState) => state.timer.playing);
  const timerType = useSelector(
    (state: RootState) => state.timer.toggleTimerType
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
        value={timerType}
        onChange={(_, newValue) => {
          dispatch(timerActions.settoggleTimerType(newValue));
        }}>
        <Button
          disabled={playing && timerType !== 'work'}
          sx={{ width: 110 }}
          onClick={handleWorkClick}
          value="work">
          Work
        </Button>
        <Button
          disabled={playing && timerType !== 'break'}
          sx={{ width: 110 }}
          onClick={handleBreakClick}
          value="break">
          Break
        </Button>
        <Button
          disabled={playing && timerType !== 'rest'}
          sx={{
            width: 110,
          }}
          onClick={handleRestClick}
          value="long-rest">
          Long Rest
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
}
