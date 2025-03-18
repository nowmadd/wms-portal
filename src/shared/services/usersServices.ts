import { UseMutationResult, useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { usersDao } from '../dao/usersDao';
import {
  ICreateUserPayload,
  ICreateUserResponse,
  IDeleteUserResponse,
  INewUpdateUserDetails,
  IRequestOTP,
  IResendUserInvitePayload,
  IResendUserInviteResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  ISignInUserResponse,
  IUpdateUserDetails,
  IUpdateUserResponse,
  IUpdateUserStatusPayload,
  IUpdateUserStatusResponse,
  IUserDetailsResponse,
  IUserProfileSetupStatusResponse,
  IUserSignInPayload,
  IUserWizardSteps,
  IUsersListResponse,
  IVerifyOTP,
} from '../types/user.types';
import { ICommonResponse } from '../types/common.types';
import { QUERY } from '../constants/QUERYNAMES';
import { IWizardSteps } from '../types/account.types';

export const usersServices = () => {
  const {
    getUserDetails: getUserDetailsDao,
    getUsersList: getUsersListDao,
    createUser: createUserDao,
    updateUser: updateUserDao,
    deleteUser: deleteUserDao,
    updateUserStatus: updateUserStatusDao,
    sendInviteToUser: sendInviteToUserDao,
    userSignIn: userSignInDao,
    userSignUp: userSignUpDao,
    resetPassword: resetPasswordDao,
    requestOTP: requestOTPDao,
    verifyOTP: verifyOTPDao,
    resendUserInvite: resendUserInviteDao,
    getUserProfileSetupStatus: getUserProfileSetupStatusDao,
    updateUserSetupStatus: updateUserSetupStatusDao,
    checkUserExistence: checkUserExistenceDao,
  } = usersDao();

  const getUserDetails = (user_id: string) => {
    return useQuery<IUserDetailsResponse, IAxiosErrorResponse>(
      [QUERY.USER_DETAILS, user_id],
      () => getUserDetailsDao(user_id),
      {
        enabled: !!user_id,
      },
    );
  };

  const checkUserExistence = (user_email: string, enabled: boolean) => {
    return useQuery<IUserDetailsResponse, IAxiosErrorResponse>(
      [QUERY.USER_EXISTS, user_email],
      () => checkUserExistenceDao(user_email),
      {
        enabled: !!user_email && enabled,
      },
    );
  };

  const getUsersList = () => {
    return useQuery<IUsersListResponse, IAxiosErrorResponse>([QUERY.USER_LIST], () => getUsersListDao());
  };

  const createUser = () => {
    return useMutation<ICreateUserResponse, IAxiosErrorResponse, { payload: ICreateUserPayload }>(({ payload }) =>
      createUserDao(payload),
    );
  };

  const updateUser = () => {
    return useMutation<IUpdateUserResponse, IAxiosErrorResponse, { user_id: string; payload: INewUpdateUserDetails }>(
      ({ user_id, payload }) => updateUserDao(user_id, payload),
    );
  };

  const deleteUser = () => {
    return useMutation<IDeleteUserResponse, IAxiosErrorResponse, { user_id: string }>(({ user_id }) =>
      deleteUserDao(user_id),
    );
  };

  const updateUserStatus = () => {
    return useMutation<IUpdateUserStatusResponse, IAxiosErrorResponse, { payload: IUpdateUserStatusPayload }>(
      ({ payload }) => updateUserStatusDao(payload),
    );
  };

  const sendInviteToUser = () => {
    return useMutation<ICreateUserResponse, IAxiosErrorResponse, { payload: any }>(({ payload }) =>
      sendInviteToUserDao(payload),
    );
  };

  const userSignIn = () => {
    return useMutation<ISignInUserResponse, IAxiosErrorResponse, { payload: IUserSignInPayload }>(({ payload }) =>
      userSignInDao(payload),
    );
  };

  const userSignUp = () => {
    return useMutation<ICreateUserResponse, IAxiosErrorResponse, { payload: ICreateUserPayload }>(({ payload }) =>
      userSignUpDao(payload),
    );
  };

  const requestOTP = () => {
    return useMutation<ICommonResponse, IAxiosErrorResponse, { payload: IRequestOTP }>(({ payload }) =>
      requestOTPDao(payload),
    );
  };

  const verifyOTP = () => {
    return useMutation<ICommonResponse, IAxiosErrorResponse, { payload: IVerifyOTP }>(({ payload }) =>
      verifyOTPDao(payload),
    );
  };

  const resetPassword = () => {
    return useMutation<
      IResetPasswordResponse,
      IAxiosErrorResponse,
      { user_id: string; payload: IResetPasswordPayload }
    >(({ user_id, payload }) => resetPasswordDao(user_id, payload));
  };

  const resendUserInvite = () => {
    return useMutation<IResendUserInviteResponse, IAxiosErrorResponse, { payload: IResendUserInvitePayload }>(
      ({ payload }) => resendUserInviteDao(payload),
    );
  };

  const getUserProfileSetupStatus = (user_id: string) => {
    return useQuery<IUserProfileSetupStatusResponse, IAxiosErrorResponse>(['user_status_setup', user_id], () =>
      getUserProfileSetupStatusDao(user_id),
    );
  };

  const updateUserSetupStatus = () => {
    return useMutation<IUpdateUserResponse, IAxiosErrorResponse, { user_id: string; payload: IUserWizardSteps }>(
      ({ user_id, payload }) => updateUserSetupStatusDao(user_id, payload),
    );
  };

  return {
    checkUserExistence,
    verifyOTP,
    requestOTP,
    updateUser,
    createUser,
    getUserDetails,
    getUsersList,
    deleteUser,
    updateUserStatus,
    sendInviteToUser,
    userSignIn,
    userSignUp,
    resetPassword,
    resendUserInvite,
    getUserProfileSetupStatus,
    updateUserSetupStatus,
  };
};
