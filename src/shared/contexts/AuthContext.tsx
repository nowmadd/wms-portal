import { createContext, useState } from 'react';
import { ls } from '../utils/ls';
import { parseJSON } from '../utils/helpers';
import { IDefaultValue } from '../types/auth.types';
import { usersServices } from '../services/usersServices';
import { ISignInUserResponse, IUser, IUserSignInPayload } from '../types/user.types';
import BasicModal from '../components/Modals/BasicModal/BasicModal';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '../components/Button/Button';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signIn: () => {},
  signOut: () => {},
  authenticating: false,
} as IDefaultValue);

const AuthConsumer = AuthContext.Consumer;
const { getUserDetails, updateUser, userSignIn } = usersServices();

const Auth = (props: any) => {
  const { setLS, getLS, removeLS } = ls();
  const { mutateAsync } = updateUser();
  const { mutateAsync: userSignInMutate } = userSignIn();
  const auth = localStorage.user ? !!parseJSON(localStorage.user) : false;
  const [isAuthenticated, setIsAuthenticated] = useState(auth);
  const [authenticating, setAuthenticating] = useState(false);
  const [showWrongModal, setshowWrongModal] = useState('');

  const signIn = async (user: IUserSignInPayload) => {
    const { email, password } = user;
    //TODO: get user detyails here to check if user is enabled
    //add condition if user is to be updated with enable true status
    // const user_id = 'rey.m@indigo.co.uk';
    // mutateAsync({ payload: { user_enabled: true }, user_id });

    setAuthenticating(true);

    let res: ISignInUserResponse = { success: false, message: 'failed' };

    try {
      res = await userSignInMutate({ payload: user });
    } catch (error: any) {
      console.error(error);
      res = error.response.data;
    }

    if (res.success) {
      setLS('user', JSON.stringify({ ...res.data }));
      removeLS('signup_form');
      setIsAuthenticated(true);
      setAuthenticating(false);

      //navigate to dashboard
      window.location.href = '/dashboard';
    } else {
      setAuthenticating(false);
      setshowWrongModal(res.message);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signIn,
        signOut,
        authenticating,
      }}
    >
      {props.children}
      {showWrongModal ? (
        <BasicModal headerText="Login Failed" open={Boolean(showWrongModal)} onClose={() => setshowWrongModal('')}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
              padding: 5,
            }}
          >
            <Typography fontSize={18} textAlign={'center'}>
              {showWrongModal}
            </Typography>
            <Button onClick={() => setshowWrongModal('')} variant={'solid'} text={'OK'} color={'primary'}>
              Close
            </Button>
          </Box>
        </BasicModal>
      ) : (
        <React.Fragment />
      )}
    </AuthContext.Provider>
  );
};

const AuthProvider = Auth;
export { AuthContext, AuthProvider, AuthConsumer };
