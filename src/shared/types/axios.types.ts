import { AxiosError } from 'axios';

export interface IErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

export type IAxiosErrorResponse = AxiosError<IErrorResponse>;

export type IOnProgress = (current: number) => void;
