import { Box } from '@mui/joy';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { timerFirst, timerLast, timerMiddle, timerTrailColor } from '../../utils/palette';
import { Typography } from '@mui/joy';
import TimerTypeToggle from './TimerTypeToggle';
import TimerButtons from './TimerButtons';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store';
import { RootState } from '../../utils/interfaces';
import IntervalNumber from './IntervalNumber';
// import { RootState } from 'app/redux/store';
//-------------------------------------------------------------------
const timerColors = [timerFirst, timerMiddle, timerLast, timerLast];
//-------------------------------------------------------------------
const Timer = () => {
  // console.log('timer render');
  const dispatch = useDispatch();

  const [intervalNum, setIntervalNum] = useState(0);

  const playing = useSelector((state: RootState) => state.timer.playing);
  const timerDuration = useSelector(
    (state: RootState) => state.timer.timerDuration
  );
  const buttonValue = useSelector(
    (state: RootState) => state.timer.toggleButtonValue
  );

  const [keyForRestart, setKeyForRestart] = useState(0);

  const submitStartClick = (): void => {
    dispatch(timerActions.togglePlaying());
  };

  const submitRestartClick = () => {
    setKeyForRestart((prev) => prev + 1);
    dispatch(timerActions.changePlayingToFalse());
  };

  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleOnComplete = () => {
    //handles intervals
    if (buttonValue === 'rest') {
      // Directly switch to "Work" after "Rest" is finished
      dispatch(timerActions.setToggleButtonValue('work'));
      dispatch(timerActions.setTimerDurationWork());
      setKeyForRestart((prev) => prev + 1);
      return { shouldRepeat: true };
    }

    if (intervalNum === 0 || intervalNum === 1 || intervalNum === 2) {
      if (buttonValue === 'work') {
        dispatch(timerActions.setToggleButtonValue('break'));
        dispatch(timerActions.setTimerDurationBreak());
        setKeyForRestart((prev) => prev + 1); //for restarting the timer
      }
      if (buttonValue === 'break') {
        dispatch(timerActions.setToggleButtonValue('work'));
        dispatch(timerActions.setTimerDurationWork());
        setIntervalNum((i) => i + 1);
        setKeyForRestart((prev) => prev + 1);
      }
      if (buttonValue === 'rest') {
        dispatch(timerActions.setToggleButtonValue('work'));
        dispatch(timerActions.setTimerDurationWork());
      }
    } else {
      dispatch(timerActions.setToggleButtonValue('rest'));
      dispatch(timerActions.setTimerDurationRest());
      setKeyForRestart((prev) => prev + 1);
      setIntervalNum(0);
    }

    return { shouldRepeat: true };
  };
  return (
    <Box>
      <TimerTypeToggle />

      <Typography level="h1" sx={{ marginLeft: 2, marginTop: 5 }}>
        <CountdownCircleTimer
          trailColor={timerTrailColor}
          size={300}
          strokeWidth={5}
          key={keyForRestart}
          isPlaying={playing}
          duration={timerDuration}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          colors={timerColors}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleOnComplete}>
          {({ remainingTime }) => formatTime(remainingTime)}
        </CountdownCircleTimer>
      </Typography>

      <IntervalNumber intervalNum={intervalNum}/>
      
      <TimerButtons
        submitStartClick={submitStartClick}
        submitRestartClick={submitRestartClick}
      />
    </Box>
  );
};
export default Timer;