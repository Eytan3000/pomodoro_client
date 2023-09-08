import { configureStore, createSlice } from '@reduxjs/toolkit';
import { breakDuration, restDuration, workDuration } from '../utils/palette';

const initialTimerState = { playing: false, timerDuration: workDuration, toggleButtonValue: 'work' };

const timerSlice = createSlice({
    name: 'timer',
    initialState: initialTimerState,
    reducers: {
        togglePlaying(state) {
            state.playing = !state.playing;
        },
        changePlayingToFalse(state) {
            state.playing = false;
        },
        setTimerDurationWork(state) {
            state.timerDuration = workDuration;
        },
        setTimerDurationBreak(state) {
            state.timerDuration = breakDuration;
        },
        setTimerDurationRest(state) {
            state.timerDuration = restDuration;
        },
        setToggleButtonValue(state, action) {
            state.toggleButtonValue = action.payload;
        },
    }

})

const store = configureStore({
    reducer: {
        timer: timerSlice.reducer,
    },
});

export const timerActions = timerSlice.actions;
export default store;
