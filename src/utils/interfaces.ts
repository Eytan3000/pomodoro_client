export interface RootState {
  timer: {
    playing: boolean;
    timerDuration: number;
    toggleButtonValue: string;
  };
}

export const enum ButtonType {
  WORK = 'work',
  BREAK = 'break',
  Rest = 'rest',
}
