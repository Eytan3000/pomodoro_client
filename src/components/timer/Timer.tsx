import { Box } from '@mui/joy';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { timerFirst, timerLast, timerMiddle } from '../../utils/palette';
import { Typography } from '@mui/joy';
import TimerTypeToggle from './TimerTypeToggle';
import TimerButtons from '../TimerButtons';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store';
// import { RootState } from 'app/redux/store';
//-------------------------------------------------------------------
const timerColors = [timerFirst, timerMiddle, timerLast, timerLast];

interface RootState {
  timer: {
    playing: boolean;
    timerDuration: number;
    toggleButtonValue: string;
  };
}
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

  const submitStartClick = () => {
    dispatch(timerActions.togglePlaying());
  };

  const submitRestartClick = () => {
    setKeyForRestart((prev) => prev + 1);
    dispatch(timerActions.togglePlayingToFalse());
  };

  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Box>
      <TimerTypeToggle />
      <Typography level="h1">
        <CountdownCircleTimer
          trailColor="#ff9093ff"
          size={300}
          strokeWidth={5}
          // isGrowing
          key={keyForRestart}
          isPlaying={playing}
          duration={timerDuration}
          colors={timerColors}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => {
            // here

            // console.log(intervalNum);
            // console.log(buttonValue);

            // if (intervalNum === 0 || intervalNum === 1 || intervalNum === 2 || intervalNum === 3) {
              
            //   if (buttonValue === 'work') {
                // dispatch(timerActions.setToggleButtonValue('break'));
                // dispatch(timerActions.setTimerDurationBreak());
            //   }
            //   if (buttonValue === 'break') {
            //     setIntervalNum((i) => i + 1);
            //     dispatch(timerActions.setToggleButtonValue('work'));
            //     dispatch(timerActions.setTimerDurationWork());
            //   }
            //   if (buttonValue === 'rest') {
            //     dispatch(timerActions.setToggleButtonValue('work'));
            //     dispatch(timerActions.setTimerDurationWork());
            //   }
            // } else {
            //   dispatch(timerActions.setToggleButtonValue('rest'));
            //   dispatch(timerActions.setTimerDurationRest());
            //   setIntervalNum(0);
            // }

            return { shouldRepeat: true };
          }}>
          {({ remainingTime }) => formatTime(remainingTime)}
        </CountdownCircleTimer>
      </Typography>
      <TimerButtons
        submitStartClick={submitStartClick}
        submitRestartClick={submitRestartClick}
        playing={playing}
      />
    </Box>
  );
};
export default Timer;
