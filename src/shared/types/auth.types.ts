import { IUser, IUserSignInPayload } from './user.types';

export interface IDefaultValue {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (user: IUserSignInPayload) => void;
  signOut: Function;
  authenticating: boolean;
}
3;
