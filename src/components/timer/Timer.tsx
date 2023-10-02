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
import count3 from './../../assets/Audio/count3.mp3';
import count2 from './../../assets/Audio/count2.mp3';
import count1 from './../../assets/Audio/count1.mp3';
import rest from './../../assets/Audio/rest.mp3';
import work from './../../assets/Audio/work.mp3';
//-------------------------------------------------------------------
const timerColors = [timerFirst, timerMiddle, timerLast, timerLast];
//-------------------------------------------------------------------
const Timer = () => {
  const dispatch = useDispatch();
  const audioMute = useSelector((state: RootState) => state.general.audioMute);
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

  function playCount3() {
    new Audio(count3).play();
  }
  function playCount2() {
    new Audio(count2).play();
  }
  function playCount1() {
    new Audio(count1).play();
  }
  function playRest() {
    new Audio(rest).play();
  }
  function playWork() {
    new Audio(work).play();
  }
  function onUpdateHandler(remainingTime: number) {
    if (remainingTime === 3) playCount3();
    if (remainingTime === 2) playCount2();
    if (remainingTime === 1) playCount1();
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
          onUpdate={(remainingTime) => {
            if (!audioMute) {
              onUpdateHandler(remainingTime);
            }
          }}
          >
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
