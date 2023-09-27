import { Box } from '@mui/joy';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {
  timerFirst,
  timerLast,
  timerMiddle,
  timerTrailColor,
} from '../../utils/palette';
import { Typography } from '@mui/joy';
import TimerTypeToggle from './TimerTypeToggle';
import TimerButtons from './TimerButtons';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../store';
import { RootState } from '../../utils/interfaces';
import IntervalNumber from './IntervalNumber';
import count from './../../assets/Audio/temp/count.wav';
import rest from './../../assets/Audio/temp/rest.wav';
import work from './../../assets/Audio/temp/work.wav';
//-------------------------------------------------------------------
const timerColors = [timerFirst, timerMiddle, timerLast, timerLast];
//-------------------------------------------------------------------
const Timer = () => {
  const dispatch = useDispatch();

  const [intervalNum, setIntervalNum] = useState(0);

  const playing = useSelector((state: RootState) => state.timer.playing);
  const timerDuration = useSelector(
    (state: RootState) => state.timer.timerDuration
  );
  const timerType = useSelector(
    (state: RootState) => state.timer.toggleTimerType
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

  //handles intervals
  const handleOnComplete = () => {
    if (timerType === 'rest') {
      // Directly switch to "Work" after "Rest" is finished
      dispatch(timerActions.settoggleTimerType('work'));
      dispatch(timerActions.setTimerDurationWork());
      setKeyForRestart((prev) => prev + 1);
      return { shouldRepeat: true };
    }

    if (intervalNum === 0 || intervalNum === 1 || intervalNum === 2) {
      if (timerType === 'work') {
        dispatch(timerActions.settoggleTimerType('break'));
        dispatch(timerActions.setTimerDurationBreak());
        setKeyForRestart((prev) => prev + 1); //for restarting the timer
      }
      if (timerType === 'break') {
        dispatch(timerActions.settoggleTimerType('work'));
        dispatch(timerActions.setTimerDurationWork());
        setIntervalNum((i) => i + 1);
        setKeyForRestart((prev) => prev + 1);
      }
    } else {
      dispatch(timerActions.settoggleTimerType('rest'));
      dispatch(timerActions.setTimerDurationRest());
      setKeyForRestart((prev) => prev + 1);
      setIntervalNum(0);
    }

    return { shouldRepeat: true };
  };

  function playCount() {
    new Audio(count).play();
  }
  function playRest() {
    new Audio(rest).play();
  }
  function playWork() {
    new Audio(work).play();
  }
  function onUpdateHandler(remainingTime: number) {
    if (remainingTime === 3) playCount();
    if (remainingTime === 2) playCount();
    if (remainingTime === 1) playCount();
    // when timer turn to 0, the timerType is still on the previouse state.
    if (remainingTime === 0 && timerType === 'break') playWork();
    if (remainingTime === 0 && timerType === 'rest') playWork();
    if (remainingTime === 0 && timerType === 'work') playRest();
  }
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
          onComplete={handleOnComplete}
          onUpdate={onUpdateHandler}>
          {({ remainingTime }) => formatTime(remainingTime)}
        </CountdownCircleTimer>
      </Typography>

      <IntervalNumber intervalNum={intervalNum} />

      <TimerButtons
        submitStartClick={submitStartClick}
        submitRestartClick={submitRestartClick}
      />
    </Box>
  );
};
export default Timer;
