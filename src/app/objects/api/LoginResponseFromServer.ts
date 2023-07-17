export type LoginResponseFromServer = {
  success: boolean;
  passwordDiff: number[];
  cookie: string;
  time: number;
};
