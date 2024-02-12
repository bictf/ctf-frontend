export type LoginResponseFromServer = {
  success: boolean | undefined;
  passwordDiff: number[];
  cookie: string;
  time: number;
};
