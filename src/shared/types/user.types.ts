import { ICommonResponse } from './common.types';

export interface IUserSignInPayload {
  action: string;
  password: string;
  email: string;
}
export interface IUser {
  name?: string;
  id?: string;
  email: string;
  account_id: string;
}

export interface IUpdateUserDetails {
  user_deleted?: boolean;
  user_enabled?: boolean;
  user_notes?: string;
  user_role?: string;
  // user_groups?: {
  //   group_id: string;
  //   group_name: string;
  // }[];
}

export interface IUpdateProfileDetails {
  user_marketing_optin?: boolean;
  user_firstname?: string;
  user_lastname?: string;
}

export interface INewUpdateUserDetails {
  user_deleted?: boolean;
  user_enabled?: boolean;
  user_notes?: string;
  user_groups?: {
    add: string[];
    remove: string[];
  };
  user_marketing_optin?: boolean;
  user_firstname?: string;
  user_lastname?: string;
}
export interface ICreateUserPayload {
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_password: string;
  user_color: string;
  account_company_name: string;
  account_industry: string;
  account_addr_country: string;
  account_addr_line2?: string;
  account_addr_line1: string;
  account_addr_city: string;
  account_addr_postcode: string;
  user_marketing_optin: boolean;
  // user_active: boolean;
  // user_notes: string;
  // user_role: string;
  // user_account: string;
  // user_deleted: boolean;
  // user_enabled: boolean;
}

export interface IRequestOTP {
  user_email: string;
  user_type: 'new' | 'existing';
}

export interface IVerifyOTP {
  user_email: string;
  verification_code: string;
  user_type: 'new' | 'existing';
}
export interface IUserDetails {
  user_active: boolean;
  user_deleted: boolean;
  user_firstname: string;
  user_lastname: string;
  user_color: string;
  user_email: string;
  user_role: string;
  user_created: number;
  user_enabled: boolean;
  user_notes: string;
  user_id: string;
  user_marketing_optin: boolean;
  user_groups: {
    group_id: string;
    group_name: string;
  }[];
}

export interface IUserDetailsResponse {
  success: string;
  message: string;
  data: IUserDetails;
}

export interface IUsersListResponse {
  success: string;
  message: string;
  data: IUserDetails[];
}

export interface ICreateUserResponse {
  success: string;
  message: string;
  data: { userId: string; message: string }[];
}

export interface ISignInUserResponse {
  success: boolean;
  message: string;
  data?: {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
    email: string;
    role: string;
  };
}

export interface IUserProfileSetupStatus {
  user_setup_status: {
    steps: {
      update_profile: boolean;
      download_app?: boolean;
      perform_jobs?: boolean;
    };
    complete: boolean;
    progress: {
      step_count: number;
      step_completed: number;
    };
  };
}

export interface IUserWizardSteps {
  create_inventory?: boolean;
  create_jobs?: boolean;
  create_location?: boolean;
  create_warehouse?: boolean;
  import_orders?: boolean;
  perform_jobs?: boolean;
  print_location_barcode?: boolean;
  update_profile?: boolean;
  download_app?: boolean;
}

export interface IUpdateUserResponse extends ICommonResponse {
  data: boolean;
}

export interface IDeleteUserResponse extends ICommonResponse {
  data: boolean;
}

export interface IUpdateUserStatusPayload {
  user_id: string;
  user_enabled: boolean;
}

export interface IUpdateUserStatusResponse extends ICommonResponse {
  data: boolean;
}

export interface IResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  user_email?: string;
}

export interface IResetPasswordResponse extends ICommonResponse {
  data: boolean;
}

export interface IResendUserInvitePayload {
  user_email: string;
}

export interface IResendUserInviteResponse extends ICommonResponse {
  data: boolean;
}

export interface IUserProfileSetupStatusResponse {
  success: string;
  message: string;
  data: IUserProfileSetupStatus;
}
