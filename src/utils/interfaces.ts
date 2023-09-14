export interface RootState {
  timer: {
    playing: boolean;
    timerDuration: number;
    toggleTimerType: 'work' | 'break' | 'rest';

  };
  drawer: {
    tasksActive: string[];
    tasksDone:string[];
    isEditing: boolean;
  };
}

// export const enum ButtonType {
//   WORK = 'work',
//   BREAK = 'break',
//   REST = 'rest',
// }
