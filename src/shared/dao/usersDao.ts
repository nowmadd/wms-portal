import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import { ICommonResponse } from '../types/common.types';
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

export const usersDao = () => {
  const { GET, POST, PATCH, PUT, DELETE } = useAxios();

  const createUser = async (createUserPayload: ICreateUserPayload) => {
    const response = await POST<ICreateUserResponse>({
      url: `${ENDPOINTS.USERS}`,
      data: createUserPayload,
    });
    return response.data;
  };

  const userSignIn = async (userSigninPayload: IUserSignInPayload) => {
    const { email, action, password } = userSigninPayload;
    const response = await POST<ISignInUserResponse>({
      url: `${ENDPOINTS.USERS}/${email.toLowerCase()}/authenticate`,
      data: {
        action,
        password,
      },
    });
    return response.data;
  };

  const updateUser = async (user_id: string, updateUserPayload: INewUpdateUserDetails) => {
    const response = await PATCH<IUpdateUserResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}`,
      data: updateUserPayload,
    });
    return response.data;
  };

  const getUsersList = async () => {
    const response = await GET<IUsersListResponse>({
      url: `${ENDPOINTS.USERS}`,
    });
    return response.data;
  };

  const getUserDetails = async (user_id: string) => {
    const response = await GET<IUserDetailsResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}`,
    });
    return response.data;
  };

  const checkUserExistence = async (user_email: string) => {
    const response = await GET<IUserDetailsResponse>({
      url: `${ENDPOINTS.USERS}/${user_email}/exists`,
    });
    return response.data;
  };

  const deleteUser = async (user_id: string) => {
    const response = await PATCH<IDeleteUserResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}`,
      data: {
        user_deleted: true,
      },
    });
    return response.data;
  };

  const updateUserStatus = async (payload: IUpdateUserStatusPayload) => {
    const response = await PATCH<IUpdateUserStatusResponse>({
      url: `${ENDPOINTS.USERS}/${payload.user_id}/status`,
      data: {
        user_enabled: payload.user_enabled,
      },
    });
    return response.data;
  };

  const sendInviteToUser = async (payload: any) => {
    const response = await POST<ICreateUserResponse>({
      url: `${ENDPOINTS.USERS}/invite`,
      data: payload,
    });
    return response.data;
  };

  const resetPassword = async (user_id: string, payload: IResetPasswordPayload) => {
    const response = await POST<IResetPasswordResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}/password`,
      data: payload,
    });
    return response.data;
  };

  const userSignUp = async (payload: ICreateUserPayload) => {
    const response = await POST<ICreateUserResponse>({
      url: `${ENDPOINTS.ONBOARDING}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const requestOTP = async (payload: IRequestOTP) => {
    const response = await POST<ICommonResponse>({
      url: `${ENDPOINTS.OTP}/request`,
      data: payload,
    });
    return response.data;
  };

  const verifyOTP = async (payload: IVerifyOTP) => {
    const response = await POST<ICommonResponse>({
      url: `${ENDPOINTS.OTP}/confirm`,
      data: payload,
    });
    return response.data;
  };

  const resendUserInvite = async (payload: IResendUserInvitePayload) => {
    const response = await POST<IResendUserInviteResponse>({
      url: `${ENDPOINTS.USERS}/invite/resend`,
      data: payload,
    });
    return response.data;
  };

  const getUserProfileSetupStatus = async (user_id: string) => {
    const response = await GET<IUserProfileSetupStatusResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}/setup/status`,
    });
    return response.data;
  };

  const updateUserSetupStatus = async (user_id: string, payload: IUserWizardSteps) => {
    const response = await PUT<ICommonResponse>({
      url: `${ENDPOINTS.USERS}/${user_id}/setup/status`,
      data: payload,
    });
    return response.data;
  };

  return {
    checkUserExistence,
    verifyOTP,
    requestOTP,
    deleteUser,
    updateUser,
    createUser,
    getUsersList,
    getUserDetails,
    updateUserStatus,
    sendInviteToUser,
    userSignIn,
    resetPassword,
    userSignUp,
    resendUserInvite,
    getUserProfileSetupStatus,
    updateUserSetupStatus,
  };
};
