import { IUser } from '../types/user.types';
import { ls } from './ls';

const { getLS } = ls();
export const authToken = () => {
  const getAuthToken = () => {
    const savedUser = getLS('user');

    if (!savedUser) return false;

    const parsedUser = JSON.parse(savedUser);

    return parsedUser.AccessToken || false;
  };

  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  const getRefreshToken = () => {
    const savedUser = getLS('user');

    if (!savedUser) return false;

    const parsedUser = JSON.parse(savedUser);

    return parsedUser.RefreshToken || false;
  };

  const getUser = (): IUser | null => {
    const userLS = getLS('user');
    if (userLS) {
      return JSON.parse(getLS('user') || '');
    }
    return null;
  };

  return {
    getRefreshToken,
    getAuthToken,
    isAuthenticated,
    getUser,
  };
};
