import { IUser } from '@/shared/interfaces/https/userInterface';

export interface IAuthenticateResponse {
  user: IUser;
  token: string;
}
