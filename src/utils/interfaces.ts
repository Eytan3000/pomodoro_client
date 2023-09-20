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
  jwt:{
    accessToken: {
      accessToken:string
    }
  }
}

// export const enum ButtonType {
//   WORK = 'work',
//   BREAK = 'break',
//   REST = 'rest',
// }
