export interface RootState {
  timer: {
    playing: boolean;
    timerDuration: number;
    toggleTimerType: 'work' | 'break' | 'rest';
    // toggleTimerType: ButtonType;
  };
}

// export const enum ButtonType {
//   WORK = 'work',
//   BREAK = 'break',
//   REST = 'rest',
// }
