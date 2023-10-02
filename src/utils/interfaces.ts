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
      accessToken:string;
  };
  general:{ 
      isLogged:boolean;
      audioMute:boolean;
  };
}