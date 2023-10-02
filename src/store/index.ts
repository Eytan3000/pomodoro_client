import { configureStore, createSlice } from '@reduxjs/toolkit';
import { breakDuration, restDuration, workDuration } from '../utils/utils';

const tasksActive = [
    'task 1 Non unde reiciendis aut eaque voluptatibus',
    'task 2 Non unde reiciendis aut eaque voluptatibus',
    'task 3 Non unde reiciendis aut eaque voluptatibus',
    'task 4 est quae similique sed animi assumenda ut repellat deserunt a consequatur voluptas. Et repellendus nesciunt et iste voluptate.',
];
const tasksDone = ['task Done1 - Non unde reiciendis aut eaque voluptatibus'];


const initialTimerState = { playing: false, timerDuration: workDuration, toggleTimerType: 'work' };

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
        settoggleTimerType(state, action) {
            state.toggleTimerType = action.payload;
        },
    }

})
//-----------------------------
const initialDrawerState = { tasksActive, tasksDone, isEditing:false};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: initialDrawerState,
    reducers: {
        addTaskToTaskActive(state,action) {
            state.tasksActive.push(action.payload);
        },
        removeTaskFromTaskActive(state,action) {
            state.tasksActive.filter(task=>task !== action.payload);
        },
        addTaskToTaskDone(state,action) {
            state.tasksDone.push(action.payload);
        },
        removeTaskFromTaskDone(state,action) {
            state.tasksDone.filter(task=>task !== action.payload);
        },
        toggleIsEditing(state){
            state.isEditing = !state.isEditing;
        } 
    }

})

//-----------------------------

const initialJwtState = { accessToken:''};

const jwtSlice = createSlice({
    name: 'jwt',
    initialState: initialJwtState,
    reducers: {
        updateAccessToken(state,action) {
            state.accessToken= action.payload;
        }
    }

})
//-----------------------------

const initialGeneralState = { isLogged:false, audioMute:false};

const generalSlice = createSlice({
    name: 'general',
    initialState: initialGeneralState,
    reducers: {
        changeIsLoggedStatus(state, action) {
            state.isLogged= action.payload;
        },
        changeAudioMuteStatus(state) {
            state.audioMute= !state.audioMute;
        }
    }

})


const store = configureStore({
    reducer: {
        timer: timerSlice.reducer,
        drawer: drawerSlice.reducer,
        jwt: jwtSlice.reducer,
        general: generalSlice.reducer
    },
});

export const timerActions = timerSlice.actions;
export const drawerActions = drawerSlice.actions;
export const jwtActions = jwtSlice.actions;
export const generalActions = generalSlice.actions;
export default store;
